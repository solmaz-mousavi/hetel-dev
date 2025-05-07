import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const StaticDataContext = createContext({});

function StaticDataProvider({ children }) {
  const [staticData, setStaticData] = useState(null);

  useEffect(() => {
    axios
      .get("/aseman-hotel/staticDatas/staticDB.json")
      .then((res) => setStaticData(res.data));
  }, []);

  return (
    <StaticDataContext.Provider
      value={{
        staticData,
      }}
    >
      {children}
    </StaticDataContext.Provider>
  );
}

export default StaticDataProvider;
