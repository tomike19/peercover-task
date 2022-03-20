import { Formik } from "formik";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./login.page.css";
import { Input, PasswordInput } from "../../components/input/input.component";
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
    <main className="login-section">
      <div className="login-section-left-content">
        <section>
          <h4 className="login-header-text">PEERCOVER</h4>
          <p className="login-header-paragraph">Car</p>
          <p className="login-header-Insurance-text">Insurance</p>
          <p className="login-header-prices">Prices from</p>
          <p className="login-header-paragraph-price">N10,000</p>
        </section>
      </div>
      <section className="login-section-container">
        <div className="login-section-details">
          <h1>WELCOME BACK</h1>
      
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
                  <div className="login-wrapper">
                    <p className="login-section-input-text">
                      Input your details to proceed
                    </p>
                    <Input
                      error={touched.username && errors.username}
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="username"
                      placeholder="Username"
                    />

                    <PasswordInput
                      placeholder="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && errors.password}
                      name="password"
                      value={values.password}
                    />
                    <p className=" text-success text-end">
                      Forget password
                    </p>
                  </div>
                  <Button disabled={isSubmitting} type="submit">
                    Log In
                  </Button>
                </form>
              );
            }}
          </Formik>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
