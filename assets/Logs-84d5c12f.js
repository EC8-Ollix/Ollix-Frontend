import{u as Y}from"./useNavigation-41110bad.js";import{d as $,L as u,B as j,m as G,q as K,K as X,r as f,v as J,F as Q,a as W,b as Z,n as ee,_ as ae,e as r,o as U,f as F,k as te,j as R,h as a,w as l,V as H,G as T,g as i,i as x,y as V,X as le,p as oe,l as ne}from"./index-d0d6cb63.js";import{f as ie}from"./dateHelper-d63eedb5.js";import{l as se}from"./pt_BR-bb924538.js";import{S as de}from"./SmileOutlined-5be3d41f.js";u.locale("pt-br");const re=$({name:"Logs",components:{SmileOutlined:de,SearchOutlined:j},props:{clientId:{type:String},viaClientScreen:{type:Boolean,required:!0}},setup(e){const{goBack:s}=Y(),L=G(),h=K(()=>L.state.isAdmin),{clientId:k,viaClientScreen:z}=X(e),O=f(0);let m=[];h.value&&m.push({title:"Id da Entidade",dataIndex:"entityId",width:"18%"}),m.push({title:"Indentificador",dataIndex:"identifier",width:"15%"}),m.push({title:"Entidade",dataIndex:"entity",width:"5%"}),m.push({title:"Operação",dataIndex:"operation",width:"7%"}),m.push({title:"Usuário",dataIndex:"userName",width:"15%"}),m.push({title:"Data",dataIndex:"date",width:"10%"});const c=f(["5","10","20","40","50"]),_=f([]),y=f(!1),d=f({page:1,pageSize:10}),b=async p=>{var v;y.value=!0;const o={requestedDateFrom:t.date[0].toDate(),requestedDateTo:t.date[1].toDate(),...t,...d.value};p&&(o.page=1),k.value&&(o.clientId=k.value||void 0);try{const n=await Z.get("/logs",{params:o});_.value=n.data.data,d.value.page=n.data.page,d.value.pageSize=n.data.pageSize,O.value=n.data.totalRecords}catch(n){let M=(v=n==null?void 0:n.response)==null?void 0:v.data;ee(M)}finally{y.value=!1}};J(()=>b(!1)),Q(d,()=>b(!1),{deep:!0});const C=(p,o)=>{d.value.page=p,d.value.pageSize=o,o!==(d==null?void 0:d.value.pageSize)&&(_.value=[])},w="DD/MM/YYYY",E=u(),N=u().subtract(30,"day"),B=f([{label:"Últimos 7 dias",value:[u().add(-7,"d"),u()]},{label:"Últimos 14 dias",value:[u().add(-14,"d"),u()]},{label:"Últimos 30 dias",value:[u().add(-30,"d"),u()]},{label:"Últimos 90 dias",value:[u().add(-90,"d"),u()]}]),D=f([u(N,w),u(E,w)]),t=W({entity:void 0,operation:void 0,userName:void 0,date:D.value}),A=async()=>{await b(!0)},P=async()=>{t.entity=void 0,t.operation=void 0,t.userName=void 0,t.date=D.value};let q=f([{value:"1",label:"Usuário",visible:!0},{value:"2",label:"Cliente",visible:h.value&&!z.value},{value:"3",label:"Pedido",visible:!0},{value:"4",label:"Hélice",visible:!0}]);q.value=q.value.filter(p=>p.visible===!0);let S=f(),I=f([{value:"1",label:"Criação"},{value:"2",label:"Edição"},{value:"3",label:"Exclusão"},{value:"4",label:"Pedido Cancelado"},{value:"5",label:"Pedido Aprovado"},{value:"6",label:"Pedido Finalizado"},{value:"12",label:"Pedido Negado"},{value:"7",label:"Hélice Instalada"},{value:"10",label:"Hélice Ativada"},{value:"11",label:"Hélice Desativada"},{value:"8",label:"Cliente Ativado"},{value:"9",label:"Cliente Desativado"}]);return{goBack:s,data:_,loading:y,pagination:d,columns:m,onShowSizeChange:C,pageSizeOptions:c,totalRecords:O,isAdmin:h,formatStringDateToBR:ie,limpaPesquisa:P,handlePesquisa:A,formState:t,locale:se,rangePresets:B,dateFormat:w,operationOptions:S,entityOptions:q,filterOption:(p,o)=>o.label.toLowerCase().indexOf(p.toLowerCase())>=0,handleEntityChange:p=>{if(S.value=[],t.operation=void 0,p==="1"){let o=["1","2","3"];S.value=I.value.filter(v=>{var n;return o.includes(((n=v.value)==null?void 0:n.toString())||"0")})}else if(p==="2"){let o=["2","3","8","9"];S.value=I.value.filter(v=>{var n;return o.includes(((n=v.value)==null?void 0:n.toString())||"0")})}else if(p==="3"){let o=[];h.value&&!z.value?o=["5","6","12"]:o=["1","4"],S.value=I.value.filter(v=>{var n;return o.includes(((n=v.value)==null?void 0:n.toString())||"0")})}else if(p==="4"){let o=[];h.value&&!z.value?o=["1","7","10","11"]:o=["10","11"],S.value=I.value.filter(v=>{var n;return o.includes(((n=v.value)==null?void 0:n.toString())||"0")})}}}}});const g=e=>(oe("data-v-d473836f"),e=e(),ne(),e),ue={class:"filtros"},pe=g(()=>i("h3",null,"Filtros",-1)),ce=g(()=>i("div",{class:"perso-label"},"Usuário",-1)),ve=g(()=>i("div",{class:"perso-label"},"Entidade",-1)),fe={style:{"text-align":"center",padding:"10px"}},me=g(()=>i("p",null,"Nada encontrado",-1)),ge=g(()=>i("div",{class:"perso-label"},"Operação",-1)),_e={style:{"text-align":"center",padding:"10px"}},he=g(()=>i("p",null,"Nada encontrado",-1)),ye=g(()=>i("div",{class:"perso-label"}," Data da Solicitação ",-1)),Se={class:"button-form-item"},be={class:"button-form-item"},Ce={class:"table-results"},we={style:{"text-align":"center",padding:"25px"}},ze=g(()=>i("p",null,"Nada encontrado",-1));function Oe(e,s,L,h,k,z){const O=r("a-page-header"),m=r("a-input"),c=r("a-col"),_=r("smile-outlined"),y=r("a-select"),d=r("a-config-provider"),b=r("a-range-picker"),C=r("a-row"),w=r("SearchOutlined"),E=r("a-button"),N=r("a-table"),B=r("a-pagination"),D=r("a-layout-content");return U(),F(T,null,[e.viaClientScreen?R("",!0):(U(),te(O,{key:0,class:"pageHeader",title:"Logs",onBack:e.goBack},null,8,["onBack"])),a(D,{style:H(e.viaClientScreen?{}:{margin:"10px 16px 25px"})},{default:l(()=>[i("div",{style:H(e.viaClientScreen?{}:{padding:"20px",background:"#fff"}),class:le({content:!e.viaClientScreen})},[i("div",ue,[pe,a(C,null,{default:l(()=>[a(c,{class:"filtros-input",span:20},{default:l(()=>[a(C,null,{default:l(()=>[a(c,{span:6},{default:l(()=>[i("div",null,[ce,a(m,{value:e.formState.userName,"onUpdate:value":s[0]||(s[0]=t=>e.formState.userName=t),placeholder:"Usuário"},null,8,["value"])])]),_:1}),a(c,{span:4},{default:l(()=>[i("div",null,[ve,a(d,null,{renderEmpty:l(()=>[i("div",fe,[a(_,{style:{"font-size":"15px"}}),me])]),default:l(()=>[a(y,{value:e.formState.entity,"onUpdate:value":s[1]||(s[1]=t=>e.formState.entity=t),"show-search":"",placeholder:"Entidade",style:{width:"100%"},options:e.entityOptions,"filter-option":e.filterOption,onChange:e.handleEntityChange,allowClear:!0},null,8,["value","options","filter-option","onChange"])]),_:1})])]),_:1}),a(c,{span:4},{default:l(()=>[ge,a(d,null,{renderEmpty:l(()=>[i("div",_e,[a(_,{style:{"font-size":"15px"}}),he])]),default:l(()=>[a(y,{value:e.formState.operation,"onUpdate:value":s[2]||(s[2]=t=>e.formState.operation=t),"show-search":"",placeholder:"Operação",style:{width:"100%"},options:e.operationOptions,"filter-option":e.filterOption,allowClear:!0},null,8,["value","options","filter-option"])]),_:1})]),_:1}),a(c,{span:10},{default:l(()=>[i("div",null,[ye,a(b,{value:e.formState.date,"onUpdate:value":s[3]||(s[3]=t=>e.formState.date=t),format:e.dateFormat,style:{width:"100%"},locale:e.locale,presets:e.rangePresets,allowClear:!1},null,8,["value","format","locale","presets"])])]),_:1})]),_:1})]),_:1}),a(c,{class:"filtros-button",span:4},{default:l(()=>[a(C,{style:{"justify-content":"space-between"}},{default:l(()=>[a(c,{span:14},{default:l(()=>[i("div",Se,[a(E,{type:"primary",style:{width:"100%"},onClick:e.handlePesquisa},{default:l(()=>[a(w),x(" Pesquisar ")]),_:1},8,["onClick"])])]),_:1}),a(c,{span:9},{default:l(()=>[i("div",be,[a(E,{style:{width:"100%"},onClick:e.limpaPesquisa},{default:l(()=>[x(" Limpar ")]),_:1},8,["onClick"])])]),_:1})]),_:1})]),_:1})]),_:1})]),i("div",Ce,[a(d,null,{renderEmpty:l(()=>[i("div",we,[a(_,{style:{"font-size":"20px"}}),ze])]),default:l(()=>[a(N,{columns:e.columns,"data-source":e.data,pagination:!1,loading:e.loading,size:"small"},{bodyCell:l(({column:t,text:A,record:P})=>[t.dataIndex==="postalCode"?(U(),F(T,{key:0},[x(V(e.formatStringDateToBR(P.requestDate)),1)],64)):R("",!0)]),_:1},8,["columns","data-source","loading"])]),_:1}),a(B,{current:e.pagination.page,"onUpdate:current":s[4]||(s[4]=t=>e.pagination.page=t),pageSize:e.pagination.pageSize,"onUpdate:pageSize":s[5]||(s[5]=t=>e.pagination.pageSize=t),"page-size-options":e.pageSizeOptions,"show-size-changer":"",total:e.totalRecords,onShowSizeChange:e.onShowSizeChange,style:{"text-align":"right",margin:"25px 0 15px 0"}},{buildOptionText:l(t=>[i("span",null,V(t.value)+"/pág",1)]),_:1},8,["current","pageSize","page-size-options","total","onShowSizeChange"])])],6)]),_:1},8,["style"])],64)}const qe=ae(re,[["render",Oe],["__scopeId","data-v-d473836f"]]);export{qe as default};
