"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[850],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>m});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),p=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(r),m=a,f=u["".concat(l,".").concat(m)]||u[m]||d[m]||o;return r?n.createElement(f,i(i({ref:t},c),{},{components:r})):n.createElement(f,i({ref:t},c))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var p=2;p<o;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},4276:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>m,frontMatter:()=>s,metadata:()=>p,toc:()=>d});var n=r(7462),a=r(3366),o=(r(7294),r(3905)),i=["components"],s={id:"set",title:"set"},l=void 0,p={unversionedId:"api/carry-on-store/set",id:"api/carry-on-store/set",title:"set",description:"set(fn, storeId, type)",source:"@site/../docs/api/carry-on-store/set.md",sourceDirName:"api/carry-on-store",slug:"/api/carry-on-store/set",permalink:"/carry-on/docs/api/carry-on-store/set",draft:!1,tags:[],version:"current",lastUpdatedBy:"Russ Panula",lastUpdatedAt:1621950012,formattedLastUpdatedAt:"5/25/2021",frontMatter:{id:"set",title:"set"},sidebar:"docs",previous:{title:"register",permalink:"/carry-on/docs/api/carry-on-store/register"},next:{title:"subscribe",permalink:"/carry-on/docs/api/carry-on-store/subscribe"}},c={},d=[{value:"<code>set(fn, storeId, type)</code>",id:"setfn-storeid-type",level:2},{value:"<code>set(storeId, fn, type)</code>",id:"setstoreid-fn-type",level:2}],u={toc:d};function m(e){var t=e.components,r=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"setfn-storeid-type"},(0,o.kt)("inlineCode",{parentName:"h2"},"set(fn, storeId, type)")),(0,o.kt)("h2",{id:"setstoreid-fn-type"},(0,o.kt)("inlineCode",{parentName:"h2"},"set(storeId, fn, type)")),(0,o.kt)("p",null,"Sets store state. The only required parameter is the mutation function."),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,o.kt)("th",{parentName:"tr",align:null},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"storeId")),(0,o.kt)("td",{parentName:"tr",align:null},"The name of the store to use.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"fn")),(0,o.kt)("td",{parentName:"tr",align:null},"The mutation function to execute with the current state.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"type")),(0,o.kt)("td",{parentName:"tr",align:null},"A string representing the action type. Used with ",(0,o.kt)("inlineCode",{parentName:"td"},"devTools"),".")))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},'import { set } from "carry-on-store";\n\nconst storeId = "storeSetExample";\n\nset(storeId, state => {\n  state.field1 = 1;\n  state.field2 = 2;\n});\n\nrender(<StateInspector from={storeId} />);\n')))}m.isMDXComponent=!0}}]);