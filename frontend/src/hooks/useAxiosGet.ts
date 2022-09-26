import { useState, useEffect } from "react";

import axios from "axios";
import { authAxios } from "../utils/authAxios";
import { backendUrl } from "../utils/const";

const useAxiosGet = (url: string, onSite = true) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  url = onSite ? backendUrl + url : url;

  useEffect(() => {
    let unmounted = false;
    const fetchData = async () => {
      const axiosUsed = onSite ? authAxios : axios;

      try {
        const res = await axiosUsed.get(url);
        if (!unmounted) {
          setData(res.data);
          setLoading(false);
        }
      } catch (error) {
        if (!unmounted) {
          setError(true);
          setErrorMessage(error.message);
          setLoading(false);
        }
      }
    };
    fetchData();
    return () => {
      unmounted = true;
    };
  }, [onSite, url]);

  // Below two functions are only if data is an array
  const addItem = (item) => {
    setData((prevData) => [...prevData, item]);
  };

  const replaceItem = (newItem, key = "id") => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item[key] === newItem[key]) return newItem;
        return item;
      })
    );
  };

  return {
    data,
    setData,
    loading,
    error,
    errorMessage,
    addItem,
    replaceItem,
  };
};

export default useAxiosGet;
