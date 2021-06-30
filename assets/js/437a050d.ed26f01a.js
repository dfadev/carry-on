(self.webpackChunk=self.webpackChunk||[]).push([[1236],{3905:(e,n,t)=>{"use strict";t.d(n,{Zo:()=>p,kt:()=>u});var r=t(27378);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=r.createContext({}),s=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},p=function(e){var n=s(e.components);return r.createElement(c.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=s(t),u=a,y=d["".concat(c,".").concat(u)]||d[u]||m[u]||i;return t?r.createElement(y,o(o({ref:n},p),{},{components:t})):r.createElement(y,o({ref:n},p))}));function u(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=d;var l={};for(var c in n)hasOwnProperty.call(n,c)&&(l[c]=n[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var s=2;s<i;s++)o[s]=t[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},43500:(e,n,t)=>{"use strict";t.r(n),t.d(n,{frontMatter:()=>o,contentTitle:()=>l,metadata:()=>c,toc:()=>s,default:()=>m});var r=t(22122),a=t(19756),i=(t(27378),t(3905)),o={id:"ListField",title:"ListField"},l=void 0,c={unversionedId:"api/carry-on-material-view/ListField",id:"api/carry-on-material-view/ListField",isDocsHomePage:!1,title:"ListField",description:"`js live",source:"@site/../docs/api/carry-on-material-view/ListField.md",sourceDirName:"api/carry-on-material-view",slug:"/api/carry-on-material-view/ListField",permalink:"/carry-on/docs/api/carry-on-material-view/ListField",version:"current",lastUpdatedBy:"Russ Panula",lastUpdatedAt:1625042761,formattedLastUpdatedAt:"6/30/2021",frontMatter:{id:"ListField",title:"ListField"},sidebar:"docs",previous:{title:"InspectorField",permalink:"/carry-on/docs/api/carry-on-material-view/InspectorField"},next:{title:"PercentageField",permalink:"/carry-on/docs/api/carry-on-material-view/PercentageField"}},s=[],p={toc:s};function m(e){var n=e.components,t=(0,a.Z)(e,["components"]);return(0,i.kt)("wrapper",(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js",metastring:"live",live:!0},'<Store id={"listFieldForm"}>\n  <Form>\n    <InitialValues>\n      {{\n        contacts: [\n          { name: "John Johnson", phone: "+44 7911 123456", email: "jj@co.uk" },\n          { name: "Jan Jansen", phone: "7025551212", email: "jj@lv.nv" }\n        ]\n      }}\n    </InitialValues>\n    <Paper>\n      <Box px={3} pt={2} pb={3} mb={2}>\n        <ListField name="contacts" label="Contact Editor">\n          <Box my={1} p={1} pt={0}>\n            <Box>\n              Sample Greeting:\n              <h4>\n                Hello <DataField name="name" />!\n              </h4>\n            </Box>\n            <TextField name="name" label="Name" />\n            <PhoneField name="phone" label="Phone" defaultCountry="US" />\n            <TextField name="email" label="Email" />\n          </Box>\n        </ListField>\n      </Box>\n    </Paper>\n  </Form>\n  <StateInspector />\n</Store>\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js",metastring:"live",live:!0},'<Store id={"listFieldFormView"}>\n  <FormView>\n    <Register>{materialViewComponents}</Register>\n    <InitialValues>\n      {{\n        contacts: [\n          { name: "John Johnson", phone: "+44 7911 123456", email: "jj@co.uk" },\n          { name: "Jan Jansen", phone: "7025551212", email: "jj@lv.nv" }\n        ]\n      }}\n    </InitialValues>\n    <Fields>\n      <Field\n        name="contacts"\n        label="Contact Editor"\n        editor="list"\n        renderItem={\n          <FormViewer\n            fields={{\n              greeting: {\n                editor: "content",\n                content: (\n                  <Box>\n                    Sample Greeting:\n                    <h4>\n                      Hello <DataField name="name" />!\n                    </h4>\n                  </Box>\n                )\n              },\n              name: { label: "Name" },\n              phone: { label: "Mobile", editor: "phone", defaultCountry: "US" },\n              email: { label: "Email" }\n            }}\n            sections={[\n              {\n                layout: [["greeting"], ["name", "email", "phone"]]\n              }\n            ]}\n          />\n        }\n      />\n    </Fields>\n    <Sections>\n      <Section>{["contacts"]}</Section>\n    </Sections>\n  </FormView>\n  <StateInspector />\n</Store>\n')))}m.isMDXComponent=!0}}]);