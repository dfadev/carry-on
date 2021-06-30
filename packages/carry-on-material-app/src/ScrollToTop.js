import { useEffect } from "react";
import { withRouter } from "carry-on-react-router";

const ScrollToTop = ({ history, children }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return children;
};

export default withRouter(ScrollToTop);
