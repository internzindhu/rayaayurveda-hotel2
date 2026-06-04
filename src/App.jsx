import { Routes, Route, Link, useLocation } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import BookHotel from './pages/BookHotel'
import HotelDetails from './pages/HotelDetails'
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
import BlogPost from './pages/BlogPost'
import Newsletter from './pages/Newsletter'
import Shop from './pages/Shop'
import Vouchers from './pages/Vouchers'
import Policy from './pages/Policy'
import Destinations from './pages/Destinations'
import AyurvedaGuide from './pages/AyurvedaGuide'
import WhatIsAyurveda from './pages/WhatIsAyurveda'
import AyurvedaDoshas from './pages/AyurvedaDoshas'
import PreventiveVsCurative from './pages/PreventiveVsCurative'
import WhatIsPanchakarma from './pages/WhatIsPanchakarma'
import AyurvedaCanCure from './pages/AyurvedaCanCure'
import MythsAboutAyurveda from './pages/MythsAboutAyurveda'
import AyurvedaVsWellness from './pages/AyurvedaVsWellness'

function App() {
  const location = useLocation();
  const hideIcon = location.pathname === '/consultation';

  return (
    <div className="App">
      <ScrollToTop />
      {!hideIcon && (
        <Link
          to="/consultation"
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-[#5E17EB] hover:bg-[#4B12BD] text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 flex items-center justify-center"
          aria-label="Talk to an expert"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </Link>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
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
        <Route path="/blogs/:slug" element={<BlogPost />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/vouchers" element={<Vouchers />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/destinations" element={<Destinations />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

