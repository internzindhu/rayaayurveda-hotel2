import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SEO from "../components/SEO";
import { submitQuestionnaireResults } from "../lib/wellnessApi";

export default function Questionnaire() {
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [userEmail, setUserEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      question: "How often do you feel tired or low in energy during a typical day?",
      type: "radio",
      options: ["Rarely", "Occasionally", "Very often"]
    },
    {
      id: 2,
      question: "Do you have trouble sleeping (falling asleep, disturbed sleep, early waking)?",
      type: "radio",
      options: ["No", "Sometimes", "Regularly"]
    },
    {
      id: 3,
      question: "How would you rate your current stress and mental load?",
      type: "radio",
      options: ["Minimal", "Moderate", "High"]
    },
    {
      id: 4,
      question: "How is your digestion (feeling of heaviness, bloating, heartburn, irregular bowel movements)?",
      type: "radio",
      options: ["No issues", "Occasional difficulties", "Frequent problems"]
    },
    {
      id: 5,
      question: "How do you feel about your immunity?",
      type: "radio",
      options: ["I rarely get ill", "I catch something from time to time", "I often suffer from colds / low immunity"]
    },
    {
      id: 6,
      question: "How would you describe your skin, hair and overall vitality?",
      type: "radio",
      options: ["I'm satisfied", "Some minor issues", "Needs improvement"]
    },
    {
      id: 7,
      question: "Are you interested in natural healing methods instead of (or alongside) conventional medicine?",
      type: "radio",
      options: ["Definitely yes", "Maybe", "No"]
    },
    {
      id: 8,
      question: "What is your biggest priority at the moment?",
      type: "radio",
      options: ["Improve my health and energy", "Reduce stress and find inner peace", "Detox and cleanse the body", "Prevention and a longer, healthier life"]
    },
    {
      id: 9,
      question: "Have you ever tried alternative healing methods (yoga, meditation, herbs, massages)?",
      type: "radio",
      options: ["Yes, regularly", "Occasionally", "Not yet, but I'm interested"]
    },
    {
      id: 10,
      question: "How do you imagine your ideal retreat?",
      type: "radio",
      options: ["Relaxing by the sea with healthy food", "Intensive healing programme with doctors", "A combination of both"]
    },
    {
      id: 11,
      question: "Do you have issues with your weight?",
      type: "radio",
      options: ["No, I'm satisfied", "Mild overweight", "Significant overweight / obesity"]
    },
    {
      id: 12,
      question: "Have you tried to lose weight in the past year?",
      type: "radio",
      options: ["No", "Yes, partly successful", "Yes, but without results"]
    },
    {
      id: 13,
      question: "Have you been diagnosed with high blood pressure or do you take medication for it?",
      type: "radio",
      options: ["No", "Yes, mild hypertension", "Yes, significant problem"]
    },
    {
      id: 14,
      question: "Do you have issues with diabetes or fluctuating blood sugar levels?",
      type: "radio",
      options: ["No", "Prediabetes / early-stage issues", "Diagnosed diabetes"]
    },
    {
      id: 15,
      question: "Do you suffer from any chronic conditions? (you can tick more than one)",
      type: "checkbox",
      options: [
        "Digestive problems (IBS, reflux, constipation)",
        "Migraines / chronic headaches",
        "Joint & musculoskeletal issues (arthritis, back pain)",
        "Autoimmune diseases",
        "Other"
      ],
      hasOther: true
    },
    {
      id: 16,
      question: "How often do you feel fatigued or exhausted even after rest?",
      type: "radio",
      options: ["Rarely", "Sometimes", "Almost always"]
    },
    {
      id: 17,
      question: "Do you have problems with hormonal balance (e.g. menopause, menstrual issues, thyroid)?",
      type: "radio",
      options: ["No", "Yes, minor issues", "Yes, significant problems"]
    },
    {
      id: 18,
      question: "How would you rate your physical fitness?",
      type: "radio",
      options: ["Good – I feel fit", "Average – I could use more exercise", "Poor – I tire quickly, low energy"]
    },
    {
      id: 19,
      question: "Have you ever tried detox or body cleansing?",
      type: "radio",
      options: ["No, never", "Once or twice", "Regularly"]
    },
    {
      id: 20,
      question: "What would you like to achieve most during your stay?",
      type: "radio",
      options: ["Weight reduction", "Lower blood pressure & improved health", "Detox and body cleansing", "Improved vitality & fitness"]
    },
  ];

  const questionsPerPage = 5;
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = questions.slice(startIndex, endIndex);

  const handleRadioChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleCheckboxChange = (questionId, option, checked) => {
    const currentAnswers = answers[questionId] || [];
    if (checked) {
      setAnswers({ ...answers, [questionId]: [...currentAnswers, option] });
    } else {
      setAnswers({ ...answers, [questionId]: currentAnswers.filter(a => a !== option) });
    }
  };

  const handleOtherInput = (questionId, value) => {
    const currentAnswers = answers[questionId] || [];
    const withoutOther = currentAnswers.filter(a => a !== "Other" && !a.startsWith("Other:"));
    if (value.trim()) {
      setAnswers({ ...answers, [questionId]: [...withoutOther, `Other: ${value}`] });
    } else {
      setAnswers({ ...answers, [questionId]: withoutOther });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formatted = questions.map((q) => ({
        question: q.question,
        answer: Array.isArray(answers[q.id])
          ? answers[q.id].join(", ")
          : answers[q.id] ?? "—",
      }));
      await submitQuestionnaireResults({
        email: userEmail,
        answers: formatted,
        recipientEmail: "hod@rayalonglife.com",
      });
    } catch {
      // Non-blocking — still show results even if submission fails
    } finally {
      setSubmitting(false);
    }
    navigate("/questionnaire/results", { state: { answers } });
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isLastPage = currentPage === totalPages;

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: 'url(/bg4.jpg)' }}>
      <SEO
        title="Dosha Quiz — Discover Your Ayurvedic Body Type"
        description="Take our free Ayurveda dosha questionnaire to discover your unique Vata, Pitta, or Kapha constitution and find the ideal wellness retreat tailored to your needs."
        url="/questionnaire"
      />
      {/* <div className="absolute inset-0 bg-black/50"></div> */}
      <div className="relative z-10">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-16 sm:py-32 md:py-48">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4" style={{ fontFamily: 'Sentient, sans-serif', fontWeight: 700 }}>
              Is Ayurveda For Me?
            </h1>
            <p className="text-xl text-grey/90">Let's find out together</p>
            {emailSubmitted && (
              <div className="mt-4">
                <div className="flex justify-center items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <div
                      key={i + 1}
                      className={`h-2 w-8 rounded-full transition-all ${i + 1 <= currentPage ? 'bg-[#5E17EB]' : 'bg-white/30'}`}
                    />
                  ))}
                </div>
                <p className="text-grey/80 mt-2 text-sm">
                  Page {currentPage} of {totalPages}
                </p>
              </div>
            )}
          </div>

          {/* Email gate — shown before questions */}
          {!emailSubmitted && (
            <div className="bg-white/90 rounded-2xl p-8 shadow-sm">
              <p className="text-[#181818] text-base mb-6 leading-relaxed" style={{ fontFamily: 'Lato, sans-serif' }}>
                We'll send your personalised results to your email. Please enter your address to begin.
              </p>
              <form
                onSubmit={(e) => { e.preventDefault(); if (userEmail) setEmailSubmitted(true); }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs text-[#8C8C8C] uppercase tracking-[0.16em] mb-1.5" style={{ fontFamily: 'Lato, sans-serif' }}>
                    Your Email*
                  </label>
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full border border-[#E0D4C8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#5E17EB] placeholder:text-[#AAA]"
                    style={{ fontFamily: 'Lato, sans-serif' }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#5E17EB] hover:bg-[#4B12BD] text-white text-xs tracking-[0.22em] uppercase rounded-lg transition-colors"
                  style={{ fontFamily: 'Lato, sans-serif' }}
                >
                  Start Questionnaire →
                </button>
              </form>
            </div>
          )}

          {/* Questions */}
          {emailSubmitted && (

          <div className="bg-white/0 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {currentQuestions.map((q) => (
                <div
                  key={q.id}
                  className="p-4 rounded-xl bg-white/0 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-[#EAE9E3]"
                >
                  <label className="block font-semibold text-black mb-3">
                    {q.id}. {q.question}
                  </label>
                  {q.type === "radio" ? (
                    <div className="space-y-2">
                      {q.options.map((option) => (
                        <label key={option} className="flex items-center cursor-pointer hover:bg-[#a08679]/20 p-2 rounded transition-colors">
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            value={option}
                            checked={answers[q.id] === option}
                            onChange={(e) => handleRadioChange(q.id, e.target.value)}
                            className="mr-3 w-4 h-4 text-black focus:ring-black"
                          />
                          <span className="text-black">• {option}</span>
                        </label>
                      ))}
                    </div>
                  ) : q.type === "checkbox" ? (
                    <div className="space-y-2">
                      {q.options.map((option) => (
                        <label key={option} className="flex items-center cursor-pointer hover:bg-gray-10 p-2 rounded transition-colors">
                          <input
                            type="checkbox"
                            checked={(answers[q.id] || []).some(a => a === option || a.startsWith("Other:"))}
                            onChange={(e) => {
                              if (option === "Other") {
                                handleCheckboxChange(q.id, "Other", e.target.checked);
                              } else {
                                handleCheckboxChange(q.id, option, e.target.checked);
                              }
                            }}
                            className="mr-3 w-4 h-4 text-[#5E17EB] focus:ring-[#5E17EB] rounded"
                          />
                          <span className="text-gray-700">☐ {option}</span>
                        </label>
                      ))}
                      {q.hasOther && (answers[q.id] || []).some(a => a === "Other" || a.startsWith("Other:")) && (
                        <div className="ml-7 mt-2">
                          <input
                            type="text"
                            placeholder="Please specify..."
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB]"
                            onChange={(e) => handleOtherInput(q.id, e.target.value)}
                            defaultValue={(answers[q.id] || []).find(a => a.startsWith("Other:"))?.replace("Other: ", "") || ""}
                          />
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              ))}

              <div className="flex justify-between items-center pt-6">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${currentPage === 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  Previous
                </button>

                {isLastPage ? (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2 bg-[#5E17EB] hover:bg-[#4B12BD] disabled:opacity-60 text-white rounded-lg font-semibold transition-colors"
                  >
                    {submitting ? "Submitting…" : "Submit Questionnaire"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2 bg-[#5E17EB] hover:bg-[#4B12BD] text-white rounded-lg font-semibold transition-colors"
                  >
                    Next
                  </button>
                )}
              </div>
            </form>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
