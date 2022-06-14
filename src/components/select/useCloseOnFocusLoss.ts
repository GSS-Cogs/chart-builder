import { useEffect } from "react";
const useCloseOnFocusLoss = (
  ref: { current: any },
  open: boolean,
  setOpen: (open: boolean) => void,
) => {
  useEffect(() => {
    if (document && open) {
      const listener = (e: MouseEvent) => {
        if (
          ref.current &&
          !ref.current.contains(e.target) &&
          e.target instanceof Node &&
          e.target.isConnected
        ) {
          setOpen(false);
        }
      };
      document.addEventListener("click", listener);
      return () => document.removeEventListener("click", listener);
    }
  }, [ref, open, setOpen]);
};

export default useCloseOnFocusLoss;
