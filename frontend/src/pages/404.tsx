import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import globalContext from "../context/globalContext";
import error404 from "../images/error404.svg";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import Head from "next/head";

const ErrorContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

export default function FourOhFour() {
  const { authUser } = useContext(globalContext);
  return (
    <>
      <Head>
        <title>Error | Sushi</title>
      </Head>
      <ErrorContent>
        <Image src={error404} width="400px" height="400px" alt="" />
        <Typography variant="h5">You look a little lost there</Typography>
        <Typography variant="body1">
          {authUser ? (
            <>
              This page may be private. You may be able to view it by{" "}
              <Link href="/login">logging in</Link>
            </>
          ) : (
            "Page not found"
          )}
        </Typography>
      </ErrorContent>
    </>
  );
}
