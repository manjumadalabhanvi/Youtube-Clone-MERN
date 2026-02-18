import { Routes, Route } from "react-router-dom";
import Watch from "./pages/watch"; 
import Home from './pages/Home'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/watch/:id" element={<Watch />} />
      </Routes>
    </>
  );
}

export default App;
