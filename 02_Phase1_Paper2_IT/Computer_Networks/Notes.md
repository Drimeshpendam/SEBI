# Computer Networks — Full Study Notes (10% of Paper 2)

> **Official syllabus:** ISO/OSI stack · LAN technologies (Ethernet, Token Ring) · TCP/UDP · IP · switches, gateways, routers · application-layer protocols (DNS, SMTP, POP, FTP, HTTP) · firewalls.
>
> **How SEBI tests it:** layer↔protocol/device matching, port numbers, TCP vs UDP, subnetting numerics, "which layer does X" MCQs. Mostly fact-recall + one numeric type (subnetting).

## 📅 DAY MAP — which sections match your plan day

| Plan day | Target | Read these sections | Then do |
|---|---|---|---|
| **D8** | OSI vs TCP/IP + ports | §1 OSI Model (+device↔layer map) → §4 Ports & Protocols | memorize both tables cold |
| **D9** | subnetting + IP addressing | §2 IP Addressing & Subnetting (whole section) | 10 subnetting drills — 30-sec method |
| **D10** | TCP vs UDP, routing, devices, firewall | §3 TCP vs UDP → §5 LAN → §6 Routing & WAN → §7 Firewalls | state-diagram dry-run + device matching |
| **D11** | topic test | whole file skim → error-log rules | 25-Q test + redo wrongs |

---

**How to read:** every topic goes *plain-English explanation → a tiny example you can see → the exam rule/trap*. Networks sound abstract until you attach them to a postal system or a phone call — the analogies below are doing real work, not decoration.

---

## 1. The OSI Model — the single highest-yield table

**Plain words:** sending data across a network is too big a job for one piece of software, so it's split into 7 layers — like sending a parcel involves a letter-writer, an envelope, a postbox, sorting office, trucks, and the recipient's letterbox. Each layer does ONE job, talks only to the layers directly above/below it, and can be swapped out (change from cable to Wi-Fi) without breaking the rest.

**See it — sending a WhatsApp message:**
- You type text (the app's job — top layer)
- It gets formatted/encrypted (presentation)
- A "conversation" is opened (session)
- It's chopped into numbered pieces for delivery (transport)
- Each piece gets a destination IP and is routed across the internet (network)
- Each hop frames it with MAC addresses for the next device (data link)
- Finally it's actual voltages/radio on a wire/air (physical)

| # | Layer | Does what | Protocols/devices | PDU name |
|---|---|---|---|---|
| 7 | **Application** | user-facing services | HTTP, FTP, SMTP, DNS, DHCP | data |
| 6 | **Presentation** | format/encrypt/compress | SSL/TLS (conceptually), JPEG, ASCII | data |
| 5 | **Session** | open/manage/end conversations | NetBIOS, sockets | data |
| 4 | **Transport** | end-to-end delivery, ports | **TCP, UDP** | **segment** |
| 3 | **Network** | routing, logical addressing | **IP, ICMP, routers**, OSPF | **packet** |
| 2 | **Data Link** | framing, MAC, error detection | switches, bridges, Ethernet, PPP | **frame** |
| 1 | **Physical** | bits on the wire | hubs, repeaters, cables | bits |

- REMEMBER (mnemonic, top-down): **"All People Seem To Need Data Processing."** (Bottom-up: Please Do Not Throw Sausage Pizza Away.)
- **Encapsulation = the envelope trick:** each layer wraps what it receives in its own header — your message inside a TCP header inside an IP header inside an Ethernet frame. That's why the "box" has a different name per layer (segment → packet → frame) — a real MCQ ("PDU at layer 3?" → packet).
- **TCP/IP model (4 layers) = OSI compressed:** Application (OSI 7+6+5) → Transport → Internet (3) → Network Access/Link (2+1). SEBI asks both — be able to map them.

### The device↔layer map (asked every cycle) — think of your home network
- **Hub** → L1: a dumb loudspeaker — every bit that arrives goes out EVERY port. (Ancient; nobody buys them.)
- **Repeater** → L1: just a signal booster for long cables.
- **Switch/Bridge** → L2: a smart receptionist — learns which MAC address lives on which port, forwards only where needed. Switch = multiport bridge, and splitting traffic kills collisions.
- **Router** → L3: the border post — reads IP addresses and moves packets between DIFFERENT networks (your LAN ↔ the internet). Also stops broadcast chatter from leaking across.
- **Gateway** → up to L7: a translator — converts between entirely different protocols/formats (e.g., email-to-SMS gateway).
- REMEMBER: *"Hub hears bits, Switch sees MACs, Router reads IPs, Gateway translates languages."*
- **Collision vs broadcast domain:** hub keeps both (one big shouting room); switch splits collision domains (each port = private line) but keeps broadcasts; **router splits BOTH** — the classic MCQ distinction.

---

## 2. IP Addressing & Subnetting — the numeric question

### IPv4 basics — what an address actually is
**Plain words:** an IPv4 address is a 32-bit house number for a device on a network, written as 4 decimal chunks (octets) of 0–255: `192.168.1.10`. The address has two parts — the *network* part (which street) and the *host* part (which house). The subnet mask or `/n` tells you where the split is.

- **Private ranges** (addresses that can only live inside LANs — routers drop them on the internet): `10.x.x.x`, `172.16.x.x–172.31.x.x`, `192.168.x.x`. Your home laptop's `192.168.1.x` never appears on the internet — NAT translates it. MCQ: "which is private?" → know all three ranges.
- **Loopback** `127.0.0.1` = "myself" (ping it to test your own stack).
- **APIPA/link-local** `169.254.x.x` = the address Windows self-assigns when DHCP fails → a favourite "diagnose the problem" MCQ.
- **Classes** (legacy but asked): A = 1–126 (/8), B = 128–191 (/16), C = 192–223 (/24), D = 224–239 (multicast), E = 240+ (experimental). First octet tells the class. REMEMBER: *"A big, B medium, C small — /8 /16 /24."*
- **IPv6** = 128 bits, written in hex with colons, `::` compresses zero-runs, NO broadcast (multicast instead).

### Subnetting — the 30-second method
**Plain words:** `/n` says the first n bits are the network; the remaining `32−n` bits name hosts inside it. Each "borrowed" bit doubles the number of subnets and halves the hosts per subnet — the trade-off IS the question.

- **Usable hosts = 2^(32−n) − 2** — minus 2 because the first address names the network and the last is the broadcast shout-to-everyone. So /24 → 254, /26 → 62, /30 → 2 (point-to-point links — an MCQ favourite because "only 2 hosts" feels wrong).
- **Block size** = 256 − last-interesting-octet-of-mask. /26 → mask 255.255.255.192 → block 64 → subnet boundaries at .0 .64 .128 .192.
- **Worked example, slowly:** `192.168.1.0/26` → block 64 → subnets: `.0–.63`, `.64–.127`, `.128–.191`, `.192–.255`. In the first subnet: network `.0`, usable `.1–.62`, broadcast `.63`. "How many usable?" → **62**.
- REMEMBER: *"Borrow bits for subnets — each borrowed bit doubles the count and halves the hosts."*
- **Default gateway** = your LAN's router IP — the exit door to other networks. Diagnostic MCQ: "pings local machines, can't reach internet" → wrong/missing gateway.

---

## 3. TCP vs UDP — the guaranteed question

**Plain words:** both live at the Transport layer and both deliver your data — the difference is *how much they promise*. **TCP = a phone call:** dial first (handshake), confirm every sentence, re-say anything that was lost, keep order — slower but trustworthy. **UDP = shouting a message / a postcard:** no setup, no confirmation, no resend — fast and fine when losing a tiny piece doesn't matter (a skipped video frame).

| | **TCP** | **UDP** |
|---|---|---|
| Connection | connection-oriented (3-way handshake) | connectionless (fire & forget) |
| Reliability | guaranteed, ordered, retransmits | no guarantee, no order |
| Speed/overhead | slower, 20-byte header | faster, 8-byte header |
| Use cases | HTTP(S), FTP, SMTP, SSH | DNS, DHCP, streaming, VoIP, TFTP |

- **3-way handshake as a dialogue:** client: "SYN — can we talk?" → server: "SYN-ACK — yes, can you?" → client: "ACK — confirmed." Memorise the exact order — real MCQ. Teardown: FIN-ACK-FIN-ACK.
- TCP extras: flow control = sliding window (receiver says how much it can take); congestion control = slow start.
- REMEMBER: *"TCP calls first and confirms every letter; UDP shouts into the crowd."*
- "Which uses UDP?" — anything real-time (video call, live game, DNS lookups) where speed beats perfection.

### TCP state names for dry-runs
`ESTABLISHED`, `LISTEN`, `TIME_WAIT` (waits 2×MSL after close so stragglers die), `SYN_SENT` — showing up in newer netstat-style questions.

---

## 4. Ports & Application Protocols — pure-memory marks

**Plain words:** the IP gets the packet to the right *computer*; the **port** gets it to the right *program* on that computer — like an apartment number inside a building. Port 80's program is the web server, port 25's is the mail sender.

| Port | Protocol | Does |
|---|---|---|
| 20/21 | **FTP** | file transfer (21 = commands, 20 = the actual data) |
| 22 | **SSH** | secure remote shell |
| 23 | Telnet | same job, unencrypted — "insecure SSH" |
| 25 | **SMTP** | SENDING email (server→server and client→server) |
| 53 | **DNS** | name↔IP resolution (UDP for lookups, TCP for zone transfers) |
| 67/68 | **DHCP** | hands out IP addresses automatically |
| 69 | TFTP | bare-bones file transfer over UDP |
| 80 | **HTTP** | web pages |
| 110 | **POP3** | downloads mail to ONE device, deletes from server |
| 143 | **IMAP** | mail stays ON the server, syncs to every device |
| 161/162 | SNMP | monitors/manages network devices |
| 443 | **HTTPS** | HTTP encrypted over TLS |
| 3389 | RDP | remote desktop |

- **SMTP vs POP3 vs IMAP — the trio they always test:** think of mail flowing two ways. **SMTP pushes** (sending). **POP3 pulls and pockets** — downloads to your laptop and removes from the server, so your phone sees nothing. **IMAP keeps everything on the server** — phone, laptop, web all show the same synced inbox. REMEMBER: *"SMTP Sends, POP Pulls-off, IMAP Is-online."*
- **DNS** = the internet's phonebook: resolver walks root → TLD (.com) → authoritative server to turn `sebi.gov.in` into an IP. Record types: A (IPv4), AAAA (IPv6), MX (mail server), CNAME (alias/nickname).
- **DHCP DORA:** Discover → Offer → Request → Acknowledge — a device broadcasts "anyone got an IP for me?", server offers, device requests it, server confirms. Real-style MCQ.
- **HTTP methods:** GET (read), POST (submit/create), PUT (replace), DELETE, HEAD (headers only), OPTIONS. **Status codes:** 2xx ok · 3xx redirect · 4xx YOUR fault (404 not found, 403 forbidden, 401 unauthorized) · 5xx SERVER's fault (500 error, 502 bad gateway, 503 unavailable).

---

## 5. LAN Technologies (named in the syllabus — guaranteed 1–2 Qs)

- **Ethernet (IEEE 802.3):** the LAN standard that won. Every NIC has a burned-in 48-bit **MAC address**. Classic shared-cable Ethernet used **CSMA/CD** = "Carrier Sense, Multiple Access, Collision Detect" — literally *listen before talking*; if two devices talk at once (collision), both back off a random time and retry. Like polite dinner-table conversation. Modern switched Ethernet runs full-duplex on private port links → no collisions at all.
- **Token Ring (IEEE 802.5):** IBM's alternative — a small "token" frame circulates the ring; only the station HOLDING the token may transmit. No collisions, perfectly fair, deterministic — but lost the market to cheaper Ethernet. REMEMBER: *"Ethernet shouts when quiet; Token Ring waits for the talking stick."*
- **IEEE numbers to memorise:** 802.3 Ethernet · 802.5 Token Ring · 802.11 Wi-Fi · 802.15 Bluetooth/WPAN · 802.16 WiMAX.
- **MAC vs IP:** MAC = the device's hardware ID (L2, like a person's name — travels with them); IP = logical address (L3, like a current address — changes when they move networks). **ARP** maps IP→MAC; **RARP** the reverse.
- **VLAN** = slicing one physical switch into separate logical LANs — broadcast domains without buying routers.

---

## 6. Routing & WAN

**Plain words:** routers keep tables of "to reach network X, forward to neighbour Y" and swap notes with other routers. HOW they swap notes defines the protocol.

- **Static** = an admin types routes by hand (tiny networks only) vs **dynamic** protocols below.
- **RIP** — distance-vector: asks neighbours "how many hops to X?" and believes them. Max **15 hops — 16 = unreachable** (classic MCQ — that's why RIP can't scale).
- **OSPF** — link-state: every router maps the WHOLE network, then runs **Dijkstra** for shortest paths. "Which protocol uses Dijkstra?" → OSPF, every time.
- **BGP** — the protocol BETWEEN ISPs (autonomous systems) — the internet's exterior glue, path-vector.
- **NAT** — your home router translating the private `192.168.x.x` to one public IP; it's why a whole house shares one internet address.
- **ICMP** — the network's error-messaging layer: `ping` and `traceroute` ride on it ("ping uses which protocol?" → ICMP, not TCP/UDP — a classic trap).

---

## 7. Firewalls (syllabus line + InfoSec overlap)

**Plain words:** a firewall = a bouncer checking packets against a guest list.

- **Packet-filtering** (L3/L4) — checks only the envelope (source/dest IP, port). Fast, dumb.
- **Stateful** — remembers connections ("this packet belongs to a conversation a user started") → much safer.
- **Application-layer / proxy** (L7) — opens the letter and reads it (inspects actual content, can block specific URLs or malware).
- **DMZ** = the buffer zone between public internet and private LAN — public-facing servers (web, mail) live THERE so a breach doesn't expose the internal network. "Where do you put the web server?" → DMZ.
- **IDS** = a CCTV alarm — detects and alerts but doesn't stop. **IPS** = a guard that blocks inline. **Honeypot** = a decoy server left juicy on purpose to study attackers.

---

## Question types SEBI asks here
1. Layer ↔ protocol/device matching (OSI table above = your answer key).
2. Port-number recall (the ports table).
3. TCP-vs-UDP use-case choice.
4. Subnetting numerics (usable hosts, block size, identify subnet).
5. LAN tech definitions (Ethernet CSMA/CD, Token Ring token, IEEE numbers).
6. Email trio (SMTP/POP3/IMAP roles).

## Drills (Days 8–13)
- Day 8: redraw the OSI table + device map from memory; TCP/IP mapping.
- Day 9: 10 subnetting problems (usable hosts, network/broadcast, block size) — time each ≤60s.
- Day 10: port table + email trio + TCP/UDP — write from memory, check.
- Day 11: routing protocols + LAN tech (IEEE numbers).
- Day 12: 20 GATE-style MCQs (GateOverflow networks / Sanfoundry CN tests — see Practice Links) + weak-area review.
- Day 13: Testbook "Networking" chapter test — log misses by table-row.

---

## Worked Examples — 10 solved in exam pattern

**Ex 1 — subnetting.** "192.168.1.0/26 — how many usable host addresses?"
**Ans: 62.** /26 leaves 6 host bits → 2⁶=64 addresses, minus network + broadcast = 62. *(Rule: usable = 2^(host bits) − 2, always.)*

**Ex 2 — IP class.** "Class of 172.16.5.4? Is it private?"
**Ans: Class B (128–191) — and YES, private** (172.16–172.31 is the private Class B range). Trap: 172.x looks "random" but sits inside private space.

**Ex 3 — device-to-layer.** "Router, switch, hub, repeater — which OSI layers?"
**Ans: Router=L3 (Network), Switch=L2 (Data link), Hub=L1 (Physical), Repeater=L1.** *(REMEMBER: hub shouts at everyone — no intelligence; switch learns MACs; router reads IPs.)*

**Ex 4 — port matching.** "HTTPS, SSH, FTP control, DNS — port numbers?"
**Ans: 443, 22, 21, 53.** Full set: HTTP 80, Telnet 23, SMTP 25, DHCP 67/68, POP3 110, IMAP 143, SNMP 161.

**Ex 5 — TCP or UDP?** "Live video call / file download where every byte must arrive — which protocol each?"
**Ans: video = UDP (speed over perfection), download = TCP (reliability).** UDP has no handshake, no retransmit, no ordering — exactly why it's fast.

**Ex 6 — OSI function.** "Which layer does routing? Which does encryption/compression? Which gives end-to-end delivery?"
**Ans: Network (L3), Presentation (L6), Transport (L4).** Mnemonic bottom-up: **P**hysical **D**ata **N**etwork **T**ransport — "Please Do Not Throw Sausage Pizza Away".

**Ex 7 — subnet count.** "Class C network subnetted with 3 borrowed bits — how many subnets?"
**Ans: 8 (2³)** — each borrowed bit doubles subnets, halves hosts. 3 borrowed → 8 subnets × 30 usable hosts.

**Ex 8 — email protocol.** "User reads mail on phone AND laptop, wants it synced everywhere — POP3 or IMAP?"
**Ans: IMAP (143).** POP3 (110) downloads and typically removes from server; IMAP keeps mail on the server and syncs.

**Ex 9 — handshake order.** "Correct TCP connection sequence?"
**Ans: SYN → SYN-ACK → ACK.** Client says SYN, server says SYN+ACK, client says ACK. *(REMEMBER: "ask, acknowledge-ask-back, confirm" — 3 steps, never 2 or 4.)*

**Ex 10 — protocol purpose.** "Which protocol maps IP→MAC? Which maps name→IP? Which gives auto-IP?"
**Ans: ARP, DNS, DHCP.** RARP does MAC→IP (the reverse). DHCP = "plug in and it just works".
