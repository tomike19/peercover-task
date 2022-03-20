import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../components/button/button.component";
import { Header } from "../../components/header/header.component";
import { withAuth } from "../../components/withauth.component";
import $api from "../../helpers/api";
import "./index.page.css";

const Dashboard = (props) => {
  const { user } = props;
  const [marketers, setMarketers] = useState([]);

  const getMarketers = useCallback(() => {
    $api
      .$get("/marketers")
      .then(({ marketers }) => setMarketers(marketers))
      .catch((err) => {
        if (err.status !== 403) {
          toast.error(err.message, { autoClose: false });
        }
      });
  }, []);

  useEffect(() => {
    getMarketers();
  }, [getMarketers]);

  const deleteMarketer = (username) => {
    return () => {
      const shouldDelete = window.confirm(
        "Are you sure you want to permanently delete this marketer?"
      );
      if (shouldDelete) {
        setMarketers(marketers.filter((m) => m.username !== username));
        $api
          .$delete(`/marketers/${username}`)
          .then(() => {
            toast.success("Marketer deleted successfully");
            getMarketers();
          })
          .catch((err) => {
            if (err.status !== 403) {
              toast.error(err.message);
            }
          });
      }
    };
  };

  return (
    <main>
      <Header user={user} />

      <h1>Marketing Consultants</h1>

      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>Username</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {marketers.map((marketer) => {
            return (
              <tr key={marketer.marketing_consultant_id}>
                <td>
                  {marketer.firstname} {marketer.lastname}
                </td>
                <td>{marketer.email}</td>
                <td>{marketer.phonenumber}</td>
                <td>{marketer.username}</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button onClick={deleteMarketer(marketer.username)}>
                      delete
                    </Button>{" "}
                    <Link to={`/${marketer.marketing_consultant_id}`}>
                      view
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
};

export default withAuth(Dashboard);
