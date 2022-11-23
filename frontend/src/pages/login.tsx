import LoginForm from "../components/auth/LoginForm";
import SlideshowLayout from "../components/auth/SlideshowLayout";

const Login = () => {
  return (
    <>
      <div className="bg-white flex flex-col h-full w-1/3 fixed overflow-hidden">
        <h1 className="font-bold text-black tracking-wider text-2xl font-mono mt-32 ml-24 px-2">
          Sushi
        </h1>
        <div className="w-full justify-center text-center mx-auto my-3">
          <LoginForm />
        </div>
      </div>
      <SlideshowLayout />
    </>
  );
};

export default Login;
