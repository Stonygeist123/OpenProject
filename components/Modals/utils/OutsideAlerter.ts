import { useEffect } from "react";

function useCloseFunction(ref: any, closeFunction: () => void) {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) closeFunction();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeFunction, ref]);
}

export default useCloseFunction;
