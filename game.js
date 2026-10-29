const $=s=>document.querySelector(s),app=$('#app');
let G=null,timerId=null,typeId=null,vsT=null,CS='left',SID=0,BACK=null,IGN=false;const TM=new Set(),TI=new Set();
function loadSave(){let d={};try{d=JSON.parse(localStorage.getItem('la_save')||'{}');if(!d||typeof d!=='object'||Array.isArray(d))d={}}catch(e){d={}}
const cl=v=>{v=parseInt(v,10);return Number.isFinite(v)?Math.min(5,Math.max(0,v)):0};const p=d.prog&&typeof d.prog==='object'?d.prog:{};
return {prog:{left:cl(p.left),right:cl(p.right)},sound:d.sound!==false,trump:d.trump===true}}
let S=loadSave();
const save=()=>{try{localStorage.setItem('la_save',JSON.stringify(S))}catch(e){}};
// every pending timer is tracked and tagged with the screen session; cleanup() kills them all
function later(fn,ms){const sid=SID;const id=setTimeout(()=>{TM.delete(id);if(sid===SID)fn()},ms);TM.add(id);return id}
function every(fn,ms){const sid=SID;const id=setInterval(()=>{if(sid!==SID){clearInterval(id);TI.delete(id);return}fn()},ms);TI.add(id);return id}
function setBack(fn){BACK=fn;try{if(!(history.state&&history.state.la))history.pushState({la:1},'')}catch(e){}}
addEventListener('popstate',()=>{if(IGN){IGN=false;return}const f=BACK;if(f){BACK=null;f()}});
const LOCK='<svg class="lockico" viewBox="0 0 24 24"><path d="M7 10V7a5 5 0 0 1 10 0v3" fill="none" stroke="currentColor" stroke-width="2.4"/><rect x="4" y="10" width="16" height="12" rx="2" fill="currentColor"/></svg>';
const CHECK='<svg class="chk" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#16a34a"/><path d="M6 12l4 4 8-8" stroke="#fff" stroke-width="3" fill="none"/></svg>';
function beep(f=440,d=.1){if(!S.sound)return;try{const c=window._ac||(window._ac=new(window.AudioContext||window.webkitAudioContext)()),o=c.createOscillator(),g=c.createGain();o.frequency.value=f;g.gain.value=.05;o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+d)}catch(e){}}
function shuffle(a){return a.map(x=>[Math.random(),x]).sort((a,b)=>a[0]-b[0]).map(x=>x[1])}
function killVideo(){document.querySelectorAll('.vid').forEach(o=>{const v=o.querySelector('video');if(v){try{v.pause()}catch(e){}v.removeAttribute('src');try{v.load()}catch(e){}}o.remove()})}
function cleanup(){SID++;killVideo();TM.forEach(clearTimeout);TM.clear();TI.forEach(clearInterval);TI.clear();clearInterval(timerId);clearInterval(typeId);clearTimeout(vsT);document.querySelectorAll('.modal,.reveal').forEach(m=>m.remove());themeOff()}
const stopAll=cleanup;

// GOLD THEME: only while playing as the secret character
const WH='<svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="gsk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff7d6"/><stop offset="1" stop-color="#f5d77a"/></linearGradient><linearGradient id="gw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf5"/><stop offset="1" stop-color="#f1e3b5"/></linearGradient></defs><rect width="400" height="220" fill="url(#gsk)"/><circle cx="330" cy="50" r="28" fill="#fde68a"/><rect x="40" y="110" width="320" height="80" fill="url(#gw)" stroke="#c9a227" stroke-width="2"/><rect x="30" y="102" width="340" height="10" fill="#fffdf5" stroke="#c9a227" stroke-width="2"/>'+Array.from({length:12},(_,k)=>`<rect x="${52+k*26}" y="122" width="12" height="22" fill="#c9a227" opacity=".7"/><rect x="${52+k*26}" y="156" width="12" height="22" fill="#c9a227" opacity=".7"/>`).join('')+'<path d="M140 102 Q200 40 260 102Z" fill="#fffdf5" stroke="#c9a227" stroke-width="2"/><rect x="146" y="102" width="108" height="88" fill="#fffaf0" stroke="#c9a227" stroke-width="2"/>'+Array.from({length:6},(_,k)=>`<rect x="${152+k*18}" y="104" width="7" height="86" fill="#fff" stroke="#d4af37"/>`).join('')+'<rect x="196" y="40" width="3" height="30" fill="#a16207"/><path d="M199 40 h22 v12 h-22z" fill="#d4af37"/><rect x="0" y="190" width="400" height="30" fill="#e8c766"/><path d="M0 200 Q100 190 200 200 T400 200" stroke="#c9a227" fill="none" stroke-width="2"/><g fill="#b98f1a">'+Array.from({length:14},(_,k)=>`<circle cx="${k*30+10}" cy="196" r="9"/>`).join('')+'</g></svg>';
function themeOn(force){if(!force&&!(G&&G.trump))return;if(document.body.classList.contains('theme-gold'))return;document.body.classList.add('theme-gold');
const bg=document.createElement('div');bg.id='goldbg';bg.innerHTML=WH;document.body.prepend(bg);
const sp=document.createElement('div');sp.id='sparkles';sp.innerHTML=Array.from({length:18},(_,k)=>`<i style="left:${(k*53)%100}%;top:${(k*37)%100}%;animation-delay:${(k%6)*.7}s,${(k%5)*.4}s;animation-duration:${7+k%5}s,${1.4+(k%3)*.5}s"></i>`).join('');document.body.appendChild(sp);
const m=document.createElement('div');m.id='maga';m.textContent='MAGA';document.body.appendChild(m)}
function themeOff(){document.body.classList.remove('theme-gold');['#goldbg','#sparkles','#maga'].forEach(s=>{const e=$(s);e&&e.remove()})}
document.addEventListener('visibilitychange',()=>document.body.classList.toggle('paused',document.hidden));
// Full-screen 3:4 clip. Skips on tap, ended, error, or timeout; reduced motion shows the poster plus Continue.
function playClip(src,poster,done){killVideo();let fin=false;const sid=SID,go=()=>{if(fin||sid!==SID)return;fin=true;killVideo();done()};
 const rm=matchMedia('(prefers-reduced-motion: reduce)').matches,o=document.createElement('div');o.className='vid';
 o.innerHTML=rm?`<div class=vbox><img src="${poster}" alt=""></div><button class="pri vcont">Continue</button>`:`<div class=vbox><video playsinline muted autoplay preload="metadata" poster="${poster}"></video></div><p class=skip>Tap to skip</p>`;
 document.body.appendChild(o);o.onclick=go;
 if(!rm){const v=o.querySelector('video');v.muted=true;v.setAttribute('webkit-playsinline','');v.addEventListener('ended',go);v.addEventListener('error',go);v.src=src;
  const p=v.play();if(p&&p.catch)p.catch(()=>later(go,1500));later(()=>{if(v.readyState<2)go()},5000);later(go,12000)}}
function goTitle(){stopAll();BACK=null;try{if(history.state&&history.state.la){IGN=true;history.back()}}catch(e){}app.innerHTML=`<h1>LOGIC ARENA</h1><p class=c><small>A satirical debate game.</small></p>
<div class=heroes>${portrait('heroL','calm')}<b class=vsx>VS</b>${portrait('heroR','calm')}</div>
<button class="pri blue" onclick="pick('left')">Debate against the Left <small>(${S.prog.left}/5)</small></button>
<button class="pri red" onclick="pick('right')">Debate against the Right <small>(${S.prog.right}/5)</small></button>
<div class="row"><button onclick="glossary()">Fallacy Glossary</button><button onclick="S.sound=!S.sound;save();goTitle()">Sound: ${S.sound?'On':'Off'}</button></div>
<button onclick="if(confirm('Reset all progress?')){localStorage.removeItem('la_save');location.reload()}">Restart / Reset Progress</button>`}
function glossary(){stopAll();setBack(goTitle);app.innerHTML=`<button class=back onclick="goTitle()">← Back</button><h2>Fallacy Glossary</h2>${Object.entries(FALLACIES).map(([k,v])=>`<p><b>${k}</b><br><small>${v}</small></p>`).join('')}<button class="pri" onclick="goTitle()">Back</button>`}
function hero(side){return side==='left'?'heroL':'heroR'}
// CHARACTER SELECT
function pick(side){stopAll();CS=side;setBack(goTitle);const ops=OPPONENTS[side],p=S.prog[side];
const tile=(o,i)=>{const locked=i>p,beaten=i<p,k=ART_KEYS[side][i];return `<button class="tile ${side} ${o.boss?'boss':''} ${locked?'locked':''}" aria-disabled="${locked}" onclick="tileTap('${side}',${i})">${o.boss?'<span class=bossb>BOSS</span>':''}${beaten?CHECK:''}<span class=tp>${portrait(k,'calm','sq')}</span>${locked?`<span class=lk>${LOCK}</span>`:''}<span class=tn>${o.name}</span></button>`};
app.innerHTML=`<div class="cs ${side}"><button class=back onclick="goTitle()">← Back</button><h2>Choose your opponent</h2><p class=c><small>Debate against the ${side==='left'?'Left':'Right'} · ${p}/5 beaten</small></p>
<div class=grid>${ops.slice(0,4).map(tile).join('')}</div><div class=bossrow>${tile(ops[4],4)}</div>
${S.trump?`<div class=bossrow><button class="tile special" onclick="trumpDetail()"><span class=bossb>SECRET</span><span class=tp>${portrait('trump','calm','sq')}</span><span class=tn>"Trump"</span></button></div>`:''}
<div id=toast role=status></div></div>`}
function tileTap(side,i){if(i>S.prog[side]){const t=$('#toast');t.textContent=`Beat ${OPPONENTS[side][i-1].name} to unlock`;t.classList.remove('show');void t.offsetWidth;t.classList.add('show');beep(200,.08);return}detail(side,i)}
function card(key,name,tag,status,fight){return `<div class="detail ${CS}"><button class=back onclick="pick(CS)">← Back</button><div class=big>${portrait(key,'calm')}</div><div class=ncard><h2>${name}</h2><p class=tag2>${tag}</p><p><small>${status}</small></p></div><button class="pri ${CS==='left'?'blue':'red'}" onclick="${fight}">FIGHT</button><button onclick="pick(CS)">Back</button></div>`}
function detail(side,i){stopAll();setBack(()=>pick(CS));const o=OPPONENTS[side][i],k=ART_KEYS[side][i];app.innerHTML=card(k,o.name,TAGLINES[k],o.title+(i<S.prog[side]?' · Beaten (replayable)':''),`vs('${side}',${i})`)}
function trumpDetail(){stopAll();setBack(()=>pick(CS));app.innerHTML=card('trump','"Trump"',TAGLINES.trump,'Secret challenger','vsTrump()')}
// VS SPLASH
function splash(lk,ln,rk,rn,go){stopAll();setBack(()=>pick(CS));let done=false;const fin=()=>{if(done)return;done=true;clearTimeout(vsT);go()};
app.innerHTML=`<div class=vs id=vs><div class="vside l">${portrait(lk,'calm')}<b>${ln}</b></div><div class=vsbig>VS</div><div class="vside r">${portrait(rk,'calm')}<b>${rn}</b></div><p class=skip>Tap to skip</p><button class="back vsback" id=vsb>← Back</button></div>`;
$('#vsb').onclick=e=>{e.stopPropagation();done=true;clearTimeout(vsT);pick(CS)};$('#vs').onclick=fin;beep(330,.2);vsT=later(fin,2000)}
function vs(side,i){const o=OPPONENTS[side][i];splash(hero(side),'You',ART_KEYS[side][i],o.name,()=>start(side,i))}
function vsTrump(){splash('trump','"Trump"',CS==='left'?'destiny':'wilson','Everyone',()=>trumpStart());themeOn(true)}
// BATTLE
function rounds(side,i){const pool=side==='left'?LEFT_POOL:RIGHT_POOL,n=OPPONENTS[side][i].boss?12:8;const st=(i*8)%pool.length;let r=[];for(let k=0;k<n;k++)r.push(pool[(st+k)%pool.length]);return r}
function start(side,i){stopAll();G={frus:0,side,i,op:OPPONENTS[side][i],rs:rounds(side,i),r:0,anger:0,resp:0,comp:100,allTroll:true,picks:0};turn()}
function vals(){const g=G;const sh=(g.op.short||g.op.name);if(g.trump)return{p:['"Trump"',100,'gold'],o:[g.op.name+' · Anger',g.anger,'anger',sh+' · Anger']};
return g.side==='left'?{p:['You · Composure',g.comp,'comp'],o:[g.op.name+' · Anger',g.anger,'anger',sh+' · Anger']}:{p:['You · Anger',g.anger,'anger'],o:[g.op.name+' · Respect',g.resp,'resp',sh+' · Respect']}}
function moods(){const g=G;if(g.trump)return{p:'calm',o:moodOf(g.anger)};
if(g.side==='left')return{p:moodOf(100-g.comp),o:moodOf(g.anger)};return{p:moodOf(g.anger),o:g.frus?'annoyed':g.resp>=50?'pleased':'calm'}}
function hud(v,prev,id){return `<div class=hud><div class=hl><span${v[3]?` data-s="${v[3]}"`:''}>${v[0]}</span><b id=${id}n>${v[1]}</b></div><div class="bar ${v[2]}"><i id=${id}b style="width:${prev}%" data-v="${v[1]}"></i></div></div>`}
function arena(ov){const g=G,v=vals(),m=Object.assign(moods(),ov||{}),pv=g.pv||{p:v.p[1],o:v.o[1]};g.pv={p:v.p[1],o:v.o[1]};
const pk=g.trump?'trump':hero(g.side),ok=opKey(g.op);
return `<div class="spot sl"></div><div class="spot sr"></div><svg class=crowd viewBox="0 0 400 60" preserveAspectRatio="none">${Array.from({length:22},(_,k)=>`<circle cx="${k*19+8}" cy="${30+(k%3)*6}" r="10"/><rect x="${k*19-4}" y="${38+(k%3)*6}" width="24" height="30" rx="10"/>`).join('')}</svg>
<div class="fighter pl" id=pf>${hud(v.p,pv.p,'ph')}<div class=fig id=pav>${portrait(pk,m.p)}</div><div class=podium>${g.trump?'':'YOU'}</div></div>
<div class="fighter op" id=of>${hud(v.o,pv.o,'oh')}<div class=fig id=opav>${portrait(ok,m.o)}</div><div class=podium></div></div>`}
// Bar labels: short name on narrow screens, or whenever the full name would be cut off.
function fitLabels(){document.querySelectorAll('.hl span[data-s]').forEach(s=>{if(innerWidth<=420||s.scrollWidth>s.clientWidth+1)s.textContent=s.dataset.s})}
function animBars(){fitLabels();later(()=>document.querySelectorAll('.bar i[data-v]').forEach(i=>i.style.width=i.dataset.v+'%'),30)}
function refresh(shake,ov){const a=$('#arena');if(!a)return;a.innerHTML=arena(ov);animBars();(shake||[]).forEach(w=>{const el=$(w==='p'?'#pav':'#opav');if(el){el.classList.add('hit')}})}
function battle(extra){return `<div class=arena id=arena>${arena()}</div><div id=tm class=timer></div><div class=bubs><div class="bub ob"><span id=bub></span></div><div class="bub pb" id=pbub hidden></div></div>${extra}`}
function type(el,txt,cb){clearInterval(typeId);let k=0;el.textContent='';typeId=every(()=>{el.textContent=txt.slice(0,++k);if(k%3==0)beep(700,.02);if(k>=txt.length){clearInterval(typeId);cb&&cb()}},18)}
function phase2(){return G.op.boss&&(G.side==='left'?G.anger:Math.max(G.anger,G.resp))>=50}
function turn(){clearInterval(timerId);const g=G;if(g.r>=g.rs.length)return g.op.unbeatable?end('lose',smokyClose()):end(g.side==='right'?'survive':'lose','You ran out of rounds!');
const R=g.rs[g.r];let claim=R[0];if(phase2())claim=BOSS_EXTRA[g.side][g.r%2]+' '+claim;
setBack(()=>pick(G.side));app.innerHTML=battle(`<div id=opts></div><div class=foot><small>Round ${g.r+1}/${g.rs.length}</small><button class=back2 onclick="pick(G.side)">← Back to Ladder</button></div>`);animBars();
type($('#bub'),claim,()=>{let opts;if(g.side==='left')opts=shuffle([['strong',R[2]],['medium',R[3]],['weak',R[4]],['fallacy',R[5]],['troll',R[6]]]);else opts=shuffle(R[1].map((o,k)=>['r'+k,o[0]]));
g.cur=opts;$('#opts').innerHTML=opts.map((o,k)=>`<button class=opt onclick="choose(${k})">${o[1]}</button>`).join('');
if(phase2()){let t=10;$('#tm').textContent='PHASE 2 · '+t+'s';timerId=every(()=>{t--;$('#tm').textContent='PHASE 2 · '+t+'s';if(t<=0){clearInterval(timerId);choose(-1)}},1000)}})}
function choose(k){clearInterval(timerId);const g=G,R=g.rs[g.r];if(g.busy)return;g.busy=true;g.picks++;let msg='';const b={a:g.anger,c:g.comp,r:g.resp};
document.querySelectorAll('#opts button').forEach(x=>x.disabled=true);
const said=k<0?'(silence)':g.cur[k][1];const pb=$('#pbub');if(pb){pb.hidden=false;pb.textContent=said}
if(g.op.unbeatable){g.allTroll=false;let line,o=null;if(k<0){g.anger+=20;line=WILSON_TIMEOUT}else{o=R[1][+g.cur[k][0].slice(1)];g.anger+=o[3]?0:o[2];line=WILSON_MOCKS[g.r][+g.cur[k][0].slice(1)]}g.resp=0;g.frus=1;
msg=`<h3>Logic Check</h3><p><b>Smoky Man isn't listening.</b> ${o&&!o[3]?`+${o[2]} your anger. `:k<0?'+20 your anger. ':''}Respect stays at 0. It always will.</p><p><i>${g.op.name}: "${line}"</i></p>`}
else if(k<0){g.allTroll=false;if(g.side==='left'){g.comp-=20;msg='Too slow! -20 composure.'}else{g.anger+=20;msg='Too slow! +20 anger.'}msg=`<h3>Logic Check</h3><p>${msg}</p>`}
else if(g.side==='left'){const t=g.cur[k][0];if(t!=='troll')g.allTroll=false;
if(t==='strong'){g.anger+=25;msg='Strong rebuttal! +25 anger.'}else if(t==='medium'){g.anger+=15;msg='Decent rebuttal. +15 anger.'}else if(t==='weak'){g.anger+=5;msg='Weak rebuttal. +5 anger.'}
else if(t==='fallacy'){g.comp-=20;msg='You used a fallacy yourself! -20 composure.'}
else{const a=10+Math.floor(Math.random()*21);g.anger+=a;if(Math.random()<.2){g.comp-=15;msg=`Troll! +${a} anger... but it BACKFIRED: -15 composure.`}else msg=`Troll landed! +${a} anger.`}
msg=`<h3>Logic Check</h3><p>Opponent used: <b>${R[1]}</b><br><small>${FALLACIES[R[1]]}</small></p><p>${msg}</p>`}
else{const o=R[1][+g.cur[k][0].slice(1)],best=R[1].find(x=>x[3]);g.allTroll=false;g.resp+=o[1];g.anger+=o[2];g.frus=o[3]?0:1;
msg=o[3]?`<h3>Logic Check</h3><p><b>Logical answer. +${o[1]} respect.</b></p><p><small>It worked because it answers the actual question with a specific, checkable claim instead of a slogan or an attack, so there is something real to agree or disagree with.</small></p><p><i>${g.op.name}: "${R[2]}"</i></p>`
:`<h3>Logic Check</h3><p><b>That was rhetoric, not an argument.</b> +${o[2]} your anger, +${o[1]} their respect.</p><p><small>It fell flat because it dodges the question (with emotion, an attack, or a vague slogan), so it gives them nothing to weigh.</small></p><p><small>Flaw in that kind of answer: <b>${R[3]}</b> (${FALLACIES[R[3]]})</small></p><p><small>The logical answer was: "${best[0]}"</small></p>`}
g.anger=Math.min(100,g.anger);g.resp=Math.min(100,g.resp);g.comp=Math.max(0,g.comp);beep(g.anger>=100?200:520,.15);g.r++;
const sh=[];if(g.side==='left'){if(g.anger>b.a)sh.push('o');if(g.comp<b.c)sh.push('p')}else{if(g.anger>b.a)sh.push('p');if(g.resp>b.r)sh.push('o')}refresh(sh);
later(()=>modal(msg,()=>{g.busy=false;if(g.side==='left'){if(g.anger>=100)return end('win');if(g.comp<=0)return end('lose','You lost your composure!')}else{if(g.anger>=100)return end('lose',g.op.unbeatable?smokyClose():'You lost your cool!');if(g.resp>=100&&!g.op.unbeatable)return end('respect')}turn()}),450)}
function modal(html,cb){const sid=SID,m=document.createElement('div');m.className='modal';m.innerHTML=`<div>${html}<button class=pri>Continue</button></div>`;m.querySelector('button').onclick=()=>{m.remove();if(sid===SID)cb()};document.body.appendChild(m)}
function end(res,why=''){clearInterval(timerId);const g=G;setBack(()=>pick(g.side));const won=res==='win'||res==='respect'||res==='survive';
if(won&&g.i===S.prog[g.side]&&S.prog[g.side]<5)S.prog[g.side]++;
const unlock=g.side==='left'&&g.allTroll&&g.picks>0&&!S.trump;if(unlock)S.trump=true;save();
const ck=CLIPS[opKey(g.op)],beatThem=(res==='win'||res==='respect')&&ck,mocked=g.op.unbeatable&&res==='lose';
const show=()=>{const t={win:'RAGE QUIT! You win!',lose:'Defeat',respect:'You earned their respect! You win!',survive:'You survived the debate.'}[res];
app.innerHTML=`<div class=arena id=arena>${arena(res==='win'?{o:'furious'}:{})}</div><h2 class=c>${t}</h2><p>${why}</p>${res==='win'?`<p>${g.op.name} storms off stage shouting about "the discourse."</p>`:''}<small>Score: rounds ${g.r}, respect ${g.resp}</small>
<button class=pri onclick="pick('${g.side}')">Back to Ladder</button><button onclick="goTitle()">Title</button>`;animBars();
if(res==='win')$('#opav').classList.add('melt');
if(unlock)later(reveal,600)};
if(beatThem){setBack(()=>pick(g.side));playClip(`assets/v/${ck}.mp4`,`assets/v/${ck}.jpg`,show)}
// Smoky Man's mock clip on every loss to him. If it fails to load, playClip's error fallback goes straight to show().
else if(mocked){setBack(()=>pick(g.side));playClip('assets/v/wilson_mock.mp4','assets/v/wilson_mock.jpg',show)}else show()}
function smokyClose(){return WILSON_CLOSERS[Math.floor(Math.random()*WILSON_CLOSERS.length)]}
function reveal(){playClip('assets/s/x3.mp4','assets/s/x4.jpg',revealBanner)}
function revealBanner(){setBack(()=>{const r=document.querySelector('.reveal');if(r)r.remove();themeOff();pick('left')});const r=document.createElement('div');r.className='reveal';r.innerHTML=`<div class=flash></div><div class=rv><div class=rb>A NEW CHALLENGER HAS APPEARED!</div><div class=drop>${portrait('trump','calm')}</div><h2>"Trump"</h2><p>You trolled through an entire debate. He noticed. He was impressed. He wants a turn.</p><button class=pri id=rvc>Continue</button></div>`;document.body.appendChild(r);themeOn(true);beep(880,.3);$('#rvc').onclick=()=>{r.remove();themeOff();pick('left')}}
// SECRET MODE: one round per opponent, auto-win, doesn't affect normal progress
function trumpStart(){stopAll();const side=Math.random()<.5?'left':'right';G={trump:true,side,i:0,ops:[...OPPONENTS.left.slice(0,4),OPPONENTS.left[4],OPPONENTS.right[4]],anger:0,resp:0,comp:100,r:0,rs:[0],deck:shuffle(TRUMP_RANTS)};trumpTurn()}
function trumpTurn(){const g=G;if(!g||!g.trump)return;themeOn();setBack(()=>pick(CS));g.op=g.ops[g.i];g.anger=0;g.pv=null;if(!g.deck.length)g.deck=shuffle(TRUMP_RANTS);const R=g.deck.pop();
app.innerHTML=battle(`<p class=c><small>Opponent ${g.i+1}/${g.ops.length}</small></p><div id=opts></div><div class=foot><button class=back2 onclick="pick(CS)">← Quit</button></div>`);animBars();
type($('#bub'),R[0],()=>{$('#opts').innerHTML=`<button class="pri opt" onclick="trumpHit(this)">${R[1]}</button>`})}
function trumpHit(btn){const g=G;if(!g||!g.trump||g.hit===g.i)return;g.hit=g.i;if(btn)btn.disabled=true;const pb=$('#pbub');if(pb&&btn){pb.hidden=false;pb.textContent=btn.textContent}g.anger=100;beep(150,.4);refresh(['o'],{o:'furious'});$('#opav').classList.add('melt');
later(()=>modal(`<h3>TOTAL MELTDOWN</h3><p>${g.op.name} has left the building.</p>`,()=>{g.i++;g.i<g.ops.length?trumpTurn():trumpEnd()}),1200)}
function trumpEnd(){themeOn();setBack(()=>pick(CS));app.innerHTML=`<h1>VICTORY LAP</h1><div class="big c">${portrait('trump','calm')}</div><p class=c>"Six for six. Nobody has ever won debates like this. People are crying, big strong debaters, crying. Thank you, thank you."</p><button class=pri onclick="vsTrump()">Run it again</button><button onclick="pick(CS)">Back</button><button onclick="goTitle()">Title</button>`}
goTitle();
addEventListener('resize',fitLabels);
