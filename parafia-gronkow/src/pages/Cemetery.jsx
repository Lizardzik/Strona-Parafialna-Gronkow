import "../styles/pages/Cemetery.css";

export default function Cemetery() {
  const cmentarzUrl = "https://mogily.pl/gronkow";

  const handleExternalLink = (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      "Opuszczasz stronę parafii. Zostaniesz przeniesiony na zewnętrzny serwis Mogiły.pl. Czy chcesz kontynuować?",
    );
    if (isConfirmed) {
      window.open(cmentarzUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="cemetery-page">
      <header className="page-header">
        <h1>Cmentarz Parafialny</h1>
      </header>

      <section className="cemetery-content">
        <div className="cemetery-info-card">
          <div className="card-header">
            <h2>Internetowa Baza Cmentarza</h2>
            <div className="badge">System Zewnętrzny</div>
          </div>

          <p className="intro-text">
            Nasz cmentarz został w pełni zinwentaryzowany w ogólnopolskim
            systemie <strong>Mogiły.pl</strong>. Przechodząc do portalu,
            zyskujesz dostęp do kompleksowych narzędzi ułatwiających
            odnalezienie grobu.
          </p>

          <div className="features-grid">
            <div className="feature-item">
              <h3>Wyszukiwarka zmarłych</h3>
              <p>Odnajdź dokładne miejsce spoczynku po nazwisku.</p>
            </div>
            <div className="feature-item">
              <h3>Interaktywny plan</h3>
              <p>Sprawdź układ sektorów i nawiguj po mapie cmentarza.</p>
            </div>
            <div className="feature-item">
              <h3>Pamięć i galeria</h3>
              <p>Obejrzyj zdjęcia nagrobków i zapal wirtualny znicz.</p>
            </div>
          </div>

          <div className="action-area">
            <a
              href={cmentarzUrl}
              onClick={handleExternalLink}
              className="cemetery-main-btn"
            >
              Otwórz portal Mogiły.pl <span>→</span>
            </a>
            <span className="action-note">Link otworzy się w nowej karcie</span>
          </div>
        </div>
      </section>
    </div>
  );
}
