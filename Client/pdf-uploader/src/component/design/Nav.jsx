import React from "react";
import { useSelector } from "react-redux";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const logout = useLogout();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.loginData);
  console.log(userInfo);

  const handleClick = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <nav className="bg-[#ffff] p-3 shadow-xl sticky top-0 z-10 overflow-hidden">
        <div className=" flex items-center justify-between  md:w-[90%] md:mx-auto ">
          <div className="  flex justify-between  gap-x-6 lg:gap-x-10">
            <div className="flex items-center  md:gap-5 lg:gap-7 ">
              <img
                src={require("../assets/pexels-realtoughcandycom-11035472-removebg-preview.png")}
                alt="home-logp"
                className="w-[25px] h-[25px] md:w-[35px] md:h-[35px] lg:w-[80px] lg:h-[60px] object-cover"
              />
              <p className="text-[#3189b6] text-xs md:text-xl lg:text-2xl font-bold ml-2 ">
                Pdf- <span className="text-[#1AACAC]">Uploader</span>
              </p>

              <ul className="flex gap-x-3 md:gap-x-7 text-xs md:text-lg font-medium m-2  ml-10">
                <li>Home</li>
                <li>Edit</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-x-5">
            <div className="text-xl font-semibold">
              <p className="text-sm mt-1 md:text-xl">
                {userInfo ? userInfo.firstName : "Login"}
              </p>
            </div>
            <div class=" text-xl md:text-3xl">
              <ion-icon name="person-circle-outline"></ion-icon>
            </div>
            <div>
              <button
                onClick={()=>handleClick()}
                className="bg-[#3981b6] p-1 md:p-2 w-[50px] md:w-[90px] rounded-2xl shadow-md text-white text-xs md:text-lg font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
