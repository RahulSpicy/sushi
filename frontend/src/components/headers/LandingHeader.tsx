import { css } from "@emotion/css";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import logo from "../../../images/logo.png";
import { btn } from "../../styles";

const LandingPageHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  background: transparent;
`;

const Section = styled.section`
  margin: 1em 0;

  &:first-of-type {
    margin-left: 2em;
  }

  &:last-of-type {
    margin-right: 2em;
  }
`;

const HeaderList = styled.ul`
  display: flex;
  align-items: center;
`;

const HeaderListItem = styled.li`
  margin: 0 0.75em;
  list-style: none;

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

interface LandingHeaderProps {}

export const LandingHeader: React.FC<LandingHeaderProps> = () => {
  return (
    <LandingPageHeader>
      <Section>
        <div
          className={css`
            display: flex;
            flex-direction: row;
          `}
        >
          <Image
            src={logo}
            alt="sushi logo"
            height={35}
            width={35}
            objectFit="cover"
          />
          <Typography variant="h5" ml={1}>
            SUSHI
          </Typography>
        </div>
      </Section>
      <Section>
        <HeaderList>
          <HeaderListItem>Tour</HeaderListItem>
          <HeaderListItem>Pricing</HeaderListItem>
          <HeaderListItem>Learn</HeaderListItem>
        </HeaderList>
      </Section>
      <Section>
        <HeaderList>
          <HeaderListItem>
            <a>Login</a>
          </HeaderListItem>
          <HeaderListItem>
            <Button className={btn}>Sign Up</Button>
          </HeaderListItem>
        </HeaderList>
      </Section>
    </LandingPageHeader>
  );
};
