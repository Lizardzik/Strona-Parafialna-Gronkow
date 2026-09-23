import { useState, useEffect } from "react";
import { pb } from "../lib/pocketbase";
import Loader from "../components/Loader";
import "../styles/pages/Gallery.css";

export default function Gallery() {
  const [groupedImages, setGroupedImages] = useState({});
  const [years, setYears] = useState([]);
  const [expandedYear, setExpandedYear] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const records = await pb.collection("galeria").getList(1, 100, {
          sort: "-created",
          requestKey: null,
        });

        const groups = {};
        records.items.forEach((record) => {
          if (record.zdjecia) {
            const year = new Date(record.created).getFullYear().toString();
            if (!groups[year]) groups[year] = [];
            const photos = Array.isArray(record.zdjecia)
              ? record.zdjecia
              : [record.zdjecia];

            photos.forEach((photoUrl) => {
              groups[year].push({
                id: `${record.id}-${photoUrl}`,
                thumbUrl: pb.files.getURL(record, photoUrl, { thumb: "800x0" }),
                fullUrl: pb.files.getURL(record, photoUrl),
                opis: record.opis,
              });
            });
          }
        });

        const sortedYears = Object.keys(groups).sort((a, b) => b - a);

        if (sortedYears.length > 0) {
          const firstYear = sortedYears[0];
          const firstYearPromises = groups[firstYear].map((img) => {
            return new Promise((resolve) => {
              const image = new Image();
              image.src = img.thumbUrl;
              image.onload = resolve;
              image.onerror = resolve;
            });
          });

          await Promise.all(firstYearPromises);
          setExpandedYear(firstYear);
        }

        setGroupedImages(groups);
        setYears(sortedYears);
      } catch (error) {
        console.error("Błąd pobierania galerii:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="gallery-page">
      <h2>Galeria Parafialna</h2>
      <div className="years-accordion">
        {years.map((year) => (
          <div key={year} className="year-section">
            <div
              className="year-simple-header"
              onClick={() =>
                setExpandedYear(expandedYear === year ? null : year)
              }
            >
              {year} {expandedYear === year ? "↓" : "→"}
            </div>
            {expandedYear === year && (
              <div className="gallery-flex-container">
                {groupedImages[year].map((img) => (
                  <div
                    key={img.id}
                    className="gallery-item"
                    onClick={() => setSelectedImage(img)}
                  >
                    <img
                      src={img.thumbUrl}
                      alt={img.opis || "Zdjęcie parafialne"}
                      loading="lazy"
                    />
                    {img.opis && (
                      <div className="gallery-overlay">
                        <p>{img.opis}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="lightbox-backdrop"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <img
              src={selectedImage.fullUrl}
              alt={selectedImage.opis || "Powiększone"}
            />
            {selectedImage.opis && (
              <p className="lightbox-caption">{selectedImage.opis}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
