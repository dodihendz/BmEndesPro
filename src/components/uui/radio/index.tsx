type Proptypes = {
  label?: string;
  icon?: string;
  name: string;
  className?: string;
  id?: string;
  children: React.ReactNode;
};
const Radio = (props: Proptypes) => {
  const { label, name, className, id, icon, children } = props;
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label htmlFor={name} className="mt-[5px] mb-1">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        {icon && <i className={`bx ${icon} text-[20px] mr-1`} />}
        {children}
      </div>
    </div>
  );
};
export default Radio;

{
  /* <input
          name={name}
          id={id}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={onChange}
          className={`p-[10px] outline-none rounded-[5px] disabled:opacity-70 ${classNamei}`}
        />
        <label htmlFor={name} className="mt-[5px] mb-1">
          {radio}
        </label> */
}
