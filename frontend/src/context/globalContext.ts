import React from "react";

interface GlobalContextInterface {
  authUser: string;
  checkedAuth: boolean;
  board: any;
  setBoard: any;
}

export default React.createContext<GlobalContextInterface | any>({
  authUser: null,
  checkedAuth: false, // Whether your auth has been checked or not
  // The below two are to reduce prop drilling to List and Card
  board: null,
  setBoard: null,
});
