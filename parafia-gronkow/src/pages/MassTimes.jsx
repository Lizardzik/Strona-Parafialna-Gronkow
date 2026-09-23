import { useState, useEffect } from "react";
import "../styles/pages/MassTimes.css";

export default function MassTimes() {
  const [activeTab, setActiveTab] = useState("summer");
  const [currentSeason, setCurrentSeason] = useState("summer");

  const currentDay = new Date().getDay();
  const currentMonth = new Date().getMonth();

  useEffect(() => {
    const isCurrentlySummer = currentMonth >= 3 && currentMonth <= 8;

    const season = isCurrentlySummer ? "summer" : "winter";
    setCurrentSeason(season);
    setActiveTab(season);
  }, [currentMonth]);

  const renderMassList = (isSummerCard) => {
    let monFriHour = "7:00";

    if (isSummerCard) {
      monFriHour = currentMonth === 4 || currentMonth === 5 ? "18:00" : "7:00";
    } else {
      monFriHour = currentMonth === 9 ? "17:00" : "7:00";
    }

    return (
      <ul className="mass-list">
        <li className={currentDay === 1 ? "today" : ""}>
          <span>Poniedziałek</span> <strong>{monFriHour}</strong>
        </li>
        <li className={currentDay === 2 ? "today" : ""}>
          <span>Wtorek</span>{" "}
          <strong>{isSummerCard ? "18:00" : "17:00"}</strong>
        </li>
        <li className={currentDay === 3 ? "today" : ""}>
          <span>Środa</span> <strong>{isSummerCard ? "18:00" : "17:00"}</strong>
        </li>
        <li className={currentDay === 4 ? "today" : ""}>
          <span>Czwartek</span>{" "}
          <strong>{isSummerCard ? "18:00" : "17:00"}</strong>
        </li>
        <li className={currentDay === 5 ? "today" : ""}>
          <span>Piątek</span> <strong>{monFriHour}</strong>
        </li>
        <li className={currentDay === 6 ? "today" : ""}>
          <span>Sobota</span>{" "}
          <strong>{isSummerCard ? "18:00" : "17:00"}</strong>
        </li>
        <li className={`sunday ${currentDay === 0 ? "today" : ""}`}>
          <span>Niedziela i święta</span>
          <strong>8:00, 10:30, 17:00</strong>
        </li>
        <li className="special">
          <span>Święta zniesione</span>
          <strong>{isSummerCard ? "8:00, 18:00" : "8:00, 17:00"}</strong>
        </li>
      </ul>
    );
  };

  return (
    <div className="mass-times-page">
      <h2>Godziny Mszy Świętych</h2>

      <div className="mass-card">
        {activeTab === currentSeason && (
          <div className="active-badge">Obecnie obowiązuje</div>
        )}

        <div className="season-tabs">
          <button
            className={`season-tab ${activeTab === "summer" ? "active" : ""}`}
            onClick={() => setActiveTab("summer")}
          >
            Czas letni
          </button>
          <button
            className={`season-tab ${activeTab === "winter" ? "active" : ""}`}
            onClick={() => setActiveTab("winter")}
          >
            Czas zimowy
          </button>
        </div>

        {renderMassList(activeTab === "summer")}
      </div>
    </div>
  );
}
