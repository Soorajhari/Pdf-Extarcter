import Login from "./component/auth/Login";
import OTPForm from "./component/auth/Otp";
import Signup from "./component/auth/Signup";
import ExtractPdf from "./component/design/ExtractPdf";
import Pdf from "./component/design/Pdf";
import Landing from "./pages/Landing";
import MainHome from "./pages/MainHome";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PrivateRoutes from "./component/auth/PrivateRoutes";

function App() {
  return (
    <div className="App">
  
      <Router>
        <Routes>
          <Route path="/" element={<  Landing />} />
          <Route path="/home" element={<PrivateRoutes component={MainHome} />} />
          <Route path="/extract" element={<PrivateRoutes component={Pdf}/>} />
          <Route path="/download" element={<PrivateRoutes component={ExtractPdf}/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<OTPForm />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
