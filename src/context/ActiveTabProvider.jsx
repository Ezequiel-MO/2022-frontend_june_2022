import { createContext, useContext, useState } from "react";

const ActiveTabContext = createContext({});

export const useActiveTab = () => useContext(ActiveTabContext);

export const ActiveTabContextProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <ActiveTabContext.Provider value={{ setActiveTab, activeTab }}>
      {children}
    </ActiveTabContext.Provider>
  );
};
