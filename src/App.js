import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import OTPVerify from "./components/otpverify";
import MusicApp from "./components/songs";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/otpverify" element={<OTPVerify />}></Route>
        <Route path="/music" element={<MusicApp />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
