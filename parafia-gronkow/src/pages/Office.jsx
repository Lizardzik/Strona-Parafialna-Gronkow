import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { pb } from "../lib/pocketbase";
import Loader from "../components/Loader";
import "../styles/pages/Office.css";

export default function Office() {
  const [sacraments, setSacraments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    async function fetchSacraments() {
      try {
        const records = await pb.collection("sakramenty").getList(1, 10, {
          sort: "kolejnosc",
          requestKey: null,
        });
        setSacraments(records.items);
      } catch (error) {
        console.error("Błąd pobierania sakramentów:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSacraments();
  }, []);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="office-page">
      <header className="page-header">
        <h1>Kancelaria Parafialna</h1>
      </header>

      <section className="office-info-section">
        <div className="office-card">
          <h2>Godziny urzędowania</h2>
          <div className="hours-grid">
            <div className="hours-row">
              <span className="day">Dni powszednie (Pon. - Sob.):</span>
              <span className="time">Bezpośrednio po Mszy Świętej</span>
            </div>
            <div className="hours-row closed">
              <span className="day">Niedziele i Święta:</span>
              <span className="time">Nieczynne</span>
            </div>
          </div>
          <p className="office-note">
            W sprawach pilnych prosimy o przesłanie wiadomości e-mail. Adres
            oraz formularz znajdziesz w zakładce{" "}
            <Link to="/kontakt">Kontakt</Link>.
          </p>
        </div>
      </section>

      <section className="sacraments-section">
        <h2>Sakramenty i formalności</h2>
        <p className="sacraments-intro">
          Wybierz sakrament z listy poniżej, aby sprawdzić wymagane dokumenty i
          procedury.
        </p>

        {loading ? (
          <Loader />
        ) : (
          <div className="accordion-container">
            {sacraments.map((item) => (
              <div
                key={item.id}
                className={`accordion-item ${openId === item.id ? "open" : ""}`}
              >
                <button
                  className="accordion-header"
                  onClick={() => toggleAccordion(item.id)}
                >
                  {item.nazwa}
                  <span className="accordion-icon">
                    {openId === item.id ? "-" : "+"}
                  </span>
                </button>

                <div className="accordion-body">
                  <div className="accordion-content">
                    <div
                      className="rich-text"
                      dangerouslySetInnerHTML={{ __html: item.wymagania }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
