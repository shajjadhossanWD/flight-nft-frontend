import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Pages/Home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import AboutUs from "./Pages/AboutUs/AboutUs";
import HowItWorks from "./Pages/HowItWorks/HowItWorks";
import Marketplace from "./Pages/Marketplace/Marketplace";
import Contact from "./Pages/Contact/Contact";
import PublicLayout from "./Components/Shared/PublicLayout";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/how-it-works' element={<HowItWorks />} />
          <Route path='/pricing' element={<Marketplace />} />
          <Route path='/contact' element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
