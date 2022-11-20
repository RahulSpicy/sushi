import Button from "@mui/material/Button";
import Image from "next/image";
import Link from "next/link";
import { LandingHeader } from "../components/headers/LandingHeader";
import Hero from "../images/hero.png";

const Landing = () => {
  return (
    <>
      <LandingHeader />
      <div className="flex flex-row mt-48">
        <div className="p-8 w-1/2 align-middle">
          <h1 className="font-bold text-5xl w-3/4">
            Sushi helps teams move work forward.
          </h1>
          <h4 className="mt-6 text-[#989BA1] text-xl mb-6">
            Keep everything in the same place—even if your team isn’t.
          </h4>
          <Link href="/register">
            <Button
              style={{
                backgroundColor: "black",
                color: "white",
                fontWeight: "500",
                padding: "10px",
              }}
            >
              Start doing
            </Button>
          </Link>
        </div>
        <div className="p-2 w-1/2 mx-auto">
          <Image src={Hero} width="520px" height="342px" alt="Hero" />
        </div>
      </div>
    </>
  );
};

export default Landing;
