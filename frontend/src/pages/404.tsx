import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import globalContext from "../context/globalContext";
import error404 from "../images/error404.svg";

export default function FourOhFour() {
  const { authUser } = useContext(globalContext);
  return (
    <>
      <Head>
        <title>Error | Sushi</title>
      </Head>
      <div className="absolute left-1/2 top-1/2 text-center transform -translate-x-1/2 -translate-y-1/2">
        <Image src={error404} width="400px" height="400px" alt="" />
        <h5 className="text-2xl font-mono font-medium my-1">
          You look a little lost there.
        </h5>
        <p className="font-mono font-medium mt-4">
          {authUser ? (
            <>
              This page may be private. You may be able to view it by{" "}
              <Link href="/login">logging in</Link>
            </>
          ) : (
            "Page not found"
          )}
        </p>
      </div>
    </>
  );
}
