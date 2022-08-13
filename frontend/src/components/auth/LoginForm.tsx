import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import globalContext from "../../context/globalContext";
import { backendUrl } from "../../utils/const";

type FormData = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<FormData>();

  const userName = watch("username", "");
  const userPassword = watch("password", "");
  const { login } = useContext(globalContext);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const url = `${backendUrl}/token/`;
    try {
      const res = await axios.post(url, data);
      login(res.data);
      router.push({ pathname: "/" });
    } catch (err: any) {
      if (err.response?.status === 401) {
        console.log("Invalid Credentials");
      }
    }
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
          zIndex: "1",
        }}
      />
      {userName.trim() !== "" && userPassword.trim() !== "" ? (
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{
            margin: "2.5em auto",
            width: "60%",
            textAlign: "center",
            padding: "0.85em 2em",
            borderRadius: "3px",
          }}
        >
          Login
        </Button>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          disabled
          style={{
            margin: "2.5em auto",
            width: "60%",
            textAlign: "center",
            padding: "0.85em 2em",
            borderRadius: "3px",
          }}
        >
          Login
        </Button>
      )}
    </form>
  );
};

export default LoginForm;
