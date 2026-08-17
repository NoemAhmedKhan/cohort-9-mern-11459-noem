import "./styles/theme.css";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard"
import NoteEditor from "./components/NoteEditor/NoteEditor"
import NoteEditorPage from "./pages/NoteEditor/NoteEditorPage"
import Profile from "./pages/Profile/Profile"
import { BrowserRouter, Router, Routes, Route } from "react-router-dom"

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/notes/create" element={<NoteEditorPage />} />
            <Route path="/notes/:id/view" element={<NoteEditor />} />
            <Route path="/notes/:id/edit" element={<NoteEditor />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
  )
}
export default App;