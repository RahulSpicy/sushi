import styled from "@emotion/styled";
import Image from "next/image";
import bg from "../../images/slideshow-1.jpg";

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

const SlideshowLayout = () => {
  return (
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
        <p>With Sushi it’s more than work. It’s a way of working together.</p>
      </SplashTextContainer>
    </Slideshow>
  );
};

export default SlideshowLayout;
