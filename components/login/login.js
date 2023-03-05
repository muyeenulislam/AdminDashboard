"use client";
import { useState } from "react";

import LoginNavbar from "./loginNavbar";
import LoginPhoto from "./loginPhoto";
import FormInput from "./formInput";
import Modal from "../modal/modal";

export default function LoginPage() {
  const [isModalVisible, setModalVisible] = useState(false);
  const modalData = (data) => {
    console.log(data);
    setModalVisible(data);
  };
  return (
    <div className="bg-loginBanner bg-cover bg-no-repeat">
      {isModalVisible ? (
        <Modal title="Email or Password Incorrect" ok="Ok" visibility={true} />
      ) : (
        ""
      )}
      <LoginNavbar />
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative flex flex-col m-6 space-y-10 bg-white bg-opacity-[0.6] backdrop-blur-xl shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0">
          <div className="p-6 md:p-20 justify-center text-center">
            <LoginPhoto />
            <FormInput
              email={true}
              password={true}
              recaptcha={true}
              modal={modalData}
              type="Login"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
