# Computer Networks — Full Study Notes (10% of Paper 2)

> **Official syllabus:** ISO/OSI stack · LAN technologies (Ethernet, Token Ring) · TCP/UDP · IP · switches, gateways, routers · application-layer protocols (DNS, SMTP, POP, FTP, HTTP) · firewalls.
>
> **How SEBI tests it:** layer↔protocol/device matching, port numbers, TCP vs UDP, subnetting numerics, "which layer does X" MCQs. Mostly fact-recall + one numeric type (subnetting).

---

## 1. The OSI Model — the single highest-yield table

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
- WHY layers exist: each layer serves the one above, independent — swap implementations without breaking others. Encapsulation = each layer wraps the above data with its own header (the reason PDU names differ — that's a real MCQ).
- **TCP/IP model (4 layers) = OSI compressed:** Application (7+6+5) → Transport → Internet (3) → Network Access/Link (2+1). SEBI asks both — map them.

### The device↔layer map (asked every cycle)
- **Hub** → L1 (dumb repeater, broadcasts to all). **Repeater** → L1 (signal boost).
- **Switch/Bridge** → L2 (forwards by MAC address; switch = multiport bridge, kills collisions).
- **Router** → L3 (forwards by IP, connects DIFFERENT networks, breaks broadcast domains).
- **Gateway** → all layers / L7 (translates between different protocols — e.g., email-to-SMS).
- REMEMBER: *"Hub hears bits, Switch sees MACs, Router reads IPs, Gateway translates languages."*
- **Collision domain vs broadcast domain:** hub keeps both; switch splits collision domains (each port = own) but keeps broadcast; router splits BOTH.

---

## 2. IP Addressing & Subnetting — the numeric question

### IPv4 basics
- 32 bits, written as 4 octets (0–255 each). Private ranges: 10.x.x.x, 172.16–31.x.x, 192.168.x.x — memorise (MCQ asks "which is private?").
- Loopback = 127.0.0.1. APIPA/link-local = 169.254.x.x (DHCP failed → this address appears — a favourite "diagnose" MCQ).
- Classes (legacy but asked): A 1–126 (/8), B 128–191 (/16), C 192–223 (/24), D 224–239 (multicast), E 240+ (experimental). REMEMBER: *"A big, B medium, C small — /8 /16 /24."*
- **IPv6** = 128 bits, hex with colons, no broadcasts (uses multicast), :: shorthand for zero-runs.

### Subnetting — the 30-second method
- CIDR /n → first n bits = network, rest = hosts.
- **Usable hosts = 2^(32−n) − 2** (−2: network + broadcast addresses are reserved). /24 → 254, /26 → 62, /30 → 2 (point-to-point links — MCQ favourite).
- **Block size** = 256 − last-interesting-octet-of-mask. /26 → mask .192 → block 64 → subnets at .0 .64 .128 .192.
- **Worked example:** 192.168.1.0/26 → block 64 → subnets: .0–.63, .64–.127, .128–.191, .192–.255. First subnet: network .0, usable .1–.62, broadcast .63. "How many usable hosts?" → 62.
- REMEMBER: *"Borrow bits for subnets, each borrowed bit doubles the count and halves the hosts."*
- Default gateway = router IP your LAN uses to reach other networks (diagnostic MCQ: "can't reach internet but pings LAN" → wrong gateway).

---

## 3. TCP vs UDP — the guaranteed question

| | **TCP** | **UDP** |
|---|---|---|
| Connection | connection-oriented (3-way handshake) | connectionless (fire & forget) |
| Reliability | guaranteed, ordered, retransmits | no guarantee, no order |
| Speed/overhead | slower, 20-byte header | faster, 8-byte header |
| Use cases | HTTP(S), FTP, SMTP, SSH | DNS, DHCP, streaming, VoIP, TFTP |

- **3-way handshake: SYN → SYN-ACK → ACK** (memorise the exact sequence — real MCQ). Teardown: FIN-ACK-FIN-ACK.
- TCP flow control = sliding window; congestion control = slow start.
- REMEMBER: *"TCP calls first and confirms every letter; UDP shouts into the crowd."*
- "Which uses UDP?" — anything real-time where a lost packet doesn't matter (video call) or tiny query/response (DNS).

### TCP state names for dry-runs
ESTABLISHED, LISTEN, TIME_WAIT (waits 2×MSL after close), SYN_SENT — appearing in newer netstat-style questions.

---

## 4. Ports & Application Protocols — pure-memory marks

| Port | Protocol | Does |
|---|---|---|
| 20/21 | **FTP** | file transfer (21 control, 20 data) |
| 22 | **SSH** | secure remote shell |
| 23 | Telnet | insecure remote shell |
| 25 | **SMTP** | SENDING email (server→server) |
| 53 | **DNS** | name↔IP resolution (UDP mostly, TCP for zone transfers) |
| 67/68 | **DHCP** | auto IP assignment |
| 69 | TFTP | trivial file transfer (UDP) |
| 80 | **HTTP** | web |
| 110 | **POP3** | PULLS email to device, deletes from server |
| 143 | **IMAP** | email stays ON server, syncs across devices |
| 161/162 | SNMP | network device monitoring |
| 443 | **HTTPS** | HTTP over TLS |
| 3389 | RDP | remote desktop |

- **SMTP vs POP vs IMAP (the trio they always test):** SMTP = sends. POP3 = downloads & deletes (offline, one device). IMAP = keeps on server, syncs everywhere. REMEMBER: *"SMTP Sends, POP Pulls-off, IMAP Is-online."*
- **DNS** resolves names→IP; recursive resolver walks root→TLD→authoritative; A record (IPv4), AAAA (IPv6), MX (mail), CNAME (alias).
- **DHCP DORA:** Discover → Offer → Request → Acknowledge (real-style MCQ).
- HTTP methods: GET (read), POST (create/submit body), PUT (replace), DELETE, HEAD, OPTIONS. Status codes: 2xx ok, 3xx redirect, 4xx client error (404 not found, 403 forbidden, 401 auth), 5xx server error (500, 502 bad gateway, 503 unavailable).

---

## 5. LAN Technologies (in the syllabus by name — guaranteed 1–2 Qs)

- **Ethernet (IEEE 802.3):** the dominant LAN tech; uses MAC addresses (48-bit, burned into NIC); classic version used **CSMA/CD** (listen-before-talk, detect collisions, back off) on shared coax — modern switched Ethernet is full-duplex, no collisions.
- **Token Ring (IEEE 802.5):** IBM's LAN — a **token frame** circulates; only the token-holder may transmit → no collisions, deterministic. Slower adoption, lost to Ethernet. REMEMBER: *"Ethernet shouts when quiet; Token Ring waits for the talking stick."*
- **IEEE numbers to memorise:** 802.3 Ethernet · 802.5 Token Ring · 802.11 Wi-Fi (WLAN) · 802.15 Bluetooth/WPAN · 802.16 WiMAX.
- MAC = physical/hardware address (L2), IP = logical address (L3). **ARP** maps IP→MAC; **RARP** the reverse.
- VLAN = logical LAN segmentation on one switch (broadcast domains without routers).

---

## 6. Routing & WAN
- **Static** (manual routes — small nets) vs **dynamic** routing protocols.
- **RIP** — distance-vector, hop-count metric, max 15 hops (16 = unreachable — classic MCQ).
- **OSPF** — link-state, Dijkstra inside, areas, fast convergence ("which uses Dijkstra?" → OSPF).
- **BGP** — the internet's exterior protocol, path-vector between autonomous systems.
- NAT — translates private↔public IPs (why 192.168.x.x works at home).
- ICMP — error/control messages (ping, traceroute uses it; "ping uses which protocol?" → ICMP).

---

## 7. Firewalls (syllabus line + InfoSec overlap)
- Packet-filtering firewall (L3/L4 — checks IP/port, stateless) vs **stateful** (tracks connections) vs **application-layer/proxy** firewall (L7 — inspects content).
- **DMZ** = buffer subnet between public internet and internal LAN — public-facing servers live there. "Where do you put the web server?" → DMZ.
- IDS (detects, alerts) vs IPS (blocks inline); honeypot = decoy to study attackers.

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
- Day 12: 20 GATE-style MCQs (GateOverflow networks) + weak-area review.
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
