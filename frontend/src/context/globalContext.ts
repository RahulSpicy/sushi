import React from "react";

interface GlobalContextInterface {
  user: string;
  checkedAuth: boolean;
}

export default React.createContext<GlobalContextInterface | any>({
  user: null,
  checkedAuth: false, // Whether your auth has been checked or not
});
