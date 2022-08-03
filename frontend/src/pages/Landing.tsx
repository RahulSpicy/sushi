import { css } from "@emotion/css";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Image from "next/image";
import bg1 from "../images/bg1.jpg";
import { LandingHeader } from "../components/headers/LandingHeader";
import { btn } from "../styles";

const Banner = styled.div`
  position: relative;
`;

const BannerContent = styled.div`
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  text-align: center;
`;

const Landing = () => {
  return (
    <>
      <LandingHeader />
      <Banner>
        <div
          className={css`
            position: relative;
            height: 100vh;
            width: 100vw;
          `}
        >
          <Image
            src={bg1}
            alt="bg"
            layout="fill"
            quality={100}
            objectFit="cover"
            style={{ filter: "brightness(80%)" }}
          />
          <BannerContent>
            <h1
              className={css`
                font-size: 3rem;
                font-weight: 600;
                margin-bottom: 0.5em;
              `}
            >
              Sushi lets you work more collaboratively and get more done
            </h1>
            <h4
              className={css`
                width: 70%;
                margin: 0 auto 2em;
                font-weight: 500;
              `}
            >
              Sushi boards, lists, and cards enable you to organize and
              prioritize your projects in a fun, flexible, and rewarding way.
            </h4>
            <Button className={btn}>Sign Up For Free</Button>
          </BannerContent>
        </div>
      </Banner>
    </>
  );
};

export default Landing;
