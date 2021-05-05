/*! For license information please see d21ee09c.b94b1467.js.LICENSE.txt */
(self.webpackChunk=self.webpackChunk||[]).push([[776],{2525:t=>{"use strict";var e=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;function a(t){if(null==t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}t.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},n=0;n<10;n++)e["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(e).map((function(t){return e[t]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(t){r[t]=t})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(a){return!1}}()?Object.assign:function(t,o){for(var i,l,c=a(t),u=1;u<arguments.length;u++){for(var s in i=Object(arguments[u]))n.call(i,s)&&(c[s]=i[s]);if(e){l=e(i);for(var p=0;p<l.length;p++)r.call(i,l[p])&&(c[l[p]]=i[l[p]])}}return c}},1535:(t,e,n)=>{"use strict";var r=n(2525),a=60103,o=60106;var i=60109,l=60110,c=60112;var u=60115,s=60116;if("function"==typeof Symbol&&Symbol.for){var p=Symbol.for;a=p("react.element"),o=p("react.portal"),p("react.fragment"),p("react.strict_mode"),p("react.profiler"),i=p("react.provider"),l=p("react.context"),c=p("react.forward_ref"),p("react.suspense"),u=p("react.memo"),s=p("react.lazy")}var d="function"==typeof Symbol&&Symbol.iterator;function f(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var m={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},y={};function g(t,e,n){this.props=t,this.context=e,this.refs=y,this.updater=n||m}function k(){}function b(t,e,n){this.props=t,this.context=e,this.refs=y,this.updater=n||m}g.prototype.isReactComponent={},g.prototype.setState=function(t,e){if("object"!=typeof t&&"function"!=typeof t&&null!=t)throw Error(f(85));this.updater.enqueueSetState(this,t,e,"setState")},g.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")},k.prototype=g.prototype;var h=b.prototype=new k;h.constructor=b,r(h,g.prototype),h.isPureReactComponent=!0;var N={current:null},v=Object.prototype.hasOwnProperty,w={key:!0,ref:!0,__self:!0,__source:!0};function j(t,e,n){var r,o={},i=null,l=null;if(null!=e)for(r in void 0!==e.ref&&(l=e.ref),void 0!==e.key&&(i=""+e.key),e)v.call(e,r)&&!w.hasOwnProperty(r)&&(o[r]=e[r]);var c=arguments.length-2;if(1===c)o.children=n;else if(1<c){for(var u=Array(c),s=0;s<c;s++)u[s]=arguments[s+2];o.children=u}if(t&&t.defaultProps)for(r in c=t.defaultProps)void 0===o[r]&&(o[r]=c[r]);return{$$typeof:a,type:t,key:i,ref:l,props:o,_owner:N.current}}function O(t){return"object"==typeof t&&null!==t&&t.$$typeof===a}var C=/\/+/g;function S(t,e){return"object"==typeof t&&null!==t&&null!=t.key?function(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,(function(t){return e[t]}))}(""+t.key):e.toString(36)}function P(t,e,n,r,i){var l=typeof t;"undefined"!==l&&"boolean"!==l||(t=null);var c=!1;if(null===t)c=!0;else switch(l){case"string":case"number":c=!0;break;case"object":switch(t.$$typeof){case a:case o:c=!0}}if(c)return i=i(c=t),t=""===r?"."+S(c,0):r,Array.isArray(i)?(n="",null!=t&&(n=t.replace(C,"$&/")+"/"),P(i,e,n,"",(function(t){return t}))):null!=i&&(O(i)&&(i=function(t,e){return{$$typeof:a,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}(i,n+(!i.key||c&&c.key===i.key?"":(""+i.key).replace(C,"$&/")+"/")+t)),e.push(i)),1;if(c=0,r=""===r?".":r+":",Array.isArray(t))for(var u=0;u<t.length;u++){var s=r+S(l=t[u],u);c+=P(l,e,n,s,i)}else if("function"==typeof(s=function(t){return null===t||"object"!=typeof t?null:"function"==typeof(t=d&&t[d]||t["@@iterator"])?t:null}(t)))for(t=s.call(t),u=0;!(l=t.next()).done;)c+=P(l=l.value,e,n,s=r+S(l,u++),i);else if("object"===l)throw e=""+t,Error(f(31,"[object Object]"===e?"object with keys {"+Object.keys(t).join(", ")+"}":e));return c}function _(t,e,n){if(null==t)return t;var r=[],a=0;return P(t,r,"","",(function(t){return e.call(n,t,a++)})),r}function E(t){if(-1===t._status){var e=t._result;e=e(),t._status=0,t._result=e,e.then((function(e){0===t._status&&(e=e.default,t._status=1,t._result=e)}),(function(e){0===t._status&&(t._status=2,t._result=e)}))}if(1===t._status)return t._result;throw t._result}var A={current:null};function x(){var t=A.current;if(null===t)throw Error(f(321));return t}},7378:(t,e,n)=>{"use strict";n(1535)},3905:(t,e,n)=>{"use strict";n.d(e,{Zo:()=>s,kt:()=>f});var r=n(7294);function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function l(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},o=Object.keys(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}var c=r.createContext({}),u=function(t){var e=r.useContext(c),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},s=function(t){var e=u(t.components);return r.createElement(c.Provider,{value:e},t.children)},p={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},d=r.forwardRef((function(t,e){var n=t.components,a=t.mdxType,o=t.originalType,c=t.parentName,s=l(t,["components","mdxType","originalType","parentName"]),d=u(n),f=a,m=d["".concat(c,".").concat(f)]||d[f]||p[f]||o;return n?r.createElement(m,i(i({ref:e},s),{},{components:n})):r.createElement(m,i({ref:e},s))}));function f(t,e){var n=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var o=n.length,i=new Array(o);i[0]=d;var l={};for(var c in e)hasOwnProperty.call(e,c)&&(l[c]=e[c]);l.originalType=t,l.mdxType="string"==typeof t?t:a,i[1]=l;for(var u=2;u<o;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8292:(t,e,n)=>{"use strict";n.r(e),n.d(e,{frontMatter:()=>i,metadata:()=>l,toc:()=>c,default:()=>s});var r=n(2122),a=n(9756),o=(n(7378),n(3905)),i={id:"State",title:"<State ...>"},l={unversionedId:"api/carry-on-react/State",id:"api/carry-on-react/State",isDocsHomePage:!1,title:"<State ...>",description:"Properties",source:"@site/../docs/api/carry-on-react/State.md",sourceDirName:"api/carry-on-react",slug:"/api/carry-on-react/State",permalink:"/carry-on/docs/api/carry-on-react/State",version:"current",lastUpdatedBy:"Russ Panula",lastUpdatedAt:1619946735,formattedLastUpdatedAt:"5/2/2021",frontMatter:{id:"State",title:"<State ...>"},sidebar:"docs",previous:{title:"watch",permalink:"/carry-on/docs/api/carry-on-store/watch"},next:{title:"withState",permalink:"/carry-on/docs/api/carry-on-react/withState"}},c=[{value:"Properties",id:"properties",children:[]},{value:"Accessing",id:"accessing",children:[]},{value:"Debugging",id:"debugging",children:[]}],u={toc:c};function s(t){var e=t.components,n=(0,a.Z)(t,["components"]);return(0,o.kt)("wrapper",(0,r.Z)({},u,n,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"properties"},"Properties"),(0,o.kt)("p",null,"All properties are optional."),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Property"),(0,o.kt)("th",{parentName:"tr",align:null},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"render")," or ",(0,o.kt)("inlineCode",{parentName:"td"},"children")),(0,o.kt)("td",{parentName:"tr",align:null},"The render function. This function will be called with the state as it's first parameter.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"from")),(0,o.kt)("td",{parentName:"tr",align:null},"What store to retrieve state from.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"path")),(0,o.kt)("td",{parentName:"tr",align:null},"The state path to retrieve. Specified as a dotted path string, with support for arrays. Sample: ",(0,o.kt)("inlineCode",{parentName:"td"},'"my.field.path[10].name"'))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"select")),(0,o.kt)("td",{parentName:"tr",align:null},"A function that selects the required state.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"constant")),(0,o.kt)("td",{parentName:"tr",align:null},"When true, the ",(0,o.kt)("inlineCode",{parentName:"td"},"State")," component will query state and render only once.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"strict")),(0,o.kt)("td",{parentName:"tr",align:null},"When true, the ",(0,o.kt)("inlineCode",{parentName:"td"},"State")," will track accessed keys on every update instead of on just the first one.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"default")),(0,o.kt)("td",{parentName:"tr",align:null},"The default value when the state is undefined.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"throttle")),(0,o.kt)("td",{parentName:"tr",align:null},"Milliseconds to throttle change requests")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"debounce")),(0,o.kt)("td",{parentName:"tr",align:null},"Milliseconds to debounce change requests")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"debug")),(0,o.kt)("td",{parentName:"tr",align:null},"When true, log messages regarding state changes will be printed to the ",(0,o.kt)("inlineCode",{parentName:"td"},"console"),".")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"verbose")),(0,o.kt)("td",{parentName:"tr",align:null},"When true, verbose log messages are printed to the ",(0,o.kt)("inlineCode",{parentName:"td"},"console"),".")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"id")),(0,o.kt)("td",{parentName:"tr",align:null},"Debug log uses this to identify components")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"onMount")),(0,o.kt)("td",{parentName:"tr",align:null},"Called with the current state when the component mounts.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"onUnmount")),(0,o.kt)("td",{parentName:"tr",align:null},"Called with the current state when the component unmounts.")))),(0,o.kt)("h2",{id:"accessing"},"Accessing"),(0,o.kt)("p",null,"Accessing state is done using the State component:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"\nregister({\n  state: ({ set }) => ({\n    counter: 0,\n    inc: () => set(state => { state.counter++; }),\n    dec: () => set(state => { state.counter--; })\n  })\n});\n\nconst App = () => (\n  <State>\n    {state => (\n      <>\n        <div>Counter: {state.counter}</div>\n        <button onClick={state.inc}>+</button>\n        <button onClick={state.dec}>-</button>\n      </>\n    )}\n  </State>\n);\n\n")),(0,o.kt)("h2",{id:"debugging"},"Debugging"),(0,o.kt)("p",null,"Using ",(0,o.kt)("inlineCode",{parentName:"p"},"debug")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"verbose")," can help find problems:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"\nregister({\n  state: ({ set }) => ({\n    counter: 0,\n    inc: () => set(state => { state.counter++; }),\n    dec: () => set(state => { state.counter--; })\n  })\n});\n\nconst App = () => (\n  <State debug verbose>\n    {state => (\n      <>\n        <div>Counter: {state.counter}</div>\n        <button onClick={state.inc}>+</button>\n        <button onClick={state.dec}>-</button>\n      </>\n    )}\n  </State>\n);\n\n")),(0,o.kt)("p",null,"Enabling ",(0,o.kt)("inlineCode",{parentName:"p"},"debug")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"verbose")," on all State components:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"\nregister({\n  state: ({ set }) => ({\n    counter: 0,\n    inc: () => set(state => { state.counter++; }),\n    dec: () => set(state => { state.counter--; })\n  })\n});\n\nState.Debug = true;\nState.Verbose = true;\n\nconst App = () => (\n  <State>\n    {state => (\n      <>\n        <div>Counter: {state.counter}</div>\n        <button onClick={state.inc}>+</button>\n        <button onClick={state.dec}>-</button>\n      </>\n    )}\n  </State>\n);\n\n")))}s.isMDXComponent=!0}}]);