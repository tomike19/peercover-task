import "./header.component.css";
import admin from '../../images/admin.jpg'

export const Header = (props) => {
  const { user } = props;

  return (
    <header>
      <div className="dashboard-navbar">
        <div className="Dashboard-navbar-section">
          <div className="Dashboard-navbar-logo">
            <i class="bi bi-list navigation-toggle"></i>
            <p>PEER COVER</p>
          </div>
          <div className="admin-profile">
            <i class="bi bi-bell-fill navigation-notification"></i>
            <div className="admin-details">
              <img src={admin} alt="admin" className="admin-image" />
                          <p>Hi,{user.firstname }</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
