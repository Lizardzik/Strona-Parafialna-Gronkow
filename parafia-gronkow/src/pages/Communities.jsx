import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { pb } from "../lib/pocketbase";
import Loader from "../components/Loader";
import "../styles/pages/Communities.css";

export default function Communities() {
  const { slug } = useParams();
  const [community, setCommunity] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedSlug, setLoadedSlug] = useState(null);
  const [expandedGroup, setExpandedGroup] = useState("lektorzy");

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setLoading(true);
      try {
        const records = await pb.collection("wspolnoty").getList(1, 1, {
          filter: `slug = "${slug}"`,
        });

        if (records.items.length > 0) {
          const currentGroup = records.items[0];

          const membersRecords = await pb.collection("czlonkowie").getFullList({
            filter: `grupa = "${currentGroup.id}"`,
            sort: "nazwisko,imie",
          });

          if (currentGroup.Zdjecie) {
            const fileName = Array.isArray(currentGroup.Zdjecie)
              ? currentGroup.Zdjecie[0]
              : currentGroup.Zdjecie;
            const imgUrl = pb.files.getURL(currentGroup, fileName, {
              thumb: "800x0",
            });
            await new Promise((resolve) => {
              const img = new Image();
              img.src = imgUrl;
              img.onload = resolve;
              img.onerror = resolve;
            });
          }

          if (isMounted) {
            setCommunity(currentGroup);
            setMembers(membersRecords);
            // Resetujemy otwartą zakładkę do lektorów przy zmianie wspólnoty
            setExpandedGroup("lektorzy");
          }
        } else {
          if (isMounted) {
            setCommunity(null);
            setMembers([]);
          }
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
          setLoadedSlug(slug);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const getImageUrl = (item) => {
    if (!item.Zdjecie) return null;
    const fileName = Array.isArray(item.Zdjecie)
      ? item.Zdjecie[0]
      : item.Zdjecie;
    return pb.files.getURL(item, fileName, { thumb: "800x0" });
  };

  if (loading || loadedSlug !== slug) return <Loader />;

  if (!community) {
    return (
      <div className="no-data">
        Nie znaleziono takiej grupy w naszej parafii.
      </div>
    );
  }

  const lektorzy = members.filter((m) =>
    `${m.imie} ${m.nazwisko}`.toLowerCase().includes("lektor"),
  );
  const ministranci = members.filter((m) =>
    `${m.imie} ${m.nazwisko}`.toLowerCase().includes("ministrant"),
  );
  const kandydaci = members.filter((m) =>
    `${m.imie} ${m.nazwisko}`.toLowerCase().includes("kandydat"),
  );
  const inni = members.filter((m) => {
    const name = `${m.imie} ${m.nazwisko}`.toLowerCase();
    return (
      !name.includes("lektor") &&
      !name.includes("ministrant") &&
      !name.includes("kandydat")
    );
  });

  const groupedMembers = [
    { id: "lektorzy", title: "Lektorzy", data: lektorzy },
    { id: "ministranci", title: "Ministranci", data: ministranci },
    { id: "kandydaci", title: "Kandydaci", data: kandydaci },
    { id: "inni", title: "Pozostali", data: inni },
  ].filter((g) => g.data.length > 0);

  const hasRoles =
    groupedMembers.length > 1 ||
    lektorzy.length > 0 ||
    ministranci.length > 0 ||
    kandydaci.length > 0;

  return (
    <div className="community-page">
      <div className="community-header">
        <h2>{community.nazwa}</h2>
        {members.length > 0 && (
          <span className="member-count-badge">
            Liczba osób: {members.length}
          </span>
        )}
      </div>

      <div className="community-content">
        {getImageUrl(community) && (
          <div className="community-image-container">
            <img
              src={getImageUrl(community)}
              alt={community.nazwa}
              className="community-image"
            />
          </div>
        )}
        <div
          className="community-text"
          dangerouslySetInnerHTML={{ __html: community.opis }}
        />
      </div>

      {members.length > 0 && (
        <div className="members-section">
          <h3>Członkowie wspólnoty</h3>

          {hasRoles ? (
            <div className="members-accordion">
              {groupedMembers.map((group) => (
                <div key={group.id} className="member-group-section">
                  <div
                    className="member-simple-header"
                    onClick={() =>
                      setExpandedGroup(
                        expandedGroup === group.id ? null : group.id,
                      )
                    }
                  >
                    {group.title} {expandedGroup === group.id ? "↓" : "→"}
                  </div>
                  {expandedGroup === group.id && (
                    <ul className="members-list expanded-list">
                      {group.data.map((member) => {
                        const cleanName = `${member.imie} ${member.nazwisko}`
                          .replace(/\blektor\b/gi, "")
                          .replace(/\bministrant\b/gi, "")
                          .replace(/\bkandydat\b/gi, "")
                          .trim();

                        return <li key={member.id}>{cleanName}</li>;
                      })}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <ul className="members-list">
              {members.map((member) => (
                <li key={member.id}>
                  {member.imie} {member.nazwisko}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
