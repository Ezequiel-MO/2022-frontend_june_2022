import header_image from "../assets/header_image.jpg";
import cutt_logo from "../assets/CUTT_LOGO.png";
import Leo from "../assets/leo.jpg";
import sun from "../assets/sun-svgrepo-com.svg";
import moon from "../assets/moon-svgrepo-com.svg";
import switch_off from "../assets/switch_off.svg";
import { Link } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";
import { useUserLog } from "../hooks/useUserLog";

const Header = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const { logUserOut } = useUserLog();

  const log_out = () => {
    localStorage.removeItem("userIsLogged");
    logUserOut();
  };

  return (
    <div className="relative h-32 m-8 overflow-hidden bg-black-50 dark:bg-white-50 rounded-lg">
      <div className="absolute z-30 flex w-full h-full">
        <div className="relative z-30 w-5/6 px-6 py-8 text-white md:py-10 md:w-1/2">
          <Link to="/">
            <img
              alt="front-end header"
              className="object-cover h-6"
              src={cutt_logo}
            />
          </Link>
        </div>
        <div
          className="absolute top-20 left-5 z-50 cursor-pointer"
          onClick={log_out}
        >
          <img
            className="w-10 h-10 rounded-full transition-all duration-500 ease-out hover:scale-105"
            src={isDarkMode ? switch_off : switch_off}
            alt="light/dark mode"
          />
        </div>
        <div className="absolute top-0 right-0 flex w-full h-full">
          <div className="w-1/3 h-full bg-white-50"></div>
          <div className="relative w-1/3">
            <svg
              fill="currentColor"
              viewBox="0 0 100 100"
              className="absolute inset-y-0 z-20 h-full text-white-50"
            >
              <polygon id="diagonal" points="0,0 100,0 50,100 0,100"></polygon>
            </svg>
            <svg
              fill="currentColor"
              viewBox="0 0 100 100"
              className="absolute inset-y-0 z-10 h-full ml-6 text-white opacity-50"
            >
              <polygon points="0,0 100,0 50,100 0,100"></polygon>
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-10 w-9/12 h-full">
        <img
          alt="Backoffice header"
          className="object-cover h-full min-w-full"
          src={header_image}
        />
      </div>
      <div className="absolute top-1 right-2 z-50 cursor-pointer">
        <img
          className="w-16 h-16 rounded-full transition-all duration-500 hover:scale-105 "
          src={Leo}
          alt="Rounded avatar"
        />
      </div>
      <div
        className="absolute top-20 right-5 z-50 cursor-pointer"
        onClick={toggleDarkMode}
      >
        <img
          className="w-10 h-10 rounded-full transition-all duration-500 ease-out hover:rotate-180"
          src={isDarkMode ? moon : sun}
          alt="light/dark mode"
        />
      </div>
    </div>
  );
};

export default Header;
