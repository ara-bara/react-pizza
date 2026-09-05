import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollToTop = () => {
  const { pathname, hash, state } = useLocation();

  useEffect(() => {
    if (pathname === "/" && ["items", "footer"].includes(state?.scrollTo)) return;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname, hash, state]);
};
