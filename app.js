const view=document.getElementById("view"),bar=document.getElementById("bar"),fill=document.getElementById("fill");
let path=[]; // [{id, i}] respuestas elegidas
const el=(h)=>{view.innerHTML=h;view.style.animation="none";view.offsetWidth;view.style.animation="";window.scrollTo({top:0,behavior:"smooth"});const f=view.querySelector("h1,h2");f&&(f.tabIndex=-1,f.focus({preventScroll:true}))};

function inicio(){path=[];bar.hidden=true;
 el(`<div class="hero"><div class="big">🧭</div><h1>¿Qué base de datos NoSQL necesito?</h1>
 <p class="mut">Responde unas preguntas sencillas sobre tu proyecto y te diremos cuál encaja mejor: MongoDB, Cassandra, Redis, Neo4j, CouchDB o DynamoDB.</p>
 <p class="mut">Sin tecnicismos. Solo toca la opción que más se parezca a tu caso.</p>
 <button class="btn" id="go">Empezar</button></div>`);
 document.getElementById("go").onclick=()=>pregunta("q1");}

function pregunta(id){const n=P[id],paso=path.length+1;
 bar.hidden=false;fill.style.width=Math.min(10+paso*10,90)+"%";
 bar.setAttribute("role","progressbar");bar.setAttribute("aria-label","Pregunta "+paso);
 el(`<span class="chip">${CONCEPTOS[n.c]}</span><span class="step">Pregunta ${paso}</span>
 <h2>${n.q}</h2><p class="mut">${n.h}</p>
 <div class="opts">${n.o.map((o,i)=>`<button class="opt" data-i="${i}"><b>${o[0]}</b><small>${o[1]}</small></button>`).join("")}</div>
 <button class="ghost" id="back">← ${path.length?"Volver":"Inicio"}</button>`);
 view.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{const i=+b.dataset.i;path.push({id,i});const s=n.o[i][2];RES[s]?resultado(s):pregunta(s)});
 document.getElementById("back").onclick=()=>{if(!path.length)return inicio();const u=path.pop();pregunta(u.id)};}

function resultado(k){const r=RES[k];bar.hidden=false;fill.style.width="100%";
 const rec=path.map(p=>{const n=P[p.id];return `<li style="--c:${r.col}"><span>${CONCEPTOS[n.c]}</span>${n.q}<br><b>→ ${n.o[p.i][0]}</b></li>`}).join("");
 el(`<div class="res-head"><div class="res-ic" style="background:${r.col}22">${r.ic}</div>
 <span class="chip">${k==="SQL"?"Resultado":"Te recomendamos"}</span><h1 style="color:${r.col}">${r.n}</h1><p class="mut">${r.t}</p></div>
 <div class="sec"><h3>💡 Por qué encaja con tu proyecto</h3><ul class="rs">${r.r.map(x=>`<li>${x}</li>`).join("")}</ul></div>
 <div class="sec"><h3>🧾 Tu recorrido y el informe</h3><ul class="rs path">${rec}</ul></div>
 ${r.e.length?`<div class="sec"><h3>🏢 Empresas que lo usan</h3><div class="co">${r.e.map(e=>`<div><b>${e[0]}</b><small>${e[1]}</small></div>`).join("")}</div></div>`:""}
 ${r.nota?`<div class="sec note">${r.nota}</div>`:""}
 <p class="sec"><a href="${r.s}" target="_blank" rel="noopener">📚 Documentación oficial</a></p>
 <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center"><button class="btn" id="re">Volver a empezar</button><button class="ghost" id="back">← Cambiar mi última respuesta</button></div>`);
 document.getElementById("re").onclick=inicio;
 document.getElementById("back").onclick=()=>{const u=path.pop();pregunta(u.id)};}
inicio();
