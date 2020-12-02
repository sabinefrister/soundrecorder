(this.webpackJsonpsoundrecorder=this.webpackJsonpsoundrecorder||[]).push([[0],{51:function(e,t,a){},57:function(e,t,a){},61:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(17),i=a.n(o),c=(a(51),a(8)),s=a(9),l=a(6),u=a(11),d=a(10),h=a(69),m=a(63),p=a(64),b=a(65),g=a(66),v=a(67),f=a(40),R=a(46),w=(a(57),a(36)),E=a.n(w),y=a(41),O=a(24),S=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).getMicrophone=n.getMicrophone.bind(Object(l.a)(n)),n}return Object(s.a)(a,[{key:"getMicrophone",value:function(){var e=Object(y.a)(E.a.mark((function e(){var t;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,navigator.mediaDevices.getUserMedia({audio:!0,video:!1});case 3:t=e.sent,this.props.getStreamData(t),e.next=10;break;case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",this.props.getStreamData("error"));case 10:case"end":return e.stop()}}),e,this,[[0,7]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(O.a,{size:"lg",onClick:this.getMicrophone},"Allow microphone input"))}}]),a}(n.Component),j=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={duration:null,dateStart:null},n.refreshTimer=n.refreshTimer.bind(Object(l.a)(n)),n.displayDuration=n.displayDuration.bind(Object(l.a)(n)),n}return Object(s.a)(a,[{key:"displayDuration",value:function(e){var t=Math.floor(e/1e3),a=t%60,n=Math.floor(t/60)%60,r=Math.floor(t/60/60);return 1===a.toString().length&&(a="0".concat(a)),1===n.toString().length&&(n="0".concat(n)),1===r.toString().length&&(r="0".concat(r)),"".concat(r,":").concat(n,":").concat(a)}},{key:"refreshTimer",value:function(){var e=new Date-this.state.dateStart,t=this.displayDuration(e);this.setState({duration:t})}},{key:"componentDidUpdate",value:function(){var e=this;if(this.props.timerStarted&&null===this.state.dateStart){var t=new Date;this.setState({dateStart:t}),this.timerID=setInterval((function(){return e.refreshTimer()}),500)}}},{key:"componentWillUnmount",value:function(){clearInterval(this.timerID)}},{key:"render",value:function(){return r.a.createElement("div",{className:"timer"},r.a.createElement("h3",null,this.state.duration?this.state.duration:"00:00:00"))}}]),a}(n.Component),k=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={timerStarted:!1,idRecordButton:"",enableRecordButton:!0,enableStopButton:!0},n.startRecording=n.startRecording.bind(Object(l.a)(n)),n.stopRecording=n.stopRecording.bind(Object(l.a)(n)),n}return Object(s.a)(a,[{key:"componentDidMount",value:function(){this.audioContext=new(window.AudioContext||window.webkitAudioContext),this.source=this.audioContext.createMediaStreamSource(this.props.stream),this.gainNode=this.audioContext.createGain(),this.initialVol=.75,this.gainNode.gain.value=this.initialVol,this.source.connect(this.gainNode),this.mediaRecorder=new MediaRecorder(this.props.stream);var e=[];this.mediaRecorder.onstop=function(t){var a=prompt("Please enter a name for your sound clip.","Audio 1");null===a&&(a="Audio 1");var n=new Blob(e,{type:"audio/wave"});e=[];var r=URL.createObjectURL(n);this.props.getRecordedAudioURLAndFileName(r,"".concat(a,".wav"))}.bind(this),this.mediaRecorder.ondataavailable=function(t){e.push(t.data)},this.mediaRecorder.onError=function(e){this.props.getErrorFromRecorder(e.error.name)}}},{key:"componentWillUnmount",value:function(){this.source.disconnect()}},{key:"startRecording",value:function(){this.setState({timerStarted:!0,idRecordButton:"record",enableStopButton:!0,enableRecordButton:!1}),this.mediaRecorder.start()}},{key:"stopRecording",value:function(){this.mediaRecorder.stop(),this.setState({timerStarted:!1,idRecordButton:"",enableStopButton:!1,enableRecordButton:!0})}},{key:"render",value:function(){return r.a.createElement("div",{className:"recorder"},r.a.createElement(j,{timerStarted:this.state.timerStarted}),r.a.createElement(O.a,{size:"lg",className:"recordButton",id:this.state.idRecordButton,onClick:this.startRecording,disabled:!this.state.enableRecordButton},"Record"),r.a.createElement(O.a,{size:"lg",className:"stopButton",id:"stop",onClick:this.stopRecording,disabled:!this.state.enableStopButton},"Stop"))}}]),a}(n.Component),N=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h3",null,this.props.fileName),r.a.createElement("audio",{controls:!0,src:this.props.audioURL}))}}]),a}(n.Component),A=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(O.a,{size:"lg",href:this.props.audioURL,download:this.props.fileName},"Download this audio"))}}]),a}(n.Component),C=a(68),U=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={show:!1},n.onOK=n.onOK.bind(Object(l.a)(n)),n.handleClose=n.handleClose.bind(Object(l.a)(n)),n.handleShow=n.handleShow.bind(Object(l.a)(n)),n}return Object(s.a)(a,[{key:"onOK",value:function(){this.props.setNewRecording(),this.handleClose()}},{key:"handleClose",value:function(){this.setState({show:!1})}},{key:"handleShow",value:function(){this.setState({show:!0})}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(O.a,{className:"new-recording",size:"lg",onClick:this.handleShow},"Start a new recording"),r.a.createElement(C.a,{className:"new-recording",show:this.state.show,onHide:this.handleClose,centered:!0},r.a.createElement(C.a.Header,{closeButton:!0},r.a.createElement(C.a.Title,null,"Start a new Recording")),r.a.createElement(C.a.Body,null,"Did you save your previous recording? If yes, press OK. If not, please cancel and save it, if you want to keep it."),r.a.createElement(C.a.Footer,null,r.a.createElement(O.a,{className:"modal-button-cancel",onClick:this.handleClose},"Cancel"),r.a.createElement(O.a,{className:"modal-button-ok",onClick:this.onOK},"OK"))))}}]),a}(n.Component),D=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={audioURL:null,streamAvailable:!1,fileName:null,showAlert:!1,alertMessage:""},n.getStreamData=n.getStreamData.bind(Object(l.a)(n)),n.getRecordedAudioURLAndFileName=n.getRecordedAudioURLAndFileName.bind(Object(l.a)(n)),n.getErrorFromRecorder=n.getErrorFromRecorder.bind(Object(l.a)(n)),n.setNewRecording=n.setNewRecording.bind(Object(l.a)(n)),n}return Object(s.a)(a,[{key:"getStreamData",value:function(e){if("error"===e){this.setState({showAlert:!0,alertMessage:"It wasn't possible to access your microphone. Please reload this page and start again."})}else this.setState({stream:e,streamAvailable:!0})}},{key:"getRecordedAudioURLAndFileName",value:function(e,t){this.setState({audioURL:e,fileName:t})}},{key:"getErrorFromRecorder",value:function(e){var t="It wasn't possible to start a recording. ".concat(e);this.setState({showAlert:!0,alertMessage:t})}},{key:"setNewRecording",value:function(){this.setState({audioURL:null,fileName:null})}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(h.a,{variant:"dark"},r.a.createElement(h.a.Brand,null,r.a.createElement(f.a,{icon:R.a,className:"d-inline-block align-top"})," ","Record your voice")),r.a.createElement(m.a,{variant:"danger",show:this.state.showAlert},this.state.alertMessage),r.a.createElement(p.a,{className:"main-container"},r.a.createElement("h1",null,"Record audio and Download it to your computer"),r.a.createElement("p",null,"You can record anything you like with this simple sound recorder. After naming your file, you can download it to your computer."),r.a.createElement(b.a,null,!this.state.streamAvailable&&r.a.createElement(g.a,null,r.a.createElement(v.a,{className:"recorder"},r.a.createElement(S,{getStreamData:this.getStreamData}))),this.state.streamAvailable&&!this.state.fileName&&r.a.createElement(g.a,null,r.a.createElement(v.a,null,r.a.createElement(k,{stream:this.state.stream,getRecordedAudioURLAndFileName:this.getRecordedAudioURLAndFileName,getErrorFromRecorder:this.getErrorFromRecorder}))),this.state.audioURL&&r.a.createElement(g.a,null,r.a.createElement(v.a,{className:"player"},r.a.createElement("div",{className:"Player"},r.a.createElement(N,{audioURL:this.state.audioURL,fileName:this.state.fileName}),r.a.createElement(A,{audioURL:this.state.audioURL,fileName:this.state.fileName}),r.a.createElement(U,{setNewRecording:this.setNewRecording})))))))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(60);i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(D,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[61,1,2]]]);
//# sourceMappingURL=main.65420645.chunk.js.map