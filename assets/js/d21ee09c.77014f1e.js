"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3776],{3905:(t,e,n)=>{n.d(e,{Zo:()=>s,kt:()=>m});var a=n(7294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function i(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},o=Object.keys(t);for(a=0;a<o.length;a++)n=o[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(a=0;a<o.length;a++)n=o[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var d=a.createContext({}),p=function(t){var e=a.useContext(d),n=e;return t&&(n="function"==typeof t?t(e):l(l({},e),t)),n},s=function(t){var e=p(t.components);return a.createElement(d.Provider,{value:e},t.children)},c={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},u=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,o=t.originalType,d=t.parentName,s=i(t,["components","mdxType","originalType","parentName"]),u=p(n),m=r,k=u["".concat(d,".").concat(m)]||u[m]||c[m]||o;return n?a.createElement(k,l(l({ref:e},s),{},{components:n})):a.createElement(k,l({ref:e},s))}));function m(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var o=n.length,l=new Array(o);l[0]=u;var i={};for(var d in e)hasOwnProperty.call(e,d)&&(i[d]=e[d]);i.originalType=t,i.mdxType="string"==typeof t?t:r,l[1]=i;for(var p=2;p<o;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},3406:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>s,contentTitle:()=>d,default:()=>m,frontMatter:()=>i,metadata:()=>p,toc:()=>c});var a=n(7462),r=n(3366),o=(n(7294),n(3905)),l=["components"],i={id:"State",title:"<State>"},d=void 0,p={unversionedId:"api/carry-on-react/State",id:"api/carry-on-react/State",title:"<State>",description:"Retrieve state from a store and render content based on it. Render again when that state changes.",source:"@site/../docs/api/carry-on-react/State.md",sourceDirName:"api/carry-on-react",slug:"/api/carry-on-react/State",permalink:"/carry-on/docs/api/carry-on-react/State",draft:!1,tags:[],version:"current",lastUpdatedBy:"Russ Panula",lastUpdatedAt:1622243065,formattedLastUpdatedAt:"5/28/2021",frontMatter:{id:"State",title:"<State>"},sidebar:"docs",previous:{title:"watch",permalink:"/carry-on/docs/api/carry-on-store/watch"},next:{title:"<Store>",permalink:"/carry-on/docs/api/carry-on-react/Store"}},s={},c=[{value:"Properties",id:"properties",level:2},{value:"Accessing",id:"accessing",level:2},{value:"Debugging",id:"debugging",level:2}],u={toc:c};function m(t){var e=t.components,n=(0,r.Z)(t,l);return(0,o.kt)("wrapper",(0,a.Z)({},u,n,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Retrieve state from a store and render content based on it. Render again when that state changes."),(0,o.kt)("h2",{id:"properties"},"Properties"),(0,o.kt)("p",null,"All properties are optional."),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Property"),(0,o.kt)("th",{parentName:"tr",align:null},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"render")," or ",(0,o.kt)("inlineCode",{parentName:"td"},"children")),(0,o.kt)("td",{parentName:"tr",align:null},"The render function. This function will be called with the state as it's first parameter.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"from")),(0,o.kt)("td",{parentName:"tr",align:null},"What store to retrieve state from.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"path")),(0,o.kt)("td",{parentName:"tr",align:null},"The state path to retrieve. Specified as a dotted path string, with support for arrays. Sample: ",(0,o.kt)("inlineCode",{parentName:"td"},'"my.field.path[10].name"'))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"select")),(0,o.kt)("td",{parentName:"tr",align:null},"A function that selects the required state.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"constant")),(0,o.kt)("td",{parentName:"tr",align:null},"When true, the ",(0,o.kt)("inlineCode",{parentName:"td"},"State")," component will query state and render only once.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"strict")),(0,o.kt)("td",{parentName:"tr",align:null},"When true, the ",(0,o.kt)("inlineCode",{parentName:"td"},"State")," component will track accessed keys on every update instead of on just the first one.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"default")),(0,o.kt)("td",{parentName:"tr",align:null},"The default value when the state is undefined.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"throttle")),(0,o.kt)("td",{parentName:"tr",align:null},"Milliseconds to throttle change requests")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"debounce")),(0,o.kt)("td",{parentName:"tr",align:null},"Milliseconds to debounce change requests")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"debug")),(0,o.kt)("td",{parentName:"tr",align:null},"When true, log messages regarding state changes will be printed to the ",(0,o.kt)("inlineCode",{parentName:"td"},"console"),".")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"verbose")),(0,o.kt)("td",{parentName:"tr",align:null},"When true, verbose log messages are printed to the ",(0,o.kt)("inlineCode",{parentName:"td"},"console"),".")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"id")),(0,o.kt)("td",{parentName:"tr",align:null},"Debug log uses this to identify components")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"onMount")),(0,o.kt)("td",{parentName:"tr",align:null},"Called with the current state when the component mounts.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"onUnmount")),(0,o.kt)("td",{parentName:"tr",align:null},"Called with the current state when the component unmounts.")))),(0,o.kt)("h2",{id:"accessing"},"Accessing"),(0,o.kt)("p",null,"Accessing state is done using the State component:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"register({\n  state: ({ set }) => ({\n    counter: 0,\n    inc: () =>\n      set(state => {\n        state.counter++;\n      }),\n    dec: () =>\n      set(state => {\n        state.counter--;\n      })\n  })\n});\n\nconst App = () => (\n  <State>\n    {state => (\n      <>\n        <div>Counter: {state.counter}</div>\n        <button onClick={state.inc}>+</button>\n        <button onClick={state.dec}>-</button>\n      </>\n    )}\n  </State>\n);\n")),(0,o.kt)("h2",{id:"debugging"},"Debugging"),(0,o.kt)("p",null,"Using ",(0,o.kt)("inlineCode",{parentName:"p"},"debug")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"verbose")," can help find problems:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"register({\n  state: ({ set }) => ({\n    counter: 0,\n    inc: () =>\n      set(state => {\n        state.counter++;\n      }),\n    dec: () =>\n      set(state => {\n        state.counter--;\n      })\n  })\n});\n\nconst App = () => (\n  <State debug verbose>\n    {state => (\n      <>\n        <div>Counter: {state.counter}</div>\n        <button onClick={state.inc}>+</button>\n        <button onClick={state.dec}>-</button>\n      </>\n    )}\n  </State>\n);\n")),(0,o.kt)("p",null,"Enabling ",(0,o.kt)("inlineCode",{parentName:"p"},"debug")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"verbose")," on all State components:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"register({\n  state: ({ set }) => ({\n    counter: 0,\n    inc: () =>\n      set(state => {\n        state.counter++;\n      }),\n    dec: () =>\n      set(state => {\n        state.counter--;\n      })\n  })\n});\n\nState.Debug = true;\nState.Verbose = true;\n\nconst App = () => (\n  <State>\n    {state => (\n      <>\n        <div>Counter: {state.counter}</div>\n        <button onClick={state.inc}>+</button>\n        <button onClick={state.dec}>-</button>\n      </>\n    )}\n  </State>\n);\n")))}m.isMDXComponent=!0}}]);