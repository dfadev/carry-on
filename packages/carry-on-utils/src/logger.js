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

const clr = Object.keys(colors).map(item => colors[item]);
let currentClr = 0;

export default function logger(id) {
  const color = clr[currentClr];
  currentClr++;
  if (currentClr >= 6) currentClr = 0;

  const idStyle = "color:" + color + ";font-weight:900";
  const actionStyle =
    "color:" + colors.yellow + ";background-color:" + colors.blue;
  const actionStyle2 = "color:" + colors.yellow;
  const infoStyle = "color:" + colors.gray + ";font-style:italic";

  return function log(action, ...result) {
    let prefix = "%c%s %c %s ";
    let actStyle;
    let act;

    if (action.length > 0 && action[0] === "-") {
      actStyle = actionStyle2;
      act = action.substr(1);
    } else {
      actStyle = actionStyle;
      act = action;
    }

    const items = [idStyle, id, actStyle, act];

    for (let i = 0, len = result.length; i < len; i++) {
      const logItem = result[i];
      if (typeof logItem === "string") {
        prefix += "%c %s ";
        items.push(infoStyle);
        items.push(logItem);
      } else {
        prefix += "%o";
        items.push(logItem);
      }
    }

    // eslint-disable-next-line
    console.log(prefix, ...items);
  };
}
