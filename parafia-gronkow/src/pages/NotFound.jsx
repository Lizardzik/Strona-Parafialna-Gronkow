import { Link } from "react-router-dom";
import "../styles/pages/NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Nie znaleziono strony</h2>
        <p>
          Przepraszamy, ale strona, której szukasz, nie istnieje lub została
          przeniesiona.
        </p>
        <Link to="/" className="back-home-btn">
          Wróć na stronę główną
        </Link>
      </div>
    </div>
  );
}
