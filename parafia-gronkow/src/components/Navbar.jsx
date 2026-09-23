import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { pb } from "../lib/pocketbase";
import "../styles/components/Navbar.css";

export default function Navbar({ currentFontSize, onChangeFontSize }) {
  const [communities, setCommunities] = useState([]);
  const [churches, setChurches] = useState([]);
  const [desktopDropdown, setDesktopDropdown] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [showTopBar, setShowTopBar] = useState(() => {
    const isClosed = localStorage.getItem("topBarClosed");
    return isClosed !== "true";
  });

  useEffect(() => {
    async function fetchNavData() {
      try {
        const [commRes, churchRes] = await Promise.all([
          pb.collection("wspolnoty").getList(1, 10, {
            sort: "kolejnosc",
            requestKey: null,
          }),
          pb.collection("koscioly").getList(1, 10, {
            sort: "kolejnosc",
            requestKey: null,
          }),
        ]);
        setCommunities(commRes.items);
        setChurches(churchRes.items);
      } catch (error) {
        console.error("Błąd pobierania danych do nawigacji:", error);
      }
    }
    fetchNavData();
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    setDesktopDropdown(null);
  };

  const handleCloseTopBar = () => {
    setShowTopBar(false);
    localStorage.setItem("topBarClosed", "true");
  };

  const toggleMobileDropdown = (dropdownName, e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const isOpening = desktopDropdown !== dropdownName;
      setDesktopDropdown(isOpening ? dropdownName : null);

      if (isOpening) {
        setTimeout(() => {
          e.target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  };

  return (
    <header className="site-header">
      {showTopBar && (
        <div className="top-bar">
          <div className="top-bar-container">
            <div className="top-bar-contact">
              <span>Parafia Rzymskokatolicka w Gronkowie</span>
            </div>
            <div className="top-bar-actions">
              <span className="font-label">Wielkość tekstu:</span>
              <div className="navbar-font-buttons">
                <button
                  className={
                    currentFontSize === "font-size-normal" ? "active" : ""
                  }
                  onClick={() => onChangeFontSize("font-size-normal")}
                >
                  A
                </button>
                <button
                  className={
                    currentFontSize === "font-size-large" ? "active" : ""
                  }
                  onClick={() => onChangeFontSize("font-size-large")}
                >
                  AA
                </button>
                <button
                  className={
                    currentFontSize === "font-size-xlarge" ? "active" : ""
                  }
                  onClick={() => onChangeFontSize("font-size-xlarge")}
                >
                  AAA
                </button>
              </div>

              <button
                className="top-bar-close-btn"
                onClick={handleCloseTopBar}
                title="Zamknij pasek narzędziowy"
                aria-label="Zamknij pasek narzędziowy"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className={`main-nav ${currentFontSize}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo" onClick={closeMenu}>
            Parafia Gronków
          </Link>

          <button
            className={`nav-toggle ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-links ${isOpen ? "open" : ""}`}>
            <li>
              <NavLink to="/" onClick={closeMenu}>
                Strona główna
              </NavLink>
            </li>

            <li>
              <NavLink to="/msze" onClick={closeMenu}>
                Msze św.
              </NavLink>
            </li>

            <li
              className="dropdown"
              onMouseEnter={() =>
                window.innerWidth > 768 && setDesktopDropdown("aktualnosci")
              }
              onMouseLeave={() =>
                window.innerWidth > 768 && setDesktopDropdown(null)
              }
            >
              <span
                className="dropdown-title"
                onClick={(e) => toggleMobileDropdown("aktualnosci", e)}
              >
                Aktualności{" "}
                <span className="arrow">
                  {desktopDropdown === "aktualnosci" && window.innerWidth <= 768
                    ? "▴"
                    : "▾"}
                </span>
              </span>
              {desktopDropdown === "aktualnosci" && (
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      to="/aktualnosci?kategoria=duszpasterskie"
                      onClick={closeMenu}
                    >
                      Ogłoszenia duszpasterskie
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/aktualnosci?kategoria=intencje"
                      onClick={closeMenu}
                    >
                      Intencje mszalne
                    </Link>
                  </li>
                  <li>
                    <Link to="/galeria" onClick={closeMenu}>
                      Galeria zdjęć
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li
              className="dropdown"
              onMouseEnter={() =>
                window.innerWidth > 768 && setDesktopDropdown("parafia")
              }
              onMouseLeave={() =>
                window.innerWidth > 768 && setDesktopDropdown(null)
              }
            >
              <span
                className="dropdown-title"
                onClick={(e) => toggleMobileDropdown("parafia", e)}
              >
                O parafii{" "}
                <span className="arrow">
                  {desktopDropdown === "parafia" && window.innerWidth <= 768
                    ? "▴"
                    : "▾"}
                </span>
              </span>
              {desktopDropdown === "parafia" && (
                <ul className="dropdown-menu">
                  <li className="dropdown-header">Kościoły</li>
                  {churches.map((church) => (
                    <li key={church.id}>
                      <Link
                        to={`/koscioly?id=${church.id}`}
                        onClick={closeMenu}
                        className="sub-link"
                      >
                        {church.Nazwa}
                      </Link>
                    </li>
                  ))}

                  <li className="dropdown-divider"></li>
                  <li className="dropdown-header">Wspólnoty</li>
                  {communities.map((community) => (
                    <li key={community.id}>
                      <Link
                        to={`/wspolnoty/${community.slug}`}
                        onClick={closeMenu}
                        className="sub-link"
                      >
                        {community.nazwa}
                      </Link>
                    </li>
                  ))}

                  <li className="dropdown-divider"></li>
                  <li>
                    <Link to="/cmentarz" onClick={closeMenu}>
                      Cmentarz parafialny
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <NavLink to="/kancelaria" onClick={closeMenu}>
                Kancelaria
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/kontakt"
                onClick={closeMenu}
                className="nav-contact-btn"
              >
                Kontakt
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
