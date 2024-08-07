import { useState, useEffect, useRef } from "react";

const useFuturisticTextEffect = (initialText: string, animationSpeed: number = 40) => {
  const letters = "abcdefghijklmnopqrstuvwxyz";

  // Initialize text with non-breaking spaces to avoid layout shift
  const initialInvisibleText = initialText.replace(/./g, "\u00A0");
  const [text, setText] = useState(initialInvisibleText);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRender = useRef(true);
  const wasTriggered = useRef(false);

  const trigger = () => {
    wasTriggered.current = true;
    let iteration = 0;
    let rightLetterIndex = 0;

    setText(initialInvisibleText); // Set text to invisible characters before starting the interval

    intervalRef.current = setInterval(() => {
      setText((currentText) => {
        return initialText
          .split("")
          .map((char, index) => {
            if (index < rightLetterIndex) {
              return initialText[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("");
      });

      if (iteration % 2 === 0) {
        rightLetterIndex++;
      }

      iteration++;

      if (rightLetterIndex >= initialText.length) {
        clearInterval(intervalRef.current!);
        setText(initialText);
      }
    }, animationSpeed);
  };

  useEffect(() => {
    if (isFirstRender.current || !wasTriggered.current) {
      isFirstRender.current = false;
      return;
    }

    trigger(); // Call trigger when initialText changes
  }, [initialText]);

  return { text, trigger };
};

export default useFuturisticTextEffect;
