import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentPageIndex } from "../../Redux/reducers/themeReducer";
import { CurrentPageIndex } from "../../Types/Types";

const useUpdateCurrentPage = (
  ref: React.RefObject<Element>,
  index: CurrentPageIndex
) => {
  const dispatch = useDispatch();
  const observer = useRef<IntersectionObserver | null>(
    null
  );

  useEffect(() => {
    const node = ref.current;
    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          dispatch(updateCurrentPageIndex({ index }));
        }
      },
      { threshold: 0.5 }
    );

    if (node) {
      observer.current.observe(node);
    }

    return () => {
      if (node) {
        observer.current!.unobserve(node);
      }
    };
  }, [dispatch, index, ref]);

  return null;
};

export default useUpdateCurrentPage;
