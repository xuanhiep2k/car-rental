import './navbar.css'
import React from "react";

const Navbar = () => {
    return (
        <div className="b-nav-divider">
            <div className="support">
                <i className="bi bi-telephone"></i>
                Hỗ trợ: 0858.03.04.00
            </div>
            <div className="notification">
                <i className="bi bi-bell-fill"></i>
                <i className="bi bi-calendar3-event-fill"></i>
            </div>
        </div>
    )
}

export default Navbar