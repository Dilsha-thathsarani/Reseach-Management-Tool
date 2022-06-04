import React from "react";

export default function Header() {

  const logout=async ()=>{

    localStorage.clear()
    window.location.href = "/login";
  }

  return (
    <div>
      <header>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-black">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#navbarExample01"
              aria-controls="navbarExample01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars" />
            </button>
            <div className="collapse navbar-collapse" id="navbarExample01">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item active">
                  <a className="nav-link" aria-current="page" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/profile">
                    Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    About
                  </a>
                </li>

                <li className="nav-item">
                  <a onClick={logout} style={{marginLeft:"1600%"}} className="nav-link" href="#">
                    Logout
                  </a>
                </li>

                {/* <li className="nav-item">
                  <a className="nav-link" href="#">
                    About
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>
        {/* Navbar */}
        {/* Jumbotron */}
        {/* <div className="p-5 text-center bg-light">
          <h1 className="mb-3">Heading</h1>
          <h4 className="mb-3">Subheading</h4>
          <a className="btn btn-primary" href="" role="button">
            Call to action
          </a>
        </div> */}
        {/* Jumbotron */}
      </header>
    </div>
  );
}
