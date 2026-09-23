import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import News from "./pages/News";
import Churches from "./pages/Churches";
import Communities from "./pages/Communities";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import MassTimes from "./pages/MassTimes";
import Standards from "./pages/Standards";
import Footer from "./components/Footer";
import Office from "./pages/Office";
import Cemetery from "./pages/Cemetery";
import NotFound from "./pages/NotFound";

function App() {
  const [fontSizeClass, setFontSizeClass] = useState("font-size-normal");

  return (
    <BrowserRouter>
      <div
        className="app-container"
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar
          currentFontSize={fontSizeClass}
          onChangeFontSize={setFontSizeClass}
        />
        <main className={`main-content ${fontSizeClass}`} style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aktualnosci" element={<News />} />
            <Route path="/msze" element={<MassTimes />} />
            <Route path="/kancelaria" element={<Office />} />
            <Route path="/koscioly" element={<Churches />} />
            <Route path="/wspolnoty/:slug" element={<Communities />} />
            <Route path="/galeria" element={<Gallery />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/cmentarz" element={<Cemetery />} />
            <Route
              path="/standardy-ochrony-maloletnich"
              element={<Standards />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
