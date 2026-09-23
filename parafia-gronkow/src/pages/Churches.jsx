import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pb } from "../lib/pocketbase";
import Loader from "../components/Loader";
import "../styles/pages/Churches.css";

export default function Churches() {
  const [churches, setChurches] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urlId = searchParams.get("id");

  useEffect(() => {
    async function fetchChurches() {
      setLoading(true);
      try {
        const records = await pb.collection("koscioly").getList(1, 10, {
          sort: "kolejnosc",
          requestKey: null,
        });

        const activeId = searchParams.get("id");
        const activeChurch = activeId
          ? records.items.find((c) => c.id === activeId)
          : records.items[0];

        if (activeChurch && activeChurch.Zdjecie) {
          const imgUrl = pb.files.getURL(activeChurch, activeChurch.Zdjecie, {
            thumb: "800x0",
          });
          await new Promise((resolve) => {
            const img = new Image();
            img.src = imgUrl;
            img.onload = resolve;
            img.onerror = resolve;
          });
        }

        setChurches(records.items);
      } catch (error) {
        console.error("Błąd podczas pobierania kościołów:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchChurches();
  }, [location.search]);

  const getImageUrl = (item, filename) => {
    if (!filename) return null;
    return pb.files.getURL(item, filename, { thumb: "800x0" });
  };

  if (loading) {
    return (
      <div className="churches-page">
        <Loader />
      </div>
    );
  }

  const activeChurch = urlId
    ? churches.find((c) => c.id === urlId)
    : churches[0];

  return (
    <div className="churches-page">
      {churches.length === 0 ? (
        <div className="no-data">Brak informacji o kościołach w bazie.</div>
      ) : activeChurch ? (
        <section className="church-section">
          <h2 className="main-church-title">{activeChurch.Nazwa}</h2>

          <div className="church-content-wrapper">
            <div className="church-image-float">
              {activeChurch.Zdjecie ? (
                <img
                  src={getImageUrl(activeChurch, activeChurch.Zdjecie)}
                  alt={activeChurch.Nazwa}
                  className="church-image"
                />
              ) : (
                <div className="placeholder-box">
                  <span>[ Brak zdjęć ]</span>
                </div>
              )}
            </div>

            <div
              className="church-html-content"
              dangerouslySetInnerHTML={{ __html: activeChurch.Opis }}
            />
          </div>
        </section>
      ) : (
        <div className="no-data">Nie znaleziono takiego kościoła.</div>
      )}
    </div>
  );
}
