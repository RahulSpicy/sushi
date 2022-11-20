import styled from "@emotion/styled";
import Link from "next/link";

const LandingPageHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
        <h1 className="font-bold text-black tracking-wider text-2xl">Sushi</h1>
      </Section>
      <Section>
        <ul className="flex items-center">
          <HeaderListItem>
            <Link href="/login">
              <a className="text-black font-medium no-underline text-lg">
                Login
              </a>
            </Link>
          </HeaderListItem>
          <HeaderListItem>
            <Link href="/register">
              <button className="bg-black text-white font-medium p-3 rounded-lg">
                Sign Up
              </button>
            </Link>
          </HeaderListItem>
        </ul>
      </Section>
    </LandingPageHeader>
  );
};
