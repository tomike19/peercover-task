import { Formik } from "formik";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./login.page.css";
import { Input } from "../../components/input/input.component";
import { Button } from "../../components/button/button.component";
import $api from "../../helpers/api";
import { loginValidation } from "../../helpers/validation";
import { useEffect } from "react";

export const LoginPage = (props) => {
  const { user, setUser } = props;
  const navigate = useNavigate();
  const [search] = useSearchParams();

  useEffect(() => {
    if (user) {
      const goto = search.get("goto") || "/";

      navigate(goto);
      return null;
    }
  }, [navigate, search, user]);

  return (
    <main>
      <h1>Welcome Back</h1>

      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, helpers) => {
          helpers.setSubmitting(true);
          $api
            .$post("/consultant_auth", values)
            .then(setUser)
            .catch((error) => {
              toast.error(error.message);
            })
            .finally(helpers.setSubmitting(false));
        }}
        validationSchema={loginValidation}
      >
        {(props) => {
          const {
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            isSubmitting,
          } = props;

          return (
            <form onSubmit={handleSubmit}>
              <Input
                error={touched.username && errors.username}
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                name="username"
                placeholder="Username"
              />

              <Input
                error={touched.password && errors.password}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                placeholder="Password"
                type="password"
              />

              <Button disabled={isSubmitting} type="submit">
                Log In
              </Button>
            </form>
          );
        }}
      </Formik>
    </main>
  );
};

export default LoginPage;
