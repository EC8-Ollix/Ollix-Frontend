import{T as k,r as f,a as S,x as C,y as w,z as B,_ as T,h as i,o as h,i as x,c,w as y,F as b,j as F,k as N,t as v,l as z}from"./index-2a7cd95a.js";import{u as I}from"./useNavigation-5a162b60.js";const E={name:"AjaxTable",components:{"a-table":k},setup(){const{goBack:d}=I(),o=f([]),r=f(!1),e=S({pagination:{current:1,pageSize:10},sorter:{}}),g=[{title:"Name",dataIndex:"name",sorter:!0,width:"20%"},{title:"Gender",dataIndex:"gender",filters:[{text:"Male",value:"male"},{text:"Female",value:"female"}],width:"20%"},{title:"Email",dataIndex:"email"}],s=async()=>{var t,a;r.value=!0;try{const n=await B.get("https://randomuser.me/api?",{params:{results:(t=e.pagination)==null?void 0:t.pageSize,page:(a=e.pagination)==null?void 0:a.current,...e}});o.value=n.data.results,e.pagination.total=200}catch(n){console.error("Failed to fetch data:",n)}finally{r.value=!1}};return C(s),w(()=>e,s,{deep:!0}),{data:o,loading:r,tableParams:e,columns:g,handleTableChange:(t,a)=>{var u,_,m;e.pagination=t;let n=l(a);e.sorter.sorterField=(u=n.field)==null?void 0:u.toString(),e.sorter.sorterOrder=(_=n.order)==null?void 0:_.toString(),t.pageSize!==((m=e.pagination)==null?void 0:m.pageSize)&&(o.value=[])},goBack:d};function l(t){let a;return Array.isArray(t)?a=t[0]:a=t,a}}};const U={style:{padding:"20px",background:"#fff"},class:"content"};function V(d,o,r,e,g,s){const p=i("a-page-header"),l=i("a-table"),t=i("a-layout-content");return h(),x(b,null,[c(p,{class:"pageHeader",title:"Usuários","sub-title":"Gerencie os Usuários por aqui",onBack:e.goBack},null,8,["onBack"]),c(t,{style:{margin:"10px 16px 25px"}},{default:y(()=>[F("div",U,[c(l,{columns:e.columns,"row-key":a=>a.login.uuid,"data-source":e.data,pagination:e.tableParams.pagination,loading:e.loading,onChange:e.handleTableChange},{bodyCell:y(({column:a,text:n})=>[a.dataIndex==="name"?(h(),x(b,{key:0},[N(v(n.first)+" "+v(n.last),1)],64)):z("",!0)]),_:1},8,["columns","row-key","data-source","pagination","loading","onChange"])])]),_:1})],64)}const D=T(E,[["render",V],["__scopeId","data-v-e68c40c5"]]);export{D as default};