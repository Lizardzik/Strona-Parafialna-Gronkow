import { useState, useEffect } from "react";
import { pb } from "../lib/pocketbase";
import { useLocation } from "react-router-dom";
import AnnouncementCard from "../components/AnnouncementCard";
import "../styles/pages/News.css";
import Loader from "../components/Loader";

export default function News() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const kategoria = searchParams.get("kategoria") || "duszpasterskie";

  useEffect(() => {
    async function fetchAnnouncements() {
      setLoading(true);
      try {
        const limitDate = new Date();
        limitDate.setDate(limitDate.getDate() - 90);
        const dateString =
          limitDate.toISOString().split("T")[0] + " 00:00:00.000Z";

        const filterQuery = `kategoria = "${kategoria}" && data_wydarzenia >= "${dateString}"`;

        const records = await pb.collection("ogloszenia").getList(1, 50, {
          sort: "-data_wydarzenia",
          filter: filterQuery,
          requestKey: null,
        });

        setAnnouncements(records.items);
        setExpandedId(null);
      } catch (error) {
        console.error("Błąd podczas pobierania ogłoszeń:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAnnouncements();
  }, [kategoria]);

  const pageTitle =
    kategoria === "intencje" ? "Intencje Mszalne" : "Ogłoszenia Duszpasterskie";

  return (
    <div className="news-page">
      <h1>{pageTitle}</h1>

      {loading ? (
        <Loader />
      ) : announcements.length === 0 ? (
        <div className="no-news">Brak wpisów w tej kategorii.</div>
      ) : (
        <>
          <section className="featured-announcement">
            <AnnouncementCard item={announcements[0]} isFeatured={true} />
          </section>

          {announcements.length > 1 && (
            <section className="older-announcements">
              <h3>Poprzednie wpisy</h3>
              {announcements.slice(1).map((item) => (
                <div key={item.id} className="older-announcement-wrapper">
                  <div
                    className={`collapsed-header ${expandedId === item.id ? "is-open" : ""}`}
                    onClick={() =>
                      setExpandedId(expandedId === item.id ? null : item.id)
                    }
                  >
                    <span className="news-date">
                      {item.data_wydarzenia
                        ? new Date(item.data_wydarzenia).toLocaleDateString()
                        : new Date(item.created).toLocaleDateString()}
                    </span>
                    <h4>{item.tytul}</h4>
                    <button className="expand-button">
                      {expandedId === item.id ? "Zwiń" : "Rozwiń"}
                    </button>
                  </div>

                  {expandedId === item.id && (
                    <div className="expanded-card-wrapper">
                      <AnnouncementCard item={item} />
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}
        </>
      )}
    </div>
  );
}
