"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function TypingHero() {
  const el = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!el.current) return;

    const typed = new Typed(el.current, {
      strings: ["Learn", "Build", "Deploy"],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 3000,
      loop: true,
      showCursor: false,
      cursorChar: "|",
    });

    return () => {typed.destroy();};
  }, []);

  return (
    <h1 className="text-white text-7xl font-[800] mt-10 ml-10 leading-tight">
      <span ref={el}></span><span></span>
    </h1>
  );
}
