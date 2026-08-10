import "./styles/theme.css";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import NoteEditor from "./pages/NoteEditor/NoteEditor"
import { BrowserRouter, Router, Routes, Route } from "react-router-dom"

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
            <Route path="/noteeditor" element={<NoteEditor />} />
        </Routes>
      </BrowserRouter>
  )
}
export default App;