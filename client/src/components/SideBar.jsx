import { NavLink } from 'react-router-dom';
import {useState} from 'react';

export default function SideBar() {
    
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleToggleCollapse = () => {
      
      setIsCollapsed(!isCollapsed);
    };

    const handleCloseCollapse = () => {
      setIsCollapsed(true);
    };

    return (
        <aside id="sidebar" className="sidebar">

            <ul className="sidebar-nav" id="sidebar-nav">

              <li className="nav-item">
                <NavLink to="/" className="nav-link collapsed" onClick={handleCloseCollapse }>
                    <i className="bi bi-grid"></i>
                    <span>Начало</span>
                </NavLink>
              </li>

            

              {/* <li className="nav-heading">Pages</li> */}

              <li className="nav-item">
                <NavLink to="/patients" className="nav-link collapsed" onClick={handleCloseCollapse}>
                    <i className="bi bi-person"></i>
                    <span>Пациенти</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/doctors" className="nav-link collapsed" onClick={handleCloseCollapse }>
                  <i className="bi bi-plus-circle"></i>
                  <span>Лекари</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/alists" className="nav-link collapsed" onClick={handleCloseCollapse }>
                  <i className="bi bi-clipboard2-pulse"></i>
                  <span>Амбулаторен лист</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/recipes" className="nav-link collapsed" onClick={handleCloseCollapse }> 
                  <i className="bi bi-capsule"></i>
                  <span>Рецепта</span>
                </NavLink>
              </li>

              <li className="nav-heading">------------------------------------------</li>

              <li className="nav-item">
                <NavLink to="/shedule" className="nav-link collapsed" onClick={handleCloseCollapse }> 
                  <i className="bi bi-clock"></i>
                  <span>Запази час</span>
                </NavLink>
              </li>

              <li className="nav-heading">------------------------------------------</li>

              {/* <li className="nav-item">
                <a className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
                  <i className="bi bi-layout-text-window-reverse"></i><span>Настройки</span><i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                  <li>
                    <NavLink to="/mkb" className="nav-link collapsed">
                      <i className="bi bi-circle"></i><span>Списък МКБ</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/medicaments" className="nav-link collapsed">
                      <i className="bi bi-circle"></i><span>Списък лекарства</span>
                    </NavLink>
                  </li>
                </ul>
              </li> */}

              <li className="nav-item">
                <a
                  className={`nav-link ${isCollapsed ? 'collapsed' : ''}`}
                  data-bs-target="#tables-nav"
                  data-bs-toggle="collapse"
                  href="#"
                  onClick={handleToggleCollapse}
                >
                  <i className="bi bi-gear"></i>
                  <span>Настройки</span>
                  <i className={`bi bi-chevron-down ms-auto ${isCollapsed ? 'collapsed' : ''}`}></i>
                </a>
                <ul
                  id="tables-nav"
                  className={`nav-content collapse ${isCollapsed ? '' : 'show'}`}
                  data-bs-parent="#sidebar-nav"
                >
                  <li>
                    <NavLink to="/mkb" className="nav-link collapsed">
                      <i className="bi bi-circle"></i>
                      <span>Списък МКБ</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/medicaments" className="nav-link collapsed">
                      <i className="bi bi-circle"></i>
                      <span>Списък лекарства</span>
                    </NavLink>
                  </li>
                </ul>
              </li>

              

            </ul>

          </aside>
    )
}