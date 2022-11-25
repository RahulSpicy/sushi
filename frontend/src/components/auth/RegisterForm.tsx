import { Alert, TextField } from "@mui/material";
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
  const [errmsgs, setErrMsgs] = useState({ msgs: {}, err: false });

  const handleImageChange = (e: any) => {
    let newData = e.target.files[0];
    setProfilePic(newData);
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
        setErrMsgs({ err: true, msgs: err.response.data });
        console.log(errmsgs);
      } else {
        setErrMsgs({
          err: true,
          msgs: { Connection: "Refused", Server: "Maybe Down" },
        });
      }
    }
  };

  const capitalize = (s: string) => {
    return s[0].toUpperCase() + s.slice(1).toLowerCase();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        type="text"
        label="First Name"
        placeholder="First Name"
        required
        {...register("first_name")}
        className="w-[60%] h-6 mb-10 mt-1"
      />
      <TextField
        type="text"
        label="Last Name"
        placeholder="Last Name"
        required
        {...register("last_name")}
        className="w-[60%] h-6 mb-10 mt-2"
      />
      <TextField
        type="text"
        label="Username"
        placeholder="Username"
        required
        {...register("username")}
        className="w-[60%] h-6 mb-10 mt-2"
      />

      <button className="w-[60%] h-14 my-2 p-3 border border-gray-300 rounded">
        <input
          type="file"
          {...register("profile_pic")}
          onChange={handleImageChange}
        />
      </button>
      <TextField
        type="email"
        label="Email"
        placeholder="Email"
        required
        {...register("email")}
        className="w-[60%] h-6 mb-10 mt-2"
      />
      <TextField
        type="password"
        label="Password"
        placeholder="Password"
        required
        {...register("password")}
        className="w-[60%] h-6 mb-10 mt-2"
      />
      {userName.trim() !== "" &&
      passw.trim() !== "" &&
      email.trim() !== "" &&
      firstName.trim() !== "" &&
      lastName.trim() !== "" ? (
        <button
          className="bg-black text-white font-semibold text-xl py-3 px-4 rounded mx-auto my-4 w-[60%] tracking-wider font-mono"
          type="submit"
        >
          Register
        </button>
      ) : (
        <button
          className="bg-black text-white font-semibold text-xl py-3 px-4 rounded opacity-50 cursor-not-allowed mx-auto my-4 w-[60%] tracking-wider font-mono"
          disabled
        >
          Register
        </button>
      )}

      {errmsgs.err
        ? Object.keys(errmsgs.msgs).map((m) => (
            <Alert
              key={m}
              severity="error"
              sx={{ width: "80%", marginLeft: "60px", marginBottom: "5px" }}
            >
              {capitalize(errmsgs.msgs[m].toString())}
            </Alert>
          ))
        : null}
    </form>
  );
};

export default RegisterForm;
