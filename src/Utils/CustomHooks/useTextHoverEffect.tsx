import { useState, useEffect } from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXY";

const useHoverEffect = (label: string) => {
   const [text, setText] = useState(label);
   const [isHovered, setIsHovered] = useState(false);

   const handleMouseEnter = () => {
      setIsHovered(!isHovered);
   };

   const handleMouseOver = () => {
      let iteration = 0;

      const interval = setInterval(() => {
         const newText = text
            .split("")
            .map((letter: any, index: number) => {
               if (index < iteration) {
                  return label[index];
               }

               return letters[Math.floor(Math.random() * 26)];
            })
            .join("");

         setText(newText);

         if (iteration >= label.length) {
            clearInterval(interval);
         }

         iteration += 1 / 2;
      }, 35);
   };

   useEffect(() => {
      isHovered && handleMouseOver();
   }, [isHovered]);

   return { text, isHovered, handleMouseEnter };
};

export default useHoverEffect;
