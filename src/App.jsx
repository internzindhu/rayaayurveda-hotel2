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
import Treatments from './pages/Treatments'
import Blogs from './pages/Blogs'
import Shop from './pages/Shop'
import Vouchers from './pages/Vouchers'
import Policy from './pages/Policy'
import Destinations from './pages/Destinations'
import Login from './pages/Login'

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
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

