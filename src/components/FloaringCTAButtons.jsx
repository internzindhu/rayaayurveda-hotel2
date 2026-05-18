import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";

export default function FloatingCTAButtons({
  scrollY = 0,
  windowWidth = window.innerWidth,
  buttonsVisible = true,
  autoConnectionProgress = 0
}) {
  const leftBtnRef = useRef(null);
  const rightBtnRef = useRef(null);

  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const [leftWidth, setLeftWidth] = useState(0);
  const [rightWidth, setRightWidth] = useState(0);

  const isMobile = windowWidth < 768;

  useLayoutEffect(() => {
    if (!leftBtnRef.current || !rightBtnRef.current) return;

    const measure = () => {
      setLeftWidth(leftBtnRef.current.offsetWidth);
      setRightWidth(rightBtnRef.current.offsetWidth);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(leftBtnRef.current);
    observer.observe(rightBtnRef.current);

    return () => observer.disconnect();
  }, []);

  // Mobile: simple bottom bar
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 flex pointer-events-none">
        <Link
          to="/consultation"
          className="pointer-events-auto flex-1 py-3 sm:py-4 bg-[#fdbb3a] text-white text-xs sm:text-sm font-medium text-center shadow-lg hover:bg-yellow-500 transition-colors duration-200 leading-tight"
          style={{ fontFamily: 'Lato, sans-serif', letterSpacing: '0.05em' }}
        >
          CALL AN EXPERT
        </Link>
        <Link
          to="/questionnaire"
          className="pointer-events-auto flex-1 py-3 sm:py-4 bg-[#5E17EB] text-white text-xs sm:text-sm font-medium text-center shadow-lg hover:bg-[#4B12BD] transition-colors duration-200 leading-tight"
          style={{ fontFamily: 'Lato, sans-serif', letterSpacing: '0.05em' }}
        >
          IS AYURVEDA FOR ME?
        </Link>
      </div>
    );
  }

  // Desktop: slide-in animation
  const gap = 0;

  const maxTranslate =
    windowWidth / 2 -
    (leftWidth + rightWidth) / 2 -
    gap;

  // Magnetic easing: slow drift for the first 85%, rapid snap in the last 15%
  const magneticEase = (t) => {
    const snapStart = 0.85;
    const driftEnd = 0.3; // only 30% of distance covered in the first 85% of progress
    if (t <= snapStart) {
      return (t / snapStart) * driftEnd;
    }
    const zoneProgress = (t - snapStart) / (1 - snapStart); // 0→1 inside snap zone
    const snapped = 1 - Math.pow(1 - zoneProgress, 3); // ease-out cubic
    return driftEnd + snapped * (1 - driftEnd);
  };

  const scrollProgress = Math.min((scrollY * 0.6) / maxTranslate, 1);
  const rawProgress = Math.max(scrollProgress, autoConnectionProgress);
  const easedProgress = animationStarted ? magneticEase(rawProgress) : 0;
  const finalTranslate = easedProgress * maxTranslate;

  const leftTranslate = buttonsVisible ? finalTranslate : -leftWidth;
  const rightTranslate = buttonsVisible ? -finalTranslate : rightWidth;

  const connectionThreshold = maxTranslate * 0.85;
  const connectionComplete = maxTranslate * 0.98;

  const connectionProgress =
    finalTranslate >= connectionThreshold
      ? Math.min(
          (finalTranslate - connectionThreshold) /
            (connectionComplete - connectionThreshold),
          1
        )
      : 0;

  const isConnected = connectionProgress >= 0.5;

  return (
    <div className="fixed inset-x-0 z-50 pointer-events-none">
      <Link
        ref={leftBtnRef}
        to="/consultation"
        className={`fixed left-0 pointer-events-auto px-8 py-4 sm:px-12 sm:py-6 bg-[#fdbb3a] text-white text-lg sm:text-xl font-medium shadow-lg hover:bg-yellow-500 hover:text-black transition ${
          isConnected
            ? "rounded-l-3xl border-r border-white/50"
            : "rounded-3xl"
        }`}
        style={{
          bottom: "2rem",
          transform: `translateX(${leftTranslate}px)`,
          opacity: buttonsVisible ? 1 : 0,
          transition: "transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease"
        }}
      >
        CALL AN EXPERT
      </Link>

      <Link
        ref={rightBtnRef}
        to="/questionnaire"
        className={`fixed right-0 pointer-events-auto px-8 py-4 sm:px-12 sm:py-6 bg-[#5E17EB] text-white text-lg sm:text-xl font-medium shadow-lg hover:bg-blue-500 hover:text-black transition ${
          isConnected ? "rounded-r-3xl" : "rounded-3xl"
        }`}
        style={{
          bottom: "2rem",
          transform: `translateX(${rightTranslate}px)`,
          opacity: buttonsVisible ? 1 : 0,
          transition: "transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease"
        }}
      >
        IS AYURVEDA FOR ME?
      </Link>
    </div>
  );
}