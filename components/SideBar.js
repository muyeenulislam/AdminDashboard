"use client";

import { useState, forwardRef } from "react";
import Link from "next/link";
import { HomeIcon, CreditCardIcon, UserIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";

const SideBar = forwardRef(({ showNav }, ref) => {
  const pathname = usePathname();
  const [menuList, setMenu] = useState([]);
  const [firstCall, setFirstCall] = useState(false);

  let menu = [];

  menu.push(
    <Link href="/">
      <div
        key="/"
        className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
          pathname == "/"
            ? "border-solid border-2 border-white text-white rounded-xl bg-[#4791CB]"
            : "text-white hover:bg-[#4fa2e2] hover:text-white"
        }`}
      >
        <div className="mr-2">
          <HomeIcon className="h-5 w-5" />
        </div>
        <div>
          <p>Home</p>
        </div>
      </div>
    </Link>
  );
  menu.push(
    <Link href="/employees">
      <div
        key="/employees"
        className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
          pathname == "/employees"
            ? "border-solid border-2 border-white text-white rounded-xl bg-[#4791CB]"
            : "text-white hover:bg-[#4fa2e2] hover:text-white"
        }`}
      >
        <div className="mr-2">
          <UserIcon className="h-5 w-5" />
        </div>
        <div>
          <p>Employees</p>
        </div>
      </div>
    </Link>
  );

  return (
    <div
      ref={ref}
      className="fixed w-56 h-full bg-gradient-to-b from-[#3A7EC1] to-[#0EA8E1] shadow-sm"
    >
      <div className="flex flex-col justify-center text-center mt-6 mb-14">
        <div className="flex justify-center pt-11 pb-6 ml-auto mr-auto ">
          <picture>
            <img
              className="w-20 h-auto border-solid border-2 border-white rounded-full"
              src="/ezwage.png"
              alt="company logo"
            />
          </picture>
        </div>
        <div>
          <p className="text-white">Hello 👋</p>
          <h1 className="text-white text-xl font-bold pr-4 pl-4">
            Company Name
          </h1>
        </div>
      </div>
      <div className="flex flex-col">{menu}</div>
    </div>
  );
});

SideBar.displayName = "SideBar";
export default SideBar;
