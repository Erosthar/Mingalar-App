// Sidebar.js
import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
// import { MdOutlineDashboard } from "react-icons/md";
// import { RiSettings4Line } from "react-icons/ri";
// import { TbReportAnalytics } from "react-icons/tb";
// import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
// import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaRegListAlt } from "react-icons/fa";
import { FiGift } from "react-icons/fi";
import { IoMailOpenOutline } from "react-icons/io5";

import { Link } from "react-router-dom";

const Sidebar = ({ open, setOpen }) => {
  const menus = [
    { name: "Home", link: "/home", icon: IoHomeOutline },
    {
      name: "လက်ဖွဲ့ငွေထည့်သွင်းရန်",
      link: "/moneyInput",
      icon: RiMoneyDollarCircleLine,
      margin: true,
    },
    {
      name: "လက်ဖွဲ့ငွေစာရင်း",
      link: "/moneyInputList",
      icon: FaRegListAlt,
    },
    {
      name: "လက်ဖွဲ့ပစ္စည်းထည့်သွင်းရန်",
      link: "/itemInput",
      icon: FiGift,
      margin: true,
    },
    {
      name: "လက်ဖွဲ့ပစ္စည်းစာရင်း",
      link: "/itemInputList",
      icon: FaRegListAlt,
    },
    {
      name: "ဆက်သွယ်ရန်",
      link: "/contactUs",
      icon: IoMailOpenOutline,
      margin: true,
    },
    // { name: "Setting", link: "/setting", icon: RiSettings4Line, margin: true },
  ];

  return (
    <div
      className={`bg-[#0d7db1] min-h-screen ${
        open ? "w-72" : "w-16"
      } duration-500 text-gray-100 px-4`}
    >
      {/* <div className="py-3 flex justify-end">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div> */}

      <div className="flex items-center py-3 justify-between ">
        {open && <span>Mingalar</span>}
        {/* {open && <img src="" alt="Logo" className="w-20 h-20" />} */}
        <HiMenuAlt3
          size={26}
          className="cursor-pointer ml-2"
          onClick={() => setOpen(!open)}
        />
      </div>

      <div className="mt-4 flex flex-col gap-4 relative">
        {menus?.map((menu, i) => (
          <Link
            to={menu?.link}
            key={i}
            className={` ${
              menu?.margin && "mt-5"
            } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-slate-300 hover:text-black rounded-md`}
            onClick={() => setOpen(false)}
          >
            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
            <h2
              style={{
                transitionDelay: `${i + 3}00ms`,
              }}
              className={`whitespace-pre duration-300 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              {menu?.name}
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              {menu?.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
