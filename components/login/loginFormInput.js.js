"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSpinner } from "@fortawesome/free-solid-svg-icons";

import { userService } from "@/services";

export default function LoginFormInput({}) {
  const [isRecaptcha, setRecaptcha] = useState(false);
  const [isRecaptchaValue, setRecaptchaValue] = useState("");
  const [isValidRecaptcha, setValidRecaptcha] = useState(false);

  const [isEmail, setEmail] = useState("");
  const [isValidEmail, setValidEmail] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);

  const [isPassword, setPassword] = useState("");
  const [isValidPassword, setValidPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const emailValidation = (e) => {
    setEmail("");

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;

    if (e.target.value.length > 5) {
      if (!e.target.value.match(emailRegex)) {
        setValidEmail("Enter valid Email");
        setCheckEmail(false);
      } else {
        setValidEmail("");
        setEmail(e.target.value);
        setCheckEmail(true);
      }
    }
  };

  const passwordValidation = (e) => {
    setPassword("");

    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w.~@#$%^&*+=`|{}:;!,?\"()\[\]-]{8,}$/;

    if (e.target.value.length > 5) {
      if (!e.target.value.match(passwordRegex)) {
        setValidPassword("Enter valid Password");
        setCheckPassword(false);
      } else {
        setValidPassword("");
        setPassword(e.target.value);
        setCheckPassword(true);
      }
    }
  };

  const checkValues = async () => {
    setLoading(true);

    if (!isEmail) {
      setValidEmail("Email is required");
      setLoading(false);
    }
    if (!isPassword) {
      setValidPassword("Password is required");
      setLoading(false);
    }
    if (!isRecaptcha) {
      setValidRecaptcha("recaptcha is required");
      setLoading(false);
    }
    if (isRecaptcha === true) {
      let result = "";
      try {
        result = await userService.login(
          isEmail.toLowerCase(),
          isPassword,
          isRecaptchaValue
        );

        if (result.id) {
          router.push("/");
        } else {
          setLoading(false);
          setErrorMessage("email or password is invalid.");
        }
      } catch (error) {
        setLoading(false);
      }
    } else {
      console.log("confirm recaptha");
    }
  };
  return (
    <div className="w-[300px] md:w-[500px]">
      <form className="flex justify-center flex-col">
        {errorMessage ? (
          <p className="w-[50%] mx-auto p-3 bg-red-400 rounded-3xl placeholder:font-sans placeholder:font-light mb-2">
            {errorMessage}
          </p>
        ) : (
          ""
        )}
        <div className="mb-4">
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-3xl placeholder:font-sans placeholder:font-light mb-2 focus:outline-none focus:ring focus:ring-[#0EA8E1]"
            placeholder="Enter your email address"
            required
            onChange={emailValidation}
          />
          <p className="text-sm text-left text-red-500 mb-2">{isValidEmail}</p>
        </div>

        <div className="mb-4">
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-3xl placeholder:font-sans placeholder:font-light focus:outline-none focus:ring focus:ring-[#0EA8E1]"
            placeholder="Enter your Password"
            onChange={passwordValidation}
            required
          />
          <p className="text-sm text-left text-red-500 mb-2">
            {isValidPassword}
          </p>
        </div>

        <div className="mb-4">
          <ReCAPTCHA
            sitekey="6LfMrlckAAAAAGoHRYcUVwgks2KBwBalcrz5x1y8"
            onChange={(e) => {
              setRecaptcha(true);
              setRecaptchaValue(e);
            }}
          />
          <p className="text-sm text-left text-red-500 mb-2">
            {isValidRecaptcha}
          </p>
        </div>

        <button
          className="w-full md:w-auto flex justify-center items-center p-3 space-x-4 text-white rounded-full px-9 bg-[#0EA8E1] shadow-lg hover:bg-opacity-90 hover:shadow-lg border-none transition hover:-translate-y-0.5 duration-150"
          onClick={(e) => {
            e.preventDefault();
            checkValues();
          }}
        >
          <span>Login</span>
          {isLoading === true ? (
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
          ) : (
            <FontAwesomeIcon icon={faArrowRight} />
          )}
        </button>
      </form>

      <div className="font-sm text-[#0EA8E1] mr-4 ml-4 mt-4">
        Forgot password?
      </div>
    </div>
  );
}
