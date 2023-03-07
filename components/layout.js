"use client";

import { useState, useEffect, Fragment, Suspense } from "react";
import { Transition } from "@headlessui/react";

import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Loading from "@/app/loading";

export default function DefaultLayout({ children }) {
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const handleSize = () => {
    if (innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  };

  useEffect(() => {
    if (typeof window != undefined) {
      addEventListener("resize", handleSize);
    }
    return () => {
      removeEventListener("resize", handleSize);
    };
  }, []);

  return (
    <main>
      <TopBar showNav={showNav} setShowNav={setShowNav} />
      <Transition
        as={Fragment}
        show={showNav}
        enter="transform transition duration-[400ms]"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <SideBar showNav={showNav} />
      </Transition>
      <Suspense fallback={<Loading />}>
        <main
          className={`pt-116 transition-all duration-[400ms] ${
            showNav && !isMobile ? "pl-60" : ""
          }`}
        >
          <div className="px-4 md:px-16">{children}</div>
        </main>
      </Suspense>
    </main>
  );
}
