import React from "react";
import { useLocation, Link } from "react-router-dom";
import Logo from "../../images/logo.svg";

export default function Header({ onSignOut }) {
  const [userEmail, setUserEmail] = React.useState("");

  const location = useLocation();

  React.useEffect(() => {
    const currentUserEmail = localStorage.getItem("email");
    currentUserEmail ? setUserEmail(currentUserEmail) : setUserEmail("");
  });

  return (
    <>
      <header className="header container">
        <div className="header__container">
          <img src={Logo} alt="Логотип" className="header__logo" />
          {location.pathname === "/signin" && (
            <Link to="signup" className="header__link">
              Регистрация
            </Link>
          )}
          {location.pathname === "/signup" && (
            <Link to="signin" className="header__link">
              Войти
            </Link>
          )}
          {location.pathname === "/" && (
            <>
              <nav className="header__auth-navigation">
                <p className="header__user-email">{userEmail}</p>
                <button className="header__quit-button" onClick={onSignOut}>
                  Выйти
                </button>
              </nav>
            </>
          )}
        </div>
      </header>
    </>
  );
}
