import { useEffect, useRef } from "react";

export const usePrev = (value) => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};