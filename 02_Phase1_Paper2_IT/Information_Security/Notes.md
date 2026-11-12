# Information & Cyber Security — Full Study Notes (10% of Paper 2)

> **Official syllabus:** cyber attacks · software development security · network security · authentication · CIA triad (Confidentiality, Integrity, Availability) · network audit · systems audit.
>
> **How SEBI tests it:** name-the-attack MCQs, CIA-triad scenario matching, crypto type (symmetric/asymmetric/hash), authentication factors, security definitions. Mostly recall + scenario matching — high marks-per-hour.

**How to read:** security is a vocabulary-heavy topic — the trick is that every attack/defense is just a story. Each entry below gives the story, then the one-line exam rule. When two things look alike (virus/worm/trojan, SQLi/XSS/CSRF), the "who gets hurt" question separates them.

---

## 1. CIA Triad — the foundation everything hangs on

**Plain words:** security has exactly three goals. Picture your bank account:
- **Confidentiality** — only YOU can see your balance (a hacker reading it = C broken)
- **Integrity** — the balance is CORRECT (someone editing ₹500→₹50,000 = I broken)
- **Availability** — the ATM actually works when you need it (DDoS knocking the bank offline = A broken)

| | Means | Broken by | Protected by |
|---|---|---|---|
| **C**onfidentiality | only authorized eyes see it | eavesdropping, data breach | encryption, access control |
| **I**ntegrity | data isn't tampered | MITM edits, unauthorized changes | hashing, digital signatures, checksums |
| **A**vailability | service is up when needed | DDoS, ransomware, hardware failure | redundancy, backups, anti-DDoS |

- **Scenario MCQ method:** ask "what got hurt?" — stolen data = C, altered data = I, service down = A. Real exam phrasing: "attacker floods the server so users can't access" → **Availability**.
- The extended triad adds **Authenticity + Non-repudiation** (non-repudiation = you can't later deny doing it → digital signatures provide it).

---

## 2. Cyber Attacks — name every one (the highest-yield block)

**How to learn this list:** don't memorise 30 definitions — learn the *axes* they differ on: how it spreads (virus needs a host file, worm doesn't), what it pretends to be (trojan = fake legit app), what channel it uses (email vs SMS vs voice), who's the target (everyone vs one person vs the CEO), and who it attacks (the DB vs users vs your session).

### The must-know attack list

| Attack | The story | Key sign |
|---|---|---|
| **Phishing** | mass fake emails/sites stealing credentials — "verify your SBI password" | look-alike login page |
| **Spear phishing** | same trick but crafted for ONE target — uses your real name/role | personalized bait |
| **Whaling** | spear phishing aimed at the CEO/CFO — the "big fish" | executive target |
| **Vishing/Smishing** | phishing via voice call / SMS | phone channel |
| **Virus** | malicious code that RIDES a host file — needs you to run it to spread | file-infecting, needs human |
| **Worm** | self-replicates across the network ALONE — no host file, no human | spreads by itself |
| **Trojan** | pretends to be legit software (a "free PDF tool") but carries a payload; doesn't self-replicate | disguise |
| **Ransomware** | encrypts your files, demands payment — WannaCry is the famous one | locked files + ransom note |
| **Spyware** | silently watches — keyloggers steal every keystroke | invisible monitoring |
| **Adware** | floods you with ads, usually bundled with free apps | pop-ups |
| **Rootkit** | hides deep in the OS (kernel/boot) for persistent admin access | invisible even to antivirus |
| **Botnet/Zombie** | an army of infected machines remotely controlled — the workforce behind DDoS | thousands of devices acting together |
| **DoS / DDoS** | flood a target until real users can't get in; DDoS uses a botnet so blocking one source fails | pure availability attack |
| **MITM** | attacker secretly sits BETWEEN two parties relaying (and editing) messages — the postman who opens your letters | rogue Wi-Fi hotspot, ARP poison |
| **SQL Injection** | typing SQL into an input field — `' OR 1=1 --` makes a login check always-true | attacks the DATABASE |
| **XSS** | injecting a malicious script into a page OTHER USERS view — it runs in their browser, steals cookies | attacks USERS via the site |
| **CSRF** | your logged-in browser gets tricked into firing a request you never meant (a hidden "transfer money" link on another site) | abuses YOUR logged-in session |
| **Zero-day** | exploit of a bug nobody knew about — no patch exists yet | no defense available |
| **Brute force** | try EVERY combination — slow but guaranteed | aaaa, aaab… |
| **Dictionary attack** | try a list of common words/passwords | faster, might miss |
| **Password spraying** | one common password ("Winter2026!") tried across MANY accounts — stays under lockout limits | few tries per account |
| **Social engineering** | hacking the HUMAN — pretexting (fake story), baiting (infected USB left in parking lot), tailgating (following staff through a door) | weakest link = people |
| **Shoulder surfing** | literally watching your screen/keyboard | physical |
| **Watering hole** | infect a site your TARGETS visit, wait for them to come | ambush, not chase |
| **Cryptojacking** | secretly mines crypto on your CPU | device slow, hot, fans loud |
| **APT** | advanced persistent threat — patient, well-funded (often nation-state) intruders inside for months | long stealth campaign |
| **Spoofing** | faking a source identity — fake sender IP, fake "From:" email, fake MAC | forged identity |
| **ARP poisoning** | fake ARP replies telling the LAN "the gateway is at MY MAC" → traffic reroutes through attacker → enables MITM | gateway MAC hijack |
| **DNS poisoning** | corrupting a DNS cache so the real domain resolves to a fake IP — you type the right URL, land on the wrong site | wrong IP served |
| **Session hijacking** | stealing a session cookie/token = becoming you without needing your password | skips the login entirely |

- REMEMBER virus vs worm vs trojan: *"Virus rides a file, Worm walks alone, Trojan wears a disguise."*
- **SQLi vs XSS vs CSRF — the exam trio:** ask "who's the victim?" SQLi attacks the **database** (through inputs — defend with parameterized queries/prepared statements). XSS attacks **other users** (through the page — defend with input sanitization + output encoding + CSP). CSRF attacks **your logged-in session** (from another site — defend with anti-CSRF tokens + SameSite cookies).
- REMEMBER password attacks: *"Brute tries everything, dictionary tries words, spraying tries one password everywhere."*

---

## 3. Cryptography — the second pillar

### Symmetric vs Asymmetric — THE comparison question

**Plain words — two kinds of locks:**
- **Symmetric** = one shared key, like the single house key both roommates carry. Fast and great for bulk data — but there's a chicken-and-egg problem: how do you *give* your partner the key without a stranger intercepting the copy?
- **Asymmetric** = a key PAIR. Think of a mailbox: the **public key** is the mail slot — anyone can drop a letter in (encrypt). The **private key** is the only key that opens the box (decrypt). The key-distribution problem vanishes — the public key can be posted on a billboard.

| | **Symmetric** | **Asymmetric** |
|---|---|---|
| Keys | ONE shared key | key PAIR (public + private) |
| Speed | fast, bulk data | slow, small data |
| Examples | **AES**, DES, 3DES, Blowfish, RC4 | **RSA**, ECC, DSA, Diffie-Hellman |
| Problem | key distribution — sharing the secret safely | solved — public key is meant to be public |

- **DES** = 56-bit key, broken, insecure. **3DES** = DES run three times, legacy. **AES** = 128/192/256-bit — THE current standard (the MCQ answer for "standard symmetric cipher").
- **RSA** = security rests on factoring huge primes being hard. **ECC** = same strength with much smaller keys → mobile and TLS.
- **Diffie-Hellman** = a key-EXCHANGE protocol — two strangers build a shared secret over a channel everyone's watching (it's not encryption itself — it makes the key for it).

### Hashing — one-way, no key

**Plain words:** a hash is a fingerprint of data — feed anything in, get a fixed-length code out. It's a meat grinder: easy to grind the cow into mince, impossible to rebuild the cow. Any tiny input change → avalanche of output change.

- **MD5** (128-bit) = BROKEN (collisions found). **SHA-1** = deprecated. **SHA-256/SHA-3** = current standards. "Which hash is still safe?" → SHA-256+.
- Uses: file-integrity checks, password storage (always **+ salt** — a random value stirred in so precomputed "rainbow tables" of hashes become useless — classic MCQ), digital signatures.
- **Hashing ≠ encryption:** encryption is reversible with the right key; hashing never reverses.

### Digital signature vs digital certificate

- **Digital signature:** you sign with YOUR PRIVATE key → anyone verifies with your PUBLIC key. Since only you hold the private key, a verified signature proves it came from you and wasn't altered → gives **integrity + authenticity + non-repudiation** (all three — favourite multi-answer). *Direction trap: signing = sender's private; encrypting a secret for someone = receiver's public.*
- **Digital certificate:** a CA (Certificate Authority) vouches "this public key really belongs to sebi.gov.in" — binding an identity to a key. The system of CAs + certificates = **PKI**. X.509 is the certificate format standard.
- **How HTTPS/TLS actually works (the one-para version):** asymmetric crypto is used ONLY for the handshake — verify the certificate + exchange a fresh session key — then fast SYMMETRIC (AES) encryption carries the real data. *"Asymmetric knocks on the door, symmetric carries the boxes."*
- SSL is dead — **TLS** is the live protocol (1.2/1.3). HTTPS = HTTP + TLS on port 443.

---

## 4. Authentication — factors & systems

**Plain words:** authentication = proving you are who you claim. There are only THREE kinds of proof:
- **Something you KNOW** — password, PIN, security question.
- **Something you HAVE** — phone (receiving OTP), hardware token, smart card.
- **Something you ARE** — biometrics: fingerprint, iris, face.

- **2FA/MFA = combining ≥2 DIFFERENT factors.** ATM card + PIN = genuine 2FA (have + know). Password + security question = still ONE factor — both are "know" — the classic trap answer.
- **Biometric accuracy metrics:** **FAR** = false acceptance rate — lets an impostor IN (the dangerous direction); **FRR** = false rejection rate — locks a legit user OUT (the annoying direction). **CER/EER** = the error rate where the two curves cross → lower = better system (asked!).
- **Kerberos** — ticket-based network authentication: a KDC issues time-stamped tickets so passwords never cross the wire. **SSO** = one login, many services. **OAuth** = delegated AUTHORIZATION (letting an app act for you — not authentication). **SAML** = enterprise SSO assertions.
- Password storage rule: **salted + hashed** (bcrypt/Argon2), never plaintext, never reversible encryption.

---

## 5. Network & Systems Security

- **Firewall generations (dumb → smart):** packet-filtering (reads only IP/port headers, stateless) → stateful inspection (knows which packets belong to conversations a user started) → application proxy/NGFW (L7, understands content — can block a malicious URL). **WAF** = web-application firewall, the L7 kind that catches SQLi/XSS.
- **DMZ** = the screened buffer subnet between the internet and your LAN — where public-facing servers (web, mail) live so a breach there doesn't expose the inside.
- **IDS vs IPS:** IDS = CCTV + alarm — watches and alerts but can't stop (passive, off to the side). IPS = a guard standing IN the doorway — blocks inline (active). Detection styles: **signature-based** (matches known attack patterns — reliable but blind to new attacks) vs **anomaly-based** (flags behaviour deviations — catches zero-days but cries wolf).
- **Honeypot** = a deliberately juicy decoy server to lure attackers and study their methods.
- **VPN** = an encrypted tunnel through the public internet — outsiders see scrambled traffic. **IPSec** = L3 VPN; SSL/TLS VPN works through the browser.
- **802.1X / NAC / MAC filtering** = "prove you belong here before the port opens" — network admission control ideas.
- **Security models (name-level but asked):** **Bell-LaPadula** = confidentiality model for classified systems — "no read UP, no write DOWN" (a corporal can't read top-secret files; a general can't write secrets into unclassified ones — prevents leaking downward). **Biba** = the integrity mirror — "no read down, no write up". Plus: least privilege, defense in depth, **zero trust** = "never trust, always verify" — even inside the network.

### Software development security (syllabus line)
- **Secure SDLC** — security built into every phase, not bolted on at the end ("shift left").
- **OWASP Top 10** — the famous web-risk list: injection, broken authentication, XSS, insecure design — know the top few names.
- **SAST** = static analysis — scans source code without running it. **DAST** = dynamic — attacks the RUNNING app. **Fuzzing** = throwing malformed/random input to find crashes.

---

## 6. Network & Systems Audit (in the syllabus — 1–2 easy Qs)

**Plain words:** an audit = an independent check that your controls actually work — not whether they exist on paper.

- Types: internal, external, compliance.
- **Network audit** — reviews firewall rules, access controls, configs, open vulnerabilities.
- **VA vs pentest (the MCQ pair):** vulnerability assessment = scanning to FIND holes ("your lock looks weak"); penetration testing = authorized experts actively EXPLOITING them ("we picked the lock to prove it").
- **Systems audit** — OS/app controls: patching levels, user rights, logging, change management.
- **Audit trail/logs** = the who-did-what-when evidence — supports non-repudiation.
- **COBIT / ISO 27001** = governance & security-management frameworks (name-level only).

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
- Day 19: audit + software-security + 20 MCQs mixed (Sanfoundry cyber-security tests — see Practice Links).
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
