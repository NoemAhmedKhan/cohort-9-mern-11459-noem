import "./styles/theme.css";       // load once, before component CSS
import Home from "./pages/Home/Home";
import About from "./components/About/About";
import Features from "./components/Features/Features";
import Footer from "./components/Footer/Footer";
// import Signup from "./pages/Signup/Signup";
// import Login from "./pages/Login/Login";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom"

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/*<Route path="/signup" element={<Signup />} />*/}
          {/*<Route path="/login" element={<Login />} />*/}
        </Routes>
      </BrowserRouter>
  )
}
export default App;