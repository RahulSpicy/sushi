import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import Image from "next/image";
import RegisterForm from "../components/auth/RegisterForm";
import SlideshowLayout from "../components/auth/SlideshowLayout";
import logo from "../images/logo.png";

const Sidebar = styled.div`
  position: fixed;
  width: 35%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background: white;
  display: flex;
  flex-direction: column;
`;

const LeftSidebar = styled(Sidebar)`
  left: 0;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 20%;
`;

const RegisterContainer = styled.div`
  width: 100%;
  margin: 2% auto;
  justify-content: center;
  text-align: center;
`;

const Register = () => {
  return (
    <>
      <LeftSidebar>
        <LogoContainer>
          <Image src={logo} alt="logo" height={35} width={35} />
          <Typography letterSpacing={7} variant="h5" ml={1}>
            SUSHI
          </Typography>
        </LogoContainer>
        <RegisterContainer>
          <RegisterForm />
        </RegisterContainer>
      </LeftSidebar>
      <SlideshowLayout />
    </>
  );
};

export default Register;
