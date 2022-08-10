import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Autocomplete,
  Avatar,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "../../images/logo.png";

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
];

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

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
          <Image src={logo} alt="logo" width={30} height={30} />
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
          <Avatar
            sx={{
              backgroundColor: "lightcoral",
              borderRadius: "5px",
              marginLeft: "10px",
            }}
            variant="square"
          >
            H
          </Avatar>
          <Typography ml={1} fontSize="15px" color="gray">
            Hello, Hrushikesh
          </Typography>
          <IconButton sx={{ marginLeft: "40px", marginRight: "20px" }}>
            <NotificationsOutlinedIcon style={{ color: "gray" }} />
          </IconButton>
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
