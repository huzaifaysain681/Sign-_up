import React, { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaGlobeAfrica } from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import "./MainDiv.css";

function MainDiv() {
  const [showOptions, setShowOptions] = useState(false);
  const [arrowUp, setArrowUp] = useState(false);
  const [isTabletView, setIsTabletView] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTabletView(window.innerWidth <= 899);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
    setArrowUp(!arrowUp);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const validateForm = () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError("Email cannot be blank");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password cannot be blank");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
      isValid = false;
    } else if (password === email) {
      setPasswordError("Password cannot be the same as email");
      isValid = false;
    }

    if (!isCheckboxChecked) {
      setIsCheckboxChecked(false);
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted successfully");
    }
  };

  return (
    <div className="flex justify-center items-center main">
      <div className="flex flex-col md:flex-row w-full md:w-4/5 h-3/4 bg-gray-300 rounded-lg shadow-lg left">
        {!isTabletView && (
          <div className="w-full md:w-1/2 bg-black text-white p-8 flex justify-center items-center">
            <img
              src="image.webp"
              alt="Logo"
              className="max-h-full max-w-full"
            />
          </div>
        )}
        <div className="w-full md:w-1/2 bg-white p-2 rounded-l-lg flex flex-col right h-screen">
          <div className="flex items-center mb-6">
            <div className="flex items-center mr-2">
              <FaGlobeAfrica className="text-gray-700" />
              <select className="px-3 py-2 text-gray-700 focus:outline-none focus:shadow-outline bg-transparent hover:bg-gray-100">
                <option value="english">English</option>
                <option value="spanish">Español</option>
              </select>
            </div>
            <div className="ml-auto flex center items-center">
              <p className="txt text-gray-700 mr-2">Already have an account?</p>
              <button className="btn bg-transparent border border-gray-700 text-gray-700 font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline">
                Log in
              </button>
            </div>
          </div>
          <div className="content flex items-center text-center mb-5">
            <img src="logo.svg" alt="Typeform" className="w-14 p-2" />
            <p className="typo text-gray-700 flex">Typeform</p>
          </div>
          <p className="para text-center text-gray-700 mb-6">
            Get better data with conversational forms, surveys, quizzes & more.
          </p>
          <form className="form" onSubmit={handleSubmit}>
            <div className="mb-4 input">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className="shadow border rounded w-full py-2 px-3 leading-tight focus:shadow-outline"
                placeholder="Enter your email"
              />
              {emailError && (
                <span className="text-red-500 flex items-center">
                  <AiOutlineExclamationCircle className="mr-1" /> {emailError}
                </span>
              )}
            </div>
            <div className="mb-6 input">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
              />
              {passwordError && (
                <span className="text-red-500 flex items-center">
                  <AiOutlineExclamationCircle className="mr-1" /> {passwordError}
                </span>
              )}
            </div>
            <div className="mb-6 checkbox">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500 h-6 w-6"
                  checked={isCheckboxChecked}
                  onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                />
                <span className="ml-2 text-gray-700">
                  I agree to Typeform’s Terms of Service, Privacy Policy and
                  Data Processing Agreement.
                </span>
              </label>
              {!isCheckboxChecked && (
                <span className="text-red-500 flex items-center">
                  <AiOutlineExclamationCircle className="mr-1" /> Checkbox must be checked
                </span>
              )}
            </div>
            <div className="mb-6">
              <button
                className="flex items-center text-gray-700"
                onClick={handleToggleOptions}
              >
                <span>See Options</span>
                {arrowUp ? (
                  <FiChevronUp className="ml-1" />
                ) : (
                  <FiChevronDown className="ml-1" />
                )}
              </button>
              <div
                className={`transition-all duration-500 ${
                  showOptions
                    ? "opacity-100 max-h-screen"
                    : "opacity-0 max-h-0 overflow-hidden"
                }`}
              >
                                <div className="mb-4 mt-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Get useful tips, inspiration, and offers via e-communication.
                  </label>
                  <div className="flex items-center">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5"
                        name="communication"
                        value="yes"
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center ml-4">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5"
                        name="communication"
                        value="no"
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Tailor Typeform to my needs based on my activity.
                  </label>
                  <div className="flex items-center">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5"
                        name="tailor"
                        value="yes"
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center ml-4">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5"
                        name="tailor"
                        value="no"
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Enrich my data with select third parties for more relevant content.
                  </label>
                  <div className="flex items-center">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5"
                        name="enrich"
                        value="yes"
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center ml-4">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5"
                        name="enrich"
                        value="no"
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>
                <p className="text-gray-700 mb-2">
                  You can update your preferences in your Profile at any time
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-black text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
              >
                Create my free account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MainDiv;

