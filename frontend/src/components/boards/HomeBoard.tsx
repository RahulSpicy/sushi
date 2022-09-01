import styled from "@emotion/styled";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import bg1 from "../../images/bg1.jpg";
import MemberListItem from "./MemberListItem";
import Link from "next/link";

const board = {
  id: "1",
  title: "Board 1",
  image: bg1,
  members: [
    {
      id: "1",
      full_name: "Sushi",
    },
    {
      id: "2",
      full_name: "Cookie Monster",
    },
    {
      id: "3",
      full_name: "Raze",
    },
    {
      id: "4",
      full_name: "Jett",
    },
  ],
};

const BoardPreview = styled.div`
  background: white;
  padding: 1em;
  border-radius: 5px;
  border: 1px rgba(gray, 0.55) solid;
  position: relative;
  overflow: hidden;
`;

const BoardPreviewImage = styled.div`
  width: calc(100% + 2em);
  height: 100px;
  margin-left: -1em;
  margin-right: -1em;
  margin-top: -1em;
  margin-bottom: 1em;
`;

// { board }

const HomeBoard = () => {
  return (
    <Link href={`/board`}>
      <BoardPreview>
        <IconButton
          sx={{
            top: "3px",
            right: "3px",
            position: "absolute",
            zIndex: 1,
          }}
        >
          <StarBorderIcon sx={{ color: "white" }} />
        </IconButton>
        <BoardPreviewImage>
          <Image
            src={board.image}
            alt="img"
            width="220px"
            height="105px"
            objectFit="cover"
            style={{ borderRadius: "5px 5px 0 0" }}
          />
        </BoardPreviewImage>
        <Typography
          variant="body1"
          style={{ marginBottom: board.members ? "0.75em" : 0 }}
        >
          {board.title}
        </Typography>
        {board.members && <Members members={board.members} />}
      </BoardPreview>
    </Link>
  );
};

const Members = ({ members }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
    }}
  >
    {members.slice(0, 3).map((member) => (
      <MemberListItem user={member} key={uuidv4()} header="true" />
    ))}
    {members.length > 3 && (
      <Typography variant="caption" fontWeight={300} ml="0.5em">{`+${
        members.length - 3
      } other${members.length - 3 === 1 ? "" : "s"}`}</Typography>
    )}
  </div>
);

export default HomeBoard;
