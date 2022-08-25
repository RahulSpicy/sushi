import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import EditableField from "../common/EditableField";
import EditableTextField from "../common/EditableTextField";
import CardEditActions from "./CardEditActions";
import Labels from "./Labels";

interface CardProps {
  setOpen: boolean;
  handleClose: (open: boolean) => void;
  cardData: any;
}

const CardContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 55%;
  background-color: white;
  border-radius: 5px;
  padding: 5px;
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

const CloseContainer = styled.div`
  display: flex;
`;

const Card: React.FC<CardProps> = ({ setOpen, handleClose, cardData }) => {
  return (
    <Modal open={setOpen} onClose={handleClose}>
      <CardContainer>
        <CloseContainer>
          <IconButton
            sx={{ height: "30px", width: "30px", marginLeft: "auto" }}
            // onClick={handleClose}
          >
            <CloseIcon sx={{ fontSize: "20px" }} />
          </IconButton>
        </CloseContainer>
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
              <EditableTextField desc={cardData.description} />

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
                  startIcon={<AddIcon />}
                  size="small"
                  style={{
                    marginLeft: "40px",
                    backgroundColor: "#ebebeb",
                    color: "gray",
                  }}
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
      </CardContainer>
    </Modal>
  );
};

export default Card;
