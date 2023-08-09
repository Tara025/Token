import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import LoginUser from './components/LoginUser';
import RegisterUser from "./components/RegisterUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Andere Routen hier */}
        <Route path="/" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
       
        {/* Weitere Routen hier */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
