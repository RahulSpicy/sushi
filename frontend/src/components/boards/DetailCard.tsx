import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CardEditModal from "../modals/CardEditModal";
import Labels from "./Labels";
import MemberListItem from "./MemberListItem";

const DetailCard = ({ cardData }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Card
        variant="outlined"
        sx={{
          width: "275px",
          background: "white",
          borderRadius: "5px",
          border: "1px lightgray solid",
          padding: "0.1em",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          position: "relative",
          margin: "1em",
          ":hover": {
            background: "whitesmoke",
          },
        }}
      >
        <CardContent>
          <IconButton
            sx={{
              top: "3px",
              right: "3px",
              position: "absolute",
            }}
            onClick={handleOpen}
          >
            <EditOutlinedIcon sx={{ width: "20px", height: "20px" }} />
          </IconButton>

          <Labels labels={cardData.labels} />
          <Typography variant="h6" fontWeight={400}>
            {cardData.title}
          </Typography>
          {cardData.attachments?.length !== 0 && (
            <div style={{ display: "flex", padding: "1px", marginTop: "2px" }}>
              <AttachmentOutlinedIcon
                sx={{
                  width: "20px",
                  height: "20px",
                  color: "gray",
                  marginRight: "10px",
                }}
              />
              <Typography variant="caption" fontWeight={500} color="gray">
                x {cardData.attachments.length}
              </Typography>
            </div>
          )}
          <Members members={cardData.assigned_to} />
        </CardContent>
      </Card>
      <CardEditModal
        setOpen={open}
        handleClose={handleClose}
        cardData={cardData}
      />
    </div>
  );
};

const iconButtonSides = 40;
const Members = ({ members }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "0.5em",
    }}
  >
    <IconButton
      sx={{
        width: iconButtonSides,
        height: iconButtonSides,
        borderRadius: "4px",
        border: "1px lightgray dashed",
        color: "gray",
        fontWeight: "400",
      }}
    >
      <AddOutlinedIcon />
    </IconButton>
    {members.map((member) => (
      <MemberListItem user={member} key={uuidv4()} header="false" />
    ))}
  </div>
);

export default DetailCard;