import { Link } from 'react-router-dom';
import { useContext } from "react";
import AuthContext from "../contexts/authContext";

export default function Header(props) {

  const { isAuthenticated } = useContext(AuthContext);

  const username = localStorage.getItem('username');
  const user_img = localStorage.getItem('user_img');

    if (!isAuthenticated) {
      return null; // If the user is not authenticated, return null (nothing)
    }

    return (
        <header id="header" className="header fixed-top d-flex align-items-center">

            <div className="d-flex align-items-center justify-content-between">
              <a href="index.html" className="logo d-flex align-items-center">
                <img src="assets/img/logo.png" alt="" />
              </a>
              <i className="bi bi-list toggle-sidebar-btn" onClick={props.hsmenu}></i>
            </div>

           

            <nav className="header-nav ms-auto">
              <ul className="d-flex align-items-center">

                <li className="nav-item d-block d-lg-none">
                  <a className="nav-link nav-icon search-bar-toggle " href="#">
                    <i className="bi bi-search"></i>
                  </a>
                </li>

                <li className="nav-item dropdown">

                  <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                    <i className="bi bi-bell"></i>
                    <span className="badge bg-primary badge-number">4</span>
                  </a>

                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                    <li className="dropdown-header">
                      За днешния ден имате записани 4 прегледа 
                      <a href="#"><span className="p-2 badge rounded-pill bg-primary ms-2">Виж всички</span></a>
                    </li>
                    {/* <li>
                      <hr className="dropdown-divider" />
                    </li> */}

                    {/* <li className="notification-item">
                      <i className="bi bi-exclamation-circle text-warning"></i>
                      <div>
                        <h4>Lorem Ipsum</h4>
                        <p>Quae dolorem earum veritatis oditseno</p>
                        <p>30 min. ago</p>
                      </div>
                    </li> */}

                    {/* <li>
                      <hr className="dropdown-divider" />
                    </li> */}

                    {/* <li className="notification-item">
                      <i className="bi bi-x-circle text-danger"></i>
                      <div>
                        <h4>Atque rerum nesciunt</h4>
                        <p>Quae dolorem earum veritatis oditseno</p>
                        <p>1 hr. ago</p>
                      </div>
                    </li> */}

                    {/* <li>
                      <hr className="dropdown-divider" />
                    </li> */}

                    {/* <li className="notification-item">
                      <i className="bi bi-check-circle text-success"></i>
                      <div>
                        <h4>Sit rerum fuga</h4>
                        <p>Quae dolorem earum veritatis oditseno</p>
                        <p>2 hrs. ago</p>
                      </div>
                    </li> */}

                    {/* <li>
                      <hr className="dropdown-divider" />
                    </li>

                    <li className="notification-item">
                      <i className="bi bi-info-circle text-primary"></i>
                      <div>
                        <h4>Dicta reprehenderit</h4>
                        <p>Quae dolorem earum veritatis oditseno</p>
                        <p>4 hrs. ago</p>
                      </div>
                    </li>

                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li className="dropdown-footer">
                      <a href="#">Show all notifications</a>
                    </li> */}

                  </ul>

                </li>

                

                <li className="nav-item dropdown pe-3">

                  <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                    <img src={`assets/img/${user_img}`} alt="Profile" className="rounded-circle" />
                    <span className="d-none d-md-block dropdown-toggle ps-2">{username}</span>
                  </a>

                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                    <li className="dropdown-header">
                      <h6>{username}</h6>
                      <span>УНГ</span>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>


                    <li>
                      <Link to="/logout" className="dropdown-item d-flex align-items-center">
                        <i className="bi bi-box-arrow-right"></i>
                        <span>Изход</span>
                      </Link>
                    </li>

                  </ul>
                </li>

              </ul>
            </nav>

          </header>
    )
}