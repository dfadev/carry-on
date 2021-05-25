/*! For license information please see 98a88620.86c09270.js.LICENSE.txt */
(self.webpackChunk=self.webpackChunk||[]).push([[3083],{62525:e=>{"use strict";var t=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function o(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(o){return!1}}()?Object.assign:function(e,a){for(var c,i,s=o(e),u=1;u<arguments.length;u++){for(var p in c=Object(arguments[u]))r.call(c,p)&&(s[p]=c[p]);if(t){i=t(c);for(var l=0;l<i.length;l++)n.call(c,i[l])&&(s[i[l]]=c[i[l]])}}return s}},41535:(e,t,r)=>{"use strict";var n=r(62525),o=60103,a=60106;var c=60109,i=60110,s=60112;var u=60115,p=60116;if("function"==typeof Symbol&&Symbol.for){var l=Symbol.for;o=l("react.element"),a=l("react.portal"),l("react.fragment"),l("react.strict_mode"),l("react.profiler"),c=l("react.provider"),i=l("react.context"),s=l("react.forward_ref"),l("react.suspense"),u=l("react.memo"),p=l("react.lazy")}var f="function"==typeof Symbol&&Symbol.iterator;function y(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var d={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m={};function v(e,t,r){this.props=e,this.context=t,this.refs=m,this.updater=r||d}function h(){}function b(e,t,r){this.props=e,this.context=t,this.refs=m,this.updater=r||d}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(y(85));this.updater.enqueueSetState(this,e,t,"setState")},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},h.prototype=v.prototype;var O=b.prototype=new h;O.constructor=b,n(O,v.prototype),O.isPureReactComponent=!0;var g={current:null},k=Object.prototype.hasOwnProperty,j={key:!0,ref:!0,__self:!0,__source:!0};function w(e,t,r){var n,a={},c=null,i=null;if(null!=t)for(n in void 0!==t.ref&&(i=t.ref),void 0!==t.key&&(c=""+t.key),t)k.call(t,n)&&!j.hasOwnProperty(n)&&(a[n]=t[n]);var s=arguments.length-2;if(1===s)a.children=r;else if(1<s){for(var u=Array(s),p=0;p<s;p++)u[p]=arguments[p+2];a.children=u}if(e&&e.defaultProps)for(n in s=e.defaultProps)void 0===a[n]&&(a[n]=s[n]);return{$$typeof:o,type:e,key:c,ref:i,props:a,_owner:g.current}}function P(e){return"object"==typeof e&&null!==e&&e.$$typeof===o}var S=/\/+/g;function N(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function _(e,t,r,n,c){var i=typeof e;"undefined"!==i&&"boolean"!==i||(e=null);var s=!1;if(null===e)s=!0;else switch(i){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case o:case a:s=!0}}if(s)return c=c(s=e),e=""===n?"."+N(s,0):n,Array.isArray(c)?(r="",null!=e&&(r=e.replace(S,"$&/")+"/"),_(c,t,r,"",(function(e){return e}))):null!=c&&(P(c)&&(c=function(e,t){return{$$typeof:o,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(c,r+(!c.key||s&&s.key===c.key?"":(""+c.key).replace(S,"$&/")+"/")+e)),t.push(c)),1;if(s=0,n=""===n?".":n+":",Array.isArray(e))for(var u=0;u<e.length;u++){var p=n+N(i=e[u],u);s+=_(i,t,r,p,c)}else if("function"==typeof(p=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=f&&e[f]||e["@@iterator"])?e:null}(e)))for(e=p.call(e),u=0;!(i=e.next()).done;)s+=_(i=i.value,t,r,p=n+N(i,u++),c);else if("object"===i)throw t=""+e,Error(y(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return s}function C(e,t,r){if(null==e)return e;var n=[],o=0;return _(e,n,"","",(function(e){return t.call(r,e,o++)})),n}function E(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var x={current:null};function A(){var e=x.current;if(null===e)throw Error(y(321));return e}},27378:(e,t,r)=>{"use strict";r(41535)},3905:(e,t,r)=>{"use strict";r.d(t,{Zo:()=>p,kt:()=>y});var n=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),u=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},p=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),f=u(r),y=o,d=f["".concat(s,".").concat(y)]||f[y]||l[y]||a;return r?n.createElement(d,c(c({ref:t},p),{},{components:r})):n.createElement(d,c({ref:t},p))}));function y(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,c=new Array(a);c[0]=f;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:o,c[1]=i;for(var u=2;u<a;u++)c[u]=r[u];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},1660:(e,t,r)=>{"use strict";r.r(t),r.d(t,{frontMatter:()=>c,metadata:()=>i,toc:()=>s,default:()=>p});var n=r(22122),o=r(19756),a=(r(27378),r(3905)),c={id:"carryOn",title:"carryOn"},i={unversionedId:"api/carry-on-react/carryOn",id:"api/carry-on-react/carryOn",isDocsHomePage:!1,title:"carryOn",description:"carryOn(opt, renderFn)",source:"@site/../docs/api/carry-on-react/carryOn.md",sourceDirName:"api/carry-on-react",slug:"/api/carry-on-react/carryOn",permalink:"/carry-on/docs/api/carry-on-react/carryOn",version:"current",lastUpdatedBy:"Russ Panula",lastUpdatedAt:1621922028,formattedLastUpdatedAt:"5/25/2021",frontMatter:{id:"carryOn",title:"carryOn"},sidebar:"docs",previous:{title:"<Store>",permalink:"/carry-on/docs/api/carry-on-react/Store"},next:{title:"withState",permalink:"/carry-on/docs/api/carry-on-react/withState"}},s=[{value:"<code>carryOn(opt, renderFn)</code>",id:"carryonopt-renderfn",children:[]},{value:"Parameters",id:"parameters",children:[]}],u={toc:s};function p(e){var t=e.components,r=(0,o.Z)(e,["components"]);return(0,a.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"carryonopt-renderfn"},(0,a.kt)("inlineCode",{parentName:"h2"},"carryOn(opt, renderFn)")),(0,a.kt)("p",null,"A convenience function that creates a React component that can access store state."),(0,a.kt)("h2",{id:"parameters"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"opt"),(0,a.kt)("td",{parentName:"tr",align:null},"An object specifying the props to pass to the underlying ",(0,a.kt)("inlineCode",{parentName:"td"},"State")," component.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"renderFn"),(0,a.kt)("td",{parentName:"tr",align:null},"A render function called with props and store state. It should return a React element.")))),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},'import { carryOn } from "carry-on-react";\n\nconst Nav = carryOn((props, state) => (\n  <ul>\n    {state.site.nav.map(item => (\n      <li key={item}>{item}</li>\n    ))}\n  </ul>\n));\n\nconst Menu = carryOn((props, state) => (\n  <ul>\n    {state.site.menu.map(item => (\n      <li key={item}>{item}</li>\n    ))}\n  </ul>\n));\n\nconst Content = carryOn((props, state) => <div>{state.site.content}</div>);\n\nconst App = carryOn(\n  // Use object parameter to specify State properties\n  {\n    // id is used for log messages and the component\'s displayName\n    id: "App",\n    // use of register property:\n    register: {\n      state: {\n        site: {\n          components: {\n            nav: Nav,\n            menu: Menu,\n            content: Content\n          },\n          menu: ["one", "two", "three"],\n          nav: ["a", "b", "c"],\n          content: "The content"\n        }\n      }\n    },\n    // components dont change\n    constant: true\n  },\n  // Use function parameter to specify render function\n  (\n    // Component props\n    { title },\n    // Store state\n    {\n      site: {\n        components: { nav: Nav, menu: Menu, content: Content }\n      }\n    }\n  ) => (\n    <div>\n      <h1>{title}</h1>\n      <Nav />\n      <Menu />\n      <div>\n        <Content />\n      </div>\n    </div>\n  )\n);\n\nrender(<App title="CarryOn" />);\n')))}p.isMDXComponent=!0}}]);