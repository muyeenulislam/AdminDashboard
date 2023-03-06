"use client";

import { Fragment, useContext, useEffect, useState } from "react";
import { useRouter, redirect } from "next/navigation";
import Link from "next/link";
import { BehaviorSubject } from "rxjs";

import { UserContext } from "@/lib/context";

import { Menu, Transition, Popover } from "@headlessui/react";
import {
  Bars3CenterLeftIcon,
  ChevronDownIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

export default function TopBar({ showNav, setShowNav }) {
  const router = useRouter();

  const { user, company } = useContext(UserContext);

  const [userImage, setUserImage] = useState("");
  const [username, setUsername] = useState("");

  const userSubject = new BehaviorSubject(getUserDetails());
  const companySubject = new BehaviorSubject(getCompanyDetails());

  useEffect(() => {
    try {
      if (user.id) {
        let uImage = "/images/person.png";
        if (user.user_img) {
          uImage = process.env.FILE_BASE_URI + "" + user.user_img;
        }
        setUserImage(uImage);
      }
    } catch (error) {}
  }, []);

  setTimeout(function () {
    const u = user != null ? user.first_name + " " + user.last_name : "";
    setUsername(u);
  }, 100);

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("company");
    userSubject.next(null);
    companySubject.next(null);

    redirect("/login");
  }

  function getUserDetails() {
    try {
      return (
        typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem("user"))
      );
    } catch (err) {
      console.error("Error:" + err.console);
    }
  }

  function getCompanyDetails() {
    try {
      return (
        typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem("company"))
      );
    } catch (err) {
      message.error("Error:" + err.message);
    }
  }

  return (
    <div
      className={`fixed w-full h-16 bg-white flex justify-between items-center transition-all duration-[400ms] ${
        showNav ? "pl-56" : ""
      }`}
    >
      <div className="pl-4 md:pl-16">
        <Bars3CenterLeftIcon
          className="h-10 w-10 text-[#0EA8E1] cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        />
      </div>
      <div className="flex items-center pr-4 md:pr-16">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center items-center">
              <picture>
                <img
                  src={userImage}
                  className="rounded-full h-8 w-8 md:mr-4 border-2 border-white shadow-sm"
                  alt="profile picture"
                />
              </picture>
              <span className="hidden md:block font-medium text-gray-700">
                {username}
              </span>
              <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-700" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration=75"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white rounded shadow-lg">
              <div className="p-1">
                <Menu.Item>
                  <p className="text-sm p-4 text-center">{username}</p>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    href="#"
                    className="flex  hover:bg-[#4fa2e2] hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                  >
                    <Cog8ToothIcon className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    href=""
                    onClick={logout}
                    className="flex  hover:bg-[#4fa2e2] hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                  >
                    {/* <LogoutSvg className="h-4 w-4 mr-2 text-black" /> */}
                    <FontAwesomeIcon
                      icon={faSignOut}
                      className="h-4 w-4 mr-2"
                    />
                    Logout
                  </Link>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
