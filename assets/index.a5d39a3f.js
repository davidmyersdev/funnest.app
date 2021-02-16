import{r as e,o as t,c as o,a as s,w as i,F as n,b as a,p as r,d as l,e as c,f as h,g as d,v as p,h as u,i as m,j as g,k as w}from"./vendor.743f20f5.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(o){const s=new URL(e,location),i=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((o,n)=>{const a=new URL(e,s);if(self[t].moduleMap[a])return o(self[t].moduleMap[a]);const r=new Blob([`import * as m from '${a}';`,`${t}.moduleMap['${a}']=m;`],{type:"text/javascript"}),l=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(r),onerror(){n(new Error(`Failed to import: ${e}`)),i(l)},onload(){o(self[t].moduleMap[a]),i(l)}});document.head.appendChild(l)})),self[t].moduleMap={}}}("/assets/");const v={},f={class:"navbar navbar-expand-lg navbar-light bg-light"},b={class:"container-fluid"},x=a("Fun"),z=a("Doodle");v.render=function(a,r){const l=e("router-link"),c=e("router-view");return t(),o(n,null,[s("nav",f,[s("div",b,[s(l,{to:"/",class:"navbar-brand"},{default:i((()=>[x])),_:1}),s(l,{to:"/doodle"},{default:i((()=>[z])),_:1})])]),s(c)],64)};const S={name:"ButtonInputColor",props:{modelValue:{type:String,default:"#000000"}},emits:["update:modelValue"],methods:{update(e){this.$emit("update:modelValue",e.target.value)}}},y=c("data-v-881b1252");r("data-v-881b1252");const L={class:"position-relative"},C={class:"btn bg-white border-primary text-primary"},M=s("path",{d:"M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 .5.5v5.277l4.147-4.131a.5.5 0 0 1 .707 0l3.535 3.536a.5.5 0 0 1 0 .708L10.261 10H15.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5H3a2.99 2.99 0 0 1-2.121-.879A2.99 2.99 0 0 1 0 13.044m6-.21l7.328-7.3-2.829-2.828L6 7.188v5.647zM4.5 13a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0zM15 15v-4H9.258l-4.015 4H15zM0 .5v12.495z"},null,-1),P=s("path",{d:"M0 12.995V13a3.07 3.07 0 0 0 0-.005z"},null,-1);l();const E=y(((e,i,n,a,r,l)=>(t(),o("label",L,[s("input",{value:n.modelValue,onInput:i[1]||(i[1]=(...e)=>l.update&&l.update(...e)),type:"color",class:"btn position-absolute h-100 w-100 top-0 bottom-0 start-0 end-0"},null,40,["value"]),s("div",C,[(t(),o("svg",{style:{color:n.modelValue},xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"currentColor",class:"bi bi-palette2",viewBox:"0 0 16 16"},[M,P],4))])]))));S.render=E,S.__scopeId="data-v-881b1252";const R={name:"Canvas",components:{ButtonInputColor:S},data:()=>({color:"#000000",context:null,lines:[],size:5,minSize:5,maxSize:20,width:500,height:400,operation:"source-over",showTools:!0,showSizeSlider:!1}),props:{p2p:Object,default:{}},computed:{lastLine(){return this.lines.slice().reverse().find((e=>"self"===e.source))},lastPeerLine(){return this.lines.slice().reverse().find((e=>"peer"===e.source))},lastPoint(){return this.lastLine.points[this.lastLine.points.length-1]},lastPeerPoint(){return this.lastPeerLine.points[this.lastPeerLine.points.length-1]},erasing(){return"destination-out"===this.operation}},methods:{getCoords(e){const t=this.$refs.canvas.getBoundingClientRect();return{x:e.clientX-t.left,y:e.clientY-t.top}},reset(){this.lines=[],this.clear(),this.p2p.send({type:"reset"})},clear(){this.context.clearRect(0,0,this.$refs.canvas.width,this.$refs.canvas.height)},drawLine(e){const[t,...o]=e.points;this.drawStart(t,{color:e.color,operation:e.operation,size:e.size});let s=t;o.forEach((t=>{this.drawSeg(s,t,{color:e.color,operation:e.operation,size:e.size}),s=t})),this.context.stroke()},repaint(){this.clear(),this.lines.forEach(this.drawLine)},undo(){this.lines=this.lines.filter((e=>e!==this.lastLine)),this.repaint(),this.p2p.send({type:"undo"})},addLine(e){this.lines.push({source:"self",color:this.color,operation:this.operation,size:this.size,points:[e]}),this.p2p.send({type:"start",point:e,options:{color:this.color,operation:this.operation,size:this.size}}),this.drawStart(e,{size:this.size,color:this.color,operation:this.operation}),this.context.stroke()},addSeg(e){const t=this.lastPoint;this.lastLine.points.push(e),this.context.beginPath(),this.drawSeg(t,e,{size:this.size,color:this.color,operation:this.operation}),this.context.stroke(),this.context.closePath(),this.p2p.send({type:"move",point:e})},peerStart(e,t){this.lines.push({source:"peer",color:t.color,operation:t.operation,size:t.size,points:[e]}),this.drawStart(e,{size:t.size,color:t.color,operation:t.operation}),this.context.stroke()},peerMove(e){const t=this.lastPeerPoint;this.lastPeerLine.points.push(e),this.context.beginPath(),this.drawSeg(t,e,{size:this.lastPeerLine.size,color:this.lastPeerLine.color,operation:this.lastPeerLine.operation}),this.context.stroke(),this.context.closePath()},peerUndo(){this.lines=this.lines.filter((e=>e!==this.lastPeerLine)),this.repaint()},peerReset(){this.lines=[],this.clear()},drawSeg(e,t,{size:o,color:s,operation:i}){this.context.lineWidth=o,this.context.strokeStyle=s,this.context.fillStyle=s,this.context.lineCap="round",this.context.globalCompositeOperation=i,this.context.moveTo(e.x,e.y),this.context.lineTo(t.x,t.y)},drawStart(e,{size:t,color:o,operation:s}){this.context.lineWidth=t,this.context.strokeStyle=o,this.context.fillStyle=o,this.context.lineCap="round",this.context.globalCompositeOperation=s,this.context.moveTo(e.x,e.y),this.context.beginPath(),this.context.arc(e.x,e.y,t/2,0,2*Math.PI),this.context.closePath(),this.context.fill(),this.context.beginPath()},toggleEraser(e){this.operation=this.erasing?"source-over":"destination-out"},toggleSizeSlider(){this.showSizeSlider=!this.showSizeSlider},toggleTools(){this.showTools=!this.showTools}},mounted(){this.context=this.$refs.canvas.getContext("2d"),this.context.lineCap="round",this.context.globalCompositeOperation="source-over",this.context.translate(.5,.5),this.width=this.$refs.canvas.parentElement.clientWidth,this.height=this.$refs.canvas.parentElement.clientHeight;const e=e=>{const t=this.getCoords(e);this.addSeg(t)},t=e=>{if(1===e.touches.length){const t=this.getCoords(e.touches[0]);this.addSeg(t)}},o=e=>{const s=this.lastPoint;this.addSeg(s),window.removeEventListener("touchmove",t),window.removeEventListener("touchend",o)};this.$refs.canvas.addEventListener("mousedown",(t=>{const o=this.getCoords(t);this.addLine(o),window.addEventListener("mousemove",e),window.addEventListener("mouseup",(()=>{window.removeEventListener("mousemove",e)}))})),this.$refs.canvas.addEventListener("touchstart",(e=>{if(e.preventDefault(),1===e.touches.length){const s=this.getCoords(e.touches[0]);this.addLine(s),window.addEventListener("touchmove",t),window.addEventListener("touchend",o)}}))}},k={class:"position-relative border"},V={class:"position-absolute top-0 end-0 m-2 d-flex flex-column align-items-end"},O=s("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"currentColor",class:"bi bi-sliders",viewBox:"0 0 16 16"},[s("path",{"fill-rule":"evenodd",d:"M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"})],-1),T={key:0,class:"d-flex flex-column align-items-end"},A=s("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"currentColor",class:"bi bi-eraser",viewBox:"0 0 16 16"},[s("path",{d:"M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"})],-1),H=s("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"currentColor",class:"bi bi-arrow-counterclockwise",viewBox:"0 0 16 16"},[s("path",{"fill-rule":"evenodd",d:"M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"}),s("path",{d:"M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"})],-1),_={class:"d-flex align-items-center mt-1"},I={key:0,class:"d-flex align-items-center p-2 me-2 position-absolute end-100 bg-white rounded"},$=s("circle",{cx:"8",cy:"8",r:"8"},null,-1),B=s("circle",{cx:"8",cy:"8",r:"8"},null,-1),U=s("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"currentColor",class:"bi bi-toggle2-on",viewBox:"0 0 16 16"},[s("path",{d:"M7 5H3a3 3 0 0 0 0 6h4a4.995 4.995 0 0 1-.584-1H3a2 2 0 1 1 0-4h3.416c.156-.357.352-.692.584-1z"}),s("path",{d:"M16 8A5 5 0 1 1 6 8a5 5 0 0 1 10 0z"})],-1),D=s("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"currentColor",class:"bi bi-trash",viewBox:"0 0 16 16"},[s("path",{d:"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"}),s("path",{"fill-rule":"evenodd",d:"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"})],-1);R.render=function(i,n,a,r,l,c){const u=e("ButtonInputColor");return t(),o("div",k,[l.showSizeSlider?(t(),o("div",{key:0,onClick:n[1]||(n[1]=(...e)=>c.toggleSizeSlider&&c.toggleSizeSlider(...e)),class:"position-absolute top-0 bottom-0 start-0 end-0"})):h("",!0),s("div",V,[s("button",{onClick:n[2]||(n[2]=(...e)=>c.toggleTools&&c.toggleTools(...e)),class:"btn bg-white border-primary text-primary"},[O]),l.showTools?(t(),o("div",T,[s("button",{onClick:n[3]||(n[3]=(...e)=>c.toggleEraser&&c.toggleEraser(...e)),class:[{"active bg-danger text-white":c.erasing,"bg-white text-danger":!c.erasing},"btn border-danger mt-1"]},[A],2),s("button",{onClick:n[4]||(n[4]=(...e)=>c.undo&&c.undo(...e)),class:"btn bg-white border-primary text-primary mt-1"},[H]),s("div",_,[l.showSizeSlider?(t(),o("div",I,[(t(),o("svg",{style:{color:l.color},xmlns:"http://www.w3.org/2000/svg",width:l.minSize,height:l.minSize,fill:"currentColor",class:"bi bi-circle-fill",viewBox:"0 0 16 16"},[$],12,["width","height"])),d(s("input",{"onUpdate:modelValue":n[5]||(n[5]=e=>l.size=e),type:"range",min:"5",max:"20",class:"mx-2"},null,512),[[p,l.size]]),(t(),o("svg",{style:{color:l.color},xmlns:"http://www.w3.org/2000/svg",width:l.maxSize,height:l.maxSize,fill:"currentColor",class:"bi bi-circle-fill",viewBox:"0 0 16 16"},[B],12,["width","height"]))])):h("",!0),s("button",{onClick:n[6]||(n[6]=(...e)=>c.toggleSizeSlider&&c.toggleSizeSlider(...e)),class:"btn bg-white border-primary text-primary"},[U])]),s(u,{modelValue:l.color,"onUpdate:modelValue":n[7]||(n[7]=e=>l.color=e),class:"bg-white border-primary text-primary mt-1"},null,8,["modelValue"]),s("button",{onClick:n[8]||(n[8]=(...e)=>c.reset&&c.reset(...e)),class:"btn bg-white border-danger text-danger mt-1"},[D])])):h("",!0)]),s("canvas",{ref:"canvas",width:l.width,height:l.height,class:"d-block"},null,8,["width","height"])])};u.initializeApp({apiKey:"AIzaSyCnOVrq3mdje9MP8jQgif-x6AsYc0XNrJw",appId:"1:136870277088:web:83cd70a1198281acaf0585",authDomain:"funnest-app.firebaseapp.com",databaseURL:"https://funnest-app.firebaseio.com",measurementId:"G-0BJVSY3LH2",messagingSenderId:"136870277088",projectId:"funnest-app",storageBucket:"funnest-app.appspot.com"}),"localhost"===location.hostname&&(u.auth().useEmulator({}.VITE_APP_FIREBASE_EMULATOR_AUTH),u.firestore().useEmulator({}.VITE_APP_FIREBASE_EMULATOR_FIRESTORE_HOST,{}.VITE_APP_FIREBASE_EMULATOR_FIRESTORE_PORT));const j=window.RTCPeerConnection||webkitRTCPeerConnection||mozRTCPeerConnection;class F{constructor(){this.connection=new j({iceServers:[{urls:["stun:stun.l.google.com:19302"]}]}),this.onOpen=()=>{},this.onMessage=()=>{},this.channel=null}send(e){this.channel&&this.channel.send(JSON.stringify(e))}createOffer(){return this.channel=this.connection.createDataChannel("main"),this.channel.onopen=this.onOpen,this.channel.onmessage=e=>{this.onMessage(JSON.parse(e.data))},new Promise(((e,t)=>{this.connection.createOffer().then((e=>{this.connection.setLocalDescription(e)})),this.connection.onicecandidate=t=>{null===t.candidate&&e(this.connection.localDescription)}}))}acceptOffer(e){const t=new RTCSessionDescription(e);return this.connection.ondatachannel=e=>{this.channel=e.channel,this.channel.onopen=this.onOpen,this.channel.onmessage=e=>{this.onMessage(JSON.parse(e.data))}},new Promise(((e,o)=>{this.connection.onicecandidate=t=>{null===t.candidate&&e(this.connection.localDescription)},this.connection.setRemoteDescription(t),this.connection.createAnswer().then((e=>{this.connection.setLocalDescription(e)})).catch(o)}))}acceptAnswer(e){return this.connection.setRemoteDescription(new RTCSessionDescription(e))}}const J={name:"Doodle",components:{Canvas:R},data:()=>({p2p:null,room:{id:null}}),computed:{inviteLink(){return this.room.id?`${location.protocol}//${location.host}/doodle/${this.room.id}`:null}},methods:{async createRoom(){const e=await this.p2p.createOffer(),t=await u.firestore().collection("rooms").add({offer:{type:e.type,sdp:e.sdp}});this.room.id=t.id,t.onSnapshot((async e=>{const t=e.data();t.answer&&this.p2p.acceptAnswer(t.answer).catch(console.error)}))},onMessage(e){switch(e.type){case"start":this.$refs.canvas.peerStart(e.point,e.options);break;case"move":this.$refs.canvas.peerMove(e.point);break;case"undo":this.$refs.canvas.peerUndo();break;case"reset":this.$refs.canvas.peerReset()}}},async mounted(){if(this.p2p=new F,this.p2p.onMessage=this.onMessage,this.$route.params.roomId){const e=u.firestore().collection("rooms").doc(this.$route.params.roomId),t=(await e.get()).data();this.p2p.acceptOffer(t.offer).then((t=>{e.set({answer:{type:t.type,sdp:t.sdp}},{merge:!0})}))}}},N={class:"container"},W=s("h2",null,"Doodle",-1),Y={class:"mb-3"},X={class:"input-group mb-3"};J.render=function(i,n,a,r,l,c){const h=e("Canvas");return t(),o("div",N,[W,s("fieldset",Y,[s("div",X,[s("button",{onClick:n[1]||(n[1]=(...e)=>c.createRoom&&c.createRoom(...e)),type:"submit",class:"btn btn-primary"},"Create Room"),d(s("input",{"onUpdate:modelValue":n[2]||(n[2]=e=>c.inviteLink=e),type:"text",class:"form-control"},null,512),[[p,c.inviteLink]])])]),s(h,{ref:"canvas",p2p:l.p2p},null,8,["p2p"])])};const q={class:"container"},G=a("Doodle"),K={expose:[],setup:n=>(n,a)=>{const r=e("router-link");return t(),o("div",q,[s(r,{to:"/doodle"},{default:i((()=>[G])),_:1})])}},Q=m({history:g(),routes:[{path:"/",component:K},{path:"/doodle",component:J},{path:"/doodle/:roomId",component:J,props:!0}]}),Z=w(v);Z.use(Q),Z.mount("#app");
