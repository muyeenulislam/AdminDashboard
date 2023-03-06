"use client";

import { useState, forwardRef, useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { userService } from "@/services";
import { UserContext } from "@/lib/context";
import { features } from "@/helper/constants";
import {
  HomeSvg,
  TransactionSvg,
  SupportSvg,
  EmpSvg,
  SettingSvg,
} from "@/icons/icons";

let error_displayed = 0;

const SideBar = forwardRef(({ showNav }, ref) => {
  const pathname = usePathname();
  const router = useRouter();

  const { user, company } = useContext(UserContext);

  const [menuList, setMenu] = useState([]);
  const [firstCall, setFirstCall] = useState(false);
  const [companyLogo, setCompanyLogo] = useState("");

  // const companyLogo =
  //   typeof window !== "undefined"
  //     ? `${process.env.FILE_BASE_URI}${
  //         JSON.parse(window.localStorage.getItem("user"))?.companyLogo
  //       }`
  //     : "";

  useEffect(() => {
    try {
      if (user.id) {
        let uImage = "/images/person.png";
        if (user.user_img) {
          uImage = process.env.FILE_BASE_URI + "" + user.companyLogo;
        }
        setCompanyLogo(uImage);
      }
    } catch (error) {}
  }, []);
  // User Menu Permissions
  setTimeout(function () {
    if (!user) {
      router.push("/login");
    } else if (user.roles) {
      // setCompanyLogo(`${process.env.FILE_BASE_URI}${user.companyLogo}`);
      let userMenu = user.roles.features;
      if (userMenu.length !== 0) {
        // Creating Options list for Bank List Dropdown
        let menus = [];
        for (let i = 0; i < userMenu.length; i++) {
          if (userMenu[i].name === "Web") {
            for (let m = 0; m < userMenu[i].features.length; m++) {
              let url = "";
              let icon = "";
              if (userMenu[i].features[m].name === features.transaction) {
                menus.push(
                  <Link href="/transactions" key="transactions">
                    <div
                      className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                        pathname == "/transactions"
                          ? "border-solid border-2 border-white text-white rounded-xl bg-[#4791CB]"
                          : "text-white hover:bg-[#4fa2e2] hover:text-white"
                      }`}
                    >
                      <div className="mr-2">
                        <TransactionSvg className="h-5 w-5" />
                      </div>
                      <div>
                        <p>{userMenu[i].features[m].name}</p>
                      </div>
                    </div>
                  </Link>
                );
              } else if (userMenu[i].features[m].name === features.company) {
                menus.push(
                  <Link href="/company" key="company">
                    <div
                      className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                        pathname == "/company"
                          ? "border-solid border-2 border-white text-white rounded-xl bg-[#4791CB]"
                          : "text-white hover:bg-[#4fa2e2] hover:text-white"
                      }`}
                    >
                      <div className="mr-2">
                        <HomeSvg className="h-5 w-5" />
                      </div>
                      <div>
                        <p>{userMenu[i].features[m].name}</p>
                      </div>
                    </div>
                  </Link>
                );
              } else if (userMenu[i].features[m].name === features.employees) {
                menus.push(
                  <Link href="/employees" key="employees">
                    <div
                      className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                        pathname == "/employees"
                          ? "border-solid border-2 border-white text-white rounded-xl bg-[#4791CB]"
                          : "text-white hover:bg-[#4fa2e2] hover:text-white"
                      }`}
                    >
                      <div className="mr-2">
                        <EmpSvg className="h-5 w-5" />
                      </div>
                      <div>
                        <p>{userMenu[i].features[m].name}</p>
                      </div>
                    </div>
                  </Link>
                );
              } else if (userMenu[i].features[m].name === features.home) {
                menus.push(
                  <Link href="/" key="home">
                    <div
                      className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                        pathname == "/"
                          ? "border-solid border-2 border-white text-white rounded-xl bg-[#4791CB]"
                          : "text-white hover:bg-[#4fa2e2] hover:text-white"
                      }`}
                    >
                      <div className="mr-2">
                        <HomeSvg className="h-5 w-5" />
                      </div>
                      <div>
                        <p>{userMenu[i].features[m].name}</p>
                      </div>
                    </div>
                  </Link>
                );
              } else if (userMenu[i].features[m].name === features.support) {
                menus.push(
                  <Link href="/support" key="support">
                    <div
                      className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                        pathname == "/support"
                          ? "border-solid border-2 border-white text-white rounded-xl bg-[#4791CB]"
                          : "text-white hover:bg-[#4fa2e2] hover:text-white"
                      }`}
                    >
                      <div className="mr-2">
                        <SupportSvg className="h-5 w-5" />
                      </div>
                      <div>
                        <p>{userMenu[i].features[m].name}</p>
                      </div>
                    </div>
                  </Link>
                );
              } else if (userMenu[i].features[m].name === features.settings) {
                menus.push(
                  <Link href="/settings" key="settings">
                    <div
                      className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                        pathname == "/settings"
                          ? "border-solid border-2 border-white text-white rounded-xl bg-[#4791CB]"
                          : "text-white hover:bg-[#4fa2e2] hover:text-white"
                      }`}
                    >
                      <div className="mr-2">
                        <SettingSvg className="h-5 w-5" />
                      </div>
                      <div>
                        <p>{userMenu[i].features[m].name}</p>
                      </div>
                    </div>
                  </Link>
                );
              } else if (userMenu[i].features[m].name === features.report) {
                menus.push(
                  <Link href="/reports" key="reports">
                    <div
                      className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                        pathname == "/reports"
                          ? "border-solid border-2 border-white text-white rounded-xl bg-[#4791CB]"
                          : "text-white hover:bg-[#4fa2e2] hover:text-white"
                      }`}
                    >
                      <div className="mr-2">
                        <SettingSvg className="h-5 w-5" />
                      </div>
                      <div>
                        <p>{userMenu[i].features[m].name}</p>
                      </div>
                    </div>
                  </Link>
                );
              } else if (
                userMenu[i].features[m].name === features.totalTransaction
              ) {
                menus.push(
                  <Link href="/total-transactions" key="total-transactions">
                    <div
                      className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                        pathname == "/total-transactions"
                          ? "border-solid border-2 border-white text-white rounded-xl bg-[#4791CB]"
                          : "text-white hover:bg-[#4fa2e2] hover:text-white"
                      }`}
                    >
                      <div className="mr-2">
                        <TransactionSvg className="h-5 w-5" />
                      </div>
                      <div>
                        <p>{userMenu[i].features[m].name}</p>
                      </div>
                    </div>
                  </Link>
                );
              } else if (
                userMenu[i].features[m].name === features.approvedTransactions
              ) {
                menus.push(
                  <Link href="/approvedTransactions" key="approvedTransactions">
                    <div
                      className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                        pathname == "/approvedTransactions"
                          ? "border-solid border-2 border-white text-white rounded-xl bg-[#4791CB]"
                          : "text-white hover:bg-[#4fa2e2] hover:text-white"
                      }`}
                    >
                      <div className="mr-2">
                        <TransactionSvg className="h-5 w-5" />
                      </div>
                      <div>
                        {/* <p>{userMenu[i].features[m].name}</p> */}
                        <p>Approved Tran...</p>
                      </div>
                    </div>
                  </Link>
                );
              }
            }
          }
        }
        setMenu(menus);
        setFirstCall(true);
      }
    } else {
      if (error_displayed === 0) {
        console.error(
          "You did not have any permission. Please contact with your admin."
        );
        userService.logout();
        error_displayed = 1;
      }
    }
  }, 500);

  return (
    <div
      ref={ref}
      className="fixed w-60 h-full bg-gradient-to-b from-[#3A7EC1] to-[#0EA8E1] shadow-sm overflow-y-auto"
    >
      <div className="flex flex-col justify-center text-center mt-6 mb-14">
        <div className="flex justify-center pt-11 pb-6 ml-auto mr-auto ">
          <picture>
            <img
              className="w-20 h-auto border-solid border-2 border-white rounded-full"
              src={companyLogo}
              alt=""
            />
          </picture>
        </div>
        <div>
          <p className="text-white">Hello 👋</p>
          <h1 className="text-white text-xl font-bold pr-4 pl-4">
            {company != null ? company.companyName : ""}
          </h1>
        </div>
      </div>
      <div className="flex flex-col">{menuList}</div>
    </div>
  );
});

SideBar.displayName = "SideBar";
export default SideBar;
