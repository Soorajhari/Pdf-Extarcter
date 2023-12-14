import React from "react";

const Nav = () => {
  return (
    <>
      <nav className="bg-[#ffff] p-3 shadow-xl sticky top-0 z-10 overflow-hidden">
        <div className=" flex items-center justify-between  md:w-[90%] md:mx-auto ">
          <div className="  flex justify-between gap-x-5 lg:gap-x-10">
            <div className="flex items-center gap-3 md:gap-5 lg:gap-7 ">
              <img
                src={require("../assets/pexels-realtoughcandycom-11035472-removebg-preview.png")}
                alt="home-logp"
                className="w-[25px] h-[25px] md:w-[35px] md:h-[35px] lg:w-[80px] lg:h-[60px] object-cover"
              />
              <p className="text-[#3189b6] text-base md:text-xl lg:text-2xl font-bold">
                Pdf- <span className="text-[#1AACAC]">Uploader</span>
              </p>

              <ul className="flex gap-x-6 md:gap-x-10 text-sm md:text-lg font-medium  ml-10">
                <li>Home</li>
                <li>Edit</li>
              </ul>
            </div>
          </div>

          <div class=" text-xl md:text-3xl">
            <ion-icon name="person-circle-outline"></ion-icon>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
