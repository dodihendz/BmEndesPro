import { useEffect, useRef } from "react";
import styles from "./modal.module.scss";

const Modal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: Function;
}) => {
  const ref: any = useRef();
  useEffect(() => {
    const handleClickOutSide = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) onClose();
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [onClose]);
  return (
    <div className="top-0 fixed w-screen h-screen flex items-center justify-center z-30 bg-black-50">
      <div
        ref={ref}
        className={`p-[40px] w-[50vw] max-h-[80vh] bg-slate-200 rounded-lg ${styles.scrollbarHidden}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
