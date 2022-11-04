import { createContext, useContext, useState } from "react";

const ActiveTabContext = createContext({});

export const useActiveTab = () => useContext(ActiveTabContext);

export const ActiveTabContextProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState(1);

  const [change, setChange] = useState(false);
  const handleChange = (index) => {
    setActiveTab(index);
    setChange(true);
    setTimeout(() => {
      setChange(false);
    }, 450);
  };

  return (
    <ActiveTabContext.Provider
      value={{ setActiveTab, activeTab, change, handleChange }}
    >
      {children}
    </ActiveTabContext.Provider>
  );
};
