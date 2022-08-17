import { Avatar, dialogClasses, Typography } from "@mui/material";

const hashName = (str): any => {
  let res = 0;
  for (let i = 0; i < str.length; i++) {
    res += str.charCodeAt(i);
  }

  return res + 1;
};

const colors = ["red", "green", "blue"];

const getNameColor = (name) => {
  return colors[hashName(name) % colors.length];
};

const MemberListItem = ({ user }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "5px",
      }}
    >
      {user.profile_pic ? (
        <Avatar
          variant="square"
          src={user.profile_pic}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      ) : (
        <Avatar
          variant="square"
          sx={{
            bgcolor: `${getNameColor(user.full_name)}`,
            width: 35,
            height: 35,
          }}
        >
          {user.full_name.substring(0, 1)}
        </Avatar>
      )}
      <Typography style={{ fontSize: "14px", marginLeft: "5px" }} noWrap>
        {user.full_name}
      </Typography>
    </div>
  );
};

export default MemberListItem;
