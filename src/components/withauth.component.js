import { stringifyUrl } from "query-string";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const withAuth = (Component) => {
  return (props) => {
    const { user } = props;
    const navigate = useNavigate();
    useEffect(() => {
      if (!user) {
        const url = stringifyUrl({
          url: "/login",
          query: { goto: window.location.pathname + window.location.search },
        });

        navigate(url);
      }
    }, [navigate, user]);

    if (!user) {
      return null;
    }

    return <Component {...props} />;
  };
};
