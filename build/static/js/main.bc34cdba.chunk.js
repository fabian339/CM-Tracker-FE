(this["webpackJsonpcm-tracker"]=this["webpackJsonpcm-tracker"]||[]).push([[0],{108:function(e,t,a){e.exports=a(148)},113:function(e,t,a){},148:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(10),i=a.n(l),o=(a(113),a(17)),c=a(13),s=a(19),m=a(20),u=a(21),g=a(15),d=a(189),p=a(18),h=a.n(p),E=function(e){return function(t){t({type:"LOADING_ADMIN"}),h.a.get("/admin/".concat(e)).then((function(e){t({type:"SET_ADMIN",payload:e.data})})).catch((function(e){t({type:"SET_UNAUTHENTICATED_ADMIN"})}))}},f=function(){return function(e){localStorage.removeItem("FBIdToken"),localStorage.removeItem("fullname"),e({type:"SET_UNAUTHENTICATED_ADMIN"}),delete h.a.defaults.headers.common.Authorization,localStorage.removeItem("role")}},y=function(e,t,a){var n="Bearer ".concat(e);localStorage.setItem("FBIdToken",n),localStorage.setItem("role",t),localStorage.setItem("fullname",a),h.a.defaults.headers.common.Authorization=n},b=a(184),S=a(188),T=a(190),v=a(191),A=a(87),x=a.n(A),I=a(52).Link,C={navContainer:{backgroundColor:"mediumturquoise"},navButtons:{fontSize:"initial",color:"dimgray",fontWeight:"600"},title:{flexGrow:1},menuItem:{fontSize:"13px",fontWeight:"600",color:"dimgray"}},O=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={anchorEl:null,open:!1},a.handleClick=function(e){a.setState({open:!0,anchorEl:e.currentTarget})},a.handleRequestClose=function(e){console.log("Nav",e),a.setState({open:!1})},a.handleLogOut=function(){console.log("logout called"),a.props.logoutUser()},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.authenticatedAdmin;return r.a.createElement(b.a,null,r.a.createElement(S.a,{style:C.navContainer},r.a.createElement(d.a,{variant:"h6",style:C.title},r.a.createElement(T.a,{style:C.navButtons,color:"inherit",component:I,to:"/"},"CM-Tracker")),e?r.a.createElement(n.Fragment,null,r.a.createElement(T.a,{style:C.navButtons,color:"inherit",component:I,to:"/signatures/".concat(localStorage.fullname)},"View Signatures"),r.a.createElement(v.a,{title:"Log Out","aria-label":"add"},r.a.createElement(T.a,{style:{color:"dimgray"},onClick:this.handleLogOut,component:I,to:"/"},r.a.createElement(x.a,null)))):r.a.createElement(n.Fragment,null,r.a.createElement(T.a,{style:C.navButtons,color:"inherit",component:I,to:"/signatures"},"Signatures"),r.a.createElement(T.a,{style:C.navButtons,color:"inherit",component:I,to:"/login"},"Login"))))}}]),t}(n.Component),k=Object(g.b)((function(e){return{authenticatedAdmin:e.user.authenticatedAdmin,user:e.user}}),{logoutUser:f})(O),w=a(8),D=a(88),N=a.n(D),j={textField:{margin:"10px auto 10px auto",width:"80%"},logoContainer:{marginTop:"80px",textAlign:"center"},pageTitle:{marginTop:"-10px",marginBottom:"10px",textAlign:"center",background:"-webkit-linear-gradient(#eee, #333)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},button:{marginTop:20,width:250,position:"relative",margin:"auto 15%"},form:{textAlign:"center"},progress:{position:"absolute",color:"chartreuse",width:"40px",height:"40px"},customError:{color:"red",fontSize:"1rem",marginTop:10}},_=a(192),R=a(201),U=a(193),z=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(s.a)(this,Object(m.a)(t).call(this))).handleSubmit=function(t){t.preventDefault();var a={email:e.state.email,password:e.state.password};e.props.loginFunc(a,e.props.history)},e.handleChange=function(t){e.setState(Object(w.a)({},t.target.name,t.target.value))},e.state={email:"",password:"",errors:[]},e}return Object(u.a)(t,e),Object(c.a)(t,[{key:"UNSAFE_componentWillReceiveProps",value:function(e){e.UI.errors&&this.setState({errors:e.UI.errors})}},{key:"render",value:function(){var e=this.props.UI.loading,t=this.state.errors;return r.a.createElement(_.a,null,r.a.createElement("header",null,r.a.createElement("div",{style:j.logoContainer},r.a.createElement("img",{src:N.a,alt:"icon",style:{width:250}})),r.a.createElement(d.a,{variant:"h4",style:j.pageTitle},"Log In")),r.a.createElement(_.a,{container:!0},r.a.createElement(_.a,{item:!0,sm:!0}),r.a.createElement(_.a,{item:!0,sm:!0},r.a.createElement("form",{noValidate:!0,onSubmit:this.handleSubmit,style:j.form},r.a.createElement(R.a,{required:!0,id:"email",name:"email",type:"email",label:"Email",style:j.textField,helperText:t.email,error:!!t.email,value:this.state.email,onChange:this.handleChange,fullWidth:!0}),r.a.createElement(R.a,{required:!0,id:"password",name:"password",type:"password",label:"Password",style:j.textField,helperText:t.password,error:!!t.password,value:this.state.password,onChange:this.handleChange,fullWidth:!0}),t.general&&r.a.createElement(d.a,{variant:"body2",style:j.customError},t.general),r.a.createElement(T.a,{type:"submit",variant:"contained",color:"primary",style:j.button}," Login",e&&r.a.createElement(U.a,{size:30,style:j.progress})))),r.a.createElement(_.a,{item:!0,sm:!0})))}}]),t}(n.Component),W=Object(g.b)((function(e){return{UI:e.UI}}),{loginFunc:function(e,t){return function(a){a({type:"LOADING_UI"}),h.a.post("/login",e).then((function(e){y(e.data.token,e.data.role,e.data.fullname),"admin"===e.data.role&&(a(E(e.data.fullname)),a({type:"SET_AUTHENTICATED_ADMIN"}),a({type:"CLEAR_ERRORS"}),t.push("timesheets/".concat(e.data.fullname)))})).catch((function(e){a({type:"SET_ERRORS",payload:e.response.data})}))}}})(z),L=a(2),F=a(39),B=a(4),M=a.n(B),G=function(e){var t=e.component,a=e.authenticatedAdmin,n=Object(L.a)(e,["component","authenticatedAdmin"]);return r.a.createElement(F.d,Object.assign({},n,{render:function(e){return!0===a?r.a.createElement(t,e):r.a.createElement(F.c,{to:"/UNAUTHORIZED"})}}))};G.prototype={admin:M.a.object};var P=Object(g.b)((function(e){return{authenticatedAdmin:e.user.authenticatedAdmin}}))(G),H=a(89),Y=a.n(H),V=(a(80),a(14)),q={width:"200px",bottom:"45px",marginLeft:"50px",color:"white",borderRadius:"20px"},K={pageTitle:{marginTop:"90px",marginBottom:"40px",textAlign:"center"},container:{marginTop:"-10px"},adminBtn:Object(V.a)({},q,{backgroundColor:"darkblue"}),progress:{position:"absolute",color:"chartreuse",width:"40px",height:"40px"},userBtn:Object(V.a)({},q,{backgroundColor:"darkmagenta"}),clientBtn:Object(V.a)({},q,{backgroundColor:"darkgoldenrod"}),onBtnHover:Object(V.a)({},q,{backgroundImage:"linear-gradient(to bottom right, red, yellow)",color:"black"}),btnDetails:{width:"200px",marginLeft:"50px",marginTop:"-30px"},logoContainer:{marginTop:"80px",textAlign:"center"}},J=a(46),Z=a(202),$=function(e){var t=e.options,a=e.name,n=e.value,l=e.onInputChange,i=e.label,o=e.style,c=e.helperText,s=e.error;return r.a.createElement(Z.a,{options:t,value:n,onInputChange:l,name:a,renderInput:function(e){return r.a.createElement(R.a,Object.assign({},e,{required:!0,label:i,margin:"normal",variant:"outlined",style:o,helperText:c,error:s,InputProps:Object(V.a)({},e.InputProps,{type:"search"})}))}})},Q=["Bernardez, Leandra","Camara, Fatoumata","Colson, Sheryll","Jonas, Kemar","Kabir, Tahamina","Kamat, Havzert","Lora, Yaire","Love, Mariah","Melendez, Charlie ","Mullings, Raeheem","Pichardo, Marco","Robinson, Tytana ","Robinson, Kaeem","Rosario, Bryanna","Wally, Amie"],X=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(s.a)(this,Object(m.a)(t).call(this))).handleSubmit=function(t){if(t.preventDefault(),null!=Q.find((function(t){return t===e.state.name}))){var a={name:e.state.name,actType:e.state.actType,numberofCalls:parseInt(e.state.numberofCalls)};e.props.checkInOut(a,e.props.history)}else{var n={name:"Please select your name from the list."};e.setState({errors:n})}},e.handleChange=function(t){e.setState(Object(w.a)({},t.target.name,t.target.value))},e.handleActivityType=function(t,a){e.setState({actType:a})},e.handleSelectName=function(t,a){e.setState({name:a})},e.state={name:"",actType:"",numberofCalls:0,message:"",errors:{}},e}return Object(u.a)(t,e),Object(c.a)(t,[{key:"UNSAFE_componentWillReceiveProps",value:function(e){e.UI.errors&&this.setState({errors:e.UI.errors})}},{key:"render",value:function(){var e,t=this.state.errors,a=this.props.data,n=a.loading,l=a.message;return r.a.createElement(J.Flash,null,r.a.createElement(_.a,{container:!0},r.a.createElement(_.a,{item:!0,sm:!0}),r.a.createElement(_.a,{item:!0,sm:8},r.a.createElement(d.a,{variant:"h4",style:K.pageTitle},"NDA INTERNS TIMESHEET"),r.a.createElement("form",{noValidate:!0,onSubmit:this.handleSubmit,style:K.form},r.a.createElement($,{options:Q,onInputChange:this.handleSelectName,name:"name",label:"Select participant name.",style:{width:"40%",margin:"20px 30%"},helperText:t.name,error:!!t.name,value:this.state.name}),r.a.createElement($,{options:["Clock-in","Clock-out"],onInputChange:this.handleActivityType,name:"actType",label:"Select to clock-in or clock-out?",style:{width:"40%",margin:"20px 30%"},helperText:t.actType,error:!!t.actType,value:this.state.actType}),"Clock-out"===this.state.actType&&r.a.createElement(R.a,(e={required:!0,id:"numberofCalls",name:"numberofCalls",type:"numberofCalls",onChange:this.handleChange,variant:"outlined"},Object(w.a)(e,"type","number"),Object(w.a)(e,"label","Enter number of calls:"),Object(w.a)(e,"style",{width:"40%",margin:"20px 30%"}),Object(w.a)(e,"value",this.state.numberofCalls),e)),r.a.createElement(T.a,{type:"submit",variant:"contained",color:"primary",style:{width:"40%",margin:"20px 30%"},disabled:!1}," Submit",n&&r.a.createElement(U.a,{size:30,style:K.progress})),r.a.createElement("br",null),t.message&&r.a.createElement(d.a,{variant:"h6",style:{textAlign:"center",color:"red"}},t.message),r.a.createElement(d.a,{variant:"h6",style:{textAlign:"center",color:"blue"}},l.message))),r.a.createElement(_.a,{item:!0,sm:!0})))}}]),t}(n.Component),ee=Object(g.b)((function(e){return{data:e.data,UI:e.UI}}),{checkInOut:function(e,t){return function(t){t({type:"LOADING_DATA"}),h.a.post("/eshTimesheet",e).then((function(e){t({type:"SET_MESSAGE",payload:e.data}),setInterval((function(){window.location.reload()}),3e3)})).catch((function(e){t({type:"SET_ERRORS",payload:e.response.data}),t({type:"SET_MESSAGE",payload:[]})}))}}})(X),te=a(196),ae=a(200),ne=a(199),re=a(195),le=a(197),ie=a(198),oe=a(149),ce=a(45),se=a(31),me=a.n(se),ue=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(s.a)(this,Object(m.a)(t).call(this))).onDownloadClick=function(){window.confirm("Are you sure you want to delete this database?")&&h.a.delete("/cleanDatabase").then((function(e){setInterval((function(){window.location.reload()}),3e3)})).catch((function(e){console.log(e)}))},e.onReportClick=function(t){var a=0;e.state.filterName?(e.state.completed.forEach((function(t){t.name===e.state.filterName&&(a+=parseFloat(t.duration))})),alert("".concat(e.state.filterName," have worked ").concat(a.toFixed(2)," hours."))):alert("Please select a name!")},e.handleFilterDate=function(t){e.setState({filterDate:me()(t.target.value).format("MMMM D YYYY")})},e.handleSelectName=function(t,a){e.setState({filterName:a})},e.handleFilterBy=function(t,a){e.setState({filterBy:a})},e.state={completed:[],pending:[],filtered:[],filterBy:"",filterName:"",filterDate:""},e}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.history,a=e.match.params.fullname;this.props.getActivities(a,t)}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){var t=e.data.activities,a=t.completed,n=t.pending;t.loading;a&&n&&this.setState({completed:a,pending:n})}},{key:"render",value:function(){var e=this.props.data.loading,t=this.state,a=t.completed,l=t.pending,i=t.filterBy,o=t.filterName,c=t.filterDate;return r.a.createElement(re.a,{component:oe.a,style:{margin:"4.5% auto",width:1100,display:"table"}},e?r.a.createElement(U.a,{size:100,style:{margin:"auto 50%"}}):r.a.createElement(n.Fragment,null,r.a.createElement(ce.CSVLink,{data:a,filename:"timesheet-".concat(me()().tz("America/New_York").format("L"),".csv"),target:"_blank",onClick:this.onDownloadClick},r.a.createElement("p",{style:{textAlign:"center"}}," Delete DB ")),r.a.createElement($,{options:["Name","Date"],onInputChange:this.handleFilterBy,name:"filterBy",label:"FILTER BY",style:{width:"30%",margin:"10px 35%"},value:this.state.filterBy}),"Name"===i&&r.a.createElement(n.Fragment,null,r.a.createElement($,{options:Q,onInputChange:this.handleSelectName,name:"filterName",label:"Select participant name.",style:{width:"30%",margin:"10px 35%"},value:this.state.name}),""!=o&&r.a.createElement(n.Fragment,null,r.a.createElement(T.a,{variant:"outlined",color:"primary",onClick:this.onReportClick,style:{width:"15%",margin:"10px 42.5%"}},"Report"),r.a.createElement(d.a,{variant:"h4",style:{marginTop:"40px",marginBottom:"40px",textAlign:"center"}},"FILTERED TIMESHEET (",me()().tz("America/New_York").format("L"),")"),r.a.createElement(ce.CSVLink,{data:a.filter((function(e){return e.name===o})),filename:"timesheet-".concat(o),target:"_blank"},r.a.createElement("p",{style:{textAlign:"center"}},"Download Participant Report")),r.a.createElement(te.a,{"aria-label":"simple table",style:{backgroundColor:"lightsteelblue"}},r.a.createElement(le.a,null,r.a.createElement(ie.a,null,r.a.createElement(ne.a,{style:{fontWeight:"bolder",fontSize:"20px"}},"Name"),r.a.createElement(ne.a,{align:"right",style:{fontWeight:"bolder",fontSize:"20px"}},"Date"),r.a.createElement(ne.a,{align:"right",style:{fontWeight:"bolder",fontSize:"20px"}},"Time-in"),r.a.createElement(ne.a,{align:"right",style:{fontWeight:"bolder",fontSize:"20px"}},"Time-out"),r.a.createElement(ne.a,{align:"right",style:{fontWeight:"bolder",fontSize:"20px"}},"Duration"),r.a.createElement(ne.a,{align:"right",style:{fontWeight:"bolder",fontSize:"20px"}},"#Calls"),r.a.createElement(ne.a,{align:"right",style:{fontWeight:"bolder",fontSize:"20px"}},"Status"))),r.a.createElement(ae.a,null,a.filter((function(e){return e.name===o})).map((function(e){return r.a.createElement(ie.a,{key:e.name},r.a.createElement(ne.a,{component:"th",scope:"row"},e.name),r.a.createElement(ne.a,{align:"right"},e.date),r.a.createElement(ne.a,{align:"right"},e.timeIn),r.a.createElement(ne.a,{align:"right"},e.timeOut),r.a.createElement(ne.a,{align:"right"},e.duration),r.a.createElement(ne.a,{align:"right"},e.numberofCalls),r.a.createElement(ne.a,{align:"right"},e.status))})))))),"Date"===i&&r.a.createElement(n.Fragment,null,r.a.createElement(R.a,{id:"date",label:"Choose Date",type:"date",name:"filterDate",onChange:this.handleFilterDate,variant:"outlined",style:{width:"20%",margin:"10px 40%"},InputLabelProps:{shrink:!0}}),""!=c&&r.a.createElement(n.Fragment,null,r.a.createElement(d.a,{variant:"h4",style:{marginTop:"40px",marginBottom:"40px",textAlign:"center"}},"FILTERED TIMESHEET (",me()().tz("America/New_York").format("L"),")"),r.a.createElement(ce.CSVLink,{data:a.filter((function(e){return e.date===c})),filename:"timesheet-".concat(c),target:"_blank"},r.a.createElement("p",{style:{textAlign:"center"}},"Download ",c," Report")),r.a.createElement(te.a,{"aria-label":"simple table",style:{backgroundColor:"lightsteelblue"}},r.a.createElement(le.a,null,r.a.createElement(ie.a,null,r.a.createElement(ne.a,{style:{fontWeight:"bolder",fontSize:"20px"}},"Name"),r.a.createElement(ne.a,{align:"right",style:{fontWeight:"bolder",fontSize:"20px"}},"Date"),r.a.createElement(ne.a,{align:"right",style:{fontWeight:"bolder",fontSize:"20px"}},"Time-in"),r.a.createElement(ne.a,{align:"right",style:{fontWeight:"bolder",fontSize:"20px"}},"Time-out"),r.a.createElement(ne.a,{align:"right",style:{fontWeight:"bolder",fontSize:"20px"}},"Duration"),r.a.createElement(ne.a,{align:"right",style:{fontWeight:"bolder",fontSize:"20px"}},"#Calls"),r.a.createElement(ne.a,{align:"right",style:{fontWeight:"bolder",fontSize:"20px"}},"Status"))),r.a.createElement(ae.a,null,a.filter((function(e){return e.date===c})).map((function(e){return r.a.createElement(ie.a,{key:e.name},r.a.createElement(ne.a,{component:"th",scope:"row"},e.name),r.a.createElement(ne.a,{align:"right"},e.date),r.a.createElement(ne.a,{align:"right"},e.timeIn),r.a.createElement(ne.a,{align:"right"},e.timeOut),r.a.createElement(ne.a,{align:"right"},e.duration),r.a.createElement(ne.a,{align:"right"},e.numberofCalls),r.a.createElement(ne.a,{align:"right"},e.status))})))))),r.a.createElement(d.a,{variant:"h4",style:{marginTop:"40px",marginBottom:"40px",textAlign:"center"}},"NDA REPORT TIMESHEET (",me()().tz("America/New_York").format("L"),")"),r.a.createElement(ce.CSVLink,{data:a,filename:"timesheet-".concat(me()().tz("America/New_York").format("L"),".csv"),target:"_blank"},r.a.createElement("p",{style:{textAlign:"center"}},"Download Timesheets")),r.a.createElement(te.a,{"aria-label":"simple table",style:{backgroundColor:"darkseagreen"}},r.a.createElement(le.a,null,r.a.createElement(ie.a,null,r.a.createElement(ne.a,{style:{fontWeight:"bolder",fontSize:"20px"}},"Name"),r.a.createElement(ne.a,{align:"right",style:{fontWeight:"bolder",fontSize:"20px"}},"Date"),r.a.createElement(ne.a,{align:"right",style:{fontWeight:"bolder",fontSize:"20px"}},"Time-in"),r.a.createElement(ne.a,{align:"right",style:{fontWeight:"bolder",fontSize:"20px"}},"Time-out"),r.a.createElement(ne.a,{align:"right",style:{fontWeight:"bolder",fontSize:"20px"}},"Duration"),r.a.createElement(ne.a,{align:"right",style:{fontWeight:"bolder",fontSize:"20px"}},"#Calls"),r.a.createElement(ne.a,{align:"right",style:{fontWeight:"bolder",fontSize:"20px"}},"Status"))),r.a.createElement(ae.a,null,a.map((function(e){return r.a.createElement(ie.a,{key:e.name},r.a.createElement(ne.a,{component:"th",scope:"row"},e.name),r.a.createElement(ne.a,{align:"right"},e.date),r.a.createElement(ne.a,{align:"right"},e.timeIn),r.a.createElement(ne.a,{align:"right"},e.timeOut),r.a.createElement(ne.a,{align:"right"},e.duration),r.a.createElement(ne.a,{align:"right"},e.numberofCalls),r.a.createElement(ne.a,{align:"right"},e.status))})))),r.a.createElement(d.a,{variant:"h4",style:K.pageTitle},"TIMESHEET LOGS"),r.a.createElement(te.a,{"aria-label":"simple table"},r.a.createElement(le.a,null,r.a.createElement(ie.a,null,r.a.createElement(ne.a,{style:{fontWeight:"bolder",fontSize:"20px"}},"Name"),r.a.createElement(ne.a,{align:"right",style:{fontWeight:"bolder",fontSize:"20px"}},"Date"),r.a.createElement(ne.a,{align:"right",style:{fontWeight:"bolder",fontSize:"20px"}},"Time"),r.a.createElement(ne.a,{align:"right",style:{fontWeight:"bolder",fontSize:"20px"}},"Type"),r.a.createElement(ne.a,{align:"right",style:{fontWeight:"bolder",fontSize:"20px"}},"Status"))),r.a.createElement(ae.a,null,l.map((function(e){return r.a.createElement(ie.a,{key:e.name},r.a.createElement(ne.a,{component:"th",scope:"row"},e.name),r.a.createElement(ne.a,{align:"right"},e.date),r.a.createElement(ne.a,{align:"right"},e.time),r.a.createElement(ne.a,{align:"right"},e.actType),r.a.createElement(ne.a,{align:"right"},e.status))}))))))}}]),t}(n.Component),ge=Object(g.b)((function(e){return Object(w.a)({data:e.data,UI:M.a.object.isRequired},"UI",e.UI)}),{getActivities:function(e){return function(t){t({type:"LOADING_DATA"}),h.a.get("/dataFromTimesheets").then((function(a){t(E(e)),t({type:"SET_ACTIVITIES_DATA",payload:a.data})})).catch((function(e){t({type:"SET_ACTIVITIES_DATA",payload:[]})}))}}})(ue),de=a(90),pe=a.n(de),he=a(203),Ee=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(s.a)(this,Object(m.a)(t).call(this))).handleSubmit=function(t){t.preventDefault();var a={};if(null==Q.find((function(t){return t===e.state.name})))return a.name="Please select your name from the list.",void e.setState({errors:a});if(void 0==e.sigCanvas||e.sigCanvas.isEmpty())return a.signature="Please Agree to terms and Provide Signature!",void e.setState({errors:a});var n={name:e.state.name,checked:e.state.checked,signature:e.sigCanvas.getTrimmedCanvas().toDataURL("image/png")};e.props.submitSignature(n,e.props.history)},e.handleChange=function(t){e.setState(Object(w.a)({},t.target.name,t.target.value))},e.handleActivityType=function(t,a){e.setState({actType:a})},e.handleSelectName=function(t,a){e.setState({name:a})},e.handleConditionChecked=function(t,a){e.setState({checked:a})},e.clearCanvas=function(){e.sigCanvas.clear()},e.state={name:"",checked:!1,clear:!1,message:"",errors:{}},e}return Object(u.a)(t,e),Object(c.a)(t,[{key:"UNSAFE_componentWillReceiveProps",value:function(e){e.UI.errors&&this.setState({errors:e.UI.errors})}},{key:"render",value:function(){var e=this,t=this.state.errors,a=this.props.data,n=a.loading,l=a.message;return r.a.createElement(J.Flash,null,r.a.createElement(_.a,{container:!0},r.a.createElement(_.a,{item:!0,sm:!0}),r.a.createElement(_.a,{item:!0,sm:8},r.a.createElement(d.a,{variant:"h4",style:K.pageTitle},"NDA INTERNS TIMESHEET SIGNATURES"),r.a.createElement("form",{noValidate:!0,onSubmit:this.handleSubmit,style:K.form},r.a.createElement($,{options:Q,onInputChange:this.handleSelectName,name:"name",label:"Select participant name.",style:{width:"40%",margin:"20px 30%"},helperText:t.name,error:!!t.name,value:this.state.name}),t.signature&&r.a.createElement(d.a,{variant:"body1",style:{textAlign:"center",color:"red"}},t.signature),this.state.name===Q.find((function(t){return t===e.state.name}))&&r.a.createElement(d.a,{style:{textAlign:"center"}},r.a.createElement(he.a,{checked:this.state.checked,onChange:this.handleConditionChecked,inputProps:{"aria-label":"primary checkbox"}}),"By signing, I certify that all the information is correct as it represents my attendance and work at the worksite."),this.state.checked&&r.a.createElement("div",{style:{textAlign:"center",margin:"10px"}},r.a.createElement(d.a,{variant:"h4"},"Please Sign: "),r.a.createElement(pe.a,{ref:function(t){e.sigCanvas=t}}),r.a.createElement(T.a,{variant:"contained",onClick:this.clearCanvas},"Clear")),r.a.createElement(T.a,{type:"submit",variant:"contained",color:"primary",style:{width:"40%",margin:"20px 30%"},disabled:!1}," Submit",n&&r.a.createElement(U.a,{size:30,style:K.progress})),r.a.createElement("br",null),t.message&&r.a.createElement(d.a,{variant:"h6",style:{textAlign:"center",color:"red"}},t.message),r.a.createElement(d.a,{variant:"h6",style:{textAlign:"center",color:"blue"}},l.message))),r.a.createElement(_.a,{item:!0,sm:!0})))}}]),t}(n.Component),fe=Object(g.b)((function(e){return{data:e.data,UI:e.UI}}),{submitSignature:function(e,t){return function(t){t({type:"LOADING_DATA"}),h.a.post("/signature",e).then((function(e){t({type:"SET_SIGNATURE",payload:e.data}),setInterval((function(){window.location.reload()}),3e3)})).catch((function(e){t({type:"SET_ERRORS",payload:e.response.data}),t({type:"SET_SIGNATURE",payload:[]})}))}}})(Ee),ye=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(s.a)(this,Object(m.a)(t).call(this))).state={signatures:[]},e}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.history,a=e.match.params.fullname;this.props.getSignatures(a,t)}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){var t=e.data.signatures;t&&this.setState({signatures:t})}},{key:"render",value:function(){var e=this.props.data.loading,t=this.state.signatures;return r.a.createElement(re.a,{component:oe.a,style:{margin:"4.5% auto",width:1100,display:"table"}},e?r.a.createElement(U.a,{size:100,style:{margin:"auto 50%"}}):r.a.createElement(n.Fragment,null,r.a.createElement(ce.CSVLink,{data:t,filename:"Signatures-".concat(me()().tz("America/New_York").format("L"),".csv"),target:"_blank"},r.a.createElement("p",{style:{textAlign:"center"}},"Download Signatures")),r.a.createElement(d.a,{variant:"h4",style:{marginTop:"40px",marginBottom:"40px",textAlign:"center"}},"Signatures (",me()().tz("America/New_York").format("L"),")"),r.a.createElement(te.a,{"aria-label":"simple table",style:{backgroundColor:"lightsteelblue"}},r.a.createElement(le.a,null,r.a.createElement(ie.a,null,r.a.createElement(ne.a,{style:{fontWeight:"bolder",fontSize:"20px"}},"Name"),r.a.createElement(ne.a,{align:"center",style:{fontWeight:"bolder",fontSize:"20px"}},"Date"),r.a.createElement(ne.a,{align:"center",style:{fontWeight:"bolder",fontSize:"20px"}},"Time"),r.a.createElement(ne.a,{align:"center",style:{fontWeight:"bolder",fontSize:"20px"}},"Terms and Conditions"),r.a.createElement(ne.a,{align:"center",style:{fontWeight:"bolder",fontSize:"20px"}},"Signature"))),r.a.createElement(ae.a,null,t.map((function(e){return r.a.createElement(ie.a,{key:e.name},r.a.createElement(ne.a,{component:"th",scope:"row"},e.name),r.a.createElement(ne.a,{align:"center"},e.date),r.a.createElement(ne.a,{align:"center"},e.time),r.a.createElement(ne.a,{align:"center"},e.conditions?"Agreed":"Disagreed"),r.a.createElement(ne.a,{align:"center",style:{width:"40%"}}," ",r.a.createElement("img",{style:{width:"40%"},src:e.signature,onclick:"window.open(this.src)"})))}))))))}}]),t}(n.Component),be=Object(g.b)((function(e){return Object(w.a)({data:e.data,UI:M.a.object.isRequired},"UI",e.UI)}),{getSignatures:function(e){return function(t){t({type:"LOADING_DATA"}),h.a.get("/dataFromSignatures").then((function(a){t(E(e)),t({type:"SET_SIGNATURE_DATA;",payload:a.data})})).catch((function(e){t({type:"SET_SIGNATURE_DATA;",payload:[]})}))}}})(ye),Se=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("p",{style:{fontSize:"100px"}},"UNAUTHORIZED")}}]),t}(n.Component),Te=a(43),ve=a(91),Ae={authenticatedAdmin:!1,loading:!1,adminInformation:{}},xe={activities:{},signatures:{},message:{},loading:!1},Ie={loading:!1,errors:null},Ce=[ve.a],Oe=Object(Te.c)({user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ae,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_AUTHENTICATED_ADMIN":return Object(V.a)({},e,{authenticatedAdmin:!0});case"SET_UNAUTHENTICATED_ADMIN":return Ae;case"SET_ADMIN":return{authenticatedAdmin:!0,loading:!1,adminInformation:t.payload};case"LOADING_ADMIN":return Object(V.a)({},e,{loading:!0});default:return e}},data:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:xe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOADING_DATA":return Object(V.a)({},e,{loading:!0});case"SET_ACTIVITIES_DATA":return Object(V.a)({},e,{activities:t.payload,loading:!1});case"SET_SIGNATURE_DATA;":return Object(V.a)({},e,{signatures:t.payload,loading:!1});case"SET_MESSAGE":case"SET_SIGNATURE":return{loading:!1,message:t.payload};default:return e}},UI:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ie,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_ERRORS":return Object(V.a)({},e,{loading:!1,errors:t.payload});case"CLEAR_ERRORS":return Object(V.a)({},e,{loading:!1,errors:null});case"LOADING_UI":return Object(V.a)({},e,{loading:!0});case"STOP_LOADING_UI":return Object(V.a)({},e,{loading:!1});default:return e}}}),ke=Object(Te.e)(Oe,{},Object(Te.d)(Te.a.apply(void 0,Ce))),we=a(52);h.a.defaults.baseURL="https://us-central1-cm-tracker-492ed.cloudfunctions.net/api";var De=localStorage.FBIdToken;De&&(1e3*Y()(De).exp<Date.now()?(ke.dispatch(f()),window.location.href="/login"):"admin"===localStorage.role?(ke.dispatch({type:"SET_AUTHENTICATED_ADMIN"}),h.a.defaults.headers.common.Authorization=De):"regular-user"===localStorage.accType&&(ke.dispatch({type:"SET_AUTHENTICATED_USER"}),h.a.defaults.headers.common.Authorization=De));var Ne=function(){return r.a.createElement(g.a,{store:ke},r.a.createElement(we.BrowserRouter,null,r.a.createElement(k,null),r.a.createElement(F.g,null,r.a.createElement(F.d,{exact:!0,path:"/",component:ee}),r.a.createElement(F.d,{exact:!0,path:"/signatures",component:fe}),r.a.createElement(F.d,{exact:!0,path:"/login",component:W}),r.a.createElement(P,{exact:!0,path:"/timesheets/:fullname",component:ge}),r.a.createElement(P,{exact:!0,path:"/signatures/:fullname",component:be}),r.a.createElement(F.d,{exact:!0,path:"/UNAUTHORIZED",component:Se}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(Ne,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},80:function(e,t,a){},88:function(e,t,a){e.exports=a.p+"static/media/ori_logo.4603f0d1.png"}},[[108,1,2]]]);
//# sourceMappingURL=main.bc34cdba.chunk.js.map