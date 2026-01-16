import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";

export default function FloatingCTAButtons({
  scrollY = 0,
  windowWidth = window.innerWidth,
  buttonsVisible = true,
  autoConnectionProgress = 0
}) {
  // ===== REFS =====
  const leftBtnRef = useRef(null);
  const rightBtnRef = useRef(null);



  const [animationStarted, setAnimationStarted] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => {
    setAnimationStarted(true);
  }, 1200); // ⏳ delay in ms (adjust as needed)

  return () => clearTimeout(timer);
}, []);


  // ===== WIDTH STATE =====
  const [leftWidth, setLeftWidth] = useState(0);
  const [rightWidth, setRightWidth] = useState(0);

  // ===== DEVICE CHECK =====
  const isMobile = windowWidth < 640;

  // ===== MEASURE BUTTON WIDTHS =====
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
  

  // ===== TRANSLATION LOGIC =====
  const gap = 0;

  // const maxTranslate =
  //   windowWidth / 2 - leftWidth / 2 - gap;

  const maxTranslate =
  windowWidth / 2 -
  (leftWidth + rightWidth) / 2 -
  gap;


  const scrollTranslate = Math.min(scrollY * 0.6, maxTranslate);
  const autoTranslate = autoConnectionProgress * maxTranslate;

  // const finalTranslate = Math.max(scrollTranslate, autoTranslate);
  const finalTranslate = animationStarted
  ? Math.max(scrollTranslate, autoTranslate)
  : 0;


  const leftTranslate = buttonsVisible ? finalTranslate : -leftWidth;
  const rightTranslate = buttonsVisible ? -finalTranslate : rightWidth;
  

  // ===== CONNECTION LOGIC =====
  const connectionThreshold = maxTranslate * 0.8;
  const connectionComplete = maxTranslate * 0.8;

  const connectionProgress =
    finalTranslate >= connectionThreshold
      ? Math.min(
          (finalTranslate - connectionThreshold) /
            (connectionComplete - connectionThreshold),
          1
        )
      : 0;

  const isConnected = !isMobile && connectionProgress >= 0.5;
  const shouldMoveToBottom = isConnected && scrollY > 100;

  // ===== RENDER =====
  return (
    <div className="fixed inset-x-0 z-50 pointer-events-none">
      {shouldMoveToBottom ? (
        /* ===== CONNECTED BOTTOM STATE ===== */
        <div
          className="fixed left-1/2 flex items-center ml-6"
          style={{
            bottom: "2rem",
            transform: "translateX(-50%)",
            opacity: buttonsVisible ? 1 : 0,
            transition: "opacity 0.4s ease, bottom 0.4s ease"
          }}
        >
          <Link
            to="/consultation"
            className="pointer-events-auto px-8 py-4 sm:px-12 sm:py-6 bg-[#fdbb3a] text-white text-lg sm:text-xl font-medium shadow-lg rounded-l-2xl border-r border-white/50 hover:bg-yellow-500 hover:text-black transition"
          >
            CALL AN EXPERT
          </Link>

          <Link
            to="/questionnaire"
            className="pointer-events-auto px-8 py-4 sm:px-12 sm:py-6 bg-[#5E17EB] text-white text-lg sm:text-xl font-medium shadow-lg rounded-r-2xl hover:bg-blue-500 hover:text-black transition"
          >
            IS AYURVEDA FOR ME?
          </Link>
        </div>
      ) : (
        /* ===== SEPARATE TOP STATE ===== */
        <>
  <Link
    ref={leftBtnRef}
    to="/consultation"
    className={`fixed left-0 pointer-events-auto px-8 py-4 sm:px-12 sm:py-6 bg-[#fdbb3a] text-white text-lg sm:text-xl font-medium shadow-lg hover:bg-yellow-500 hover:text-black transition ${
      isConnected
        ? "rounded-l-3xl border-r border-white/50"
        : "rounded-3xl"
    }`}
    style={{
      top: "80vh",
      transform: `translateX(${isConnected ? maxTranslate : leftTranslate}px)`,
      opacity: buttonsVisible ? 1 : 0,
      transition: "transform 5s ease, opacity 0.4s ease"
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
      top: "80vh",
      transform: `translateX(${isConnected ? -maxTranslate : rightTranslate}px)`,
      opacity: buttonsVisible ? 1 : 0,
      transition: "transform 5s ease, opacity 0.4s ease"
    }}
  >
    IS AYURVEDA FOR ME?
  </Link>
</>


      )}
    </div>
  );
}
