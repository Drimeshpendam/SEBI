# Operating Systems + Linux — Full Study Notes

> **Why this file matters:** OS isn't in the *official* Phase-1 syllabus list, but **memory-based SEBI papers include OS and Linux/Unix questions** — scheduling, deadlocks, paging, Linux commands. Treat it as a real topic: ~1 week in the plan (Days 22–25), medium-high return per hour.
>
> **What's testable:** process states & fork(), scheduling numerics, deadlock/Banker's, paging/TLB/page-replacement, RAID levels, Linux commands & file system, chmod permissions.

---

## 1. Processes & Threads

**Process** = a program in execution — has its own memory space. **Thread** = a lightweight execution unit *inside* a process; threads share the process's memory.

- **WHY threads exist:** switching between processes is expensive (swap memory maps); switching between threads is cheap (shared memory). Cost of sharing: no isolation — one thread can corrupt another's data.
- **REMEMBER:** *"Threads share, processes separate."*

### Process states — draw this once, transitions ARE the question
```
New → Ready → Running → Terminated
         ↑  ↘        ↙
           Waiting (blocked on I/O)
```
- Ready → Running: the **dispatcher** picks you.
- Running → Waiting: process asks for I/O.
- Waiting → Ready: I/O finished.
- Running → Ready: time-slice expired (**preemption**).
- **Trap:** "process waiting for I/O" is in the *Waiting/Blocked* state, NOT Ready.

### Key terms MCQs love
- **PCB (Process Control Block)** = the process's saved ID card — registers, program counter, state, priority. **Context switch** = save current PCB, load next PCB. Pure overhead — does no useful work itself.
- `fork()` creates a child process — returns **0 to the child, child's PID to the parent**.
  - Classic numeric: "how many processes after n fork() calls?" → **2ⁿ** (each call doubles the family). 3 forks → 8 processes.
  - REMEMBER: *"Every fork doubles the family."*
- **Zombie** = child finished but parent hasn't collected its exit status (still in process table). **Orphan** = parent died; child gets adopted by `init`/`systemd`.
- **IPC mechanisms:** pipes (parent↔child), shared memory (fastest — no kernel copying), message queues, sockets (across machines), semaphores (synchronization).

---

## 2. CPU Scheduling — the numeric questions

### The three metrics (memorise — every numeric uses them)
- **Turnaround time (TAT)** = completion − arrival. *"Birth to death."*
- **Waiting time (WT)** = TAT − burst. *"How long it sat in line."*
- **Response time** = first-run − arrival. *"How long till first served."*

### The five algorithms
| Algorithm | Rule | The trap/strength |
|---|---|---|
| **FCFS** | first-come, first-served | **convoy effect** — short jobs stuck behind one long job |
| **SJF** | shortest burst first, non-preemptive | provably **optimal average waiting** — but needs to know the future |
| **SRTF** | preemptive SJF — shortest *remaining* time | a newly-arrived short job evicts the running one |
| **Round Robin** | cyclic, fixed time quantum | quantum too big → degenerates to FCFS; too small → context-switch overhead dominates |
| **Priority** | highest priority first | **starvation** of low-priority → fixed by **aging** (priority rises with wait time — classic MCQ) |

**REMEMBER starvation fix:** *"Old age earns respect — aging fixes starvation."*

### Worked example — never compute in your head, draw the Gantt chart
P1 (arrival 0, burst 8), P2 (1, 4), P3 (2, 9) — **SJF non-preemptive**:

```
0────────8────12────────21
|   P1   | P2 |    P3    |
```
- At t=0 only P1 exists → must run P1 (0–8).
- At t=8, P2 (burst 4) vs P3 (burst 9) → P2 (8–12), then P3 (12–21).
- TAT: P1=8, P2=11, P3=19 → avg **12.67**. WT = TAT − burst: 0, 7, 10.

**Same set under SRTF** gives a different chart (P2 preempts P1 at t=1) — always re-draw; never reuse.

---

## 3. Synchronization & Deadlock

- **Race condition** = output depends on timing/luck → fixed by mutual exclusion.
- **Critical section** = the code region touching shared data. Only one process inside at a time.
- **Semaphore** = integer counter + `wait()`/`signal()` (Dijkstra's **P** and **V**).
  - **Binary** semaphore (0/1) ≈ **mutex** — one resource.
  - **Counting** semaphore = N identical resources.
  - Classic MCQ: "semaphore initial value for 5 printers?" → 5.
- **Mutex vs semaphore trap:** mutex has *ownership* (only locker unlocks); semaphore is a *signaling* tool (any process can signal).

### Deadlock — the 4 Coffman conditions (ALL four must hold simultaneously)
1. **M**utual exclusion — resource can't be shared
2. **H**old and wait — holding one resource while waiting for another
3. **N**o preemption — can't force a resource back
4. **C**ircular wait — P1 waits for P2 waits for … waits for P1

**REMEMBER: "My Hungry Neighbor Circles"** — break ANY one → deadlock impossible. "Which of these is NOT required for deadlock?" is a recurring MCQ.

### Handling strategies
| Strategy | Idea | Key term |
|---|---|---|
| **Prevention** | design so one condition can't hold | e.g., request all resources at once kills hold-and-wait |
| **Avoidance** | grant only if system stays **safe** | **Banker's algorithm** — checks if a safe sequence exists |
| **Detection** | let it happen, find it later | cycle in resource-allocation graph (single instance per type = deadlock) |
| **Recovery** | kill processes / preempt resources | rollback |

- **Safe vs unsafe trap:** unsafe ≠ deadlock — unsafe just means "deadlock *could* happen." Safe = a sequence exists where everyone finishes.
- **Deadlock vs starvation:** deadlock = circular wait forever; starvation = bypassed forever (fix: aging).

---

## 4. Memory Management

- **Paging** — physical memory cut into fixed **frames**, logical memory into same-size **pages**; page table maps page → frame. Eliminates **external** fragmentation; small **internal** remains (last page half-empty).
- **Segmentation** — variable-size logical units (code/data/stack) → **external** fragmentation returns.
- **REMEMBER:** *"Pages are equal slices — no gaps between them. Segments are natural chunks — gaps return."*
- **Virtual memory** — run programs bigger than RAM; **demand paging** loads a page only when touched. Missing page → **page fault** → OS fetches from disk.
- **Thrashing** = system spends more time paging than executing. Cause: too many processes / too little RAM. Classic MCQ.
- **TLB** = tiny fast cache of recent page-table entries. "What speeds up logical→physical translation?" → TLB.
- **EAT** (effective access time) = hit-ratio math: `EAT = h×(t_TLB + t_mem) + (1−h)×(t_TLB + 2·t_mem)`.

### Page replacement — the MCQ trio
| Algorithm | Rule | The fact that gets asked |
|---|---|---|
| **FIFO** | evict oldest page | **Belady's anomaly** — *more* frames → *more* faults. Only FIFO (and some others) suffer it; LRU never does |
| **LRU** | evict least-recently-used | near-optimal; expensive to implement perfectly (needs timestamps/stack) |
| **Optimal** | evict page needed farthest in future | impossible in practice — the theoretical benchmark others are compared to |

**REMEMBER:** *"Belady's bad luck: FIFO punished for getting more frames."*

---

## 5. Storage, RAID & File Systems

### RAID — memorize cold, appears as level↔property questions
| Level | Method | Min disks | Survives | Usable capacity |
|---|---|---|---|---|
| **RAID 0** | striping only | 2 | 0 disks — one dies, all lost | 100% |
| **RAID 1** | mirroring | 2 | 1 disk | 50% |
| **RAID 5** | striping + distributed parity | **3** | 1 disk | (n−1)/n |
| **RAID 6** | double parity | 4 | **2** disks | (n−2)/n |
| **RAID 10** | mirror + stripe (1+0) | 4 | 1 per mirror pair | 50% |

- **Trap:** RAID 0 has speed but zero redundancy — "best performance, no fault tolerance" = RAID 0. "Best balance for databases" = RAID 5/10.
- **File systems:** FAT32 (max file 4 GB — classic MCQ), NTFS (Windows, journaling), ext4 (Linux, journaling), **inode** = per-file metadata block in Unix (stores everything EXCEPT the filename).
- **Disk scheduling:** FCFS, SSTF (shortest seek first — can starve edge requests), **SCAN** (elevator — sweeps to end, reverses), C-SCAN (sweeps one way, jumps back — more uniform wait).
- **Spooling** = Simultaneous Peripheral Operations OnLine — the print-queue idea: jobs buffer to disk so CPU isn't blocked by slow devices.

---

## 6. Linux / Unix Essentials — recalled in SEBI papers

### The file system tree (one root, everything hangs off `/`)
| Dir | Holds |
|---|---|
| `/` | root of everything |
| `/bin`, `/sbin` | essential user / system binaries |
| `/etc` | config files (passwd, fstab) |
| `/home` | user directories |
| `/var` | logs, spool, variable data |
| `/tmp` | temp files, cleared on reboot |
| `/dev` | device files — **everything is a file in Unix**, even disks/terminals |
| `/proc` | live kernel/process info (virtual FS) |

**REMEMBER:** *"In Unix everything is a file — /dev holds devices, /proc holds the living kernel."*

### Process & system commands — the MCQ set
| Command | Does |
|---|---|
| `ps` | snapshot of processes (`ps aux` = all users, all processes) |
| `top` / `htop` | live refreshing process+CPU+memory view |
| `kill PID` | send signal to a process; `kill -9` = SIGKILL (force, can't be caught); `kill -15` = SIGTERM (polite default) |
| `nice` / `renice` | set / change process priority (range −20 highest … +19 lowest) |
| `fg` / `bg` / `jobs` | foreground / background / list suspended jobs (`Ctrl+Z` suspends, `&` starts in background) |
| `free` / `df` / `du` | RAM usage / disk free per filesystem / disk used per directory |
| `chmod` / `chown` / `chgrp` | permissions / owner / group |
| `ln -s` | symbolic (soft) link — pointer to a path; hard link = second name for same inode |

- **Soft vs hard link trap:** deleting the original kills a soft link (dangles) but a hard link keeps working — same inode, data survives until all links gone.
- **Signal trap:** SIGKILL (9) can't be caught or ignored — the "unblockable" kill.

### Permissions — `chmod` numerics come up
- Permission triad per class: **r**ead=4, **w**rite=2, e**x**ecute=1 — summed per class.
- `chmod 755 file` → owner rwx, group r-x, others r-x (standard for executables/dirs).
- `chmod 644` → owner rw-, group r--, others r-- (standard files).
- `chmod 777` = everyone everything — the "never do this" answer in security questions.
- Order is always **owner → group → others** (`rwxr-xr--` = 754).
- For directories: `x` means *enter* it, `r` means *list* it, `w` means *create/delete inside* it — subtle but asked.

### Boot & core concepts
- Boot chain: BIOS/UEFI → **bootloader (GRUB)** → kernel → **init/systemd (PID 1)** → login.
- **Kernel** = core of the OS (process/memory/device/file management); **shell** = the command interpreter on top. "Kernel vs shell" is a classic.
- **Runlevels/targets:** multi-user vs graphical targets; `systemctl` manages services.
- Cron = scheduled jobs (`crontab -e`); format = `min hour day month weekday command`.

---

## Question types (from recalled papers + pattern)
1. Gantt-chart numerics — WT/TAT under a named algorithm → **draw it**.
2. Deadlock conditions ("which is NOT required"), Banker's safe/unsafe.
3. Paging/TLB/Belady's anomaly concept MCQs.
4. RAID level ↔ property/capacity.
5. `fork()` count, process-state transitions, zombie/orphan.
6. **Linux commands** — `ps`/`kill`/`chmod`/`nice`/`ln`, file-system dirs, soft vs hard links.
7. Semaphore initial values, mutex vs semaphore.

## Drills (Days 22–25)
- 5 scheduling Gantt problems across FCFS/SJF/SRTF/RR.
- Deadlock: write the 4 conditions from memory; one Banker's safe-sequence check.
- Page replacement: 10 fault-count problems (FIFO vs LRU on the same string — feel Belady's).
- RAID + process-state + fork() tables rewritten from memory.
- **Linux:** write the dir tree + top-10 command table from memory; convert `rwxr-x---` ↔ 750 and back both ways.
- Testbook: OS + Unix/Linux chapter tests on Days 26–27.

---

## Worked Examples — 10 solved in exam pattern

**Ex 1 — Gantt numeric (FCFS).** P1(0,4) P2(0,3) P3(0,5) all arrive at 0, FCFS.
**Ans: chart P1(0–4), P2(4–7), P3(7–12). TAT = 4, 7, 12 → avg 7.67; WT = 0, 4, 7.** Always draw the timeline — arithmetic slips are free marks lost.

**Ex 2 — fork() count.** `main(){ fork(); fork(); fork(); }` — how many total processes?
**Ans: 8 (2³).** Every fork doubles the family; n forks → 2ⁿ. Trap answers: 4 or 7 (counting only some branches).

**Ex 3 — deadlock conditions.** "Which is NOT one of the four Coffman conditions: mutual exclusion / hold-and-wait / preemption allowed / circular wait?"
**Ans: 'preemption allowed'** — the condition is NO preemption. Exams flip one word like this constantly.

**Ex 4 — Belady's anomaly.** "FIFO page replacement: same reference string, 3 frames gives 9 faults, 4 frames gives 10 faults. Anomaly?"
**Ans: YES — Belady's.** More frames → more faults is abnormal and only FIFO-type algorithms show it; LRU can never do this.

**Ex 5 — RAID pick.** "Survive one disk failure with good capacity, minimum 3 disks?"
**Ans: RAID 5** (striping + distributed parity). Needs 2-disk survival → RAID 6. Pure speed, no safety → RAID 0.

**Ex 6 — chmod translation.** `rwxr-x---` as octal? And what does `chmod 640 file` give?
**Ans: 750** (7=owner rwx, 5=group r-x, 0=others none). `640` = `rw-r-----` — owner rw, group r, others nothing.

**Ex 7 — right Linux command.** "Live view of processes eating CPU / kill a stuck process by PID / list suspended jobs."
**Ans: `top` / `kill <pid>` / `jobs`.** `ps` = snapshot, `top` = live. `kill -9` = force (SIGKILL can't be caught).

**Ex 8 — semaphore init.** "4 identical printers managed by a counting semaphore — initial value?"
**Ans: 4.** Binary for mutual exclusion (=1); counting = number of resources. Each `wait()` decrements; at 0, next process blocks.

**Ex 9 — process state.** "Process requests disk I/O mid-execution — which state does it enter?"
**Ans: Waiting/Blocked** — NOT ready (it's not waiting for the CPU, it's waiting for an event). Returns to Ready (not Running) when I/O completes.

**Ex 10 — link types.** "Original file deleted — which link still opens the data: `ln` (hard) or `ln -s` (soft)?"
**Ans: hard link.** It points to the same inode — data survives until ALL links die. Soft link stores a path → dangles dead.
