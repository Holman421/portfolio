import { useState, useEffect } from "react";

interface MousePosition {
   x: number;
   y: number;
}

const useMousePosition = (): MousePosition => {
   const [position, setPosition] = useState({ x: 0, y: 0 });

   useEffect(() => {
      const handleMouseMove = (event: MouseEvent) =>
         setPosition({ x: event.clientX, y: event.clientY });

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
         window.removeEventListener("mousemove", handleMouseMove);
      };
   }, []);

   return position;
};

export default useMousePosition;
