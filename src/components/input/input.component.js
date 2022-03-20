import "./input.component.css";
import {useState} from 'react'

export const Input = (props) => {
  const { error, ...inputProps } = props;
  return (
    <div>
      <input className="input" {...inputProps} />
      <br />
      {!!error && <p className="text-danger m-0">{error}</p>}
    </div>
  );
};


export const PasswordInput = (props, { Children }) => {
  const { error, ...inputProps } = props;
  const [type, setType] = useState("password");

  const toggleType = () => {
    if (type === "password") {
      setType("text");
    } else setType("password");
  };

  const isHidden = type === "password";

  return (
    <div className="password-form d-flex flex-column justify-content-center">
      <div className="password-input-wrap d-flex justify-content-space-between align-items-center ">
        <input className="password-input" {...inputProps} type={type} />
        <span onClick={toggleType}>
          {isHidden ? (
            "show"
          ) : (
            "hide"
          )}
        </span>
      </div>
      {error && (
        <p className="error-size text-danger m-0 ">{error}</p>
      )}
    </div>
  );
};
