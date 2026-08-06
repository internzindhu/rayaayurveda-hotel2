import { Children, cloneElement, useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import "./TagWithTooltip.css";

/**
 * Wraps a single tag element (e.g. a Chip) with a hover/tap popover that
 * shows `definition`. If `definition` is empty, renders `children` untouched.
 */
export default function TagWithTooltip({ name, definition, children }) {
  const hasDefinition = typeof definition === "string" && definition.trim().length > 0;

  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ placement: "top", shiftX: 0 });
  const wrapperRef = useRef(null);
  const popoverRef = useRef(null);
  const popoverId = `tag-tooltip-${useId()}`;

  const computePosition = useCallback(() => {
    const trigger = wrapperRef.current;
    const popover = popoverRef.current;
    if (!trigger || !popover) return;

    const triggerRect = trigger.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();
    const margin = 8;

    const placement = triggerRect.top - popoverRect.height - margin < 0 ? "bottom" : "top";

    const center = triggerRect.left + triggerRect.width / 2;
    const half = popoverRect.width / 2;
    let shiftX = 0;
    if (center - half < margin) {
      shiftX = margin - (center - half);
    } else if (center + half > window.innerWidth - margin) {
      shiftX = window.innerWidth - margin - (center + half);
    }

    setPos({ placement, shiftX });
  }, []);

  useLayoutEffect(() => {
    if (!hasDefinition) return;
    computePosition();
    window.addEventListener("resize", computePosition);
    return () => window.removeEventListener("resize", computePosition);
  }, [hasDefinition, computePosition]);

  useEffect(() => {
    if (!hasDefinition || !open) return;
    function handleOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [open, hasDefinition]);

  if (!hasDefinition) {
    return children;
  }

  const child = Children.only(children);
  const trigger = cloneElement(child, {
    className: [child.props.className, "twt-tag"].filter(Boolean).join(" "),
  });

  const toggle = () => {
    computePosition();
    setOpen((o) => !o);
  };

  return (
    <span
      ref={wrapperRef}
      className={`twt-wrapper${open ? " twt-wrapper--open" : ""}`}
      onMouseEnter={computePosition}
      onClick={(e) => {
        e.stopPropagation();
        toggle();
      }}
      tabIndex={0}
      role="button"
      aria-expanded={open}
      aria-describedby={popoverId}
      aria-label={`${name} — show definition`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        } else if (e.key === "Escape") {
          setOpen(false);
        }
      }}
    >
      {trigger}
      <span
        ref={popoverRef}
        id={popoverId}
        role="tooltip"
        className={`twt-popover twt-popover--${pos.placement}`}
        style={{ "--twt-shift-x": `${pos.shiftX}px` }}
      >
        {definition}
      </span>
    </span>
  );
}
