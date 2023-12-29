import { useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {

    const [showAccount, setShowAccount] = useState(false);
    const handleAccountClick = () => {
        setShowAccount(!showAccount);
    }

    return (  
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
            <div className="container-fluid">
                <Link to={"/"} className="navbar-brand">Home</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link to={`/admin`} className="nav-link active" aria-current="page">Admin</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`/all-rooms`} className="nav-link active" aria-current="page">Views</Link>
                    </li>
                    
                    <li className="nav-item dropdown">
                        <a className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`} onClick={handleAccountClick} href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Account
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link to={"/user/login"} className="dropdown-item" href="#">Login</Link></li>
                            <li><Link to={"/user/profile"} className="dropdown-item" href="#">Profile</Link></li>
                            <li><Link to={"/user/logout"} className="dropdown-item" href="#">Logout</Link></li>
                        </ul>
                    </li>
                </ul>
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                </div>
            </div>
            </nav>
        </>
    );
}

export default NavBar;