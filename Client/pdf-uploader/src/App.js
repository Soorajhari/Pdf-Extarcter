import ExtractPdf from "./component/design/ExtractPdf";
import Home from "./component/design/Nav";
import Pdf from "./component/design/Pdf";
import MainHome from "./component/pages/MainHome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
  
      <Router>
        <Routes>
          <Route path="/" element={<MainHome />} />
          <Route path="/extract" element={<Pdf />} />
          <Route path="/download" element={<ExtractPdf />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
