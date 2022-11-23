import RegisterForm from "../components/auth/RegisterForm";
import SlideshowLayout from "../components/auth/SlideshowLayout";

const Register = () => {
  return (
    <>
      <div className="bg-white flex flex-col h-full w-1/3 fixed overflow-hidden">
        <h1 className="font-bold text-black tracking-wider text-2xl font-mono mt-12 ml-24 px-2">
          Sushi
        </h1>
        <div className="w-full justify-center text-center mx-auto my-3">
          <RegisterForm />
        </div>
      </div>
      <SlideshowLayout />
    </>
  );
};

export default Register;
