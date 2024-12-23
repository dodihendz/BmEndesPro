import styles from "./input.module.scss";

type Proptypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  className?: string;
  classNamei?: string;
  id?: string;
  icon?: string;
  onChange?: (e: any) => void;
  required?: boolean;
  value?: string;
};
const IInput = (props: Proptypes) => {
  const {
    label,
    name,
    type,
    placeholder,
    defaultValue,
    disabled,
    className,
    id,
    classNamei,
    icon,
    onChange,
    required,
  } = props;
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label htmlFor={name} className="mt-[5px] mb-1">
          {label}
        </label>
      )}
      <div className="flex justify-center items-center">
        {icon && <i className={`bx ${icon} text-[20px] mr-1`} />}
        <input
          name={name}
          id={id}
          type={type}
          placeholder={placeholder}
          className={`${styles.nospin} p-[10px] w-full outline-none rounded-[5px] disabled:opacity-40 ${classNamei}`}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={onChange}
          required={required}
        />
      </div>
    </div>
  );
};
export default IInput;
