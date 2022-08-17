import { Button, Input, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { backendUrl } from "../../utils/const";

type FormData = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  profile_pic: any;
};

const RegisterForm = () => {
  const { register, handleSubmit, watch } = useForm<FormData>();
  const firstName = watch("first_name", "");
  const lastName = watch("last_name", "");
  const userName = watch("username", "");
  const email = watch("email", "");
  const passw = watch("password", "");
  const router = useRouter();

  const [profilePic, setProfilePic] = useState(null);

  const handleImageChange = (e: any) => {
    let newData = e.target.files[0];
    setProfilePic(newData);
    console.log(newData);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const url = `${backendUrl}/register/`;
    data.profile_pic = profilePic;
    try {
      await axios.post(url, data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      router.push({ pathname: "/" });
    } catch (err: any) {
      if (err.response?.status === 400) {
        console.log("Bad Request");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        type="text"
        label="First Name"
        placeholder="First Name"
        required
        {...register("first_name")}
        style={{
          margin: "0.5em auto",
          height: "3em",
          width: "60%",
          zIndex: "1",
          marginBottom: "1.2em",
        }}
      />
      <TextField
        type="text"
        label="Last Name"
        placeholder="Last Name"
        required
        {...register("last_name")}
        style={{
          margin: "0.5em auto",
          height: "3em",
          width: "60%",
          zIndex: "1",
          marginBottom: "1.2em",
        }}
      />
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
          marginBottom: "1.2em",
        }}
      />

      <Input
        type="file"
        {...register("profile_pic")}
        style={{
          margin: "0.5em auto",
          height: "3em",
          width: "60%",
          zIndex: "1",
          marginBottom: "1.2em",
        }}
        onChange={handleImageChange}
      />
      <TextField
        type="email"
        label="Email"
        placeholder="Email"
        required
        {...register("email")}
        style={{
          margin: "0.5em auto",
          height: "3em",
          width: "60%",
          zIndex: "1",
          marginBottom: "1.2em",
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
          marginBottom: "1.2em",
        }}
      />
      {userName.trim() !== "" &&
      passw.trim() !== "" &&
      email.trim() !== "" &&
      firstName.trim() !== "" &&
      lastName.trim() !== "" ? (
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{
            margin: "1em auto",
            width: "60%",
            textAlign: "center",
            padding: "0.85em 2em",
            borderRadius: "3px",
          }}
        >
          Register
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled
          style={{
            margin: "1em auto",
            width: "60%",
            textAlign: "center",
            padding: "0.85em 2em",
            borderRadius: "3px",
          }}
        >
          Register
        </Button>
      )}
    </form>
  );
};

export default RegisterForm;
