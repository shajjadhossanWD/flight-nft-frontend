import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Pages/Home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import AboutUs from "./Pages/AboutUs/AboutUs";
import HowItWorks from "./Pages/HowItWorks/HowItWorks";
import Marketplace from "./Pages/Marketplace/Marketplace";
import Contact from "./Pages/Contact/Contact";
import PublicLayout from "./Components/Shared/PublicLayout";
import Search from "./Pages/Search/Search";
import Profile from "./Pages/Profile/Profile";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import Ideas from "./Pages/Ideas/Ideas";
// import HomeFlight from "./Pages/Home/HomeFlight/HomeFlight";

function App() {
  return (

    <BrowserRouter>
      <ScrollToTop />
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
    </BrowserRouter>
  );
}

export default App;
