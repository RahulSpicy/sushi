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
    margin-left: 3.5em;
  }

  &:last-of-type {
    margin-right: 3.5em;
  }
`;

interface LandingHeaderProps {}

export const LandingHeader: React.FC<LandingHeaderProps> = () => {
  return (
    <LandingPageHeader>
      <Section>
        <h1 className="font-bold text-black tracking-wider text-2xl font-mono">
          Sushi
        </h1>
      </Section>
      <Section>
        <ul className="flex items-center font-mono">
          <li className="">
            <Link href="/login">
              <a className="text-black font-medium no-underline text-lg">
                Login
              </a>
            </Link>
          </li>
          <li className="ml-8">
            <Link href="/register">
              <button className="bg-black text-white font-medium px-4 py-3 rounded-lg hover:bg-[#373737]">
                Sign Up
              </button>
            </Link>
          </li>
        </ul>
      </Section>
    </LandingPageHeader>
  );
};
