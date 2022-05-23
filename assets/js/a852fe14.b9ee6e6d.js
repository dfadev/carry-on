/*! For license information please see a852fe14.b9ee6e6d.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7119],{62525:n=>{var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;function o(n){if(null==n)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(n)}n.exports=function(){try{if(!Object.assign)return!1;var n=new String("abc");if(n[5]="de","5"===Object.getOwnPropertyNames(n)[0])return!1;for(var e={},t=0;t<10;t++)e["_"+String.fromCharCode(t)]=t;if("0123456789"!==Object.getOwnPropertyNames(e).map((function(n){return e[n]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(n){r[n]=n})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(o){return!1}}()?Object.assign:function(n,a){for(var i,l,p=o(n),c=1;c<arguments.length;c++){for(var u in i=Object(arguments[c]))t.call(i,u)&&(p[u]=i[u]);if(e){l=e(i);for(var s=0;s<l.length;s++)r.call(i,l[s])&&(p[l[s]]=i[l[s]])}}return p}},41535:(n,e,t)=>{var r=t(62525),o=60103,a=60106;var i=60109,l=60110,p=60112;var c=60115,u=60116;if("function"==typeof Symbol&&Symbol.for){var s=Symbol.for;o=s("react.element"),a=s("react.portal"),s("react.fragment"),s("react.strict_mode"),s("react.profiler"),i=s("react.provider"),l=s("react.context"),p=s("react.forward_ref"),s("react.suspense"),c=s("react.memo"),u=s("react.lazy")}var f="function"==typeof Symbol&&Symbol.iterator;function d(n){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+n,t=1;t<arguments.length;t++)e+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+n+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m={};function b(n,e,t){this.props=n,this.context=e,this.refs=m,this.updater=t||y}function v(){}function h(n,e,t){this.props=n,this.context=e,this.refs=m,this.updater=t||y}b.prototype.isReactComponent={},b.prototype.setState=function(n,e){if("object"!=typeof n&&"function"!=typeof n&&null!=n)throw Error(d(85));this.updater.enqueueSetState(this,n,e,"setState")},b.prototype.forceUpdate=function(n){this.updater.enqueueForceUpdate(this,n,"forceUpdate")},v.prototype=b.prototype;var g=h.prototype=new v;g.constructor=h,r(g,b.prototype),g.isPureReactComponent=!0;var k={current:null},O=Object.prototype.hasOwnProperty,j={key:!0,ref:!0,__self:!0,__source:!0};function w(n,e,t){var r,a={},i=null,l=null;if(null!=e)for(r in void 0!==e.ref&&(l=e.ref),void 0!==e.key&&(i=""+e.key),e)O.call(e,r)&&!j.hasOwnProperty(r)&&(a[r]=e[r]);var p=arguments.length-2;if(1===p)a.children=t;else if(1<p){for(var c=Array(p),u=0;u<p;u++)c[u]=arguments[u+2];a.children=c}if(n&&n.defaultProps)for(r in p=n.defaultProps)void 0===a[r]&&(a[r]=p[r]);return{$$typeof:o,type:n,key:i,ref:l,props:a,_owner:k.current}}function A(n){return"object"==typeof n&&null!==n&&n.$$typeof===o}var S=/\/+/g;function x(n,e){return"object"==typeof n&&null!==n&&null!=n.key?function(n){var e={"=":"=0",":":"=2"};return"$"+n.replace(/[=:]/g,(function(n){return e[n]}))}(""+n.key):e.toString(36)}function M(n,e,t,r,i){var l=typeof n;"undefined"!==l&&"boolean"!==l||(n=null);var p=!1;if(null===n)p=!0;else switch(l){case"string":case"number":p=!0;break;case"object":switch(n.$$typeof){case o:case a:p=!0}}if(p)return i=i(p=n),n=""===r?"."+x(p,0):r,Array.isArray(i)?(t="",null!=n&&(t=n.replace(S,"$&/")+"/"),M(i,e,t,"",(function(n){return n}))):null!=i&&(A(i)&&(i=function(n,e){return{$$typeof:o,type:n.type,key:e,ref:n.ref,props:n.props,_owner:n._owner}}(i,t+(!i.key||p&&p.key===i.key?"":(""+i.key).replace(S,"$&/")+"/")+n)),e.push(i)),1;if(p=0,r=""===r?".":r+":",Array.isArray(n))for(var c=0;c<n.length;c++){var u=r+x(l=n[c],c);p+=M(l,e,t,u,i)}else if(u=function(n){return null===n||"object"!=typeof n?null:"function"==typeof(n=f&&n[f]||n["@@iterator"])?n:null}(n),"function"==typeof u)for(n=u.call(n),c=0;!(l=n.next()).done;)p+=M(l=l.value,e,t,u=r+x(l,c++),i);else if("object"===l)throw e=""+n,Error(d(31,"[object Object]"===e?"object with keys {"+Object.keys(n).join(", ")+"}":e));return p}function P(n,e,t){if(null==n)return n;var r=[],o=0;return M(n,r,"","",(function(n){return e.call(t,n,o++)})),r}function F(n){if(-1===n._status){var e=n._result;e=e(),n._status=0,n._result=e,e.then((function(e){0===n._status&&(e=e.default,n._status=1,n._result=e)}),(function(e){0===n._status&&(n._status=2,n._result=e)}))}if(1===n._status)return n._result;throw n._result}var _={current:null};function T(){var n=_.current;if(null===n)throw Error(d(321));return n}},27378:(n,e,t)=>{t(41535)},3905:(n,e,t)=>{t.d(e,{Zo:()=>u,kt:()=>d});var r=t(67294);function o(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function a(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function i(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?a(Object(t),!0).forEach((function(e){o(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function l(n,e){if(null==n)return{};var t,r,o=function(n,e){if(null==n)return{};var t,r,o={},a=Object.keys(n);for(r=0;r<a.length;r++)t=a[r],e.indexOf(t)>=0||(o[t]=n[t]);return o}(n,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);for(r=0;r<a.length;r++)t=a[r],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(o[t]=n[t])}return o}var p=r.createContext({}),c=function(n){var e=r.useContext(p),t=e;return n&&(t="function"==typeof n?n(e):i(i({},e),n)),t},u=function(n){var e=c(n.components);return r.createElement(p.Provider,{value:e},n.children)},s={inlineCode:"code",wrapper:function(n){var e=n.children;return r.createElement(r.Fragment,{},e)}},f=r.forwardRef((function(n,e){var t=n.components,o=n.mdxType,a=n.originalType,p=n.parentName,u=l(n,["components","mdxType","originalType","parentName"]),f=c(t),d=o,y=f["".concat(p,".").concat(d)]||f[d]||s[d]||a;return t?r.createElement(y,i(i({ref:e},u),{},{components:t})):r.createElement(y,i({ref:e},u))}));function d(n,e){var t=arguments,o=e&&e.mdxType;if("string"==typeof n||o){var a=t.length,i=new Array(a);i[0]=f;var l={};for(var p in e)hasOwnProperty.call(e,p)&&(l[p]=e[p]);l.originalType=n,l.mdxType="string"==typeof n?n:o,i[1]=l;for(var c=2;c<a;c++)i[c]=t[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}f.displayName="MDXCreateElement"},1179:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>u,contentTitle:()=>p,default:()=>d,frontMatter:()=>l,metadata:()=>c,toc:()=>s});var r=t(87462),o=t(63366),a=(t(27378),t(3905)),i=["components"],l={id:"MaterialApp",title:"MaterialApp"},p=void 0,c={unversionedId:"api/carry-on-material-app/MaterialApp",id:"api/carry-on-material-app/MaterialApp",title:"MaterialApp",description:"",source:"@site/../docs/api/carry-on-material-app/MaterialApp.md",sourceDirName:"api/carry-on-material-app",slug:"/api/carry-on-material-app/MaterialApp",permalink:"/carry-on/docs/api/carry-on-material-app/MaterialApp",draft:!1,tags:[],version:"current",lastUpdatedBy:"Russ Panula",lastUpdatedAt:1653281634,formattedLastUpdatedAt:"5/23/2022",frontMatter:{id:"MaterialApp",title:"MaterialApp"},sidebar:"docs",previous:{title:"registerComponents",permalink:"/carry-on/docs/api/carry-on-material-view/registerComponents"}},u={},s=[],f={toc:s};function d(n){var e=n.components,t=(0,o.Z)(n,i);return(0,a.kt)("wrapper",(0,r.Z)({},f,t,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},'const AppBar1 = ({ name }) => (\n  <Field path={name}>\n    {field => (\n      <AppBar position="sticky">\n        <Toolbar>\n          <Typography variant="h5">Material App</Typography>\n        </Toolbar>\n      </AppBar>\n    )}\n  </Field>\n);\n\nconst AppBar2 = ({ name }) => (\n  <Field path={name} type="list">\n    {field => (\n      <AppBar position="sticky">\n        <Toolbar>\n          {field.element.value.map((item, idx) => {\n            console.log(item, field);\n            const link = field.form.values.links[item];\n            if (!link || !link.nav || !link.nav.top) return null;\n\n            const editor = link.nav.top.editor;\n            if (editor !== "iconButton") return null;\n\n            return (\n              <IconButtonField name={`links[${item}]`} {...link.nav.top}>\n                <NavLink key={idx} to={link.url}>\n                  {link.icon || link.label}\n                </NavLink>\n              </IconButtonField>\n            );\n\n            console.log(link);\n            return null;\n          })}\n          <Typography variant="h5">Material App</Typography>\n        </Toolbar>\n      </AppBar>\n    )}\n  </Field>\n);\n\nconst SideBar = ({ name }) => (\n  <Field path={name} type="list">\n    {field => (\n      <List>\n        {field.element.value.map(({ label, link, exact }, idx) => (\n          <ListItem key={idx}>\n            <NavLink\n              id={`${idx}:NavLink`}\n              activeStyle={{ color: "red" }}\n              to={link}\n              exact={exact}\n            >\n              {label}\n            </NavLink>\n          </ListItem>\n        ))}\n      </List>\n    )}\n  </Field>\n);\n\nconst Content = () => (\n  <Container>\n    <Paper>\n      <div>stuff</div>\n    </Paper>\n  </Container>\n);\n\nconst Footer = () => <div>footer</div>;\n\nconst appState = {\n  scopedCss: true,\n  Router: HashRouter,\n  app: {\n    initialValues: {\n      router: {\n        component: HashRouter\n      },\n      css: {\n        component: ScopedCssBaseline\n      },\n      styled: {\n        baseline: ScopedCssBaseline\n      },\n      title: <title>MaterialApp Example</title>,\n      appbar: "MaterialApp",\n      appbar2: [\n        "hamburger",\n        "root",\n        "info",\n        "search",\n        "spacer",\n        "account",\n        "logout"\n      ],\n      nav: {\n        top: [\n          "hamburger",\n          "root",\n          "info",\n          "search",\n          "spacer",\n          "account",\n          "logout"\n        ],\n        footer: [],\n        hamburger: [],\n        meatballs: [],\n        kebab: [],\n        doner: [],\n        bento: []\n      },\n      links: {\n        hamburger: {\n          nav: {\n            top: {\n              editor: "hamburger"\n            }\n          }\n        },\n        root: {\n          url: "/",\n          exact: true,\n          //content: Home,\n          //icon: <HomeIcon />,\n          label: "Material App",\n          nav: {\n            top: {\n              editor: "navLink"\n            },\n            footer: {\n              editor: "footerTextLink",\n              hidden: ["xs", "sm"]\n            },\n            hamburger: {}\n          }\n        },\n        info: {\n          url: "/info",\n          //content: Info,\n          icon: <PlayArrowIcon />,\n          nav: {\n            top: {\n              editor: "iconButton",\n              hidden: ["xs", "sm"]\n            },\n            footer: {\n              editor: "footerTextLink",\n              hidden: ["xs", "sm"]\n            }\n          }\n        },\n        account: {\n          url: "/account",\n          //content: Account,\n          //icon: <AccountIcon />,\n          authorized: true,\n          nav: {\n            top: {\n              editor: "iconButtonLink"\n            }\n          }\n        }\n      },\n      sidebar: [\n        { label: "Home", link: "/", exact: "true" },\n        { label: "Info", link: "/info" },\n        { label: "About", link: "/about" }\n      ],\n      footer: [\n        [\n          { label: "Footer 1", link: "/footer1" },\n          { label: "Footer 2", link: "/footer2" }\n        ],\n        [\n          { label: "Footer 3", link: "/footer3" },\n          { label: "Footer 4", link: "/footer4" },\n          { label: "Footer 5", link: "/footer5" }\n        ],\n        [\n          { label: "Footer 6", link: "/footer6" },\n          { label: "Footer 7", link: "/footer7" }\n        ]\n      ]\n    },\n    fields: {\n      appbar: { editor: AppBar1 },\n      appbar2: { editor: AppBar2 },\n      sidebar: { editor: SideBar },\n      content: { editor: Content },\n      footer: { editor: Footer },\n      popupMenu: { editor: () => "popupMenu" }\n    },\n    sections: [\n      {\n        layout: [\n          ["appbar"],\n          ["appbar2"],\n          ["sidebar", "content"],\n          ["footer"],\n          ["popupMenu"]\n        ]\n      }\n    ]\n  },\n  theme: responsiveFontSizes(\n    createMuiTheme({\n      palette: {\n        type: "dark",\n        primary: purple,\n        secondary: green\n      }\n    })\n  )\n};\n\nconst App = () => (\n  <>\n    <Store id="materialApp1">\n      <Register>{appState}</Register>\n      <MaterialApp>\n        <FormView id="app" noFormTag />\n        <StateInspector />\n      </MaterialApp>\n    </Store>\n  </>\n);\n\nrender(<App />);\n')))}d.isMDXComponent=!0}}]);