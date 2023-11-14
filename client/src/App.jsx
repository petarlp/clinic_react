// import './App.css'

import { useState } from "react"
import Header from "./components/Header"
import SideBar from "./components/SideBar"
import DashBoard from "./pages/DashBoard";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import AmbList from "./pages/AmbList";
import Recipe from "./pages/Recipe";
import Mkb from "./pages/Mkb";
import Medicaments from "./pages/Medicaments";
import Shedule from "./pages/Shedule";


function App() {


  const[showMenu, setShowMenu] = useState(1);

  function handleShowMenu() {
    setShowMenu(!showMenu);
  }
 

  return (
      <Router>
      <>
          <div className={showMenu?'':'toggle-sidebar'}>
            <Header hsmenu = {handleShowMenu} />
            <SideBar />
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/alists" element={<AmbList />} />
              <Route path="/recipes" element={<Recipe />} />
              <Route path="/mkb" element={<Mkb />} />
              <Route path="/medicaments" element={<Medicaments />} />
              <Route path="/shedule" element={<Shedule />} />
            </Routes>

          </div>

      </>
      </Router>

      
    
  )
}

export default App
