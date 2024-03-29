import AddIcon from "@mui/icons-material/Add";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import NewspaperSharpIcon from "@mui/icons-material/NewspaperSharp";
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
import Link from "next/link";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CreateTeamModal from "../modals/CreateTeamModal";

interface HomeSidebarProps {
  projects: any[];
}

const HomeSidebar = ({ projects }: HomeSidebarProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              <ListItemText primary="Calendar" />
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
            <IconButton edge="end" onClick={handleOpen}>
              <AddIcon />
            </IconButton>
            <CreateTeamModal setOpen={open} handleClose={handleClose} />
          </ListItem>
          {projects.map((project) => (
            <Link href={`/p/${project.id}`} key={uuidv4()}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={project.title} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </nav>
    </Box>
  );
};

export default HomeSidebar;
