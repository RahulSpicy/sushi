import React from "react";

interface GlobalContextInterface {
  authenticated: boolean;
  checkedAuth: boolean;
}

export default React.createContext<GlobalContextInterface | any>({
  authenticated: false,
  checkedAuth: false, // Whether your auth has been checked or not
});
