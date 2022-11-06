const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/#">Logo</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Trang chủ <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/searchCustomer">Cho khách thuê xe</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/car">Quản lý xe</a>
                    </li>
                    {!localStorage.getItem("accessToken") ? (
                        <li className="nav-item">
                            <a className="nav-link" href="/login">Đăng nhập</a>
                        </li>
                    ) : (<div className="d-flex">
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => localStorage.clear()} href="/login">Đăng xuất</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/#">
                                    <i className="bi bi-person-circle"> {user.fullName}</i>
                                </a>
                            </li>
                        </div>
                    )}

                </ul>
            </div>
        </nav>
    )
}

export default Navbar