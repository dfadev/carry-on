"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[466],{3905:(e,t,r)=>{r.d(t,{Zo:()=>m,kt:()=>u});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var c=n.createContext({}),p=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},m=function(e){var t=p(e.components);return n.createElement(c.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,c=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),d=p(r),u=i,f=d["".concat(c,".").concat(u)]||d[u]||s[u]||a;return r?n.createElement(f,o(o({ref:t},m),{},{components:r})):n.createElement(f,o({ref:t},m))}));function u(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var p=2;p<a;p++)o[p]=r[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},7144:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>m,contentTitle:()=>c,default:()=>u,frontMatter:()=>l,metadata:()=>p,toc:()=>s});var n=r(7462),i=r(3366),a=(r(7294),r(3905)),o=["components"],l={id:"TimeField",title:"TimeField"},c=void 0,p={unversionedId:"api/carry-on-material-view/TimeField",id:"api/carry-on-material-view/TimeField",title:"TimeField",description:"",source:"@site/../docs/api/carry-on-material-view/TimeField.md",sourceDirName:"api/carry-on-material-view",slug:"/api/carry-on-material-view/TimeField",permalink:"/carry-on/docs/api/carry-on-material-view/TimeField",draft:!1,tags:[],version:"current",lastUpdatedBy:"Russ Panula",lastUpdatedAt:1625042761,formattedLastUpdatedAt:"6/30/2021",frontMatter:{id:"TimeField",title:"TimeField"},sidebar:"docs",previous:{title:"TextField",permalink:"/carry-on/docs/api/carry-on-material-view/TextField"},next:{title:"ToggleButtonGroupField",permalink:"/carry-on/docs/api/carry-on-material-view/ToggleButtonGroupField"}},m={},s=[],d={toc:s};function u(e){var t=e.components,r=(0,i.Z)(e,o);return(0,a.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live",live:!0},'<Store id={"timeFieldForm"}>\n  <Form>\n    <Paper>\n      <Box px={3} pt={2} pb={3} mb={2}>\n        <TimeField name="abc" label="Example Editor" />\n      </Box>\n    </Paper>\n  </Form>\n  <StateInspector />\n</Store>\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live",live:!0},'<Store id={"timeFieldFormView"}>\n  <FormView>\n    <Register>{materialViewComponents}</Register>\n    <Fields>\n      <Field name="abc" label="Example Editor" editor="time" />\n    </Fields>\n    <Sections>\n      <Section>{["abc"]}</Section>\n    </Sections>\n  </FormView>\n  <StateInspector />\n</Store>\n')))}u.isMDXComponent=!0}}]);