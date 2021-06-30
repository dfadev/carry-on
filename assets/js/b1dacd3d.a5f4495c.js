(self.webpackChunk=self.webpackChunk||[]).push([[8584],{3905:(e,t,r)=>{"use strict";r.d(t,{Zo:()=>p,kt:()=>d});var n=r(27378);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var c=n.createContext({}),u=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=u(e.components);return n.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},s=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),s=u(r),d=i,b=s["".concat(c,".").concat(d)]||s[d]||m[d]||a;return r?n.createElement(b,o(o({ref:t},p),{},{components:r})):n.createElement(b,o({ref:t},p))}));function d(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=s;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var u=2;u<a;u++)o[u]=r[u];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}s.displayName="MDXCreateElement"},87622:(e,t,r)=>{"use strict";r.r(t),r.d(t,{frontMatter:()=>o,contentTitle:()=>l,metadata:()=>c,toc:()=>u,default:()=>m});var n=r(22122),i=r(19756),a=(r(27378),r(3905)),o={id:"SubmitButtonField",title:"SubmitButtonField"},l=void 0,c={unversionedId:"api/carry-on-material-view/SubmitButtonField",id:"api/carry-on-material-view/SubmitButtonField",isDocsHomePage:!1,title:"SubmitButtonField",description:"`js live",source:"@site/../docs/api/carry-on-material-view/SubmitButtonField.md",sourceDirName:"api/carry-on-material-view",slug:"/api/carry-on-material-view/SubmitButtonField",permalink:"/carry-on/docs/api/carry-on-material-view/SubmitButtonField",version:"current",lastUpdatedBy:"Russ Panula",lastUpdatedAt:1625042761,formattedLastUpdatedAt:"6/30/2021",frontMatter:{id:"SubmitButtonField",title:"SubmitButtonField"},sidebar:"docs",previous:{title:"SelectField",permalink:"/carry-on/docs/api/carry-on-material-view/SelectField"},next:{title:"SubmitFabField",permalink:"/carry-on/docs/api/carry-on-material-view/SubmitFabField"}},u=[],p={toc:u};function m(e){var t=e.components,r=(0,i.Z)(e,["components"]);return(0,a.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live",live:!0},'<Store id={"submitButtonFieldForm"}>\n  <Form>\n    <Paper>\n      <Box px={3} pt={2} pb={3} mb={2}>\n        <SubmitButtonField name="abc" label="Submit" />\n      </Box>\n    </Paper>\n  </Form>\n  <StateInspector />\n</Store>\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"live",live:!0},'<Store id={"submitButtonFieldFormView"}>\n  <FormView>\n    <Register>{materialViewComponents}</Register>\n    <Fields>\n      <Field name="abc" label="Submit" editor="submit" />\n    </Fields>\n    <Sections>\n      <Section>{["abc"]}</Section>\n    </Sections>\n  </FormView>\n  <StateInspector />\n</Store>\n')))}m.isMDXComponent=!0}}]);