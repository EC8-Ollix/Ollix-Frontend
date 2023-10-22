import{u as U}from"./useNavigation-dd35bdf4.js";import{d as E,O as V,r as g,B as R,D,e as B,n as $,_ as N,g as i,o as r,h as m,c as l,w as c,i as z,F as f,j as y,v as u,l as H,k as A,p as F,m as L,b as j,G,z as P,R as T,X as Q,W}from"./index-7d2574e2.js";import{f as X}from"./dateHelper-d63eedb5.js";import{S as q}from"./SmileOutlined-ef549c29.js";import{F as M}from"./FileSearchOutlined-d45be0f4.js";const J=E({name:"HelicesByAddress",components:{SmileOutlined:q,FileSearchOutlined:M},props:{clientId:{type:String},addressId:{type:String},viaClientScreen:{type:Boolean,required:!0}},setup(e){const{clientId:o,addressId:I}=V(e),w=g(0),x=[{title:"",dataIndex:"active",width:"3%"},{title:"Hélice Id",dataIndex:"helixId",width:"30%"},{title:"Data da Instalação",dataIndex:"installedDate",width:"15%"},{title:"Endereço",dataIndex:"addressApp",width:"40%"},{title:"Ações",dataIndex:"actions",width:"10%"}],b=g(["5","10","20","40","50"]),v=g([]),_=g(!1),s=g({page:1,pageSize:10}),h=async()=>{var t;if(!o.value||!I.value)return;_.value=!0;const p={clientId:o.value,addressId:I.value,installed:!0,...s.value};try{const n=await B.get("/propellers/by-address",{params:p});v.value=n.data.data,s.value.page=n.data.page,s.value.pageSize=n.data.pageSize,w.value=n.data.totalRecords}catch(n){let a=(t=n==null?void 0:n.response)==null?void 0:t.data;$(a)}finally{_.value=!1}};return R(h),D(s,h,{deep:!0}),{data:v,loading:_,pagination:s,columns:x,onShowSizeChange:(p,t)=>{s.value.page=p,s.value.pageSize=t,t!==(s==null?void 0:s.value.pageSize)&&(v.value=[])},pageSizeOptions:b,totalRecords:w,formatStringDateToBR:X,toggleActive:async p=>{var t;p.isLoading=!0;try{await B.patch(`/propellers/${p.id}/toggle`),p.active=!p.active}catch(n){let a=(t=n==null?void 0:n.response)==null?void 0:t.data;$(a)}finally{p.isLoading=!1}},handleSwitchChange:p=>{}}}});const K=e=>(F("data-v-eb057e93"),e=e(),L(),e),Y={style:{"text-align":"center",padding:"25px"}},Z=K(()=>z("p",null,"Nada encontrado",-1)),ee={key:0,class:"align-column-center"};function ae(e,o,I,w,x,b){const v=i("smile-outlined"),_=i("a-switch"),s=i("a-popconfirm"),h=i("FileSearchOutlined"),d=i("a-button"),S=i("a-table"),C=i("a-config-provider"),p=i("a-pagination");return r(),m(f,null,[l(C,null,{renderEmpty:c(()=>[z("div",Y,[l(v,{style:{"font-size":"20px"}}),Z])]),default:c(()=>[l(S,{columns:e.columns,"data-source":e.data,pagination:!1,loading:e.loading,size:"small"},{bodyCell:c(({column:t,text:n,record:a})=>[t.dataIndex==="active"?(r(),m("div",ee,[l(s,{onConfirm:O=>e.toggleActive(a),title:a.active?"Tem certeza que deseja desativar essa Hélice?":"Tem certeza que deseja ativar essa Hélice?"},{default:c(()=>[l(_,{checked:a.active,loading:a.isLoading,size:"small",onChange:O=>e.handleSwitchChange(a)},null,8,["checked","loading","onChange"])]),_:2},1032,["onConfirm","title"])])):t.dataIndex==="installedDate"?(r(),m(f,{key:1},[y(u(e.formatStringDateToBR(a.order.installationDate)),1)],64)):t.dataIndex==="addressApp"?(r(),m(f,{key:2},[y(u(a.addressApp.street)+", "+u(a.addressApp.neighborhood)+" - "+u(a.addressApp.city)+"/"+u(a.addressApp.state),1)],64)):t.dataIndex==="actions"?(r(),H(d,{key:3,size:"small"},{default:c(()=>[l(h),y("Detalhes")]),_:1})):A("",!0)]),_:1},8,["columns","data-source","loading"])]),_:1}),l(p,{current:e.pagination.page,"onUpdate:current":o[0]||(o[0]=t=>e.pagination.page=t),pageSize:e.pagination.pageSize,"onUpdate:pageSize":o[1]||(o[1]=t=>e.pagination.pageSize=t),"page-size-options":e.pageSizeOptions,"show-size-changer":"",total:e.totalRecords,onShowSizeChange:e.onShowSizeChange,style:{"text-align":"right",margin:"25px 0 15px 0"}},{buildOptionText:c(t=>[z("span",null,u(t.value)+"/pág",1)]),_:1},8,["current","pageSize","page-size-options","total","onShowSizeChange"])],64)}const te=N(J,[["render",ae],["__scopeId","data-v-eb057e93"]]),ne=E({name:"AdressesHelices",components:{SmileOutlined:q,FileSearchOutlined:M,ArrowLeftOutlined:j,ControlOutlined:G,HelicesByAddress:te},props:{clientId:{type:String},viaClientScreen:{type:Boolean,required:!0}},setup(e){const o=g(!0),I=g("");function w(t){I.value=t,o.value=!o.value}const{goBack:x}=U(),b=g(0),v=[{title:"CEP",dataIndex:"postalCode",width:"5%"},{title:"Rua",dataIndex:"street",width:"30%"},{title:"Bairro",dataIndex:"neighborhood",width:"25%"},{title:"Cidade",dataIndex:"cityState",width:"25%"},{title:"Qtd. de Hélices",dataIndex:"propellersCount",width:"10%"},{title:"Ações",dataIndex:"actions",width:"5%"}],_=g(["5","10","20","40","50"]),s=g([]),h=g(!1),d=g({page:1,pageSize:10}),S=P(),C=async()=>{var n;h.value=!0;const t={installed:!0,...d.value};S.params.clientId&&(t.clientId=S.params.clientId);try{const a=await B.get("/propellers/propeller-adresses",{params:t});s.value=a.data.data,d.value.page=a.data.page,d.value.pageSize=a.data.pageSize,b.value=a.data.totalRecords}catch(a){let O=(n=a==null?void 0:a.response)==null?void 0:n.data;$(O)}finally{h.value=!1}};return R(C),D(d,C,{deep:!0}),{goBack:x,data:s,loading:h,pagination:d,columns:v,onShowSizeChange:(t,n)=>{d.value.page=t,d.value.pageSize=n,n!==(d==null?void 0:d.value.pageSize)&&(s.value=[])},pageSizeOptions:_,totalRecords:b,showOriginalTable:o,toggleTable:w,selectedAddress:I,route:S}}});const oe=e=>(F("data-v-2ccc37a5"),e=e(),L(),e),se={key:0},ie={style:{"text-align":"center",padding:"25px"}},le=oe(()=>z("p",null,"Nada encontrado",-1)),de={key:1};function pe(e,o,I,w,x,b){const v=i("a-page-header"),_=i("smile-outlined"),s=i("ControlOutlined"),h=i("a-button"),d=i("a-table"),S=i("a-config-provider"),C=i("a-pagination"),p=i("ArrowLeftOutlined"),t=i("HelicesByAddress"),n=i("a-layout-content");return r(),m(f,null,[e.viaClientScreen?A("",!0):(r(),H(v,{key:0,class:"pageHeader",title:"Hélices",onBack:e.goBack},null,8,["onBack"])),l(n,{style:T(e.viaClientScreen?{}:{margin:"10px 16px 25px"})},{default:c(()=>[z("div",{style:T(e.viaClientScreen?{}:{padding:"20px",background:"#fff"}),class:W({content:!e.viaClientScreen})},[l(Q,{name:"slide"},{default:c(()=>[z("div",null,[e.showOriginalTable?(r(),m("div",se,[l(S,null,{renderEmpty:c(()=>[z("div",ie,[l(_,{style:{"font-size":"20px"}}),le])]),default:c(()=>[l(d,{columns:e.columns,"data-source":e.data,pagination:!1,loading:e.loading,size:"small"},{bodyCell:c(({column:a,text:O,record:k})=>[a.dataIndex==="postalCode"?(r(),m(f,{key:0},[y(u(k.address.postalCode),1)],64)):a.dataIndex==="street"?(r(),m(f,{key:1},[y(u(k.address.street),1)],64)):a.dataIndex==="neighborhood"?(r(),m(f,{key:2},[y(u(k.address.neighborhood),1)],64)):a.dataIndex==="cityState"?(r(),m(f,{key:3},[y(u(k.address.city)+"/"+u(k.address.state),1)],64)):a.dataIndex==="actions"?(r(),H(h,{key:4,size:"small",onClick:re=>e.toggleTable(k.address.id)},{default:c(()=>[l(s),y("Hélices")]),_:2},1032,["onClick"])):A("",!0)]),_:1},8,["columns","data-source","loading"])]),_:1}),l(C,{current:e.pagination.page,"onUpdate:current":o[0]||(o[0]=a=>e.pagination.page=a),pageSize:e.pagination.pageSize,"onUpdate:pageSize":o[1]||(o[1]=a=>e.pagination.pageSize=a),"page-size-options":e.pageSizeOptions,"show-size-changer":"",total:e.totalRecords,onShowSizeChange:e.onShowSizeChange,style:{"text-align":"right",margin:"25px 0 15px 0"}},{buildOptionText:c(a=>[z("span",null,u(a.value)+"/pág",1)]),_:1},8,["current","pageSize","page-size-options","total","onShowSizeChange"])])):A("",!0),e.showOriginalTable?A("",!0):(r(),m("div",de,[l(h,{title:"voltar",shape:"circle",type:"text",style:{"margin-bottom":"15px"},onClick:o[2]||(o[2]=a=>e.toggleTable(""))},{default:c(()=>[l(p)]),_:1}),l(t,{clientId:e.route.params.clientId,addressId:e.selectedAddress,viaClientScreen:!0},null,8,["clientId","addressId"])]))])]),_:1})],6)]),_:1},8,["style"])],64)}const ve=N(ne,[["render",pe],["__scopeId","data-v-2ccc37a5"]]);export{ve as default};
