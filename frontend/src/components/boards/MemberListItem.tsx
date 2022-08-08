import { Avatar, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

const MemberListItem = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "5px",
      }}
    >
      <Avatar
        variant="square"
        sx={{ bgcolor: deepOrange[500], width: 35, height: 35 }}
      >
        HJ
      </Avatar>
      <Typography style={{ fontSize: "14px", marginLeft: "5px" }} noWrap>
        Hrushikesh Jadhav
      </Typography>
    </div>
  );
};

export default MemberListItem;
