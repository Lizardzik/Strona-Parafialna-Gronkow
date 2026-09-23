import { Link } from "react-router-dom";
import "../styles/components/Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-info">
          <h3>Parafia Niepokalanego Serca NMP</h3>
          <p>Gronków 222 A, 34-400 Nowy Targ</p>
        </div>

        <div className="footer-links">
          <Link to="/standardy-ochrony-maloletnich" className="legal-link">
            Standardy Ochrony Małoletnich
          </Link>
          <Link to="/kontakt" className="legal-link">
            Kontakt z parafią
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Parafia Gronków. Wszelkie prawa
          zastrzeżone.
        </p>
        <p className="creator-link">
          Wykonanie:{" "}
          <a
            href="https://github.com/Lizardzik"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rafał Jasiura
          </a>
        </p>
      </div>
    </footer>
  );
}
