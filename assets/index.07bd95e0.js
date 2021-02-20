var e=Object.assign;import{r as t,o,c as s,a as n,w as i,b as r,f as a,t as c,d as l,e as d,v as h,g as u,h as p,i as m,n as g,j as v}from"./vendor.6bf1b89f.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(o){const s=new URL(e,location),n=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((o,i)=>{const r=new URL(e,s);if(self[t].moduleMap[r])return o(self[t].moduleMap[r]);const a=new Blob([`import * as m from '${r}';`,`${t}.moduleMap['${r}']=m;`],{type:"text/javascript"}),c=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(a),onerror(){i(new Error(`Failed to import: ${e}`)),n(c)},onload(){o(self[t].moduleMap[r]),n(c)}});document.head.appendChild(c)})),self[t].moduleMap={}}}("/assets/");const w={},f={class:"text-gray-700"},b={class:"bg-gray-100"},x={class:"container mx-auto flex justify-between font-bold p-4"},y=r("The Funnest App"),L=r("Doodle");w.render=function(e,r){const a=t("router-link"),c=t("router-view");return o(),s("div",f,[n("nav",b,[n("div",x,[n(a,{to:"/",class:"outline-none border-b-2 border-transparent focus:border-blue-300"},{default:i((()=>[y])),_:1}),n(a,{to:"/doodle",class:"outline-none border-b-2 border-transparent focus:border-blue-300"},{default:i((()=>[L])),_:1})])]),n(c)])};a.initializeApp({apiKey:"AIzaSyCnOVrq3mdje9MP8jQgif-x6AsYc0XNrJw",appId:"1:136870277088:web:83cd70a1198281acaf0585",authDomain:"funnest-app.firebaseapp.com",databaseURL:"https://funnest-app-default-rtdb.firebaseio.com/",measurementId:"G-0BJVSY3LH2",messagingSenderId:"136870277088",projectId:"funnest-app",storageBucket:"funnest-app.appspot.com"}),"localhost"===location.hostname&&(a.auth().useEmulator({}.VITE_APP_FIREBASE_EMULATOR_AUTH),a.database().useEmulator({}.VITE_APP_FIREBASE_EMULATOR_DATABASE_HOST,{}.VITE_APP_FIREBASE_EMULATOR_DATABASE_PORT),a.firestore().useEmulator({}.VITE_APP_FIREBASE_EMULATOR_FIRESTORE_HOST,{}.VITE_APP_FIREBASE_EMULATOR_FIRESTORE_PORT));const z={name:"Doodle",data:()=>({creating:!1,errorMessage:null}),methods:{async createRoom(){this.creating=!0;try{const e=await this.$store.dispatch("createRoom");this.$router.push({name:"doodle_room",params:{roomId:e.id}})}catch(e){this.errorMessage="An unknown error occurred.",this.creating=!1}}}},S={class:"container mx-auto p-4"},E={class:"flex flex-col items-center"},C={key:0,class:"flex items-center p-4 bg-yellow-100 w-full mb-4"},R=n("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"currentColor",class:"bi bi-exclamation-triangle-fill",viewBox:"0 0 16 16"},[n("path",{d:"M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"})],-1),M={class:"ml-4"};z.render=function(e,t,i,r,a,d){return o(),s("div",S,[n("fieldset",E,[a.errorMessage?(o(),s("div",C,[R,n("span",M,c(a.errorMessage),1)])):l("",!0),n("button",{onClick:t[1]||(t[1]=(...e)=>d.createRoom&&d.createRoom(...e)),disabled:a.creating,type:"submit",class:"rounded block w-1/2 bg-gray-100 border-2 border-gray-100 p-2 outline-none focus:outline-none focus:border-blue-300 active:bg-blue-300"},c(a.creating?"Creating...":"Create Room"),9,["disabled"])])])};const P={},I={class:"container mx-auto"};P.render=function(e,t){return o(),s("div",I)};const A={name:"Invite",props:{inviteId:String},async mounted(){const e=this.$store.state.rooms.find((e=>e.inviteId===this.inviteId))||await this.$store.dispatch("joinRoom",this.inviteId);this.$router.push({name:"doodle_room",params:{roomId:e.id}})}},T={class:"container mx-auto p-4"},_=n("p",null,"Looking for Room...",-1);A.render=function(e,t,n,i,r,a){return o(),s("div",T,[_])};class ${constructor(e){this.context=e.getContext("2d"),this.context.translate(.5,.5)}clear(){this.context.clearRect(0,0,this.context.canvas.width,this.context.canvas.height)}drawLine({points:e,options:t}){let[o,...s]=e;this.context.beginPath(),s.forEach((e=>{this.drawLinePath(o,e,t),o=e})),this.context.stroke()}drawLinePath(e,t,o){this.context.lineCap="round",this.context.fillStyle=o.color,this.context.globalCompositeOperation=o.operation,this.context.lineWidth=o.size,this.context.strokeStyle=o.color,this.context.moveTo(e.x,e.y),this.context.lineTo(t.x,t.y)}drawLines(e){e.forEach(this.drawLine,this)}fit(){this.context.canvas.width=this.context.canvas.parentElement.clientWidth,this.context.canvas.height=this.context.canvas.parentElement.clientHeight}}const k={name:"Canvas",data:()=>({canvas:null,color:"#000000",lines:[],size:5,minSize:5,maxSize:20,width:500,height:400,operation:"source-over",showTools:!0,showSizeSlider:!1}),props:{p2p:Object,default:{}},computed:{lastLine(){return this.lines.slice().reverse().find((e=>"self"===e.source))},lastPeerLine(){return this.lines.slice().reverse().find((e=>"peer"===e.source))},lastPoint(){return this.lastLine.points[this.lastLine.points.length-1]},lastPeerPoint(){return this.lastPeerLine.points[this.lastPeerLine.points.length-1]},erasing(){return"destination-out"===this.operation}},methods:{getCoords(e){const t=this.$refs.canvas.getBoundingClientRect();return{x:e.clientX-t.left,y:e.clientY-t.top}},reset(){this.lines=[],this.canvas.clear(),this.$store.state.peers.forEach((e=>{e.connection.send({type:"reset"})}))},repaint(){this.canvas.clear(),this.canvas.drawLines(this.lines)},undo(){this.lines=this.lines.filter((e=>e!==this.lastLine)),this.repaint(),this.$store.state.peers.forEach((e=>{e.connection.send({type:"undo"})}))},addLine(e){this.lines.push({source:"self",points:[e],options:{color:this.color,operation:this.operation,size:this.size}}),this.$store.state.peers.forEach((t=>{t.connection.send({type:"start",point:e,options:{color:this.color,operation:this.operation,size:this.size}})}))},addSeg(e){const[t,...o]=this.lastLine.points.slice().reverse();this.lastLine.points.push(e),this.canvas.drawLine({points:[t,e],options:{size:this.size,color:this.color,operation:this.operation}}),this.$store.state.peers.forEach((t=>{t.connection.send({type:"move",point:e})}))},peerStart(e,t){this.lines.push({source:"peer",points:[e],options:{color:t.color,operation:t.operation,size:t.size}})},peerMove(e){const t=this.lastPeerPoint;this.lastPeerLine.points.push(e),this.canvas.drawLine({points:[t,e],options:this.lastPeerLine.options})},peerUndo(){this.lines=this.lines.filter((e=>e!==this.lastPeerLine)),this.repaint()},peerReset(){this.lines=[],this.canvas.clear()},toggleEraser(e){this.operation=this.erasing?"source-over":"destination-out"},toggleSizeSlider(){this.showSizeSlider=!this.showSizeSlider},toggleTools(){this.showTools=!this.showTools}},mounted(){this.$nextTick((()=>{this.canvas=new $(this.$refs.canvas),this.canvas.fit(),window.addEventListener("resize",(()=>{this.canvas.fit(),this.repaint()}));const e=e=>{const t=this.getCoords(e);this.addSeg(t)},t=o=>{const s=this.getCoords(o);this.addSeg(s),window.removeEventListener("mousemove",e),window.removeEventListener("mouseup",t)},o=e=>{if(1===e.touches.length){const t=this.getCoords(e.touches[0]);this.addSeg(t)}},s=e=>{if(1===e.touches.length){const t=this.getCoords(e.touches[0]);this.addSeg(t)}window.removeEventListener("touchmove",o),window.removeEventListener("touchend",s)};this.$refs.canvas.addEventListener("mousedown",(o=>{const s=this.getCoords(o);this.addLine(s),window.addEventListener("mousemove",e),window.addEventListener("mouseup",t)})),this.$refs.canvas.addEventListener("touchstart",(e=>{if(e.preventDefault(),1===e.touches.length){const t=this.getCoords(e.touches[0]);this.addLine(t),window.addEventListener("touchmove",o),window.addEventListener("touchend",s)}}))}))}},O={class:"relative rounded border-2 border-gray-100"},H={class:"absolute top-0 right-0 m-2 flex flex-col"},V=n("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"currentColor",class:"bi bi-sliders",viewBox:"0 0 16 16"},[n("path",{"fill-rule":"evenodd",d:"M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"})],-1),U={key:0,class:"flex flex-col align-items-end"},B=n("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"currentColor",class:"bi bi-eraser",viewBox:"0 0 16 16"},[n("path",{d:"M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"})],-1),D=n("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"currentColor",class:"bi bi-arrow-counterclockwise",viewBox:"0 0 16 16"},[n("path",{"fill-rule":"evenodd",d:"M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"}),n("path",{d:"M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"})],-1),j={class:"flex mt-1 relative"},F=n("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"currentColor",class:"bi bi-toggle2-on",viewBox:"0 0 16 16"},[n("path",{d:"M7 5H3a3 3 0 0 0 0 6h4a4.995 4.995 0 0 1-.584-1H3a2 2 0 1 1 0-4h3.416c.156-.357.352-.692.584-1z"}),n("path",{d:"M16 8A5 5 0 1 1 6 8a5 5 0 0 1 10 0z"})],-1),J={key:0,class:"border rounded flex items-center p-2 mr-2 absolute right-full bg-white top-0 bottom-0 focus-within:ring"},N=n("circle",{cx:"8",cy:"8",r:"8"},null,-1),Y=n("circle",{cx:"8",cy:"8",r:"8"},null,-1),W={class:"border rounded bg-white p-3 focus-within:outline-none focus-within:ring relative mt-1"},X=n("path",{d:"M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 .5.5v5.277l4.147-4.131a.5.5 0 0 1 .707 0l3.535 3.536a.5.5 0 0 1 0 .708L10.261 10H15.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5H3a2.99 2.99 0 0 1-2.121-.879A2.99 2.99 0 0 1 0 13.044m6-.21l7.328-7.3-2.829-2.828L6 7.188v5.647zM4.5 13a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0zM15 15v-4H9.258l-4.015 4H15zM0 .5v12.495z"},null,-1),q=n("path",{d:"M0 12.995V13a3.07 3.07 0 0 0 0-.005z"},null,-1),G=n("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"currentColor",class:"bi bi-trash",viewBox:"0 0 16 16"},[n("path",{d:"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"}),n("path",{"fill-rule":"evenodd",d:"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"})],-1);k.render=function(e,t,i,r,a,c){return o(),s("div",O,[a.showSizeSlider?(o(),s("div",{key:0,onClick:t[1]||(t[1]=(...e)=>c.toggleSizeSlider&&c.toggleSizeSlider(...e)),class:"absolute top-0 bottom-0 left-0 right-0"})):l("",!0),n("div",H,[n("button",{onClick:t[2]||(t[2]=(...e)=>c.toggleTools&&c.toggleTools(...e)),class:"border rounded bg-white p-3 focus:outline-none focus:ring"},[V]),a.showTools?(o(),s("div",U,[n("button",{onClick:t[3]||(t[3]=(...e)=>c.toggleEraser&&c.toggleEraser(...e)),class:[{"active bg-red-500 border-red-500 text-white":c.erasing,"bg-white text-red-500 border-red-300":!c.erasing},"border rounded bg-white p-3 focus:outline-none focus:ring mt-1"]},[B],2),n("button",{onClick:t[4]||(t[4]=(...e)=>c.undo&&c.undo(...e)),class:"border rounded bg-white p-3 focus:outline-none focus:ring mt-1"},[D]),n("div",j,[n("button",{onClick:t[5]||(t[5]=(...e)=>c.toggleSizeSlider&&c.toggleSizeSlider(...e)),class:"border rounded bg-white p-3 focus:outline-none focus:ring"},[F]),a.showSizeSlider?(o(),s("div",J,[(o(),s("svg",{style:{color:a.color},xmlns:"http://www.w3.org/2000/svg",width:a.minSize,height:a.minSize,fill:"currentColor",class:"bi bi-circle-fill",viewBox:"0 0 16 16"},[N],12,["width","height"])),d(n("input",{"onUpdate:modelValue":t[6]||(t[6]=e=>a.size=e),type:"range",min:"5",max:"20",class:"mx-2 rounded focus:outline-none"},null,512),[[h,a.size]]),(o(),s("svg",{style:{color:a.color},xmlns:"http://www.w3.org/2000/svg",width:a.maxSize,height:a.maxSize,fill:"currentColor",class:"bi bi-circle-fill",viewBox:"0 0 16 16"},[Y],12,["width","height"]))])):l("",!0)]),n("label",W,[d(n("input",{"onUpdate:modelValue":t[7]||(t[7]=e=>a.color=e),type:"color",class:"absolute h-full w-full top-0 bottom-0 left-0 right-0 focus:outline-none opacity-0"},null,512),[[h,a.color]]),(o(),s("svg",{style:{color:a.color},xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"currentColor",class:"bi bi-palette2",viewBox:"0 0 16 16"},[X,q],4))]),n("button",{onClick:t[8]||(t[8]=(...e)=>c.reset&&c.reset(...e)),class:"border rounded bg-white text-red-500 border-red-300 p-3 focus:outline-none focus:ring mt-1"},[G])])):l("",!0)]),n("canvas",{ref:"canvas",width:a.width,height:a.height,class:"block"},null,8,["width","height"])])};const K={name:"Room",components:{Canvas:k},props:{roomId:String},computed:{inviteLink(){if(this.room){const{href:e}=this.$router.resolve({name:"doodle_invite",params:{inviteId:this.room.inviteId}});return e?`${location.protocol}//${location.host}${e}`:null}},room(){return this.$store.state.rooms.find((e=>e.id===this.roomId))}},methods:{copyInvite(){this.$refs.invite.select(),document.execCommand("copy")},onMessage(e){switch(e.type){case"start":this.$refs.canvas.peerStart(e.point,e.options);break;case"move":this.$refs.canvas.peerMove(e.point);break;case"undo":this.$refs.canvas.peerUndo();break;case"reset":this.$refs.canvas.peerReset()}}},async created(){if(!this.room)return this.$router.push({name:"doodle"});this.$store.commit("addHandler",(e=>{this.onMessage(e)}))}},Q={class:"container mx-auto p-4"},Z={class:"flex"};K.render=function(e,i,r,a,c,l){const u=t("Canvas");return o(),s("div",Q,[n("fieldset",Z,[d(n("input",{ref:"invite","onUpdate:modelValue":i[1]||(i[1]=e=>l.inviteLink=e),type:"text",class:"rounded-l block bg-white border-2 border-gray-100 p-2 flex-grow outline-none focus:border-blue-300",readonly:""},null,512),[[h,l.inviteLink]]),n("button",{onClick:i[2]||(i[2]=(...e)=>l.copyInvite&&l.copyInvite(...e)),type:"submit",class:"rounded-r block bg-gray-100 border-2 border-gray-100 p-2 outline-none focus:outline-none focus:border-blue-300 active:bg-blue-300"},"Copy Invite")]),n(u,{ref:"canvas",class:"mt-2"},null,512)])};const ee=u({history:p(),routes:[{path:"/",component:P},{name:"doodle",path:"/doodle",component:z},{name:"doodle_invite",path:"/doodle/invites/:inviteId",component:A,props:!0},{name:"doodle_room",path:"/doodle/rooms/:roomId",component:K,props:!0}]}),te=window.RTCPeerConnection||webkitRTCPeerConnection||mozRTCPeerConnection;class oe{constructor(){this.connection=new te({iceServers:[{urls:["stun:stun.l.google.com:19302"]}]}),this.onOpen=()=>{},this.onMessage=()=>{},this.channel=null}send(e){this.channel&&this.channel.send(JSON.stringify(e))}createOffer(){return this.channel=this.connection.createDataChannel("main"),this.channel.onopen=this.onOpen,this.channel.onmessage=e=>{this.onMessage(JSON.parse(e.data))},new Promise(((e,t)=>{this.connection.createOffer().then((e=>{this.connection.setLocalDescription(e)})),this.connection.onicecandidate=t=>{null===t.candidate&&e(this.connection.localDescription)}}))}acceptOffer(e){const t=new RTCSessionDescription(e);return this.connection.ondatachannel=e=>{this.channel=e.channel,this.channel.onopen=this.onOpen,this.channel.onmessage=e=>{this.onMessage(JSON.parse(e.data))}},new Promise(((e,o)=>{this.connection.onicecandidate=t=>{null===t.candidate&&e(this.connection.localDescription)},this.connection.setRemoteDescription(t),this.connection.createAnswer().then((e=>{this.connection.setLocalDescription(e)})).catch(o)}))}acceptAnswer(e){return this.connection.setRemoteDescription(new RTCSessionDescription(e))}}const se=()=>new Promise(((e,t)=>{a.auth().onAuthStateChanged((t=>{t&&e(t)}))})),ne=m({state:()=>({handlers:[],peers:[],rooms:[],user:null}),mutations:{addHandler(e,t){e.handlers.push(t)},addMember(e,{member:t,room:o}){e.rooms.find((e=>e.id===o.id)).members.push(t)},addPeer(e,t){e.peers.push(t)},addRoom(e,t){e.rooms.push(t)},setUser(e,t){e.user=t}},actions:{async connectToPeer(e,{id:t}){const o=await se(),s=a.database().ref(`peers/${t}`).push(),n=new oe,i=await n.createOffer();s.set({offer:{type:i.type,sdp:i.sdp},peerId:o.uid}),n.onMessage=t=>{e.state.handlers.forEach((e=>e(t)))},s.on("value",(e=>{e.val()&&e.val().answer&&(n.acceptAnswer(e.val().answer),s.remove())}));const r={id:t,connection:n};e.commit("addPeer",r)},connectToPeers:async(e,t)=>Promise.all(t.map((t=>e.dispatch("connectToPeer",t)))),async createRoom(t){const o=await se(),s={members:[{id:o.uid}],ownerId:o.uid},n=await a.firestore().collection("rooms").add(s),i=e({id:g(6),inviteId:n.id},s);return t.commit("addRoom",i),t.dispatch("listenForPeers"),i},async joinRoom(e,t){const o=await se(),s=a.firestore().collection("rooms").doc(t),n=await s.get(),i={id:o.uid},r=n.data(),c={id:g(6),inviteId:n.id,members:[...r.members,i],ownerId:r.ownerId};return s.set({members:a.firestore.FieldValue.arrayUnion(i)},{merge:!0}),e.commit("addRoom",c),e.dispatch("connectToPeers",r.members),e.dispatch("listenForPeers"),c},async listenForPeers(e){const t=await se(),o=a.database().ref(`peers/${t.uid}`);o.remove(),o.on("child_added",(async o=>{if(o.val().offer){const s=new oe,n=a.database().ref(`peers/${t.uid}/${o.key}`),i=await s.acceptOffer(o.val().offer),r={id:o.val().peerId,connection:s};n.set({answer:{type:i.type,sdp:i.sdp},peerId:t.uid}),s.onMessage=t=>{e.state.handlers.forEach((e=>e(t)))},e.commit("addPeer",r)}}))}}});a.auth().signInAnonymously(),a.auth().onAuthStateChanged((e=>{e&&ne.commit("setUser",e)}));const ie=v(w);ie.use(ee),ie.use(ne),ie.mount("#app");
