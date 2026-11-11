# Information & Cyber Security — Full Study Notes (10% of Paper 2)

> **Official syllabus:** cyber attacks · software development security · network security · authentication · CIA triad (Confidentiality, Integrity, Availability) · network audit · systems audit.
>
> **How SEBI tests it:** name-the-attack MCQs, CIA-triad scenario matching, crypto type (symmetric/asymmetric/hash), authentication factors, security definitions. Mostly recall + scenario matching — high marks-per-hour.

---

## 1. CIA Triad — the foundation everything hangs on

| | Means | Broken by | Protected by |
|---|---|---|---|
| **C**onfidentiality | only authorized eyes see it | eavesdropping, data breach | encryption, access control |
| **I**ntegrity | data isn't tampered | MITM edits, unauthorized changes | hashing, digital signatures, checksums |
| **A**vailability | service is up when needed | DDoS, ransomware, hardware failure | redundancy, backups, anti-DDoS |

- **Scenario MCQ method:** ask "what got hurt?" — stolen data = C, altered data = I, service down = A. Real exam phrasing: "attacker floods the server so users can't access" → **Availability**.
- Extended triad sometimes adds **Authenticity + Non-repudiation** (know the terms — non-repudiation = can't deny you did it → digital signatures give this).

---

## 2. Cyber Attacks — name every one (the highest-yield block)

### The must-know attack list
| Attack | One-line definition | Key sign |
|---|---|---|
| **Phishing** | fake emails/sites stealing credentials | look-alike login page |
| **Spear phishing** | phishing TARGETED at a specific person/org | personalized bait |
| **Whaling** | spear phishing aimed at CEOs/exec | big fish only |
| **Vishing/Smishing** | phishing via voice/SMS | phone/SMS channel |
| **Malware** | umbrella term for malicious software | — |
| **Virus** | attaches to a host file, needs human action to spread | file-infecting |
| **Worm** | self-replicates across network, NO host needed, no human action | spreads on its own |
| **Trojan** | disguised as legit software, doesn't self-replicate | fake helpful app |
| **Ransomware** | encrypts your files, demands payment | WannaCry is the famous example |
| **Spyware** | secretly monitors/steals user activity | keyloggers inside |
| **Adware** | unwanted ads, often bundled | pop-up floods |
| **Rootkit** | hides deep (kernel/boot), gives persistent admin access | invisible to AV |
| **Botnet/Zombie** | army of infected machines controlled remotely | used to launch DDoS |
| **DoS / DDoS** | flood target to deny service; DDoS uses botnet | availability attack |
| **MITM** | attacker secretly relays/alters messages between two parties | fake Wi-Fi hotspot |
| **SQL Injection** | malicious SQL via input fields (`' OR 1=1 --`) | login bypass |
| **XSS** | injects malicious scripts into web pages others view | stolen cookies/sessions |
| **CSRF** | tricks a logged-in user's browser into unwanted actions | forged request |
| **Zero-day** | exploit of a vulnerability before any patch exists | no defense yet |
| **Brute force** | tries every password combo | slow, sure |
| **Dictionary attack** | tries common words/list | faster than brute |
| **Password spraying** | one common password against MANY accounts (evades lockouts) | few tries per account |
| **Social engineering** | hacking the HUMAN (pretexting, baiting, tailgating) | weakest link = people |
| **Shoulder surfing** | watching your screen/keyboard | physical |
| **Watering hole** | infect a site your targets visit | group-specific |
| **Cryptojacking** | secretly uses your CPU to mine crypto | device slows, hot |
| **APT** | advanced persistent threat — long stealthy nation-grade campaign | months inside |
| **Spoofing** | faking identity (IP spoof, email spoof, ARP spoof) | forged source |
| **ARP poisoning** | fake ARP replies → reroute LAN traffic (enables MITM) | gateway MAC hijack |
| **DNS poisoning** | corrupt DNS cache → send users to fake sites | wrong IP served |
| **Session hijacking** | steal session token/cookie → become you | bypasses login |

- REMEMBER virus vs worm vs trojan: *"Virus rides a file, Worm walks alone, Trojan wears a disguise."*
- **SQLi vs XSS (they're paired in exams):** SQLi attacks the DATABASE through inputs; XSS attacks other USERS through the page. Defenses: SQLi → parameterized queries/prepared statements; XSS → input sanitization + output encoding + CSP.
- **CSRF vs XSS:** XSS injects script INTO the site; CSRF abuses your logged-in session FROM another site. Defense CSRF → anti-CSRF tokens, SameSite cookies.

---

## 3. Cryptography — the second pillar

### Symmetric vs Asymmetric — THE comparison question
| | **Symmetric** | **Asymmetric** |
|---|---|---|
| Keys | ONE shared key | key PAIR (public + private) |
| Speed | fast, bulk data | slow, small data |
| Examples | **AES**, DES, 3DES, Blowfish, RC4 | **RSA**, ECC, DSA, Diffie-Hellman |
| Problem | key distribution — how do you share the secret key securely? | solved — public key can be public |

- **DES:** 56-bit key (broken, insecure now). **3DES:** DES ×3 (legacy). **AES:** 128/192/256-bit keys, the current standard (MCQ answer for "standard symmetric cipher").
- **RSA:** security rests on factoring large primes. **ECC:** same strength with smaller keys → mobile/TLS.
- **Diffie-Hellman:** key-EXCHANGE protocol — lets two parties build a shared secret over an open channel (not encryption itself).

### Hashing — one-way, no key
- Hash = fixed-length fingerprint; one-way (can't reverse); any input change → avalanche of output change.
- **MD5** (128-bit, BROKEN — collision-prone), **SHA-1** (160-bit, deprecated), **SHA-256/SHA-3** (current standard). "Which hash is still secure?" → SHA-256+.
- Uses: integrity checks, password storage (always + **salt** — random value that kills rainbow-table lookups — classic MCQ), digital signatures.
- Hashing ≠ encryption: encryption is reversible with a key; hashing never is.

### Digital signature vs digital certificate
- **Digital signature:** sender signs with their PRIVATE key → anyone verifies with the PUBLIC key → gives **integrity + authenticity + non-repudiation** (all three — a favourite multi-answer).
- **Digital certificate:** binds a public key to an identity, issued by a **CA (Certificate Authority)** → this is **PKI** (Public Key Infrastructure). X.509 is the cert standard.
- **How HTTPS/TLS works (one-para version they ask):** asymmetric crypto only for the handshake (verify cert + exchange a session key) → then fast SYMMETRIC encryption for the actual data. *"Asymmetric knocks on the door, symmetric carries the boxes."*
- SSL is dead, **TLS** is the live protocol (TLS 1.2/1.3). HTTPS = HTTP + TLS, port 443.

---

## 4. Authentication — factors & systems

- **The three factors (memorise — scenario MCQs):**
  - **Something you KNOW** — password, PIN, security question.
  - **Something you HAVE** — OTP token, smart card, phone.
  - **Something you ARE** — biometrics (fingerprint, iris, face).
- **2FA/MFA = combining ≥2 DIFFERENT factors.** Password + security question = still ONE factor (both "know") — the classic trap answer.
- Biometric metrics: **FAR** (false acceptance — lets impostor in, worse) vs **FRR** (false rejection — locks out legit user). **CER/EER** = the crossover point where FAR=FRR → lower = better system (asked!).
- Kerberos — ticket-based network auth (KDC issues tickets, no password over wire). SSO = one login, many services. OAuth = authorization delegation (not authentication!). SAML = enterprise SSO assertions.
- Password storage best practice: salted + hashed (bcrypt/Argon2), never plaintext, never reversible.

---

## 5. Network & Systems Security
- **Firewall types:** packet-filter (stateless, L3/4) → stateful inspection (tracks connections) → application proxy/NGFW (L7, inspects content). WAF = web-application firewall (blocks SQLi/XSS at L7).
- **DMZ** — screened subnet hosting public-facing servers between internet and LAN.
- **IDS vs IPS** — IDS detects & alerts (passive); IPS blocks inline (active). Signature-based (known patterns) vs anomaly-based (behavior deviations → catches zero-days but false-positives).
- **Honeypot** — decoy system to lure/study attackers.
- **VPN** — encrypted tunnel over public network. **IPSec** (L3 VPN) vs SSL/TLS VPN.
- **NAC**, MAC filtering, 802.1X port auth — network admission ideas.
- Security models (occasional): Bell-LaPadula = confidentiality (no read up, no write down — "no read-up, no write-down"); Biba = integrity (mirror rules); least privilege; defense in depth; zero trust ("never trust, always verify").

### Software development security (syllabus line)
- Secure SDLC — security baked into each phase (shift left).
- OWASP Top 10 awareness: injection, broken auth, XSS, insecure design — know the top few names.
- Code review, static analysis (SAST — scans source), dynamic analysis (DAST — attacks running app), fuzzing.

---

## 6. Network & Systems Audit (in the syllabus — 1–2 easy Qs)
- **Audit** = independent check that controls work. Types: internal, external, compliance.
- **Network audit** — reviews firewall rules, access controls, configs, vulnerabilities (vulnerability assessment → finds holes; **penetration testing** → actively exploits them, authorized — VA vs pentest is an MCQ pair).
- **Systems audit** — checks OS/app controls: patching, user rights, logging, change management.
- Audit trail/logs = evidence of who did what when (non-repudiation support).
- COBIT/ISO 27001 = governance/security-management frameworks (name-level).

---

## Question types SEBI asks here
1. Name-the-attack (phishing vs spear vs whaling; virus vs worm vs trojan).
2. CIA scenario → which pillar broke.
3. Symmetric vs asymmetric + algorithm ID (AES, RSA, DES facts).
4. Hashing facts (MD5/SHA broken or not, salt purpose).
5. Digital signature/cert/PKI — who signs with which key.
6. Auth factors (2FA = two DIFFERENT types; FAR/FRR).
7. Defenses (IDS vs IPS, DMZ, firewall generations).

## Drills (Days 15–20)
- Day 15: CIA + crypto core (symmetric/asymmetric/hash) — write the three comparison tables from memory.
- Day 16: hashing, signatures, PKI/TLS — draw the handshake flow once.
- Day 17: write the FULL attack list from memory (names + one line each) — that's the real drill.
- Day 18: defenses + authentication factors.
- Day 19: audit + software-security + 20 MCQs mixed.
- Day 20: Testbook "Cyber Security" chapter test — log every misnamed attack.

---

## Worked Examples — 10 solved in exam pattern

**Ex 1 — name the attack.** "Employee gets a fake 'IT dept' email asking them to 'verify' their password on a lookalike page."
**Ans: Phishing** (spear phishing if targeted). Email spoofed + credential harvesting — not MITM (that's interception), not vishing (that's voice).

**Ex 2 — CIA property.** "Attacker alters a transaction amount mid-transfer." / "Server flooded until legitimate users can't reach it."
**Ans: Integrity / Availability.** Altered data = integrity broken; knocked offline = availability broken. Leaked = confidentiality.

**Ex 3 — symmetric vs asymmetric.** "Why does HTTPS use BOTH?"
**Ans: asymmetric (RSA/ECC) for the handshake/key-exchange, symmetric (AES) for the bulk data** — symmetric is ~1000× faster but can't solve "how do we share the key safely"; asymmetric solves exactly that.

**Ex 4 — digital signature direction.** "Alice signs a document for Bob — encrypts with which key? Bob verifies with which?"
**Ans: Alice's PRIVATE key signs; Alice's PUBLIC key verifies.** Trap: reversing it. *(REMEMBER: confidentiality = encrypt with receiver's public; authenticity/signature = encrypt with sender's private.)*

**Ex 5 — hash property.** "Why is a hash used for password storage instead of encryption?"
**Ans: hashing is one-way — can't be reversed; encryption is meant to be decrypted.** MD5/SHA-1 are broken; SHA-256/bcrypt acceptable. Salt defeats rainbow tables.

**Ex 6 — firewall type.** "Firewall that inspects per-packet headers only vs one that tracks full connection state vs one that understands HTTP."
**Ans: packet-filtering / stateful inspection / application (proxy) firewall** — dumb→smart, fast→thorough.

**Ex 7 — IDS vs IPS.** "System sits offline and raises alerts vs sits inline and blocks."
**Ans: IDS detects + alerts / IPS prevents + blocks inline.** DMZ = the buffer network between internet and internal LAN where public servers live.

**Ex 8 — factor counting.** "Password + OTP sent to your phone — how many factors? Password + security question?"
**Ans: 2 factors / 1 factor.** OTP = possession (your phone). Security question = knowledge again — same category doesn't stack. Factors: know (password), have (token/phone), are (biometric).

**Ex 9 — web-attack trio.** "Script injected into a page that steals other users' cookies" vs "attacker's site makes your logged-in browser fire a hidden request" vs "' OR 1=1-- in a login field."
**Ans: XSS / CSRF / SQL injection.** XSS targets users via the site; CSRF abuses your logged-in session; SQLi attacks the database through input.

**Ex 10 — TLS/PKI role.** "Who vouches that a website's public key is really theirs?"
**Ans: the Certificate Authority (CA)** — it signs the site's certificate; your browser trusts the CA chain. Expired/self-signed cert = the browser warning you know.
