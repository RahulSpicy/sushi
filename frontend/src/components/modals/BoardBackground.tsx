import styled from "@emotion/styled";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Button, IconButton, Popover, Typography } from "@mui/material";
import { useState } from "react";
import { colors, images } from "../../utils/const";

interface BoardBackgroundProps {
  anchorEl: HTMLElement | null;
  handleClosePopover: () => void;
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
}) => {
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [selected, setSelected] = useState({});
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
          <IconButton>
            <CloseOutlinedIcon />
          </IconButton>
        </HeaderContainer>
        <div>
          <Typography fontWeight={500} variant="body1" ml="1em" mt="1.2em">
            Photos
          </Typography>
          <CreateBlock>
            {images.map((s) => {
              return (
                <ListItem key={s}>
                  <ColorBoxButton style={s} onClick={setSelected}>
                    {selected === s ? (
                      <CheckOutlinedIcon style={{ color: "white" }} />
                    ) : null}
                  </ColorBoxButton>
                </ListItem>
              );
            })}
          </CreateBlock>
        </div>
        <div>
          <Typography fontWeight={500} variant="body1" ml="1em" mt="1.2em">
            Colors
          </Typography>
          <CreateBlock>
            {colors.map((s) => {
              return (
                <ListItem key={s}>
                  <ColorBoxButton style={s} onClick={setSelected}>
                    {selected === s ? (
                      <CheckOutlinedIcon style={{ color: "white" }} />
                    ) : null}
                  </ColorBoxButton>
                </ListItem>
              );
            })}
          </CreateBlock>
        </div>
      </BoardBackgroundContainer>
    </Popover>
  );
};

export default BoardBackground;
