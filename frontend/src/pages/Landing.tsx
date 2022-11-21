import { Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { LandingHeader } from "../components/headers/LandingHeader";
import Hero from "../images/hero.png";

const Landing = () => {
  return (
    <Container maxWidth="xl">
      <LandingHeader />
      <div className="flex flex-row mt-52 items-center">
        <div className="p-8 w-1/2 font-mono">
          <h1 className="font-bold text-6xl  tracking-wide">
            Sushi helps teams move work forward.
          </h1>
          <h4 className="mt-6 text-[#989BA1] text-xl w-4/6 mb-6">
            Keep everything in the same place—even if your team isn’t.
          </h4>
          <Link href="/register">
            <button className="bg-black text-white text-2xl font-medium p-2 px-12 py-4 rounded-lg hover:bg-[#373737]">
              Start doing
            </button>
          </Link>
        </div>
        <div className="p-2 w-1/2 mx-auto text-center">
          <Image src={Hero} width="520px" height="342px" alt="Hero" />
        </div>
      </div>
    </Container>
  );
};

export default Landing;
