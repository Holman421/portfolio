import { useRef, useState, useEffect } from "react";

const useGetDivWidth = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    // this calculates the width of titleDiv so that
    // descriptionDiv can make space for it, it also updates
    // if somebody in UI edits the title
    const resizeObserver = new ResizeObserver((entries) => {
      setWidth(entries[0].target.clientWidth);
    });
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { ref, width };
};

export default useGetDivWidth;
