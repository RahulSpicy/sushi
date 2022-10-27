import styled from "@emotion/styled";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, Button, IconButton, Input, Modal } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useAxiosGet from "../../hooks/useAxiosGet";
import { authAxios } from "../../utils/authAxios";
import { backendUrl } from "../../utils/const";
import { getAddBoardStyle, getBoardBackgroundOptions } from "../../utils/getBg";
import BoardBackground from "./BoardBackground";

interface AddBoardModalProps {
  setOpen: boolean;
  handleClose: (open: boolean) => void;
  addBoard: any;
  project: any;
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
  addBoard,
  project,
}) => {
  const [selectedBackground, setSelectedBackground] = useState(0);
  const [extraBackground, setExtraBackground] = useState(null);
  const [title, setTitle] = useState("");
  const [showBoardModal, setShowBoardModal] = useState(false);
  const boardElem = useRef(null);

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setShowBoardModal(true);
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const bg = options[selectedBackground];
    const formData = { title };
    if (project !== 0) formData.project = project;
    if (bg[1]) {
      // Image_url
      formData.image_url = bg[2];
    } else {
      // color
      formData.color = bg[0].substring(1); // We don't store # char in backend
    }
    const { data } = await authAxios.post(`${backendUrl}/boards/`, formData);
    addBoard(data);
    setShowBoardModal(false);
    handleClose(false);
  };

  const accessKey = "ChMO0QbHsNNPtsUiVhepzaS1s-6JSjzwRMhh-YV-k_I";
  // const accessKey = process.env.UNSPLASH_API_ACCESS_KEY;
  const { data } = useAxiosGet(
    `https://api.unsplash.com/photos?client_id=${accessKey}`,
    false
  );

  const options = useMemo(() => getBoardBackgroundOptions(data), [data]); // So we don't reshuffle on state change
  if (extraBackground) options[0] = extraBackground;

  useEffect(() => {
    if (selectedBackground !== 0) setExtraBackground(null);
  }, [selectedBackground]);

  if (!data) return null;

  return (
    <Modal open={setOpen} onClose={handleClose}>
      <ModalContainer>
        {showBoardModal ? (
          <BoardBackground
            handleClosePopover={handleClosePopover}
            anchorEl={anchorEl}
            setShowBoardModal={setShowBoardModal}
            extraBackground={extraBackground}
            setExtraBackground={setExtraBackground}
            setSelectedBackground={setSelectedBackground}
          />
        ) : null}
        <div>
          <form onSubmit={onSubmit}>
            <TitleBlock
              style={getAddBoardStyle(...options[selectedBackground])}
            >
              <TitleInput
                placeholder="Add board title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <CloseContainer>
                <IconButton
                  sx={{ height: "30px", width: "30px", color: "white" }}
                  onClick={handleClose}
                >
                  <CloseIcon sx={{ fontSize: "20px" }} />
                </IconButton>
              </CloseContainer>
            </TitleBlock>
            {title.trim() === "" ? (
              <Button
                variant="contained"
                type="submit"
                disabled
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
          </form>
        </div>
        <div style={{ marginLeft: "0.5em", width: "250px" }} ref={boardElem}>
          {options.map((option, index) => (
            <ColorBoxButton
              key={uuidv4()}
              style={getAddBoardStyle(...option)}
              onClick={() => {
                setSelectedBackground(index);
              }}
            >
              {" "}
              {selectedBackground == index && (
                <CheckOutlinedIcon style={{ color: "white" }} />
              )}{" "}
            </ColorBoxButton>
          ))}
          <ColorBoxButton onClick={handleClick}>
            <MoreHorizIcon />
          </ColorBoxButton>
        </div>
      </ModalContainer>
    </Modal>
  );
};

export default AddBoardModal;
