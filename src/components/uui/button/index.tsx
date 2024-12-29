type Proptypes = {
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};
const BButton = (props: Proptypes) => {
  const { type, onClick, children, className, disabled } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`border-none cursor-pointer text-[16px] text-[700] disabled:opacity-70 disabled:cursor-default font-medium tracking-wider ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default BButton;
