import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import Image from "next/image";
import LoginForm from "../components/auth/LoginForm";
import logo from "../images/logo.png";
import bg from "../images/slideshow-1.jpg";

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

// const RightSidebar = styled(Sidebar)`
//   right: 0;
// `;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 20%;
`;

const Slideshow = styled.div`
  position: absolute;
  z-index: 1;
  position: fixed;
  left: 35%;
  height: 100%;
  width: 100%;
`;

const SplashTextContainer = styled.div`
  font-size: large;
  position: absolute;
  z-index: 2;
  color: white;
  bottom: 100px;
  left: 100px;
`;

const Splashtext = styled.h1`
  font-size: 3.4rem;
  font-weight: 600;
  line-height: 5rem;
`;

const LoginContainer = styled.div`
  width: 100%;
  margin: 8% auto;
  justify-content: center;
  text-align: center;
`;

const Login = ({ login }) => {
  return (
    <>
      <LeftSidebar>
        <LogoContainer>
          <Image src={logo} alt="logo" height={35} width={35} />
          <Typography letterSpacing={7} variant="h5" ml={1}>
            SUSHI
          </Typography>
        </LogoContainer>
        <LoginContainer>{login ? <LoginForm /> : null}</LoginContainer>
      </LeftSidebar>
      <Slideshow id="slideshow-container">
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
          id="slideshow"
        >
          <Image
            src={bg}
            alt="bg"
            objectFit="fill"
            style={{ filter: "brightness(70%)" }}
          />
        </div>
        <SplashTextContainer>
          <Splashtext>Plan your tasks</Splashtext>
          <p>Plan out your tasks and vacations using Sushi</p>
        </SplashTextContainer>
      </Slideshow>
    </>
  );
};

Login.defaultProps = {
  login: true,
};

export default Login;
