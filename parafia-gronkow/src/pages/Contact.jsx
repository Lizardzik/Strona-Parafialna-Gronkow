import { useState, useEffect } from "react";
import { pb } from "../lib/pocketbase";
import emailjs from "@emailjs/browser";
import Loader from "../components/Loader";
import "../styles/pages/Contact.css";

export default function Contact() {
  const MAX_CHARS = 1000;
  const [formData, setFormData] = useState({
    imie: "",
    email: "",
    tresc: "",
  });
  const [status, setStatus] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [pracownicy, setPracownicy] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lastSend = localStorage.getItem("last_message_time");
    if (lastSend) {
      const hoursPassed = (Date.now() - parseInt(lastSend)) / (1000 * 60 * 60);
      if (hoursPassed < 24) {
        setIsLocked(true);
        setStatus(
          "Możesz wysłać tylko jedną wiadomość dziennie. Spróbuj ponownie jutro.",
        );
      }
    }
  }, []);

  useEffect(() => {
    async function fetchPracownicy() {
      setLoading(true);
      try {
        const records = await pb.collection("pracownicy").getFullList({
          sort: "kolejnosc",
          requestKey: null,
        });

        const imagePromises = records
          .filter((osoba) => osoba.zdjecie)
          .map((osoba) => {
            return new Promise((resolve) => {
              const img = new Image();
              img.src = pb.files.getURL(osoba, osoba.zdjecie, {
                thumb: "400x0",
              });
              img.onload = resolve;
              img.onerror = resolve;
            });
          });

        await Promise.all(imagePromises);
        setPracownicy(records);
      } catch (error) {
        console.error("Błąd pobierania bazy pracowników:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPracownicy();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tresc" && value.length > MAX_CHARS) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLocked) return;

    setStatus("Wysyłanie...");

    try {
      await pb.collection("wiadomosci").create(formData);

      await emailjs.send(
        "service_heqpu4w",
        "template_2qdztkp",
        {
          imie: formData.imie,
          email: formData.email,
          tresc: formData.tresc,
        },
        "GD03vNlKRlpKgxFkp",
      );

      localStorage.setItem("last_message_time", Date.now().toString());
      setIsLocked(true);
      setStatus(
        "Wiadomość została pomyślnie wysłana. Kolejna będzie możliwa jutro.",
      );
      setFormData({ imie: "", email: "", tresc: "" });
    } catch (error) {
      console.error("Błąd wysyłania:", error);
      if (
        error?.status === 412 ||
        (error?.text && error.text.includes("limit"))
      ) {
        setStatus(
          "Wysłanie maila nie powiodło się (przekroczono limit serwera). Twoja wiadomość została jednak zapisana w naszej bazie. Odpowiemy wkrótce!",
        );
      } else {
        setStatus("Wystąpił błąd podczas wysyłania e-maila.");
      }
    }
  };

  const slowaKluczowe = [
    "proboszcz",
    "wikariusz",
    "ksiądz",
    "ksiadz",
    "rezydent",
    "duszpasterz",
    "kapelan",
  ];

  const duszpasterze = pracownicy.filter((osoba) =>
    slowaKluczowe.some((slowo) => osoba.rola.toLowerCase().includes(slowo)),
  );

  const swieccy = pracownicy.filter(
    (osoba) =>
      !slowaKluczowe.some((slowo) => osoba.rola.toLowerCase().includes(slowo)),
  );

  if (loading) {
    return (
      <div className="contact-page">
        <Loader />
      </div>
    );
  }

  return (
    <div className="contact-page">
      <h2>Kontakt</h2>

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-block">
            <p>
              <strong>Parafia Rzymskokatolicka Niepokalanego Serca NMP</strong>
            </p>
            <p>Gronków 222a</p>
            <p>34-400 Nowy Targ</p>
          </div>

          <div className="info-block">
            <p>
              <strong>Telefon:</strong> 18 265 61 50
            </p>
            <p>
              <strong>E-mail:</strong> gronkow-parafia@wp.pl
            </p>
          </div>

          <div className="info-block">
            <p>
              <strong>Konto bankowe parafii:</strong>
              <br />
              Bank Spółdzielczy Nowy Targ
            </p>
            <p className="bank-account">84 8812 0005 0000 0000 2600 0001</p>

            <div style={{ marginTop: "1.5rem" }}>
              <p style={{ marginBottom: "0.5rem" }}>
                <strong>Przelewy z zagranicy:</strong>
              </p>
              <p>
                Kod SWIFT / BIC: <span className="bank-code">POLUPLPR</span>
              </p>
              <p style={{ marginTop: "0.8rem" }}>
                Numer IBAN:
                <br />
                <span className="bank-account" style={{ marginTop: "0.5rem" }}>
                  PL 84 8812 0005 0000 0000 2600 0001
                </span>
              </p>
            </div>
          </div>
        </div>

        <hr className="contact-divider" />

        <div className="staff-section">
          <h3>Duszpasterze</h3>
          <div className="staff-grid">
            {duszpasterze.map((osoba) => (
              <div key={osoba.id} className="staff-card card-priest">
                <img
                  src={
                    osoba.zdjecie
                      ? pb.files.getURL(osoba, osoba.zdjecie, {
                          thumb: "400x0",
                        })
                      : "/default-avatar.png"
                  }
                  alt={osoba.imie_nazwisko}
                  className="staff-photo"
                />
                <div className="staff-details">
                  <span className="staff-role">{osoba.rola}</span>
                  <span className="staff-name">{osoba.imie_nazwisko}</span>
                </div>
              </div>
            ))}
          </div>

          {swieccy.length > 0 && (
            <>
              <h3 style={{ marginTop: "3rem" }}>Pracownicy parafii</h3>
              <div className="staff-grid">
                {swieccy.map((osoba) => (
                  <div key={osoba.id} className="staff-card card-worker">
                    <div className="staff-details">
                      <span className="staff-role">{osoba.rola}</span>
                      <span className="staff-name">{osoba.imie_nazwisko}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <hr className="contact-divider" />

        <div className="contact-form-wrapper">
          <h3>Napisz wiadomość do parafii</h3>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="textarea-wrapper">
              <textarea
                name="tresc"
                placeholder="Twoja wiadomość"
                required
                value={formData.tresc}
                onChange={handleChange}
                rows="6"
              ></textarea>
              <div
                className={`char-counter ${formData.tresc.length >= MAX_CHARS ? "limit" : ""}`}
              >
                Pozostało znaków: {MAX_CHARS - formData.tresc.length}
              </div>
            </div>

            <input
              type="text"
              name="imie"
              placeholder="Imię i nazwisko / Nazwa *"
              required
              value={formData.imie}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Twój adres e-mail *"
              required
              value={formData.email}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="submit-btn"
              disabled={isLocked || formData.tresc.length === 0}
            >
              {isLocked ? "WYSYŁANIE ZABLOKOWANE" : "WYŚLIJ WIADOMOŚĆ"}
            </button>

            {status && <p className="form-status">{status}</p>}
          </form>
        </div>
      </div>

      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2594.3369696419786!2d20.0840635770827!3d49.44034787141695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4715faed7794969f%3A0xda7c0c4b9fc47049!2sKo%C5%9Bci%C3%B3%C5%82%20Niepokalanego%20Serca%20NMP%20w%20Gronkowie!5e0!3m2!1spl!2spl!4v1776245932243!5m2!1spl!2spl"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa dojazdu do kościoła w Gronkowie"
        ></iframe>
      </div>
    </div>
  );
}
