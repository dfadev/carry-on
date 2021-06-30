(self.webpackChunk=self.webpackChunk||[]).push([[455],{3905:(e,t,n)=>{"use strict";n.d(t,{Zo:()=>u,kt:()=>f});var r=n(27378);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,s=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),d=l(n),f=o,v=d["".concat(c,".").concat(f)]||d[f]||p[f]||s;return n?r.createElement(v,a(a({ref:t},u),{},{components:n})):r.createElement(v,a({ref:t},u))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=n.length,a=new Array(s);a[0]=d;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:o,a[1]=i;for(var l=2;l<s;l++)a[l]=n[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},23737:(e,t,n)=>{"use strict";n.r(t),n.d(t,{frontMatter:()=>a,contentTitle:()=>i,metadata:()=>c,toc:()=>l,default:()=>p});var r=n(22122),o=n(19756),s=(n(27378),n(3905)),a={id:"stateDrivenFunctions",title:"State Driven Functions"},i=void 0,c={unversionedId:"stateDrivenFunctions",id:"stateDrivenFunctions",isDocsHomePage:!1,title:"State Driven Functions",description:"State driven functions",source:"@site/../docs/stateDrivenFunctions.md",sourceDirName:".",slug:"/stateDrivenFunctions",permalink:"/carry-on/docs/stateDrivenFunctions",version:"current",lastUpdatedBy:"Russ Panula",lastUpdatedAt:1621950037,formattedLastUpdatedAt:"5/25/2021",frontMatter:{id:"stateDrivenFunctions",title:"State Driven Functions"},sidebar:"docs",previous:{title:"Actions are Functions",permalink:"/carry-on/docs/actionsAreFunctions"},next:{title:"Core Concepts",permalink:"/carry-on/docs/coreConcepts"}},l=[{value:"State driven functions",id:"state-driven-functions",children:[]}],u={toc:l};function p(e){var t=e.components,n=(0,o.Z)(e,["components"]);return(0,s.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h2",{id:"state-driven-functions"},"State driven functions"),(0,s.kt)("p",null,"A ",(0,s.kt)("inlineCode",{parentName:"p"},"watch")," function executes once immediately with the current state and then subsequently as state changes."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"live noInline",live:!0,noInline:!0},'import { register, watch, set } from "carry-on-store";\n\nconst storeId = "stateDrivenFunctions";\n\nregister(storeId, {\n  state: ({ get, set }) => ({\n    value: 1,\n    subscriptions: [],\n    unsubscribe: () => {\n      set(state => {\n        state.subscriptions.forEach(fn => fn());\n        state.subscriptions = [];\n      });\n    },\n    logs: []\n  })\n});\n\n// simple vocabulary for watch readability\nconst positiveValue = ({ value }) => value >= 0;\nconst logValue = ({ logs, value }) => logs.push("watch value=" + value);\nconst bigLogs = ({ logs: { length } }) => length > 10;\nconst trimLogs = ({ logs }) => logs.shift();\nconst logSizeOk = () => {\n  throw new Error("log size small");\n};\nconst error = (state, error, id) => {\n  console.log(error);\n};\n\nset(storeId, ({ subscriptions }) => {\n  const interval = setInterval(() => {\n    set(storeId, state => {\n      state.value += 1;\n      state.logs.push("setInterval value=" + state.value);\n    });\n  }, 1000);\n\n  subscriptions.push(\n    watch({ from: storeId, if: positiveValue, then: logValue }),\n    watch({\n      from: storeId,\n      if: bigLogs,\n      then: trimLogs,\n      else: logSizeOk,\n      error\n    }),\n    () => clearInterval(interval)\n  );\n});\n\nrender(\n  <StateInspector from={storeId} onUnmount={state => state.unsubscribe()} />\n);\n')))}p.isMDXComponent=!0}}]);