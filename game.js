const $=s=>document.querySelector(s),app=$('#app');
let S=JSON.parse(localStorage.getItem('la_save')||'{}');S.prog=S.prog||{left:0,right:0};S.sound=S.sound!==false;
const save=()=>localStorage.setItem('la_save',JSON.stringify(S));
let G=null,timerId=null,typeId=null;
function beep(f=440,d=.1){if(!S.sound)return;try{const c=window._ac||(window._ac=new(window.AudioContext||window.webkitAudioContext)()),o=c.createOscillator(),g=c.createGain();o.frequency.value=f;g.gain.value=.05;o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+d)}catch(e){}}
function avatar(color,face='😐',trump=false){return `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="${color}"/>${trump?'<path d="M14 38 Q50 0 88 34 L80 44 Q50 20 18 46Z" fill="#fcd34d"/><rect x="40" y="76" width="20" height="24" fill="#dc2626"/>':''}<text x="50" y="66" font-size="42" text-anchor="middle">${face}</text></svg>`}
function shuffle(a){return a.map(x=>[Math.random(),x]).sort((a,b)=>a[0]-b[0]).map(x=>x[1])}
function goTitle(){clearInterval(timerId);clearInterval(typeId);app.innerHTML=`<h1>LOGIC ARENA</h1><p style="text-align:center"><small>A satirical debate game.</small></p>
<button class="pri" onclick="pick('left')">🔵 Debate against the Left <small>(${S.prog.left}/5)</small></button>
<button class="pri" style="background:#dc2626" onclick="pick('right')">🔴 Debate against the Right <small>(${S.prog.right}/5)</small></button>
<h3>🔒 Secrets</h3>${S.trump?`<button onclick="trumpStart()">${avatar('#f97316','😎',true).replace('<svg','<svg width=50 height=50 style="vertical-align:middle"')} Play as "Trump" 🇺🇸</button>`:`<div class="row" style="align-items:center"><div class="sil" style="width:60px">${avatar('#888','?',true)}</div><small>??? — Finish a whole debate using only troll responses...</small></div>`}
<div class="row"><button onclick="glossary()">📖 Fallacy Glossary</button><button onclick="S.sound=!S.sound;save();goTitle()">${S.sound?'🔊':'🔇'} Sound</button></div>
<button onclick="if(confirm('Reset all progress?')){localStorage.removeItem('la_save');location.reload()}">↺ Restart / Reset Progress</button>`}
function glossary(){app.innerHTML=`<h2>📖 Fallacy Glossary</h2>${Object.entries(FALLACIES).map(([k,v])=>`<p><b>${k}</b><br><small>${v}</small></p>`).join('')}<button class="pri" onclick="goTitle()">Back</button>`}
function pick(side){clearInterval(timerId);clearInterval(typeId);const ops=OPPONENTS[side];app.innerHTML=`<h2>Debate against the ${side==="left"?"Left":"Right"}</h2>${ops.map((o,i)=>`<button ${i>S.prog[side]?'disabled':''} onclick="start('${side}',${i})">${i>S.prog[side]?'🔒':i<S.prog[side]?'✅':'⚔️'} <b>${o.name}</b> ${o.boss?'<span class=tag>BOSS</span>':''}<br><small>${o.title}</small></button>`).join('')}<button onclick="goTitle()">Back</button>`}
function rounds(side,i){const pool=side==='left'?LEFT_POOL:RIGHT_POOL,n=OPPONENTS[side][i].boss?12:8;const st=(i*4)%pool.length;let r=[];for(let k=0;k<n;k++)r.push(pool[(st+k)%pool.length]);return r}
function start(side,i){G={side,i,op:OPPONENTS[side][i],rs:rounds(side,i),r:0,anger:0,resp:0,comp:100,allTroll:true,picks:0};turn()}
function bars(){const g=G;if(g.trump)return `<div class=lbl><span>Opponent Anger</span><span>${g.anger}</span></div><div class="bar anger"><i style="width:${g.anger}%"></i></div>`;
return g.side==='left'?`<div class=lbl><span>${g.op.name} Anger</span><span>${g.anger}</span></div><div class="bar anger"><i style="width:${g.anger}%"></i></div><div class=lbl><span>Your Composure</span><span>${g.comp}</span></div><div class="bar comp"><i style="width:${g.comp}%"></i></div>`
:`<div class=lbl><span>Your Anger</span><span>${g.anger}</span></div><div class="bar anger"><i style="width:${g.anger}%"></i></div><div class=lbl><span>${g.op.name} Respect</span><span>${g.resp}</span></div><div class="bar resp"><i style="width:${g.resp}%"></i></div>`}
function stage(face){const g=G;return `<div class=stage><div class=pod>${g.trump?avatar('#f97316','😎',true):avatar('#64748b','🙂')}<br>${g.trump?'"Trump"':'You'}</div><div class="pod" id=opav>${avatar(g.op.color,face)}<br>${g.op.name}</div></div>`}
function type(el,txt,cb){clearInterval(typeId);let k=0;el.textContent='';typeId=setInterval(()=>{el.textContent=txt.slice(0,++k);if(k%3==0)beep(700,.02);if(k>=txt.length){clearInterval(typeId);cb&&cb()}},18)}
function phase2(){return G.op.boss&&(G.side==='left'?G.anger:Math.max(G.anger,G.resp))>=50}
function turn(){clearInterval(timerId);const g=G;if(g.r>=g.rs.length)return end(g.side==='right'?'survive':'lose','You ran out of rounds!');
const R=g.rs[g.r],face=g.anger>60?'😡':g.anger>30?'😠':'😐';let claim=R[0];if(phase2())claim=BOSS_EXTRA[g.side][g.r%2]+' '+claim;
app.innerHTML=`${stage(g.side==='right'?'🧐':face)}${bars()}<div id=tm class=timer></div><div class=bubble id=bub></div><div id=opts></div><small>Round ${g.r+1}/${g.rs.length}</small> <button onclick="pick(G.side)" style="width:auto;padding:6px 10px">← Back to Ladder</button>`;
type($('#bub'),claim,()=>{let opts;if(g.side==='left')opts=shuffle([['strong',R[2]],['medium',R[3]],['weak',R[4]],['fallacy',R[5]],['troll','🤡 '+R[6]]]);else opts=shuffle(R[1].map((o,k)=>['r'+k,o[0]]));
g.cur=opts;$('#opts').innerHTML=opts.map((o,k)=>`<button onclick="choose(${k})">${o[1]}</button>`).join('');
if(phase2()){let t=10;$('#tm').textContent='⏱ PHASE 2 — '+t+'s';timerId=setInterval(()=>{t--;$('#tm').textContent='⏱ PHASE 2 — '+t+'s';if(t<=0){clearInterval(timerId);choose(-1)}},1000)}})}
function choose(k){clearInterval(timerId);const g=G,R=g.rs[g.r];g.picks++;let msg='';
if(k<0){g.allTroll=false;if(g.side==='left'){g.comp-=20;msg='⏱ Too slow! -20 composure.'}else{g.anger+=20;msg='⏱ Too slow! +20 anger.'}}
else if(g.side==='left'){const t=g.cur[k][0];if(t!=='troll')g.allTroll=false;
if(t==='strong'){g.anger+=25;msg='💪 Strong rebuttal! +25 anger.'}else if(t==='medium'){g.anger+=15;msg='👍 Decent rebuttal. +15 anger.'}else if(t==='weak'){g.anger+=5;msg='😬 Weak rebuttal. +5 anger.'}
else if(t==='fallacy'){g.comp-=20;msg='🚫 You used a fallacy yourself! -20 composure.'}
else{const a=10+Math.floor(Math.random()*21);g.anger+=a;if(Math.random()<.2){g.comp-=15;msg=`🤡 Troll! +${a} anger... but it BACKFIRED: -15 composure.`}else msg=`🤡 Troll landed! +${a} anger.`}
msg=`<h3>🧠 Logic Check</h3><p>Opponent used: <b>${R[1]}</b><br><small>${FALLACIES[R[1]]}</small></p><p>${msg}</p>`}
else{const o=R[1][+g.cur[k][0].slice(1)];g.allTroll=false;g.resp+=o[1];g.anger+=o[2];msg=`<h3>🧠 Logic Check</h3><p>That was rhetoric, not an argument. +${o[2]} your anger, +${o[1]} their respect.</p>`}
g.anger=Math.min(100,g.anger);g.resp=Math.min(100,g.resp);g.comp=Math.max(0,g.comp);beep(g.anger>=100?200:520,.15);g.r++;
modal(msg,()=>{if(g.side==='left'){if(g.anger>=100)return end('win');if(g.comp<=0)return end('lose','You lost your composure!')}else{if(g.anger>=100)return end('lose','You lost your cool!');if(g.resp>=100)return end('respect')}turn()})}
function modal(html,cb){const m=document.createElement('div');m.className='modal';m.innerHTML=`<div>${html}<button class=pri>Continue</button></div>`;m.querySelector('button').onclick=()=>{m.remove();cb()};document.body.appendChild(m)}
function end(res,why=''){clearInterval(timerId);const g=G;const won=res==='win'||res==='respect'||res==='survive';
if(won&&g.i===S.prog[g.side]&&S.prog[g.side]<5)S.prog[g.side]++;
const unlock=g.side==='left'&&g.allTroll&&g.picks>0&&!S.trump;if(unlock)S.trump=true;save();
const t={win:'🔥 RAGE QUIT! You win!',lose:'💀 Defeat',respect:'🤝 You earned their respect!',survive:'😮‍💨 You survived the debate.'}[res];
app.innerHTML=`${stage(res==='win'?'🤯':'😏')}${bars()}<h2>${t}</h2><p>${why}</p>${res==='win'?`<p>${g.op.name} storms off stage screaming about "the discourse."</p>`:''}<small>Score: rounds ${g.r}, respect ${g.resp}</small>
<button class=pri onclick="pick('${g.side}')">Back to Ladder</button><button onclick="goTitle()">Title</button>`;
if(res==='win')$('#opav').classList.add('melt');
if(unlock)setTimeout(()=>modal(`<h2>⚡ A wild challenger has appeared...</h2><div style="text-align:center">${avatar('#f97316','😎',true)}</div><p>You trolled through a whole debate. <b>"Trump"</b> is now playable from the title screen Secrets!</p>`,()=>goTitle()),600)}
// TRUMP MODE: one round per opponent, auto-win, doesn't affect normal progress
function trumpStart(){const side=Math.random()<.5?'left':'right';G={trump:true,side,i:0,ops:[...OPPONENTS.left.slice(0,4),OPPONENTS.left[4],OPPONENTS.right[4]],anger:0,resp:0,comp:100,r:0,rs:[0]};trumpTurn()}
function trumpTurn(){const g=G;g.op=g.ops[g.i];g.anger=0;const sets=shuffle(TRUMP_RANTS).slice(0,3);const R=sets[0];
app.innerHTML=`${stage('😱')}${bars()}<p style="text-align:center"><small>Opponent ${g.i+1}/${g.ops.length}</small></p><div class=bubble id=bub></div><div id=opts></div><button onclick="goTitle()" style="width:auto;padding:6px 10px">← Quit</button>`;
type($('#bub'),R[0],()=>{$('#opts').innerHTML=`<button class=pri onclick="trumpHit()">🇺🇸 ${R[1]}</button>`})}
function trumpHit(){const g=G;g.anger=100;beep(150,.4);app.querySelector('.bar i').style.width='100%';$('#opav').classList.add('melt');$('#opav').innerHTML=avatar(g.op.color,'🤯')+'<br>MELTDOWN!';
setTimeout(()=>modal(`<h3>💥 TOTAL MELTDOWN</h3><p>${g.op.name} has left the building.</p>`,()=>{g.i++;g.i<g.ops.length?trumpTurn():trumpEnd()}),1200)}
function trumpEnd(){app.innerHTML=`<h1>🏆 VICTORY LAP</h1><div style="text-align:center">${avatar('#f97316','😎',true)}</div><p style="text-align:center">"Nobody has ever won debates like this. Six for six. People are saying it's the greatest debate run in history. Thank you, thank you!"</p><button class=pri onclick="trumpStart()">Run it again</button><button onclick="goTitle()">Title</button>`}
goTitle();
