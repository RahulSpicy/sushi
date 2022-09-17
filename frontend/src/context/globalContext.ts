import React from "react";

interface GlobalContextInterface {
  authUser: string;
  checkedAuth: boolean;
}

export default React.createContext<GlobalContextInterface | any>({
  authUser: null,
  checkedAuth: false, // Whether your auth has been checked or not
});
