import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Preloder from './Components/Preloder';
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import PublicLayout from "./Components/Shared/PublicLayout";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Contact from "./Pages/Contact/Contact";
import Home from "./Pages/Home/Home";
import HowItWorks from "./Pages/HowItWorks/HowItWorks";
import Ideas from "./Pages/Ideas/Ideas";
import Marketplace from "./Pages/Marketplace/Marketplace";
import Profile from "./Pages/Profile/Profile";
import Search from "./Pages/Search/Search";
// import HomeFlight from "./Pages/Home/HomeFlight/HomeFlight";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, );
  }, []);
  return (  
    <BrowserRouter>
      <ScrollToTop />
      {
        loading?
        <Preloder/>
        :
       
        <Routes>
          <Route path='/' element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/how-it-works' element={<HowItWorks />} />
            <Route path='/pricing' element={<Marketplace />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/search' element={<Search />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/ideas' element={<Ideas />} />
            {/* <Route path='/test' element={<HomeFlight />} /> */} 
          </Route>
        </Routes>
      }
    </BrowserRouter>
  );
}

export default App;
