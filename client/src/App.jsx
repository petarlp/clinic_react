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
import Login from "./pages/Login";
import Logout from "./components/Logout";

import { AuthProvider } from './contexts/authContext';
import AuthGuard from "./guards/AuthGuard";


function App() {


  const[showMenu, setShowMenu] = useState(1);

  function handleShowMenu() {
    setShowMenu(!showMenu);
  }
  
  return ( 
    <AuthProvider>
          
          <div className={showMenu?'':'toggle-sidebar'}>
            <Header hsmenu={handleShowMenu} />
            <SideBar />
            <Routes>
              <Route path="/login" element={<Login />} />
              
              <Route element={<AuthGuard />}>
                <Route path="/" element={<DashBoard />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/alists" element={<AmbList />} />
                <Route path="/recipes" element={<Recipe />} />
                <Route path="/mkb" element={<Mkb />} />
                <Route path="/medicaments" element={<Medicaments />} />
                <Route path="/shedule" element={<Shedule />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="*" element={<DashBoard />} />
              </Route>
            </Routes>
          </div>
      </AuthProvider>

      
    
  )
}

export default App
