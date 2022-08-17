import { css } from "@emotion/css";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Image from "next/image";
import Link from "next/link";
import { LandingHeader } from "../components/headers/LandingHeader";
import bg1 from "../images/bg1.jpg";
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
              Sushi helps teams move work forward
            </h1>
            <h4
              className={css`
                width: 70%;
                margin: 0 auto 2em;
                font-weight: 500;
              `}
            >
              Start with a Sushi board, lists, and cards. Customize and expand
              with more features as your teamwork grows. Manage projects,
              organize tasks, and build team spirit—all in one place.
            </h4>
            <Link href="/register">
              <Button className={btn}>Start doing</Button>
            </Link>
          </BannerContent>
        </div>
      </Banner>
    </>
  );
};

export default Landing;
