(self.webpackChunk=self.webpackChunk||[]).push([[66],{3905:(e,t,r)=>{"use strict";r.d(t,{Zo:()=>p,kt:()=>u});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),d=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=d(e.components);return n.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),c=d(r),u=a,g=c["".concat(s,".").concat(u)]||c[u]||m[u]||i;return r?n.createElement(g,o(o({ref:t},p),{},{components:r})):n.createElement(g,o({ref:t},p))}));function u(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=c;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var d=2;d<i;d++)o[d]=r[d];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}c.displayName="MDXCreateElement"},7920:(e,t,r)=>{"use strict";r.r(t),r.d(t,{frontMatter:()=>o,metadata:()=>l,toc:()=>s,default:()=>p});var n=r(2122),a=r(9756),i=(r(7294),r(3905)),o={id:"register",title:"register"},l={unversionedId:"api/carry-on-store/register",id:"api/carry-on-store/register",isDocsHomePage:!1,title:"register",description:"Import",source:"@site/../docs/api/carry-on-store/register.md",sourceDirName:"api/carry-on-store",slug:"/api/carry-on-store/register",permalink:"/carry-on/docs/api/carry-on-store/register",version:"current",lastUpdatedBy:"Russ Panula",lastUpdatedAt:1619946735,formattedLastUpdatedAt:"5/2/2021",frontMatter:{id:"register",title:"register"},sidebar:"docs",previous:{title:"getStore",permalink:"/carry-on/docs/api/carry-on-store/getStore"},next:{title:"subscribe",permalink:"/carry-on/docs/api/carry-on-store/subscribe"}},s=[{value:"Import",id:"import",children:[]},{value:"<code>register(</code><em><code>[</code></em><code>{</code><em><code>state</code></em><code>,</code><em><code>middleware</code></em><code>,</code><em><code>priority</code></em><code>}</code><em><code>]</code></em><code>,</code><em><code>storeId</code></em><code>)</code>",id:"registerstatemiddlewareprioritystoreid",children:[]},{value:"Registering state:",id:"registering-state",children:[]}],d={toc:s};function p(e){var t=e.components,r=(0,a.Z)(e,["components"]);return(0,i.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"import"},"Import"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'\nimport { register } from "carry-on-store";\n\n')),(0,i.kt)("h2",{id:"registerstatemiddlewareprioritystoreid"},(0,i.kt)("inlineCode",{parentName:"h2"},"register("),(0,i.kt)("em",{parentName:"h2"},(0,i.kt)("inlineCode",{parentName:"em"},"[")),(0,i.kt)("inlineCode",{parentName:"h2"},"{"),(0,i.kt)("em",{parentName:"h2"},(0,i.kt)("inlineCode",{parentName:"em"},"state")),(0,i.kt)("inlineCode",{parentName:"h2"},","),(0,i.kt)("em",{parentName:"h2"},(0,i.kt)("inlineCode",{parentName:"em"},"middleware")),(0,i.kt)("inlineCode",{parentName:"h2"},","),(0,i.kt)("em",{parentName:"h2"},(0,i.kt)("inlineCode",{parentName:"em"},"priority")),(0,i.kt)("inlineCode",{parentName:"h2"},"}"),(0,i.kt)("em",{parentName:"h2"},(0,i.kt)("inlineCode",{parentName:"em"},"]")),(0,i.kt)("inlineCode",{parentName:"h2"},","),(0,i.kt)("em",{parentName:"h2"},(0,i.kt)("inlineCode",{parentName:"em"},"storeId")),(0,i.kt)("inlineCode",{parentName:"h2"},")")),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"state")),(0,i.kt)("td",{parentName:"tr",align:null},"Function or object that represents the state to register")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"middleware")),(0,i.kt)("td",{parentName:"tr",align:null},"Function that acts as middleware wrapped around an action")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"priority")),(0,i.kt)("td",{parentName:"tr",align:null},"State is registered in a undeterministic order unless a priority is specified. Higher priority state is registered first.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"storeId")),(0,i.kt)("td",{parentName:"tr",align:null},"The name of the store to register state in.")))),(0,i.kt)("h2",{id:"registering-state"},"Registering state:"),(0,i.kt)("p",null,"The ",(0,i.kt)("em",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"em"},"set"))," function is used to change state and the ",(0,i.kt)("em",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"em"},"get"))," function to retrieve state."),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Function"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"set(state => {},"),(0,i.kt)("em",{parentName:"td"},(0,i.kt)("inlineCode",{parentName:"em"},"type")),(0,i.kt)("inlineCode",{parentName:"td"},")")),(0,i.kt)("td",{parentName:"tr",align:null},"Calls a function that mutates the passed state. Optionally specify a string ",(0,i.kt)("inlineCode",{parentName:"td"},"type")," to display when viewing state changes in Dev Tools.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"get(state => {})")),(0,i.kt)("td",{parentName:"tr",align:null},"Calls a function that queries the passed state and returns the result.")))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'\nconst state = ({ get, set }) => ({\n    field: "value",\n    change(val) {\n        set(state => {\n            state.field = val;\n        }, "Change Value");\n    },\n    isIt(val) {\n        return get(({ field }) => field === val);\n    }\n});\n\n\n// register one state\nregister({ state });\n\n\n// register multiple states\nregister([\n  { state },\n  { state },\n  { state }\n]);\n\n\n// register state into a named store\nregister({ state }, "store1");\n\n')))}p.isMDXComponent=!0}}]);