/*! For license information please see 89105f30.def06f86.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9839],{62525:e=>{var t=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function o(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(o){return!1}}()?Object.assign:function(e,a){for(var c,s,i=o(e),l=1;l<arguments.length;l++){for(var u in c=Object(arguments[l]))r.call(c,u)&&(i[u]=c[u]);if(t){s=t(c);for(var p=0;p<s.length;p++)n.call(c,s[p])&&(i[s[p]]=c[s[p]])}}return i}},41535:(e,t,r)=>{var n=r(62525),o=60103,a=60106;var c=60109,s=60110,i=60112;var l=60115,u=60116;if("function"==typeof Symbol&&Symbol.for){var p=Symbol.for;o=p("react.element"),a=p("react.portal"),p("react.fragment"),p("react.strict_mode"),p("react.profiler"),c=p("react.provider"),s=p("react.context"),i=p("react.forward_ref"),p("react.suspense"),l=p("react.memo"),u=p("react.lazy")}var f="function"==typeof Symbol&&Symbol.iterator;function d(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m={};function b(e,t,r){this.props=e,this.context=t,this.refs=m,this.updater=r||y}function v(){}function h(e,t,r){this.props=e,this.context=t,this.refs=m,this.updater=r||y}b.prototype.isReactComponent={},b.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(d(85));this.updater.enqueueSetState(this,e,t,"setState")},b.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},v.prototype=b.prototype;var g=h.prototype=new v;g.constructor=h,n(g,b.prototype),g.isPureReactComponent=!0;var w={current:null},j=Object.prototype.hasOwnProperty,O={key:!0,ref:!0,__self:!0,__source:!0};function k(e,t,r){var n,a={},c=null,s=null;if(null!=t)for(n in void 0!==t.ref&&(s=t.ref),void 0!==t.key&&(c=""+t.key),t)j.call(t,n)&&!O.hasOwnProperty(n)&&(a[n]=t[n]);var i=arguments.length-2;if(1===i)a.children=r;else if(1<i){for(var l=Array(i),u=0;u<i;u++)l[u]=arguments[u+2];a.children=l}if(e&&e.defaultProps)for(n in i=e.defaultProps)void 0===a[n]&&(a[n]=i[n]);return{$$typeof:o,type:e,key:c,ref:s,props:a,_owner:w.current}}function S(e){return"object"==typeof e&&null!==e&&e.$$typeof===o}var P=/\/+/g;function I(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function _(e,t,r,n,c){var s=typeof e;"undefined"!==s&&"boolean"!==s||(e=null);var i=!1;if(null===e)i=!0;else switch(s){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case o:case a:i=!0}}if(i)return c=c(i=e),e=""===n?"."+I(i,0):n,Array.isArray(c)?(r="",null!=e&&(r=e.replace(P,"$&/")+"/"),_(c,t,r,"",(function(e){return e}))):null!=c&&(S(c)&&(c=function(e,t){return{$$typeof:o,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(c,r+(!c.key||i&&i.key===c.key?"":(""+c.key).replace(P,"$&/")+"/")+e)),t.push(c)),1;if(i=0,n=""===n?".":n+":",Array.isArray(e))for(var l=0;l<e.length;l++){var u=n+I(s=e[l],l);i+=_(s,t,r,u,c)}else if(u=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=f&&e[f]||e["@@iterator"])?e:null}(e),"function"==typeof u)for(e=u.call(e),l=0;!(s=e.next()).done;)i+=_(s=s.value,t,r,u=n+I(s,l++),c);else if("object"===s)throw t=""+e,Error(d(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return i}function C(e,t,r){if(null==e)return e;var n=[],o=0;return _(e,n,"","",(function(e){return t.call(r,e,o++)})),n}function x(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var E={current:null};function A(){var e=E.current;if(null===e)throw Error(d(321));return e}},27378:(e,t,r)=>{r(41535)},3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>d});var n=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var i=n.createContext({}),l=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),f=l(r),d=o,y=f["".concat(i,".").concat(d)]||f[d]||p[d]||a;return r?n.createElement(y,c(c({ref:t},u),{},{components:r})):n.createElement(y,c({ref:t},u))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,c=new Array(a);c[0]=f;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:o,c[1]=s;for(var l=2;l<a;l++)c[l]=r[l];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},53102:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>d,frontMatter:()=>s,metadata:()=>l,toc:()=>p});var n=r(87462),o=r(63366),a=(r(27378),r(3905)),c=["components"],s={id:"optionalSelectors",title:"Selectors"},i=void 0,l={unversionedId:"optionalSelectors",id:"optionalSelectors",title:"Selectors",description:"Selectors are not necessary because state field access is tracked by a Proxy wrapper. A selector can optionally be specified using the select attribute.",source:"@site/../docs/optionalSelectors.md",sourceDirName:".",slug:"/optionalSelectors",permalink:"/carry-on/docs/optionalSelectors",draft:!1,tags:[],version:"current",lastUpdatedBy:"Russ Panula",lastUpdatedAt:1621809015,formattedLastUpdatedAt:"5/23/2021",frontMatter:{id:"optionalSelectors",title:"Selectors"},sidebar:"docs",previous:{title:"Examples",permalink:"/carry-on/docs/examples/"},next:{title:"Modern Immutability",permalink:"/carry-on/docs/modernImmutability"}},u={},p=[{value:"Register some state",id:"register-some-state",level:3},{value:"Access state without a selector:",id:"access-state-without-a-selector",level:3},{value:"Access state with a selector",id:"access-state-with-a-selector",level:3}],f={toc:p};function d(e){var t=e.components,r=(0,o.Z)(e,c);return(0,a.kt)("wrapper",(0,n.Z)({},f,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Selectors are not necessary because state field access is tracked by a ",(0,a.kt)("inlineCode",{parentName:"p"},"Proxy")," wrapper. A selector can optionally be specified using the ",(0,a.kt)("inlineCode",{parentName:"p"},"select")," attribute."),(0,a.kt)("h3",{id:"register-some-state"},"Register some state"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},'const storeId = "selectors";\n\nregister(storeId, {\n  state: ({ set }) => ({\n    counter: 0,\n    inc: () =>\n      set(state => {\n        state.counter += 1;\n      }),\n    dec: () =>\n      set(state => {\n        state.counter -= 1;\n      })\n  })\n});\n\nrender(<StateInspector from={storeId} />);\n')),(0,a.kt)("h3",{id:"access-state-without-a-selector"},"Access state without a selector:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},'const storeId = "selectors";\n\nrender(\n  <State from={storeId}>\n    {({ counter, inc, dec }) => (\n      <>\n        <div>Counter: {counter}</div>\n        <button onClick={inc}>+</button>\n        <button onClick={dec}>-</button>\n        <StateInspector from={storeId} />\n      </>\n    )}\n  </State>\n);\n')),(0,a.kt)("h3",{id:"access-state-with-a-selector"},"Access state with a selector"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},'const storeId = "selectors";\n\nrender(\n  <State\n    from={storeId}\n    select={({ counter, inc, dec }) => ({ counter, inc, dec })}\n  >\n    {({ counter, inc, dec }) => (\n      <>\n        <div>Counter: {counter}</div>\n        <button onClick={inc}>+</button>\n        <button onClick={dec}>-</button>\n        <StateInspector from={storeId} />\n      </>\n    )}\n  </State>\n);\n')))}d.isMDXComponent=!0}}]);