/*! For license information please see 825f5809.87d90cee.js.LICENSE.txt */
(self.webpackChunk=self.webpackChunk||[]).push([[910],{62525:e=>{"use strict";var t=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function o(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(o){return!1}}()?Object.assign:function(e,a){for(var i,c,u=o(e),s=1;s<arguments.length;s++){for(var l in i=Object(arguments[s]))r.call(i,l)&&(u[l]=i[l]);if(t){c=t(i);for(var p=0;p<c.length;p++)n.call(i,c[p])&&(u[c[p]]=i[c[p]])}}return u}},41535:(e,t,r)=>{"use strict";var n=r(62525),o=60103,a=60106;var i=60109,c=60110,u=60112;var s=60115,l=60116;if("function"==typeof Symbol&&Symbol.for){var p=Symbol.for;o=p("react.element"),a=p("react.portal"),p("react.fragment"),p("react.strict_mode"),p("react.profiler"),i=p("react.provider"),c=p("react.context"),u=p("react.forward_ref"),p("react.suspense"),s=p("react.memo"),l=p("react.lazy")}var f="function"==typeof Symbol&&Symbol.iterator;function y(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var d={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},v={};function h(e,t,r){this.props=e,this.context=t,this.refs=v,this.updater=r||d}function m(){}function b(e,t,r){this.props=e,this.context=t,this.refs=v,this.updater=r||d}h.prototype.isReactComponent={},h.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(y(85));this.updater.enqueueSetState(this,e,t,"setState")},h.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},m.prototype=h.prototype;var g=b.prototype=new m;g.constructor=b,n(g,h.prototype),g.isPureReactComponent=!0;var w={current:null},O=Object.prototype.hasOwnProperty,j={key:!0,ref:!0,__self:!0,__source:!0};function k(e,t,r){var n,a={},i=null,c=null;if(null!=t)for(n in void 0!==t.ref&&(c=t.ref),void 0!==t.key&&(i=""+t.key),t)O.call(t,n)&&!j.hasOwnProperty(n)&&(a[n]=t[n]);var u=arguments.length-2;if(1===u)a.children=r;else if(1<u){for(var s=Array(u),l=0;l<u;l++)s[l]=arguments[l+2];a.children=s}if(e&&e.defaultProps)for(n in u=e.defaultProps)void 0===a[n]&&(a[n]=u[n]);return{$$typeof:o,type:e,key:i,ref:c,props:a,_owner:w.current}}function P(e){return"object"==typeof e&&null!==e&&e.$$typeof===o}var R=/\/+/g;function S(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function x(e,t,r,n,i){var c=typeof e;"undefined"!==c&&"boolean"!==c||(e=null);var u=!1;if(null===e)u=!0;else switch(c){case"string":case"number":u=!0;break;case"object":switch(e.$$typeof){case o:case a:u=!0}}if(u)return i=i(u=e),e=""===n?"."+S(u,0):n,Array.isArray(i)?(r="",null!=e&&(r=e.replace(R,"$&/")+"/"),x(i,t,r,"",(function(e){return e}))):null!=i&&(P(i)&&(i=function(e,t){return{$$typeof:o,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(i,r+(!i.key||u&&u.key===i.key?"":(""+i.key).replace(R,"$&/")+"/")+e)),t.push(i)),1;if(u=0,n=""===n?".":n+":",Array.isArray(e))for(var s=0;s<e.length;s++){var l=n+S(c=e[s],s);u+=x(c,t,r,l,i)}else if("function"==typeof(l=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=f&&e[f]||e["@@iterator"])?e:null}(e)))for(e=l.call(e),s=0;!(c=e.next()).done;)u+=x(c=c.value,t,r,l=n+S(c,s++),i);else if("object"===c)throw t=""+e,Error(y(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return u}function I(e,t,r){if(null==e)return e;var n=[],o=0;return x(e,n,"","",(function(e){return t.call(r,e,o++)})),n}function _(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var E={current:null};function N(){var e=E.current;if(null===e)throw Error(y(321));return e}},27378:(e,t,r)=>{"use strict";r(41535)},3905:(e,t,r)=>{"use strict";r.d(t,{Zo:()=>l,kt:()=>y});var n=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var u=n.createContext({}),s=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=s(e.components);return n.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,u=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),f=s(r),y=o,d=f["".concat(u,".").concat(y)]||f[y]||p[y]||a;return r?n.createElement(d,i(i({ref:t},l),{},{components:r})):n.createElement(d,i({ref:t},l))}));function y(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=f;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:o,i[1]=c;for(var s=2;s<a;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},49729:(e,t,r)=>{"use strict";r.r(t),r.d(t,{frontMatter:()=>i,metadata:()=>c,toc:()=>u,default:()=>l});var n=r(22122),o=r(19756),a=(r(27378),r(3905)),i={id:"withRouter",title:"withRouter"},c={unversionedId:"api/carry-on-react-router/withRouter",id:"api/carry-on-react-router/withRouter",isDocsHomePage:!1,title:"withRouter",description:"`js live noInline",source:"@site/../docs/api/carry-on-react-router/withRouter.md",sourceDirName:"api/carry-on-react-router",slug:"/api/carry-on-react-router/withRouter",permalink:"/carry-on/docs/api/carry-on-react-router/withRouter",version:"current",lastUpdatedBy:"Russ Panula",lastUpdatedAt:1622100577,formattedLastUpdatedAt:"5/27/2021",frontMatter:{id:"withRouter",title:"withRouter"},sidebar:"docs",previous:{title:"<Switch>",permalink:"/carry-on/docs/api/carry-on-react-router/Switch"}},u=[],s={toc:u};function l(e){var t=e.components,r=(0,o.Z)(e,["components"]);return(0,a.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},'const storeId = "withRouterExample";\n\nconst RootPage = withRouter(props => (\n  <>\n    <h1>Root</h1>\n    <Inspector data={props} expandLevel={5} />\n  </>\n));\n\nconst Page1 = withRouter(props => (\n  <>\n    <h1>Page 1</h1>\n    <Inspector data={props} expandLevel={5} />\n  </>\n));\n\nconst Page2 = withRouter(props => (\n  <>\n    <h1>Page 2</h1>\n    <Inspector data={props} expandLevel={5} />\n  </>\n));\n\nconst activeStyle = {\n  color: "red"\n};\n\nrender(\n  <HashRouter from={storeId}>\n    <ul>\n      <li>\n        <NavLink from={storeId} exact activeStyle={activeStyle} to="/">\n          Root\n        </NavLink>\n      </li>\n      <li>\n        <NavLink from={storeId} activeStyle={activeStyle} to="/page1">\n          Page 1\n        </NavLink>\n      </li>\n      <li>\n        <NavLink from={storeId} activeStyle={activeStyle} to="/page2">\n          Page 2\n        </NavLink>\n      </li>\n    </ul>\n    <div style={{ border: "2px solid red", padding: "12px 24px" }}>\n      <Route\n        from={storeId}\n        exact\n        path="/"\n        render={() => <RootPage from={storeId} />}\n      />\n      <Route\n        from={storeId}\n        exact\n        path="/page1"\n        render={() => <Page1 from={storeId} />}\n      />\n      <Route\n        from={storeId}\n        exact\n        path="/page2"\n        render={() => <Page2 from={storeId} />}\n      />\n    </div>\n    <StateInspector from={storeId} />\n  </HashRouter>\n);\n')))}l.isMDXComponent=!0}}]);