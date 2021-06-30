(self.webpackChunk=self.webpackChunk||[]).push([[5566],{3905:(e,t,n)=>{"use strict";n.d(t,{Zo:()=>d,kt:()=>p});var r=n(27378);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),m=l(n),p=o,v=m["".concat(c,".").concat(p)]||m[p]||u[p]||a;return n?r.createElement(v,s(s({ref:t},d),{},{components:n})):r.createElement(v,s({ref:t},d))}));function p(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,s=new Array(a);s[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:o,s[1]=i;for(var l=2;l<a;l++)s[l]=n[l];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},37589:(e,t,n)=>{"use strict";n.r(t),n.d(t,{frontMatter:()=>s,contentTitle:()=>i,metadata:()=>c,toc:()=>l,default:()=>u});var r=n(22122),o=n(19756),a=(n(27378),n(3905)),s={id:"index",slug:"/examples/",title:"Examples"},i=void 0,c={unversionedId:"examples/index",id:"examples/index",isDocsHomePage:!1,title:"Examples",description:"Default store",source:"@site/../docs/examples/index.md",sourceDirName:"examples",slug:"/examples/",permalink:"/carry-on/docs/examples/",version:"current",lastUpdatedBy:"Russ Panula",lastUpdatedAt:1621809015,formattedLastUpdatedAt:"5/23/2021",frontMatter:{id:"index",slug:"/examples/",title:"Examples"},sidebar:"docs",previous:{title:"Composing State",permalink:"/carry-on/docs/composingState"},next:{title:"Selectors",permalink:"/carry-on/docs/optionalSelectors"}},l=[{value:"Default store",id:"default-store",children:[]},{value:"Two named stores",id:"two-named-stores",children:[]},{value:"State select",id:"state-select",children:[]},{value:"Register state",id:"register-state",children:[]},{value:"Register state on a named store",id:"register-state-on-a-named-store",children:[]},{value:"State path",id:"state-path",children:[]},{value:"State path with default",id:"state-path-with-default",children:[]},{value:"State path on a named store using from",id:"state-path-on-a-named-store-using-from",children:[]},{value:"Multiple select",id:"multiple-select",children:[]}],d={toc:l};function u(e){var t=e.components,n=(0,o.Z)(e,["components"]);return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"default-store"},"Default store"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},"register({\n  state: ({ set }) => ({\n    counter: 0,\n    inc: () => set(state => void state.counter++),\n    dec: () => set(state => void state.counter--)\n  })\n});\n\nrender(\n  <>\n    <State>\n      {state => (\n        <>\n          <div>Counter: {state.counter}</div>\n          <button onClick={state.inc}>+</button>\n          <button onClick={state.dec}>-</button>\n        </>\n      )}\n    </State>\n    <StateInspector />\n  </>\n);\n")),(0,a.kt)("h2",{id:"two-named-stores"},"Two named stores"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},'const state = {\n  state: ({ set }) => ({\n    counter: 0,\n    inc: () => set(state => void state.counter++),\n    dec: () => set(state => void state.counter--)\n  })\n};\n\nregister("store1", state);\nregister("store2", state);\n\nrender(\n  <>\n    <State from="store1">\n      {state => (\n        <div>\n          <h4>Store 1</h4>\n          <div>Counter: {state.counter}</div>\n          <button onClick={state.inc}>+</button>\n          <button onClick={state.dec}>-</button>\n        </div>\n      )}\n    </State>\n    <StateInspector from="store1" />\n\n    <State from="store2">\n      {({ counter, inc, dec }) => (\n        <div>\n          <h4>Store 2</h4>\n          <div>Counter: {counter}</div>\n          <button onClick={inc}>+</button>\n          <button onClick={dec}>-</button>\n        </div>\n      )}\n    </State>\n    <StateInspector from="store2" />\n  </>\n);\n')),(0,a.kt)("h2",{id:"state-select"},"State select"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},'const storeId = "stateSelect";\n\nregister(storeId, {\n  state: ({ set }) => ({\n    notSelected: "item",\n    counter: 0,\n    inc: () => set(state => void state.counter++),\n    dec: () => set(state => void state.counter--)\n  })\n});\n\nconst select = ({ counter, inc, dec }) => ({ counter, inc, dec });\n\nrender(\n  <>\n    <State from={storeId} select={select}>\n      {({ counter, inc, dec, notSelected }) => (\n        <div>\n          <div>\n            notSelected is undefined? {notSelected === undefined ? "yes" : "no"}\n          </div>\n          <div>Counter: {counter}</div>\n          <button onClick={inc}>+</button>\n          <button onClick={dec}>-</button>\n        </div>\n      )}\n    </State>\n    <StateInspector from={storeId} />\n  </>\n);\n')),(0,a.kt)("h2",{id:"register-state"},"Register state"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},'const storeId = "registerState";\n\nregister(storeId, {\n  state: ({ set }) => ({\n    counter: 0,\n    inc: () => set(state => void state.counter++),\n    dec: () => set(state => void state.counter--)\n  })\n});\n\nrender(\n  <>\n    <State from={storeId}>\n      {({ counter, inc, dec }) => (\n        <>\n          <div>Counter: {counter}</div>\n          <button onClick={inc}>+</button>\n          <button onClick={dec}>-</button>\n        </>\n      )}\n    </State>\n    <StateInspector from={storeId} />\n  </>\n);\n')),(0,a.kt)("h2",{id:"register-state-on-a-named-store"},"Register state on a named store"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},'const storeId = "store1";\n\nregister(storeId, {\n  state: ({ set }) => ({\n    counter: 0,\n    inc: () => set(state => void state.counter++),\n    dec: () => set(state => void state.counter--)\n  })\n});\n\nrender(\n  <>\n    <State from={storeId}>\n      {({ counter, inc, dec }) => (\n        <>\n          <div>Counter: {counter}</div>\n          <button onClick={inc}>+</button>\n          <button onClick={dec}>-</button>\n        </>\n      )}\n    </State>\n    <StateInspector from={storeId} />\n  </>\n);\n')),(0,a.kt)("h2",{id:"state-path"},"State path"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},'const storeId = "statePath";\n\nregister(storeId, {\n  state: ({ set }) => ({\n    more: {\n      stuff: {\n        list: [{ item: "one" }, { item: "two" }]\n      }\n    }\n  })\n});\n\nrender(\n  <>\n    <State from={storeId} path="more.stuff.list[0].item">\n      {item => {\n        return <div>{item}</div>;\n      }}\n    </State>\n    <StateInspector from={storeId} />\n  </>\n);\n')),(0,a.kt)("h2",{id:"state-path-with-default"},"State path with default"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},'const storeId = "statePathDefault";\n\nregister(storeId, {\n  state: ({ set }) => ({\n    more: {\n      stuff: {\n        list: [{ item: "one" }, { item: "two" }]\n      }\n    }\n  })\n});\n\nrender(\n  <>\n    <State from={storeId} path="oops.more.stuff.list[0].item" default="ok">\n      {item => {\n        return <div>{item}</div>;\n      }}\n    </State>\n    <StateInspector from={storeId} />\n  </>\n);\n')),(0,a.kt)("h2",{id:"state-path-on-a-named-store-using-from"},"State path on a named store using from"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},'const storeId = "statePathNamedStore";\n\nregister(storeId, {\n  state: ({ set }) => ({\n    more: {\n      stuff: {\n        list: [{ item: "one" }, { item: "two" }]\n      }\n    }\n  })\n});\n\nrender(\n  <>\n    <State from={storeId} path="more.stuff.list[0].item">\n      {item => <div>{item}</div>}\n    </State>\n    <StateInspector from={storeId} />\n  </>\n);\n')),(0,a.kt)("h2",{id:"multiple-select"},"Multiple select"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},'const storeId = "multipleSelect";\n\nregister(storeId, {\n  state: ({ set }) => ({\n    counter: 0,\n    inc: () => set(state => void state.counter++),\n    dec: () => set(state => void state.counter--)\n  })\n});\n\nconst selectCounter = ({ counter }) => counter;\nconst selectActions = ({ inc, dec }) => ({ inc, dec });\n\nrender(\n  <div>\n    <State from={storeId} select={selectCounter}>\n      {counter => (\n        <>\n          <div>Counter: {counter}</div>\n          <State from={storeId} select={selectActions}>\n            {({ inc, dec }) => (\n              <Fragment>\n                <button onClick={inc}>+</button>\n                <button onClick={dec}>-</button>\n              </Fragment>\n            )}\n          </State>\n        </>\n      )}\n    </State>\n    <StateInspector from={storeId} />\n  </div>\n);\n')))}u.isMDXComponent=!0}}]);