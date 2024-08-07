import { useState, useEffect } from "react";

const useScreenSize = (
  breakpoint: number = 1300,
  mode: "above" | "bellow" = "above"
) => {
  const [isAbove1300, setIsAbove1300] = useState<
    boolean | null
  >(null); // Use null as an initial loading state

  useEffect(() => {
    const handleResize = () => {
      if (mode === "above") {
        setIsAbove1300(window.innerWidth > breakpoint);
      } else {
        setIsAbove1300(window.innerWidth < breakpoint);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () =>
      window.removeEventListener("resize", handleResize);
  }, [breakpoint, mode]);

  // Only return the value when it's available, i.e., not null
  return isAbove1300 !== null ? isAbove1300 : false;
};

export default useScreenSize;
