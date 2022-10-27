import { css } from "@emotion/css";
import styled from "@emotion/styled";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import { Chip, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import MemberListItem from "../boards/MemberListItem";
import LabelPopOver from "./LabelPopOver";

const chipStyle = css`
  border-radius: 5px;
  color: gray;
`;

const CardSideBar = styled.div`
  padding: 0.5em 0 0.5em 0.5em;
`;

const CardEditActions = ({ card, list }) => {
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <CardSideBar>
      <Typography
        fontWeight="500"
        textAlign="left"
        mb="10px"
        ml="5px"
        color="gray"
      >
        Actions
      </Typography>
      <Stack direction="column" spacing={1} width="80%" alignItems="start">
        <Chip
          icon={<StyleOutlinedIcon style={{ color: "gray" }} />}
          label="Edit Labels"
          clickable
          className={chipStyle}
          onClick={handleClick}
        />
        <Chip
          icon={<PersonOutlineOutlinedIcon style={{ color: "gray" }} />}
          label="Change Members"
          clickable
          className={chipStyle}
        />
        <Chip
          icon={<ArrowForwardOutlinedIcon style={{ color: "gray" }} />}
          label="Move"
          clickable
          className={chipStyle}
        />
        <Chip
          icon={<AccessTimeOutlinedIcon style={{ color: "gray" }} />}
          label="Change Due Date"
          clickable
          className={chipStyle}
        />
        <Chip
          icon={<InsertPhotoIcon style={{ color: "gray" }} />}
          label="Cover"
          clickable
          className={chipStyle}
        />
      </Stack>
      <Typography
        fontWeight="500"
        textAlign="left"
        mb="10px"
        ml="5px"
        mt="25px"
        color="gray"
      >
        Members
      </Typography>
      <Stack direction="column" spacing={1} width="80%" alignItems="start">
        {/* <MemberListItem user={user} header="false" /> */}
        <Members members={card.assigned_to} />
      </Stack>

      <LabelPopOver
        handleClosePopover={handleClosePopover}
        anchorEl={anchorEl}
        card={card}
        list={list}
      />
    </CardSideBar>
  );
};

const Members = ({ members }) =>
  members.length !== 0 && (
    <>
      <ul style={{ paddingLeft: "1px" }}>
        {members.map((member) => (
          <li
            key={uuidv4()}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "0.7em",
            }}
          >
            <MemberListItem user={member} header="false" />
          </li>
        ))}
      </ul>
    </>
  );

export default CardEditActions;
