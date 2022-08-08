import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React from "react";
import EditableField from "../common/EditableField";
import CardEditActions from "./CardEditActions";
import Labels from "./Labels";

const cardData = {
  image: "",
  labels: ["red"],
  title: "The Boys",
  attachments: [],
  assigned_to: ["Sushi"],
  list: "Important",
};

const DetailCard = () => {
  const CardContainer = styled(Card)`
    z-index: 4;
    background-color: white;
    border-radius: 5px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 850px;
    display: flex;
  `;

  const CardContentSide = styled.div`
    padding: 0.5em 0 0.5em 0.5em;
  `;

  const LogoTextContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 10px;
  `;

  const card = (
    <React.Fragment>
      <CardContent sx={{ width: "100%" }}>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <CardContentSide>
              <Labels labels={cardData.labels} />
              <EditableField text={cardData.title} />
              <p style={{ fontSize: "12px" }}>
                in list <b style={{ fontWeight: "600" }}>{cardData.list}</b>
              </p>
              <LogoTextContainer>
                <DescriptionOutlinedIcon style={{ color: "gray" }} />
                <Typography
                  style={{
                    marginLeft: "7px",
                    fontSize: "20px",
                    fontWeight: "400",
                    color: "gray",
                  }}
                >
                  Description
                </Typography>
              </LogoTextContainer>
              <TextareaAutosize
                placeholder="Add description"
                maxRows={3}
                style={{
                  resize: "none",
                  width: "95%",
                  height: "50px",
                  padding: "0.5em",
                  margin: "0.25em",
                  border: "1px solid white",
                  borderRadius: "5px",
                  backgroundColor: "#f0f1f2",
                }}
              />
              <LogoTextContainer>
                <AttachmentOutlinedIcon style={{ color: "gray" }} />
                <Typography
                  style={{
                    marginLeft: "7px",
                    fontSize: "20px",
                    fontWeight: "400",
                    color: "gray",
                  }}
                >
                  Attachments
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  size="small"
                  color="success"
                  style={{ marginLeft: "25px" }}
                >
                  Add
                </Button>
              </LogoTextContainer>
              <TextareaAutosize
                placeholder="Leave a comment"
                maxRows={4}
                style={{
                  resize: "none",
                  width: "95%",
                  height: "80px",
                  padding: "0.5em",
                  margin: "0 0.25em",
                  marginTop: "20px",
                  border: "1px solid lightgray",
                  borderRadius: "5px",
                  color: "gray",
                }}
              />
            </CardContentSide>
          </Grid>
          <Grid item xs={3}>
            <CardEditActions />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions
        sx={{ top: "20px", right: "20px", height: "30px", width: "30px" }}
      >
        <IconButton>
          <CloseIcon sx={{ fontSize: "20px" }}/>
        </IconButton>
      </CardActions>
    </React.Fragment>
  );
  return <CardContainer variant="outlined">{card}</CardContainer>;
};

export default DetailCard;
