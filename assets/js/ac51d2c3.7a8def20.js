/*! For license information please see ac51d2c3.7a8def20.js.LICENSE.txt */
(self.webpackChunk=self.webpackChunk||[]).push([[9786],{62525:e=>{"use strict";var r=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function o(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var r={},t=0;t<10;t++)r["_"+String.fromCharCode(t)]=t;if("0123456789"!==Object.getOwnPropertyNames(r).map((function(e){return r[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(o){return!1}}()?Object.assign:function(e,a){for(var c,i,u=o(e),l=1;l<arguments.length;l++){for(var s in c=Object(arguments[l]))t.call(c,s)&&(u[s]=c[s]);if(r){i=r(c);for(var f=0;f<i.length;f++)n.call(c,i[f])&&(u[i[f]]=c[i[f]])}}return u}},41535:(e,r,t)=>{"use strict";var n=t(62525),o=60103,a=60106;var c=60109,i=60110,u=60112;var l=60115,s=60116;if("function"==typeof Symbol&&Symbol.for){var f=Symbol.for;o=f("react.element"),a=f("react.portal"),f("react.fragment"),f("react.strict_mode"),f("react.profiler"),c=f("react.provider"),i=f("react.context"),u=f("react.forward_ref"),f("react.suspense"),l=f("react.memo"),s=f("react.lazy")}var p="function"==typeof Symbol&&Symbol.iterator;function y(e){for(var r="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)r+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+r+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var d={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m={};function v(e,r,t){this.props=e,this.context=r,this.refs=m,this.updater=t||d}function b(){}function h(e,r,t){this.props=e,this.context=r,this.refs=m,this.updater=t||d}v.prototype.isReactComponent={},v.prototype.setState=function(e,r){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(y(85));this.updater.enqueueSetState(this,e,r,"setState")},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},b.prototype=v.prototype;var O=h.prototype=new b;O.constructor=h,n(O,v.prototype),O.isPureReactComponent=!0;var g={current:null},j=Object.prototype.hasOwnProperty,k={key:!0,ref:!0,__self:!0,__source:!0};function w(e,r,t){var n,a={},c=null,i=null;if(null!=r)for(n in void 0!==r.ref&&(i=r.ref),void 0!==r.key&&(c=""+r.key),r)j.call(r,n)&&!k.hasOwnProperty(n)&&(a[n]=r[n]);var u=arguments.length-2;if(1===u)a.children=t;else if(1<u){for(var l=Array(u),s=0;s<u;s++)l[s]=arguments[s+2];a.children=l}if(e&&e.defaultProps)for(n in u=e.defaultProps)void 0===a[n]&&(a[n]=u[n]);return{$$typeof:o,type:e,key:c,ref:i,props:a,_owner:g.current}}function P(e){return"object"==typeof e&&null!==e&&e.$$typeof===o}var _=/\/+/g;function S(e,r){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var r={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return r[e]}))}(""+e.key):r.toString(36)}function E(e,r,t,n,c){var i=typeof e;"undefined"!==i&&"boolean"!==i||(e=null);var u=!1;if(null===e)u=!0;else switch(i){case"string":case"number":u=!0;break;case"object":switch(e.$$typeof){case o:case a:u=!0}}if(u)return c=c(u=e),e=""===n?"."+S(u,0):n,Array.isArray(c)?(t="",null!=e&&(t=e.replace(_,"$&/")+"/"),E(c,r,t,"",(function(e){return e}))):null!=c&&(P(c)&&(c=function(e,r){return{$$typeof:o,type:e.type,key:r,ref:e.ref,props:e.props,_owner:e._owner}}(c,t+(!c.key||u&&u.key===c.key?"":(""+c.key).replace(_,"$&/")+"/")+e)),r.push(c)),1;if(u=0,n=""===n?".":n+":",Array.isArray(e))for(var l=0;l<e.length;l++){var s=n+S(i=e[l],l);u+=E(i,r,t,s,c)}else if("function"==typeof(s=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=p&&e[p]||e["@@iterator"])?e:null}(e)))for(e=s.call(e),l=0;!(i=e.next()).done;)u+=E(i=i.value,r,t,s=n+S(i,l++),c);else if("object"===i)throw r=""+e,Error(y(31,"[object Object]"===r?"object with keys {"+Object.keys(e).join(", ")+"}":r));return u}function x(e,r,t){if(null==e)return e;var n=[],o=0;return E(e,n,"","",(function(e){return r.call(t,e,o++)})),n}function L(e){if(-1===e._status){var r=e._result;r=r(),e._status=0,e._result=r,r.then((function(r){0===e._status&&(r=r.default,e._status=1,e._result=r)}),(function(r){0===e._status&&(e._status=2,e._result=r)}))}if(1===e._status)return e._result;throw e._result}var C={current:null};function $(){var e=C.current;if(null===e)throw Error(y(321));return e}},27378:(e,r,t)=>{"use strict";t(41535)},3905:(e,r,t)=>{"use strict";t.d(r,{Zo:()=>s,kt:()=>y});var n=t(67294);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function c(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var u=n.createContext({}),l=function(e){var r=n.useContext(u),t=r;return e&&(t="function"==typeof e?e(r):c(c({},r),e)),t},s=function(e){var r=l(e.components);return n.createElement(u.Provider,{value:r},e.children)},f={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},p=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,a=e.originalType,u=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),p=l(t),y=o,d=p["".concat(u,".").concat(y)]||p[y]||f[y]||a;return t?n.createElement(d,c(c({ref:r},s),{},{components:t})):n.createElement(d,c({ref:r},s))}));function y(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var a=t.length,c=new Array(a);c[0]=p;var i={};for(var u in r)hasOwnProperty.call(r,u)&&(i[u]=r[u]);i.originalType=e,i.mdxType="string"==typeof e?e:o,c[1]=i;for(var l=2;l<a;l++)c[l]=t[l];return n.createElement.apply(null,c)}return n.createElement.apply(null,t)}p.displayName="MDXCreateElement"},98565:(e,r,t)=>{"use strict";t.r(r),t.d(r,{frontMatter:()=>c,metadata:()=>i,toc:()=>u,default:()=>s});var n=t(22122),o=t(19756),a=(t(27378),t(3905)),c={id:"Link",title:"Link"},i={unversionedId:"api/carry-on-react-router/Link",id:"api/carry-on-react-router/Link",isDocsHomePage:!1,title:"Link",description:"",source:"@site/../docs/api/carry-on-react-router/Link.md",sourceDirName:"api/carry-on-react-router",slug:"/api/carry-on-react-router/Link",permalink:"/carry-on/docs/api/carry-on-react-router/Link",version:"current",lastUpdatedBy:"Russ Panula",lastUpdatedAt:1621812948,formattedLastUpdatedAt:"5/23/2021",frontMatter:{id:"Link",title:"Link"},sidebar:"docs",previous:{title:"FormState",permalink:"/carry-on/docs/api/carry-on-react-forms/FormState"},next:{title:"NavLink",permalink:"/carry-on/docs/api/carry-on-react-router/NavLink"}},u=[],l={toc:u};function s(e){var r=e.components,t=(0,o.Z)(e,["components"]);return(0,a.kt)("wrapper",(0,n.Z)({},l,t,{components:r,mdxType:"MDXLayout"}))}s.isMDXComponent=!0}}]);