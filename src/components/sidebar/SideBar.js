import './sidebar.css'
import React, {useState} from 'react';
import * as sidebar from '../../redux/constants/sidebarConstant'
import {Link} from "react-router-dom";

function SideBar() {
    const [active, setActive] = useState("bi bi-house-door");
    const toogle = (icon) => {
        setActive(icon)
    }
    return (
        <main className="d-flex flex-nowrap">

            <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{width: "280px"}}>
                <a href="/"
                   className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <i className="bi bi-bootstrap"></i>
                    <span className="fs-4">Sidebar</span>
                </a>
                <hr/>
                <ul className="nav nav-pills flex-column mb-auto">
                    {Array.of(sidebar).map(item => (
                        item.map(i => (
                            <li key={i.icon} className="nav-item">
                                <Link to={i.link} onClick={() => toogle(i.icon)}
                                      className={"nav-link" + (i.icon === active ? " active" : " link-dark")}>
                                    <i className={i.icon}></i>
                                    {i.name}
                                </Link>
                            </li>
                        ))
                    ))}
                </ul>
                <hr/>
                <div className="dropdown">
                    <a href="/#"
                       className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="" width="32" height="32"
                             className="rounded-circle me-2"/>
                        <strong>{JSON.parse(localStorage.getItem("user")).fullName}</strong>
                    </a>
                    <ul className="dropdown-menu text-small shadow">
                        <li><a className="dropdown-item" href="/#">Cài đặt</a></li>
                        <li><a className="dropdown-item" href="/#">Trang cá nhân</a></li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li><a className="dropdown-item" onClick={() => localStorage.clear()} href="/login">Đăng
                            xuất</a></li>
                    </ul>
                </div>
            </div>
            <div className="b-example-divider b-example-vr"></div>
        </main>
    );
}

export default SideBar;