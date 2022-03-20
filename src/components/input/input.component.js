import "./input.component.css";

export const Input = (props) => {
  const { error, ...inputProps } = props;
  return (
    <div>
      <input {...inputProps} /><br />
      {!!error && <span>{error}</span>}
    </div>
  );
};
