"use client";

import { useEffect, useRef } from "react";

export default function Modal({
  children,
  isOpen,
  closeAction,
}: Readonly<{
  children: React.ReactNode;
  isOpen: boolean;
  closeAction: (value: boolean) => void;
}>) {
  const $backdrop = useRef<HTMLDivElement>(null);
  const $dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const backdrop = $backdrop.current;
    const dialog = $dialog.current;
    if (dialog === null || backdrop === null) return;

    const handleClick = ({ target }: MouseEvent) => {
      if (target === backdrop) closeAction(false);
    };

    const handleKeyup = ({ key }: KeyboardEvent) =>
      key === "Escape" && isOpen ? closeAction(false) : null;

    backdrop.addEventListener("click", handleClick);
    document.addEventListener("keyup", handleKeyup);

    return () => {
      backdrop.removeEventListener("click", handleClick);
      document.removeEventListener("keyup", handleKeyup);
    };
  }, [isOpen, closeAction]);

  return (
    <div
      ref={$backdrop}
      className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        ref={$dialog}
        className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-neutral-700 shadow-md"
      >
        {children}
      </div>
    </div>
  );
}
