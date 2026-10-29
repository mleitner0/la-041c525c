// Logic Arena portrait art: hand-built inline SVG caricatures.
// portrait(key, mood) -> SVG string. mood: 'calm' | 'pleased' | 'annoyed' | 'furious'.
const ART_KEYS={left:['skylar','whoopi','harris','destiny'],right:['hank','timpool','crowder','wilson']};
// Photo portraits (AI-generated satire images). s = square (select tiles), f = full (stage). The secret entry uses neutral file names.
const PHOTOS={whoopi:'assets/p/left_whoopi',harris:'assets/p/left_harris',destiny:'assets/p/left_destiny_boss',timpool:'assets/p/right_timpool',crowder:'assets/p/right_crowder',wilson:'assets/p/right_wilson_boss',trump:{s:'assets/s/x1.jpg',f:'assets/s/x2.jpg'}};
const CLIPS={whoopi:'left_whoopi',harris:'left_harris',destiny:'left_destiny_boss',timpool:'right_timpool',crowder:'right_crowder'};
function photoSrc(key,v){const ph=PHOTOS[key];return typeof ph==='string'?`${ph}_${v}.jpg`:ph[v]}
const TAGLINES={
whoopi:"Runs the table, the segment, and the clock. Mostly the clock.",
harris:"Every answer comes with a scenic route. You will arrive eventually.",
destiny:"Talks at 400 words per minute. Cites 37 tabs. Never blinks.",
timpool:"Just asking questions. Has many more questions. Hat stays on.",
crowder:"Sets up a table, pours a coffee, and dares you to change his mind.",
wilson:"Lights up. Asks 'define good.' Waits. Never loses.",
skylar:"Has a protest sign for every occasion, including brunch.",
chad:"Square jaw, round arguments. Live at 8, wrong by 8:05.",
brynn:"Her ring light has more followers than your town.",
prof:"Forty years of tenure, zero years of being told no.",
streamer:"Talks at 400 words per minute. Cites 37 tabs. Never blinks.",
hank:"Can fix your truck. Cannot fix your argument. Will try anyway.",
pastor:"Answers every question with a gentler, harder question.",
market:"Believes the invisible hand is also his life coach.",
ranger:"Keeps a pocket copy of the founding papers in his boot.",
socratic:"Sips coffee. Asks 'define good.' Waits. Forever.",
heroL:"Armed with index cards and an unbreakable inside voice.",
heroR:"Brought a notebook, highlighters, and patience. Mostly patience.",
trump:"Secret challenger. Six opponents. One round each. Tremendous."};
const NAMES={heroL:'You',heroR:'You',trump:'"Trump"'};
function moodOf(v){return v>=80?'furious':v>=40?'annoyed':'calm'}
const HEADS={
round:'M58 85 Q58 30 100 30 Q142 30 142 85 Q142 150 100 155 Q58 150 58 85Z',
square:'M54 80 Q54 28 100 28 Q146 28 146 80 L146 128 Q142 162 100 164 Q58 162 54 128Z',
pointy:'M60 80 Q60 30 100 30 Q140 30 140 80 Q138 128 100 164 Q62 128 60 80Z',
wide:'M52 86 Q52 32 100 32 Q148 32 148 86 Q154 140 124 154 Q100 164 76 154 Q46 140 52 86Z',
long:'M64 78 Q64 26 100 26 Q136 26 136 78 L136 132 Q132 166 100 168 Q68 166 64 132Z'};
const NOSES={
bulb:s=>`<ellipse cx="100" cy="108" rx="13" ry="10" fill="${s}"/><circle cx="94" cy="111" r="2.4" fill="#0006"/><circle cx="106" cy="111" r="2.4" fill="#0006"/>`,
hook:s=>`<path d="M98 80 Q118 102 110 114 Q102 120 92 113" fill="${s}" stroke="#0005" stroke-width="2"/>`,
point:s=>`<path d="M100 82 L116 114 L95 114Z" fill="${s}" stroke="#0004" stroke-width="2" stroke-linejoin="round"/>`,
button:s=>`<ellipse cx="100" cy="106" rx="7" ry="6" fill="${s}"/><path d="M95 109 Q100 113 105 109" stroke="#0005" stroke-width="2" fill="none"/>`,
long:s=>`<path d="M96 78 Q104 96 112 116 Q102 122 92 116 Q98 98 96 78Z" fill="${s}" stroke="#0004" stroke-width="2"/>`};
function eyes(m){
 if(m==='furious')return `<ellipse cx="82" cy="88" rx="9" ry="6" fill="#fff"/><ellipse cx="118" cy="88" rx="9" ry="6" fill="#fff"/><circle cx="84" cy="89" r="3" fill="#7f1d1d"/><circle cx="116" cy="89" r="3" fill="#7f1d1d"/><path d="M71 80 L93 88 L93 82 L71 78Z M129 80 L107 88 L107 82 L129 78Z" fill="#0008"/>`;
 if(m==='annoyed')return `<ellipse cx="82" cy="88" rx="9" ry="7" fill="#fff"/><ellipse cx="118" cy="88" rx="9" ry="7" fill="#fff"/><circle cx="84" cy="90" r="3.6" fill="#111"/><circle cx="116" cy="90" r="3.6" fill="#111"/><path d="M72 84 Q82 80 92 84 L92 81 L72 81Z M108 84 Q118 80 128 84 L128 81 L108 81Z" fill="#0007"/>`;
 return `<ellipse cx="82" cy="88" rx="9" ry="8" fill="#fff"/><ellipse cx="118" cy="88" rx="9" ry="8" fill="#fff"/><circle cx="83" cy="89" r="4" fill="#111"/><circle cx="117" cy="89" r="4" fill="#111"/><circle cx="84.5" cy="87.5" r="1.3" fill="#fff"/><circle cx="118.5" cy="87.5" r="1.3" fill="#fff"/>`}
function brows(m,c){const w=m==='furious'?7:5;
 const d=m==='pleased'?'M70 68 Q82 58 93 65 M107 65 Q118 58 130 68':m==='furious'?'M68 66 L95 80 M132 66 L105 80':m==='annoyed'?'M70 72 L93 75 M130 70 L107 76':'M70 72 Q82 63 93 70 M107 70 Q118 63 130 72';
 return `<path d="${d}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`}
function mouth(m,smug){
 if(m==='furious')return `<path d="M78 128 Q100 118 122 128 Q120 152 100 152 Q80 152 78 128Z" fill="#450a0a"/><path d="M82 128 Q100 122 118 128 L117 133 L83 133Z" fill="#fff"/><ellipse cx="100" cy="146" rx="9" ry="4" fill="#f87171"/>`;
 if(m==='annoyed')return `<path d="M84 134 Q92 128 100 134 Q108 140 116 131" stroke="#3f1d1d" stroke-width="4" fill="none" stroke-linecap="round"/>`;
 if(m==='pleased')return `<path d="M80 126 Q100 152 120 126 Z" fill="#7f1d1d" stroke="#3f1d1d" stroke-width="3" stroke-linejoin="round"/><path d="M84 127 L116 127 L114 132 L86 132Z" fill="#fff"/>`;
 return smug?`<path d="M84 130 Q104 142 118 126" stroke="#3f1d1d" stroke-width="4" fill="none" stroke-linecap="round"/>`:`<path d="M82 128 Q100 144 118 128" stroke="#3f1d1d" stroke-width="4" fill="#7f1d1d55" stroke-linecap="round"/>`}
const STEAM='<g class="steam"><g><circle cx="40" cy="44" r="9"/><circle cx="31" cy="34" r="7"/><circle cx="24" cy="22" r="5"/></g><g><circle cx="160" cy="44" r="9"/><circle cx="169" cy="34" r="7"/><circle cx="176" cy="22" r="5"/></g></g>';
const BODY=(c,c2)=>`<path d="M22 222 Q24 176 72 168 L128 168 Q176 176 178 222Z" fill="${c}"/><path d="M72 168 Q100 196 128 168" fill="${c2||'#0003'}"/>`;
const C={
skylar:{skin:'#f2c4a0',sh:'#dca582',jaw:'pointy',nose:'button',bc:'#6d28d9',
 back:'',hair:'<path d="M60 70 Q58 22 104 20 Q150 24 142 60 Q120 40 96 46 Q78 50 62 74Z" fill="#a855f7"/><path d="M104 20 Q130 4 150 18 Q136 22 128 34Z" fill="#c084fc"/><path d="M60 72 L60 96 L64 96 L66 70Z" fill="#4c1d95"/>',
 body:BODY('#7c3aed','#5b21b6')+'<path d="M74 172 Q70 200 64 222 M126 172 Q130 200 136 222" stroke="#a78bfa" stroke-width="4"/><circle cx="86" cy="196" r="7" fill="#22c55e"/><circle cx="114" cy="198" r="6" fill="#f472b6"/>',
 face:'<circle cx="108" cy="114" r="3" fill="none" stroke="#e5e7eb" stroke-width="2"/><circle cx="56" cy="104" r="3" fill="#fbbf24"/>',
 prop:'<g transform="rotate(-10 170 120)"><rect x="166" y="96" width="5" height="126" fill="#92400e"/><rect x="138" y="58" width="60" height="44" rx="3" fill="#fef3c7" stroke="#78350f" stroke-width="3"/><text x="168" y="77" font-size="12" font-weight="900" text-anchor="middle" fill="#b91c1c">NO TO</text><text x="168" y="93" font-size="12" font-weight="900" text-anchor="middle" fill="#b91c1c">EVERYTHING</text></g>'},
chad:{skin:'#e8b48a',sh:'#cf9467',jaw:'square',nose:'point',bc:'#3b2412',
 hair:'<path d="M52 74 Q48 18 102 16 Q154 18 148 72 Q140 44 120 40 Q90 32 70 46 Q58 56 52 74Z" fill="#3b2412"/><path d="M70 40 Q100 20 140 40" stroke="#6b4a2a" stroke-width="4" fill="none"/>',
 body:BODY('#1e3a8a','#fff')+'<path d="M94 172 L106 172 L110 222 L100 230 L90 222Z" fill="#dc2626"/><path d="M72 168 L94 200 L86 172Z M128 168 L106 200 L114 172Z" fill="#172554"/>',
 face:'<path d="M70 150 Q100 170 130 150" stroke="#cf9467" stroke-width="3" fill="none"/><circle cx="100" cy="150" r="2" fill="#a16207"/>',
 prop:'<g transform="rotate(20 160 160)"><rect x="152" y="140" width="12" height="60" rx="4" fill="#111827"/><circle cx="158" cy="134" r="14" fill="#374151"/><rect x="149" y="150" width="18" height="10" fill="#2563eb"/><text x="158" y="158" font-size="7" text-anchor="middle" fill="#fff">NEWS</text></g>'},
brynn:{skin:'#f5d0b5',sh:'#e2ae8c',jaw:'pointy',nose:'button',bc:'#a16207',
 back:'<path d="M50 80 Q40 170 60 200 L140 200 Q160 170 150 80 Q150 20 100 20 Q50 20 50 80Z" fill="#fcd34d"/>',
 hair:'<path d="M58 84 Q54 24 100 22 Q148 24 142 84 Q130 46 100 44 Q74 46 58 84Z" fill="#fde68a"/><rect x="66" y="30" width="68" height="14" rx="7" fill="#111"/><circle cx="82" cy="37" r="9" fill="#1f2937"/><circle cx="118" cy="37" r="9" fill="#1f2937"/>',
 body:BODY('#f472b6','#db2777')+'<circle cx="100" cy="182" r="6" fill="#fff"/><circle cx="88" cy="178" r="5" fill="#fff"/><circle cx="112" cy="178" r="5" fill="#fff"/>',
 face:'<ellipse cx="72" cy="108" rx="8" ry="5" fill="#fb7185" opacity=".5"/><ellipse cx="128" cy="108" rx="8" ry="5" fill="#fb7185" opacity=".5"/><path d="M76 84 L72 78 M80 82 L78 76 M120 82 L122 76 M124 84 L128 78" stroke="#111" stroke-width="2"/>',
 prop:'<g transform="rotate(-14 34 120)"><circle cx="34" cy="96" r="24" fill="none" stroke="#fef9c3" stroke-width="7"/><rect x="22" y="118" width="24" height="42" rx="5" fill="#111827" stroke="#e5e7eb" stroke-width="2"/><rect x="31" y="160" width="6" height="58" fill="#6b7280"/></g>'},
prof:{skin:'#efc9a8',sh:'#d6a682',jaw:'long',nose:'long',bc:'#d1d5db',
 hair:'<path d="M62 92 Q50 56 70 46 Q62 70 70 90Z M138 92 Q150 56 130 46 Q138 70 130 90Z" fill="#e5e7eb"/><path d="M80 32 Q100 22 120 32" stroke="#d6a682" stroke-width="3" fill="none"/>',
 body:BODY('#78716c','#57534e')+'<path d="M84 174 L100 168 L116 174 L116 186 L100 180 L84 186Z" fill="#b91c1c"/><circle cx="100" cy="177" r="4" fill="#7f1d1d"/><rect x="60" y="196" width="16" height="10" rx="3" fill="#a8a29e"/><rect x="124" y="196" width="16" height="10" rx="3" fill="#a8a29e"/>',
 face:'<g fill="none" stroke="#1f2937" stroke-width="3"><circle cx="82" cy="88" r="13"/><circle cx="118" cy="88" r="13"/><path d="M95 88 L105 88"/></g><path d="M92 148 Q100 160 108 148 L104 166 L96 166Z" fill="#e5e7eb"/>',
 prop:'<g transform="rotate(8 170 170)"><rect x="146" y="148" width="44" height="58" rx="3" fill="#7c2d12"/><rect x="150" y="152" width="36" height="50" fill="#fef3c7"/><text x="168" y="170" font-size="8" text-anchor="middle" fill="#7c2d12" font-weight="700">MY</text><text x="168" y="182" font-size="8" text-anchor="middle" fill="#7c2d12" font-weight="700">BOOK</text><text x="168" y="194" font-size="6" text-anchor="middle" fill="#7c2d12">vol. 12</text></g>'},
streamer:{skin:'#e0b38c',sh:'#c99670',jaw:'round',nose:'point',bc:'#1c1917',
 hair:'<path d="M58 78 Q50 24 100 22 Q152 22 142 78 Q138 50 124 46 L118 56 L108 42 L96 56 L88 42 L78 56 L70 46 Q62 56 58 78Z" fill="#1c1917"/>',
 body:BODY('#0f766e','#115e59')+'<path d="M84 170 Q100 190 116 170" stroke="#2dd4bf" stroke-width="4" fill="none"/><text x="100" y="212" font-size="13" font-weight="900" text-anchor="middle" fill="#99f6e4">STATS</text>',
 face:'<path d="M50 70 Q100 0 150 70" stroke="#111827" stroke-width="8" fill="none"/><rect x="42" y="72" width="16" height="30" rx="6" fill="#ef4444"/><rect x="142" y="72" width="16" height="30" rx="6" fill="#ef4444"/><path d="M50 100 Q60 132 86 134" stroke="#111827" stroke-width="4" fill="none"/><circle cx="88" cy="134" r="5" fill="#111827"/>',
 prop:'<g transform="rotate(10 168 170)"><rect x="154" y="140" width="28" height="56" rx="6" fill="#84cc16"/><rect x="154" y="150" width="28" height="12" fill="#1a2e05"/><text x="168" y="159" font-size="8" text-anchor="middle" fill="#bef264" font-weight="900">ZAP</text><ellipse cx="168" cy="140" rx="14" ry="4" fill="#d9f99d"/></g><g fill="#fde047" font-size="11" font-weight="900"><text x="10" y="40">37 TABS</text><text x="150" y="30">%</text><text x="14" y="140">p&lt;.05</text></g>'},
hank:{skin:'#d9a27c',sh:'#bf8660',jaw:'wide',nose:'bulb',bc:'#57534e',
 hair:'<path d="M50 68 Q52 22 100 20 Q148 22 150 68Z" fill="#b91c1c"/><path d="M44 66 Q100 52 170 70 Q150 78 100 70 Q60 70 44 66Z" fill="#7f1d1d"/><rect x="80" y="34" width="40" height="20" rx="4" fill="#fff"/><text x="100" y="49" font-size="10" font-weight="900" text-anchor="middle" fill="#b91c1c">HANK</text>',
 body:BODY('#1d4ed8','#1e3a8a')+'<rect x="72" y="174" width="56" height="50" fill="#3b82f6"/><path d="M76 174 L76 160 M124 174 L124 160" stroke="#1e3a8a" stroke-width="6"/><circle cx="80" cy="180" r="4" fill="#fbbf24"/><circle cx="120" cy="180" r="4" fill="#fbbf24"/>',
 face:'<path d="M70 124 Q86 114 100 122 Q114 114 130 124 Q132 136 118 132 Q108 128 100 132 Q92 128 82 132 Q68 136 70 124Z" fill="#57534e"/><path d="M60 140 Q100 168 140 140" stroke="#bf866088" stroke-width="10" fill="none"/>',
 prop:'<g transform="rotate(-30 170 160)"><rect x="164" y="130" width="12" height="80" rx="4" fill="#9ca3af"/><path d="M156 116 Q170 100 184 116 L178 132 L170 122 L162 132Z" fill="#9ca3af" stroke="#4b5563" stroke-width="2"/></g><path d="M118 150 Q124 156 120 162" stroke="#000a" stroke-width="2" fill="none"/>'},
pastor:{skin:'#8d5a3b',sh:'#744628',jaw:'round',nose:'bulb',bc:'#d6d3d1',
 hair:'<path d="M58 76 Q54 24 100 24 Q146 24 142 76 Q138 44 110 40 Q82 38 64 52 Q60 62 58 76Z" fill="#d6d3d1"/><path d="M84 38 Q96 30 112 38" stroke="#a8a29e" stroke-width="3" fill="none"/>',
 body:BODY('#111827','#1f2937')+'<rect x="90" y="168" width="20" height="10" fill="#fff"/>',
 face:'<g fill="none" stroke="#a16207" stroke-width="2.5"><rect x="70" y="80" width="24" height="16" rx="6"/><rect x="106" y="80" width="24" height="16" rx="6"/><path d="M94 86 L106 86"/></g>',
 prop:'<g transform="rotate(-8 34 180)"><rect x="12" y="150" width="46" height="60" rx="4" fill="#1e3a8a"/><rect x="14" y="152" width="4" height="56" fill="#fbbf24"/><text x="38" y="186" font-size="10" text-anchor="middle" fill="#fde68a" font-weight="900">WHY?</text></g><g fill="#fde047" font-size="22" font-weight="900"><text x="152" y="54">?</text><text x="166" y="80">?</text></g>'},
market:{skin:'#f0c7a4',sh:'#d8a581',jaw:'wide',nose:'hook',bc:'#78716c',
 hair:'<path d="M58 78 Q54 52 64 44 L66 70Z M142 78 Q146 52 136 44 L134 70Z" fill="#a8a29e"/><path d="M64 46 Q90 26 140 44 Q110 36 70 54Z" fill="#a8a29e"/><path d="M70 44 Q100 30 136 42" stroke="#78716c" stroke-width="2" fill="none"/>',
 body:BODY('#1f2937','#fff')+'<path d="M86 172 L100 182 L114 172 L114 186 L100 180 L86 186Z" fill="#eab308"/><path d="M72 168 L90 204 L84 170Z M128 168 L110 204 L116 170Z" fill="#111827"/><rect x="128" y="190" width="12" height="8" fill="#eab308"/>',
 face:'<circle cx="118" cy="88" r="13" fill="none" stroke="#ca8a04" stroke-width="3"/><path d="M131 92 Q140 120 128 150" stroke="#ca8a04" stroke-width="1.5" fill="none"/>',
 prop:'<g><rect x="2" y="120" width="56" height="44" rx="3" fill="#f8fafc" stroke="#334155" stroke-width="2"/><path d="M8 156 L20 146 L30 150 L42 132 L52 126" stroke="#16a34a" stroke-width="4" fill="none"/><path d="M46 124 L54 124 L54 132" stroke="#16a34a" stroke-width="3" fill="none"/><text x="30" y="132" font-size="8" text-anchor="middle" fill="#334155" font-weight="700">GDP</text></g>'},
ranger:{skin:'#d4a07a',sh:'#b88259',jaw:'square',nose:'hook',bc:'#78350f',
 hair:'<path d="M20 60 Q100 36 180 60 Q160 70 100 64 Q40 70 20 60Z" fill="#92400e"/><path d="M60 62 Q60 14 100 14 Q140 14 140 62Z" fill="#a16207"/><rect x="60" y="48" width="80" height="8" fill="#451a03"/><path d="M96 50 L100 44 L104 50 L100 54Z" fill="#fbbf24"/>',
 body:BODY('#78350f','#92400e')+'<path d="M76 168 L100 196 L124 168Z" fill="#dc2626"/><circle cx="92" cy="176" r="2" fill="#fff"/><circle cx="106" cy="180" r="2" fill="#fff"/><path d="M74 168 L74 222 M126 168 L126 222" stroke="#fef3c7" stroke-width="2" stroke-dasharray="4 4"/>',
 face:'<path d="M74 124 Q88 116 100 124 Q112 116 126 124 Q138 128 142 112 Q140 136 120 132 Q108 130 100 134 Q92 130 80 132 Q60 136 58 112 Q62 128 74 124Z" fill="#78350f"/>',
 prop:'<g transform="rotate(12 170 170)"><rect x="150" y="128" width="40" height="70" rx="4" fill="#fef3c7" stroke="#a16207" stroke-width="2"/><ellipse cx="170" cy="128" rx="22" ry="6" fill="#fde68a" stroke="#a16207" stroke-width="2"/><ellipse cx="170" cy="198" rx="22" ry="6" fill="#fde68a" stroke="#a16207" stroke-width="2"/><g stroke="#a16207" stroke-width="1.5"><path d="M156 142 H184 M156 152 H184 M156 162 H180 M156 172 H184 M156 182 H176"/></g></g>'},
socratic:{skin:'#efc6a3',sh:'#d6a47f',jaw:'square',nose:'point',bc:'#44403c',
 hair:'<path d="M56 74 Q52 22 100 22 Q148 22 144 74 Q140 40 100 38 Q62 40 56 74Z" fill="#44403c"/><path d="M58 110 Q60 168 100 172 Q140 168 142 110 Q136 150 100 152 Q64 150 58 110Z" fill="#44403c"/>',
 body:BODY('#334155','#e2e8f0')+'<path d="M72 168 L92 210 L86 170Z M128 168 L108 210 L114 170Z" fill="#1e293b"/>',
 face:'<path d="M80 124 Q100 116 120 124 L118 130 Q100 124 82 130Z" fill="#44403c"/>',
 prop:'<g><path d="M146 150 L184 150 L180 196 Q165 204 150 196Z" fill="#f8fafc" stroke="#334155" stroke-width="3"/><path d="M182 160 Q196 164 182 180" stroke="#334155" stroke-width="4" fill="none"/><rect x="150" y="160" width="30" height="10" fill="#b91c1c"/><path d="M156 142 Q152 132 158 124 M168 142 Q164 130 170 120" stroke="#cbd5e1" stroke-width="3" fill="none" stroke-linecap="round"/></g>',smug:true},
heroL:{skin:'#e9b991',sh:'#d09a70',jaw:'round',nose:'button',bc:'#1e3a8a',
 hair:'<path d="M56 80 Q50 26 100 22 Q150 26 144 80 L138 52 L128 62 L122 40 L110 54 L100 32 L90 54 L78 40 L72 62 L62 52Z" fill="#1e3a8a"/><rect x="56" y="54" width="88" height="10" rx="5" fill="#60a5fa"/>',
 body:BODY('#2563eb','#1d4ed8')+'<path d="M100 172 L100 222" stroke="#93c5fd" stroke-width="3"/><circle cx="84" cy="196" r="9" fill="#fff"/><text x="84" y="200" font-size="10" text-anchor="middle" fill="#2563eb" font-weight="900">L</text>',
 face:'',
 prop:'<g transform="rotate(-12 34 170)"><rect x="12" y="142" width="40" height="28" rx="3" fill="#fff" stroke="#1e3a8a" stroke-width="2"/><rect x="16" y="150" width="40" height="28" rx="3" fill="#fff" stroke="#1e3a8a" stroke-width="2"/><path d="M20 158 H50 M20 164 H46 M20 170 H50" stroke="#93c5fd" stroke-width="2"/></g>'},
heroR:{skin:'#c68e65',sh:'#a8734c',jaw:'pointy',nose:'point',bc:'#7f1d1d',
 back:'<path d="M130 50 Q170 70 160 130 Q150 100 136 80Z" fill="#7f1d1d"/>',
 hair:'<path d="M58 80 Q52 22 100 22 Q148 22 142 80 Q138 46 100 44 Q74 46 64 60 Q60 70 58 80Z" fill="#7f1d1d"/><circle cx="138" cy="58" r="6" fill="#f87171"/>',
 body:BODY('#dc2626','#b91c1c')+'<path d="M100 172 L100 222" stroke="#fecaca" stroke-width="3"/><circle cx="116" cy="196" r="9" fill="#fff"/><text x="116" y="200" font-size="10" text-anchor="middle" fill="#dc2626" font-weight="900">R</text>',
 face:'<g fill="none" stroke="#111" stroke-width="3"><rect x="68" y="78" width="28" height="20" rx="4"/><rect x="104" y="78" width="28" height="20" rx="4"/><path d="M96 86 L104 86"/></g>',
 prop:'<g transform="rotate(10 170 170)"><rect x="148" y="140" width="40" height="54" rx="3" fill="#fef9c3" stroke="#7f1d1d" stroke-width="2"/><path d="M154 152 H182 M154 162 H182 M154 172 H176" stroke="#f87171" stroke-width="2"/><rect x="176" y="128" width="6" height="34" fill="#facc15" transform="rotate(20 179 145)"/></g>'},
trump:{skin:'#f4a259',sh:'#e08a3c',jaw:'wide',nose:'bulb',bc:'#fde68a',
 back:'<path d="M48 84 Q40 40 70 30 L60 90Z" fill="#facc15"/>',
 hair:'<path d="M46 76 Q34 30 84 18 Q140 6 162 40 Q170 56 150 56 Q120 34 90 44 Q66 52 60 80Z" fill="#fcd34d"/><path d="M84 18 Q130 10 160 42 Q130 26 96 30Z" fill="#fde68a"/><path d="M70 40 Q100 24 140 34" stroke="#eab308" stroke-width="3" fill="none"/>',
 body:BODY('#1e3a8a','#fff')+'<path d="M94 170 L106 170 L112 236 L100 246 L88 236Z" fill="#dc2626"/><path d="M72 168 L94 206 L86 170Z M128 168 L106 206 L114 170Z" fill="#172554"/><rect x="132" y="186" width="14" height="8" fill="#fff"/><rect x="132" y="186" width="5" height="4" fill="#1e3a8a"/><path d="M137 187 H146 M137 189 H146 M132 191 H146 M132 193 H146" stroke="#dc2626" stroke-width=".8"/>',
 face:'<ellipse cx="82" cy="94" rx="14" ry="5" fill="#fde68a" opacity=".55"/><ellipse cx="118" cy="94" rx="14" ry="5" fill="#fde68a" opacity=".55"/>',
 prop:'<g transform="rotate(-10 30 170)"><rect x="18" y="150" width="26" height="30" rx="10" fill="#f4a259" stroke="#c2410c" stroke-width="2"/><rect x="24" y="126" width="12" height="30" rx="6" fill="#f4a259" stroke="#c2410c" stroke-width="2"/></g>',smug:true}};
function photoPortrait(key,mood,cls){const v=/sq/.test(cls)?'s':'f';
 return `<div class="pt photo ${v==='s'?'sqp':'fullp'} ${cls} m-${mood}" role="img" aria-label="${NAMES[key]||'opponent'} portrait"><img src="${photoSrc(key,v)}" alt="" decoding="async" draggable="false"><i class="tint"></i>${mood==='furious'?`<svg class="steamo" viewBox="0 0 200 230">${STEAM}</svg>`:''}</div>`}
function portrait(key,mood='calm',cls=''){mood=mood||'calm';if(PHOTOS[key])return photoPortrait(key,mood,cls);const c=C[key]||C.heroL;
 const head=HEADS[c.jaw];
 return `<svg class="pt ${cls} m-${mood}" viewBox="0 0 200 230" role="img" aria-label="${(NAMES[key]||key)} portrait">${c.back||''}${c.body}<rect x="86" y="146" width="28" height="28" fill="${c.sh}"/><ellipse cx="54" cy="96" rx="9" ry="14" fill="${c.sh}"/><ellipse cx="146" cy="96" rx="9" ry="14" fill="${c.sh}"/><path d="${head}" fill="${c.skin}" stroke="#0003" stroke-width="2"/>${mood==='furious'?`<path d="${head}" fill="#ef4444" opacity=".55"/>`:mood==='annoyed'?`<path d="${head}" fill="#f97316" opacity=".15"/>`:''}${eyes(mood)}${brows(mood,c.bc)}${NOSES[c.nose](c.sh)}${mouth(mood,c.smug)}${c.face||''}${c.hair}${c.prop||''}${mood==='furious'?STEAM:''}</svg>`}
function opKey(op){for(const s of['left','right']){const i=OPPONENTS[s].indexOf(op);if(i>=0)return ART_KEYS[s][i]}return 'heroL'}
const PORTRAITS={keys:Object.keys(C),render:portrait,taglines:TAGLINES,moodOf,opKey};
