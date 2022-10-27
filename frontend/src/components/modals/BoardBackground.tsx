import styled from "@emotion/styled";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Button, IconButton, Popover, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
import useAxiosGet from "../../hooks/useAxiosGet";
import { colors } from "../../utils/const";
import { convertUnsplashToOptions, getAddBoardStyle } from "../../utils/getBg";

interface BoardBackgroundProps {
  anchorEl: HTMLElement | null;
  handleClosePopover: () => void;
  setShowBoardModal: Dispatch<SetStateAction<boolean>>;
  extraBackground: any;
  setExtraBackground: Dispatch<SetStateAction<any>>;
  setSelectedBackground: Dispatch<SetStateAction<any>>;
}

const BoardBackgroundContainer = styled.div`
  width: 20em;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  margin: 1em;
  margin-bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CreateBlock = styled.ul`
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  margin: 0.6em 0.4em;
  padding-left: 1.25em;
  list-style: none;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 8em;
`;

const ListItem = styled.li`
  margin-bottom: 0.5em;
  margin-right: 0.7em;
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

const BoardBackground: React.FC<BoardBackgroundProps> = ({
  anchorEl,
  handleClosePopover,
  setShowBoardModal,
  extraBackground,
  setExtraBackground,
  setSelectedBackground,
}) => {
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const accessKey = process.env.UNSPLASH_API_ACCESS_KEY;

  const { data } = useAxiosGet(
    `https://api.unsplash.com/photos?client_id=${accessKey}&page=2`,
    false
  );
  const images = convertUnsplashToOptions(data);

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClosePopover}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      sx={{ marginLeft: "5px" }}
    >
      <BoardBackgroundContainer>
        <HeaderContainer>
          <Typography variant="body1">Board Background</Typography>
          <IconButton onClick={() => setShowBoardModal(false)}>
            <CloseOutlinedIcon />
          </IconButton>
        </HeaderContainer>
        <div>
          <Typography fontWeight={500} variant="body1" ml="1em" mt="1.2em">
            Photos
          </Typography>
          <CreateBlock>
            {images.slice(0, 6).map((imageOption) => (
              <ListItem key={uuidv4()}>
                <ColorBoxButton
                  style={getAddBoardStyle(...imageOption)}
                  onClick={() => {
                    setExtraBackground(imageOption);
                    setSelectedBackground(0);
                  }}
                >
                  {extraBackground?.[0] === imageOption?.[0] ? (
                    <CheckOutlinedIcon style={{ color: "white" }} />
                  ) : null}
                </ColorBoxButton>
              </ListItem>
            ))}
          </CreateBlock>
        </div>
        <div>
          <Typography fontWeight={500} variant="body1" ml="1em" mt="1.2em">
            Colors
          </Typography>
          <CreateBlock>
            {colors.slice(0, 6).map((colorOption) => (
              <ListItem key={uuidv4()}>
                <ColorBoxButton
                  style={getAddBoardStyle(...colorOption)}
                  onClick={() => {
                    setExtraBackground(colorOption);
                    setSelectedBackground(0);
                  }}
                >
                  {extraBackground?.[0] === colorOption[0] ? (
                    <CheckOutlinedIcon style={{ color: "white" }} />
                  ) : null}
                </ColorBoxButton>
              </ListItem>
            ))}
            <ListItem style={{ display: "none" }}>
              <Button></Button>
            </ListItem>
          </CreateBlock>
        </div>
      </BoardBackgroundContainer>
    </Popover>
  );
};

export default BoardBackground;
