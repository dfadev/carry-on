"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7323],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>y});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),l=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),d=l(r),y=a,m=d["".concat(p,".").concat(y)]||d[y]||s[y]||o;return r?n.createElement(m,c(c({ref:t},u),{},{components:r})):n.createElement(m,c({ref:t},u))}));function y(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,c=new Array(o);c[0]=d;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i.mdxType="string"==typeof e?e:a,c[1]=i;for(var l=2;l<o;l++)c[l]=r[l];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},2086:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>p,default:()=>y,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var n=r(7462),a=r(3366),o=(r(7294),r(3905)),c=["components"],i={id:"Prompt",title:"<Prompt>"},p=void 0,l={unversionedId:"api/carry-on-react-router/Prompt",id:"api/carry-on-react-router/Prompt",title:"<Prompt>",description:"",source:"@site/../docs/api/carry-on-react-router/Prompt.md",sourceDirName:"api/carry-on-react-router",slug:"/api/carry-on-react-router/Prompt",permalink:"/carry-on/docs/api/carry-on-react-router/Prompt",draft:!1,tags:[],version:"current",lastUpdatedBy:"Russ Panula",lastUpdatedAt:1622100577,formattedLastUpdatedAt:"5/27/2021",frontMatter:{id:"Prompt",title:"<Prompt>"},sidebar:"docs",previous:{title:"<NavLink>",permalink:"/carry-on/docs/api/carry-on-react-router/NavLink"},next:{title:"<Redirect>",permalink:"/carry-on/docs/api/carry-on-react-router/Redirect"}},u={},s=[],d={toc:s};function y(e){var t=e.components,r=(0,a.Z)(e,c);return(0,o.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},'const activeStyle = {\n  color: "red"\n};\n\nrender(\n  <HashRouter>\n    <Prompt message="Are you sure you want to leave?" />\n\n    <ul>\n      <li>\n        <NavLink exact activeStyle={activeStyle} to="/">\n          Root\n        </NavLink>\n      </li>\n      <li>\n        <NavLink activeStyle={activeStyle} to="/page1">\n          Page 1\n        </NavLink>\n      </li>\n      <li>\n        <NavLink activeStyle={activeStyle} to="/page2">\n          Page 2\n        </NavLink>\n      </li>\n    </ul>\n\n    <div style={{ border: "2px solid red", padding: "12px 24px" }}>\n      <h1>\n        <Route exact path="/" render={() => "Root Route"} />\n        <Route exact path="/page1" render={() => "Page 1"} />\n        <Route exact path="/page2" render={() => "Page 2"} />\n      </h1>\n    </div>\n  </HashRouter>\n);\n')))}y.isMDXComponent=!0}}]);