"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1994],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>m});var o=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var i=o.createContext({}),p=function(e){var t=o.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},c=function(e){var t=p(e.components);return o.createElement(i.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(r),m=n,v=u["".concat(i,".").concat(m)]||u[m]||d[m]||a;return r?o.createElement(v,l(l({ref:t},c),{},{components:r})):o.createElement(v,l({ref:t},c))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,l=new Array(a);l[0]=u;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:n,l[1]=s;for(var p=2;p<a;p++)l[p]=r[p];return o.createElement.apply(null,l)}return o.createElement.apply(null,r)}u.displayName="MDXCreateElement"},5665:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>s,metadata:()=>p,toc:()=>d});var o=r(7462),n=r(3366),a=(r(7294),r(3905)),l=["components"],s={id:"devTools",title:"devTools"},i=void 0,p={unversionedId:"api/carry-on-store/devTools",id:"api/carry-on-store/devTools",title:"devTools",description:"devTools({ ...opts })",source:"@site/../docs/api/carry-on-store/devTools.md",sourceDirName:"api/carry-on-store",slug:"/api/carry-on-store/devTools",permalink:"/carry-on/docs/api/carry-on-store/devTools",draft:!1,tags:[],version:"current",lastUpdatedBy:"Russ Panula",lastUpdatedAt:1621922028,formattedLastUpdatedAt:"5/25/2021",frontMatter:{id:"devTools",title:"devTools"},sidebar:"docs",previous:{title:"deleteStore",permalink:"/carry-on/docs/api/carry-on-store/deleteStore"},next:{title:"get",permalink:"/carry-on/docs/api/carry-on-store/get"}},c={},d=[{value:"<code>devTools({ ...opts })</code>",id:"devtools-opts-",level:2},{value:"devTools options",id:"devtools-options",level:3}],u={toc:d};function m(e){var t=e.components,r=(0,n.Z)(e,l);return(0,a.kt)("wrapper",(0,o.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"devtools-opts-"},(0,a.kt)("inlineCode",{parentName:"h2"},"devTools({ ...opts })")),(0,a.kt)("p",null,"The store can be viewed using the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/zalmoxisus/redux-devtools-extension"},"Redux Dev Tools Extension"),"."),(0,a.kt)("p",null,"If you are using multiple named stores, the ",(0,a.kt)("inlineCode",{parentName:"p"},"devTools")," plugin must be registered on each store you want to use it on."),(0,a.kt)("h3",{id:"devtools-options"},"devTools options"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Property"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"timeTravel")),(0,a.kt)("td",{parentName:"tr",align:null},"Should the plugin support time travel.")))),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'import { register, devTools } from "carry-on-store";\n\nregister(devTools({ timeTravel: false }));\n')))}m.isMDXComponent=!0}}]);