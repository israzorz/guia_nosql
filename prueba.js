// node prueba.js  -> recorre todas las rutas y verifica el árbol
const fs=require("fs");eval(fs.readFileSync(__dirname+"/datos.js","utf8")+";global.P=P;global.RES=RES;");
const cnt={},len=[];let paths=0;
(function go(id,d,seen){ if(RES[id]){cnt[id]=(cnt[id]||0)+1;len.push(d);paths++;return;}
 if(!P[id])throw new Error("Nodo inexistente: "+id); if(seen.has(id))throw new Error("Ciclo en "+id);
 P[id].o.forEach(o=>go(o[2],d+1,new Set([...seen,id])));})("q1",0,new Set());
console.log("Rutas:",paths,"| preguntas por ruta:",Math.min(...len),"a",Math.max(...len));console.log(cnt);
