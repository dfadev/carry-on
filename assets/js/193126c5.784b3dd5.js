/*! For license information please see 193126c5.784b3dd5.js.LICENSE.txt */
(self.webpackChunk=self.webpackChunk||[]).push([[566],{62525:e=>{"use strict";var t=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;function o(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(o){return!1}}()?Object.assign:function(e,a){for(var s,i,c=o(e),l=1;l<arguments.length;l++){for(var u in s=Object(arguments[l]))n.call(s,u)&&(c[u]=s[u]);if(t){i=t(s);for(var d=0;d<i.length;d++)r.call(s,i[d])&&(c[i[d]]=s[i[d]])}}return c}},41535:(e,t,n)=>{"use strict";var r=n(62525),o=60103,a=60106;var s=60109,i=60110,c=60112;var l=60115,u=60116;if("function"==typeof Symbol&&Symbol.for){var d=Symbol.for;o=d("react.element"),a=d("react.portal"),d("react.fragment"),d("react.strict_mode"),d("react.profiler"),s=d("react.provider"),i=d("react.context"),c=d("react.forward_ref"),d("react.suspense"),l=d("react.memo"),u=d("react.lazy")}var p="function"==typeof Symbol&&Symbol.iterator;function f(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var m={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},v={};function h(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||m}function y(){}function g(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||m}h.prototype.isReactComponent={},h.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(f(85));this.updater.enqueueSetState(this,e,t,"setState")},h.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},y.prototype=h.prototype;var b=g.prototype=new y;b.constructor=g,r(b,h.prototype),b.isPureReactComponent=!0;var S={current:null},k=Object.prototype.hasOwnProperty,I={key:!0,ref:!0,__self:!0,__source:!0};function j(e,t,n){var r,a={},s=null,i=null;if(null!=t)for(r in void 0!==t.ref&&(i=t.ref),void 0!==t.key&&(s=""+t.key),t)k.call(t,r)&&!I.hasOwnProperty(r)&&(a[r]=t[r]);var c=arguments.length-2;if(1===c)a.children=n;else if(1<c){for(var l=Array(c),u=0;u<c;u++)l[u]=arguments[u+2];a.children=l}if(e&&e.defaultProps)for(r in c=e.defaultProps)void 0===a[r]&&(a[r]=c[r]);return{$$typeof:o,type:e,key:s,ref:i,props:a,_owner:S.current}}function w(e){return"object"==typeof e&&null!==e&&e.$$typeof===o}var O=/\/+/g;function C(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function x(e,t,n,r,s){var i=typeof e;"undefined"!==i&&"boolean"!==i||(e=null);var c=!1;if(null===e)c=!0;else switch(i){case"string":case"number":c=!0;break;case"object":switch(e.$$typeof){case o:case a:c=!0}}if(c)return s=s(c=e),e=""===r?"."+C(c,0):r,Array.isArray(s)?(n="",null!=e&&(n=e.replace(O,"$&/")+"/"),x(s,t,n,"",(function(e){return e}))):null!=s&&(w(s)&&(s=function(e,t){return{$$typeof:o,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(s,n+(!s.key||c&&c.key===s.key?"":(""+s.key).replace(O,"$&/")+"/")+e)),t.push(s)),1;if(c=0,r=""===r?".":r+":",Array.isArray(e))for(var l=0;l<e.length;l++){var u=r+C(i=e[l],l);c+=x(i,t,n,u,s)}else if("function"==typeof(u=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=p&&e[p]||e["@@iterator"])?e:null}(e)))for(e=u.call(e),l=0;!(i=e.next()).done;)c+=x(i=i.value,t,n,u=r+C(i,l++),s);else if("object"===i)throw t=""+e,Error(f(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return c}function P(e,t,n){if(null==e)return e;var r=[],o=0;return x(e,r,"","",(function(e){return t.call(n,e,o++)})),r}function N(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var _={current:null};function E(){var e=_.current;if(null===e)throw Error(f(321));return e}},27378:(e,t,n)=>{"use strict";n(41535)},3905:(e,t,n)=>{"use strict";n.d(t,{Zo:()=>u,kt:()=>f});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=l(n),f=o,m=p["".concat(c,".").concat(f)]||p[f]||d[f]||a;return n?r.createElement(m,s(s({ref:t},u),{},{components:n})):r.createElement(m,s({ref:t},u))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,s=new Array(a);s[0]=p;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:o,s[1]=i;for(var l=2;l<a;l++)s[l]=n[l];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},37589:(e,t,n)=>{"use strict";n.r(t),n.d(t,{frontMatter:()=>s,metadata:()=>i,toc:()=>c,default:()=>u});var r=n(22122),o=n(19756),a=(n(27378),n(3905)),s={id:"index",slug:"/examples/",title:"Examples"},i={unversionedId:"examples/index",id:"examples/index",isDocsHomePage:!1,title:"Examples",description:"Default store",source:"@site/../docs/examples/index.md",sourceDirName:"examples",slug:"/examples/",permalink:"/carry-on/docs/examples/",version:"current",lastUpdatedBy:"Russ Panula",lastUpdatedAt:1621040486,formattedLastUpdatedAt:"5/14/2021",frontMatter:{id:"index",slug:"/examples/",title:"Examples"},sidebar:"docs",previous:{title:"Using State",permalink:"/carry-on/docs/usingState"},next:{title:"Selectors",permalink:"/carry-on/docs/optionalSelectors"}},c=[{value:"Default store",id:"default-store",children:[]},{value:"Two named stores",id:"two-named-stores",children:[]},{value:"State select",id:"state-select",children:[]},{value:"Register state",id:"register-state",children:[]},{value:"Register state on a named store",id:"register-state-on-a-named-store",children:[]},{value:"State path",id:"state-path",children:[]},{value:"State path with default",id:"state-path-with-default",children:[]},{value:"State path on a named store using from",id:"state-path-on-a-named-store-using-from",children:[]},{value:"Multiple select",id:"multiple-select",children:[]}],l={toc:c};function u(e){var t=e.components,n=(0,o.Z)(e,["components"]);return(0,a.kt)("wrapper",(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"default-store"},"Default store"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},"register({\n  state: ({ set }) => ({\n    counter: 0,\n    inc: () => set(state => void state.counter++),\n    dec: () => set(state => void state.counter--)\n  })\n});\n\nrender(\n  <>\n    <State>\n      {state => (\n        <>\n          <div>Counter: {state.counter}</div>\n          <button onClick={state.inc}>+</button>\n          <button onClick={state.dec}>-</button>\n        </>\n      )}\n    </State>\n    <StateInspector />\n  </>\n);\n")),(0,a.kt)("h2",{id:"two-named-stores"},"Two named stores"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},'const state = {\n  state: ({ set }) => ({\n    counter: 0,\n    inc: () => set(state => void state.counter++),\n    dec: () => set(state => void state.counter--)\n  })\n};\n\nregister("store1", state);\nregister("store2", state);\n\nrender(\n  <>\n    hello <Q>{s => s.name}</Q>\n    hello <Q s={s => s.name}/>\n    hello !!name\n    <State from="store1">\n      {state => (\n        <div>\n          <h4>Store 1</h4>\n          <div>Counter: {state.counter}</div>\n          <button onClick={state.inc}>+</button>\n          <button onClick={state.dec}>-</button>\n        </div>\n      )}\n    </State>\n    <StateInspector from="store1" />\n\n    <State from="store2">\n      {({ counter, inc, dec }) => (\n        <div>\n          <h4>Store 2</h4>\n          <div>Counter: {counter}</div>\n          <button onClick={inc}>+</button>\n          <button onClick={dec}>-</button>\n        </div>\n      )}\n    </State>\n    <StateInspector from="store2" />\n  </>\n);\n')),(0,a.kt)("h2",{id:"state-select"},"State select"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},'const storeId = "stateSelect";\n\nregister(storeId, {\n  state: ({ set }) => ({\n    notSelected: "item",\n    counter: 0,\n    inc: () => set(state => void state.counter++),\n    dec: () => set(state => void state.counter--)\n  })\n});\n\nconst select = ({ counter, inc, dec }) => ({ counter, inc, dec });\n\nrender(\n  <>\n    <State from={storeId} select={select}>\n      {({ counter, inc, dec, notSelected }) => (\n        <div>\n          <div>\n            notSelected is undefined? {notSelected === undefined ? "yes" : "no"}\n          </div>\n          <div>Counter: {counter}</div>\n          <button onClick={inc}>+</button>\n          <button onClick={dec}>-</button>\n        </div>\n      )}\n    </State>\n    <StateInspector from={storeId} />\n  </>\n);\n')),(0,a.kt)("h2",{id:"register-state"},"Register state"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},'const storeId = "registerState";\n\nregister(storeId, {\n  state: ({ set }) => ({\n    counter: 0,\n    inc: () => set(state => void state.counter++),\n    dec: () => set(state => void state.counter--)\n  })\n});\n\nrender(\n  <>\n    <State from={storeId}>\n      {({ counter, inc, dec }) => (\n        <>\n          <div>Counter: {counter}</div>\n          <button onClick={inc}>+</button>\n          <button onClick={dec}>-</button>\n        </>\n      )}\n    </State>\n    <StateInspector from={storeId} />\n  </>\n);\n')),(0,a.kt)("h2",{id:"register-state-on-a-named-store"},"Register state on a named store"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},'const storeId = "store1";\n\nregister(storeId, {\n  state: ({ set }) => ({\n    counter: 0,\n    inc: () => set(state => void state.counter++),\n    dec: () => set(state => void state.counter--)\n  })\n});\n\nrender(\n  <>\n    <State from={storeId}>\n      {({ counter, inc, dec }) => (\n        <>\n          <div>Counter: {counter}</div>\n          <button onClick={inc}>+</button>\n          <button onClick={dec}>-</button>\n        </>\n      )}\n    </State>\n    <StateInspector from={storeId} />\n  </>\n);\n')),(0,a.kt)("h2",{id:"state-path"},"State path"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},'const storeId = "statePath";\n\nregister(storeId, {\n  state: ({ set }) => ({\n    more: {\n      stuff: {\n        list: [{ item: "one" }, { item: "two" }]\n      }\n    }\n  })\n});\n\nrender(\n  <>\n    <State from={storeId} path="more.stuff.list[0].item">\n      {item => {\n        return <div>{item}</div>;\n      }}\n    </State>\n    <StateInspector from={storeId} />\n  </>\n);\n')),(0,a.kt)("h2",{id:"state-path-with-default"},"State path with default"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},'const storeId = "statePathDefault";\n\nregister(storeId, {\n  state: ({ set }) => ({\n    more: {\n      stuff: {\n        list: [{ item: "one" }, { item: "two" }]\n      }\n    }\n  })\n});\n\nrender(\n  <>\n    <State from={storeId} path="oops.more.stuff.list[0].item" default="ok">\n      {item => {\n        return <div>{item}</div>;\n      }}\n    </State>\n    <StateInspector from={storeId} />\n  </>\n);\n')),(0,a.kt)("h2",{id:"state-path-on-a-named-store-using-from"},"State path on a named store using from"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},'const storeId = "statePathNamedStore";\n\nregister(storeId, {\n  state: ({ set }) => ({\n    more: {\n      stuff: {\n        list: [{ item: "one" }, { item: "two" }]\n      }\n    }\n  })\n});\n\nrender(\n  <>\n    <State from={storeId} path="more.stuff.list[0].item">\n      {item => <div>{item}</div>}\n    </State>\n    <StateInspector from={storeId} />\n  </>\n);\n')),(0,a.kt)("h2",{id:"multiple-select"},"Multiple select"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},'const storeId = "multipleSelect";\n\nregister(storeId, {\n  state: ({ set }) => ({\n    counter: 0,\n    inc: () => set(state => void state.counter++),\n    dec: () => set(state => void state.counter--)\n  })\n});\n\nconst selectCounter = ({ counter }) => counter;\nconst selectActions = ({ inc, dec }) => ({ inc, dec });\n\nrender(\n  <div>\n    <State from={storeId} select={selectCounter}>\n      {counter => (\n        <>\n          <div>Counter: {counter}</div>\n          <State from={storeId} select={selectActions}>\n            {({ inc, dec }) => (\n              <Fragment>\n                <button onClick={inc}>+</button>\n                <button onClick={dec}>-</button>\n              </Fragment>\n            )}\n          </State>\n        </>\n      )}\n    </State>\n    <StateInspector from={storeId} />\n  </div>\n);\n')))}u.isMDXComponent=!0}}]);