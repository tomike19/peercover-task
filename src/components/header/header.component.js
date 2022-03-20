import "./header.component.css";

export const Header = (props) => {
  const { user } = props;

  return (
    <header>
      <p>Hi, {user.firstname}</p>
    </header>
  );
};
