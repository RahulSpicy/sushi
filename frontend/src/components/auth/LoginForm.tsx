import { Alert, Button, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import globalContext from "../../context/globalContext";
import { backendUrl } from "../../utils/const";

type FormData = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const { register, handleSubmit, watch } = useForm<FormData>();
  const [errmsgs, setErrMsgs] = useState({ msgs: "", err: false });
  const [open, setOpen] = useState(false);

  const userName = watch("username", "");
  const userPassword = watch("password", "");
  const { login } = useContext(globalContext);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const url = `${backendUrl}/token/`;
    try {
      const res = await axios.post(url, data);
      login(res.data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        setOpen(true);
        setErrMsgs({ msgs: "Invalid Username or Password", err: true });
        console.log(errmsgs);
      }
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        type="text"
        label="Username"
        placeholder="Username"
        required
        {...register("username")}
        style={{
          margin: "0.5em auto",
          height: "3em",
          width: "60%",
          zIndex: "1",
          marginBottom: "1.25em",
        }}
      />
      <TextField
        type="password"
        label="Password"
        placeholder="Password"
        required
        {...register("password")}
        style={{
          margin: "0.5em auto",
          height: "3em",
          width: "60%",
        }}
      />

      {userName.trim() !== "" && userPassword.trim() !== "" ? (
        <button
          className="bg-black text-white font-semibold text-xl py-3 px-4 rounded mx-auto my-6 w-[60%] tracking-wider font-mono"
          type="submit"
        >
          Login
        </button>
      ) : (
        <button
          className="bg-black text-white font-semibold text-xl py-3 px-4 rounded opacity-50 cursor-not-allowed mx-auto my-6 w-[60%] tracking-wider font-mono"
          disabled
        >
          Login
        </button>
      )}
      {errmsgs.err ? (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%", marginLeft: "85px", marginBottom: "60px" }}
          >
            {errmsgs.msgs}
          </Alert>
        </Snackbar>
      ) : null}
    </form>
  );
};

export default LoginForm;
