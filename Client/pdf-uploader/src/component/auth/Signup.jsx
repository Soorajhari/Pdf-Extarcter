import React, { useEffect, useState } from "react";
import { FaRegEnvelope } from "react-icons/fa";
// import {FaRegEnvelope} from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUpData, setError, setLoading } from "../../redux/userDetails";
import instance from "../../utils/axios";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  };
  const [userData, setUserData] = useState(initialState);
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const { firstName, lastName, email, mobile, password, confirmPassowrd } =
    userData;

  console.log(userData);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    dispatch(setLoading({ type: "SET_LOADING", payload: true }));
    try {
      e.preventDefault();

      setError(validate(userData));
      setIsSubmit(true);

      if (Object.keys(error).length === 0) {
        const response = await instance.post("/signup", {
          userData,
        });
        console.log(response.data);
        if (response.data.status == "ok") {
          dispatch(signUpData(userData));
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error.message);
      dispatch(setError({ type: "ERROR", payload: true }));
    } finally {
      dispatch(setLoading({ type: "SET_LOADING", payload: false }));
    }
  };
  function validate(values) {
    const errors = {};
    const regex = /^[a-zA-Z]{3,16}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;
    if (values.firstName.length < 2) {
      errors.firstName = "name is too short";
    } else if (!values.firstName.match(regex)) {
      errors.firstName = "Invalid form first name can be 3 to 16 characters ";
    }
    if (!emailRegex.test(values.email)) {
      errors.email = "Invalid form write a valid email";
    }

    if (!mobileRegex.test(values.mobile)) {
      errors.mobile = "please enter a valid mobile number";
    }
    if (values.password.length < 8) {
      errors.password = "Weak password. Please choose a stronger password.";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "password do not match ,please try again";
    }

    return errors;
  }

  console.log(error);

  return (
    <div className="flex  font-[Ubuntu]  justify-center items-center min-h-screen">
      <div className="w-[600px] md:w-[950px] md:h-[600px]  h-[850px]  flex flex-row rounded-2xl shadow-xl overflow-hidden md:overflow-auto   ">
        <div className="w-full md:w-3/5 bg-[#ffff] p-4  backdrop-filter backdrop-blur-sm bg-opacity-10">
          <h4 className="text-lg font-semibold ml-3 mt-5 drop-shadow-2xl shadow-black text-[#3981b6]">
            Pdf<span className="text-[#1AACAC]"> Uploader</span>
          </h4>

          <h5 className=" text-center text-xl font-semibold p-2 mt-3 drop-shadow-2xl shadow-black text-[#3981b6]">
            Welcome to Pdf-<span className="text-[#1AACAC]">Uploader</span>
          </h5>
          <form
            action=""
            className=""
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="flex flex-col items-center md:flex-row justify-center gap-x-6 ">
              <div>
                <div className="bg-[#ECF8F9] w-60  max-w-xs p-2 flex items-center mt-6  md:mt-10 shadow-lg ">
                  <FaRegEnvelope className="text-gray-400 m-2" />
                  <input
                    type="firstanme"
                    name="firstName"
                    placeholder="First Name"
                    className="bg-[#ECF8F9] outline-none flex-1 "
                    autoFocus
                    onChange={handleChangeInput}
                    errorMessage="user"
                    required
                    value={userData.firstName}
                  />
                </div>
                {error.firstName && (
                  <div
                    className="text-center mt-2 text-xs font-thin md:text-base"
                    style={{ color: "red" }}
                  >
                    {error.firstName}
                  </div>
                )}
              </div>

              <div className="bg-[#ECF8F9] w-60 max-w-xs p-2 flex items-center mt-6 md:mt-10  shadow-lg ">
                <FaRegEnvelope className="text-gray-400 m-2" />
                <input
                  type="lastname"
                  name="lastName"
                  placeholder="Last Name"
                  className="bg-[#ECF8F9] outline-none flex-1"
                  onChange={handleChangeInput}
                  // required
                  value={lastName}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col items-center md:flex-row justify-center gap-x-6  ">
              <div>
                <div className="bg-[#ECF8F9] w-60  max-w-xs p-2 flex items-center mt-6 md:mt-10 shadow-lg ">
                  <FaRegEnvelope className="text-gray-400 m-2" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="bg-[#ECF8F9] outline-none flex-1 "
                    onChange={handleChangeInput}
                    // required
                    value={userData.email}
                    required
                  />
                </div>

                <div
                  className="text-center mt-2 text-xs font-thin md:text-base"
                  style={{ color: "red" }}
                >
                  {error.email}
                </div>
              </div>

              <div>
                <div className="bg-[#ECF8F9] w-60 max-w-xs p-2 flex items-center mt-6 md:mt-10 shadow-lg ">
                  <FaRegEnvelope className="text-gray-400 m-2" />
                  <input
                    type="mobile"
                    name="mobile"
                    placeholder="Phone"
                    className="bg-[#ECF8F9] outline-none flex-1"
                    onChange={handleChangeInput}
                    // required
                    value={mobile}
                    required
                  />
                </div>
                <div
                  className="text-center mt-2 text-xs font-thin md:text-base"
                  style={{ color: "red" }}
                >
                  {error.mobile}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center md:flex-row justify-center gap-x-6  ">
              <div>
                <div className="bg-[#ECF8F9] w-60  max-w-xs p-2 flex items-center  mt-6 md:mt-10 shadow-lg ">
                  <FaRegEnvelope className="text-gray-400 m-2" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="bg-[#ECF8F9] outline-none flex-1 "
                    onChange={handleChangeInput}
                    // required
                    value={password}
                    required
                  />
                </div>
                <div
                  className="text-center mt-2 text-xs font-thin md:text-base"
                  style={{ color: "red" }}
                >
                  {error.password}
                </div>
              </div>
              <div>
                <div className="bg-[#ECF8F9] w-60 max-w-xs p-2 flex items-center  mt-6 md:mt-10 shadow-lg ">
                  <FaRegEnvelope className="text-gray-400 m-2" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="bg-[#ECF8F9] outline-none flex-1"
                    // required
                    onChange={handleChangeInput}
                    value={confirmPassowrd}
                  />
                </div>
                <div
                  className="text-center mt-2 text-sm  font-thin md:text-base"
                  style={{ color: "red" }}
                >
                  {error.confirmPassword}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-10 mr-10">
              {/* <Link to='/describe'> */}
              <button className="border bg-[#3981b6] p-3 w-[130px] rounded-full text-base text-white font-semibold hover:bg-white hover:text-[#3981b6] ">
                SignUp
              </button>
              {/* </Link> */}
            </div>
          </form>

          <div className="flex  justify-end mr-10 mt-5 gap-2">
            <p className="text-gray-700">Already have an account ?</p>
            <Link to={"/login"}>
              <p className="text-lg text-[#3981b6] font-semibold">Sign In</p>
            </Link>
          </div>
        </div>

        <div className="  w-2/5 bg-gradient-to-t from-[#98E4FF] to-[#6499E9] rounded-tr-2xl rounded-br-2xl hidden md:flex items-center">
          <img
            src={require("../assets/3323585-removebg-preview.png")}
            alt="img"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
