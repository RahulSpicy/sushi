import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Autocomplete,
  Badge,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import globalContext from "../../context/globalContext";
import useAxiosGet from "../../hooks/useAxiosGet";
import logo from "../../images/logo.png";
import MemberListItem from "../boards/MemberListItem";
import NotificationsModal from "../modals/NotificationsModal";

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
];

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
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

  useEffect(() => {
    if (searchQuery !== "") setShowSearch(true);
    else if (searchQuery === "" && showSearch) setShowSearch(false);
  }, [searchQuery, showSearch]);

  return (
    <AppBar position="static" color="transparent" elevation={1}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button style={{ color: "gray", marginRight: "25px" }} disableRipple>
            <DashboardOutlinedIcon style={{ marginRight: "3px" }} />
            Boards
          </Button>
          <Autocomplete
            freeSolo
            disableClearable
            sx={{ width: "260px" }}
            options={top100Films.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon style={{ color: "lightgray", padding: 0 }} />
                    </InputAdornment>
                  ),
                }}
                placeholder="Search"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            )}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingRight: "25px",
            paddingLeft: "5px",
          }}
        >
          <Link href="/">
            <Image src={logo} alt="logo" width={30} height={30} />
          </Link>
          <Typography
            variant="h6"
            marginLeft={1}
            fontWeight={500}
            letterSpacing={1}
            color="gray"
          >
            SUSHI
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <MemberListItem user={authUser} header="true" />
          <Typography ml={1} fontSize="15px" color="gray">
            Hello, {authUser.full_name.replace(/ .*/, "")}
          </Typography>
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
