import{T as k,r as f,a as S,x as C,y as w,B,_ as T,g as i,o as h,h as x,c,w as y,F as v,i as F,j as N,v as b,k as I}from"./index-3547e6e8.js";import{u as z}from"./useNavigation-f7ff7561.js";const E={name:"AjaxTable",components:{"a-table":k},setup(){const{goBack:d}=z(),o=f([]),r=f(!1),e=S({pagination:{current:1,pageSize:10},sorter:{}}),g=[{title:"Name",dataIndex:"name",sorter:!0,width:"20%"},{title:"Gender",dataIndex:"gender",filters:[{text:"Male",value:"male"},{text:"Female",value:"female"}],width:"20%"},{title:"Email",dataIndex:"email"}],s=async()=>{var t,a;r.value=!0;try{const n=await B.get("https://randomuser.me/api?",{params:{results:(t=e.pagination)==null?void 0:t.pageSize,page:(a=e.pagination)==null?void 0:a.current,...e}});o.value=n.data.results,e.pagination.total=200}catch(n){console.error("Failed to fetch data:",n)}finally{r.value=!1}};return C(s),w(()=>e,s,{deep:!0}),{data:o,loading:r,tableParams:e,columns:g,handleTableChange:(t,a)=>{var u,_,m;e.pagination=t;let n=l(a);e.sorter.sorterField=(u=n.field)==null?void 0:u.toString(),e.sorter.sorterOrder=(_=n.order)==null?void 0:_.toString(),t.pageSize!==((m=e.pagination)==null?void 0:m.pageSize)&&(o.value=[])},goBack:d};function l(t){let a;return Array.isArray(t)?a=t[0]:a=t,a}}};const U={style:{padding:"20px",background:"#fff"},class:"content"};function V(d,o,r,e,g,s){const p=i("a-page-header"),l=i("a-table"),t=i("a-layout-content");return h(),x(v,null,[c(p,{class:"pageHeader",title:"Usuários","sub-title":"Gerencie os Usuários por aqui",onBack:e.goBack},null,8,["onBack"]),c(t,{style:{margin:"10px 16px 25px"}},{default:y(()=>[F("div",U,[c(l,{columns:e.columns,"row-key":a=>a.login.uuid,"data-source":e.data,pagination:e.tableParams.pagination,loading:e.loading,onChange:e.handleTableChange},{bodyCell:y(({column:a,text:n})=>[a.dataIndex==="name"?(h(),x(v,{key:0},[N(b(n.first)+" "+b(n.last),1)],64)):I("",!0)]),_:1},8,["columns","row-key","data-source","pagination","loading","onChange"])])]),_:1})],64)}const D=T(E,[["render",V],["__scopeId","data-v-37e0694d"]]);export{D as default};
