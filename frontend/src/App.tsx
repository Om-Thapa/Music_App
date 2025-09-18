import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        {/* <Route path="/" element={}/>
        <Route path="" element={}/> */}
      </Routes>
    </>
  )
}

export default App
