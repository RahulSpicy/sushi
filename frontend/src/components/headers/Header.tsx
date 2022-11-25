import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Badge, Divider, IconButton } from "@mui/material";
import Link from "next/link";
import { useContext, useState } from "react";
import globalContext from "../../context/globalContext";
import useAxiosGet from "../../hooks/useAxiosGet";
import MemberListItem from "../boards/MemberListItem";
import NotificationsModal from "../modals/NotificationsModal";

const Header = () => {
  const { authUser } = useContext(globalContext);

  const { data: notifications, setData: setNotifications } =
    useAxiosGet("/notifications/");

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <nav className="flex items-center justify-between py-2 px-6 border-b-2">
      <div className="flex items-center">
        <div className="flex flex-row items-center">
          <DashboardOutlinedIcon />
          <Link href="/">
            <h1 className="font-medium text-2xl font-mono ml-3 cursor-pointer">
              Sushi
            </h1>
          </Link>
        </div>
      </div>
      <div className=""></div>
      <div className="flex items-center">
        <MemberListItem user={authUser} header="true" />
        <h1 className="ml-1 font-mono">
          Hello, {authUser.full_name.replace(/ .*/, "")}
        </h1>
        <IconButton
          sx={{ marginLeft: "40px", marginRight: "20px" }}
          onClick={handleClick}
        >
          <NotificationsOutlinedIcon style={{ color: "gray" }} />
        </IconButton>
        {(notifications || []).find(
          (notification) => notification.unread == true
        ) && (
          <IconButton
            sx={{ marginLeft: "40px", marginRight: "20px" }}
            onClick={handleClick}
          >
            <Badge badgeContent={1} color="success">
              <NotificationsOutlinedIcon style={{ color: "gray" }} />
            </Badge>
          </IconButton>
        )}
        <NotificationsModal
          handleClosePopover={handleClosePopover}
          anchorEl={anchorEl}
          notifications={notifications}
          setNotifications={setNotifications}
        />
        <Divider orientation="vertical" flexItem />
        <IconButton sx={{ marginLeft: "20px", marginRight: "10px" }}>
          <MenuOutlinedIcon style={{ color: "gray" }} />
        </IconButton>
      </div>
    </nav>
  );
};

export default Header;
