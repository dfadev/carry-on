---
id: MaterialApp
title: MaterialApp
---

```js live noInline
const AppBar1 = ({ name }) => (
  <Field path={name}>
    {field => (
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h5">Material App</Typography>
        </Toolbar>
      </AppBar>
    )}
  </Field>
);

const AppBar2 = ({ name }) => (
  <Field path={name} type="list">
    {field => (
      <AppBar position="sticky">
        <Toolbar>
          {field.element.value.map((item, idx) => {
            console.log(item, field);
            const link = field.form.values.links[item];
            if (!link || !link.nav || !link.nav.top) return null;

            const editor = link.nav.top.editor;
            if (editor !== "iconButton") return null;

            return (
              <IconButtonField name={`links[${item}]`} {...link.nav.top}>
                <NavLink key={idx} to={link.url}>
                  {link.icon || link.label}
                </NavLink>
              </IconButtonField>
            );

            console.log(link);
            return null;
          })}
          <Typography variant="h5">Material App</Typography>
        </Toolbar>
      </AppBar>
    )}
  </Field>
);

const SideBar = ({ name }) => (
  <Field path={name} type="list">
    {field => (
      <List>
        {field.element.value.map(({ label, link, exact }, idx) => (
          <ListItem key={idx}>
            <NavLink
              id={`${idx}:NavLink`}
              activeStyle={{ color: "red" }}
              to={link}
              exact={exact}
            >
              {label}
            </NavLink>
          </ListItem>
        ))}
      </List>
    )}
  </Field>
);

const Content = () => (
  <Container>
    <Paper>
      <div>stuff</div>
    </Paper>
  </Container>
);

const Footer = () => <div>footer</div>;

const appState = {
  scopedCss: true,
  Router: HashRouter,
  app: {
    initialValues: {
      router: {
        component: HashRouter
      },
      css: {
        component: ScopedCssBaseline
      },
      styled: {
        baseline: ScopedCssBaseline
      },
      title: <title>MaterialApp Example</title>,
      appbar: "MaterialApp",
      appbar2: [
        "hamburger",
        "root",
        "info",
        "search",
        "spacer",
        "account",
        "logout"
      ],
      nav: {
        top: [
          "hamburger",
          "root",
          "info",
          "search",
          "spacer",
          "account",
          "logout"
        ],
        footer: [],
        hamburger: [],
        meatballs: [],
        kebab: [],
        doner: [],
        bento: []
      },
      links: {
        hamburger: {
          nav: {
            top: {
              editor: "hamburger"
            }
          }
        },
        root: {
          url: "/",
          exact: true,
          //content: Home,
          //icon: <HomeIcon />,
          label: "Material App",
          nav: {
            top: {
              editor: "navLink"
            },
            footer: {
              editor: "footerTextLink",
              hidden: ["xs", "sm"]
            },
            hamburger: {}
          }
        },
        info: {
          url: "/info",
          //content: Info,
          icon: <PlayArrowIcon />,
          nav: {
            top: {
              editor: "iconButton",
              hidden: ["xs", "sm"]
            },
            footer: {
              editor: "footerTextLink",
              hidden: ["xs", "sm"]
            }
          }
        },
        account: {
          url: "/account",
          //content: Account,
          //icon: <AccountIcon />,
          authorized: true,
          nav: {
            top: {
              editor: "iconButtonLink"
            }
          }
        }
      },
      sidebar: [
        { label: "Home", link: "/", exact: "true" },
        { label: "Info", link: "/info" },
        { label: "About", link: "/about" }
      ],
      footer: [
        [
          { label: "Footer 1", link: "/footer1" },
          { label: "Footer 2", link: "/footer2" }
        ],
        [
          { label: "Footer 3", link: "/footer3" },
          { label: "Footer 4", link: "/footer4" },
          { label: "Footer 5", link: "/footer5" }
        ],
        [
          { label: "Footer 6", link: "/footer6" },
          { label: "Footer 7", link: "/footer7" }
        ]
      ]
    },
    fields: {
      appbar: { editor: AppBar1 },
      appbar2: { editor: AppBar2 },
      sidebar: { editor: SideBar },
      content: { editor: Content },
      footer: { editor: Footer },
      popupMenu: { editor: () => "popupMenu" }
    },
    sections: [
      {
        layout: [
          ["appbar"],
          ["appbar2"],
          ["sidebar", "content"],
          ["footer"],
          ["popupMenu"]
        ]
      }
    ]
  },
  theme: responsiveFontSizes(
    createMuiTheme({
      palette: {
        type: "dark",
        primary: purple,
        secondary: green
      }
    })
  )
};

const App = () => (
  <>
    <Store id="materialApp1">
      <Register>{appState}</Register>
      <MaterialApp>
        <FormView id="app" noFormTag />
        <StateInspector />
      </MaterialApp>
    </Store>
  </>
);

render(<App />);
```
