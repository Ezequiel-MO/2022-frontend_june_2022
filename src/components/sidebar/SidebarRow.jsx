import { Icon } from "@iconify/react";
import { useState } from "react";
import { Link } from "react-scroll";
import ReactTooltip from "react-tooltip";
import { useActiveTab } from "../../context/ActiveTabProvider";
import { useCurrentProject } from "../../hooks/useCurrentProject";

function SidebarRow({ iconText, title, modal = false, handleOpen }) {
  const [hotelOpen, setHotelOpen] = useState(false);
  const { currentProject } = useCurrentProject();
  const { hotels } = currentProject;
  const { activeTab, setActiveTab } = useActiveTab();
  if (modal) {
    return (
      <div
        data-for="main"
        data-tip={title}
        data-iscapture="true"
        className="flex items-center space-x-2 px-4 py-3 rounded-full hover:bg-green-50 cursor-pointer transition-all duration-200 group"
        onClick={() => handleOpen(`${title}`)}
      >
        <Icon icon={iconText} color="#ea5933" width="40" />
        <p className="group-hover:text-orange-50 hidden md:inline-flex text-base lg:text-lg">
          {title.replace(/^\w/, (c) => c.toUpperCase())}
        </p>
        <ReactTooltip id="main" />
      </div>
    );
  }
  return (
    <>
      <Link
        to={`${title}_id`}
        spy={true}
        smooth={true}
        duration={500}
        offset={-100}
        className="flex items-center space-x-2 px-4 py-3 rounded-full hover:bg-green-50 cursor-pointer transition-all duration-200 group"
        onMouseEnter={() =>
          title === "hotels" ? setHotelOpen(true) : setHotelOpen(false)
        }
        onMouseLeave={() => setHotelOpen(false)}
      >
        <div
          className="flex-shrink-0"
          data-for="main"
          data-tip={title}
          data-iscapture="true"
        >
          <Icon icon={iconText} color="#ea5933" width="40" />
        </div>
        <p className="group-hover:text-orange-50 hidden md:inline-flex text-base lg:text-lg">
          {title.replace(/^\w/, (c) => c.toUpperCase())}
        </p>
        <ReactTooltip id="main" />
      </Link>
      {hotelOpen ? (
        <div
          className="flex flex-col space-y-4 p-4 ml-4"
          onMouseEnter={() => setHotelOpen(true)}
          onMouseLeave={() => setHotelOpen(false)}
        >
          {hotels?.map((hotel, index) => (
            <p
              onClick={() => setActiveTab(index + 1)}
              key={index}
              className={`${
                activeTab === index + 1 ? "text-orange-50" : ""
              } hover:text-orange-50 hover:cursor-pointer hidden md:inline-flex text-sm lg:text-base`}
            >
              {hotel.name.replace(/^\w/, (c) => c.toUpperCase())}
            </p>
          ))}
        </div>
      ) : null}
    </>
  );
}

export default SidebarRow;
