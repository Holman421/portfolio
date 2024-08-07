import {
  RefObject,
  useEffect,
  useMemo,
  useState,
} from "react";

export default function useCurrentPageIndex(
  refs: RefObject<HTMLElement>[]
) {
  const [currentPageIndex, setCurrentPageIndex] =
    useState<number>(0);

  const observers = useMemo(() => {
    return refs.map((ref, index) => {
      return new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCurrentPageIndex(index);
          }
        },
        { threshold: 0.5 }
      ); // use 50% threshold
    });
  }, [refs]);

  useEffect(() => {
    refs.forEach((ref, index) => {
      observers[index].observe(ref.current!);
    });
    return () => {
      refs.forEach((ref, index) => {
        observers[index].disconnect();
      });
    };
  }, []);

  return currentPageIndex;
}
