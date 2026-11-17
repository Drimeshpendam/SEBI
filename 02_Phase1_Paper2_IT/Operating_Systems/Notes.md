# Operating Systems + Linux — Full Study Notes

> **Why this file matters:** OS isn't in the *official* Phase-1 syllabus list, but **memory-based SEBI papers include OS and Linux/Unix questions** — scheduling, deadlocks, paging, Linux commands. Treat it as a real topic: ~1 week in the plan (Days 22–25), medium-high return per hour.
>
> **What's testable:** process states & fork(), scheduling numerics, deadlock/Banker's, paging/TLB/page-replacement, RAID levels, Linux commands & file system, chmod permissions.

## DAY MAP - which sections match your plan day

| Plan day | Target | Read |
|---|---|---|
| **D40** | trivia buffer — one-pager cram | this WHOLE file, once through, definition-recall style |
| any | Phase-2 prep / weak-spot patch | sections per the syllabus line being tested |

---

**How to read:** OS concepts are just stories about a manager (the OS) juggling workers (processes), a shared kitchen (memory), and one chef (the CPU). Each topic below: the story → the example you can see → the exam trap.

---

## 1. Processes & Threads

**Plain words:** a **program** is a recipe sitting on disk — dead text. A **process** is that recipe being COOKED — a running program with its own allocated memory. A **thread** is a lighter execution unit living *inside* a process — like one cook following two steps of the same recipe at once, sharing the same kitchen and ingredients (memory).

- **WHY threads exist:** switching between two processes means swapping entire memory maps — expensive, like moving to a different kitchen. Switching threads stays inside the same kitchen — cheap. The cost of sharing: one thread can scribble on another's data (no isolation).
- **REMEMBER:** *"Threads share, processes separate."*

### Process states — draw this once, the transitions ARE the question

**Plain words:** at any moment a process is in exactly one state — being born, standing in line for the CPU, actually running, parked while it waits for something slow (disk/network), or finished.

```
New → Ready → Running → Terminated
         ↑  ↘        ↙
           Waiting (blocked on I/O)
```

- Ready → Running: the **dispatcher** (the OS's CPU-scheduler arm) picks you from the line.
- Running → Waiting: process asks for slow I/O (disk read) — it can't use the CPU anyway, so it steps aside.
- Waiting → Ready: the I/O finishes → back in line (NOT straight to Running — the CPU may be busy).
- Running → Ready: your time-slice expired — the OS yanks the CPU (**preemption**) so everyone gets turns.
- **Trap:** "process waiting for I/O" = *Waiting/Blocked*, NOT Ready. Ready means "I only need the CPU."

### Key terms MCQs love
- **PCB (Process Control Block)** = the process's saved file — registers, program counter, state, priority. **Context switch** = save current process's PCB, load the next one's. It's pure overhead — the switch itself does zero user work.
- **`fork()`** creates a child process — an almost-copy of the parent. Its return value is the trick: **0 to the child, child's PID to the parent** — that's how the two copies know who's who.
  - Classic numeric: "how many processes after n `fork()` calls?" → **2ⁿ** — every call doubles the family (each existing process makes a copy of itself). 3 forks → 8.
  - REMEMBER: *"Every fork doubles the family."*
- **Zombie** = child finished but parent hasn't collected its exit code yet — a corpse entry in the process table. **Orphan** = parent died first; the child gets adopted by `init`/`systemd` (PID 1). *(Zombie = dead child, living parent. Orphan = living child, dead parent.)*
- **IPC** = how processes talk: pipes (parent↔child), **shared memory** (fastest — no kernel copying, just both mapped to the same region), message queues, sockets (across machines), semaphores (synchronization).

---

## 2. CPU Scheduling — the numeric questions

**Plain words:** one CPU, many processes in line — the scheduler picks who runs next and for how long. Different picking rules = different algorithms, and each has a characteristic failure the exam loves.

### The three metrics (memorise — every numeric uses them)
- **Turnaround time (TAT)** = completion − arrival. *"From joining the queue to fully done."*
- **Waiting time (WT)** = TAT − burst. *"How long it sat in line, not counting its own work."*
- **Response time** = first-run − arrival. *"How long till it got served the FIRST time."*

### The five algorithms

| Algorithm | Rule | The trap/strength |
|---|---|---|
| **FCFS** | first-come, first-served — the honest queue | **convoy effect** — one long job blocks everyone behind it, like a truck on a single-lane road |
| **SJF** | shortest burst first, non-preemptive | provably **optimal average waiting time** — but needs to know burst lengths in advance (the future!) |
| **SRTF** | preemptive SJF — shortest *remaining* time | a newly-arrived short job evicts whoever's running |
| **Round Robin** | cyclic, fixed time quantum each | quantum too big → degenerates into FCFS; too small → context-switch overhead eats everything |
| **Priority** | highest priority first | low-priority jobs can **starve** → fixed by **aging** (priority rises the longer you wait — classic MCQ) |

**REMEMBER starvation fix:** *"Old age earns respect — aging fixes starvation."*

### Worked example — never compute in your head, draw the Gantt chart

P1 (arrival 0, burst 8), P2 (arrival 1, burst 4), P3 (arrival 2, burst 9) — **SJF non-preemptive**:

```
0────────8────12────────21
|   P1   | P2 |    P3    |
```

- t=0: only P1 exists → must run P1 (0–8). *Non-preemptive means once started, it finishes.*
- t=8: P2 (burst 4) vs P3 (burst 9) → shorter wins → P2 (8–12), then P3 (12–21).
- TAT: P1=8−0=8, P2=12−1=11, P3=21−2=19 → avg **12.67**. WT = TAT − burst: 0, 7, 10.

**Same set under SRTF** gives a different chart (P2 preempts P1 at t=1 because 4 < 7 remaining) — always re-draw; never reuse a chart across algorithms.

---

## 3. Synchronization & Deadlock

**Plain words:** two processes updating the same data = a **race condition** — the answer depends on who ran last (two cooks both adding "one spoon of salt" reading the counter as 5 → it becomes 6, not 7). Fix = **mutual exclusion**: only one process in the **critical section** (the code touching shared data) at a time.

- **Semaphore** = an integer counter you can only `wait()` (decrement, blocks if 0) or `signal()` (increment, wakes a waiter) — Dijkstra's **P** (try to pass) and **V** (release).
  - **Binary** semaphore (0/1) ≈ a **mutex** — one key to one bathroom.
  - **Counting** semaphore = N identical resources — e.g., 5 printer keys on the hook.
  - Classic MCQ: "semaphore initial value for 5 printers?" → **5**.
- **Mutex vs semaphore trap:** a mutex has *ownership* — only the locker can unlock it (the key-holder). A semaphore is a *signaling* tool — any process can signal it (anyone can hang a key back).

### Deadlock — the 4 Coffman conditions (ALL four must hold simultaneously)

**The story:** Process A holds the printer and wants the scanner; Process B holds the scanner and wants the printer. Neither lets go, neither proceeds — forever. For this to happen, four things must ALL be true:

1. **M**utual exclusion — resources can't be shared (one printer at a time)
2. **H**old and wait — you're allowed to hold one resource while waiting for another
3. **N**o preemption — the OS can't yank a resource back by force
4. **C**ircular wait — the wait chain loops: A→B→…→A

**REMEMBER: "My Hungry Neighbor Circles"** — break ANY single condition → deadlock impossible. "Which is NOT required for deadlock?" is a recurring MCQ (they'll write "preemption allowed" as a fake — the real condition is NO preemption).

### Handling strategies

| Strategy | Idea | Key term |
|---|---|---|
| **Prevention** | design so a condition can't hold | request ALL resources at once → kills hold-and-wait |
| **Avoidance** | grant a request only if the system stays **safe** | **Banker's algorithm** — simulates "could everyone still finish?" before granting |
| **Detection** | let it happen, find it after | cycle in the resource-allocation graph (with single-instance resources, cycle = deadlock) |
| **Recovery** | kill processes / preempt resources | rollback |

- **Safe vs unsafe trap:** unsafe ≠ deadlock — unsafe just means "deadlock *could* happen, not that it did." Safe = at least one sequence exists where every process finishes.
- **Deadlock vs starvation:** deadlock = circular waiting forever; starvation = being bypassed forever (everyone cuts in line) → fixed by aging, the same fix as priority scheduling.

---

## 4. Memory Management

**Plain words:** RAM is limited; the OS must hand it out fairly. **Paging** chops physical memory into fixed-size **frames** and every program into identical-size **pages** — like slicing every loaf into same-size pieces so any piece fits any slot. No wasted gaps between slices → **no external fragmentation**; but the last page may be half-used → small **internal fragmentation**.

- **Segmentation** = the opposite idea — split by *logical meaning* (code segment, data segment, stack) in variable sizes → fits better conceptually but leaves gaps → **external fragmentation returns**.
- **REMEMBER:** *"Pages are equal slices — no gaps between them. Segments are natural chunks — gaps return."*
- **Virtual memory** = the trick that runs programs bigger than RAM — only the pages you're actually using sit in memory; the rest waits on disk. **Demand paging** = fetch a page only when touched. Touch a missing page → **page fault** → OS pauses, fetches it from disk (SLOW — that's why locality matters).
- **Thrashing** = the system spends more time shuffling pages than running programs — too many processes for the RAM available. The machine crawls. Classic MCQ.
- **TLB** = a tiny ultra-fast cache of recently-used page-table entries — without it every memory access needs a second access just to read the page table. "What speeds up logical→physical address translation?" → TLB.
- **EAT** (effective access time) = hit-ratio math: `EAT = h×(t_TLB + t_mem) + (1−h)×(t_TLB + 2·t_mem)`.

### Page replacement — the MCQ trio

**Plain words:** frames are full and a new page arrives — SOMEONE must be evicted. Which page? Each algorithm answers differently:

| Algorithm | Rule | The fact that gets asked |
|---|---|---|
| **FIFO** | evict the page that arrived earliest | **Belady's anomaly** — giving FIFO *more* frames can cause *more* faults (bizarre but real; LRU can never do this) |
| **LRU** | evict the page unused longest — "past predicts future" | near-optimal; expensive to implement perfectly (needs timestamps) |
| **Optimal** | evict the page needed farthest in the future | impossible in practice — exists only as the theoretical benchmark |

**REMEMBER:** *"Belady's bad luck: FIFO punished for getting more frames."*

---

## 5. Storage, RAID & File Systems

### RAID — memorize cold, appears as level↔property questions

**Plain words:** RAID = combining multiple physical disks into one system for speed and/or safety. Three techniques combine into the levels: **striping** (data spread across disks — fast, one disk per piece), **mirroring** (every disk has an identical twin — safe, half the capacity), **parity** (extra check-data letting you rebuild one dead disk — clever middle ground).

| Level | Method | Min disks | Survives | Usable capacity |
|---|---|---|---|---|
| **RAID 0** | striping only | 2 | 0 disks — one dies, everything lost | 100% |
| **RAID 1** | mirroring | 2 | 1 disk | 50% |
| **RAID 5** | striping + distributed parity | **3** | 1 disk | (n−1)/n |
| **RAID 6** | double parity | 4 | **2** disks | (n−2)/n |
| **RAID 10** | mirror + stripe (1+0) | 4 | 1 per mirror pair | 50% |

- **Trap:** RAID 0 = speed with ZERO redundancy — "best performance, no fault tolerance" = RAID 0. "Balance of safety + capacity for databases" = RAID 5/10. "Survive TWO simultaneous failures" = RAID 6.
- **File systems:** FAT32 (4 GB max file size — classic MCQ), NTFS (Windows, journaling), ext4 (Linux, journaling — journaling = log of pending writes so a crash can't corrupt). **inode** = Unix's per-file metadata block — stores everything about a file EXCEPT its name (names live in directories).
- **Disk scheduling:** FCFS, SSTF (shortest-seek-first — can starve far-away requests), **SCAN** (the "elevator" — sweeps one direction serving everything, reverses), C-SCAN (serves one direction then jumps back — more uniform waiting).
- **Spooling** = Simultaneous Peripheral Operations OnLine — the print-queue idea: jobs buffer to disk so the CPU isn't held hostage by a slow device.

---

## 6. Linux / Unix Essentials — recalled in SEBI papers

### The file system tree — one root, everything hangs off `/`

**Plain words:** unlike Windows' C:\ D:\, Linux has ONE tree starting at `/` — every device, config, and file hangs somewhere on it. "In Unix, everything is a file" — even your terminal and disks appear as files under `/dev`.

| Dir | Holds |
|---|---|
| `/` | root of everything |
| `/bin`, `/sbin` | essential user / system binaries |
| `/etc` | config files (passwd, fstab) |
| `/home` | user directories |
| `/var` | logs, spool, variable data |
| `/tmp` | temp files, cleared on reboot |
| `/dev` | device files — disks, terminals |
| `/proc` | live kernel/process info (a virtual FS — nothing is stored) |

**REMEMBER:** *"In Unix everything is a file — /dev holds devices, /proc holds the living kernel."*

### Process & system commands — the MCQ set

| Command | Does |
|---|---|
| `ps` | snapshot of processes (`ps aux` = all users, all processes) |
| `top` / `htop` | LIVE refreshing view of processes + CPU + memory |
| `kill PID` | send a signal; `kill -9` = SIGKILL (force, can't be caught); `kill -15` = SIGTERM (polite default — "please exit") |
| `nice` / `renice` | set / change priority (range −20 highest … +19 lowest — negative = MORE priority, the trap) |
| `fg` / `bg` / `jobs` | foreground / background / list suspended jobs (`Ctrl+Z` suspends, `&` starts in background) |
| `free` / `df` / `du` | RAM usage / disk free per filesystem / disk used per directory |
| `chmod` / `chown` / `chgrp` | permissions / owner / group |
| `ln -s` | symbolic (soft) link — a shortcut storing a PATH; hard link = a second name for the same inode |

- **Soft vs hard link trap:** a soft link stores a path — delete the original, it dangles dead. A hard link points at the same inode — data survives until the LAST link dies.
- **Signal trap:** SIGKILL (9) can't be caught, blocked, or ignored — the unblockable kill.

### Permissions — `chmod` numerics come up

**Plain words:** every file has three permission groups — **owner → group → others** — and each can have **r**ead (4), **w**rite (2), e**x**ecute (1). Sum the numbers per group → one digit → three digits = the octal code.

- `chmod 755 file` → owner rwx (7), group r-x (5), others r-x (5) — the standard for scripts/directories.
- `chmod 644` → owner rw- (6), group r-- (4), others r-- (4) — standard for files.
- `chmod 777` = everyone, everything — the "never do this" answer in security questions.
- Reading backwards: `rwxr-xr--` = owner 7, group 5, others 4 → **754**.
- For directories the letters change meaning: `x` = may *enter* it, `r` = may *list* it, `w` = may *create/delete inside* it — subtle but asked.

### Boot & core concepts
- Boot chain: BIOS/UEFI → **bootloader (GRUB)** → kernel → **init/systemd (PID 1)** → login.
- **Kernel** = the OS core (process/memory/device/file management); **shell** = the command interpreter wrapped around it — "kernel vs shell" is a classic MCQ.
- **Runlevels/targets** = system modes (multi-user vs graphical); `systemctl` manages services.
- **Cron** = scheduled jobs (`crontab -e`); format = `min hour day month weekday command`.

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
- Testbook: OS + Unix/Linux chapter tests on Days 26–27 (Sanfoundry OS tests for overflow — see Practice Links).

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
