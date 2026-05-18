import { useState } from "react";
import Navbar from "../components/Navbar";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Ayurveda?",
      answer: "Ayurveda is an ancient holistic system of medicine from India, over 5,000 years old. It focuses on balancing the body, mind, and spirit through natural treatments, herbs, diet, and lifestyle practices."
    },
    {
      question: "How long should I stay at an Ayurvedic retreat?",
      answer: "We recommend a minimum stay of 7-14 days to experience significant benefits. However, programs range from 1 week to 4+ weeks depending on your health goals and availability."
    },
    {
      question: "Is Ayurveda suitable for everyone?",
      answer: "Yes! Ayurveda is personalized to each individual's constitution (dosha) and health needs. Our practitioners will assess your unique requirements and create a tailored treatment plan."
    },
    {
      question: "What can I expect during an Ayurvedic treatment?",
      answer: "Treatments may include oil massages, herbal therapies, yoga, meditation, detoxification processes, and personalized dietary plans. Each program is customized based on your health assessment."
    },
    {
      question: "Do I need to prepare before coming to the retreat?",
      answer: "We'll provide you with pre-retreat guidelines once you book. Generally, it's recommended to avoid heavy foods, alcohol, and stress in the days leading up to your arrival."
    },
    {
      question: "Are the resorts suitable for beginners?",
      answer: "Absolutely! Our resorts cater to all levels, from complete beginners to experienced wellness enthusiasts. Our staff will guide you every step of the way."
    },
    {
      question: "What is included in the package?",
      answer: "Packages typically include accommodation, all meals (Ayurvedic diet), consultations with doctors, treatments, yoga classes, meditation sessions, and wellness activities."
    },
    {
      question: "Can I bring my partner or family?",
      answer: "Yes! We offer both individual and group stay options. Family and couples packages are available at select resorts."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F4] to-[#EAE9E3]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 md:py-32">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#181818] mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-700">Everything you need to know about Ayurvedic retreats</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
                <span className="text-2xl text-[#5E17EB] flex-shrink-0">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-[#EAE9E3] rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-[#181818] mb-4">Still have questions?</h3>
          <p className="text-gray-700 mb-6">Our wellness experts are here to help!</p>
          <a href="/contact" className="inline-block bg-[#5E17EB] hover:bg-[#4B12BD] text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

