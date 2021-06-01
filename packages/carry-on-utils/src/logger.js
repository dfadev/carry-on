import keys from "./keys";

const colors = {
  0: "#F2777A",
  1: "#F99157",
  yellow: "#FFCC66",
  3: "#99CC99",
  4: "#66CCCC",
  6: "#CC99CC",
  blue: "#0074d9",
  gray: "#aaaaaa",
  white: "#ffffff",
  black: "#111111",
  silver: "#dddddd"
};

const clr = keys(colors).map(item => colors[item]);
let currentClr = 0;
const prefix = "%c%s %c %s ";

// eslint-disable-next-line
export default function logger(id, out = console.log) {
  if (document.documentMode || /Edge/.test(navigator.userAgent))
    // eslint-disable-next-line
    return out;
  // eslint-enable

  const color = clr[currentClr];
  currentClr += 1;
  if (currentClr >= 6) currentClr = 0;

  const idStyle = `color:${color};font-weight:900`;
  const actionStyle = `color:${colors.yellow};background-color:${colors.blue}`;
  const actionStyle2 = `color:${colors.yellow}`;

  return function log(action, ...result) {
    let actStyle;
    let act;

    if (action.length > 0 && action[0] === "-") {
      actStyle = actionStyle2;
      act = action.substr(1);
    } else {
      actStyle = actionStyle;
      act = action;
    }

    const items = [idStyle, id, actStyle, act, ...result];
    out(prefix, ...items);
  };
}
