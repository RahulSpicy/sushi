import styled from "@emotion/styled";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, Button, IconButton, Input, Modal } from "@mui/material";
import { useRef, useState } from "react";
import BoardBackground from "./BoardBackground";

interface AddBoardModalProps {
  setOpen: boolean;
  handleClose: (open: boolean) => void;
}

const options = [
  [
    "https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1391&q=80",
    true,
  ],
  [
    "https://images.unsplash.com/photo-1524129426126-1b85d8c74fd2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=614&q=80",
    true,
  ],
  [
    "https://images.unsplash.com/photo-1625472603525-6b77bfed6165?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1198&q=80",
    true,
  ],
  [
    "https://images.unsplash.com/photo-1661094715908-52ed93067985?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    true,
  ],
  ["#4680FF", false],
  ["red", false],
  ["#FFB64D", false],
  ["purple", false],
];

function deepEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }

  return true;
}

function isObject(object) {
  return object != null && typeof object === "object";
}

const ModalContainer = styled(Box)`
  top: 30px;
  right: 0;
  display: flex;
  left: 30%;
  position: fixed;
`;

const TitleBlock = styled.div`
  height: 160px;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 5px;
  width: 350px;
`;

const TitleInput = styled(Input)`
  border: 0;
  font-weight: 600;
  color: white;
  margin-left: 0.5em;
  margin-top: 0.5em;
  background-color: transparent;
  border-radius: 5px;
  padding: 0.5em;
  font-size: 1.125rem;
  &:hover,
  &:focus {
    background-color: rgba(white, 0.2);
  }
`;

const CloseContainer = styled.div`
  float: right;
  margin-right: 1em;
  margin-top: 1em;
`;

const ColorBoxButton = styled(Button)`
  height: 48px;
  width: 48px;
  border: 0;
  border-radius: 5px;
  margin-bottom: 0.5em;
  margin-right: 0.5em;
  position: relative;
  background-color: white;

  &--img {
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

const AddBoardModal: React.FC<AddBoardModalProps> = ({
  setOpen,
  handleClose,
}) => {
  const [background, setBackground] = useState(
    bgImage(
      "https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1391&q=80"
    )
  );
  const [title, setTitle] = useState("");
  const [showBoardModal, setShowBoardModal] = useState(false);
  const cardElem = useRef(null);

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setShowBoardModal(true);
    setBackground(bgImage(event.currentTarget.value));
  };
  return (
    <Modal open={setOpen} onClose={handleClose}>
      <ModalContainer>
        <div>
          <TitleBlock style={background}>
            <TitleInput
              placeholder="Add board title"
              onChange={(t) => {
                setTitle(t.target.value);
              }}
            />
            <CloseContainer>
              <IconButton
                sx={{ height: "30px", width: "30px", color: "white" }}
                // onClick={handleClose}
              >
                <CloseIcon sx={{ fontSize: "20px" }} />
              </IconButton>
            </CloseContainer>
          </TitleBlock>
          {title.trim() !== "" ? (
            <Button
              variant="contained"
              type="submit"
              style={{
                width: "100%",
                textAlign: "center",
                padding: "0.85em 2em",
                marginTop: "0.5em",
                backgroundColor: "white",
                color: "black",
              }}
            >
              Create Board
            </Button>
          ) : (
            <Button
              variant="contained"
              type="submit"
              disabled
              style={{
                width: "100%",
                textAlign: "center",
                padding: "0.85em 2em",
                marginTop: "0.5em",
              }}
            >
              Create Board
            </Button>
          )}
        </div>
        <div style={{ marginLeft: "0.5em", width: "250px" }} ref={cardElem}>
          {options.map((option, index) => (
            <ColorBoxButton
              key={index}
              style={bgImage(...option)}
              onClick={() => {
                setBackground(bgImage(...option));
              }}
            >
              {deepEqual(background, bgImage(...option)) ? (
                <CheckOutlinedIcon style={{ color: "white" }} />
              ) : null}
            </ColorBoxButton>
          ))}
          <ColorBoxButton onClick={handleClick}>
            <MoreHorizIcon />
          </ColorBoxButton>
        </div>
        {showBoardModal ? (
          <BoardBackground
            handleClosePopover={handleClosePopover}
            anchorEl={anchorEl}
            setShowBoardModal={setShowBoardModal}
            setBackground={setBackground}
          />
        ) : null}
      </ModalContainer>
    </Modal>
  );
};

const bgImage = (bg, img = true) => {
  if (img) return { backgroundImage: `url(${bg})`, backgroundSize: "cover" };
  return { backgroundColor: bg };
};

export default AddBoardModal;
