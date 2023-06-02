import "./style.css";


const CustomInput = (props) => {

  return (
    <>
      <div className="inputWrapper">
        {props?.label && (
          <label htmlFor={props?.id} className={props?.labelClass}>
            {props?.label}
            {props?.required ? "*" : ""}
          </label>
        )}
        <input
          type={props?.type}
          placeholder={props?.placeholder}
          required={props?.required}
          id={props?.id}
          value={props?.value}
          name={props?.name}
          className={props?.inputClass}
          onChange={props?.onChange}
        />
      </div>
    </>
  );
};
export default CustomInput;
