import styled from "@emotion/styled";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { IconButton, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { authAxios } from "../../utils/authAxios";
import { backendUrl } from "../../utils/const";
import MemberListItem from "./MemberListItem";

const BoardPreview = styled.div`
  background: #f4f5f7;
  padding: 1em;
  border-radius: 5px;
  border: 1px rgba(gray, 0.55) solid;
  position: relative;
  overflow: hidden;
  margin-right: 1em;
`;

const BoardPreviewImage = styled.div`
  width: calc(100% + 2em);
  height: 100px;
  margin-left: -1em;
  margin-right: -1em;
  margin-top: -1em;
  margin-bottom: 1em;
`;

const HomeBoard = ({ board, replaceBoard }: any) => {
  const toggleFavorite = async (e) => {
    e.preventDefault(); // Prevent anchor link wrapped around board from redirecting us
    await authAxios.post(`${backendUrl}/boards/star/`, {
      board: board.id,
    });
    replaceBoard({
      ...board,
      is_starred: !board.is_starred,
    });
  };

  return (
    <Link href={`/b/${board.id}`}>
      <BoardPreview>
        <IconButton
          sx={{
            top: "3px",
            right: "3px",
            position: "absolute",
            zIndex: 1,
          }}
          onClick={toggleFavorite}
        >
          {!board.is_starred ? (
            <StarBorderIcon sx={{ color: "white" }} />
          ) : (
            <StarBorderIcon sx={{ color: "yellow" }} />
          )}
        </IconButton>
        {board.color ? (
          <BoardPreviewImage
            style={{ height: "52px", backgroundColor: `#${board.color}` }}
          ></BoardPreviewImage>
        ) : (
          <BoardPreviewImage>
            <Image
              src={board.image || board.image_url}
              alt="img"
              width="220px"
              height="105px"
              objectFit="cover"
              style={{ borderRadius: "5px 5px 0 0" }}
            />
          </BoardPreviewImage>
        )}

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

const Members = ({ members }: any) => (
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
