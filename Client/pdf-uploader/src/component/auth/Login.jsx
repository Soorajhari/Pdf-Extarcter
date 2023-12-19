import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import instance from "../../utils/axios";
import { FaRegEnvelope } from "react-icons/fa";
import {  signInData } from "../../redux/userLogin";
import { storageUserLoginData } from "../../functions/localStorage";

const Login = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = localStorage.getItem("userDetails");
    if (userInfo) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const body = {
        email,
        password,
      };
      const response = await instance.post("/login", body, { // passing details to the backedn route
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      const details = {        
        firstName: response.data.firstName,
        email: response.data.email,
        id: response.data._id,
        accesstoken: response.data.accesstoken,
        refreshtoken: response.data.refreshtoken,
      };
      if (response.data.status === "ok") {
        storageUserLoginData(details);// set in the local storage
        dispatch(signInData(details));// set in the redux store

        navigate("/home");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(email, password);

  return (
    <div className=" flex    font-[Ubuntu] min-h-screen justify-center w-full items-center text-center px-20">
      {/* <form > */}
      <div className="bg-white w-[600px] md:w-[700px] lg:w-2/3 max-w-4xl h-[520px] md:h-[480px] rounded-2xl shadow-2xl flex flex-row">
        <div className=" w-full  md:w-3/5  p-5">
          <div className="text-left font-bold text-lg ">
            <h2 className="text-[#3981b6]">
              Pdf-<span className="text-[#1AACAC]">Uploader</span>
            </h2>
          </div>
          <div className="py-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#3981b6] mb-2">
              Sign in to Account
            </h2>
            <div className="border-2 w-10 border-[#3981b6] inline-block mb-2"></div>
            <div className="flex justify-center my-2"></div>
            <p className="text-red-500 text-sm font-thin my-3"> {error} </p>
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-4 ">
                <FaRegEnvelope className="text-gray-400 m-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="bg-gray-100 outline-none flex-1"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-3  ">
                <FaRegEnvelope className="text-gray-400 m-2" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="bg-gray-100 outline-none flex-1"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <p className="mb-3 md:hidden">
                  Not a member ?
                  <Link to={"/signup"}>
                    <span className="text-red-400 p-2 font-medium">
                      Sign up
                    </span>
                  </Link>
                </p>
              </div>
              <button
                type="submit"
                className="border-2 border-[#3981b6] rounded-full px-12 py-2 inline-block font-semibold hover:bg-[#3981b6] hover:text-white"
                onClick={(e) => handleSubmit(e)}
              >
                SignIn
              </button>
            </div>
          </div>
        </div>

        <div className=" hidden md:block  w-2/5 bg-[#3981b6] text-white rounded-tr-2xl rounded-br-2xl py-36 px-12 ">
          <h2 className="text-3xl font-bold mb-2">Hello, Friend</h2>
          <div className="border-2 w-10 border-white inline-block mb-2"></div>
          <p className="mb-10">
            Fill up personal information and start the journey with us
          </p>
          <Link to={"/signup"}>
            <a
              href="#/"
              className=" border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-[#3981b6]"
            >
              SignUp
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
