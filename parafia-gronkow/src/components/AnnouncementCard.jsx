import "../styles/pages/News.css";

export default function AnnouncementCard({ item, isFeatured }) {
  const date = item.data_wydarzenia
    ? new Date(item.data_wydarzenia).toLocaleDateString("pl-PL")
    : new Date(item.created).toLocaleDateString("pl-PL");

  return (
    <article className={`announcement-card ${isFeatured ? "featured" : ""}`}>
      {isFeatured && <div className="active-badge">Najnowsze</div>}

      <div className="news-content">
        <div className="news-header-inline">
          <h3 className="news-title">{item.tytul}</h3>
          <span className="news-date">{date}</span>
        </div>

        <div
          className="news-text"
          dangerouslySetInnerHTML={{ __html: item.tresc }}
        />
      </div>
    </article>
  );
}
