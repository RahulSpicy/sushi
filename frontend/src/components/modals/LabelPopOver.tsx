import { css } from "@emotion/css";
import styled from "@emotion/styled";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { Button, IconButton, Input, Popover, Typography } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import globalContext from "../../context/globalContext";
import useAxiosGet from "../../hooks/useAxiosGet";
import { authAxios } from "../../utils/authAxios";
import { updateCard } from "../../utils/board";
import { backendUrl, colors } from "../../utils/const";
import { getAddBoardStyle } from "../../utils/getBg";

interface LabelPopOverProps {
  anchorEl: HTMLElement | null;
  handleClosePopover: () => void;
  list: any;
  card: any;
}

const ColorListContainer = styled.ul`
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  height: 15em;
  margin-bottom: 1.2em;
`;

const ColorList = styled.li`
  margin: 0.2em 1.2em;
  height: 2.5em;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ColorListItem = styled.p`
  border-radius: 0.2em;
  height: 60%;
  width: 90%;
  text-align: center;
  color: white;
`;

const LabelContainer = styled.div`
  width: 20em;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  margin: 1.2em;
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
  padding-left: 0.6em;
  list-style: none;
`;

const zipWith3 = (xs, ys, zs, f) => xs.map((n, i) => f(n, ys[i], zs[i]));

const getLiContent = (data, selected) => {
  if (!data) return [];

  return data.map((label) => {
    const checked =
      selected.find((selectedLabel) => selectedLabel.id === label.id) !==
      undefined;
    return {
      ...label,
      style: {
        backgroundColor: `#${label.color}`,
      },
      checked,
    };
  });
};

const LabelPopOver: React.FC<LabelPopOverProps> = ({
  anchorEl,
  handleClosePopover,
  list,
  card,
}) => {
  const { board, setBoard } = useContext(globalContext);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [showCreateLabel, setShowCreateLabel] = useState(false);
  const labelElem = useRef(null);
  const [label, setLabel] = useState(null);
  const { data, replaceItem } = useAxiosGet(
    `/boards/labels/?board=${board.id}`
  );

  const liContent = getLiContent(data, card.labels);

  const toggleLabel = async (labelId) => {
    const { data } = await authAxios.put(
      `${backendUrl}/boards/items/${card.id}/`,
      {
        title: card.title,
        labels: labelId,
      }
    );
    updateCard(board, setBoard)(list.id, data);
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClosePopover}
      anchorOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      {showCreateLabel ? (
        <CreateLabel
          labelElem={labelElem}
          setShowCreateLabel={setShowCreateLabel}
          label={label}
          replaceItem={replaceItem}
        />
      ) : (
        <LabelContainer ref={labelElem}>
          <HeaderContainer>
            <Typography variant="body1">Labels</Typography>
            <IconButton>
              <CloseOutlinedIcon />
            </IconButton>
          </HeaderContainer>
          <div>
            <ColorListContainer>
              {liContent.map((label) => {
                return (
                  <ColorList key={uuidv4()}>
                    <ColorListItem
                      onClick={() => toggleLabel(label.id)}
                      style={label.style}
                    >
                      {label.title}
                      {label.checked ? (
                        <CheckOutlinedIcon
                          style={{
                            float: "right",
                            marginRight: "0.6em",
                          }}
                        />
                      ) : null}
                    </ColorListItem>
                    <IconButton
                      onClick={() => {
                        setShowCreateLabel(true);
                        setLabel(label);
                      }}
                      style={{ marginLeft: "1em" }}
                    >
                      <CreateOutlinedIcon />
                    </IconButton>
                  </ColorList>
                );
              })}
            </ColorListContainer>
          </div>
        </LabelContainer>
      )}
    </Popover>
  );
};

const CreateLabel = ({ labelElem, setShowCreateLabel, label, replaceItem }) => {
  const [title, setTitle] = useState(label.title);
  const [color, setColor] = useState(label.color);
  return (
    <LabelContainer style={{ width: "25em" }}>
      <HeaderContainer>
        <IconButton
          style={{ marginRight: "auto", marginLeft: 0 }}
          onClick={() => setShowCreateLabel(false)}
        >
          <KeyboardArrowLeftOutlinedIcon />
        </IconButton>
        <Typography
          variant="body1"
          style={{ marginRight: "auto", marginLeft: 0 }}
        >
          Create
        </Typography>
      </HeaderContainer>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "0.6em 1.2em",
        }}
      >
        <Typography variant="body1" mb="0.4em">
          Name
        </Typography>
        <Input
          placeholder="Enter label name"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <Typography variant="body1" fontWeight={600} ml="1.2em" mt="1.2em">
          Select a color
        </Typography>
        <CreateBlock>
          {colors.map((colorOption) => {
            return (
              <li
                style={{
                  marginBottom: "0.5em",
                  marginRight: "0.7em",
                }}
                key={uuidv4()}
              >
                <Button
                  className={
                    color === colorOption[0].substring(1)
                      ? css`
                          filter: brightness(90%);
                        `
                      : ""
                  }
                  onClick={() => setColor(colorOption[0].substring(1))}
                  style={getAddBoardStyle(...colorOption)}
                >
                  {color === colorOption[0].substring(1) ? (
                    <CheckOutlinedIcon style={{ color: "white" }} />
                  ) : null}
                </Button>
              </li>
            );
          })}
        </CreateBlock>
      </div>
      <Button
        onClick={async () => {
          const { data } = await authAxios.put(
            `${backendUrl}/boards/labels/${label.id}/`,
            {
              title,
              color,
            }
          );
          replaceItem(data);
          setShowCreateLabel(false);
        }}
        variant="outlined"
        style={{
          alignSelf: "center",
          width: "60%",
          fontWeight: "600",
          marginTop: "10px",
          marginBottom: "20px",
        }}
      >
        Save
      </Button>
    </LabelContainer>
  );
};

export default LabelPopOver;
