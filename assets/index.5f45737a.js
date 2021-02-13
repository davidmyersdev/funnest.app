import{r as e,o as t,c as n,a as s,w as i,F as o,b as a,d as r,e as c,v as l,f as h,g as d,h as u}from"./vendor.f37572c2.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(n){const s=new URL(e,location),i=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((n,o)=>{const a=new URL(e,s);if(self[t].moduleMap[a])return n(self[t].moduleMap[a]);const r=new Blob([`import * as m from '${a}';`,`${t}.moduleMap['${a}']=m;`],{type:"text/javascript"}),c=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(r),onerror(){o(new Error(`Failed to import: ${e}`)),i(c)},onload(){n(self[t].moduleMap[a]),i(c)}});document.head.appendChild(c)})),self[t].moduleMap={}}}("/assets/");const m={},p={class:"navbar navbar-expand-lg navbar-light bg-light"},f={class:"container-fluid"},v=a("Fun"),w=a("Doodle");m.render=function(a,r){const c=e("router-link"),l=e("router-view");return t(),n(o,null,[s("nav",p,[s("div",f,[s(c,{to:"/",class:"navbar-brand"},{default:i((()=>[v])),_:1}),s(c,{to:"/doodle"},{default:i((()=>[w])),_:1})])]),s(l)],64)};const g=window.RTCPeerConnection||webkitRTCPeerConnection||mozRTCPeerConnection;class b{constructor(){this.connection=new g({iceServers:[{urls:["stun:stun.l.google.com:19302"]}]}),this.onOpen=()=>{},this.onMessage=()=>{},this.channel=null}send(e){this.channel&&this.channel.send(JSON.stringify(e))}createOffer(){return this.channel=this.connection.createDataChannel("main"),this.channel.onopen=this.onOpen,this.channel.onmessage=e=>{this.onMessage(JSON.parse(e.data))},new Promise(((e,t)=>{this.connection.createOffer().then((e=>{this.connection.setLocalDescription(e)})),this.connection.onicecandidate=t=>{null===t.candidate&&e(this.connection.localDescription)}}))}acceptOffer(e){const t=new RTCSessionDescription(e);return this.connection.ondatachannel=e=>{this.channel=e.channel,this.channel.onopen=this.onOpen,this.channel.onmessage=e=>{this.onMessage(JSON.parse(e.data))}},new Promise(((e,n)=>{this.connection.onicecandidate=t=>{null===t.candidate&&e(this.connection.localDescription)},this.connection.setRemoteDescription(t),this.connection.createAnswer().then((e=>{this.connection.setLocalDescription(e)})).catch(n)}))}acceptAnswer(e){this.connection.setRemoteDescription(new RTCSessionDescription(e))}}const x={data:()=>({p2p:null,myOffer:"",myAnswer:"",theirOffer:"",theirAnswer:"",starting:!1,join:!1,context:null}),methods:{createOffer(){this.p2p.createOffer().then((e=>{this.myOffer=btoa(JSON.stringify(e))}))},acceptOffer(){this.p2p.acceptOffer(JSON.parse(atob(this.theirOffer))).then((e=>{this.myAnswer=btoa(JSON.stringify(e))}))},acceptAnswer(){this.p2p.acceptAnswer(JSON.parse(atob(this.theirAnswer)))},startSession(){this.starting=!0,this.createOffer()},joinSession(){this.join=!0},acceptRequest(){this.acceptOffer()},onMessage(e){if(e)switch(e.message){case"start":this.start(e.value.x,e.value.y);break;case"move":this.move(e.value.x,e.value.y)}},start(e,t){this.context.moveTo(e,t),this.context.beginPath(),this.context.stroke()},startPeer(e,t){this.p2p.send({message:"start",value:{x:e,y:t}})},move(e,t){this.context.lineTo(e,t),this.context.stroke()},movePeer(e,t){this.p2p.send({message:"move",value:{x:e,y:t}})}},mounted(){this.p2p=new b,this.p2p.onMessage=this.onMessage;const e=e=>{const t=this.$refs.canvas.getBoundingClientRect();return[e.clientX-t.left,e.clientY-t.top]};this.context=this.$refs.canvas.getContext("2d");const t=t=>{const[n,s]=e(t);this.move(n,s),this.movePeer(n,s)};this.$refs.canvas.addEventListener("mousedown",(n=>{const[s,i]=e(n);this.start(s,i),this.startPeer(s,i),window.addEventListener("mousemove",t),window.addEventListener("mouseup",(()=>{window.removeEventListener("mousemove",t)}))}))}},y={class:"container"},S={key:0},L={key:1},O={class:"mb-3"},C=s("label",{class:"form-label"},"Your Request",-1),R=s("div",{class:"form-text"},"Send this to a friend.",-1),A={class:"mb-3"},E=s("label",{class:"form-label"},"Their Answer",-1),k=s("div",{class:"form-text"},"Get this from a friend.",-1),P={key:2},$={class:"mb-3"},j=s("label",{class:"form-label"},"Their Request",-1),U=s("div",{class:"form-text"},"Send this to a friend.",-1),M={class:"mb-3"},z=s("label",{class:"form-label"},"Your Answer",-1),D=s("div",{class:"form-text"},"Get this from a friend.",-1),T={ref:"canvas",width:"500",height:"500"};x.render=function(e,i,o,a,h,d){return t(),n("div",y,[h.starting||h.join?r("",!0):(t(),n("div",S,[s("button",{onClick:i[1]||(i[1]=(...e)=>d.startSession&&d.startSession(...e)),class:"btn btn-primary"},"Start Session"),s("button",{onClick:i[2]||(i[2]=(...e)=>d.joinSession&&d.joinSession(...e)),class:"btn btn-secondary ms-1"},"Join Session")])),h.starting?(t(),n("div",L,[s("div",O,[C,c(s("input",{"onUpdate:modelValue":i[3]||(i[3]=e=>h.myOffer=e),type:"text",class:"form-control"},null,512),[[l,h.myOffer]]),R]),s("div",A,[E,c(s("input",{"onUpdate:modelValue":i[4]||(i[4]=e=>h.theirAnswer=e),type:"text",class:"form-control"},null,512),[[l,h.theirAnswer]]),k]),s("button",{onClick:i[5]||(i[5]=(...e)=>d.acceptAnswer&&d.acceptAnswer(...e)),class:"btn btn-secondary ms-1"},"Accept Answer")])):r("",!0),h.join?(t(),n("div",P,[s("div",$,[j,c(s("input",{"onUpdate:modelValue":i[6]||(i[6]=e=>h.theirOffer=e),type:"text",class:"form-control"},null,512),[[l,h.theirOffer]]),U]),s("div",M,[z,c(s("input",{"onUpdate:modelValue":i[7]||(i[7]=e=>h.myAnswer=e),type:"text",class:"form-control"},null,512),[[l,h.myAnswer]]),D]),s("button",{onClick:i[8]||(i[8]=(...e)=>d.acceptRequest&&d.acceptRequest(...e)),class:"btn btn-secondary ms-1"},"Accept Request")])):r("",!0),s("canvas",T,null,512)])};const J={name:"Canvas",data:()=>({color:"#000000",context:null,lines:[],size:1,width:500,height:500}),computed:{lastLine(){return this.lines[this.lines.length-1]},lastPoint(){return this.lastLine.points[this.lastLine.points.length-1]}},methods:{getCoords(e){const t=this.$refs.canvas.getBoundingClientRect();return{x:e.clientX-t.left,y:e.clientY-t.top}},reset(){this.lines=[],this.clear()},clear(){this.context.clearRect(0,0,this.$refs.canvas.width,this.$refs.canvas.height)},drawLine(e){const[t,...n]=e.points;this.drawStart(t,{size:e.size,color:e.color}),n.forEach(this.drawSeg)},repaint(){this.clear(),this.lines.forEach(this.drawLine)},undo(){this.lines=this.lines.slice(0,-1),this.repaint()},addLine(e){this.lines.push({color:this.color,size:this.size,points:[e]}),this.drawStart(e,{size:this.size,color:this.color})},addSeg(e){this.lastLine.points.push(e),this.drawSeg(e)},drawSeg(e){this.context.lineTo(e.x,e.y),this.context.stroke()},drawStart(e,{size:t,color:n}){this.context.lineWidth=t,this.context.strokeStyle=n,this.context.fillStyle=n,this.context.lineCap="round",this.context.moveTo(e.x,e.y),this.context.beginPath(),this.context.arc(e.x,e.y,t/2,0,2*Math.PI),this.context.closePath(),this.context.fill(),this.context.beginPath(),this.context.stroke()}},mounted(){this.context=this.$refs.canvas.getContext("2d"),this.context.lineCap="round",this.context.translate(.5,.5),this.width=this.$refs.canvas.parentElement.clientWidth,this.height=this.$refs.canvas.parentElement.clientHeight;const e=e=>{const t=this.getCoords(e);this.addSeg(t)},t=e=>{if(1===e.touches.length){const t=this.getCoords(e.touches[0]);this.addSeg(t)}},n=e=>{const s=this.lastPoint;this.addSeg(s),window.removeEventListener("touchmove",t),window.removeEventListener("touchend",n)};this.$refs.canvas.addEventListener("mousedown",(t=>{const n=this.getCoords(t);this.addLine(n),window.addEventListener("mousemove",e),window.addEventListener("mouseup",(()=>{window.removeEventListener("mousemove",e)}))})),this.$refs.canvas.addEventListener("touchstart",(e=>{if(e.preventDefault(),1===e.touches.length){const s=this.getCoords(e.touches[0]);this.addLine(s),window.addEventListener("touchmove",t),window.addEventListener("touchend",n)}}))}},N={class:"d-flex align-items-center justify-content-between my-3"};J.render=function(e,i,o,a,r,h){return t(),n("div",null,[s("div",N,[s("button",{onClick:i[1]||(i[1]=(...e)=>h.undo&&h.undo(...e)),class:"btn btn-sm btn-primary"},"Undo"),s("button",{onClick:i[2]||(i[2]=(...e)=>h.reset&&h.reset(...e)),class:"btn btn-sm btn-danger ms-1"},"Clear"),c(s("input",{"onUpdate:modelValue":i[3]||(i[3]=e=>r.size=e),type:"range",min:"1",max:"10"},null,512),[[l,r.size]]),c(s("input",{"onUpdate:modelValue":i[4]||(i[4]=e=>r.color=e),type:"color"},null,512),[[l,r.color]])]),s("canvas",{ref:"canvas",width:r.width,height:r.height},null,8,["width","height"])])};const q={class:"container"},V={expose:[],setup:e=>(e,i)=>(t(),n("div",q,[s(J)]))},_=h({history:d(),routes:[{path:"/",component:V},{path:"/doodle",component:x}]}),F=u(m);F.use(_),F.mount("#app");
