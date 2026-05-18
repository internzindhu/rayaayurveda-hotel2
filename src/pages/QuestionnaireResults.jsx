import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import ScrollReveal from "@/components/lightswind/scroll-reveal";

export default function QuestionnaireResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    const answers = location.state?.answers;
    if (!answers) {
      navigate("/questionnaire");
      return;
    }

    // Analyze answers and determine recommendation
    const result = analyzeAnswers(answers);
    setRecommendation(result);
  }, [location.state, navigate]);

  const analyzeAnswers = (answers) => {
    const introShort = "Thank you for completing your Ayurveda Health Questionnaire. Here’s your personalized recommendation.";
    // Scoring system
    let scores = {
      weight: 0,
      bloodPressure: 0,
      chronic: 0,
      detox: 0,
      hormonal: 0,
      general: 0
    };

    // Weight Management & Energy (Q11, Q12, Q1, Q16, Q18)
    if (answers[11] && (answers[11].includes("Mild") || answers[11].includes("Significant"))) scores.weight += 2;
    if (answers[12] && answers[12].includes("Yes")) scores.weight += 1;
    if (answers[1] === "Very often" || answers[1] === "Occasionally") scores.weight += 1;
    if (answers[16] === "Almost always" || answers[16] === "Sometimes") scores.weight += 1;
    if (answers[18] === "Poor" || answers[18] === "Average") scores.weight += 1;

    // High Blood Pressure (Q13)
    if (answers[13] && answers[13].includes("Yes")) scores.bloodPressure += 3;
    if (answers[3] === "High") scores.bloodPressure += 1;

    // Chronic Conditions (Q15)
    if (answers[15] && Array.isArray(answers[15]) && answers[15].length > 0) {
      scores.chronic = answers[15].length * 2;
    }

    // Detox & Cleansing (Q4, Q19, Q20)
    if (answers[4] === "Frequent problems" || answers[4] === "Occasional difficulties") scores.detox += 2;
    if (answers[19] === "No, never") scores.detox += 1;
    if (answers[20] && answers[20].includes("Detox")) scores.detox += 2;
    if (answers[5] === "I often suffer from colds") scores.detox += 1;

    // Hormonal Balance (Q17)
    if (answers[17] && answers[17].includes("Yes")) scores.hormonal += 3;
    if (answers[6] === "Needs improvement") scores.hormonal += 1;

    // Find highest scores
    const maxScore = Math.max(...Object.values(scores));
    const highScores = Object.entries(scores).filter(([_, score]) => score >= 2);

    // Determine recommendation
    if (highScores.length === 0 || maxScore < 2) {
      return {
        type: "general",
        title: "General Wellbeing & Prevention",
        intro: introShort,
        content: "Your health seems generally balanced — which is wonderful.\n\nAyurveda can help you maintain that harmony, boost your energy, and prevent future imbalances through gentle detox, rejuvenating therapies, and balanced routines.\n\nInvesting in your health before problems appear is the most powerful step you can take.\n\nAyurveda helps you stay strong, balanced, and full of vitality."
      };
    }

    if (highScores.length > 1) {
      // Combination result
      const primaryAreas = highScores.map(([area]) => area).join(" and ");
      return {
        type: "combination",
        title: "Personalized Healing Plan",
        intro: introShort,
        content: `Your results show that Ayurveda can support you in several areas — particularly in ${primaryAreas}.\n\nOur doctors will tailor a personalised healing plan to help your body release toxins, improve metabolism, and restore energy step by step.\n\nAyurveda have all the tools to help you feel lighter, calmer, and stronger — naturally.`
      };
    }

    // Single category results
    if (scores.weight >= maxScore) {
      return {
        type: "weight",
        title: "Weight Management & Energy",
        intro: introShort,
        content: "It looks like your body could benefit from rebalancing metabolism and restoring natural energy.\n\nAyurveda offers gentle yet highly effective methods to support healthy weight, improve digestion, and bring back that feeling of lightness and vitality.\n\nThrough personalised therapies, daily routines, and nutrition designed for your body type, you'll learn how to maintain your ideal weight — without restriction or stress.\n\nAyurveda can help you feel lighter, stronger, and more energised — in a way that truly lasts."
      };
    }

    if (scores.bloodPressure >= maxScore) {
      return {
        type: "bloodPressure",
        title: "High Blood Pressure / Cardiovascular Health",
        intro: introShort,
        content: "Your answers suggest that your heart and circulation could use some extra care.\n\nAyurveda combines natural therapies, calming routines, and herbal formulations to lower blood pressure, reduce stress, and strengthen the cardiovascular system — gently and safely.\n\nOur doctors will create a personalised programme that supports your heart and helps you find true calm and balance.\n\nAyurveda can help you lower your stress, strengthen your heart, and regain peace of mind."
      };
    }

    if (scores.chronic >= maxScore) {
      return {
        type: "chronic",
        title: "Chronic Conditions & Prevention",
        intro: introShort,
        content: "It seems your body may be sending signals that it needs deeper healing.\n\nAyurveda doesn't just mask symptoms — it looks for the root causes of imbalance.\n\nWith individual diagnostics, therapies, herbs, and nutrition, we help the body recover naturally, support immunity, and prevent further complications.\n\nAyurveda can help you strengthen your system from within — and guide you toward lasting wellbeing."
      };
    }

    if (scores.detox >= maxScore) {
      return {
        type: "detox",
        title: "Detox & Cleansing",
        intro: introShort,
        content: "Your answers show that your body might be overloaded and in need of a reset.\n\nAyurveda's detox therapies — such as Panchakarma — gently eliminate toxins, improve metabolism, and refresh both body and mind.\n\nAfter a proper Ayurvedic detox, clients often say they feel lighter, sleep better, and think more clearly.\n\nAyurveda can help you cleanse, recharge, and feel renewed — from the inside out."
      };
    }

    if (scores.hormonal >= maxScore) {
      return {
        type: "hormonal",
        title: "Hormonal Balance & Vitality",
        intro: introShort,
        content: "It looks like your hormonal balance and energy levels could use some attention.\n\nAyurveda offers natural ways to harmonise the endocrine system, reduce stress, and restore emotional stability — especially during periods of hormonal change such as menopause or fatigue.\n\nWith the right combination of therapies, herbs, and nutrition, you can rediscover your inner harmony and vitality.\n\nAyurveda can help you balance your hormones and feel like yourself again — calm, radiant, and strong."
      };
    }

    // Default to general
    return {
      type: "general",
      title: "General Wellbeing & Prevention",
      intro: introShort,
      content: "Your health seems generally balanced — which is wonderful.\n\nAyurveda can help you maintain that harmony, boost your energy, and prevent future imbalances through gentle detox, rejuvenating therapies, and balanced routines.\n\nInvesting in your health before problems appear is the most powerful step you can take.\n\nAyurveda helps you stay strong, balanced, and full of vitality."
    };
  };

  if (!recommendation) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#5E17EB] mb-4"></div>
          <p className="text-gray-600">Analyzing your results...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/bg6.jpg)' }}
    >
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 md:py-32">
        <div
          className="rounded-2xl p-8 md:p-12 text-left"
          style={{ fontFamily: 'Sentient, sans-serif' }}
        >
          {/* Title */}

          {/* Intro Text */}
          <div className="mb-8 animate-fade-up" style={{ animationDelay: '0.8s' }}>
            <TextGenerateEffect
              words={recommendation.intro}
              className="text-gray-700 leading-relaxed mb-4 text-xl"
            />
          </div>

          {/* Divider */}
          <div
            className="border-t-2 border-[#5E17EB] my-8 animate-fade-up"
            style={{ animationDelay: '1.2s' }}
          ></div>

          {/* Main Content */}
          <div className="mb-8 animate-fade-up" style={{ animationDelay: '1.6s' }}>
            {recommendation.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-4 text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Call to Action */}
          <div
            className="mt-12 p-8 bg-[#d8cbc4]/50 rounded-xl animate-fade-up"
            style={{ animationDelay: '2s' }}
          >
            <h2 className="text-2xl font-bold text-[#181818] mb-4">Ready to start your journey?</h2>
            <p className="text-gray-700 mb-6">
              Our team will help you choose the perfect Ayurvedic retreat, where expert doctors and therapists will create your personalised healing plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/consultation"
                className="px-8 py-3 bg-[#5E17EB] hover:bg-[#4B12BD] text-white rounded-lg font-semibold text-center transition-colors"
              >
                Book a Consultation
              </a>
              <a
                href="/individual-stays"
                className="px-8 py-3 border-2 border-[#5E17EB] text-[#5E17EB] hover:bg-[#5E17EB] hover:text-white rounded-lg font-semibold text-center transition-colors"
              >
                View Retreats
              </a>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fadeUp 0.7s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

