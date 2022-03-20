import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../../components/button/button.component";
import { Header } from "../../../components/header/header.component";
import { Input } from "../../../components/input/input.component";
import { withAuth } from "../../../components/withauth.component";
import $api from "../../../helpers/api";
import "./marketer.page.css";

const MarketerPage = (props) => {
  const { user } = props;
  const params = useParams();
  const [marketer, setMarketer] = useState(null);

  useEffect(() => {
    const { marketer } = params;
    if (marketer) {
      $api
        .$get(`/marketers/${marketer}`)
        .then(({ marketer: [marketer] }) => setMarketer(marketer))
        .catch((err) => {
          if (err.status !== 403) {
            toast.error(err.message, { autoClose: false });
          }
        });
    }
  }, [params]);

  if (!marketer) {
    return null;
  }

  return (
    <main>
      <Header user={user} />
      <h1>View Marketing consultant</h1>
      <Formik
        onSubmit={(values, helpers) => {
          helpers.setSubmitting(true);
          $api
            .$put("/marketers", values)
            .then(() => {
              toast.success("Marketer updated successfully");
            })
            .catch((err) => {
              if (err.status !== 403) {
                toast.error(err.message);
              }
            })
            .finally(helpers.setSubmitting(false));
        }}
        initialValues={{ ...marketer, marketingConsultantId: params.marketer }}
      >
        {(props) => {
          const {
            handleSubmit,
            values,
            handleChange,
            handleBlur,
            touched,
            errors,
            isSubmitting,
          } = props;

          return (
            <form
              onSubmit={handleSubmit}
              style={{ width: "100%", maxWidth: "400px", margin: "auto" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label htmlFor="name">Firstname</label>
                <Input
                  id="firstname"
                  name="firstname"
                  error={touched.firstname && errors.firstname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstname}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label htmlFor="name">Lastname</label>
                <Input
                  id="lastname"
                  name="lastname"
                  error={touched.lastname && errors.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastname}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label htmlFor="name">Gender</label>
                <Input
                  id="gender"
                  name="gender"
                  error={touched.gender && errors.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.gender}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label htmlFor="name">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  error={touched.email && errors.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label htmlFor="name">Phone Number</label>
                <Input
                  id="phonenumber"
                  name="phonenumber"
                  type="tel"
                  error={touched.phonenumber && errors.phonenumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phonenumber}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label htmlFor="name">Account Name</label>
                <Input
                  id="accountName"
                  name="accountName"
                  error={touched.accountName && errors.accountName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.accountName}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label htmlFor="name">Account Number</label>
                <Input
                  id="accountNumber"
                  name="accountNumber"
                  error={touched.accountNumber && errors.accountNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.accountNumber}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label htmlFor="name">Bank Name</label>
                <Input
                  id="bankname"
                  name="bankname"
                  error={touched.bankname && errors.bankname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bankname}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label htmlFor="name">Bank Code</label>
                <Input
                  id="bankcode"
                  name="bankcode"
                  error={touched.bankcode && errors.bankcode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bankcode}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label htmlFor="name">Address</label>
                <textarea
                  id="address"
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                />
                {touched.address && <span>{errors.address}</span>}
              </div>

              <Button type="submit" disabled={isSubmitting}>
                UPDATE MARKETER
              </Button>
            </form>
          );
        }}
      </Formik>
    </main>
  );
};

export default withAuth(MarketerPage);
