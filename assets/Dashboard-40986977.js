import{d as p,s as _,b as i,_ as l,h as o,o as u,i as m,c as s,w as f,F as g,j as a,t as v}from"./index-c710ad7e.js";const b=p({name:"Dashboard",setup(t){const e=_();return{user:i(()=>e.state.user)}}});const h={style:{padding:"20px",background:"#fff"},class:"content"};function x(t,e,n,y,B,$){const r=o("a-page-header"),c=o("a-divider"),d=o("a-layout-content");return u(),m(g,null,[s(r,{class:"pageHeader",title:"Bem vindo ao Ollix!","sub-title":"Lorem ipsum dolor sit amet",onBack:e[0]||(e[0]=()=>t.$router.go(-1))}),s(d,{style:{margin:"10px 16px 25px"}},{default:f(()=>[a("div",h,[s(c),a("h4",null,"Bem vindo "+v(t.user.firstName),1)])]),_:1})],64)}const D=l(b,[["render",x],["__scopeId","data-v-c9e42bc2"]]);export{D as default};