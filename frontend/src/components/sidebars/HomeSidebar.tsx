import AddIcon from "@mui/icons-material/Add";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import NewspaperSharpIcon from "@mui/icons-material/NewspaperSharp";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SquareFootSharpIcon from "@mui/icons-material/SquareFootSharp";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

const HomeSidebar = () => {
  return (
    <Box
      sx={{
        width: "15%",
      }}
    >
      <nav aria-label="main tabs">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DashboardOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Boards" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SquareFootSharpIcon />
              </ListItemIcon>
              <ListItemText primary="Templates" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <NewspaperSharpIcon />
              </ListItemIcon>
              <ListItemText primary="Feed" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary tabs">
        <List>
          <ListItem disablePadding sx={{ justifyContent: "space-between" }}>
            <Typography margin={2}>Projects</Typography>
            <IconButton edge="end">
              <AddIcon />
            </IconButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PeopleAltOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="The Boys" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
};

export default HomeSidebar;
