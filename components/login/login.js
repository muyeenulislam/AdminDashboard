"use client";
import { useState } from "react";

import LoginNavbar from "./loginNavbar";
import LoginPhoto from "./loginPhoto";
import LoginFormInput from "./loginFormInput.js";

export default function LoginPage() {
  return (
    <div className="bg-loginBanner bg-cover bg-no-repeat">
      <LoginNavbar />
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative flex flex-col m-6 space-y-10 bg-white bg-opacity-[0.6] backdrop-blur-xl shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0">
          <div className="p-6 md:p-20 justify-center text-center">
            <LoginPhoto />
            <LoginFormInput />
          </div>
        </div>
      </div>
    </div>
  );
}
