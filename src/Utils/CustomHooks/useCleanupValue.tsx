import { useEffect, useState } from "react";

const useCleanupValue = (
  originalValue: string,
  updatedValue: string,
  delay: number
) => {
  const [value, setValue] = useState(originalValue);

  useEffect(() => {
    setTimeout(() => {
      setValue(updatedValue);
    }, delay);
  }, []);
  return value;
};

export default useCleanupValue;
