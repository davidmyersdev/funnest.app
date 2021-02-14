import{r as e,o as t,c as o,a as s,w as i,F as n,b as a,p as r,d as l,e as c,f as h,v as d,g as p,h as m,i as u,j as g,k as w}from"./vendor.94d7edc3.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(o){const s=new URL(e,location),i=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((o,n)=>{const a=new URL(e,s);if(self[t].moduleMap[a])return o(self[t].moduleMap[a]);const r=new Blob([`import * as m from '${a}';`,`${t}.moduleMap['${a}']=m;`],{type:"text/javascript"}),l=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(r),onerror(){n(new Error(`Failed to import: ${e}`)),i(l)},onload(){o(self[t].moduleMap[a]),i(l)}});document.head.appendChild(l)})),self[t].moduleMap={}}}("/assets/");const v={},f={class:"navbar navbar-expand-lg navbar-light bg-light"},b={class:"container-fluid"},x=a("Fun"),z=a("Doodle");v.render=function(a,r){const l=e("router-link"),c=e("router-view");return t(),o(n,null,[s("nav",f,[s("div",b,[s(l,{to:"/",class:"navbar-brand"},{default:i((()=>[x])),_:1}),s(l,{to:"/doodle"},{default:i((()=>[z])),_:1})])]),s(c)],64)};const S={name:"Canvas",data:()=>({color:"#000000",context:null,lines:[],size:5,minSize:5,maxSize:20,width:500,height:400,operation:"source-over",showTools:!0,showSizeSlider:!1}),props:{p2p:Object,default:{}},computed:{lastLine(){return this.lines[this.lines.length-1]},lastPoint(){return this.lastLine.points[this.lastLine.points.length-1]},erasing(){return"destination-out"===this.operation}},methods:{getCoords(e){const t=this.$refs.canvas.getBoundingClientRect();return{x:e.clientX-t.left,y:e.clientY-t.top}},reset(){this.lines=[],this.clear(),this.p2p.send({type:"reset"})},clear(){this.context.clearRect(0,0,this.$refs.canvas.width,this.$refs.canvas.height)},drawLine(e){const[t,...o]=e.points;this.drawStart(t,{color:e.color,operation:e.operation,size:e.size}),o.forEach(this.drawSeg),this.context.stroke()},repaint(){this.clear(),this.lines.forEach(this.drawLine)},undo(){this.lines=this.lines.slice(0,-1),this.repaint(),this.p2p.send({type:"undo"})},addLine(e){this.lines.push({color:this.color,operation:this.operation,size:this.size,points:[e]}),this.p2p.send({type:"start",point:e,options:{color:this.color,operation:this.operation,size:this.size}}),this.drawStart(e,{size:this.size,color:this.color,operation:this.operation}),this.context.stroke()},addSeg(e){this.lastLine.points.push(e),this.drawSeg(e),this.context.stroke(),this.p2p.send({type:"move",point:e})},peerStart(e,t){this.lines.push({color:t.color,operation:t.operation,size:t.size,points:[e]}),this.drawStart(e,{size:t.size,color:t.color,operation:t.operation}),this.context.stroke()},peerMove(e){this.lastLine.points.push(e),this.drawSeg(e),this.context.stroke()},peerUndo(){this.lines=this.lines.slice(0,-1),this.repaint()},peerReset(){this.lines=[],this.clear()},drawSeg(e){this.context.lineTo(e.x,e.y)},drawStart(e,{size:t,color:o,operation:s}){this.context.lineWidth=t,this.context.strokeStyle=o,this.context.fillStyle=o,this.context.lineCap="round",this.context.globalCompositeOperation=s,this.context.moveTo(e.x,e.y),this.context.beginPath(),this.context.arc(e.x,e.y,t/2,0,2*Math.PI),this.context.closePath(),this.context.fill(),this.context.beginPath()},toggleColorPicker(e){this.$refs.colorPicker===document.activeElement?this.$refs.colorPicker.blur():this.$refs.colorPicker.click()},toggleEraser(e){this.operation=this.erasing?"source-over":"destination-out"},toggleSizeSlider(){this.showSizeSlider=!this.showSizeSlider},toggleTools(){this.showTools=!this.showTools}},mounted(){this.context=this.$refs.canvas.getContext("2d"),this.context.lineCap="round",this.context.globalCompositeOperation="source-over",this.context.translate(.5,.5),this.width=this.$refs.canvas.parentElement.clientWidth,this.height=this.$refs.canvas.parentElement.clientHeight;const e=e=>{const t=this.getCoords(e);this.addSeg(t)},t=e=>{if(1===e.touches.length){const t=this.getCoords(e.touches[0]);this.addSeg(t)}},o=e=>{const s=this.lastPoint;this.addSeg(s),window.removeEventListener("touchmove",t),window.removeEventListener("touchend",o)};this.$refs.canvas.addEventListener("mousedown",(t=>{const o=this.getCoords(t);this.addLine(o),window.addEventListener("mousemove",e),window.addEventListener("mouseup",(()=>{window.removeEventListener("mousemove",e)}))})),this.$refs.canvas.addEventListener("touchstart",(e=>{if(e.preventDefault(),1===e.touches.length){const s=this.getCoords(e.touches[0]);this.addLine(s),window.addEventListener("touchmove",t),window.addEventListener("touchend",o)}}))}},y=p("data-v-ff9ed77c");r("data-v-ff9ed77c");const C={class:"position-relative border"},L={class:"position-absolute top-0 end-0 m-2 d-flex flex-column align-items-end"},k=s("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"currentColor",class:"bi bi-sliders",viewBox:"0 0 16 16"},[s("path",{"fill-rule":"evenodd",d:"M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"})],-1),E={key:0,class:"d-flex flex-column align-items-end"},M=s("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"currentColor",class:"bi bi-eraser",viewBox:"0 0 16 16"},[s("path",{d:"M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"})],-1),R=s("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"currentColor",class:"bi bi-arrow-counterclockwise",viewBox:"0 0 16 16"},[s("path",{"fill-rule":"evenodd",d:"M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"}),s("path",{d:"M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"})],-1),P={class:"d-flex align-items-center mt-1"},O={key:0,class:"d-flex align-items-center p-2 me-2 position-absolute end-100 bg-translucent rounded"},T=s("circle",{cx:"8",cy:"8",r:"8"},null,-1),$=s("circle",{cx:"8",cy:"8",r:"8"},null,-1),A=s("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"currentColor",class:"bi bi-toggle2-on",viewBox:"0 0 16 16"},[s("path",{d:"M7 5H3a3 3 0 0 0 0 6h4a4.995 4.995 0 0 1-.584-1H3a2 2 0 1 1 0-4h3.416c.156-.357.352-.692.584-1z"}),s("path",{d:"M16 8A5 5 0 1 1 6 8a5 5 0 0 1 10 0z"})],-1),H={class:"position-absolute overflow-hidden",style:{width:"0"}},_=s("path",{d:"M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 .5.5v5.277l4.147-4.131a.5.5 0 0 1 .707 0l3.535 3.536a.5.5 0 0 1 0 .708L10.261 10H15.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5H3a2.99 2.99 0 0 1-2.121-.879A2.99 2.99 0 0 1 0 13.044m6-.21l7.328-7.3-2.829-2.828L6 7.188v5.647zM4.5 13a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0zM15 15v-4H9.258l-4.015 4H15zM0 .5v12.495z"},null,-1),V=s("path",{d:"M0 12.995V13a3.07 3.07 0 0 0 0-.005z"},null,-1),I=s("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"currentColor",class:"bi bi-trash",viewBox:"0 0 16 16"},[s("path",{d:"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"}),s("path",{"fill-rule":"evenodd",d:"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"})],-1);l();const U=y(((e,i,n,a,r,l)=>(t(),o("div",C,[r.showSizeSlider?(t(),o("div",{key:0,onClick:i[1]||(i[1]=(...e)=>l.toggleSizeSlider&&l.toggleSizeSlider(...e)),class:"position-absolute top-0 bottom-0 start-0 end-0"})):c("",!0),s("div",L,[s("button",{onClick:i[2]||(i[2]=(...e)=>l.toggleTools&&l.toggleTools(...e)),class:"btn border-primary text-primary"},[k]),r.showTools?(t(),o("div",E,[s("button",{onClick:i[3]||(i[3]=(...e)=>l.toggleEraser&&l.toggleEraser(...e)),class:[{"active bg-danger text-white":l.erasing,"text-danger":!l.erasing},"btn border-danger mt-1"]},[M],2),s("button",{onClick:i[4]||(i[4]=(...e)=>l.undo&&l.undo(...e)),class:"btn border-primary text-primary mt-1"},[R]),s("div",P,[r.showSizeSlider?(t(),o("div",O,[(t(),o("svg",{style:{color:r.color},xmlns:"http://www.w3.org/2000/svg",width:r.minSize,height:r.minSize,fill:"currentColor",class:"bi bi-circle-fill",viewBox:"0 0 16 16"},[T],12,["width","height"])),h(s("input",{"onUpdate:modelValue":i[5]||(i[5]=e=>r.size=e),type:"range",min:"5",max:"20",class:"mx-2"},null,512),[[d,r.size]]),(t(),o("svg",{style:{color:r.color},xmlns:"http://www.w3.org/2000/svg",width:r.maxSize,height:r.maxSize,fill:"currentColor",class:"bi bi-circle-fill",viewBox:"0 0 16 16"},[$],12,["width","height"]))])):c("",!0),s("button",{onClick:i[6]||(i[6]=(...e)=>l.toggleSizeSlider&&l.toggleSizeSlider(...e)),class:"btn border-primary text-primary"},[A])]),s("button",{onClick:i[8]||(i[8]=(...e)=>l.toggleColorPicker&&l.toggleColorPicker(...e)),class:"btn border-primary text-primary mt-1"},[s("div",H,[h(s("input",{"onUpdate:modelValue":i[7]||(i[7]=e=>r.color=e),ref:"colorPicker",type:"color",class:"invisible"},null,512),[[d,r.color]])]),(t(),o("svg",{style:{color:r.color},xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"currentColor",class:"bi bi-palette2",viewBox:"0 0 16 16"},[_,V],4))]),s("button",{onClick:i[9]||(i[9]=(...e)=>l.reset&&l.reset(...e)),class:"btn border-danger text-danger mt-1"},[I])])):c("",!0)]),s("canvas",{ref:"canvas",width:r.width,height:r.height,class:"d-block"},null,8,["width","height"])]))));S.render=U,S.__scopeId="data-v-ff9ed77c";m.initializeApp({apiKey:"AIzaSyCnOVrq3mdje9MP8jQgif-x6AsYc0XNrJw",appId:"1:136870277088:web:83cd70a1198281acaf0585",authDomain:"funnest-app.firebaseapp.com",databaseURL:"https://funnest-app.firebaseio.com",measurementId:"G-0BJVSY3LH2",messagingSenderId:"136870277088",projectId:"funnest-app",storageBucket:"funnest-app.appspot.com"}),"localhost"===location.hostname&&(m.auth().useEmulator({}.VITE_APP_FIREBASE_EMULATOR_AUTH),m.firestore().useEmulator({}.VITE_APP_FIREBASE_EMULATOR_FIRESTORE_HOST,{}.VITE_APP_FIREBASE_EMULATOR_FIRESTORE_PORT));const B=window.RTCPeerConnection||webkitRTCPeerConnection||mozRTCPeerConnection;class D{constructor(){this.connection=new B({iceServers:[{urls:["stun:stun.l.google.com:19302"]}]}),this.onOpen=()=>{},this.onMessage=()=>{},this.channel=null}send(e){this.channel&&this.channel.send(JSON.stringify(e))}createOffer(){return this.channel=this.connection.createDataChannel("main"),this.channel.onopen=this.onOpen,this.channel.onmessage=e=>{this.onMessage(JSON.parse(e.data))},new Promise(((e,t)=>{this.connection.createOffer().then((e=>{this.connection.setLocalDescription(e)})),this.connection.onicecandidate=t=>{null===t.candidate&&e(this.connection.localDescription)}}))}acceptOffer(e){const t=new RTCSessionDescription(e);return this.connection.ondatachannel=e=>{this.channel=e.channel,this.channel.onopen=this.onOpen,this.channel.onmessage=e=>{this.onMessage(JSON.parse(e.data))}},new Promise(((e,o)=>{this.connection.onicecandidate=t=>{null===t.candidate&&e(this.connection.localDescription)},this.connection.setRemoteDescription(t),this.connection.createAnswer().then((e=>{this.connection.setLocalDescription(e)})).catch(o)}))}acceptAnswer(e){return this.connection.setRemoteDescription(new RTCSessionDescription(e))}}const j={name:"Doodle",components:{Canvas:S},data:()=>({p2p:null,room:{id:null}}),computed:{inviteLink(){return this.room.id?`${location.protocol}//${location.host}/doodle/${this.room.id}`:null}},methods:{async createRoom(){const e=await this.p2p.createOffer(),t=await m.firestore().collection("rooms").add({offer:{type:e.type,sdp:e.sdp}});this.room.id=t.id,t.onSnapshot((async e=>{const t=e.data();t.answer&&this.p2p.acceptAnswer(t.answer).catch(console.error)}))},onMessage(e){switch(e.type){case"start":this.$refs.canvas.peerStart(e.point,e.options);break;case"move":this.$refs.canvas.peerMove(e.point);break;case"undo":this.$refs.canvas.peerUndo();break;case"reset":this.$refs.canvas.peerReset()}}},async mounted(){if(this.p2p=new D,this.p2p.onMessage=this.onMessage,this.$route.params.roomId){const e=m.firestore().collection("rooms").doc(this.$route.params.roomId),t=(await e.get()).data();this.p2p.acceptOffer(t.offer).then((t=>{e.set({answer:{type:t.type,sdp:t.sdp}},{merge:!0})}))}}},F={class:"container"},J=s("h2",null,"Doodle",-1),N={class:"mb-3"},Y={class:"input-group mb-3"};j.render=function(i,n,a,r,l,c){const p=e("Canvas");return t(),o("div",F,[J,s("fieldset",N,[s("div",Y,[s("button",{onClick:n[1]||(n[1]=(...e)=>c.createRoom&&c.createRoom(...e)),type:"submit",class:"btn btn-primary"},"Create Room"),h(s("input",{"onUpdate:modelValue":n[2]||(n[2]=e=>c.inviteLink=e),type:"text",class:"form-control"},null,512),[[d,c.inviteLink]])])]),s(p,{ref:"canvas",p2p:l.p2p},null,8,["p2p"])])};const W={class:"container"},X=a("Doodle"),q={expose:[],setup:n=>(n,a)=>{const r=e("router-link");return t(),o("div",W,[s(r,{to:"/doodle"},{default:i((()=>[X])),_:1})])}},G=u({history:g(),routes:[{path:"/",component:q},{path:"/doodle",component:j},{path:"/doodle/:roomId",component:j,props:!0}]}),K=w(v);K.use(G),K.mount("#app");
