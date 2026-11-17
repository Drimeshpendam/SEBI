// Exam-style practice bank — 5 questions per pattern, SEBI format (options A-E).
// Key: "<sectionIdx>-<topicIdx>-<patternIdx>" for Paper 1, "p2-<topicIdx>-<patternIdx>" for Paper 2.
export const examples = {

// ============ PAPER 1 > QUANT (section 0) ============

// Approximation > % of number + product
'0-0-0': [
{ q: '15.9% of 299.8 + 13.2 x 8.9 = ?', o: ['140', '155', '165', '178', '192'], a: 2, x: '16% of 300 = 48; 13 x 9 = 117; 48 + 117 = 165. Round each piece to a friendly cousin.' },
{ q: '79.9% of 599.5 - 24.9% of 239.8 = ?', o: ['380', '400', '420', '440', '465'], a: 2, x: '80% of 600 = 480; 25% of 240 = 60; 480 - 60 = 420. Map each % to its fraction family (80% = 4/5, 25% = 1/4).' },
{ q: '24.9% of 480.2 - 11.1 x 3.9 = ?', o: ['62', '70', '76', '84', '96'], a: 2, x: '25% of 480 = 120; 11 x 4 = 44; 120 - 44 = 76.' },
{ q: '44.9% of 440.1 + 8.2 x 5.9 = ?', o: ['218', '232', '246', '258', '272'], a: 2, x: '45% of 440 = 198; 8 x 6 = 48; 198 + 48 = 246.' },
{ q: '62.4% of 800.3 + 4.9 x 9.1 = ?', o: ['518', '532', '545', '558', '575'], a: 2, x: '62.5% = 5/8, so 5/8 of 800 = 500; 5 x 9 = 45; 500 + 45 = 545.' },
],
// Approximation > division with decimals
'0-0-1': [
{ q: '449.8 / 14.95 + 12.1 x 7.9 = ?', o: ['110', '118', '126', '135', '144'], a: 2, x: '450/15 = 30; 12 x 8 = 96; 30 + 96 = 126. Division: round BOTH sides to a clean pair.' },
{ q: '719.6 / 23.9 + 4.8 x 6.2 = ?', o: ['46', '53', '60', '68', '76'], a: 2, x: '720/24 = 30; 5 x 6 = 30; 30 + 30 = 60.' },
{ q: '899.1 / 29.8 - 13.2 x 4.9 = ?', o: ['-45', '-35', '-28', '25', '35'], a: 1, x: '900/30 = 30; 13 x 5 = 65; 30 - 65 = -35. Watch sign: product term is bigger.' },
{ q: '359.7 / 11.9 + 19.8 x 2.1 = ?', o: ['55', '62', '70', '78', '86'], a: 2, x: '360/12 = 30; 20 x 2 = 40; 30 + 40 = 70.' },
{ q: '629.5 / 20.9 + 8.9 x 8.1 = ?', o: ['88', '95', '102', '110', '119'], a: 2, x: '630/21 = 30; 9 x 8 = 72; 30 + 72 = 102.' },
],
// Approximation > root/cube inside
'0-0-2': [
{ q: 'sqrt(168.7) + 12.9 x 3.1 = ?', o: ['44', '48', '52', '57', '62'], a: 2, x: 'sqrt(169) = 13; 13 x 3 = 39; 13 + 39 = 52. Park roots at the nearest perfect square FIRST.' },
{ q: '15.9% of 299.8 + sqrt(168.7) x 2.9 = ?', o: ['72', '80', '87', '96', '105'], a: 2, x: '16% of 300 = 48; sqrt(169) = 13, 13 x 3 = 39; 48 + 39 = 87.' },
{ q: 'sqrt(440.8) x 1.9 + (9.9)^2 = ?', o: ['128', '135', '142', '150', '159'], a: 2, x: 'sqrt(441) = 21, 21 x 2 = 42; 10^2 = 100; 42 + 100 = 142.' },
{ q: 'cbrt(728.9) + 15.1 x 4.9 = ?', o: ['74', '79', '84', '89', '95'], a: 2, x: 'cbrt(729) = 9; 15 x 5 = 75; 9 + 75 = 84. Nearest perfect cube: 9^3 = 729.' },
{ q: 'sqrt(360.5) + 24.9% of 320.2 = ?', o: ['88', '93', '99', '105', '113'], a: 2, x: 'sqrt(361) = 19; 25% of 320 = 80; 19 + 80 = 99. 361 = 19^2 is worth knowing cold.' },
],
// Approximation > chained operations
'0-0-3': [
{ q: '89.9% of 460 + 13.2 x 8.9 - 24.9% of 240 = ?', o: ['452', '462', '471', '484', '498'], a: 2, x: '90% of 460 = 414; 13 x 9 = 117; 25% of 240 = 60; 414 + 117 - 60 = 471. Handle each chunk separately, then chain.' },
{ q: '59.8 x 2.1 + 39.9% of 200.2 - 11.9 x 4.1 = ?', o: ['142', '150', '158', '167', '178'], a: 2, x: '60 x 2.1 ~ 126; 40% of 200 = 80; 12 x 4 = 48; 126 + 80 - 48 = 158. Keep one decimal where the option gaps are tight.' },
{ q: '(17.9)^2 + (12.1)^2 - 219.8 = ?', o: ['228', '238', '248', '259', '270'], a: 2, x: '18^2 = 324; 12^2 = 144; 324 + 144 - 220 = 248. Squares round to integers you know cold.' },
{ q: '34.9% of 600.2 + 9.8 x 9.2 - 19.9 x 3.1 = ?', o: ['218', '228', '238', '250', '262'], a: 2, x: '35% of 600 = 210; 10 x 9 = 90; 20 x 3 = 60; 210 + 90 - 62 ~ 238.' },
{ q: '499.8 / 24.9 + 14.9% of 400.1 - 7.9 x 6.2 = ?', o: ['20', '26', '31', '38', '45'], a: 2, x: '500/25 = 20; 15% of 400 = 60; 8 x 6 = 48; 20 + 60 - 49 = 31.' },
],

// Wrong series > gaps
'0-1-0': [
{ q: 'Find the wrong term: 7, 12, 22, 38, 57, 82', o: ['12', '22', '38', '57', '82'], a: 2, x: 'Gaps: 5, 10, 16, 20, 25 — expected +5 steps gives 15 after 10. Wrong term sits between the two bad gaps -> 38 should be 37.' },
{ q: 'Find the wrong term: 4, 9, 19, 38, 79, 159', o: ['9', '19', '38', '79', '159'], a: 2, x: 'Gaps double: 5, 10, 20, 40, 80. 19 + 20 = 39, not 38 -> 38 is wrong.' },
{ q: 'Find the wrong term: 11, 13, 17, 19, 23, 30', o: ['13', '17', '19', '23', '30'], a: 4, x: 'All primes in order: 11, 13, 17, 19, 23, 29. 30 breaks the prime run.' },
{ q: 'Find the wrong term: 2, 6, 12, 20, 32, 42', o: ['6', '12', '20', '32', '42'], a: 3, x: 'n^2 + n: 2, 6, 12, 20, 30, 42. Gaps 4, 6, 8, 10, 12 — 32 should be 30.' },
{ q: 'Find the wrong term: 100, 97, 91, 82, 71, 55', o: ['97', '91', '82', '71', '55'], a: 3, x: 'Drops: -3, -6, -9, -12, -15. 82 - 12 = 70, not 71 -> 71 is wrong.' },
],
// Wrong series > x k multiplier
'0-1-1': [
{ q: 'Find the wrong term: 5, 15, 45, 135, 415, 1215', o: ['15', '45', '135', '415', '1215'], a: 3, x: 'All x3: 135 x 3 = 405, not 415. 405 x 3 = 1215 confirms it.' },
{ q: 'Find the wrong term: 3, 15, 75, 375, 1875, 9376', o: ['15', '75', '375', '1875', '9376'], a: 4, x: 'All x5: 1875 x 5 = 9375, not 9376.' },
{ q: 'Find the wrong term: 7, 14, 28, 56, 112, 225', o: ['14', '28', '56', '112', '225'], a: 4, x: 'All x2: 112 x 2 = 224, not 225.' },
{ q: 'Find the wrong term: 6, 12, 36, 144, 719, 4320', o: ['12', '36', '144', '719', '4320'], a: 3, x: 'Multipliers grow: x2, x3, x4, x5, x6. 144 x 5 = 720, not 719.' },
{ q: 'Find the wrong term: 9, 18, 54, 108, 322, 648', o: ['18', '54', '108', '322', '648'], a: 3, x: 'Alternating x2, x3: 108 x 3 = 324, not 322. 324 x 2 = 648 checks.' },
],
// Wrong series > x k + c
'0-1-2': [
{ q: 'Find the wrong term: 3, 8, 18, 38, 78, 160', o: ['8', '18', '38', '78', '160'], a: 4, x: 'x2 + 2 each: 78 x 2 + 2 = 158, not 160. SEBI favourite — check right after gaps.' },
{ q: 'Find the wrong term: 5, 11, 23, 47, 96, 191', o: ['11', '23', '47', '96', '191'], a: 3, x: 'x2 + 1 each: 47 x 2 + 1 = 95, not 96. 95 x 2 + 1 = 191 checks.' },
{ q: 'Find the wrong term: 2, 7, 17, 37, 77, 158', o: ['7', '17', '37', '77', '158'], a: 4, x: 'x2 + 3 each: 77 x 2 + 3 = 157, not 158.' },
{ q: 'Find the wrong term: 4, 9, 20, 43, 90, 183', o: ['9', '20', '43', '90', '183'], a: 4, x: 'Constants grow: x2+1, x2+2, x2+3, x2+4, x2+5. 90 x 2 + 5 = 185, not 183.' },
{ q: 'Find the wrong term: 6, 13, 28, 59, 120, 249', o: ['13', '28', '59', '120', '249'], a: 3, x: 'x2+1, x2+2, x2+3, x2+4, x2+5: 59 x 2 + 4 = 122, not 120. 122 x 2 + 5 = 249 checks.' },
],
// Wrong series > n^2 / n^3 +- k
'0-1-3': [
{ q: 'Find the wrong term: 5, 10, 17, 26, 37, 49', o: ['10', '17', '26', '37', '49'], a: 4, x: 'n^2 + 1 (2^2+1 ... 7^2+1): 7^2 + 1 = 50, not 49. Terms hugging famous squares = check this pattern.' },
{ q: 'Find the wrong term: 3, 8, 15, 24, 36, 48', o: ['8', '15', '24', '36', '48'], a: 3, x: 'n^2 - 1: 2, 3, 4, 5, 6, 7 squared minus 1. 6^2 - 1 = 35, not 36.' },
{ q: 'Find the wrong term: 2, 5, 10, 17, 26, 38', o: ['5', '10', '17', '26', '38'], a: 4, x: 'n^2 + 1: 1,2,3,4,5,6 squared +1 -> 37, not 38.' },
{ q: 'Find the wrong term: 8, 27, 64, 125, 216, 344', o: ['27', '64', '125', '216', '344'], a: 4, x: 'Perfect cubes 2^3 to 7^3: 7^3 = 343, not 344.' },
{ q: 'Find the wrong term: 10, 17, 26, 37, 51, 65', o: ['17', '26', '37', '51', '65'], a: 3, x: 'n^2 + 1 starting at 3^2: 7^2 + 1 = 50, not 51.' },
],
// Wrong series > fibonacci / interleaved
'0-1-4': [
{ q: 'Find the wrong term: 4, 6, 10, 16, 26, 44', o: ['6', '10', '16', '26', '44'], a: 4, x: 'Each = sum of previous two: 16 + 26 = 42, not 44.' },
{ q: 'Find the wrong term: 3, 5, 8, 13, 22, 34', o: ['5', '8', '13', '22', '34'], a: 3, x: 'Fibonacci-type: 13 + 21 = 34 works, so 22 should be 21 (8 + 13 = 21).' },
{ q: 'Find the wrong term: 2, 5, 4, 10, 6, 15, 10, 20', o: ['5', '4', '6', '10', '20'], a: 3, x: 'Interleaved: odd positions 2, 4, 6, ? go +2 -> should be 8, so 10 is wrong. Even positions 5, 10, 15, 20 are fine.' },
{ q: 'Find the wrong term: 1, 4, 3, 8, 6, 12, 7, 16', o: ['4', '3', '6', '12', '16'], a: 2, x: 'Odd positions 1, 3, 5, 7 (+2): the 6 should be 5. Even 4, 8, 12, 16 fine.' },
{ q: 'Find the wrong term: 10, 20, 15, 25, 20, 30, 26, 35', o: ['20', '15', '20', '26', '35'], a: 3, x: 'Odd positions 10, 15, 20, 25 (+5): 26 should be 25. Even 20, 25, 30, 35 fine. If no single rule fits, split odd/even.' },
],
// Arithmetic > Profit & Loss
'0-2-0': [
{ q: 'A trader marks goods 40% above CP and gives 10% discount. Profit %?', o: ['24%', '26%', '30%', '33%', '36%'], a: 1, x: 'SP = 140 x 0.9 = 126 -> 26%. Successive: +40 -10 - (40x10/100) = +26.' },
{ q: 'A dishonest dealer sells at CP but uses 900g for 1kg. Profit %?', o: ['9%', '10%', '11.11%', '12.5%', '15%'], a: 2, x: 'Pays for 900g, charges for 1000g -> gain = 100/900 = 11.11%. Classic trap: divide by WEIGHT GIVEN (900), not 1000.' },
{ q: 'Selling at Rs 540 gives 20% profit. What price gives 30% profit?', o: ['Rs 585', 'Rs 600', 'Rs 610', 'Rs 620', 'Rs 648'], a: 0, x: 'CP = 540/1.2 = 450; 30% -> 450 x 1.3 = 585.' },
{ q: 'Two successive discounts of 20% and 10% equal a single discount of?', o: ['28%', '30%', '32%', '26%', '25%'], a: 0, x: '100 -> 80 -> 72. Net = 28%. Formula: 20 + 10 - (20x10/100) = 28.' },
{ q: 'An article sold at Rs 960 earns same % profit as the loss at Rs 640. CP?', o: ['Rs 780', 'Rs 800', 'Rs 820', 'Rs 840', 'Rs 750'], a: 1, x: 'Same % profit and loss -> CP = average = (960+640)/2 = 800.' },
],
// Arithmetic > SI & CI
'0-2-1': [
{ q: 'SI on Rs 6000 at 8% for 3 years?', o: ['Rs 1200', 'Rs 1440', 'Rs 1560', 'Rs 1600', 'Rs 1720'], a: 1, x: 'SI = 6000 x 8 x 3 / 100 = 1440. Straight formula plug.' },
{ q: 'Difference between CI and SI on Rs 10000 at 10% for 2 years?', o: ['Rs 90', 'Rs 100', 'Rs 110', 'Rs 120', 'Rs 150'], a: 1, x: 'Shortcut: diff = P x (r/100)^2 = 10000 x 0.01 = 100. Memorise this 2-yr formula — it appears constantly.' },
{ q: 'Rs 8000 at 10% p.a. compounded half-yearly for 1 year gives CI of?', o: ['Rs 800', 'Rs 810', 'Rs 820', 'Rs 840', 'Rs 880'], a: 2, x: 'Half-yearly: rate halves to 5%, periods double to 2. 8000 x 1.05^2 = 8000 x 1.1025 = 8820 -> CI = 820.' },
{ q: 'A sum doubles in 8 years at SI. In how many years will it triple?', o: ['12', '14', '16', '18', '24'], a: 2, x: 'Doubling means 100% interest in 8 yrs -> 12.5%/yr. Tripling needs 200% -> 16 yrs. SI logic, no formula needed.' },
{ q: 'CI on Rs 5000 at 20% for 2 years?', o: ['Rs 2000', 'Rs 2100', 'Rs 2200', 'Rs 2400', 'Rs 2500'], a: 2, x: 'Two-step: yr1 interest 1000 -> 6000; yr2 interest 1200 -> 7200. CI = 2200. Fractions: 20% = 1/5, so 5/6 squared -> 5000 x 36/25 = 7200.' },
],
// Arithmetic > Mixture & Alligation
'0-2-2': [
{ q: 'From 40L milk, 8L is drawn and replaced with water, twice. Milk left?', o: ['25.6L', '28.8L', '30L', '32.4L', '33.6L'], a: 0, x: 'Replacement formula: 40 x (1 - 8/40)^2 = 40 x 0.64 = 25.6L.' },
{ q: 'Rice at Rs 40/kg mixed with Rs 60/kg to get Rs 48/kg. Ratio?', o: ['1:1', '2:1', '3:2', '4:3', '5:4'], a: 2, x: 'Alligation cross: (60-48):(48-40) = 12:8 = 3:2. Cheap:dearer = (dearer-mean):(mean-cheap).' },
{ q: 'A 60L mix has milk:water = 2:1. Water to add for 1:1?', o: ['15L', '20L', '25L', '30L', '40L'], a: 1, x: 'Milk = 40L stays fixed. Need water = 40 -> add 20L. Keep the unchanged component fixed.' },
{ q: 'Spirit at 25% mixed with spirit at 50% to get 30L at 40%. Amount of 25%?', o: ['10L', '12L', '15L', '18L', '20L'], a: 1, x: 'Alligation: (50-40):(40-25) = 10:15 = 2:3. 25%-part = 2/5 x 30 = 12L.' },
{ q: '60L of 30% alcohol. How much replaced by pure alcohol to make 50%?', o: ['12L', '15L', '17.14L', '20L', '24L'], a: 2, x: 'Alcohol now = 18L; need 30L. Each litre replaced adds 0.7L net alcohol. x = 12/0.7 = 17.14L.' },
],
// Arithmetic > Mensuration
'0-2-3': [
{ q: 'Cylinder radius 7cm, height 10cm. Volume? (pi = 22/7)', o: ['1440 cm3', '1540 cm3', '1480 cm3', '1600 cm3', '1700 cm3'], a: 1, x: 'V = pi r2 h = 22/7 x 49 x 10 = 1540. With r=7 always use 22/7 — 7 cancels.' },
{ q: 'Cone and cylinder share radius and height. Volume ratio?', o: ['1:2', '1:3', '1:4', '2:3', '3:4'], a: 1, x: 'Cone = (1/3)pi r2 h -> ratio 1:3. Pure formula fact.' },
{ q: 'Rectangle 12 x 8. Diagonal?', o: ['13', '14.42', '15', '16', '10'], a: 1, x: 'd = sqrt(144+64) = sqrt(208) = 4sqrt13 = 14.42. Pythagorean triple check: near 8-?-? family.' },
{ q: 'Cube of side 5cm. Total surface area?', o: ['125 cm2', '150 cm2', '100 cm2', '175 cm2', '250 cm2'], a: 1, x: 'TSA = 6a2 = 6 x 25 = 150. Volume = 125 is the classic wrong option — it is sitting at A.' },
{ q: 'Two circles have radii ratio 3:4. Area ratio?', o: ['3:4', '6:8', '9:16', '4:3', '9:12'], a: 2, x: 'Areas scale by square: 9:16. Any "ratio of areas/volumes" Q = square/cube the linear ratio.' },
],
// Arithmetic > Percentage-family
'0-2-4': [
{ q: 'Price rises 25% then falls 20%. Net change?', o: ['+5%', '0%', '-5%', '+10%', '-2%'], a: 1, x: 'x + y + xy/100 = 25 - 20 - 5 = 0%. Successive % formula — equal % up then down never cancels to zero except paired values like these.' },
{ q: 'Population 8000 grows 10% yearly. After 2 years?', o: ['8800', '9600', '9680', '9800', '10400'], a: 2, x: '8000 x 1.1 x 1.1 = 9680. Second year grows on the NEW base — that is the trap vs SI-style 9600.' },
{ q: 'In an election, winner got 55% of 4000 valid votes. Margin over loser?', o: ['200', '300', '400', '440', '500'], a: 2, x: 'Winner 2200, loser 1800 -> margin 400 = 10% of total. Election Qs: margin% x total.' },
{ q: 'Salary cut 20%. What % raise restores it?', o: ['20%', '22%', '25%', '30%', '33.33%'], a: 2, x: 'Restore % = x/(100-x) = 20/80 = 25%. Cut-then-restore never equals the cut.' },
{ q: 'A is 40% more than B. B is what % less than A?', o: ['40%', '28.57%', '33.33%', '25%', '30%'], a: 1, x: 'Base flips: less% = 40/140 = 28.57%. "Compare against what it was" — divide by the larger new value.' },
],
// Arithmetic > T&W / TSD / Ages roster
'0-2-5': [
{ q: 'A does work in 12 days, B in 18 days. Together?', o: ['6.5 days', '7 days', '7.2 days', '7.5 days', '8 days'], a: 2, x: 'LCM 36 units: A=3/day, B=2/day -> 36/5 = 7.2 days. Convert to LCM units — never add days.' },
{ q: 'A train 240m long crosses a pole in 12 sec. Speed?', o: ['60 km/h', '66 km/h', '72 km/h', '75 km/h', '80 km/h'], a: 2, x: 'Speed = 240/12 = 20 m/s x 18/5 = 72 km/h. m/s to km/h: multiply by 18/5.' },
{ q: 'Ages of father:son = 7:3. After 10 yrs the ratio becomes 2:1. Father\'s present age?', o: ['56', '63', '70', '77', '84'], a: 2, x: '(7x+10)/(3x+10) = 2 -> 7x+10 = 6x+20 -> x = 10 -> father = 70. Ratio ages: one equation from the FUTURE ratio; or test options backwards.' },
{ q: 'Avg of 5 numbers is 20. Removing one drops avg to 18. Removed number?', o: ['24', '26', '28', '30', '32'], a: 2, x: 'Total 100 -> 4 numbers sum 72. Removed = 100 - 72 = 28.' },
{ q: 'A boat goes 24km downstream in 2h, upstream same distance in 3h. Boat speed in still water?', o: ['9 km/h', '10 km/h', '11 km/h', '12 km/h', '14 km/h'], a: 1, x: 'Down 12, up 8. Boat = (12+8)/2 = 10 km/h; stream = 2. Average of the two speeds.' },
],

// DI Line graph > YoY % change
'0-3-0': [
{ q: 'Sales: 2022=400, 2023=460, 2024=575, 2025=690. Biggest % jump year?', o: ['2023', '2024', '2025', '2023 and 2025 equal', 'Cannot say'], a: 1, x: '2023: 60/400=15%; 2024: 115/460=25%; 2025: 115/690=16.7%. Cancel to fractions — 115/460 = 1/4 instantly.' },
{ q: 'Output 2023=250, 2024=300. % increase?', o: ['16.7%', '18%', '20%', '22%', '25%'], a: 2, x: '50/250 = 1/5 = 20%. Divide by the OLD value — the classic base trap.' },
{ q: 'Price fell from 80 (2023) to 60 (2024). % decrease?', o: ['20%', '25%', '30%', '33.3%', '15%'], a: 1, x: '20/80 = 25%. Options include 33.3% (20/60) — the wrong-base trap answer.' },
{ q: 'Revenue: Q1=120, Q2=150, Q3=135, Q4=180. Which quarter saw % drop?', o: ['Q1', 'Q2', 'Q3', 'Q4', 'None'], a: 2, x: 'Only Q3 (150->135) decreased: -10%. Scan direction before computing.' },
{ q: 'Profit 2024=450, 2025=540. What % more?', o: ['16.7%', '18%', '20%', '22%', '25%'], a: 2, x: '90/450 = 1/5 = 20%. Fraction table beats long division every time.' },
],
// DI Line graph > average of years
'0-3-1': [
{ q: 'Sales 2021-25: 200, 240, 280, 320, 360. Average?', o: ['270', '280', '290', '300', '310'], a: 1, x: 'AP series: average = middle term = 280. Symmetric data -> take the centre.' },
{ q: 'Production 3 yrs: 150, 180, 210. Average?', o: ['175', '180', '185', '190', '195'], a: 1, x: 'Sum 540/3 = 180.' },
{ q: 'Two branches over 3 yrs — A: 100, 140, 160 and B: 120, 130, 170. Difference of averages?', o: ['5', '6.67', '10', '13.33', '20'], a: 1, x: 'A avg = 400/3 = 133.33; B avg = 420/3 = 140; diff = 6.67. Sum first, divide once — decimal answers are fine in DI.' },
{ q: 'Marks: 72, 85, 68, 90, 75. Average?', o: ['76', '78', '80', '77', '79'], a: 1, x: 'Sum = 390/5 = 78. Add in pairs: 72+68=140, 85+75=160, +90 = 390.' },
{ q: 'Exports 4 yrs avg 250; three yrs are 240, 260, 230. 4th year?', o: ['250', '260', '270', '280', '240'], a: 2, x: 'Total = 1000; known = 730; missing = 270.' },
],
// DI Line graph > ratio
'0-3-2': [
{ q: 'Company A sold 450, B sold 600 in 2024. Ratio A:B?', o: ['2:3', '3:4', '4:5', '5:6', '3:5'], a: 1, x: '450:600 -> divide by 150 = 3:4. Cancel before anything else.' },
{ q: '2023 sales 360, 2024 sales 450. 2023 as % of 2024?', o: ['75%', '80%', '85%', '90%', '125%'], a: 1, x: '360/450 = 4/5 = 80%. "X as % of Y" -> Y is the base.' },
{ q: 'Imports:exports = 5:4. Exports = 240. Imports?', o: ['280', '300', '320', '200', '250'], a: 1, x: '240/4 = 60 per part; imports = 5 x 60 = 300.' },
{ q: 'Branch X sold 315, Y sold 420. X is what % less than Y?', o: ['20%', '25%', '33.3%', '75%', '105%'], a: 1, x: '(420-315)/420 = 105/420 = 1/4 = 25%. Base = Y, the thing after "than".' },
{ q: 'Total 900 split between P and Q in ratio 2:3. Q gets?', o: ['360', '450', '540', '600', '480'], a: 2, x: 'Q = 3/5 x 900 = 540.' },
],
// DI Line graph > % of total / units
'0-3-3': [
{ q: 'Total production 50,000 units; Plant B = 8,500. B is what % of total?', o: ['15%', '16%', '17%', '18%', '19%'], a: 2, x: '8500/50000 = 17/100 = 17%. Watch the zeros.' },
{ q: 'Table in THOUSANDS: Dept X = 45, total = 300. Actual % of X?', o: ['12%', '13%', '14%', '15%', '16%'], a: 3, x: '45/300 = 15%. Units trap: thousand vs lakh cancels only if SAME units — check headers first.' },
{ q: 'Revenue Rs 2.4 lakh; cost Rs 1.8 lakh. Cost is what % of revenue?', o: ['70%', '72%', '75%', '80%', '85%'], a: 2, x: '1.8/2.4 = 3/4 = 75%.' },
{ q: 'Employees: HR 60, Tech 300, Ops 240. Tech is what % more than Ops?', o: ['20%', '25%', '30%', '60%', '80%'], a: 1, x: '60/240 = 25%. Options include 60 (raw difference) — the trap.' },
{ q: 'Budget: dept gets 18% of Rs 5,50,000. Amount?', o: ['Rs 90,000', 'Rs 95,000', 'Rs 99,000', 'Rs 1,00,000', 'Rs 1,08,000'], a: 2, x: '18% = 20% - 2% = 1,10,000 - 11,000 = 99,000. Split % into friendly pieces.' },
],

// DI Caselet > paragraph to table
'0-4-0': [
{ q: 'School: 1200 students, 60% boys. 40% of boys play cricket, 30% of girls play cricket. Total cricketers?', o: ['400', '420', '432', '450', '480'], a: 2, x: 'Boys 720 -> cricket 288; girls 480 -> cricket 144. 288+144 = 432. Build the 2x2 table first; then every Q is a lookup.' },
{ q: 'Office 500 staff: 55% men. 60% of men and 50% of women are married. Married staff?', o: ['260', '265', '270', '277.5', '280'], a: 3, x: 'Men = 275 -> married 165; women = 225 -> married 112.5; total 277.5. SEBI occasionally leaves fractional people — answer what the math says, not the roundest option.' },
{ q: '800 voters: 45% urban. 70% urban + 55% rural voted. Total votes cast?', o: ['480', '494', '510', '524', '540'], a: 1, x: 'Urban 360 -> 252; rural 440 -> 242; total 494. Two-category split, then apply rates to each cell.' },
{ q: 'Library 2000 books: 30% fiction. 25% fiction and 10% non-fiction issued. Issued books?', o: ['260', '280', '290', '300', '310'], a: 2, x: 'Fiction 600 -> 150; non-fiction 1400 -> 140; total 290.' },
{ q: '900 employees: 2/3 in shift A. 50% of A and 40% of B take canteen. Canteen users?', o: ['400', '410', '420', '430', '440'], a: 2, x: 'A=600 -> 300; B=300 -> 120; total 420. Fractions inside caselets: 2/3 of 900 is instant.' },
],
// DI Caselet > two-category split
'0-4-1': [
{ q: 'Class: 240 students play one sport. 5/8 cricket; of cricketers 40% also swim (dual allowed). Cricket-only?', o: ['80', '90', '96', '100', '108'], a: 1, x: 'Cricketers = 150; 40% also swim -> cricket-only = 60% of 150 = 90. "Also" vs "only" wording is the whole question.' },
{ q: '150 people: 60% tea drinkers, 50% coffee, 20% both. Neither?', o: ['10', '12', '15', '18', '20'], a: 2, x: 'Union = 90 + 75 - 30 = 135; neither = 15. Venn formula: A + B - both.' },
{ q: 'College 400: 70% play games. Of players, 30% play only indoor. Indoor-only count?', o: ['80', '84', '90', '96', '100'], a: 1, x: 'Players = 280; indoor-only = 84.' },
{ q: '240 employees: 75% graduates. Of graduates 60% are engineers. Engineers?', o: ['100', '104', '108', '112', '120'], a: 2, x: '180 x 0.6 = 108.' },
{ q: '360 applicants: 5/9 male. Of males 45% experienced. Experienced males?', o: ['80', '85', '90', '95', '100'], a: 2, x: 'Males = 200; 45% = 90.' },
],
// DI Caselet > % more/less base trap
'0-4-2': [
{ q: 'Factory A produced 840 units, B produced 1050. A is what % less than B?', o: ['20%', '25%', '15%', '18%', '22%'], a: 0, x: 'Base = B (after "than"): 210/1050 = 1/5 = 20%. Dividing by A gives 25% — the wrong answer sitting in the options.' },
{ q: 'Team X scored 480, Y scored 400. X is what % more than Y?', o: ['16.7%', '18%', '20%', '25%', '22%'], a: 2, x: '80/400 = 20%. Base = Y.' },
{ q: 'Ravi earns 25% more than Mohan. Mohan earns what % less than Ravi?', o: ['25%', '20%', '22.5%', '15%', '30%'], a: 1, x: 'Mohan = 100, Ravi = 125. Less = 25/125 = 20%. Asymmetric — same number, different bases.' },
{ q: 'City A pop 1.2 lakh, B pop 1.5 lakh. B exceeds A by what %?', o: ['20%', '25%', '30%', '33.3%', '15%'], a: 1, x: '0.3/1.2 = 25%.' },
{ q: 'Price of X = Rs 750, Y = Rs 600. Y is what % cheaper than X?', o: ['15%', '20%', '25%', '18%', '22%'], a: 1, x: '150/750 = 20%.' },
],
// DI Caselet > multi-step lookup
'0-4-3': [
{ q: 'Table built: Cricket=288 boys + 144 girls; Chess=432 boys + 336 girls. Boys-in-chess as % of girls-in-cricket?', o: ['200%', '250%', '300%', '333%', '150%'], a: 2, x: '432/144 = 300%. After the table exists, this is one division — caselet = slow start, free finish.' },
{ q: 'Using same table: total students who DONOT play cricket?', o: ['700', '720', '748', '768', '780'], a: 3, x: '1200 - 432 = 768. Total minus the cricket row/column.' },
{ q: 'Same table: chess players form what % of the school?', o: ['60%', '62%', '64%', '66%', '68%'], a: 2, x: '(432+336)/1200 = 768/1200 = 64%.' },
{ q: 'Same table: ratio of girl-cricketers to boy-cricketers?', o: ['1:2', '2:3', '1:3', '3:4', '4:5'], a: 0, x: '144:288 = 1:2.' },
{ q: 'Same table: if 50 more girls join cricket, new cricket total?', o: ['472', '482', '492', '502', '512'], a: 1, x: '432 + 50 = 482. Update ONE cell, recompute the row.' },
],

// Quadratic compare > sign-decoder instant kill
'0-5-0': [
{ q: 'I. x^2 + 8x + 15 = 0   II. y^2 - 8y + 15 = 0', o: ['x > y', 'x < y', 'x >= y', 'x <= y', 'No relation'], a: 1, x: 'I: both roots negative (-3,-5). II: both positive (3,5). All-negative vs all-positive = instant kill, no full factoring needed.' },
{ q: 'I. x^2 + 10x + 24 = 0   II. y^2 - 7y + 12 = 0', o: ['x > y', 'x < y', 'x >= y', 'x <= y', 'No relation'], a: 1, x: 'I: -4,-6 (both neg). II: 3,4 (both pos). x < y.' },
{ q: 'I. x^2 - 6x + 8 = 0   II. y^2 + 9y + 20 = 0', o: ['x > y', 'x < y', 'x >= y', 'x <= y', 'No relation'], a: 0, x: 'I: 2,4 (pos). II: -4,-5 (neg). x > y — same trick reversed.' },
{ q: 'I. x^2 + 12x + 35 = 0   II. y^2 - 12y + 35 = 0', o: ['x > y', 'x < y', 'x = y', 'x <= y', 'No relation'], a: 1, x: 'I: -5,-7. II: 5,7. x < y instantly.' },
{ q: 'I. x^2 + x - 12 = 0   II. y^2 + 2y - 15 = 0', o: ['x > y', 'x < y', 'x >= y', 'x <= y', 'No relation'], a: 4, x: 'Constant negative = one root each sign: I: 3,-4; II: 3,-5. Ranges overlap -> CND. Sign poem: "+Sx -P = one + one -".' },
],
// Quadratic compare > factor & compare
'0-5-1': [
{ q: 'I. x^2 - 7x + 12 = 0   II. y^2 - 9y + 20 = 0', o: ['x > y', 'x < y', 'x >= y', 'x <= y', 'x = y or no relation'], a: 3, x: 'I: 3,4. II: 4,5. Every x <= every y and x=4=y -> x <= y. Equal counts as <=, not <.' },
{ q: 'I. x^2 - 11x + 30 = 0   II. y^2 - 5y + 6 = 0', o: ['x > y', 'x < y', 'x >= y', 'x <= y', 'No relation'], a: 0, x: 'I: 5,6. II: 2,3. All x > all y -> x > y.' },
{ q: 'I. x^2 - 10x + 24 = 0   II. y^2 - 13y + 42 = 0', o: ['x > y', 'x < y', 'x >= y', 'x <= y', 'No relation'], a: 3, x: 'I: 4,6. II: 6,7. x <= y (touch at 6).' },
{ q: 'I. x^2 - 9x + 20 = 0   II. y^2 - 8y + 15 = 0', o: ['x > y', 'x < y', 'x >= y', 'x <= y', 'No relation'], a: 4, x: 'I: 4,5. II: 3,5. Ranges overlap (y range sits inside x) -> CND.' },
{ q: 'I. x^2 - 15x + 56 = 0   II. y^2 - 10y + 21 = 0', o: ['x > y', 'x < y', 'x >= y', 'x <= y', 'No relation'], a: 2, x: 'I: 7,8. II: 3,7. x >= y (touch at 7).' },
],
// Quadratic compare > CND overlap trap
'0-5-2': [
{ q: 'I. x^2 - 9x + 18 = 0   II. y^2 - 9y + 20 = 0', o: ['x > y', 'x < y', 'x >= y', 'x <= y', 'No relation'], a: 4, x: 'I: 3,6. II: 4,5. y sits INSIDE x range -> overlapping = cannot determine, always.' },
{ q: 'I. x^2 - 8x + 15 = 0   II. y^2 - 10y + 24 = 0', o: ['x > y', 'x < y', 'x >= y', 'x <= y', 'No relation'], a: 4, x: 'I: 3,5. II: 4,6. Ranges overlap at 4-5 -> CND. Overlapping ranges is THE most-picked trap.' },
{ q: 'I. x^2 - 12x + 32 = 0   II. y^2 - 11y + 28 = 0', o: ['x > y', 'x < y', 'x >= y', 'x <= y', 'No relation'], a: 4, x: 'I: 4,8. II: 4,7. Overlap -> CND.' },
{ q: 'I. x^2 + 6x - 16 = 0   II. y^2 - 3y - 18 = 0', o: ['x > y', 'x < y', 'x >= y', 'x <= y', 'No relation'], a: 4, x: 'I: 2,-8. II: 6,-3. Compare all pairs: 2>-3 but -8<6 -> mixed -> CND.' },
{ q: 'I. x^2 - 14x + 48 = 0   II. y^2 - 12y + 35 = 0', o: ['x > y', 'x < y', 'x >= y', 'x <= y', 'No relation'], a: 4, x: 'I: 6,8. II: 5,7. Overlap -> CND.' },
],
// ============ PAPER 1 > REASONING (section 1) ============

// Month/attribute table > fixed-grid puzzle
'1-0-0': [
{ q: 'Six people P,Q,R,S,T,U have exams in Jan,Mar,May,Jul,Sep,Nov. P is before T; U is in May; S is immediately after P. Who is in Jan?', o: ['P', 'Q', 'R', 'S', 'Cannot be determined'], a: 4, x: 'Build the grid: U=May fixed. P<T and S=P+1 leaves multiple valid orders -> CND. Lesson: never force a unique answer when clues leave gaps.' },
{ q: 'Same setup + R is in Nov and Q is in Mar. Now who is in Jan?', o: ['P', 'Q', 'R', 'S', 'T'], a: 0, x: 'Fixed: Q=Mar, U=May, R=Nov. Remaining Jan,Jul,Sep for P,S,T with P<S(adjacent) and P<T: only Jan(P),Jul(S),Sep(T) works. Lock direct clues first, then run the constraints.' },
{ q: 'Five exams A-E on Mon-Fri. C on Wed. A before C, D after C, B immediately after A. B is on?', o: ['Mon', 'Tue', 'Thu', 'Fri', 'Cannot be determined'], a: 1, x: 'C=Wed. A,B adjacent before Wed -> A=Mon,B=Tue only option. Adjacency narrows slots drastically.' },
{ q: 'Six months Jan-Jun, each person likes a colour. P=Jan(red). Q is before R; R=blue; S is in Jun. If T=green in Apr, who is in Feb-Mar-May?', o: ['Q,R and one of U/V', 'Q and R only', 'Cannot split uniquely', 'S, T, R', 'P, Q, R'], a: 2, x: 'Fixed cells done (Jan P, Apr T, Jun S); Feb/Mar/May hold Q,R,+1 with Q<R but exact placement has 2 valid orders -> partial determination. Answer the SPECIFIC question asked, not the whole grid.' },
{ q: 'A,B,C,D attend in Q1(Jan-Mar),Q2,Q3,Q4. A in Q2, D in Q4, B before A. B is in?', o: ['Q1', 'Q2', 'Q3', 'Q4', 'Cannot be determined'], a: 0, x: 'Only Q1 is before A. One-clue deduction — the fastest marks in puzzle sets.' },
],
// Month/attribute table > two-condition clue
'1-0-1': [
{ q: 'Six people, months Jan-Mar-Apr-Jun-Jul-Sep. "X attends before the Physics exam but after Y." Y is in Jan. Possible slots for X?', o: ['Mar only', 'Mar or Apr', 'Apr or Jun', 'Mar, Apr or Jun', 'Any month after Jan'], a: 3, x: 'X must sit between Jan(Y) and the Physics exam — translate the double condition into a range, not a point.' },
{ q: '"Z attended exactly 2 months after the Accounts exam" — Accounts is in Feb. Z is in?', o: ['Mar', 'Apr', 'May', 'Jun', 'Cannot be determined'], a: 1, x: '"Exactly 2 after" = fixed offset -> Apr. Offset clues are anchors: convert immediately to a fixed position.' },
{ q: 'Exams in odd months Jan,Mar,May,Jul,Sep,Nov. "M writes in a month having 31 days but not the first." If Jan is taken by K, M could be in?', o: ['Mar or May only', 'May, Jul or later 31-day months', 'Jul only', 'Mar only', 'Nov'], a: 1, x: '31-day months in the list: Mar,May,Jul (Aug not listed). Minus Jan(taken) -> May or Jul... plus check "not the first" removes nothing else. External-knowledge clues (days in month) are a SEBI flavour — know 31-day months cold.' },
{ q: '"P attends before R but after Q; all three in Jan,Mar,May." Correct order?', o: ['Q,P,R', 'P,Q,R', 'Q,R,P', 'R,P,Q', 'Cannot be determined'], a: 0, x: 'Chain reading: before R, after Q -> Q-P-R. Three-person order chains resolve instantly once you lay them on a line.' },
{ q: '"The English exam is in the month immediately before the person who likes tea; that person is in Jun." English is in?', o: ['Mar', 'Apr', 'May', 'Jun', 'Jul'], a: 2, x: 'Immediately before Jun = May. The clue looks circular but is a plain offset — rewrite it as "E = tea-month minus 1".' },
],
// Month/attribute table > between/count clue
'1-0-2': [
{ q: '8 seats in a row numbered 1-8. "Exactly two people sit between A and B." If A is at 2, B is at?', o: ['4', '5', '6', '4 or 6', '5 or 6'], a: 1, x: 'Two between = position gap of 3: B = 2+3 = 5 (2-3 invalid). Convert every "between" clue to |difference| = count + 1 instantly.' },
{ q: '"Three people have exams between P (Mar) and R." R is in a monthly sequence Jan-Dec. R is in?', o: ['Jul', 'Aug', 'Jul or Nov', 'Jun or Oct', 'Cannot be determined'], a: 2, x: 'Gap of 4: Mar+4 = Jul or Mar-4 = Nov (previous year logic aside). Keep both directions open until another clue kills one.' },
{ q: 'Six people in a column. "B has exactly one person above him; D is at the bottom; A is between B and D." Order top-bottom?', o: ['B,x,A,x,x,D variants', 'B,A,x,x,x,D only', 'Cannot be determined fully', 'A,B,x,x,x,D', 'x,B,A,x,x,D only'], a: 0, x: 'B is 2nd from top; D 6th; A somewhere between -> positions 3,4,5 hold A + 2 others in some order. Partial grids are normal — answer what is determinable.' },
{ q: '"Number of people between X and Y equals number between Y and Z" in a row of 7. If X=1, Y=4, then Z=?', o: ['6', '7', '5', '6 or 7', '7 only'], a: 1, x: 'X-Y gap = 2 between -> equal gap after Y: 4+3 = 7. Mirror-count clues = symmetric positioning.' },
{ q: '9 floors. "Five people live between F and G." F on floor 2, G lives?', o: ['7', '8', '9', '8 only', '7 or 8'], a: 1, x: 'Five between = gap of 6: 2+6 = 8. (2-6 invalid.) Count clue -> |diff| = count+1.' },
],
// Box stack > vertical ordering
'1-1-0': [
{ q: 'Eight boxes stacked 1(bottom)-8(top). Red box is at 5, two boxes between red and blue. Blue is at?', o: ['2', '3', '7', '2 or 8', '8'], a: 3, x: 'Gap of 3: 5-3=2 or 5+3=8. Two valid -> keep both until a clue kills one. Draw the column; never hold it in your head.' },
{ q: 'Same stack: green is immediately above red(5), yellow is below blue. If blue = 2, yellow could be at?', o: ['1', '3', '4', '1 only', '1 or 3'], a: 0, x: 'Below 2 = only 1. Fixed anchors cascade — green=6 locked, blue=2 locks yellow=1.' },
{ q: 'Six boxes; "box A is above box C but not adjacent; C is above the black box." Minimum boxes needed below A?', o: ['2', '3', '4', '1', 'Cannot be determined'], a: 1, x: 'A > C > black with a gap between A and C -> at least 2 boxes under A (C + gap... actually C + black = 2 minimum plus the gap box between A and C = 3 below A). Order + gap combined.' },
{ q: 'Boxes P,Q,R,S stacked; P is third from top, Q is immediately below P, R is at bottom. S is?', o: ['Top', 'Second from top', 'Third', 'Bottom', 'Cannot be determined'], a: 0, x: '4 positions: R=4(bottom), P=2... wait P third from top in a 4-stack = position 2 from bottom. Top to bottom: S,P,Q,R. S = top.' },
{ q: 'Five boxes A-E; A above B with one box between; C on top; D below B. Order top to bottom?', o: ['C,A,_,B,D only', 'C,A,E,B,D or C,A,D,B,E', 'C,A,x,B,x with D below B: C,A,E,B,D', 'Cannot be determined', 'A,C,B,D,E'], a: 2, x: 'C=1. A-B gap of 2: A=2,B=4 -> positions 3,5 for D,E with D below B -> D=5? "D below B" means D at 5, E=3. Order: C,A,E,B,D.' },
],
// Box stack > gap clues
'1-1-1': [
{ q: '"Two boxes between the red and blue boxes" in a 7-stack. Red at 1, blue at?', o: ['3', '4', '5', '4 only', '3 or 4'], a: 1, x: 'Two between -> |diff| = 3 -> blue = 4. Same rule as seating "people between".' },
{ q: 'Books stacked; "three books between History and Maths"; History is 2nd from top in a 6-stack. Maths is?', o: ['5th', '6th', '4th', '5th or 6th', 'Cannot be determined'], a: 1, x: 'Gap of 4: 2+4 = 6 (2-4 invalid) -> bottom. One-direction valid = unique answer.' },
{ q: '"Exactly one box between the heaviest and lightest." Heaviest at 3 in a 6-stack. Lightest at?', o: ['1 or 5', '5 only', '1 only', '2 or 4', 'Cannot be determined'], a: 0, x: 'Gap of 2: 3-2=1 or 3+2=5 -> two candidates until a second clue fixes it.' },
{ q: 'Five cartons; "no carton between Tea and Coffee" AND "Milk is between them." Contradiction?', o: ['Yes — impossible clues', 'No — Milk is the one between', 'No — they are adjacent', 'Cannot say', 'Only if Milk removed'], a: 0, x: '"No carton between" = adjacent; "Milk between" = gap. Contradictory clues = misread signal — recheck which attribute belongs to which box (Tea/Coffee may be item-attributes, not box names). Trap-training: attribute collision is the classic misdirection.' },
{ q: '"Two gaps between box K and box L" — if L is immediately above the bottom box in a 9-stack (position 2), K is at?', o: ['5', '6', '4 or 6', '5 only', 'Cannot be determined'], a: 0, x: 'L=2, gap 3 -> K=5 (2-3 invalid). Convert wording: "gaps between" = intervening boxes, diff = gaps+1.' },
],
// Linear/double-row > single row mixed facing
'1-2-0': [
{ q: 'Six in a row, all face north. A sits second to the left of the rightmost person. A is at position? (from left)', o: ['4', '5', '3', '2', 'Cannot be determined'], a: 0, x: 'Rightmost = position 6; "second to the left" = 6 - 2 = 4. Facing north: left = smaller index, right = larger.' },
{ q: 'In a north-facing row of 5, B sits at an extreme end. C is to the immediate right of B. If B is leftmost, C is at?', o: ['2nd', '3rd', '4th', '2nd from right', 'Cannot be determined'], a: 0, x: 'B=1 -> C=2. Facing north: right = higher index.' },
{ q: 'Five people, some face north some south. P faces south and is at left end. To P\'s immediate right (the paper\'s left) sits?', o: ['No one', 'The person at position 2', 'Depends on facing', 'Position 1', 'Cannot be determined'], a: 0, x: 'South-facing flips left/right: P\'s right hand points to position 0 side (outside). Facing direction flips EVERY left/right clue — mark facing before placing anyone.' },
{ q: 'Row of 7 facing north. "D sits third to the right of E." E at position 2. D at?', o: ['4', '5', '6', '5 or 6', 'Cannot be determined'], a: 1, x: 'Third to right = +3 = 5. Offset clues: left/right = minus/plus for north-facing.' },
{ q: 'Six in a row facing south. "F is second to the left of G." G at position 4. F at?', o: ['2', '6', '1', '5', 'Cannot be determined'], a: 1, x: 'South-facing: left = higher index. 4+2 = 6. The flip is the entire trick.' },
],
// Linear/double-row > two rows facing
'1-2-1': [
{ q: 'Two rows of 4 facing each other: Row A faces south, Row B faces north. Person X (row A, pos 1 from left edge) faces which position in Row B?', o: ['Leftmost of B', 'Rightmost of B', 'Second left', 'Second right', 'Cannot be determined'], a: 1, x: 'Facing rows mirror positions: A-pos1 aligns with B-pos4 (from A\'s view). Draw both rows with arrows before placing.' },
{ q: 'Same setup: "K (row B) faces L (row A); L is second from A\'s right end." K sits at B\'s?', o: ['Second from left', 'Second from right', 'Extreme left', 'Extreme right', 'Third from left'], a: 1, x: 'Mirror: A\'s right-end side maps to B\'s right-end side in facing pairs. A-second-from-right pairs B-second-from-right.' },
{ q: '8 people, 4 per row facing each other. "M faces the immediate neighbour of N." If N(row A) at pos 2 and its neighbour at pos 3, M sits in row B opposite pos?', o: ['2', '3', '1', '4', 'Cannot be determined'], a: 1, x: 'M faces A-pos3 -> M is in row B at the position paired with A-3. Opposite = same index mirrored.' },
{ q: 'In two facing rows, "P is diagonally opposite to Q" — if Q is Row A pos 1, P (Row B) is at?', o: ['Opposite pos 1', 'Adjacent to the one opposite Q', 'Any position', 'Pos 2', 'Cannot be determined'], a: 1, x: 'Diagonal = opposite row, neighbouring index. "Diagonal" vs "faces" wording decides index +-1.' },
{ q: 'Row A south-facing, row B north. "R sits at the extreme right of row A." Who in row B faces R?', o: ['B\'s extreme left', 'B\'s extreme right', 'B\'s second-left', 'Cannot be determined', 'B\'s second-right'], a: 0, x: 'A\'s right end aligns opposite B\'s left end when rows face each other. Mirror-mapping is THE rule for double rows.' },
],
// Linear/double-row > end/position clues
'1-2-2': [
{ q: 'Row of 6 facing north. "S sits second to the left of the person at the extreme end." S is at position?', o: ['2 (if left end) or 5... need which end', 'Position 2', 'Position 5', '2 or 5 depending on which end', 'Cannot be determined'], a: 3, x: '"The extreme end" is ambiguous until the question fixes left or right — in real sets, another clue disambiguates. 6-1=5 if right end; 1+1=2 if left end.' },
{ q: 'Five in a row; "T sits at one of the extreme ends" and "T is not at the right end." T is at?', o: ['Position 1', 'Position 5', 'Position 2', 'Position 4', 'Cannot be determined'], a: 0, x: 'Elimination on an either/or clue: right-end ruled out -> left end. Negative clues narrow to one.' },
{ q: 'Eight in a row; "U sits exactly in the middle." U is at position?', o: ['4', '4 or 5', '5', 'Cannot be determined', '3'], a: 1, x: 'Even-sized rows have TWO middles (4 and 5) — classic trap; odd rows have one centre.' },
{ q: '"V sits third from the left end; W sits second from the right end" in a 7-row. Positions?', o: ['V=3, W=5', 'V=3, W=6', 'V=4, W=6', 'V=3, W=2', 'Cannot be determined'], a: 1, x: 'From right: position = N+1-rank = 7+1-2 = 6. Convert right-rank to left-index every time.' },
{ q: '"X is an immediate neighbour of the person who sits third from the right" in a 6-row. Third-from-right is at 4; X is at?', o: ['3 or 5', '3 only', '5 only', '2 or 6', 'Cannot be determined'], a: 0, x: 'Neighbours of 4 = 3 and 5. Keep both until a further clue kills one — premature fixing is the #1 seating error.' },
],
// Height/order > ranking
'1-3-0': [
{ q: 'Seven people ranked by height. A is taller than B but shorter than C; C is not the tallest. Minimum info needed to fix the tallest?', o: ['One more clue', 'Already determined', 'Two more clues', 'Cannot ever fix', 'None — ambiguous'], a: 4, x: 'C>A>B ordering fixed but the tallest is any of the remaining 4 people. "C is not tallest" removes C only — many candidates remain. Order chains rarely fix endpoints alone.' },
{ q: 'Five ranked: D>E, E>F, G is shortest, H is second tallest. Order tallest to shortest?', o: ['D,H,E,F,G or H,D,E,F,G', 'D,H,E,F,G only', 'Cannot be determined', 'H,D,E,F,G only', 'D,E,H,F,G'], a: 0, x: 'Chain D>E>F>G leaves H free except "2nd tallest" -> two valid orders. Chains + slot clues give candidate sets, not always a single order.' },
{ q: '"M is taller than exactly three people" in a group of 6. M\'s rank (tallest=1)?', o: ['2nd', '3rd', '4th', '5th', 'Cannot be determined'], a: 1, x: 'Taller than 3 = 3 people below -> rank 3 from top. "Taller than k people" = N-k-... careful: rank = 6-3 = 3rd.' },
{ q: 'Weights: P heavier than Q; R heavier than P; S lighter than Q; T heavier than R. Heaviest?', o: ['P', 'Q', 'R', 'T', 'Cannot be determined'], a: 3, x: 'Chain: T>R>P>Q>S — T heaviest. When the chain closes completely, the answer is instant.' },
{ q: '"K is heavier than L; J is heavier than K; only one person is heavier than J." J\'s rank?', o: ['1st', '2nd', '3rd', '4th', 'Cannot be determined'], a: 1, x: '"Only one heavier" = 2nd from top directly — position-giving clues bypass the chain.' },
],
// Height/order > definite-position clue
'1-3-1': [
{ q: '"The third tallest wears red." Five people ranked A>E>B>D>C (tallest first). Who wears red?', o: ['A', 'E', 'B', 'D', 'C'], a: 2, x: 'Index into the finished order: 3rd = B. Position clues only work AFTER the order is built.' },
{ q: 'Six runners finished a race. "The person who finished 4th passed exactly two people in the last lap." Who finished 4th?', o: ['Cannot be determined from this alone', 'The one who was 6th earlier', 'The one who was 2nd earlier', 'The leader', 'The last person'], a: 0, x: 'Passing info gives relative movement, not identity — recognise when a clue is position-only vs identity-only.' },
{ q: 'Ranked 1-8. "G is 5th; the person 2 ranks above G likes mango." That person is ranked?', o: ['2nd', '3rd', '7th', '6th', 'Cannot be determined'], a: 1, x: '"2 ranks above 5th" = 3rd. Above = better rank = smaller number — direction errors kill these.' },
{ q: 'In an exam, "the topper scored 95, the person just below the median scored 72." If 7 students, median rank is?', o: ['3rd', '4th', '5th', '3.5th', 'Cannot be determined'], a: 1, x: '7 students -> median = 4th. Odd group centre = (N+1)/2.' },
{ q: '"B finished between A and C; A finished 2nd; C finished 5th." B finished?', o: ['3rd', '4th', '3rd or 4th', '1st', 'Cannot be determined'], a: 2, x: 'Between 2 and 5 = 3 or 4. "Between" gives a range unless endpoints are adjacent.' },
],
// Singles > statement & assumption
'1-4-0': [
{ q: 'Statement: "The govt should ban plastic bags to reduce pollution." Assumption: (I) Plastic bags cause pollution. (II) A ban would reduce it.', o: ['Only I', 'Only II', 'Both', 'Neither', 'Either'], a: 2, x: 'Both are implicit — the statement presumes cause and remedy. Test: if the assumption were false, would the statement still make sense? No -> implicit.' },
{ q: 'Statement: "Join our crash course to crack SEBI Grade A." Assumption: (I) Courses help crack exams. (II) The reader wants to crack SEBI.', o: ['Only I', 'Only II', 'Both', 'Neither', 'Either'], a: 0, x: 'II is not assumed — ads address potential interest, they don\'t presume it. Desired-but-not-assumed is the classic trap.' },
{ q: 'Statement: "The bank advised customers to update KYC by 30 June." Assumption: (I) Some customers haven\'t updated. (II) The bank can verify updates.', o: ['Only I', 'Only II', 'Both', 'Neither', 'Either'], a: 0, x: 'I is implicit (why advise otherwise). II is administrative capability — not required by the statement.' },
{ q: 'Statement: "Regular exercise improves concentration, so students should exercise daily." Assumption: students can exercise daily.', o: ['Implicit', 'Not implicit', 'Either way', 'Contradicts', 'Restates'], a: 0, x: 'A recommendation assumes its own feasibility — the "definitely-follows" test passes.' },
{ q: 'Statement: "X bank offers 7% FD — the best rate in town!" Assumption: higher rates attract depositors.', o: ['Implicit', 'Not implicit', 'Either', 'Contradicts', 'Cannot say'], a: 0, x: 'The advertorial claim presumes rate-sensitivity in customers — implicit.' },
],
// Singles > syllogism
'1-4-1': [
{ q: 'Statements: All cats are animals. Some animals are dogs. Conclusions: I. Some cats are dogs. II. All cats are animals.', o: ['Only I', 'Only II', 'Both', 'Neither', 'Either I or II'], a: 1, x: 'II is a restated premise -> follows. I needs the "some" groups to overlap — not forced. Some-A-are-B + All-C-are-A never gives Some-C-are-B.' },
{ q: 'Statements: No apple is a banana. All bananas are fruits. Conclusions: I. No apple is a fruit. II. Some fruits are not apples.', o: ['Only I', 'Only II', 'Both', 'Neither', 'Either'], a: 1, x: 'No-apple-banana doesn\'t bar apples from fruits (they could be). But banana-fruits exist and bananas aren\'t apples -> some fruits aren\'t apples. II follows via the 50-rule: "some" conclusions need only one forced case.' },
{ q: 'Statements: All pens are books. All books are pages. Conclusions: I. All pens are pages. II. Some pages are pens.', o: ['Only I', 'Only II', 'Both', 'Neither', 'Either'], a: 2, x: 'All-All chain: pens subset of pages -> I yes; subset means SOME pages are pens -> II yes. Chain syllogisms are the fastest singles.' },
{ q: 'Statements: Some cars are bikes. Some bikes are trucks. Conclusions: I. Some cars are trucks. II. Some trucks are bikes.', o: ['Only I', 'Only II', 'Both', 'Neither', 'Either'], a: 1, x: 'Two "some" premises NEVER connect the ends -> I fails. II is just the premise reversed -> follows.' },
{ q: 'Statements: Only a few officers are managers. All managers are clerks. Conclusions: I. All officers are clerks. II. Some managers are clerks.', o: ['Only I', 'Only II', 'Both', 'Neither', 'Either'], a: 1, x: '"Only a few" = some (but limits universal reach) -> I fails. All managers are clerks -> some managers are clerks = II.' },
],
// Singles > blood relations
'1-4-2': [
{ q: 'A is B\'s brother. C is A\'s mother. D is C\'s father. How is D related to B?', o: ['Grandfather', 'Father', 'Uncle', 'Brother', 'Cannot be determined'], a: 0, x: 'C mother of A AND B (siblings); D is mother\'s father = maternal grandfather. Draw the tree: siblings share parents.' },
{ q: 'Pointing to a photo, a man says "She is the daughter of my grandfather\'s only son." Who is she?', o: ['His sister', 'His cousin', 'His aunt', 'His daughter', 'Cannot be determined'], a: 0, x: 'Grandfather\'s only son = the man\'s father -> father\'s daughter = his sister. "Only son/daughter" collapses the tree instantly.' },
{ q: 'P is Q\'s sister. R is Q\'s husband. S is R\'s son. How is P related to S?', o: ['Aunt', 'Mother', 'Grandmother', 'Cousin', 'Sister'], a: 0, x: 'P is the sister of S\'s mother -> maternal aunt. Spouse-side relations route through the marriage link.' },
{ q: '"A x B" means A is father of B; "A + B" means A is sister of B; "A - B" means A is brother of B. If M + N - O, then O is related to M as?', o: ['Brother', 'Sister', 'Brother or sister (gender unstated)', 'Cousin', 'Uncle'], a: 2, x: 'M + N: M is sister of N. N - O: N is brother of O. All three are siblings - but O\'s gender is never stated. Gender-unstated is the classic trap in coded relations.' },
{ q: 'E is F\'s son. G is E\'s sister. H is F\'s wife. How is H related to G?', o: ['Mother', 'Aunt', 'Sister', 'Grandmother', 'Cannot be determined'], a: 0, x: 'E and G are F\'s children; H is F\'s wife -> mother of both (assuming standard family — these questions assume a single marriage unit).' },
],
// Singles > coding / series
'1-4-3': [
{ q: 'In a code, CAT = 3120 (3-1-20). What is DOG?', o: ['4157', '41520', '4156', '41507', '4175'], a: 0, x: 'Letter positions joined: D=4, O=15, G=7 -> 4157. Alphabet positions cold = coding questions free.' },
{ q: 'If "water" is "food", "food" is "tree", "tree" is "sky", "sky" is "wall" — where does fruit grow?', o: ['Tree', 'Sky', 'Food', 'Wall', 'Water'], a: 1, x: 'Fruit grows on tree -> coded as "sky". Chain-coding: follow the word, not the meaning.' },
{ q: 'Series: A2, C4, E6, G8, ?', o: ['H9', 'I10', 'I9', 'H10', 'J10'], a: 1, x: 'Letters +2, numbers +2 -> I10. Two-track series: solve each track separately.' },
{ q: 'Series: Z1A, Y2B, X3C, ?', o: ['W4D', 'V4D', 'W5D', 'W3D', 'X4E'], a: 0, x: 'Letters go back one (Z,Y,X,W); digits +1; tail letters +1 (A,B,C,D) -> W4D. Alphanumeric = 3 parallel tracks.' },
{ q: 'In a certain code MONKEY = XDJMNL. How is TIGER coded?', o: ['SHFDQ', 'SFFDQ', 'QDFHS', 'REGIT', 'RHSFQ'], a: 2, x: 'Decode the pair first: MONKEY reversed = YEKNOM, each letter -1 = XDJMNL. Same rule: TIGER -> REGIT -> -1 each = QDFHS. Two-layer codes (reverse + shift) are common.' },
],
// Singles > direction sense
'1-4-4': [
{ q: 'A man walks 3km north, turns right, walks 4km. Distance from start?', o: ['5 km', '6 km', '7 km', '4 km', '3 km'], a: 0, x: 'Right turn from north = east. 3-4-5 Pythagorean triple -> 5km. Trace on paper, never mentally.' },
{ q: 'She walks 5km east, turns left, walks 5km, turns left, walks 5km. Now facing?', o: ['North', 'South', 'East', 'West', 'Cannot say'], a: 3, x: 'Facing east, left = north; facing north, left = west. She ends walking west. Track facing after EVERY turn — distances are decoys here.' },
{ q: 'Ravi faces sunrise, turns 135 degrees clockwise. Facing?', o: ['South-east', 'South-west', 'North-west', 'South', 'West'], a: 0, x: 'Sunrise = east. 90 clockwise -> south; +45 -> south-east. Degrees problems: convert to compass points stepwise.' },
{ q: 'A goes 10m north, 10m west, 10m south. Where relative to start?', o: ['10m west', '10m south-west', 'At start', '10m east', '10m north-west'], a: 0, x: 'North and south cancel; net = 10m west. Cancel opposite legs FIRST — it shrinks every direction problem.' },
{ q: 'Point A is 8m east of B; C is 6m north of B. Shortest A-to-C?', o: ['10m', '12m', '14m', '8m', '6m'], a: 0, x: 'Right triangle 6-8-10 -> 10m. Two legs from a common point = Pythagoras.' },
],
// ============ PAPER 1 > ENGLISH (section 2) ============
// (short passages inline, as in real paper each RC set shares one passage)

// RC > direct factual
'2-0-0': [
{ q: 'Passage: "SEBI was established in 1988 and given statutory powers in 1992. Its mandate covers investor protection, market development, and regulation of securities markets." Q: In which year did SEBI get statutory powers?', o: ['1988', '1992', '1990', '1985', '1995'], a: 1, x: 'Direct factual Qs = locate the number/fact, don\'t reason. 1988 sits there as the near-miss.' },
{ q: 'Passage: "The committee recommended three measures: faster settlement cycles, stricter disclosure norms, and higher penalties for insider trading." Q: Which is NOT a recommended measure?', o: ['Faster settlement', 'Stricter disclosure', 'Higher insider-trading penalties', 'Lower broker fees', 'All are recommended'], a: 3, x: 'NOT-questions: tick off what IS in the passage; the leftover is the answer.' },
{ q: 'Passage: "India\'s IPO market raised record capital in 2024, driven mainly by small and medium enterprises listing on dedicated platforms." Q: What drove the record IPO capital?', o: ['Large-cap listings', 'SME listings', 'Foreign IPOs', 'Government divestment', 'Debt markets'], a: 1, x: '"Mainly" in the passage maps to the driver asked — match the qualifier.' },
{ q: 'Passage: "T+1 settlement means trades settle one business day after execution; India moved to T+1 in 2023, ahead of most developed markets." Q: T+1 settlement completes within?', o: ['Same day', 'One business day', 'Two business days', 'One week', 'One month'], a: 1, x: 'Definition given verbatim in passage — the cheapest marks in RC.' },
{ q: 'Passage: "The regulator imposed a penalty of Rs 25 crore on the firm and barred its director from accessing securities markets for two years." Q: For how long was the director barred?', o: ['1 year', '2 years', '3 years', '5 years', 'Not mentioned'], a: 1, x: 'Numbers in passage questions are always lifted directly — underline figures while reading.' },
],
// RC > vocab-in-context
'2-0-1': [
{ q: 'Passage: "The regulator\'s stance remained resolute despite industry pushback." Q: "resolute" as used here means?', o: ['Flexible', 'Firm', 'Uncertain', 'Aggressive', 'Cautious'], a: 1, x: 'Context: "despite pushback" = unwavering -> firm. Vocab-in-context answers the passage meaning, not the flashiest synonym.' },
{ q: 'Passage: "The new norms have a stringent compliance requirement that smaller brokers find onerous." Q: "onerous" most nearly means?', o: ['Easy', 'Burdensome', 'Optional', 'Profitable', 'Illegal'], a: 1, x: 'Smaller brokers + "find" = something heavy -> burdensome. The sentence itself hands you the tone.' },
{ q: 'Passage: "Critics argue the policy is well-intentioned but myopic." Q: "myopic" here means?', o: ['Farsighted', 'Shortsighted', 'Generous', 'Corrupt', 'Ambitious'], a: 1, x: '"Well-intentioned BUT..." = contrast -> a flaw. Myopic = shortsighted.' },
{ q: 'Passage: "The market rebounded with alacrity after the policy clarification." Q: Choose the ANTONYM of "alacrity" as used:', o: ['Speed', 'Reluctance', 'Eagerness', 'Confusion', 'Strength'], a: 1, x: 'Alacrity = eager quickness; antonym = reluctance. Read whether they ask synonym or antonym — half the errors are misreading the ask.' },
{ q: 'Passage: "The scheme aims to ameliorate the hardships faced by small investors." Q: "ameliorate" means?', o: ['Worsen', 'Improve', 'Highlight', 'Remove', 'Delay'], a: 1, x: 'Aim + hardships -> to make better = improve. Verb + object tells you direction.' },
],
// RC > inference / tone / title
'2-0-2': [
{ q: 'Passage: "While digital adoption has accelerated, a significant share of rural investors still depends on physical branches for grievance redressal." Q: The author implies that?', o: ['Digital adoption should stop', 'Rural investors distrust technology', 'Physical infrastructure still matters', 'Branches are obsolete', 'Grievances are increasing'], a: 2, x: 'Inference = one step beyond text, not a leap. "Still depends" -> physical infra matters. Distrust is an overreach.' },
{ q: 'Passage describes a reform that helped investors but "quietly raised compliance costs tenfold for small firms." Q: Author\'s tone?', o: ['Celebratory', 'Critical but balanced', 'Angry', 'Neutral reporting only', 'Sarcastic'], a: 1, x: 'Both sides shown (helped + but) = balanced critique. Eliminate extremes first — "celebratory" and "angry" die fast.' },
{ q: 'Passage covers how algo trading changed liquidity, its risks, and SEBI\'s response. Best title?', o: ['The Dangers of Technology', 'Algorithmic Trading: Promise and Peril', 'SEBI Regulations Explained', 'How Markets Work', 'Liquidity in Indian Markets'], a: 1, x: 'Title = covers ALL major threads, not one. Options touching only one idea (regulations, liquidity alone) are decoys.' },
{ q: 'Passage: "Policymakers celebrated the milestone, though economists cautioned that headline numbers masked uneven growth." Q: Economists\' view is best described as?', o: ['Supportive', 'Sceptical', 'Indifferent', 'Confused', 'Hostile'], a: 1, x: '"Cautioned... masked" = doubt, not rejection -> sceptical. Hostile is too strong — degree words matter in tone questions.' },
{ q: 'Passage on a new listing rule: "Time will tell whether the framework adapts or merely adds another layer." Q: Author\'s stance?', o: ['Confident it will fail', 'Wait-and-see / cautiously open', 'Fully supportive', 'Dismissive', 'Enthusiastic'], a: 1, x: '"Time will tell" = suspended judgment. Match the hedging language.' },
],

// Error spotting > subject-verb agreement
'2-1-0': [
{ q: 'The list of candidates (A)/ are available (B)/ on the commission\'s website (C)/ for public scrutiny. (D)/ No error (E)', o: ['A', 'B', 'C', 'D', 'E'], a: 1, x: 'Subject = "list" (singular), not "candidates" -> "is available". The real subject hides left of "of" — the classic SEBI trap.' },
{ q: 'Each of the employees (A)/ have submitted (B)/ their KYC documents (C)/ to the HR desk. (D)/ No error (E)', o: ['A', 'B', 'C', 'D', 'E'], a: 1, x: '"Each of" takes singular verb -> "has submitted". Each/every/either/neither + plural noun still takes singular verb.' },
{ q: 'Neither the directors nor the auditor (A)/ were aware (B)/ of the discrepancy (C)/ in the accounts. (D)/ No error (E)', o: ['A', 'B', 'C', 'D', 'E'], a: 1, x: 'Neither...nor: verb agrees with the NEAREST subject ("auditor") -> "was aware". Proximity rule.' },
{ q: 'The number of complaints (A)/ filed against brokers (B)/ have doubled (C)/ this quarter. (D)/ No error (E)', o: ['A', 'B', 'C', 'D', 'E'], a: 2, x: '"The number of" = singular -> "has doubled". ("A number of" = plural — the pair is a favourite contrast.)' },
{ q: 'The quality of the securities (A)/ offered to retail investors (B)/ were questioned (C)/ by the committee. (D)/ No error (E)', o: ['A', 'B', 'C', 'D', 'E'], a: 2, x: 'Subject = "quality" -> "was questioned". Long gap between subject and verb is intentional misdirection.' },
],
// Error spotting > tense/parallelism
'2-1-1': [
{ q: 'The regaining of freedom (A)/ as we well know has given rise for (B)/ many dormant issues and conflicts (C)/ in our society. (D)/ No error (E)', o: ['A', 'B', 'C', 'D', 'E'], a: 1, x: '"give rise TO", not "for" — real SEBI handout question. Preposition errors dress up as tense questions.' },
{ q: 'By the time the auditor arrived, (A)/ the management have destroyed (B)/ the incriminating files (C)/ quietly. (D)/ No error (E)', o: ['A', 'B', 'C', 'D', 'E'], a: 1, x: 'Earlier of two past actions = past perfect -> "had destroyed". Timeline: destroyed BEFORE arrived.' },
{ q: 'She is working in this bank (A)/ since 2019 (B)/ and knows every process (C)/ thoroughly. (D)/ No error (E)', o: ['A', 'B', 'C', 'D', 'E'], a: 0, x: '"Since + point of time" needs present perfect continuous -> "has been working". Since/for = the #1 tense trigger.' },
{ q: 'He wanted to buy shares, (A)/ sell them quickly, (B)/ and was making (C)/ a fast profit. (D)/ No error (E)', o: ['A', 'B', 'C', 'D', 'E'], a: 2, x: 'Parallel structure breaks: to buy, sell, and MAKE — "was making" breaks the infinitive chain. Lists must stay grammatically identical.' },
{ q: 'When I will reach office, (A)/ I will send you (B)/ the complete report (C)/ immediately. (D)/ No error (E)', o: ['A', 'B', 'C', 'D', 'E'], a: 0, x: 'Time clauses take present tense for future -> "When I reach". Will + when/if/until in the same clause = automatic error.' },
],
// Error spotting > article/preposition/idiom
'2-1-2': [
{ q: 'The scheme provides (A)/ an unique opportunity (B)/ for rural entrepreneurs (C)/ to access credit. (D)/ No error (E)', o: ['A', 'B', 'C', 'D', 'E'], a: 1, x: '"Unique" starts with a Y consonant sound -> "a unique". A/an goes by SOUND, not spelling (a university, an hour).' },
{ q: 'The committee insisted (A)/ on a detailed report (B)/ about the incident (C)/ at earliest. (D)/ No error (E)', o: ['A', 'B', 'C', 'D', 'E'], a: 3, x: '"at THE earliest" — set phrase. Missing articles in fixed phrases are high-frequency errors.' },
{ q: 'He is junior than me (A)/ by two years (B)/ yet earns (C)/ a higher salary. (D)/ No error (E)', o: ['A', 'B', 'C', 'D', 'E'], a: 0, x: 'Junior/senior/superior/inferior take TO, never "than" — a guaranteed-type error.' },
{ q: 'The auditor complied to (A)/ all the guidelines (B)/ issued by the regulator (C)/ last year. (D)/ No error (E)', o: ['A', 'B', 'C', 'D', 'E'], a: 0, x: '"Comply WITH" — verb-preposition collocations: depend on, insist on, comply with, cope with.' },
{ q: 'Despite of the warning, (A)/ investors continued (B)/ to buy the speculative stock (C)/ in large volumes. (D)/ No error (E)', o: ['A', 'B', 'C', 'D', 'E'], a: 0, x: '"Despite" never takes "of" (that\'s "in spite of"). Despite vs in spite of = classic pair trap.' },
],
// Error spotting > no-error option
'2-1-3': [
{ q: 'Bringing clean renewable energy to low-income countries (A)/ would enable more women and girls to gain access (B)/ to education, as without electricity they often (C)/ lack the means to study after nightfall. (D)/ No error (E)', o: ['A', 'B', 'C', 'D', 'E'], a: 4, x: 'This sentence is CLEAN — real PYQ-style. ~1 in 5 "No error" is genuine; don\'t invent errors under pressure.' },
{ q: 'The board has decided (A)/ to raise the dividend (B)/ by 10 percent (C)/ this financial year. (D)/ No error (E)', o: ['A', 'B', 'C', 'D', 'E'], a: 4, x: 'Fully correct sentence — "has decided", "raise by", all clean. Train yourself to mark E confidently.' },
{ q: 'Each of the proposals (A)/ were discussed (B)/ in detail (C)/ by the panel. (D)/ No error (E)', o: ['A', 'B', 'C', 'D', 'E'], a: 1, x: 'Each = singular -> "was discussed". If you hunt for E here, you missed the real one — check agreement FIRST on every sentence.' },
{ q: 'Neither of the two offers (A)/ were acceptable (B)/ to the negotiating team (C)/ at that stage. (D)/ No error (E)', o: ['A', 'B', 'C', 'D', 'E'], a: 1, x: 'Neither = singular -> "was acceptable".' },
{ q: 'The data published by the exchange (A)/ shows a steady rise (B)/ in retail participation (C)/ over the decade. (D)/ No error (E)', o: ['A', 'B', 'C', 'D', 'E'], a: 4, x: '"Data" as singular mass noun with "shows" is acceptable in modern usage; everything else is clean -> No error. Don\'t over-apply pedantry.' },
],

// Fillers > double fillers
'2-2-0': [
{ q: 'The new policy is expected to _____ transparency and _____ investor confidence. (i) reduce (ii) enhance (iii) undermine (iv) boost', o: ['(i) and (iii)', '(ii) and (iv)', '(i) and (iv)', '(ii) and (iii)', '(iii) and (ii)'], a: 1, x: 'Both blanks need positive verbs -> enhance + boost. Double fillers: check EACH word against ITS blank; only one pair survives both tests.' },
{ q: '_____ the warning signs, investors continued to pour money into the _____ scheme. (i) Despite (ii) dubious (iii) robust (iv) Because', o: ['(iv) and (iii)', '(i) and (iii)', '(i) and (ii)', '(iv) and (ii)', '(ii) and (iv)'], a: 2, x: 'First blank needs contrast (despite), second needs negative adjective (dubious). Order matters — pair must fit BOTH blanks simultaneously.' },
{ q: 'The minister _____ that the reforms would _____ long-term growth. (i) denied (ii) asserted (iii) hamper (iv) catalyse', o: ['(i) and (iii)', '(ii) and (iii)', '(i) and (iv)', '(ii) and (iv)', '(iii) and (i)'], a: 3, x: 'Asserted + catalyse = coherent positive statement. Eliminate by polarity: a minister asserting positive reform.' },
{ q: 'His _____ approach to work earned him the _____ of his peers. (i) casual (ii) meticulous (iii) admiration (iv) contempt', o: ['(i) and (iii)', '(ii) and (iv)', '(i) and (iv)', '(ii) and (iii)', '(iv) and (i)'], a: 3, x: 'Meticulous + admiration = matching tone. The two blanks must agree in REGISTER — careless work can\'t earn admiration.' },
{ q: 'The company\'s profits _____ sharply after it _____ the new market. (i) rose (ii) entered (iii) fell (iv) exited', o: ['(i) and (iv)', '(iii) and (ii)', '(i) and (ii)', '(iv) and (i)', '(ii) and (iii)'], a: 2, x: 'Cause-effect: entering a market -> profits rise. Read the logic flow between the blanks, not each in isolation.' },
],
// Fillers > context clue word
'2-2-1': [
{ q: 'Continuous unemployment has induced in the people a kind of _____ which is most depressing.', o: ['laziness', 'encouragement', 'satisfaction', 'anger', 'awakening'], a: 3, x: 'Real handout Q. "Most depressing" = the blank must be NEGATIVE + a reaction to suffering -> anger (not laziness — the people aren\'t the problem). The clue word at the end decides it.' },
{ q: 'The evidence was so _____ that the jury took only minutes to convict.', o: ['ambiguous', 'compelling', 'confusing', 'weak', 'contrived'], a: 1, x: '"Only minutes" = decisive -> compelling. The outcome phrase is the polarity anchor.' },
{ q: 'Her explanation was _____, leaving everyone more confused than before.', o: ['lucid', 'clear', 'convoluted', 'brief', 'helpful'], a: 2, x: '"More confused" -> negative/complicated -> convoluted. The result tells you the adjective.' },
{ q: 'The report was praised for its _____ analysis, covering every angle of the issue.', o: ['superficial', 'comprehensive', 'narrow', 'biased', 'hasty'], a: 1, x: '"Covering every angle" = thorough -> comprehensive. Paraphrase the descriptive clause, then match.' },
{ q: 'He gave a _____ reply, answering in barely a few words.', o: ['verbose', 'lengthy', 'terse', 'detailed', 'eloquent'], a: 2, x: '"Barely a few words" = terse. The quantifier phrase is the giveaway.' },
],
// Fillers > connector fillers
'2-2-2': [
{ q: '_____ the economy showed signs of recovery, unemployment remained stubbornly high.', o: ['Because', 'Although', 'Therefore', 'Moreover', 'Since'], a: 1, x: 'Two opposing facts -> contrast connector = although. Logic first: same-direction (because/therefore) vs opposite (although/despite).' },
{ q: 'The company failed to innovate; _____, it lost market share rapidly.', o: ['however', 'nevertheless', 'consequently', 'otherwise', 'meanwhile'], a: 2, x: 'Effect follows cause -> consequently. Cause-and-effect connectors: therefore, thus, hence, consequently.' },
{ q: 'He is wealthy; _____, he lives a frugal life.', o: ['therefore', 'besides', 'yet', 'similarly', 'consequently'], a: 2, x: 'Opposition between clauses -> yet/however/but family.' },
{ q: 'The report was long; _____, it contained almost no useful data.', o: ['in addition', 'moreover', 'however', 'similarly', 'thus'], a: 2, x: 'Negative turn after neutral fact -> however.' },
{ q: 'The deadline was tight; _____, the team delivered ahead of schedule.', o: ['therefore', 'nevertheless', 'because', 'unless', 'meanwhile'], a: 1, x: 'Expectation broken -> nevertheless = "despite that".' },
],

// Sentence improvement > idiomatic replacement
'2-3-0': [
{ q: 'He insisted to go with me to the meeting.', o: ['insisted on going', 'insisted going', 'insisted for going', 'insisted to be going', 'No improvement'], a: 0, x: '"Insist on + gerund" — verb+preposition collocations drive most sentence-improvement answers.' },
{ q: 'The manager asked me that why I was late.', o: ['asked me why was I late', 'asked me why I was late', 'asked to me why I was late', 'asked me that why was I late', 'No improvement'], a: 1, x: 'Indirect question = statement order (why I was), no "that". Reported-speech word order is a repeat offender.' },
{ q: 'Unless you do not work hard, you will fail.', o: ['do not work', 'will not work', 'did not work', 'Unless you work hard', 'No improvement'], a: 3, x: '"Unless" already means "if not" — double negative breaks it -> "Unless you work hard".' },
{ q: 'Scarcely he had reached the station when the train left.', o: ['Scarcely had he reached', 'Scarcely he had reached', 'He had scarcely reached', 'Scarcely he has reached', 'No improvement'], a: 0, x: 'Negative adverb openers (scarcely/hardly/no sooner) invert: "Scarcely had he..." Fixed inversion rule.' },
{ q: 'I am looking forward to meet you next week.', o: ['to meeting', 'for meeting', 'to have met', 'to be meeting', 'No improvement'], a: 0, x: '"Look forward to" is a phrasal preposition -> takes gerund (meeting), not infinitive. Top-5 trap in this question type.' },
],
// Sentence improvement > redundancy/conciseness
'2-3-1': [
{ q: 'The two brothers fought between themselves over the property.', o: ['fought among themselves', 'fought between each other', 'fought each other', 'fought', 'No improvement'], a: 2, x: '"Between themselves" is redundant after "fought" — leanest correct option wins. Between = 2, among = 3+ is a bonus check.' },
{ q: 'He returned back the book yesterday.', o: ['returned', 'gave back', 'returned back', 'has returned back', 'No improvement'], a: 0, x: '"Returned back" = double meaning — "returned" alone. Redundancy pairs: return back, repeat again, revert back.' },
{ q: 'The reason why he resigned is because he was transferred.', o: ['is that he was transferred', 'is because of transfer', 'is due to transfer', 'is since he transferred', 'No improvement'], a: 0, x: '"Reason why... is because" = double cause -> "is that". Classic redundancy structure.' },
{ q: 'Each and every student in the class was present.', o: ['Each and all', 'Every one of the students', 'Each student', 'All students each', 'No improvement'], a: 2, x: '"Each and every" is redundant — pick one. Shortest grammatically correct = often right.' },
{ q: 'In my opinion I think the policy is flawed.', o: ['I think in my opinion', 'I opine that', 'In my opinion, the policy', 'My opinion thinks', 'No improvement'], a: 2, x: '"In my opinion I think" doubles the hedge — drop one.' },
],

// Para jumble > opener identification
'2-4-0': [
{ q: 'Arrange: (P) This dependence has made the economy vulnerable to price shocks. (Q) India imports nearly 85% of its crude oil. (R) Therefore, policymakers push for renewable energy. (S) The transition, however, needs massive investment. Correct order?', o: ['QPRS', 'PQRS', 'QRPS', 'RQPS', 'QSRP'], a: 0, x: '"This dependence" (P) needs an antecedent -> can\'t open. Q states the fact -> opens. "Therefore" (R) concludes. Q-P-R-S.' },
{ q: '(P) However, not all apps are equally safe. (Q) Millions now invest through mobile apps. (R) This has democratised market access. (S) SEBI has issued guidelines for such platforms. Order?', o: ['QRPS', 'QPRS', 'RQPS', 'QSRP', 'PSQR'], a: 0, x: 'Q opens (topic statement); R\'s "This" = the app trend; P "However" turns; S responds. Connector words are ordering magnets.' },
{ q: '(P) Such schemes, though, suffer from poor awareness. (Q) The government launched several financial inclusion schemes. (R) They brought millions into the banking system. (S) Awareness campaigns are now being scaled up. Order?', o: ['QRPS', 'QPRS', 'RQSP', 'QRSP', 'PSQR'], a: 0, x: 'Q -> R (result) -> P ("though" turn) -> S (response). "Though/however" always follows the claim it softens.' },
{ q: '(P) The first settlement system was manual and slow. (Q) Today trades settle electronically within a day. (R) Over decades, clearing evolved dramatically. (S) This evolution reduced counterparty risk. Order?', o: ['RPQS', 'PQRS', 'RQPS', 'PRQS', 'QRPS'], a: 0, x: 'R is the frame sentence; P-Q = then-vs-now pair; S concludes. Frame -> contrast pair -> result.' },
{ q: '(P) Consequently, volumes dried up. (Q) The exchange hiked transaction fees sharply. (R) Traders protested the move immediately. (S) The exchange rolled back part of the hike. Order?', o: ['QRPS', 'RQPS', 'QPRS', 'PSQR', 'QSRP'], a: 0, x: 'Cause -> reaction -> consequence -> resolution: Q-R-P-S. Story jumbles follow chronology.' },
],
// Para jumble > mandatory pairs
'2-4-1': [
{ q: '(P) This index measures manufacturing health. (Q) PMI is released monthly by private agencies. (R) A reading above 50 signals expansion. (S) Investors track it closely for early signals. Find the locked pair.', o: ['Q-P', 'P-Q', 'R-S', 'Q-S', 'P-R'], a: 0, x: '"This index" must follow the noun it names (PMI in Q) -> Q-P locked. Pronoun->noun pairs are unbreakable.' },
{ q: '(P) He introduced the repo rate mechanism. (Q) The RBI governor addressed the press. (R) It determines the cost of bank borrowing. (S) Markets reacted within minutes. Locked pair?', o: ['Q-R', 'P-R', 'Q-P', 'R-S', 'P-S'], a: 1, x: '"It" (R) = the repo rate mechanism (P) -> P-R locked together. Track every "it/this/they" to its noun.' },
{ q: '(P) These benefits, however, come with compliance burdens. (Q) Listing brings capital, visibility and credibility. (R) Small firms find the burden especially heavy. (S) SEBI created a lighter-touch SME platform. Which pair is inseparable?', o: ['Q-R', 'P-R', 'Q-P', 'R-S', 'Q-S'], a: 1, x: 'P introduces "compliance burdens"; R specifies who suffers them -> P-R bound. Abstract-then-example pairs stick.' },
{ q: '(P) The move surprised analysts. (Q) The central bank cut rates by 50 basis points. (R) They had predicted a 25-point cut. (S) Bond yields fell sharply. Locked pair?', o: ['Q-R', 'P-R', 'Q-P', 'R-S', 'P-S'], a: 1, x: '"They" (R) = analysts (P) -> P-R. Surprise + prediction gap = cause pair.' },
{ q: '(P) One such reform was dematerialisation. (Q) The 1990s saw sweeping market reforms. (R) Paper share certificates vanished within years. (S) This cut fraud and settlement delays. Locked pair?', o: ['P-R', 'Q-P', 'R-S', 'P-S', 'Q-R'], a: 0, x: '"One such reform" points back to reforms (Q... actually P follows Q, and dematerialisation->certificates vanished = P-R causal pair). P-R is the tightest link: the reform and its direct consequence.' },
],
// Para jumble > rearrangement type
'2-4-2': [
{ q: 'Arrange into a coherent sentence: (P) to protect retail investors (Q) the regulator issued (R) stricter margin requirements (S) from excessive leverage', o: ['QRPS', 'RQPS', 'QPRS', 'RPSQ', 'PQRS'], a: 0, x: 'Subject-verb first: "the regulator issued" (Q) -> object (R) -> purpose (P) -> from-clause (S). Verb-object glue is unbreakable.' },
{ q: 'Rearrange: (P) in emerging markets (Q) foreign investors pulled out (R) over $2 billion (S) amid currency volatility', o: ['QRPS', 'RQPS', 'PRQS', 'QSRP', 'SPQR'], a: 0, x: 'Q-R pair (pulled out + amount) then place (P) then reason (S). Amount attaches to the verb it quantifies.' },
{ q: 'Rearrange: (P) which the committee found (Q) the auditor flagged (R) several irregularities (S) to be deliberate fraud', o: ['QRPS', 'RQSP', 'QPRS', 'RSPQ', 'PQRS'], a: 0, x: 'Q-R (auditor flagged irregularities) -> P-S (which... found to be fraud). Relative clause stays attached to its noun.' },
{ q: 'Rearrange: (P) that markets would stabilise (Q) the finance minister assured (R) investors on Monday (S) within two quarters', o: ['QRPS', 'RQPS', 'PQRS', 'QPRS', 'SRQP'], a: 0, x: 'Q-R (assured investors) -> P-S (that-clause + time). That-clause follows the speech verb directly.' },
{ q: 'Rearrange: (P) having cleared the audit (Q) the company was allowed (R) to resume trading (S) on the exchange', o: ['QRPS', 'PQRS', 'QPRS', 'SRQP', 'RQPS'], a: 1, x: 'Participle opener (P) -> main clause (Q) -> infinitive (R) -> place (S). "Having X-ed" phrases open sentences.' },
],

// Roster > cloze test
'2-5-0': [
{ q: 'Cloze: "The regulator has been working to (1)_____ the settlement cycle further." Blank 1:', o: ['lengthen', 'shorten', 'delay', 'complicate', 'widen'], a: 1, x: 'Cloze = discourse-fit, not just grammar: reform direction = shorter cycle. Read the passage\'s argument before filling any blank.' },
{ q: 'Cloze (same passage): "...though critics argue this may (2)_____ liquidity in smaller stocks." Blank 2:', o: ['increase', 'improve', 'hurt', 'deepen', 'boost'], a: 2, x: '"Critics argue" -> negative consequence -> hurt. The critic/voice cue dictates polarity.' },
{ q: 'Cloze (same): "(3)_____, the regulator plans a phased rollout starting with large-caps." Blank 3:', o: ['However', 'Meanwhile', 'Nevertheless', 'Despite', 'Therefore'], a: 3, x: 'Responding to the criticism with a plan -> "Therefore". Passage flow: proposal -> criticism -> response.' },
{ q: 'Cloze (same): "Large-caps were chosen for their (4)_____ trading volumes." Blank 4:', o: ['low', 'erratic', 'high', 'falling', 'poor'], a: 2, x: 'Why large-caps first? Because they trade heavily -> high. Blank must serve the passage\'s logic, not just fit grammar.' },
{ q: 'Cloze (same): "The final phase will (5)_____ the entire listed universe by 2027." Blank 5:', o: ['exclude', 'cover', 'ignore', 'limit', 'fragment'], a: 1, x: 'Phased rollout ends by covering everything -> cover. Track the argument arc across all 5 blanks.' },
],
// Roster > match the column
'2-5-1': [
{ q: 'Match: (1) "Bull market" pairs best with (a) falling prices (b) rising prices (c) flat prices?', o: ['a', 'b', 'c', 'a or c', 'none'], a: 1, x: 'Terminology match = straight recall: bull = rising. These are free marks when terms are memorised.' },
{ q: 'Match: (1) "Blue-chip" to (a) small speculative firms (b) large established firms (c) new IPOs', o: ['a', 'b', 'c', 'b or c', 'none'], a: 1, x: 'Blue-chip = large established — finance vocabulary MCQs reward the daily GA/vocab drip.' },
{ q: 'Match columns: A-"insider trading" B-"arbitrage" with 1-"price difference profit" 2-"illegal info use"', o: ['A-1 B-2', 'A-2 B-1', 'A-1 B-1', 'A-2 B-2', 'cannot match'], a: 1, x: 'Match each term to its own definition; swap options are the trap (A-1 B-2 looks plausible if you skim).' },
{ q: 'Match sentence starters: A-"Not only did the firm default," B-"but it also" — completes as?', o: ['misled investors', 'but also misled', 'also it misled', 'it misled also', 'misled also investors'], a: 0, x: '"Not only... but also" correlative pair -> B continues directly with a verb phrase. Correlatives: not only/but also, either/or, neither/nor.' },
{ q: 'Match: A-"He is one of the best" -> completes with (a) player (b) players (c) playing?', o: ['a', 'b', 'c', 'a or b', 'none'], a: 1, x: '"One of the + plural" — the group must be plural -> players. Agreement traps hide inside match formats too.' },
],
// ============ PAPER 1 > GA (section 3) ============

// Govt schemes > scheme to ministry/feature
'3-0-0': [
{ q: 'PM Jan Dhan Yojana was launched in which year?', o: ['2014', '2015', '2016', '2013', '2017'], a: 0, x: 'Aug 2014 — the flagship financial-inclusion scheme. Launch year + ministry + headline feature = the three facts SEBI asks per scheme.' },
{ q: 'The "S" in PM SVANidhi stands for?', o: ['Scheme', 'Street', 'Swasth', 'Samman', 'Seva'], a: 2, x: 'Acronym-expansion questions are a real GA staple (like the 2024 "S in SID" Q). Expand every scheme acronym in your log.' },
{ q: 'PM-KISAN provides income support of how much per year to farmer families?', o: ['Rs 4,000', 'Rs 6,000', 'Rs 8,000', 'Rs 10,000', 'Rs 12,000'], a: 1, x: 'Rs 6,000 in three instalments — numeric limits/amounts are the favourite fact-type for schemes.' },
{ q: 'Ayushman Bharat (PM-JAY) provides health cover of up to ___ per family per year?', o: ['Rs 1 lakh', 'Rs 2 lakh', 'Rs 5 lakh', 'Rs 10 lakh', 'Rs 3 lakh'], a: 2, x: 'Rs 5 lakh — flagship-scheme coverage numbers must be in the fact log.' },
{ q: 'Stand-Up India scheme provides loans between?', o: ['Rs 1-10 lakh', 'Rs 10 lakh-1 crore', 'Rs 5-50 lakh', 'Rs 50k-5 lakh', 'Rs 1-5 crore'], a: 1, x: 'Rs 10L-1Cr for SC/ST/women greenfield enterprises — range figures are classic options fodder.' },
],
// Govt schemes > eligibility/limit
'3-0-1': [
{ q: 'The maximum annual income permitted for filing ITR-4 (Sugam)?', o: ['Rs 25 lakh', 'Rs 50 lakh', 'Rs 75 lakh', 'Rs 1 crore', 'Rs 2 crore'], a: 1, x: 'Real 2024 PYQ — Rs 50 lakh. Threshold/cap numbers are the single most-asked scheme fact.' },
{ q: 'What is the maximum limit to invest in National Savings Certificates (NSC)?', o: ['Rs 1 lakh', 'Rs 1.5 lakh', 'Rs 5 lakh', 'Rs 10 lakh', 'No upper limit'], a: 4, x: 'Real 2024 PYQ — "no upper limit" style answers do occur; don\'t assume every scheme has a cap.' },
{ q: 'Atal Innovation Mission incubation centres are operationalised for how many years?', o: ['2 years', '3 years', '5 years', '7 years', '10 years'], a: 1, x: 'Real 2024 PYQ — 3 years. Scheme duration/tenure = second-favourite numeric fact.' },
{ q: 'PMJJBY (life insurance) annual premium is approximately?', o: ['Rs 330', 'Rs 436', 'Rs 12', 'Rs 1,000', 'Rs 2,500'], a: 1, x: 'Rs 436/yr for Rs 2L cover — premium-vs-cover pairs of the 3 social-security schemes get confused; log them side by side.' },
{ q: 'PMSBY (accident insurance) annual premium?', o: ['Rs 12', 'Rs 20', 'Rs 100', 'Rs 330', 'Rs 436'], a: 1, x: 'Rs 20/yr — the PMSBY/PMJJBY premium swap (20 vs 436) is exactly the kind of near-miss in options.' },
],
// Govt schemes > finance-linked schemes
'3-0-2': [
{ q: 'DigiLocker: which categories of documents can be stored?', o: ['Only educational', 'Only identity documents', 'Identity + education + transport + more', 'Only financial', 'Only government-issued IDs'], a: 2, x: 'Real 2024 PYQ — "all of the above" is a recurring correct answer in GA; don\'t reject it reflexively.' },
{ q: 'Sovereign Gold Bonds are issued by?', o: ['SEBI', 'RBI on behalf of Govt', 'Ministry of Finance directly', 'NSE', 'Scheduled banks'], a: 1, x: 'RBI issues on Govt of India\'s behalf — "who issues/regulates what" is the top finance-static pattern.' },
{ q: 'PM Mudra Yojana loans are categorised as Shishu, Kishor and?', o: ['Tarun', 'Yuva', 'Pradhan', 'Bal', 'Mitra'], a: 0, x: 'Shishu (<50k), Kishor (50k-5L), Tarun (5-10L) — named sub-categories make great one-liners.' },
{ q: 'APY (Atal Pension Yojana) targets which sector primarily?', o: ['Salaried govt staff', 'Unorganised sector workers', 'Farmers only', 'Students', 'Defence personnel'], a: 1, x: 'Unorganised sector — "which group does scheme X serve" = recurring frame.' },
{ q: 'e-RUPI, launched in 2021, is essentially?', o: ['A digital currency', 'A purpose-specific digital voucher', 'A UPI app by RBI', 'A credit card', 'A CBDC pilot'], a: 1, x: 'Voucher-based payment (not a currency) — near-miss options (CBDC, UPI app) are exactly the designed traps.' },
],

// Finance static > regulator to domain
'3-1-0': [
{ q: 'Which authority regulates Real Estate Investment Trusts (REITs) in India?', o: ['RBI', 'SEBI', 'RERA', 'MCA', 'NHB'], a: 1, x: 'Real 2024 PYQ — SEBI regulates REITs & InvITs (securities market products), RERA handles physical real estate. The classic overlap trap.' },
{ q: 'Credit rating agencies in India are registered with?', o: ['RBI', 'SEBI', 'IRDAI', 'MCA', 'PFRDA'], a: 1, x: 'SEBI registers CRAs — map EVERY regulator to its entities: RBI-banks/NBFCs, SEBI-markets, IRDAI-insurance, PFRDA-pensions.' },
{ q: 'The International Financial Services Centre (GIFT City) is regulated by?', o: ['SEBI', 'RBI', 'IFSCA', 'Ministry of Finance', 'CCI'], a: 2, x: 'IFSCA — the unified regulator fact is newer and therefore hot GA material.' },
{ q: 'Who regulates commodity derivatives markets in India?', o: ['FMC', 'SEBI', 'RBI', 'Ministry of Agriculture', 'NCDEX'], a: 1, x: 'SEBI since 2015 (FMC merged into it) — merger-history facts are exam favourites.' },
{ q: 'Deposit insurance for bank deposits (DICGC) covers up to?', o: ['Rs 1 lakh', 'Rs 2 lakh', 'Rs 5 lakh', 'Rs 10 lakh', 'Rs 3 lakh'], a: 2, x: 'Rs 5 lakh per depositor per bank since 2020 — raised limit = the update they love to test.' },
],
// Finance static > market terms
'3-1-1': [
{ q: 'India currently settles equity trades on which cycle?', o: ['T+0', 'T+1', 'T+2', 'T+3', 'Weekly'], a: 1, x: 'T+1 since 2023 (optional same-day T+0 pilot later) — settlement-cycle facts are market-static staples.' },
{ q: 'An IPO where the price band is open for investors to bid is called?', o: ['Fixed-price issue', 'Book-built issue', 'Rights issue', 'Private placement', 'FPO'], a: 1, x: 'Book-building vs fixed-price = the standard IPO-format distinction.' },
{ q: 'An "infrastructure investment trust" (InvIT) primarily invests in?', o: ['Tech startups', 'Infrastructure assets', 'Gold', 'Government bonds', 'Crypto assets'], a: 1, x: 'InvIT = infra assets; REIT = real estate. The REIT/InvIT pair is a guaranteed confusion point.' },
{ q: 'The minimum investment in a mutual fund SIP can start as low as?', o: ['Rs 100', 'Rs 500', 'Rs 1,000', 'Rs 5,000', 'Rs 10,000'], a: 1, x: 'Rs 500 (some Rs 100) — MF basics: SIP, NAV, expense ratio are the tested trio.' },
{ q: 'CDSL, one of India\'s two depositories, was promoted by?', o: ['NSE', 'BSE', 'RBI', 'SEBI', 'NSDL'], a: 1, x: 'Real 2024 PYQ — BSE promoted CDSL. Depository facts (CDSL/NSDL, who backs each) = repeated SEBI-GA territory.' },
],
// Finance static > banking products
'3-1-2': [
{ q: 'Which statement about a Recurring Deposit is INCORRECT?', o: ['Fixed monthly instalments', 'Interest compounded quarterly', 'Single lump-sum deposit allowed', 'Premature closure attracts penalty', 'Available at banks and post offices'], a: 2, x: 'Real 2024 PYQ format — RD = periodic deposits; lump-sum = FD. "INCORRECT" questions test product mechanics.' },
{ q: 'KYC "CKYC" records are maintained by?', o: ['RBI', 'CERSAI', 'SEBI', 'NPCI', 'IBA'], a: 1, x: 'CERSAI maintains the central KYC registry — body-to-function mapping again.' },
{ q: 'NEFT transactions settle on which basis?', o: ['Real-time individually', 'Half-hourly batches', 'End of day', 'Weekly', 'Hourly'], a: 1, x: 'NEFT = deferred net settlement in batches (now 24x7); RTGS = real-time gross. The NEFT/RTGS/IMPS trio is exam-critical.' },
{ q: 'UPI is operated by?', o: ['RBI directly', 'NPCI', 'Ministry of Electronics', 'IBA', 'SEBI'], a: 1, x: 'NPCI runs UPI, IMPS, RuPay, BBPS — NPCI\'s product list is a high-yield fact cluster.' },
{ q: 'A "no-frills" account is now called?', o: ['Jan Dhan only', 'Basic Savings Bank Deposit Account', 'Zero account', 'PMJDY Gold', 'Kisan account'], a: 1, x: 'BSBDA — renamed product names are subtle GA traps.' },
],

// Awards/firsts/sports/places > award-recipient
'3-2-0': [
{ q: 'The only Indian-origin mathematician to win the Abel Prize (as of 2024)?', o: ['C. R. Rao', 'Harish Chandra', 'S. R. S. Varadhan', 'Manjul Bhargava', 'Ashoke Sen'], a: 2, x: 'Real 2024 PYQ — Varadhan. "First/only Indian" award Qs are the top award pattern.' },
{ q: 'First Indian conferred the Nelson Mandela Lifetime Achievement Award (children\'s filmmaker)?', o: ['Satyajit Ray', 'Vinod Ganatra', 'Shoojit Sircar', 'Nandita Das', 'Vishal Bhardwaj'], a: 1, x: 'Real 2024 PYQ — obscure-recipient awards are asked BECAUSE they\'re obscure; your monthly log is the only defence.' },
{ q: 'The Nobel Peace Prize 2024 went to?', o: ['WHO', 'Nihon Hidankyo', 'UNHCR', 'World Food Programme', 'ICRC'], a: 1, x: 'Org-vs-person Nobel winners both get asked — log name + category + year.' },
{ q: 'Kroll\'s celebrity brand valuation (2024) ranked the most valuable Indian celebrity as?', o: ['Shah Rukh Khan', 'Virat Kohli', 'Ranveer Singh', 'Alia Bhatt', 'MS Dhoni'], a: 1, x: 'Real 2024 PYQ — brand/celebrity valuations = reports+indices family.' },
{ q: 'Bharat Ratna, India\'s highest civilian award, was most recently conferred (2024) upon how many recipients?', o: ['2', '3', '4', '5', '1'], a: 3, x: '5 recipients in 2024 — award COUNTS and recipient lists both appear.' },
],
// Awards/firsts/sports/places > first-in-news
'3-2-1': [
{ q: 'First Indian city inducted into UNESCO Creative Cities Network under "City of Literature"?', o: ['Varanasi', 'Jaipur', 'Kozhikode', 'Chennai', 'Kolkata'], a: 2, x: 'Real 2024 PYQ — Kozhikode. "First Indian X to achieve Y" is THE classic GA frame.' },
{ q: 'India\'s first indigenous aircraft carrier is?', o: ['INS Vikrant', 'INS Vikramaditya', 'INS Viraat', 'INS Arihant', 'INS Visakhapatnam'], a: 0, x: 'Vikrant (IAC-1, commissioned 2022) — defence-firsts recur in GA.' },
{ q: 'First city to get a fully operational Vande Bharat sleeper train route?', o: ['Delhi-Mumbai', 'Howrah-Guwahati', 'Chennai-Bengaluru', 'Delhi-Kolkata', 'Mumbai-Ahmedabad'], a: 1, x: 'Howrah-Guwahati (announced 2024) — "first route/city" transport facts rotate in.' },
{ q: 'India\'s first semiconductor fab was announced for which location?', o: ['Dholera, Gujarat', 'Sanand, Gujarat', 'Jagiroad, Assam', 'Both Sanand and Jagiroad', 'Noida, UP'], a: 3, x: 'Multiple fabs approved — "first" can have plural answers; keep location+state together.' },
{ q: 'The first railway station in India to get a platinum green rating?', o: ['New Delhi', 'Secunderabad', 'Mumbai CSMT', 'Chennai Central', 'Ahmedabad'], a: 1, x: 'Secunderabad — environment/certification firsts are a steady sub-pattern.' },
],
// Awards/firsts/sports/places > sports events/hosts
'3-2-2': [
{ q: 'Host of the FIFA Women\'s World Cup 2027?', o: ['Japan', 'Germany', 'South Africa', 'Brazil', 'Australia'], a: 3, x: 'Real 2024 PYQ — Brazil. Event-host facts need (event, edition/year, host-country) triple-logged.' },
{ q: 'How many Indian women won medals at the Arm Wrestling Asian Championship (2024)?', o: ['5', '6', '7', '8', '9'], a: 2, x: 'Real 2024 PYQ — medal counts in niche events DO get asked; monthly logs must capture number + event.' },
{ q: 'Paris Olympics 2024: India\'s medal tally?', o: ['5', '6', '7', '8', '4'], a: 1, x: '6 medals (1 silver, 5 bronze) — tally + which colour = both get asked.' },
{ q: 'The Chess World Champion 2024 (youngest ever) is?', o: ['Magnus Carlsen', 'D. Gukesh', 'Ding Liren', 'Praggnanandhaa', 'Vidit Gujrathi'], a: 1, x: 'Gukesh — India-linked global wins are highest-priority sports facts.' },
{ q: 'IPL 2024 champion?', o: ['CSK', 'KKR', 'SRH', 'RCB', 'MI'], a: 1, x: 'KKR beat SRH — IPL winner + runner-up + venue is a reliable annual fact.' },
],
// Awards/firsts/sports/places > places in news
'3-2-3': [
{ q: 'The world\'s highest railway bridge (Chenab Bridge) is built over which river?', o: ['Jhelum', 'Chenab', 'Ravi', 'Beas', 'Sutlej'], a: 1, x: 'Real 2024 PYQ — "highest/longest/first + location" = the places-in-news formula.' },
{ q: 'The 2024 G20-related summit outcomes were hosted primarily by which country?', o: ['India', 'Brazil', 'South Africa', 'Indonesia', 'Italy'], a: 1, x: 'Brazil hosted G20 2024 — summit host rotation: keep the current year + next year pair.' },
{ q: 'Vantara, the large animal rescue centre in news, is located in?', o: ['Jamnagar, Gujarat', 'Udaipur, Rajasthan', 'Mysuru, Karnataka', 'Pune, Maharashtra', 'Hyderabad, Telangana'], a: 0, x: 'Jamnagar — place-in-news questions always pair the thing with its state.' },
{ q: 'Where is the International Big Cat Alliance headquartered?', o: ['New Delhi', 'Mumbai', 'Geneva', 'Nairobi', 'Guwahati'], a: 0, x: 'New Delhi — new international bodies: name + HQ + founding year.' },
{ q: 'The 2024 Asian Summit on disaster risk was hosted by?', o: ['Philippines', 'India', 'Indonesia', 'Japan', 'Thailand'], a: 0, x: 'Manila, Philippines — obscure-summit facts separate the 15-mark GA scorer from the 10.' },
],

// Finance CA + reports > regulator actions
'3-3-0': [
{ q: 'RBI\'s repo rate is decided by which body?', o: ['Finance Ministry', 'Monetary Policy Committee', 'RBI Board only', 'Parliament', 'PMO'], a: 1, x: 'MPC — 6 members, 3 RBI + 3 external, Governor tie-breaks. Committee compositions are steady GA.' },
{ q: 'The current RBI Governor (2024-25 cycle) is?', o: ['Shaktikanta Das', 'Sanjay Malhotra', 'Urjit Patel', 'Raghuram Rajan', 'M. K. Jain'], a: 1, x: 'Sanjay Malhotra (appointed Dec 2024) — regulator HEADS are mandatory: name + since-when + predecessor.' },
{ q: 'SEBI\'s current chairperson (2024-25) is?', o: ['Madhabi Puri Buch', 'Tuhin Kanta Pandey', 'Ajay Tyagi', 'U. K. Sinha', 'Ananth Narayan'], a: 1, x: 'Tuhin Kanta Pandey succeeded Buch in March 2025 — succession events are always tested.' },
{ q: 'RBI\'s "financial inclusion index" is published at what frequency?', o: ['Monthly', 'Quarterly', 'Half-yearly', 'Annually', 'Biennially'], a: 3, x: 'Annual — publication frequency is a subtle repeated pattern.' },
{ q: 'UDGAM portal by RBI helps citizens find?', o: ['Unclaimed deposits', 'Tax refunds', 'Lost mutual funds', 'Pension dues', 'Insurance claims'], a: 0, x: 'Unclaimed deposits across banks — portal/app launches by RBI/SEBI are monthly-log material.' },
],
// Finance CA + reports > index rank + publisher
'3-3-1': [
{ q: 'The Henley Passport Index 2024 ranked India\'s passport at approximately?', o: ['70th', '80th', '82nd', '90th', '75th'], a: 2, x: '~80-85 range — index questions want rank + publisher (Henley & Partners) together.' },
{ q: 'The Global Hunger Index is published by?', o: ['FAO', 'Concern Worldwide + Welthungerhilfe', 'UNICEF', 'WFP', 'WHO'], a: 1, x: 'Publisher attribution is THE repeated trap — India\'s rank AND who publishes must both be in the log.' },
{ q: 'The World Press Freedom Index is released by?', o: ['UNESCO', 'Reporters Without Borders', 'Amnesty', 'CPJ', 'Freedom House'], a: 1, x: 'RSF — org-name questions reward knowing the publisher, not the number.' },
{ q: 'India\'s rank in the Global Innovation Index 2024?', o: ['39th', '40th', '48th', '52nd', '35th'], a: 0, x: '39th (published by WIPO) — trending-up indices on India get asked with rank + org.' },
{ q: 'The Corruption Perceptions Index is published by?', o: ['World Bank', 'Transparency International', 'UNDP', 'OECD', 'IMF'], a: 1, x: 'TI — the big indices have one-line "who publishes" facts; make a dedicated table.' },
],
// Finance CA + reports > org facts
'3-3-2': [
{ q: 'The Bank for International Settlements (BIS) is headquartered in?', o: ['Geneva', 'Basel', 'Zurich', 'Frankfurt', 'Paris'], a: 1, x: 'Basel, Switzerland — the "Basel norms" connection makes this high-frequency. Real 2024 had BIS-membership Q.' },
{ q: 'The Financial Action Task Force (FATF) grey list: India\'s status?', o: ['On grey list', 'On black list', 'Not on either list', 'Recently removed', 'Under review'], a: 2, x: 'India is a full member, not grey-listed — status questions need current facts, recheck each month.' },
{ q: 'NABARD was established in which year?', o: ['1975', '1982', '1990', '1969', '1992'], a: 1, x: '1982 — institution establishment years: NABARD 82, SIDBI 90, EXIM 82, NHB 88. Make the mini-table once.' },
{ q: 'The World Bank Group does NOT include?', o: ['IBRD', 'IDA', 'IFC', 'IMF', 'MIGA'], a: 3, x: 'IMF is separate (Bretton Woods sister, not a WB member) — "NOT included" org-membership Qs recur.' },
{ q: 'The National Centre for Financial Education (NCFE) beneficiaries include?', o: ['Only students', 'Only bankers', 'All sections of society', 'Only farmers', 'Only women'], a: 2, x: 'Real 2024 PYQ — "all of the above" strikes again; broad-beneficiary schemes favour the inclusive option.' },
],
// ============ PAPER 2 > IT ============

// Programming > code output / dry-run
'p2-0-0': [
{ q: 'What does this print? int x = 5; x = x++ + ++x; printf("%d", x);', o: ['10', '11', '12', '13', 'Undefined/implementation-defined'], a: 4, x: 'Modifying x twice between sequence points = undefined behaviour in C — a classic interview trick that appears in real papers.' },
{ q: 'Python: print([i*2 for i in range(4)])', o: ['[0,2,4,6]', '[2,4,6,8]', '[0,1,2,3]', '(0,2,4,6)', '[1,2,3,4]'], a: 0, x: 'range(4) = 0..3, doubled = 0,2,4,6. Dry-run: write the loop values down, apply the transform.' },
{ q: 'Java: int a = 10, b = 3; System.out.println(a/b + a%b);', o: ['3.33', '4', '5', '3', '4.33'], a: 1, x: 'Integer division: 10/3 = 3; 10%3 = 1; 3+1 = 4. int/int = int — the decimal is discarded.' },
{ q: 'C++: int a[] = {10,20,30}; int *p = a; printf("%d", *(p+1));', o: ['10', '20', '30', 'Address of a[1]', 'Compile error'], a: 1, x: 'Pointer arithmetic moves by ELEMENT size: *(p+1) = a[1] = 20. Arrays name = pointer to first element.' },
{ q: 'Python: s = "SEBI"; print(s[::-1])', o: ['SEBI', 'IBES', 'Error', 'S', 'IEBS'], a: 1, x: '[::-1] = reverse slice. Slice questions (start:stop:step) are the most common Python output pattern.' },
],
// Programming > OOP concepts
'p2-0-1': [
{ q: 'If a class has TWO methods with the same name but different parameter lists, this is?', o: ['Overriding', 'Overloading', 'Inheritance', 'Abstraction', 'Polymorphism via virtual'], a: 1, x: 'Same name + different signature in same class = overloading (compile-time). Overriding = same signature, parent-child.' },
{ q: 'A constructor is automatically invoked when?', o: ['The class is defined', 'An object is created', 'An object is destroyed', 'main() ends', 'Any method is called'], a: 1, x: 'Constructor = on object creation; destructor = on destruction. Order: base ctor -> derived ctor; destructors reverse.' },
{ q: 'Which C++ keyword allows a function to be redefined in a derived class?', o: ['static', 'virtual', 'const', 'friend', 'inline'], a: 1, x: 'virtual enables runtime polymorphism/overriding — the single most-asked OOP keyword.' },
{ q: 'In Java, a class that cannot be inherited is declared?', o: ['static', 'abstract', 'final', 'private', 'sealed'], a: 2, x: 'final class = no subclassing. Contrast: abstract = MUST be subclassed. The final/abstract pair is a favourite confusion.' },
{ q: 'Private members of a class are accessible from?', o: ['Everywhere', 'Only same class methods', 'Derived classes', 'Same package', 'Friend of derived class'], a: 1, x: 'private = same class only; protected adds derived classes; public = all. The access table is guaranteed marks.' },
],
// Programming > exception handling
'p2-0-2': [
{ q: 'Java: try { int x = 5/0; } catch(ArithmeticException e){ print("A"); } finally { print("F"); } Output?', o: ['A', 'F', 'AF', 'Exception propagates', 'Compile error'], a: 2, x: 'catch runs (A), finally ALWAYS runs (F) -> AF. finally executes even if exception caught or not.' },
{ q: 'Python: try: x = 1/0 except ZeroDivisionError: print("Z") — output?', o: ['Error traceback', 'Z', 'Nothing', '0', 'inf'], a: 1, x: 'ZeroDivisionError caught -> prints Z. Match the exception TYPE to the except clause.' },
{ q: 'In C++, an uncaught exception calls which function?', o: ['abort/terminate', 'exit', 'return', 'catch', 'delete'], a: 0, x: 'std::terminate() (which calls abort) — uncaught-exception behaviour is a frequent one-liner.' },
{ q: 'Java: multiple catch blocks — which order is REQUIRED?', o: ['Most general first', 'Most specific first', 'Any order', 'Alphabetical', 'Parent class first'], a: 1, x: 'Specific before general — a parent-class catch first makes subclass catches unreachable = compile error.' },
{ q: 'Python: try: open("nofile.txt") except _____ — which exception?', o: ['IOError/FileNotFoundError', 'ValueError', 'KeyError', 'TypeError', 'NameError'], a: 0, x: 'FileNotFoundError (subclass of OSError). Match common ops to their exceptions: dict[key]->KeyError, int("x")->ValueError.' },
],
// Programming > recursion trace
'p2-0-3': [
{ q: 'int f(int n){ return n<=1 ? 1 : n*f(n-1); } What is f(4)?', o: ['10', '16', '24', '12', '120'], a: 2, x: 'Factorial: 4x3x2x1 = 24. Unwind: write calls down to base case, then multiply back up.' },
{ q: 'def g(n): return 0 if n==0 else 1+g(n//2). g(8) returns?', o: ['2', '3', '4', '8', '1'], a: 2, x: 'g(8)=1+g(4); g(4)=1+g(2); g(2)=1+g(1); g(1)=1+g(0)=1. So g(8)=1+1+1+1 = 4. Unwind to the base case, then count the +1s coming back up.' },
{ q: 'fib(5) with fib(0)=0, fib(1)=1 returns?', o: ['3', '5', '8', '13', '2'], a: 1, x: '0,1,1,2,3,5 -> fib(5)=5. Write the sequence — never compute recursively in your head.' },
{ q: 'int h(int n){ if(n==0) return 0; return n + h(n-1); } h(5) = ?', o: ['10', '15', '20', '5', '25'], a: 1, x: '5+4+3+2+1+0 = 15 — triangular number. Tail-sum recursion = the easiest trace type.' },
{ q: 'def r(s): return s if len(s)<=1 else r(s[1:])+s[0]. r("abc") = ?', o: ['abc', 'cba', 'cab', 'bca', 'Error'], a: 1, x: 'r("abc") = r("bc")+"a" = (r("c")+"b")+"a" = "cba". String recursion: peel one char per call.' },
],
// Programming > scope & parameter passing
'p2-0-4': [
{ q: 'int x = 10; void f(){ int x = 5; printf("%d", x); } Inside f, printed value?', o: ['10', '5', 'Error', 'Garbage', '0'], a: 1, x: 'Local shadows global inside the function -> 5. Shadowing = inner scope wins.' },
{ q: 'C: void swap(int a, int b){ int t=a; a=b; b=t; } called with swap(x,y). After call, x and y are?', o: ['Swapped', 'Unchanged', 'Undefined', 'Compile error', 'Doubled'], a: 1, x: 'Call-by-value: copies swap, originals safe. THE classic — swap needs pointers or references.' },
{ q: 'Java: passing an object to a method that modifies its field — the field change is?', o: ['Lost', 'Visible to caller', 'Compile error', 'Reverted', 'Copied'], a: 1, x: 'Java passes references by value — the OBJECT is shared, so field changes persist. (But reassigning the parameter itself does NOT persist.)' },
{ q: 'Python: def f(lst): lst.append(1). Calling f(mylist) — after the call mylist is?', o: ['Unchanged', 'Has 1 appended', 'None', 'Copied', 'Error'], a: 1, x: 'Mutable objects (lists/dicts) pass shared references -> append persists. Immutable ints/strings do NOT change.' },
{ q: 'C++: void f(int &r){ r = 99; } int n = 5; f(n); n is now?', o: ['5', '99', 'Error', '0', 'Undefined'], a: 1, x: 'Reference parameter = alias to the original -> 99. The & in the signature is the whole question.' },
],
// Programming > operator precedence / string ops
'p2-0-5': [
{ q: 'C: int i = 5; printf("%d %d", i++, i); typical output?', o: ['5 5', '5 6', '6 6', '6 5', 'Undefined order'], a: 4, x: 'i++ and i in the same printf args = unspecified evaluation order — another UB classic.' },
{ q: 'Evaluate: 2 + 3 * 4 - 10 / 5 in C/Python?', o: ['18', '10', '12', '14', '16'], a: 2, x: '3*4=12, 10/5=2 -> 2+12-2 = 12. Precedence: * and / before + and -, left to right.' },
{ q: 'Python: "5" + "3" evaluates to?', o: ['8', '53', 'Error', '35', '5.3'], a: 1, x: 'String + string = concatenation -> "53". Quotes change EVERYTHING.' },
{ q: 'C: 7 % 3 + 2 * (4 - 1) = ?', o: ['5', '6', '7', '9', '11'], a: 2, x: '7%3 = 1; 2*3 = 6; 1+6 = 7. Parentheses first, then */% , then +-.' },
{ q: 'Java: "1" + 2 + 3 vs 1 + 2 + "3" — outputs?', o: ['Both "33"', '"123" and "33"', '"15" and "33"', '"123" and "15"', 'Both error'], a: 1, x: 'Left-to-right: "1"+2 = "12", +3 = "123"; 1+2 = 3, +"3" = "33". Order of evaluation + string coercion.' },
],
// Programming > IT trivia mixed in
'p2-0-6': [
{ q: 'In UNIX, "mounting" a file system means?', o: ['Formatting it', 'Attaching it to a directory in the tree', 'Compressing it', 'Encrypting it', 'Deleting it'], a: 1, x: 'Real PYQ — mount = attach a filesystem to a mount point in the directory tree.' },
{ q: 'ADS in Windows file systems stands for?', o: ['Active Directory Service', 'Alternate Data Streams', 'Advanced Disk Storage', 'Automated Data Sync', 'Access Data Server'], a: 1, x: 'Real PYQ — Alternate Data Streams (NTFS hidden streams). Full-form trivia is a recurring filler.' },
{ q: 'Which of these is NOT an OOP pillar?', o: ['Encapsulation', 'Inheritance', 'Compilation', 'Polymorphism', 'Abstraction'], a: 2, x: 'Compilation is a build step — the four pillars: encapsulation, inheritance, polymorphism, abstraction.' },
{ q: 'The ternary operator in C/Java/Python-equivalent takes how many operands?', o: ['1', '2', '3', '4', 'Variable'], a: 2, x: 'cond ? a : b = three operands — the only ternary operator.' },
{ q: 'Which language is primarily used for the examples in SEBI IT programming questions?', o: ['COBOL', 'Java/C/C++/Python mix', 'Only Java', 'Only Python', 'Pascal'], a: 1, x: 'Papers mix all four languages from the official syllabus — prepare all four syntaxes at read-level.' },
],

// DBMS > normal forms
'p2-1-0': [
{ q: 'A table has a composite key (A,B) and attribute C depends only on A. This violates?', o: ['1NF', '2NF', '3NF', 'BCNF', '4NF'], a: 1, x: 'Partial dependency (non-key depends on PART of a composite key) = 2NF violation. The composite key is the tell.' },
{ q: 'In a table, Dept determines DeptLocation (non-key -> non-key). Violation?', o: ['1NF', '2NF', '3NF', 'BCNF', 'None'], a: 2, x: 'Transitive dependency (non-key -> non-key) = 3NF violation. Chain: Emp->Dept->DeptLocation.' },
{ q: 'BCNF differs from 3NF in that it requires?', o: ['No partial dependency', 'Every determinant is a superkey', 'No transitive dependency', 'Atomic attributes', 'A primary key'], a: 1, x: 'BCNF = stricter: EVERY determinant must be a superkey. 3NF allows exceptions for prime attributes.' },
{ q: 'A table storing multiple phone numbers in one column violates?', o: ['1NF', '2NF', '3NF', 'BCNF', '4NF'], a: 0, x: 'Multi-valued attribute in a cell = no atomicity = 1NF violation. 1NF is about atomic values only.' },
{ q: 'Order the forms weakest to strongest?', o: ['1NF,2NF,3NF,BCNF', 'BCNF,3NF,2NF,1NF', '2NF,1NF,3NF,BCNF', '3NF,BCNF,2NF,1NF', '1NF,BCNF,3NF,2NF'], a: 0, x: 'Each higher form includes the lower: 1NF -> 2NF -> 3NF -> BCNF. Mnemonic: atomic -> no partial -> no transitive -> determinant=superkey.' },
],
// DBMS > keys
'p2-1-1': [
{ q: 'A table R(A,B,C) has A unique and B unique. How many candidate keys?', o: ['1', '2', '3', '4', '0'], a: 1, x: 'Each independently-unique attribute = its own candidate key -> 2. Primary is just the CHOSEN one.' },
{ q: 'A superkey differs from a candidate key in that a candidate key is?', o: ['Larger', 'Minimal superkey', 'Always composite', 'Foreign', 'Numeric only'], a: 1, x: 'Candidate key = MINIMAL superkey (no removable attributes). Any attribute added to a candidate key still yields a superkey.' },
{ q: 'A foreign key in table R must reference?', o: ['Any column', 'A candidate/primary key in another table', 'Only primary key of same table', 'An index', 'A unique index only'], a: 1, x: 'FK references a key (primary or candidate/unique) — maintaining referential integrity.' },
{ q: 'If every attribute in a table is part of some candidate key, the table is?', o: ['In BCNF automatically', 'All-key relation', 'Not normalised', 'In 1NF only', 'A weak entity'], a: 1, x: 'All-key relation — all attributes prime. Rare but asked as definition.' },
{ q: 'Maximum candidate keys possible in a 4-attribute table?', o: ['1', '4', '6', '11', '15'], a: 2, x: 'Candidate keys must be MINIMAL superkeys — no subset can contain another. Max = C(4,2) = 6 (all 2-attribute pairs, none nested). Standard result: C(n, floor(n/2)).' },
],
// DBMS > indexing B/B+ trees
'p2-1-2': [
{ q: 'Which data structure primarily implements indexes in relational databases?', o: ['Hash Table', 'AVL Tree', 'B-Tree', 'Red-Black Tree', 'Binary Search Tree'], a: 2, x: 'REAL Feb-2026 PYQ — B-Tree: disk-optimised, many keys per node, O(log n). THE recurring index question.' },
{ q: 'Millions of records on disk needing fast search + RANGE queries. Best index?', o: ['Hash Table', 'BST', 'B+ Tree', 'Stack', 'Queue'], a: 2, x: 'REAL Feb-2026 PYQ — B+ Tree: linked leaves give sequential range scans. Hash = point lookups only.' },
{ q: 'A firm swapped a BST index for a hash index; point lookups got faster but range queries slowed. Why?', o: ['Hash uses more RAM', 'Hash tables have no ordering', 'BST was cached better', 'Hashes rehash often', 'Disk pages misaligned'], a: 1, x: 'REAL Feb-2026 PYQ — hashing scatters keys; ranges need ordered traversal. Order is THE trade-off.' },
{ q: 'In a B+ tree, all actual data pointers live in?', o: ['Root', 'Internal nodes', 'Leaf nodes', 'Both root and leaves', 'Overflow pages'], a: 2, x: 'B+ tree: leaves hold data + are linked; internal nodes hold only routing keys. That link is what makes ranges fast.' },
{ q: 'A B-tree of order m can hold at most how many keys per node?', o: ['m', 'm-1', '2m', 'm/2', 'log m'], a: 1, x: 'Order m -> max m-1 keys, m children. Order/keys/children triple is definitional.' },
],
// DBMS > ACID / transactions
'p2-1-3': [
{ q: '"Either all operations of a transaction execute, or none do" describes?', o: ['Consistency', 'Atomicity', 'Isolation', 'Durability', 'Concurrency'], a: 1, x: 'All-or-nothing = Atomicity. ACID questions give the scenario, you name the property.' },
{ q: 'After a power failure, committed transactions must survive — which property?', o: ['Atomicity', 'Consistency', 'Isolation', 'Durability', 'Serializability'], a: 3, x: 'Durability = committed = permanent (write-ahead logging). Failure-recovery scenarios = durability.' },
{ q: 'Two concurrent transactions must not see each other\'s partial results — property?', o: ['Atomicity', 'Consistency', 'Isolation', 'Durability', 'Atomicity'], a: 2, x: 'Isolation — concurrent txns behave as if serial. Dirty-read problems = isolation-level questions.' },
{ q: 'A "dirty read" occurs when a transaction reads?', o: ['Committed data twice', 'Uncommitted data of another txn', 'Deleted rows', 'Its own writes', 'A locked table'], a: 1, x: 'Dirty read = reading uncommitted changes — the classic concurrency anomaly, fixed by Read Committed level.' },
{ q: 'Two transactions each hold a lock the other needs. This is?', o: ['Livelock', 'Deadlock', 'Starvation', 'Race condition', 'Phantom read'], a: 1, x: 'Circular wait = deadlock. Detection (wait-for graph) and prevention (ordering) are the follow-up facts.' },
],
// DBMS > ER to relations
'p2-1-4': [
{ q: 'In an ER diagram, a weak entity set requires?', o: ['A strong key', 'An identifying owner entity + partial key', 'No attributes', 'A surrogate key always', 'At least 3 attributes'], a: 1, x: 'Weak entity = partial key + owner entity\'s key. Double-rectangle notation.' },
{ q: 'A many-to-many relationship R between entities A and B maps to how many tables?', o: ['1', '2', '3', '4', '0'], a: 2, x: 'A, B, and R itself = 3 tables. M:N always needs a join/bridge table.' },
{ q: 'Double diamond in an ER diagram denotes?', o: ['Weak entity', 'Identifying relationship', 'Composite attribute', 'Multivalued attribute', 'Derived attribute'], a: 1, x: 'Double diamond = identifying relationship linking weak entity to owner. ER notation MCQs are pure recall.' },
{ q: 'A one-to-many relationship is usually implemented by?', o: ['A third table', 'FK on the "many" side', 'Two tables with mutual FKs', 'A view', 'A composite key'], a: 1, x: 'FK lives on the MANY side referencing the one. Placement of the FK is the classic question.' },
{ q: 'An attribute drawn with a dashed/double oval that is COMPUTED from another attribute is?', o: ['Multivalued', 'Derived', 'Composite', 'Key', 'Simple'], a: 1, x: 'Derived (e.g., age from DOB) = dashed oval; multivalued = double oval. The two ovals get swapped in traps.' },
],

// SQL > query output prediction
'p2-2-0': [
{ q: 'Table EMP(10 rows, SALARY all 5000). SELECT COUNT(*) vs COUNT(SALARY) vs COUNT(DISTINCT SALARY)?', o: ['10,10,10', '10,10,1', '10,1,1', '1,10,10', '10,10,0'], a: 1, x: 'COUNT(*) counts rows=10; COUNT(col)=10 non-null; DISTINCT collapses to 1. The trio is a repeat PYQ.' },
{ q: 'SELECT * FROM EMP WHERE SALARY = NULL returns?', o: ['All NULL-salary rows', '0 rows always', 'Error', 'All rows', 'One row'], a: 1, x: 'NULL comparisons need IS NULL — "= NULL" is never true. Guaranteed trap question.' },
{ q: 'EMP has 8 rows; query: SELECT * FROM EMP WHERE DEPT = "X" OR DEPT = "Y". If no such rows exist?', o: ['Error', 'Empty result set', 'NULL row', 'All 8 rows', 'Exception'], a: 1, x: 'No match = empty set, not an error — a common misconception they test.' },
{ q: 'SELECT 10/3 in standard SQL (integer division DB) returns?', o: ['3.33', '3', '4', '3.0', 'Error'], a: 1, x: 'Integer operands -> integer division = 3 in most engines (Postgres/MySQL strict mode). Know your engine\'s behaviour.' },
{ q: 'SELECT name FROM emp ORDER BY name DESC LIMIT 1 — returns?', o: ['First alphabetically', 'Last alphabetically', 'Random row', 'Longest name', 'Error'], a: 1, x: 'DESC + LIMIT 1 = the last value alphabetically. ORDER BY + LIMIT/TOP/FETCH FIRST combos are common.' },
],
// SQL > joins
'p2-2-1': [
{ q: 'EMP(8 rows) JOIN DEPT(3 rows) on matching dept_id; 5 employees match dept D1, 3 match none. INNER JOIN returns?', o: ['8 rows', '5 rows', '3 rows', '11 rows', '24 rows'], a: 1, x: 'INNER = only matches -> 5. Non-matching rows vanish. Predict the COUNT, not the content.' },
{ q: 'Same tables, LEFT JOIN from EMP to DEPT returns?', o: ['5', '8', '3', '11', 'Depends'], a: 1, x: 'LEFT keeps ALL left rows -> 8 (3 with NULL dept columns). LEFT JOIN count = left table count (or more if fan-out).' },
{ q: 'A join producing every row of A paired with every row of B is?', o: ['INNER JOIN', 'CROSS JOIN', 'LEFT JOIN', 'SELF JOIN', 'NATURAL JOIN'], a: 1, x: 'Cartesian product = CROSS JOIN. Missing join condition = accidental cross join.' },
{ q: 'Table E(emp, mgr_id) joined to itself to get manager names — this is?', o: ['Cross join', 'Self join', 'Natural join', 'Outer join', 'Equi join'], a: 1, x: 'Self join with aliases (E1 JOIN E2 ON E1.mgr_id = E2.emp_id) — the employee-manager pattern is the standard example.' },
{ q: 'NATURAL JOIN differs from equi-join in that it?', o: ['Needs ON clause', 'Auto-joins same-named columns', 'Produces cartesian', 'Is always outer', 'Requires aliases'], a: 1, x: 'NATURAL joins on ALL common column names automatically — dangerous if names collide unintentionally.' },
],
// SQL > aggregates + GROUP BY/HAVING
'p2-2-2': [
{ q: 'SELECT dept, COUNT(*) FROM emp GROUP BY dept — this returns?', o: ['Total employees', 'One row per dept with its count', 'Dept names only', 'Error', 'One row'], a: 1, x: 'GROUP BY buckets rows -> one output row per group. Non-aggregated columns in SELECT must be grouped.' },
{ q: 'WHERE vs HAVING: which filters groups AFTER aggregation?', o: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY', 'DISTINCT'], a: 1, x: 'WHERE filters rows BEFORE grouping; HAVING filters groups AFTER. Order: FROM->WHERE->GROUP->HAVING->SELECT->ORDER.' },
{ q: 'SELECT dept, AVG(sal) FROM emp GROUP BY dept HAVING AVG(sal) > 50000 — correct because?', o: ['AVG allowed in WHERE', 'HAVING evaluates aggregates', 'GROUP BY computes it', 'ORDER matters', 'Both WHERE and HAVING same'], a: 1, x: 'Aggregates belong in HAVING, not WHERE — the single most-asked SQL rule.' },
{ q: 'SUM(salary) where 2 of 10 rows have NULL salary — SUM includes?', o: ['Error', 'All 10 rows as 0', 'Only 8 non-null values', 'Returns NULL', 'Average instead'], a: 2, x: 'Aggregates IGNORE NULLs silently (except COUNT(*)). NULL-handling is the aggregate trap family.' },
{ q: 'MAX(marks) = 95 and MIN(marks) = 40 in one SELECT — valid?', o: ['No, one aggregate per query', 'Yes, multiple aggregates allowed', 'Only with GROUP BY', 'Only with HAVING', 'Syntax error'], a: 1, x: 'Multiple aggregates in one SELECT are perfectly legal.' },
],
// SQL > set ops
'p2-2-3': [
{ q: 'Query A returns {1,2,3}, B returns {3,4}. A UNION B = ?', o: ['{1,2,3,4}', '{1,2,3,3,4}', '{3}', '{1,2,4}', 'Error'], a: 0, x: 'UNION dedupes -> 4 rows. UNION ALL keeps the duplicate 3. Union-vs-union-all dedup is THE set-op question.' },
{ q: 'Same sets: A UNION ALL B returns how many rows?', o: ['4', '5', '6', '3', '2'], a: 1, x: '3 + 2 = 5 rows — UNION ALL concatenates without dedup (also faster, no sort needed).' },
{ q: 'A INTERSECT B on {1,2,3} and {3,4} = ?', o: ['{1,2,3,4}', '{3}', '{1,2}', '{4}', 'Empty'], a: 1, x: 'Common to both = {3}.' },
{ q: 'A EXCEPT B on {1,2,3} minus {3,4} = ?', o: ['{1,2}', '{4}', '{3}', '{1,2,3,4}', 'Empty'], a: 0, x: 'In A but not B = {1,2}. EXCEPT is directional — A EXCEPT B differs from B EXCEPT A.' },
{ q: 'For UNION/INTERSECT/EXCEPT to work, the two queries must have?', o: ['Same table', 'Same number & compatible types of columns', 'Same row count', 'Same column names', 'No NULLs'], a: 1, x: 'Column count + type compatibility required; names need NOT match.' },
],
// SQL > subqueries / IN vs EXISTS
'p2-2-4': [
{ q: 'WHERE dept_id IN (SELECT dept_id FROM dept WHERE loc="Mumbai") — the inner query runs?', o: ['Once', 'Per outer row', 'Per column', 'Twice', 'Never'], a: 0, x: 'Non-correlated subquery = evaluated once; correlated = once per outer row. The inner-references-outer test decides it.' },
{ q: 'IN vs EXISTS: which is safer when the subquery column can contain NULL?', o: ['IN', 'EXISTS', 'Both same', 'NOT IN', 'ANY'], a: 1, x: 'NOT IN with a NULL in the list returns EMPTY — the famous NULL foot-gun. EXISTS is NULL-safe.' },
{ q: 'A correlated subquery differs because it?', o: ['Runs faster', 'References outer query columns', 'Uses joins', 'Returns one row', 'Cannot use IN'], a: 1, x: 'Correlated = inner query mentions outer table -> evaluated per outer row.' },
{ q: 'SELECT * FROM emp WHERE sal > ALL(SELECT sal FROM emp WHERE dept="IT") means sal is?', o: ['Above average', 'Above the maximum in IT', 'Above the minimum in IT', 'Equal to any IT sal', 'Above total'], a: 1, x: '> ALL = greater than every value = greater than the max. ANY/SOME = greater than min.' },
{ q: 'Subquery in SELECT clause (SELECT name, (SELECT AVG(sal) FROM emp) ...) returns?', o: ['Error always', 'Scalar value per row', 'Multiple columns', 'A table', 'NULL'], a: 1, x: 'Scalar subqueries in SELECT must return exactly one value — a legal, tested pattern.' },
],
// SQL > DDL/DML/TCL classify
'p2-2-5': [
{ q: 'Which is a DDL command?', o: ['INSERT', 'UPDATE', 'ALTER', 'SELECT', 'GRANT'], a: 2, x: 'DDL = structure (CREATE/ALTER/DROP/TRUNCATE); DML = data (INSERT/UPDATE/DELETE/SELECT); TCL = COMMIT/ROLLBACK; DCL = GRANT/REVOKE.' },
{ q: 'DELETE vs TRUNCATE: which can be rolled back (in most DBs)?', o: ['TRUNCATE', 'DELETE', 'Both', 'Neither', 'Depends on table size'], a: 1, x: 'DELETE is logged DML -> rollback-able; TRUNCATE is DDL -> typically not (and resets identity).' },
{ q: 'TRUNCATE differs from DELETE also because TRUNCATE?', o: ['Has WHERE clause', 'Removes all rows + resets counters', 'Is slower', 'Fires triggers', 'Keeps structure only sometimes'], a: 1, x: 'No WHERE (all rows), resets auto-increment, faster — the full contrast list is the tested set.' },
{ q: 'GRANT and REVOKE belong to?', o: ['DDL', 'DML', 'TCL', 'DCL', 'DQL'], a: 3, x: 'DCL = Data Control Language — permission commands.' },
{ q: 'COMMIT, ROLLBACK, SAVEPOINT are?', o: ['DDL', 'DML', 'TCL', 'DCL', 'DQL'], a: 2, x: 'TCL = transaction control. The 4-way language classification table is a guaranteed 1-mark recall.' },
],
// Data Analytics > pandas output
'p2-3-0': [
{ q: 'df = pd.DataFrame({"a":[1,2,3],"b":[4,5,6]}). df.loc[1,"b"] returns?', o: ['2', '4', '5', '6', 'Error'], a: 2, x: 'loc = label-based row,col -> row 1, col "b" = 5. loc vs iloc (position) is the #1 pandas question.' },
{ q: 'df.iloc[0:2] on a 3-row DataFrame returns?', o: ['Rows 0,1,2', 'Rows 0,1', 'Row 0 only', 'Error', 'Rows 1,2'], a: 1, x: 'iloc slicing is Python-exclusive: 0:2 = rows 0,1 (stop excluded). loc INCLUDES both ends — the classic contrast.' },
{ q: 'df.groupby("dept")["sal"].mean() produces?', o: ['A scalar', 'One mean per dept (Series)', 'A DataFrame of all columns', 'Total sum', 'Error'], a: 1, x: 'groupby + single-column aggregate = Series indexed by dept. Predict the OUTPUT SHAPE.' },
{ q: 'df[df["age"] > 30] returns?', o: ['Ages > 30 only', 'Rows where age > 30 (all columns)', 'Count', 'Boolean Series only', 'Error'], a: 1, x: 'Boolean mask -> filtered DataFrame with all columns. Mask-filtering is the most common pandas idiom.' },
{ q: 'pd.merge(df1, df2, on="id", how="left") keeps?', o: ['All df2 rows', 'All df1 rows', 'Only matches', 'Cartesian', 'Union of both'], a: 1, x: 'how="left" = keep all left rows — same semantics as SQL LEFT JOIN. Map pandas args to SQL concepts.' },
],
// Data Analytics > python data structures
'p2-3-1': [
{ q: 'person = {"name":"John","age":30}; a = json.dumps(person). json.dumps() returns?', o: ['file', 'string', 'byte', 'dict', 'int'], a: 1, x: 'REAL Feb-2026 PYQ — dumps() = "dump to string" -> JSON string. dumps vs dump (to file) is the trap pair.' },
{ q: '{1,2,2,3} evaluates to?', o: ['{1,2,2,3}', '{1,2,3}', 'Error', '[1,2,3]', '(1,2,3)'], a: 1, x: 'Sets deduplicate on creation -> {1,2,3}. Duplicate-collapse is the standard set question.' },
{ q: 'd = {"a":1}; d["b"] raises?', o: ['None', 'KeyError', 'ValueError', '0', 'IndexError'], a: 1, x: 'Missing dict key = KeyError (d.get("b") returns None instead — the safe-access pair).' },
{ q: 'list("abc") produces?', o: ['["abc"]', '["a","b","c"]', '("a","b","c")', 'Error', '"abc"'], a: 1, x: 'list() on a string splits into characters. Iterables -> list element-wise.' },
{ q: 'x = [1,2]*2 produces?', o: ['[2,4]', '[1,2,1,2]', '[1,4]', 'Error', '[1,2,2]'], a: 1, x: 'List * int = repetition, not multiplication. Same trap as "5"+"3" -> "53".' },
],
// Data Analytics > regex
'p2-3-2': [
{ q: 're.findall(r"\\d+", "a1b22c333") returns?', o: ['["1","22","333"]', '["a1","b22","c333"]', '["123"]', '["1","2","3"]', '["333"]'], a: 0, x: '\\d+ = maximal digit runs -> "1","22","333". + is greedy: takes the longest run per match.' },
{ q: 'Pattern r"^SE" matches in "SEBI rules"?', o: ['No', 'Yes — at string start', 'Only mid-string', 'Error', 'Twice'], a: 1, x: '^ anchors to string start. Anchor symbols (^ $) are the most-asked regex tokens.' },
{ q: 'r"\\w+@" on "user@mail.com" captures?', o: ['user', 'user@', '@', 'mail', 'user@mail'], a: 1, x: '\\w+ = word chars greedy -> "user@". Know the tokens: \\d digit, \\w word, \\s space.' },
{ q: 're.sub(r"\\d", "#", "a1b2") returns?', o: ['a#b#', 'a1b2', '##ab', 'a2b1', 'Error'], a: 0, x: 'sub replaces each single digit -> a#b#. sub vs findall vs match = know which does what.' },
{ q: 'Pattern r"a.*b" on "aXbYb" matches?', o: ['aXb', 'aXbYb', 'ab', 'aYb', 'No match'], a: 1, x: '.* is greedy -> grabs longest possible = aXbYb. Greedy vs non-greedy (.*?) is the subtle trap.' },
],
// Data Analytics > file handling
'p2-3-3': [
{ q: 'open("f.txt","r") — "r" mode means?', o: ['Write', 'Read (error if missing)', 'Append', 'Read+write', 'Create new'], a: 1, x: 'r = read, fails if absent; w = write+truncate; a = append; r+ = read+write. The mode table is guaranteed.' },
{ q: 'f.read() vs f.readlines(): readlines returns?', o: ['One string', 'List of lines', 'Bytes', 'First line', 'Dict'], a: 1, x: 'readlines() = list of line-strings; read() = whole file as one string; readline() = next line.' },
{ q: 'Opening with "w" mode on an EXISTING file does what?', o: ['Appends', 'Truncates then writes', 'Errors', 'Reads', 'Backs up'], a: 1, x: 'w truncates to zero immediately — the dangerous-mode fact always asked.' },
{ q: 'with open("f.txt") as f: — the "with" block mainly ensures?', o: ['Faster reads', 'File auto-closes', 'Encoding fixed', 'Locking', 'Buffering off'], a: 1, x: 'Context manager closes the file even on exceptions — the "with" purpose is a favourite concept Q.' },
{ q: 'To read a CSV into pandas?', o: ['pd.open_csv', 'pd.read_csv', 'pd.load_csv', 'csv.read', 'pd.read_excel'], a: 1, x: 'pd.read_csv — function-name recall across pandas I/O (read_excel, to_csv, read_json).' },
],
// Data Analytics > data-mining defs
'p2-3-4': [
{ q: 'Grouping customers by spending behaviour WITHOUT predefined labels is?', o: ['Classification', 'Clustering', 'Regression', 'Association', 'Prediction'], a: 1, x: 'No labels = unsupervised = clustering. Labeled = classification. The supervised/unsupervised line is THE question.' },
{ q: 'Predicting a stock PRICE (continuous value) is which task?', o: ['Classification', 'Clustering', 'Regression', 'Association', 'Ranking'], a: 2, x: 'Continuous output = regression; category output = classification. Output type decides the task.' },
{ q: '"Customers who buy X also buy Y" rules come from?', o: ['Regression', 'Clustering', 'Association rule mining', 'Classification', 'Anomaly detection'], a: 2, x: 'Market-basket = association rules (support/confidence/lift — the three metrics to know).' },
{ q: 'k-means is an example of?', o: ['Classification', 'Clustering', 'Regression', 'Association', 'Reinforcement'], a: 1, x: 'k-means = partition clustering — algorithm-to-task mapping questions.' },
{ q: 'Data cleaning primarily deals with?', o: ['Model training', 'Missing/inconsistent/duplicate data', 'Visualization', 'Indexing', 'Encryption'], a: 1, x: 'Cleaning = handling missing values, dupes, inconsistencies — the definition-level fact.' },
],

// Algorithms > complexity identification
'p2-4-0': [
{ q: 'Binary search on a sorted array of n elements takes?', o: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)', 'O(n^2)'], a: 1, x: 'Halving each step = log n. Halving = log; full scan = n; nested loops = n^2. Map structure to complexity.' },
{ q: 'Two nested loops each running n times = complexity?', o: ['O(n)', 'O(log n)', 'O(n^2)', 'O(2^n)', 'O(n log n)'], a: 2, x: 'n x n = n^2. Multiply loop bounds when nested.' },
{ q: 'Merge sort worst-case complexity?', o: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)', 'O(n^3)'], a: 1, x: 'Merge = always n log n (best/avg/worst same). QuickSort degenerates to n^2 — that pair is the trap.' },
{ q: 'QuickSort worst case occurs when?', o: ['Array sorted + bad pivot picks', 'Random order', 'All equal only', 'Reverse only', 'Small n'], a: 0, x: 'Already-sorted + first/last-element pivot = n^2. Median pivot avoids it.' },
{ q: 'Accessing an array element by index takes?', o: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)', 'O(n^2)'], a: 2, x: 'Direct address computation = O(1). Linked list = O(n) — the array-vs-list contrast.' },
],
// Algorithms > sort pass-by-pass
'p2-4-1': [
{ q: 'Bubble sort after ONE pass on [5,1,4,2] gives?', o: ['[1,4,2,5]', '[1,2,4,5]', '[5,1,2,4]', '[4,1,2,5]', '[1,5,4,2]'], a: 0, x: 'Each pass bubbles the max to the end: 5 swaps down -> [1,4,2,5]. Pass-by-pass = simulate mechanically.' },
{ q: 'Selection sort first pass on [5,1,4,2] gives?', o: ['[1,5,4,2]', '[1,4,5,2]', '[1,2,4,5]', '[5,1,2,4]', '[2,1,4,5]'], a: 0, x: 'Selection finds the MIN and swaps it to the front: min=1 -> [1,5,4,2]. Min-to-front vs bubble max-to-end.' },
{ q: 'Insertion sort on [5,1,4,2]: after inserting the second element, array is?', o: ['[1,5,4,2]', '[1,4,5,2]', '[1,2,4,5]', '[5,1,4,2]', '[2,5,4,1]'], a: 0, x: 'Insertion slides 1 into sorted prefix [5] -> [1,5,4,2].' },
{ q: 'Which sort is stable by default?', o: ['QuickSort', 'HeapSort', 'MergeSort', 'SelectionSort', 'Shell sort'], a: 2, x: 'Merge sort preserves equal-element order; quick/heap/selection don\'t. Stability is a repeat definition.' },
{ q: 'Best sort for a nearly-sorted array?', o: ['QuickSort', 'InsertionSort', 'HeapSort', 'MergeSort', 'SelectionSort'], a: 1, x: 'Insertion sort = O(n) on nearly-sorted input — adaptive-sorts fact.' },
],
// Algorithms > traversal output
'p2-4-2': [
{ q: 'Tree: root A, left child B, right child C. INORDER traversal = ?', o: ['A,B,C', 'B,A,C', 'B,C,A', 'C,A,B', 'A,C,B'], a: 1, x: 'Inorder = Left-Root-Right = B,A,C. LNR/NRL/LRN ordering is the mechanical rule.' },
{ q: 'Same tree: PREORDER = ?', o: ['A,B,C', 'B,A,C', 'C,B,A', 'B,C,A', 'A,C,B'], a: 0, x: 'Preorder = Root-Left-Right = A,B,C. Root FIRST = pre; root LAST = post; root MIDDLE = in.' },
{ q: 'Same tree: POSTORDER = ?', o: ['A,B,C', 'B,A,C', 'B,C,A', 'C,A,B', 'A,C,B'], a: 2, x: 'Postorder = Left-Right-Root = B,C,A.' },
{ q: 'Inorder traversal of a BST always produces?', o: ['Random order', 'Sorted order', 'Level order', 'Reverse sorted', 'Heap order'], a: 1, x: 'BST inorder = ascending sorted — a guaranteed 1-marker every cycle.' },
{ q: 'BFS traversal uses which data structure?', o: ['Stack', 'Queue', 'Heap', 'Tree', 'Hash'], a: 1, x: 'BFS = queue (level by level); DFS = stack/recursion. DS-mapping questions are pure recall.' },
],
// Algorithms > which algorithm?
'p2-4-3': [
{ q: 'Shortest path in a weighted graph with non-negative edges?', o: ['BFS', 'Dijkstra', 'DFS', 'Kruskal', 'Prim'], a: 1, x: 'Dijkstra = single-source shortest path, non-negative weights. Negative edges -> Bellman-Ford. Map problem -> algo.' },
{ q: 'Minimum spanning tree: which algo adds cheapest edges avoiding cycles?', o: ['Dijkstra', 'Kruskal', 'Prim', 'Floyd', 'DFS'], a: 1, x: 'Kruskal = sort all edges, add if no cycle (uses union-find). Prim grows from a vertex instead.' },
{ q: 'All-pairs shortest paths uses?', o: ['Dijkstra x n', 'Floyd-Warshall', 'Bellman-Ford only', 'Kruskal', 'Prim'], a: 1, x: 'Floyd-Warshall = all-pairs DP — the named-algo-to-purpose map.' },
{ q: 'Matrix multiplication in O(n^2.81) instead of n^3 uses?', o: ['Strassen\'s algorithm', 'Karatsuba', 'Floyd\'s', 'Dijkstra\'s', 'Gauss elimination'], a: 0, x: 'Strassen = divide & conquer matrix mult — appeared in Phase-2 memory Qs.' },
{ q: 'Detecting a cycle in a linked list uses?', o: ['Two pointers (Floyd\'s)', 'Binary search', 'Hash array', 'Sorting', 'BFS'], a: 0, x: 'Floyd\'s tortoise-hare: slow + fast pointer meet = cycle. Named-trick questions recur.' },
],
// Algorithms > paradigm classify
'p2-4-4': [
{ q: 'Merge sort and QuickSort exemplify which paradigm?', o: ['Greedy', 'Divide and Conquer', 'DP', 'Backtracking', 'Brute force'], a: 1, x: 'Split -> solve -> combine = D&C. Identify by structure: overlapping subproblems = DP; local-optimal picks = greedy.' },
{ q: 'Fibonacci via memoization/table is?', o: ['Greedy', 'Divide & Conquer', 'Dynamic Programming', 'Backtracking', 'Recursion only'], a: 2, x: 'Overlapping subproblems + caching = DP. Real Phase-2 Q asked "Nth Fibonacci via DP".' },
{ q: 'Choosing the locally-best option at each step (activity selection, Huffman) = ?', o: ['DP', 'Greedy', 'D&C', 'Backtracking', 'Branch & bound'], a: 1, x: 'Greedy = local optimum, no backtracking. Kruskal/Prim/Dijkstra are greedy too — map algos to paradigms.' },
{ q: 'N-Queens problem is solved classically by?', o: ['Greedy', 'DP', 'Backtracking', 'D&C', 'Sorting'], a: 2, x: 'Try -> fail -> undo = backtracking. Sudoku/N-Queens/graph-colouring = the backtracking family.' },
{ q: 'Dijkstra and Kruskal both belong to which paradigm?', o: ['DP', 'Greedy', 'D&C', 'Backtracking', 'Randomized'], a: 1, x: 'Both pick the cheapest next step = greedy. Multi-algo classification questions appear in Phase 2.' },
],

// Networks > OSI layer mapping
'p2-5-0': [
{ q: 'Routing of packets between networks happens at which OSI layer?', o: ['Data Link', 'Network', 'Transport', 'Session', 'Application'], a: 1, x: 'Routing = Layer 3 (Network). Memorise the 7-layer ladder + one job each.' },
{ q: 'Encryption/decryption and data compression belong to which layer?', o: ['Application', 'Presentation', 'Session', 'Transport', 'Network'], a: 1, x: 'Presentation (L6) = translation, encryption, compression — the most-forgotten middle layer.' },
{ q: 'Framing and MAC addressing happen at?', o: ['Physical', 'Data Link', 'Network', 'Transport', 'Session'], a: 1, x: 'Data Link (L2) = frames, MAC, switches. Media-access = L2.' },
{ q: 'Which layer provides end-to-end reliability and segmentation?', o: ['Network', 'Transport', 'Session', 'Data Link', 'Application'], a: 1, x: 'Transport (L4) = TCP/UDP, ports, segmentation, retransmission.' },
{ q: 'The 7 OSI layers bottom-to-top are?', o: ['PHY-DLL-NET-TRANS-SESS-PRES-APP', 'PHY-NET-DLL-TRANS-SESS-PRES-APP', 'DLL-PHY-NET-TRANS-PRES-SESS-APP', 'PHY-DLL-TRANS-NET-SESS-APP-PRES', 'APP-PRES-SESS-TRANS-NET-DLL-PHY'], a: 0, x: '"Please Do Not Throw Sausage Pizza Away" — Physical, Data Link, Network, Transport, Session, Presentation, Application.' },
],
// Networks > TCP vs UDP
'p2-5-1': [
{ q: 'Video streaming where speed matters more than perfect delivery uses?', o: ['TCP', 'UDP', 'ICMP', 'ARP', 'SMTP'], a: 1, x: 'UDP = connectionless, fast, no retransmit — streaming/DNS/VoIP. TCP = reliable, ordered.' },
{ q: 'TCP establishes connection via?', o: ['2-way handshake', '3-way handshake (SYN,SYN-ACK,ACK)', '4-way handshake', 'Broadcast', 'Beacon frames'], a: 1, x: 'SYN -> SYN-ACK -> ACK = the handshake triple every exam asks.' },
{ q: 'Which is TRUE about UDP?', o: ['Connection-oriented', 'Guaranteed delivery', 'Connectionless, no guarantee', 'Slower than TCP', 'Uses handshakes'], a: 2, x: 'UDP = fire-and-forget. Invert properties to spot the planted false statement.' },
{ q: 'HTTP web traffic runs over?', o: ['UDP', 'TCP', 'ICMP', 'ARP', 'FTP'], a: 1, x: 'HTTP/HTTPS/SMTP/FTP = TCP-based (reliability needed). DNS = both; streaming = UDP.' },
{ q: 'Ordered, retransmitted, flow-controlled delivery is provided by?', o: ['UDP', 'TCP', 'IP', 'Ethernet', 'ICMP'], a: 1, x: 'TCP — the three features (order, retransmit, flow control) is the definition triad.' },
],
// Networks > protocol-port/purpose
'p2-5-2': [
{ q: 'HTTP uses which port?', o: ['21', '25', '53', '80', '443'], a: 3, x: 'HTTP=80, HTTPS=443 — port numbers are pure recall, make the table once.' },
{ q: 'DNS resolves?', o: ['MAC to IP', 'Domain names to IP', 'IP to MAC', 'Ports to services', 'Email addresses'], a: 1, x: 'Domain -> IP on port 53 (UDP mostly, TCP for zone transfers).' },
{ q: 'Sending email uses which protocol?', o: ['POP3', 'IMAP', 'SMTP', 'SNMP', 'FTP'], a: 2, x: 'SMTP SENDS (port 25/587); POP3/IMAP RECEIVE. Send vs receive is the classic swap.' },
{ q: 'FTP uses which port for control?', o: ['20', '21', '22', '23', '25'], a: 1, x: 'FTP: 21 control, 20 data. SSH=22, Telnet=23 — the neighbouring ports get swapped in options.' },
{ q: 'HTTPS encrypts web traffic via?', o: ['IPsec', 'TLS/SSL', 'SSH', 'PGP', 'WPA'], a: 1, x: 'TLS (formerly SSL) on port 443 — protocol-to-security-layer mapping.' },
],
// Networks > device-layer
'p2-5-3': [
{ q: 'A switch operates primarily at which layer?', o: ['Physical', 'Data Link', 'Network', 'Transport', 'Application'], a: 1, x: 'Switch = L2 (MAC-based); router = L3 (IP); hub = L1 (dumb repeater). The device-layer table is guaranteed.' },
{ q: 'A router works at which layer?', o: ['Data Link', 'Network', 'Physical', 'Transport', 'Session'], a: 1, x: 'Router = L3 — routes packets between networks using IP addresses.' },
{ q: 'A device that regenerates signals without any addressing is?', o: ['Switch', 'Router', 'Repeater/Hub', 'Bridge', 'Gateway'], a: 2, x: 'Repeater/hub = L1, just amplifies/forwards bits — no intelligence.' },
{ q: 'A device translating between DIFFERENT protocols/architectures is?', o: ['Router', 'Switch', 'Hub', 'Gateway', 'Repeater'], a: 3, x: 'Gateway = protocol translator (can work up to L7) — the outlier device always asked.' },
{ q: 'A bridge connects?', o: ['Two LAN segments at L2', 'WAN to internet', 'Analog to digital', 'L3 subnets', 'VPN tunnels'], a: 0, x: 'Bridge = L2, joins/filter LAN segments by MAC — the older sibling of the switch.' },
],
// Networks > IP basics
'p2-5-4': [
{ q: 'IP address 192.168.1.5 belongs to class?', o: ['A', 'B', 'C', 'D', 'Private-exempt'], a: 2, x: '192-223 = Class C. Ranges: A 1-126, B 128-191, C 192-223. First octet decides.' },
{ q: 'Which is a private IP range?', o: ['8.8.8.0/24', '10.0.0.0/8', '172.32.0.0/16', '192.169.0.0/16', '1.1.1.0/24'], a: 1, x: 'Private: 10.x.x.x, 172.16-31.x.x, 192.168.x.x. 172.32 is PUBLIC — the off-by-one trap.' },
{ q: 'IPv4 addresses are how many bits?', o: ['16', '32', '64', '128', '48'], a: 1, x: 'IPv4 = 32-bit (4 octets); IPv6 = 128-bit; MAC = 48-bit. The size trio.' },
{ q: 'Subnet mask 255.255.255.0 corresponds to prefix?', o: ['/8', '/16', '/24', '/32', '/20'], a: 2, x: 'Three 255 octets = 24 bits = /24. Mask-to-CIDR conversion.' },
{ q: 'Loopback address for testing the local machine?', o: ['0.0.0.0', '127.0.0.1', '192.168.1.1', '255.255.255.255', '8.8.8.8'], a: 1, x: '127.0.0.1 = localhost loopback — never leaves the machine.' },
],
// InfoSec > attack identification
'p2-6-0': [
{ q: 'An email pretending to be your bank asks you to "verify" credentials via a link. This is?', o: ['Phishing', 'MITM', 'DDoS', 'Ransomware', 'SQL injection'], a: 0, x: 'Fake identity + credential harvest = phishing. Scenario -> attack-name is the dominant InfoSec pattern.' },
{ q: 'An attacker secretly relays/alter messages between two parties who think they talk directly?', o: ['Phishing', 'Man-in-the-middle', 'Brute force', 'Spoofing only', 'Sniffing only'], a: 1, x: 'MITM = interception between parties. Sniffing is passive listening; MITM is active relay — the subtle pair.' },
{ q: 'Flooding a server with traffic from many compromised machines to make it unavailable?', o: ['DoS', 'DDoS', 'MITM', 'Phishing', 'Trojan'], a: 1, x: 'Many sources + availability attack = Distributed DoS. CIA target: Availability.' },
{ q: 'Inputting "\' OR 1=1 --" into a login form targets which vulnerability?', o: ['XSS', 'SQL injection', 'CSRF', 'Buffer overflow', 'DDoS'], a: 1, x: 'Classic SQLi string — recognises payloads too, not just names. Web vulns: SQLi (DB), XSS (scripts), CSRF (forged requests).' },
{ q: 'Malware that encrypts victim files demanding payment?', o: ['Spyware', 'Ransomware', 'Adware', 'Rootkit', 'Worm'], a: 1, x: 'Ransomware — the malware taxonomy: virus (needs host), worm (self-spreads), trojan (disguised), ransomware (encrypts).' },
],
// InfoSec > CIA triad
'p2-6-1': [
{ q: 'Preventing unauthorised access to data protects which CIA property?', o: ['Integrity', 'Confidentiality', 'Availability', 'Authenticity', 'Non-repudiation'], a: 1, x: 'Access secrecy = Confidentiality. Map control -> property.' },
{ q: 'Checksums and hashes ensure data was not tampered with — which property?', o: ['Confidentiality', 'Integrity', 'Availability', 'Authentication', 'Authorisation'], a: 1, x: 'Tamper-detection = Integrity. Hash/checksum/signature questions route here.' },
{ q: 'Backups, redundancy and DDoS protection serve which property?', o: ['Confidentiality', 'Integrity', 'Availability', 'Authenticity', 'Privacy'], a: 2, x: 'System up + data reachable = Availability.' },
{ q: 'A digital signature primarily provides?', o: ['Confidentiality only', 'Authenticity + integrity + non-repudiation', 'Availability', 'Anonymity', 'Compression'], a: 1, x: 'Signature = proves sender (authenticity), content unchanged (integrity), can\'t deny (non-repudiation). NOT confidentiality — the trap.' },
{ q: 'CIA in security stands for?', o: ['Control-Integrity-Access', 'Confidentiality-Integrity-Availability', 'Certified-Information-Assurance', 'Cyber-Identity-Access', 'Compliance-Integrity-Audit'], a: 1, x: 'The triad itself is a freebie question — expand + map, both asked.' },
],
// InfoSec > crypto basics
'p2-6-2': [
{ q: 'Same key encrypts and decrypts — this is?', o: ['Asymmetric', 'Symmetric', 'Hashing', 'Digital signature', 'PKI'], a: 1, x: 'One shared key = symmetric (AES, DES). Key-distribution problem is its weakness.' },
{ q: 'Public key encrypts, private key decrypts — property of?', o: ['Symmetric crypto', 'Asymmetric crypto', 'Hashing', 'Steganography', 'Encoding'], a: 1, x: 'Asymmetric (RSA) — public/private pair. For SIGNING it inverts: private signs, public verifies — know both directions.' },
{ q: 'AES is which type of cipher?', o: ['Asymmetric', 'Symmetric block cipher', 'Hash function', 'Stream-only', 'Key exchange'], a: 1, x: 'AES = symmetric block cipher; RSA = asymmetric; SHA = hash — the algo-to-type table.' },
{ q: 'Hashing differs from encryption because hashing is?', o: ['Reversible', 'One-way, no decryption', 'Slower always', 'Key-based', 'Weaker'], a: 1, x: 'Hash = one-way digest (SHA-256), you can\'t "decrypt" it — the concept trap vs encryption.' },
{ q: 'Which algorithm is used for key EXCHANGE rather than encryption?', o: ['AES', 'Diffie-Hellman', 'SHA-256', 'MD5', 'DES'], a: 1, x: 'Diffie-Hellman = key exchange protocol — purpose-mapping again.' },
],
// InfoSec > authentication
'p2-6-3': [
{ q: 'Password + OTP on phone = how many authentication factors?', o: ['1', '2', '3', '0', 'Depends on OTP'], a: 1, x: 'Knowledge (password) + possession (phone OTP) = 2FA. Count DISTINCT factor types, not steps.' },
{ q: 'Fingerprint scan uses which factor type?', o: ['Something you know', 'Something you have', 'Something you are', 'Somewhere you are', 'Something you do'], a: 2, x: 'Biometric = "something you are". The three-factor trio: know/have/are.' },
{ q: 'An ATM card + PIN is?', o: ['1FA', '2FA', '3FA', 'Not authentication', 'SSO'], a: 1, x: 'Card (have) + PIN (know) = textbook 2FA example.' },
{ q: 'Authentication vs authorisation: checking WHAT you can access is?', o: ['Authentication', 'Authorisation', 'Accounting', 'Auditing', 'Encryption'], a: 1, x: 'AuthN = who are you; AuthZ = what may you do. AAA trio: Authentication, Authorisation, Accounting.' },
{ q: 'Kerberos is primarily used for?', o: ['Encryption only', 'Network authentication', 'Antivirus', 'Firewalling', 'Backup'], a: 1, x: 'Kerberos = ticket-based network authentication — protocol-purpose mapping.' },
],
// InfoSec > controls/audit
'p2-6-4': [
{ q: 'A firewall that inspects packet contents beyond headers operates at?', o: ['Layer 1', 'Packet-filtering only', 'Application layer (stateful/deep inspection)', 'Physical', 'MAC layer'], a: 2, x: 'Deep packet inspection = application-layer/next-gen firewall — firewall-type questions.' },
{ q: 'IDS vs IPS: which one actively BLOCKS threats?', o: ['IDS', 'IPS', 'Both', 'Neither', 'Honeypot'], a: 1, x: 'IPS = inline prevention (blocks); IDS = detection+alert only. The S-pair distinction.' },
{ q: 'A decoy system designed to attract and study attackers is?', o: ['Firewall', 'Honeypot', 'Proxy', 'VPN', 'Bastion host'], a: 1, x: 'Honeypot = bait system — terminology recall.' },
{ q: 'The purpose of a security AUDIT is mainly to?', o: ['Encrypt data', 'Evaluate controls vs policy/compliance', 'Block attacks real-time', 'Backup systems', 'Patch software'], a: 1, x: 'Audit = assess compliance/effectiveness — "system audit" is in the official syllabus.' },
{ q: 'Least-privilege principle means users get?', o: ['Maximum access for ease', 'Only access needed for their job', 'Admin by default', 'Temporary root', 'Shared accounts'], a: 1, x: 'Minimum necessary access = least privilege — policy-principle question.' },
],

// DW > OLAP operations
'p2-7-0': [
{ q: 'Going from monthly sales to yearly sales in a cube is called?', o: ['Drill-down', 'Roll-up', 'Slice', 'Dice', 'Pivot'], a: 1, x: 'Roll-up = aggregate to coarser level (month->year). Drill-down = opposite. Direction is THE question.' },
{ q: 'Viewing data for ONE specific region across all products is?', o: ['Roll-up', 'Drill-down', 'Slice', 'Dice', 'Rotation'], a: 2, x: 'Slice = fix ONE dimension, see the rest. Dice = sub-cube on multiple dims. The slice/dice pair.' },
{ q: 'Selecting a sub-cube (Q1 only, North region only, Electronics only) is?', o: ['Slice', 'Dice', 'Roll-up', 'Drill-across', 'Pivot'], a: 1, x: 'Dice = multi-dimension filter -> sub-cube. One dim = slice, several = dice.' },
{ q: 'Breaking yearly sales down into quarters is?', o: ['Roll-up', 'Drill-down', 'Slice', 'Dice', 'Consolidation'], a: 1, x: 'Drill-down = finer granularity — the mirror of roll-up, both always tested together.' },
{ q: 'Rotating the cube to swap rows and columns is called?', o: ['Pivot/rotation', 'Slice', 'Dice', 'Roll-up', 'Drill'], a: 0, x: 'Pivot = reorient the axes — fifth OLAP op completes the set: roll-up, drill-down, slice, dice, pivot.' },
],
// DW > ETL steps
'p2-7-1': [
{ q: 'The correct ETL order is?', o: ['Extract-Transform-Load', 'Extract-Load-Transform', 'Transform-Extract-Load', 'Load-Extract-Transform', 'Transfer-Evaluate-Load'], a: 0, x: 'ETL = pull data -> clean/convert -> store in warehouse. ELT (load first, transform inside) is the modern variant they contrast.' },
{ q: 'Which ETL stage removes duplicates and standardises formats?', o: ['Extract', 'Transform', 'Load', 'Index', 'Mine'], a: 1, x: 'Transform = cleansing/dedup/mapping — stage-purpose mapping.' },
{ q: 'ETL differs from ELT mainly in?', o: ['Speed only', 'Where transformation happens', 'Data volume', 'Cost', 'Tools used'], a: 1, x: 'ETL transforms BEFORE loading (staging); ELT transforms inside the warehouse — placement question.' },
{ q: 'Staging area in ETL is used to?', o: ['Store final reports', 'Hold raw data before transform', 'Backup warehouse', 'Serve queries', 'Index cubes'], a: 1, x: 'Staging = intermediate landing zone between source and warehouse.' },
{ q: 'Incremental loading means loading?', o: ['All data every time', 'Only changed/new data since last load', 'Random samples', 'Aggregates only', 'Metadata'], a: 1, x: 'Full vs incremental load — the load-strategy pair.' },
],
// DW > schema types
'p2-7-2': [
{ q: 'A star schema has?', o: ['Normalised dimensions', 'Central fact + denormalised dimension tables', 'Only fact tables', 'Snowflake branches', 'No relationships'], a: 1, x: 'Star = one fact + flat dimensions (denormalised); snowflake normalises dimensions further. Central-fact visual.' },
{ q: 'Snowflake schema differs from star because dimensions are?', o: ['Removed', 'Normalised into sub-tables', 'Denormalised', 'Encrypted', 'Duplicated'], a: 1, x: 'Snowflake = normalised dims = more joins but less redundancy. The trade-off pair is the question.' },
{ q: 'A fact table typically stores?', o: ['Dimension descriptions', 'Numeric measures + foreign keys', 'Metadata', 'User info', 'Indexes'], a: 1, x: 'Facts = measurable numbers (sales amount, qty) + keys to dimensions — the fact/dimension split.' },
{ q: 'Which is an advantage of star over snowflake?', o: ['Less storage', 'Fewer joins = faster queries', 'More normalised', 'Better integrity', 'Smaller facts'], a: 1, x: 'Denormalised = fewer joins = faster reads — warehouses optimise reads, not writes (opposite of OLTP).' },
{ q: 'Dimension tables contain?', o: ['Measures', 'Descriptive attributes (who/what/where)', 'Aggregates', 'Logs', 'Indexes'], a: 1, x: 'Dims = the "by" fields: time, product, region — what you slice facts BY.' },
],
// DW > mart vs warehouse / metadata
'p2-7-3': [
{ q: 'A data mart is best described as?', o: ['A bigger warehouse', 'Subject/department-specific subset of a warehouse', 'A backup', 'A lake', 'An OLTP system'], a: 1, x: 'Mart = departmental slice (sales-only, finance-only) of the enterprise warehouse — scope distinction.' },
{ q: 'Data warehouse is characterised as?', o: ['Volatile, real-time', 'Subject-oriented, integrated, time-variant, non-volatile', 'OLTP-normalised', 'Flat files', 'Unstructured'], a: 1, x: 'Inmon\'s four properties — recite them: subject-oriented, integrated, time-variant, non-volatile.' },
{ q: 'OLAP vs OLTP: OLAP is optimised for?', o: ['Transactions', 'Analytics/complex read queries', 'Inserts', 'Point lookups', 'Locking'], a: 1, x: 'OLAP = analytical reads on history; OLTP = fast transactions. System-purpose contrast.' },
{ q: 'Metadata in a warehouse is?', o: ['The actual sales data', 'Data about data — structure, lineage, definitions', 'Indexes only', 'User logs', 'Backups'], a: 1, x: 'Metadata = data about data — definition question, appears in syllabus verbatim.' },
{ q: 'A "data lake" differs from a warehouse because a lake stores?', o: ['Only structured data', 'Raw structured+unstructured data', 'Only aggregates', 'Only metadata', 'Only logs'], a: 1, x: 'Lake = raw anything; warehouse = cleaned, structured, modelled — the modern contrast.' },
],

// Shell > command-purpose
'p2-8-0': [
{ q: 'Which command searches text patterns inside files?', o: ['ls', 'grep', 'chmod', 'pwd', 'cp'], a: 1, x: 'grep = pattern search. Command-purpose one-liners are the dominant shell pattern.' },
{ q: 'chmod 755 gives the file owner which permissions?', o: ['rw-', 'rwx', 'r-x', '---', 'r--'], a: 1, x: '755 = rwx r-x r-x — owner gets all three. Octal: 4=r 2=w 1=x.' },
{ q: 'ls -la shows?', o: ['Only filenames', 'All files incl. hidden, long format', 'Only directories', 'Disk usage', 'Processes'], a: 1, x: '-a includes dotfiles, -l = long listing — flag-combination questions.' },
{ q: 'Which command kills a process by PID?', o: ['stop', 'kill', 'end', 'halt', 'exit'], a: 1, x: 'kill <PID> (kill -9 forces). Process commands: ps, top, kill — the trio.' },
{ q: 'The pipe symbol | does what?', o: ['Writes to file', 'Sends one command\'s output to another\'s input', 'Runs in background', 'Comments', 'Loops'], a: 1, x: 'Pipe chains stdout -> stdin. | vs > (redirect) vs >> (append) vs & (background).' },
],
// Shell > permissions
'p2-8-1': [
{ q: 'chmod 644 means?', o: ['rwx rw- r--', 'rw- r-- r--', 'rwx r-x r-x', 'rw- rw- r--', 'r-- r-- r--'], a: 1, x: '6=rw, 4=r, 4=r -> rw-r--r--. Decode each digit: 7=rwx, 6=rw-, 5=r-x, 4=r--.' },
{ q: 'To make a script executable: chmod ___ script.sh?', o: ['+x', '-w', '777', '+r', '000'], a: 0, x: 'chmod +x adds execute bit — the script-execution one-liner.' },
{ q: 'chmod 777 gives?', o: ['Owner only', 'Everyone everything', 'Read-only all', 'Execute only', 'Nothing'], a: 1, x: '777 = rwxrwxrwx — full perms to all (a security smell, often the "what\'s wrong" question).' },
{ q: 'Which letter in rwx stands for execute?', o: ['r', 'w', 'x', 'e', 's'], a: 2, x: 'r=read w=write x=execute — plus the octal values 4/2/1.' },
{ q: 'chown command is used to?', o: ['Change permissions', 'Change owner/group', 'Change directory', 'Check owner', 'Chain files'], a: 1, x: 'chown = ownership; chmod = permissions — the pair gets swapped in options.' },
],
// Shell > script syntax
'p2-8-2': [
{ q: '#!/bin/bash at a script\'s top is called?', o: ['Comment', 'Shebang — declares the interpreter', 'Header', 'Variable', 'Import'], a: 1, x: 'Shebang/hashbang tells the OS which interpreter to run it with.' },
{ q: '$1 inside a script refers to?', o: ['First line', 'First argument', 'PID', 'Exit code', 'Script name'], a: 1, x: '$1,$2... = positional args; $0 = script name; $? = last exit code; $# = arg count — the $-variable set.' },
{ q: 'To print variable x\'s VALUE in bash?', o: ['echo x', 'echo $x', 'print x', 'echo %x', 'echo #x'], a: 1, x: '$x dereferences — assignment is x=5 (no $!), use is $x. The $ asymmetry trips everyone.' },
{ q: 'Correct if-statement syntax?', o: ['if (x>5) then', 'if [ $x -gt 5 ]; then', 'if x>5 {', 'when x gt 5', 'if $x > 5 fi'], a: 1, x: '[ ... ] test syntax with -gt/-eq/-lt numeric operators; ends with fi. String vs numeric compare = the subtle trap.' },
{ q: 'for i in 1 2 3; do ... done — the loop ends with?', o: ['end', 'done', 'fi', '}', 'stop'], a: 1, x: 'do...done wraps loops; if...fi wraps conditionals — mirrored keywords.' },
],

// Trivia > number conversions
'p2-9-0': [
{ q: 'Decimal 59 in hexadecimal?', o: ['3B', '3C', '2B', '2C', '3A'], a: 0, x: 'REAL PYQ — 59 = 3x16 + 11 = 3B (11=B). Divide by 16, remainder maps A-F.' },
{ q: 'Hex A3D to decimal?', o: ['2620', '2621', '2720', '2622', '2650'], a: 1, x: 'REAL PYQ — 10x256 + 3x16 + 13 = 2560+48+13 = 2621. Place values: 256,16,1.' },
{ q: 'Binary 1111011.11 to decimal?', o: ['123.5', '123.75', '111.5', '125.5', '123.25'], a: 1, x: 'REAL PYQ — 64+32+16+8+2+1 = 123; .11 = 0.5+0.25 = 0.75 -> 123.75.' },
{ q: 'Binary 11110101 to octal?', o: ['365', '355', '345', '375', '265'], a: 0, x: 'REAL PYQ — group in 3s: 011 110 101 = 3 6 5 -> 365. Grouping shortcut: octal=3 bits, hex=4 bits.' },
{ q: 'Binary 11110101.11101 to hex?', o: ['F5.E8', 'E5.E8', 'F5.E9', 'F4.E8', 'F6.E8'], a: 0, x: 'REAL PYQ — 1111 0101 = F5; .1110 1000 = .E8 -> F5.E8. Group 4 bits per hex digit.' },
],
// Trivia > history/inventors
'p2-9-1': [
{ q: 'C language was developed by?', o: ['James Gosling', 'Dennis Ritchie', 'Bjarne Stroustrup', 'Guido van Rossum', 'Ken Thompson only'], a: 1, x: 'REAL PYQ — Ritchie, 1972, Bell Labs. Language-author pairs: C-Ritchie, C++-Stroustrup, Java-Gosling, Python-van Rossum.' },
{ q: 'C was developed in which year?', o: ['1978', '1972', '1969', '1975', '1980'], a: 1, x: 'REAL PYQ — 1972. Pair the author AND the year — both asked separately.' },
{ q: 'Java was developed by?', o: ['Dennis Ritchie', 'James Gosling', 'Bjarne Stroustrup', 'Ken Thompson', 'Linus Torvalds'], a: 1, x: 'Gosling at Sun (1995) — the author map again.' },
{ q: 'Python was created by?', o: ['Guido van Rossum', 'James Gosling', 'Dennis Ritchie', 'Brendan Eich', 'Larry Wall'], a: 0, x: 'van Rossum (1991) — completes the author set.' },
{ q: 'UNIX was originally developed at?', o: ['IBM', 'Bell Labs', 'Microsoft', 'MIT', 'Xerox'], a: 1, x: 'Bell Labs (Thompson/Ritchie, 1969) — lab+people history cluster.' },
],
// Trivia > fundamentals
'p2-9-2': [
{ q: 'ASCII is a?', o: ['4-bit code', '7-bit code', '8-bit code', '16-bit code', '32-bit code'], a: 1, x: 'REAL PYQ-adjacent — ASCII = 7-bit (128 chars); extended = 8-bit. Unicode/UTF-8 = modern successor.' },
{ q: 'A compiler differs from an interpreter because a compiler?', o: ['Runs line by line', 'Translates whole program before execution', 'Is slower', 'Needs no source', 'Only works in Java'], a: 1, x: 'Compile = whole-program translation upfront; interpret = line-by-line at runtime. Python=interpreted-ish, C=compiled.' },
{ q: 'Which converts high-level code to machine code?', o: ['Editor', 'Compiler', 'Loader', 'Linker only', 'Assembler only'], a: 1, x: 'REAL PYQ-adjacent — compiler translates HLL -> machine language. Editor just edits text.' },
{ q: '1 KB in the binary (IEC) sense = ?', o: ['1000 bytes', '1024 bytes', '1024 bits', '512 bytes', '2048 bytes'], a: 1, x: '1024 bytes (KiB strictly) — powers of 2: KB 2^10, MB 2^20, GB 2^30.' },
{ q: 'Which is a linear data structure?', o: ['Tree', 'Graph', 'Array/Linked list/Stack/Queue', 'Heap', 'Trie'], a: 2, x: 'Linear = sequential elements (array, LL, stack, queue); non-linear = tree/graph/heap — the classification table.' },
],
// Trivia > OS/computer trivia
'p2-9-3': [
{ q: 'The main function of a data structure is to?', o: ['Collect data', 'Organise data for efficient access', 'Compile code', 'Store passwords', 'Encrypt files'], a: 1, x: 'REAL PYQ-adjacent — organise data so ops are efficient. Definition-level trivia.' },
{ q: 'Which is a non-linear data structure?', o: ['Array', 'Stack', 'Tree', 'Queue', 'Linked list'], a: 2, x: 'Trees/graphs/heaps = hierarchical/non-linear.' },
{ q: 'In an OS, a "process" is best defined as?', o: ['A program on disk', 'A program in execution', 'A file', 'A thread always', 'A CPU core'], a: 1, x: 'Program in execution = process — program vs process is the classic OS trivia.' },
{ q: 'RAM is characterised as?', o: ['Permanent storage', 'Volatile memory', 'Slow storage', 'Cache only', 'ROM type'], a: 1, x: 'Volatile = loses data on power-off; ROM/SSD = persistent. Volatile-vs-permanent is the basic split.' },
{ q: 'Cache memory sits between?', o: ['RAM and hard disk', 'CPU and main memory', 'Keyboard and CPU', 'Network and RAM', 'GPU and display'], a: 1, x: 'Cache = small fast buffer between CPU and RAM — memory-hierarchy order: registers > cache > RAM > disk.' },
],
}
