import{c as a,A as M,d as H,r as O,a as P,u as D,b as T,U as G,e as Q,f as j,S as W,n as A,g as X,_ as Y,h as b,o as w,i as R,j as m,w as s,k as y,l as L,m as k,p as Z,q as x}from"./index-4c611646.js";var K={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240zm460 600H232V536h560v304zM484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53a48.01 48.01 0 10-56 0z"}}]},name:"lock",theme:"outlined"};const ee=K;function q(e){for(var t=1;t<arguments.length;t++){var u=arguments[t]!=null?Object(arguments[t]):{},d=Object.keys(u);typeof Object.getOwnPropertySymbols=="function"&&(d=d.concat(Object.getOwnPropertySymbols(u).filter(function(g){return Object.getOwnPropertyDescriptor(u,g).enumerable}))),d.forEach(function(g){ae(e,g,u[g])})}return e}function ae(e,t,u){return t in e?Object.defineProperty(e,t,{value:u,enumerable:!0,configurable:!0,writable:!0}):e[t]=u,e}var C=function(t,u){var d=q({},t,u.attrs);return a(M,q({},d,{icon:ee}),null)};C.displayName="LockOutlined";C.inheritAttrs=!1;const te=C,re=H({name:"Authentication",setup(){const e=O(!0),t=()=>{e.value=!e.value},u=O(),d=P({userEmail:"",password:""}),g=(n,r)=>r===""?Promise.reject("Por favor, insira a senha."):Promise.resolve(),U=(n,r)=>r===""?Promise.reject("Por favor, confirme a senha."):r!==v.password?Promise.reject("As senhas não coincidem."):Promise.resolve(),S={userEmail:[{required:!0,message:"O Email é obrigatório",trigger:"blur"},{type:"email",message:"O Email está inválido",trigger:"blur"}],password:[{required:!0,validator:g,trigger:"blur"},{min:6,message:"A senha deve ter pelo menos 6 caracteres",trigger:"blur"}]},c=async()=>{try{h.value=!0;const n={userEmail:d.userEmail,userPassword:d.password},i=(await j.post("auth/login",n)).data;h.value=!1,W(i),await _.push("/Ollix-Frontend/")}catch(n){let r=n.response.data;h.value=!1,A(r)}},l=n=>{},p=O(1),_=D(),f=()=>{p.value=1},F=O(),v=P({firstName:"",lastName:"",userEmail:"",password:"",confirmPassword:""}),o={firstName:[{required:!0,message:"O Nome é obrigatório",trigger:"blur"},{max:100,message:"O Nome deve ter no máximo 100 caracteres",trigger:"blur"}],lastName:[{required:!0,message:"O Sobrenome é obrigatório",trigger:"blur"},{max:200,message:"O Sobrenome deve ter no máximo 200 caracteres",trigger:"blur"}],userEmail:[{required:!0,message:"O Email é obrigatório",trigger:"blur"},{type:"email",message:"O Email está inválido",trigger:"blur"}],password:[{required:!0,validator:g,trigger:"blur"},{min:6,message:"A senha deve ter pelo menos 6 caracteres",trigger:"blur"}],confirmPassword:[{required:!0,validator:U,trigger:"blur"}]},z=async n=>{p.value=2},I=n=>{};O();const N=P({companyName:"",bussinessName:"",cnpj:""});T(()=>$(N.cnpj));const $=n=>{const r=n.replace(/[^\d]/g,"");let i=r;return r.length>12?i=`${r.slice(0,2)}.${r.slice(2,5)}.${r.slice(5,8)}/${r.slice(8,12)}-${r.slice(12,14)}`:r.length>8?i=`${r.slice(0,2)}.${r.slice(2,5)}.${r.slice(5,8)}/${r.slice(8)}`:r.length>5?i=`${r.slice(0,2)}.${r.slice(2,5)}.${r.slice(5)}`:r.length>2&&(i=`${r.slice(0,2)}.${r.slice(2)}`),i},J=n=>{const i=n.target.value;N.cnpj=$(i)},V={companyName:[{required:!0,message:"A Razão Social é Obrigatória",trigger:"blur"},{max:400,message:"A Razão Social deve ter no máximo 400 caracteres",trigger:"blur"}],bussinessName:[{required:!0,message:"O Nome Fantasia é obrigatório",trigger:"blur"},{max:400,message:"O Nome Fantasia deve ter no máximo 40 caracteres",trigger:"blur"}],cnpj:[{required:!0,message:"O CNPJ é obrigatório",trigger:"blur"},{max:18,message:"O CNPJ deve ter 18 caracteres",trigger:"blur"},{min:18,message:"O CNPJ deve ter 18 caracteres",trigger:"blur"}]},h=O(!1);return{isLogin:e,tooggleLoginRegister:t,currentStep:p,goBack:f,userFormRef:F,userState:v,userRules:o,handleUserRegistration:z,handleUserRegistrationFailed:I,clientState:N,clientRules:V,loading:h,handleClientRegistration:async()=>{try{h.value=!0;const n={firstName:v.firstName,lastName:v.lastName,userEmail:v.userEmail,userPassword:v.password,companyName:N.companyName,bussinessName:N.bussinessName,cnpj:N.cnpj};await j.post("auth/register",n),h.value=!1,X({successTitle:"Conta Registrada com Sucesso!",successMessage:"Entre agora mesmo na plataforma"}),t()}catch(n){let r=n.response.data;if(h.value=!1,A(r),r.validationErrors){const i=r.validationErrors.map(B=>B.identifier);(i.includes("UserEmail")||i.includes("UserPassword")||i.includes("FirstName")||i.includes("LastName"))&&(p.value=1)}}},handleClientRegistrationFailed:n=>{},onInput:J,userLoginFormRef:u,userLoginState:d,userLoginRules:S,handleUserLogin:c,handleUserLoginFailed:l}},components:{UserOutlined:G,LockOutlined:te,ArrowLeftOutlined:Q}}),se="/Ollix-Frontend/background-auth.jpg",oe="/Ollix-Frontend/logo-ollix.svg";const E=e=>(Z("data-v-0b365f8d"),e=e(),x(),e),ne={class:"register-container"},le=E(()=>m("div",{class:"background"},[m("img",{src:se,class:"background-image"})],-1)),ie={class:"register-form"},ue=E(()=>m("img",{src:oe,alt:"Logo",class:"logo",title:"Oliix"},null,-1)),de=E(()=>m("p",{class:"description"}," Energia eólica a partir do vento gerado pelos carros ",-1)),me={key:0},ce=E(()=>m("h3",{class:"title"},"Entre agora na Plataforma!",-1)),ge={style:{"text-align":"center"}},pe={key:1},fe=E(()=>m("h3",{class:"title"},"Registre-se na Plataforma!",-1)),ve=E(()=>m("h3",{class:"title"},"Agora Registre sua Empresa!",-1)),be={style:{"text-align":"center"}};function he(e,t,u,d,g,U){const S=b("UserOutlined"),c=b("a-input"),l=b("a-form-item"),p=b("LockOutlined"),_=b("a-input-password"),f=b("a-button"),F=b("a-form"),v=b("ArrowLeftOutlined");return w(),R("div",ne,[le,m("div",ie,[ue,de,e.isLogin?(w(),R("div",me,[a(F,{ref:"userLoginFormRef",model:e.userLoginState,rules:e.userLoginRules,layout:"vertical",onFinish:e.handleUserLogin,onFinishFailed:e.handleUserLoginFailed,style:{width:"22rem"}},{default:s(()=>[ce,a(l,{label:"Email",name:"userEmail"},{default:s(()=>[a(c,{value:e.userLoginState.userEmail,"onUpdate:value":t[0]||(t[0]=o=>e.userLoginState.userEmail=o),placeholder:"Email"},{prefix:s(()=>[a(S,{style:{color:"rgba(0, 0, 0, 0.25)"}})]),_:1},8,["value"])]),_:1}),a(l,{label:"Senha",name:"password"},{default:s(()=>[a(_,{value:e.userLoginState.password,"onUpdate:value":t[1]||(t[1]=o=>e.userLoginState.password=o),placeholder:"Senha"},{prefix:s(()=>[a(p,{style:{color:"rgba(0, 0, 0, 0.25)"}})]),_:1},8,["value"])]),_:1}),a(l,null,{default:s(()=>[a(f,{type:"primary","html-type":"submit",class:"register-button",loading:e.loading},{default:s(()=>[y("Entrar")]),_:1},8,["loading"])]),_:1})]),_:1},8,["model","rules","onFinish","onFinishFailed"]),m("p",ge,[y(" Não possui uma conta? "),a(f,{onClick:e.tooggleLoginRegister,size:"small",type:"link"},{default:s(()=>[y(" Registre-se Aqui")]),_:1},8,["onClick"])])])):L("",!0),e.isLogin?L("",!0):(w(),R("div",pe,[e.currentStep===1?(w(),k(F,{key:0,ref:"userFormRef",model:e.userState,rules:e.userRules,layout:"vertical",onFinish:e.handleUserRegistration,onFinishFailed:e.handleUserRegistrationFailed,style:{width:"22rem"}},{default:s(()=>[fe,a(l,{label:"Primeiro Nome",name:"firstName"},{default:s(()=>[a(c,{value:e.userState.firstName,"onUpdate:value":t[2]||(t[2]=o=>e.userState.firstName=o),placeholder:"Nome"},{prefix:s(()=>[a(S,{style:{color:"rgba(0, 0, 0, 0.25)"}})]),_:1},8,["value"])]),_:1}),a(l,{label:"Último Nome",name:"lastName"},{default:s(()=>[a(c,{value:e.userState.lastName,"onUpdate:value":t[3]||(t[3]=o=>e.userState.lastName=o),placeholder:"Sobrenome"},{prefix:s(()=>[a(S,{style:{color:"rgba(0, 0, 0, 0.25)"}})]),_:1},8,["value"])]),_:1}),a(l,{label:"Email",name:"userEmail"},{default:s(()=>[a(c,{value:e.userState.userEmail,"onUpdate:value":t[4]||(t[4]=o=>e.userState.userEmail=o),placeholder:"Email"},{prefix:s(()=>[a(S,{style:{color:"rgba(0, 0, 0, 0.25)"}})]),_:1},8,["value"])]),_:1}),a(l,{label:"Senha",name:"password"},{default:s(()=>[a(_,{value:e.userState.password,"onUpdate:value":t[5]||(t[5]=o=>e.userState.password=o),placeholder:"Senha"},{prefix:s(()=>[a(p,{style:{color:"rgba(0, 0, 0, 0.25)"}})]),_:1},8,["value"])]),_:1}),a(l,{label:"Confirme a Senha",name:"confirmPassword"},{default:s(()=>[a(_,{value:e.userState.confirmPassword,"onUpdate:value":t[6]||(t[6]=o=>e.userState.confirmPassword=o),placeholder:"Confirmação de Senha"},{prefix:s(()=>[a(p,{style:{color:"rgba(0, 0, 0, 0.25)"}})]),_:1},8,["value"])]),_:1}),a(l,null,{default:s(()=>[a(f,{type:"primary","html-type":"submit",class:"register-button"},{default:s(()=>[y("Proximo Passo")]),_:1})]),_:1})]),_:1},8,["model","rules","onFinish","onFinishFailed"])):L("",!0),e.currentStep===2?(w(),k(F,{key:1,ref:"clientFormRef",model:e.clientState,rules:e.clientRules,layout:"vertical",onFinish:e.handleClientRegistration,onFinishFailed:e.handleClientRegistrationFailed,style:{width:"22rem"}},{default:s(()=>[ve,e.currentStep===2?(w(),k(f,{key:0,style:{"margin-bottom":"15px"},onClick:e.goBack,type:"text",shape:"circle"},{icon:s(()=>[a(v)]),_:1},8,["onClick"])):L("",!0),a(l,{label:"Razão Social",name:"companyName"},{default:s(()=>[a(c,{value:e.clientState.companyName,"onUpdate:value":t[7]||(t[7]=o=>e.clientState.companyName=o),placeholder:"Razão Social"},null,8,["value"])]),_:1}),a(l,{label:"Nome Fantasia",name:"bussinessName"},{default:s(()=>[a(c,{value:e.clientState.bussinessName,"onUpdate:value":t[8]||(t[8]=o=>e.clientState.bussinessName=o),placeholder:"Nome Fantasia"},null,8,["value"])]),_:1}),a(l,{label:"CNPJ",name:"cnpj"},{default:s(()=>[a(c,{value:e.clientState.cnpj,"onUpdate:value":t[9]||(t[9]=o=>e.clientState.cnpj=o),placeholder:"CNPJ","max-length":18,onInput:e.onInput},null,8,["value","onInput"])]),_:1}),a(l,null,{default:s(()=>[a(f,{type:"primary","html-type":"submit",class:"register-button",loading:e.loading},{default:s(()=>[y("Confirmar")]),_:1},8,["loading"])]),_:1})]),_:1},8,["model","rules","onFinish","onFinishFailed"])):L("",!0),m("p",be,[y(" Já possui uma conta? "),a(f,{onClick:e.tooggleLoginRegister,size:"small",type:"link"},{default:s(()=>[y(" Entre aqui")]),_:1},8,["onClick"])])]))])])}const Oe=Y(re,[["render",he],["__scopeId","data-v-0b365f8d"]]);export{Oe as default};
