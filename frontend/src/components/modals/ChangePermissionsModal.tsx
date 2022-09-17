import styled from "@emotion/styled";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  Button,
  Divider,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import { authAxios } from "../../utils/authAxios";
import { backendUrl } from "../../utils/const";

interface ChangePermissionsModalProps {
  anchorEl: HTMLElement | null;
  handleClosePopover: () => void;
  member: any;
  setProject: any;
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
  margin-top: 20px;
  margin-bottom: 10px;
`;

const ChangePermissionsModal = ({
  anchorEl,
  handleClosePopover,
  member,
  setProject,
}: ChangePermissionsModalProps) => {
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const changePermission = async (access_level) => {
    try {
      const { data } = await authAxios.put(
        backendUrl + `/projects/members/${member.id}/`,
        {
          access_level,
        }
      );
      setProject((project) => {
        const updatedMembers = project.members.map((member) =>
          member.id === data.id ? data : member
        );
        project.members = updatedMembers;
        return { ...project };
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
        <Typography variant="body1">Change Permission</Typography>
        <IconButton onClick={handleClosePopover}>
          <CloseOutlinedIcon />
        </IconButton>
      </HeaderContainer>
      <div style={{ padding: "0 1em 1em" }}>
        <div>
          {member.access_level === 2 ? (
            <LogoTextContainer>
              <Typography variant="h6" fontWeight={400}>
                Admin
              </Typography>
              <CheckOutlinedIcon sx={{ marginLeft: 1, color: "green" }} />
            </LogoTextContainer>
          ) : (
            <Button
              fullWidth
              variant="outlined"
              sx={{ marginTop: 1, marginBottom: 1 }}
              onClick={() => changePermission(2)}
            >
              Make Admin
            </Button>
          )}
          <Typography variant="caption">
            Can view, create and edit project boards, change project settings,
            and invite new members.
          </Typography>
        </div>
        <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
        <div>
          {member.access_level === 1 ? (
            <LogoTextContainer>
              <Typography variant="h6" fontWeight={400}>
                Normal
              </Typography>
              <CheckOutlinedIcon sx={{ marginLeft: 1, color: "green" }} />
            </LogoTextContainer>
          ) : (
            <Button
              fullWidth
              variant="outlined"
              sx={{ marginTop: 1, marginBottom: 1 }}
              onClick={() => changePermission(1)}
            >
              Make Normal
            </Button>
          )}
          <Typography variant="caption">
            Can view, create and edit project boards.
          </Typography>
        </div>
      </div>
    </Popover>
  );
};

export default ChangePermissionsModal;
