// import React from 'react';

import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Icon from "./Icon";


const Footer = () => {
  return (
    <footer className="bg-gray-300 text-[#1E3A8A]">
      {/* <div className="w-[45%] text-[40px] pt-[30px] pl-[80px]">
            <p>Explore infinite worlds between the pages.</p>
        </div> */}
      <div className=" mx-auto py-16 flex flex-col items-center sm:items-start sm:flex-row sm:justify-between">

        <div className=" flex justify-center flex-col items-center w-[100%] sm:w-[45%]">
          <h1 className="text-center text-xl font-bold mb-8 flex text-[30px] sm:text-[32px] text-blue-600">Contact Us</h1>
          <div className=" flex flex-col items-center justify-center gap-3 text-[12px] sm:text-[16px] sm:items-start">
            <div className=" relative sm:pl-[15px] w-[200px]">
              <i className="absolute text-[20px] left-[-30px] left-[-10px] transform -translate-y-1/ text-blue-600 ">
                <FontAwesomeIcon icon={faEnvelope} />
              </i>
              <p className="text-[16px]">book.shop@gmail.com</p>
            </div>
            <div className=" relative sm:pl-[15px] w-[200px]">
              <i className="absolute text-[20px] left-[-30px] left-[-10px] transform -translate-y-1/ text-blue-600 ">
                <FontAwesomeIcon icon={faPhone} />
              </i>
              <p className="text-[16px]">+20 12344567890</p>
            </div>
            <div className=" relative sm:pl-[15px] w-[200px]">
              <i className="absolute text-[20px] left-[-30px] left-[-10px] transform -translate-y-1/ text-blue-600 ">
                <FontAwesomeIcon icon={faLocationDot} />
              </i>
              <p className="text-[16px]">ADDRESS: Lorem ipsum dolo .</p>
            </div>
          </div>
        </div>



        <div className="relative mt-12 sm:mt-[0] w-[100%] sm:w-[45%]">
          <div className="absolute left-[8px] -ml-0.5 lg:w-0.5 h-[180px] top-[20px] bg-blue-600"></div>
          <h1 className="text-center text-xl font-bold mb-8 text-[30px] sm:text-[32px] text-blue-600">Follow Us</h1>
          <div className=" flex justify-center">
            <Icon />
          </div>
        </div>

      </div>
      <div className="copyrights mt-12">
        <p className="text-center text-white text-[12px] sm:text-[20px] bg-blue-600">
          © 2024 BOOKSHOP. ALL RIGHTS RESERVED
        </p>
      </div>
    </footer>
  );
};

export default Footer;
