import "../styles/pages/Standards.css";

export default function Standards() {
  return (
    <div className="standards-page">
      <div className="standards-container">
        <h1>STANDARDY OCHRONY MAŁOLETNICH</h1>
        <h2>
          W PARAFII NIEPOKALANEGO SERCA NAJŚWIĘTSZEJ MARYI PANNY W GRONKOWIE
        </h2>

        <section>
          <h3>I. Wstęp</h3>
          <p>
            Wprowadzając niniejsze Standardy, Parafia Niepokalanego Serca
            Najświętszej Maryi Panny w Gronkowie wykonuje obowiązek, o którym
            mowa w art. 22b i 22c Ustawy z dnia 13 maja 2016 r. o
            przeciwdziałaniu zagrożeniom przestępczością na tle seksualnym i
            ochronie małoletnich (t.j. Dz. U. z 2024 r., poz. 560). Parafia...
            jest organizatorem działalności na rzecz Małoletnich, prowadzonej w
            sferach wskazanych w ww. Ustawie.
          </p>
          <p>
            Wprowadzane Standardy zostały zredagowane w oparciu o Standardy
            Ochrony Małoletnich w Archidiecezji Krakowskiej, wprowadzone dnia 2
            sierpnia 2024 roku.
          </p>
        </section>

        <section>
          <h3>II. Podstawy prawne</h3>
          <p>Niniejsze Standardy stworzono w oparciu o:</p>
          <ul>
            <li>
              Ustawę z dnia 13 maja 2016 r. o przeciwdziałaniu zagrożeniom
              przestępczością na tle seksualnym i ochronie małoletnich...
            </li>
            <li>
              Kodeks prawa kanonicznego promulgowany przez papieża Jana Pawła II
              w dniu 25 stycznia 1983 r...
            </li>
            <li>
              Dekret Arcybiskupa Marka Jędraszewskiego Metropolity Krakowskiego
              Nr 4533/2021...
            </li>
            <li>
              Ustawę z dnia 9 czerwca 2022 r. o wspieraniu i resocjalizacji
              nieletnich...
            </li>
            <li>Ustawę z dnia 6 czerwca 1997 r. Kodeks karny...</li>
            <li>
              Ustawę z dnia 17 listopada 1964 r. Kodeks postępowania
              cywilnego...
            </li>
            <li>
              Ustawę z dnia 6 czerwca 1997 r. Kodeks postępowania karnego...
            </li>
            <li>Ustawę z dnia 23 kwietnia 1964 r. Kodeks cywilny...</li>
          </ul>
        </section>

        <section>
          <h3>III. Definicje</h3>
          <p>Ilekroć w niniejszym dokumencie jest mowa o:</p>
          <ul>
            <li>
              <strong>Standardach</strong> – należy pod tym pojęciem rozumieć
              standardy ochrony małoletnich w rozumieniu art. 22b i art. 22c
              Ustawy;
            </li>
            <li>
              <strong>Działalności na rzecz Małoletnich</strong> – należy pod
              tym zwrotem rozumieć działalność na rzecz Małoletnich związaną z
              wychowaniem, edukacją...
            </li>
            <li>
              <strong>Parafii lub Organizatorze</strong> – należy pod tymi
              pojęciami rozumieć Parafię Niepokalanego Serca NMP w Gronkowie...
            </li>
            <li>
              <strong>Personelu Parafii</strong> – należy pod tym pojęciem
              rozumieć wszystkie osoby, przy pomocy których Parafia wykonuje
              działalność...
            </li>
            <li>
              <strong>Małoletnich</strong> – należy pod tym pojęciem rozumieć
              osoby, które nie ukończyły 18 roku życia.
            </li>
          </ul>
        </section>

        <section>
          <h3>Pełny tekst dokumentu</h3>
          <div className="full-document-box">
            <p>
              <em>
                Aby zapoznać się z pełną treścią dokumentu, w tym z zasadami
                bezpiecznych relacji, wykazem zachowań niedozwolonych oraz
                procedurami interwencji, prosimy o pobranie dokumentu poniżej
                lub zgłoszenie się do Kancelarii Parafialnej.
              </em>
            </p>
            <a
              href="/standardy.pdf"
              download="Standardy_Ochrony_Maloletnich_Gronkow.pdf"
              className="download-btn"
              style={{
                textAlign: "center",
                textDecoration: "none",
                display: "block",
                boxSizing: "border-box",
              }}
            >
              Pobierz pełne Standardy Ochrony Małoletnich (PDF)
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
