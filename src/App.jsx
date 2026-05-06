import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import BookHotel from './pages/BookHotel'
import HotelDetails from './pages/HotelDetails'
import WellnessInquiry from './pages/WellnessInquiry'
import Consultation from './pages/Consultation'
import Questionnaire from './pages/Questionnaire'
import QuestionnaireResults from './pages/QuestionnaireResults'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import IndividualStays from './pages/IndividualStays'
import GroupStays from './pages/GroupStays'
import IndividualStaysSriLanka from './pages/IndividualStaysSriLanka'
import IndividualStaysIndia from './pages/IndividualStaysIndia'
import IndividualStaysThailand from './pages/IndividualStaysThailand'
import GroupStaysSriLanka from './pages/GroupStaysSriLanka'
import GroupStaysIndia from './pages/GroupStaysIndia'
import GroupStaysThailand from './pages/GroupStaysThailand'
import Treatments from './pages/Treatments'
import Blogs from './pages/Blogs'
import Shop from './pages/Shop'
import Vouchers from './pages/Vouchers'
import Policy from './pages/Policy'
import Destinations from './pages/Destinations'
import Login from './pages/Login'
import Mission from './pages/Mission'
import WhyTravelWithUs from './pages/WhyTravelWithUs'
import HowItWorks from './pages/HowItWorks'
import BeforeYourStay from './pages/BeforeYourStay'
import DuringYourStay from './pages/DuringYourStay'
import AfterYourStay from './pages/AfterYourStay'
import AyurvedaGuide from './pages/AyurvedaGuide'
import WhatIsAyurveda from './pages/WhatIsAyurveda'
import AyurvedaDoshas from './pages/AyurvedaDoshas'
import PreventiveVsCurative from './pages/PreventiveVsCurative'
import WhatIsPanchakarma from './pages/WhatIsPanchakarma'
import AyurvedaCanCure from './pages/AyurvedaCanCure'
import MythsAboutAyurveda from './pages/MythsAboutAyurveda'
import AyurvedaVsWellness from './pages/AyurvedaVsWellness'

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/about/mission" element={<Mission />} />
        <Route path="/about/why-travel-with-us" element={<WhyTravelWithUs />} />
        <Route path="/about/how-it-works" element={<HowItWorks />} />
        <Route path="/about/before-your-stay" element={<BeforeYourStay />} />
        <Route path="/about/during-your-stay" element={<DuringYourStay />} />
        <Route path="/about/after-your-stay" element={<AfterYourStay />} />
        <Route path="/ayurveda-guide" element={<AyurvedaGuide />} />
        <Route path="/ayurveda-guide/what-is-ayurveda" element={<WhatIsAyurveda />} />
        <Route path="/ayurveda-guide/principles-vata-pitta-kapha" element={<AyurvedaDoshas />} />
        <Route path="/ayurveda-guide/preventive-vs-curative" element={<PreventiveVsCurative />} />
        <Route path="/ayurveda-guide/what-is-panchakarma" element={<WhatIsPanchakarma />} />
        <Route path="/ayurveda-guide/what-ayurveda-can-and-cannot-cure" element={<AyurvedaCanCure />} />
        <Route path="/ayurveda-guide/myths-about-ayurveda" element={<MythsAboutAyurveda />} />
        <Route path="/ayurveda-guide/ayurveda-vs-wellness" element={<AyurvedaVsWellness />} />
        <Route path="/book-hotel" element={<BookHotel />} />
        <Route path="/book-hotel/:id" element={<HotelDetails />} />
        <Route path="/book-hotel/:id/inquiry" element={<WellnessInquiry />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/questionnaire/results" element={<QuestionnaireResults />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/individual-stays" element={<IndividualStays />} />
        <Route path="/group-stays" element={<GroupStays />} />
        <Route path="/individual-stays/sri-lanka" element={<IndividualStaysSriLanka />} />
        <Route path="/individual-stays/india" element={<IndividualStaysIndia />} />
        <Route path="/individual-stays/thailand" element={<IndividualStaysThailand />} />
        <Route path="/group-stays/sri-lanka" element={<GroupStaysSriLanka />} />
        <Route path="/group-stays/india" element={<GroupStaysIndia />} />
        <Route path="/group-stays/thailand" element={<GroupStaysThailand />} />
        <Route path="/treatments" element={<Treatments />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/vouchers" element={<Vouchers />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

