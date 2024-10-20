const { Link, NavLink } = ReactRouterDOM;

export function AppHeader() {

    return (
    <header className="app-header">
        <Link to="/">
        <div className="logo-img">
          <img src="logo.imgs/logo.png" alt="" />
        </div>
        {/* <img className="hamburger-btn" src="./assets/img/hamburger-btn.svg" alt="" /> */}
        </Link>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/notes">Notes</NavLink>
        </nav>
    </header>
  );
}
