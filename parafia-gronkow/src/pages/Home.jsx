import { useState, useEffect } from "react";
import { pb } from "../lib/pocketbase";
import "../styles/pages/Home.css";
import Loader from "../components/Loader";

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState([]);

  useEffect(() => {
    async function fetchLatestNews() {
      try {
        const records = await pb.collection("aktualnosci").getList(1, 5, {
          sort: "-created",
          requestKey: null,
        });

        const imagePromises = records.items
          .filter((item) => item.zdjecie)
          .map((item) => {
            return new Promise((resolve) => {
              const img = new Image();
              img.src = pb.files.getURL(item, item.zdjecie, { thumb: "800x0" });
              img.onload = resolve;
              img.onerror = resolve;
            });
          });

        await Promise.all(imagePromises);

        setNews(records.items);
        if (records.items.length > 0) {
          setExpandedIds([records.items[0].id]);
        }
      } catch (error) {
        console.error("Błąd pobierania aktualności:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLatestNews();
  }, []);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  return (
    <div className="home-page">
      <header className="hero-section">
        <div className="hero-content">
          <img
            src="/logoParafialne.png"
            alt="Logo Parafii Niepokalanego Serca NMP"
            className="hero-logo"
          />
          <div className="hero-text">
            <h1>
              Parafia Rzymskokatolicka
              <br />
              Niepokalanego Serca NMP
            </h1>
            <p className="hero-subtitle">w Gronkowie</p>
          </div>
        </div>
      </header>

      <section className="home-news-section">
        <div className="section-header">
          <h2>Aktualności z życia parafii</h2>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="home-news-list">
            {news.map((item) => {
              const isExpanded = expandedIds.includes(item.id);

              return (
                <article key={item.id} className="home-news-card">
                  <div className="news-image-wrapper">
                    <img
                      src={
                        item.zdjecie
                          ? pb.files.getURL(item, item.zdjecie, {
                              thumb: "800x0",
                            })
                          : "/ogloszenia_default.png"
                      }
                      alt={item.tytul}
                    />
                  </div>

                  <div className="news-content">
                    <span className="news-date">
                      {new Date(item.created).toLocaleDateString("pl-PL")}
                    </span>
                    <h3>{item.tytul}</h3>

                    <div
                      className={isExpanded ? "news-full-text" : "news-excerpt"}
                      dangerouslySetInnerHTML={{ __html: item.tresc }}
                    />

                    <button
                      className="read-more-btn"
                      onClick={() => toggleExpand(item.id)}
                    >
                      {isExpanded ? "Zwiń" : "Czytaj dalej"}
                    </button>
                  </div>
                </article>
              );
            })}

            {news.length === 0 && (
              <p className="no-news">Brak nowych ogłoszeń.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
