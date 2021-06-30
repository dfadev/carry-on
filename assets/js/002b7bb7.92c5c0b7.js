(self.webpackChunk=self.webpackChunk||[]).push([[951],{3905:(t,e,n)=>{"use strict";n.d(e,{Zo:()=>c,kt:()=>m});var a=n(27378);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},l=Object.keys(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var s=a.createContext({}),d=function(t){var e=a.useContext(s),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},c=function(t){var e=d(t.components);return a.createElement(s.Provider,{value:e},t.children)},p={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},u=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,l=t.originalType,s=t.parentName,c=o(t,["components","mdxType","originalType","parentName"]),u=d(n),m=r,g=u["".concat(s,".").concat(m)]||u[m]||p[m]||l;return n?a.createElement(g,i(i({ref:e},c),{},{components:n})):a.createElement(g,i({ref:e},c))}));function m(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var l=n.length,i=new Array(l);i[0]=u;var o={};for(var s in e)hasOwnProperty.call(e,s)&&(o[s]=e[s]);o.originalType=t,o.mdxType="string"==typeof t?t:r,i[1]=o;for(var d=2;d<l;d++)i[d]=n[d];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},89037:(t,e,n)=>{"use strict";n.r(e),n.d(e,{frontMatter:()=>i,contentTitle:()=>o,metadata:()=>s,toc:()=>d,default:()=>p});var a=n(22122),r=n(19756),l=(n(27378),n(3905)),i={id:"watch",title:"watch"},o=void 0,s={unversionedId:"api/carry-on-store/watch",id:"api/carry-on-store/watch",isDocsHomePage:!1,title:"watch",description:"watch({ ...opts })",source:"@site/../docs/api/carry-on-store/watch.md",sourceDirName:"api/carry-on-store",slug:"/api/carry-on-store/watch",permalink:"/carry-on/docs/api/carry-on-store/watch",version:"current",lastUpdatedBy:"Russ Panula",lastUpdatedAt:1621950037,formattedLastUpdatedAt:"5/25/2021",frontMatter:{id:"watch",title:"watch"},sidebar:"docs",previous:{title:"subscribe",permalink:"/carry-on/docs/api/carry-on-store/subscribe"},next:{title:"<State>",permalink:"/carry-on/docs/api/carry-on-react/State"}},d=[{value:"<code>watch({ ...opts })</code>",id:"watch-opts-",children:[{value:"Watch options:",id:"watch-options",children:[]}]},{value:"Example",id:"example",children:[]},{value:"Watch Debugging",id:"watch-debugging",children:[]}],c={toc:d};function p(t){var e=t.components,n=(0,r.Z)(t,["components"]);return(0,l.kt)("wrapper",(0,a.Z)({},c,n,{components:e,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"watch-opts-"},(0,l.kt)("inlineCode",{parentName:"h2"},"watch({ ...opts })")),(0,l.kt)("p",null,"Executes the specified if/then functions immediately with the current state and subsequently when state accessed changes."),(0,l.kt)("h3",{id:"watch-options"},"Watch options:"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Property"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"),(0,l.kt)("th",{parentName:"tr",align:null},"Default"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"from")),(0,l.kt)("td",{parentName:"tr",align:null},"What store to retrieve state from."),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"path")),(0,l.kt)("td",{parentName:"tr",align:null},"The state path to retrieve. Specified as a dotted path string, with support for arrays. Sample: ",(0,l.kt)("inlineCode",{parentName:"td"},'"my.field.path[10].name"')),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"if")),(0,l.kt)("td",{parentName:"tr",align:null},"The watch query function. Any changes to fields accessed by this function will trigger a re-execution."),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"then")),(0,l.kt)("td",{parentName:"tr",align:null},"The watch mutation ",(0,l.kt)("inlineCode",{parentName:"td"},"then")," function. This function will be called when the result of ",(0,l.kt)("inlineCode",{parentName:"td"},"if")," is true. The state may be modified here."),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"else")),(0,l.kt)("td",{parentName:"tr",align:null},"The watch mutation ",(0,l.kt)("inlineCode",{parentName:"td"},"else")," function. This function will be called when the result of ",(0,l.kt)("inlineCode",{parentName:"td"},"if")," is false. The state may be modified here."),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"error")),(0,l.kt)("td",{parentName:"tr",align:null},"The watch mutation ",(0,l.kt)("inlineCode",{parentName:"td"},"error")," function. This function will be called when an exception occurs. The state may be modified here."),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"strict")),(0,l.kt)("td",{parentName:"tr",align:null},"When true, the fields the function accesses will be tracked on every execution instead of on just the first one."),(0,l.kt)("td",{parentName:"tr",align:null},"true")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"default")),(0,l.kt)("td",{parentName:"tr",align:null},"The default value when the state is undefined."),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"throttle")),(0,l.kt)("td",{parentName:"tr",align:null},"Milliseconds to throttle executions"),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"debounce")),(0,l.kt)("td",{parentName:"tr",align:null},"Milliseconds to debounce executions"),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"debug")),(0,l.kt)("td",{parentName:"tr",align:null},"When true, log messages regarding state changes will be printed to the ",(0,l.kt)("inlineCode",{parentName:"td"},"console"),"."),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"verbose")),(0,l.kt)("td",{parentName:"tr",align:null},"When true, verbose log messages are printed to the ",(0,l.kt)("inlineCode",{parentName:"td"},"console"),"."),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"id")),(0,l.kt)("td",{parentName:"tr",align:null},"Debug log uses this to identify components"),(0,l.kt)("td",{parentName:"tr",align:null})))),(0,l.kt)("h2",{id:"example"},"Example"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"live noInline",live:!0,noInline:!0},'import { register, watch, set } from "carry-on-store";\n\nconst storeId = "watchExample";\n\nregister(storeId, {\n  state: ({ get, set }) => ({\n    value: 1,\n    subscriptions: [],\n    unsubscribe: () => {\n      set(state => {\n        state.subscriptions.forEach(fn => fn());\n        state.subscriptions = [];\n      });\n    },\n    logs: []\n  })\n});\n\n// simple vocabulary for watch readability\nconst positiveValue = ({ value }) => value >= 0;\nconst logValue = ({ logs, value }) => logs.push("watch value=" + value);\nconst bigLogs = ({ logs: { length } }) => length > 10;\nconst trimLogs = ({ logs }) => logs.shift();\nconst logSizeOk = () => {\n  throw new Error("log size small");\n};\nconst error = (state, error, id) => {\n  console.log(error);\n};\n\nset(storeId, ({ subscriptions }) => {\n  const interval = setInterval(() => {\n    set(storeId, state => {\n      state.value += 1;\n      state.logs.push("setInterval value=" + state.value);\n    });\n  }, 1000);\n\n  subscriptions.push(\n    watch({ from: storeId, if: positiveValue, then: logValue }),\n    watch({\n      from: storeId,\n      if: bigLogs,\n      then: trimLogs,\n      else: logSizeOk,\n      error\n    }),\n    () => clearInterval(interval)\n  );\n});\n\nrender(\n  <StateInspector from={storeId} onUnmount={state => state.unsubscribe()} />\n);\n')),(0,l.kt)("h2",{id:"watch-debugging"},"Watch Debugging"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'import { Watch } from "carry-on-store";\n\nWatch.Debug = true;\nWatch.Verbose = true;\n')),(0,l.kt)("p",null,"You can turn on watch debugging to send debug messages to the console."))}p.isMDXComponent=!0}}]);