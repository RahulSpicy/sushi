import styled from "@emotion/styled";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {
  Button,
  IconButton,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { authAxios } from "../../utils/authAxios";
import { backendUrl } from "../../utils/const";

interface InviteMembersModalProps {
  anchorEl: HTMLElement | null;
  handleClosePopover: () => void;
  project: any;
}

const HeaderContainer = styled.div`
  margin: 1em;
  margin-bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LogoTextContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 270px;
`;

const InviteMembersModal = ({
  anchorEl,
  handleClosePopover,
  project,
}: InviteMembersModalProps) => {
  const [members, setMembers] = useState("");
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleInvite = async () => {
    const invitedMembers =
      members !== ""
        ? members.split(",").map((user) => user.trim()) // usernames and emails
        : [];

    try {
      await authAxios.post(backendUrl + `/projects/${project.id}/invite/`, {
        users: invitedMembers,
      });
    } catch (error) {
      console.log(error);
    }
    handleClosePopover();
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClosePopover}
      anchorOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <HeaderContainer>
        <Typography variant="body1">Add Members</Typography>
        <IconButton onClick={handleClosePopover}>
          <CloseOutlinedIcon />
        </IconButton>
      </HeaderContainer>
      <div style={{ padding: "0 1em 1em" }}>
        <LogoTextContainer>
          <PersonOutlineOutlinedIcon sx={{ marginRight: 0.7, color: "gray" }} />
          <Typography fontSize={18} fontWeight={300}>
            Enter email id or username
          </Typography>
        </LogoTextContainer>
        <TextField
          fullWidth
          type="text"
          name="members"
          variant="outlined"
          placeholder="rushi611@sushi.com"
          value={members}
          onChange={(e) => setMembers(e.target.value)}
        />
        {members.trim() !== "" ? (
          <Button
            onClick={handleInvite}
            variant="outlined"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Invite to Project
          </Button>
        ) : (
          <Button
            onClick={handleInvite}
            variant="outlined"
            disabled
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Invite to Project
          </Button>
        )}
      </div>
    </Popover>
  );
};

export default InviteMembersModal;
