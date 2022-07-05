import { useRef } from "react";
import { Icon } from "@iconify/react";
import ReactToPrint from "react-to-print";
import ScrollToTop from "react-scroll-to-top";
import Hotels from "./hotels/Hotels";
import Schedule from "./schedule/Schedule";
import { useCurrentProject } from "../hooks/useCurrentProject";
import Budget from "./budget/Budget";
import PartialCosts from "./budget/partial-costs/PartialCosts";

const MainSection = () => {
  const componentRef = useRef();

  const { currentProject } = useCurrentProject();
  const { groupName, projectIntro } = currentProject;

  return (
    <div className="col-span-10 lg:col-span-8">
      <ScrollToTop smooth color="#ea5933" width="30" height="30" />
      <h1 className="text-2xl md:text-2xl mb-4 font-extrabold">
        {`Quotation for Gr. ${groupName}`}
      </h1>
      <p className="text-black-50 dark:text-white-50">{projectIntro}</p>
      <Hotels />
      <Schedule />
      <div>
        <ReactToPrint
          trigger={() => (
            <button className="flex flex-row items-center mb-2">
              <span>
                <Icon
                  icon="ant-design:file-pdf-twotone"
                  color="#ea5933"
                  width="40"
                />
              </span>
              Print the Budget to a PDF
            </button>
          )}
          content={() => componentRef.current}
        />
        <Budget ref={componentRef} />
        <PartialCosts />
      </div>
    </div>
  );
};

export default MainSection;
