import { css } from "@emotion/css";
import styled from "@emotion/styled";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { Button, IconButton, Input, Popover, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { colors } from "../../utils/const";

interface LabelPopOverProps {
  anchorEl: HTMLElement | null;
  handleClosePopover: () => void;
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

const LabelPopOver: React.FC<LabelPopOverProps> = ({
  anchorEl,
  handleClosePopover,
}) => {
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [showCreateLabel, setShowCreateLabel] = useState(false);
  const labelElem = useRef(null);
  const [liId, setLiId] = useState(-1);
  const [liContent, setLiContent] = useState(
    zipWith3(
      colors,
      Array(colors.length).fill(""),
      Array(colors.length).fill(false),
      (style, content, checked) => {
        return {
          style: style,
          content: content,
          checked: checked,
        };
      }
    )
  );

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
          liContent={liContent}
          setLiContent={setLiContent}
          liId={liId}
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
              {liContent.map((x, index) => (
                <ColorList key={index}>
                  <ColorListItem
                    onClick={() => {
                      setLiContent((it) => {
                        return it.map((item, idx) => {
                          let nitem;
                          if (idx === index) {
                            nitem = { ...item };
                            nitem.checked = !item.checked;
                            return nitem;
                          }
                          return item;
                        });
                      });
                    }}
                    style={x.style}
                  >
                    {x.content}
                    {x.checked ? (
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
                      setLiId(index);
                    }}
                    style={{ marginLeft: "1em" }}
                  >
                    <CreateOutlinedIcon />
                  </IconButton>
                </ColorList>
              ))}
            </ColorListContainer>
          </div>
        </LabelContainer>
      )}
    </Popover>
  );
};

const CreateLabel = ({
  labelElem,
  setShowCreateLabel,
  liContent,
  setLiContent,
  liId,
}) => {
  const [content, setContent] = useState("");
  const [color, setColor] = useState(liContent[liId].style);
  return (
    <LabelContainer style={{ width: "25em" }}>
      <HeaderContainer>
        <IconButton onClick={() => setShowCreateLabel(false)}>
          <KeyboardArrowLeftOutlinedIcon />
        </IconButton>
        <Typography variant="body1">Create</Typography>
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
          onChange={(t) => setContent(t.target.value)}
        />
      </div>

      <div>
        <Typography variant="body1" fontWeight={600} ml="1.2em" mt="1.2em">
          Select a color
        </Typography>
        <CreateBlock>
          {colors.map((x) => {
            return (
              <li
                style={{
                  marginBottom: "0.5em",
                  marginRight: "0.7em",
                }}
                key={x}
              >
                <Button
                  className={
                    color === x
                      ? css`
                          filter: brightness(90%);
                        `
                      : ""
                  }
                  onClick={() => setColor(x)}
                  style={x}
                >
                  {color === x ? (
                    <CheckOutlinedIcon style={{ color: "white" }} />
                  ) : null}
                </Button>
              </li>
            );
          })}
          {/* <li
            style={{
              marginBottom: "0.5em",
              marginRight: "0.7em",
              alignSelf: "center",
            }}
          >
            <Button>No Color</Button>
          </li> */}
        </CreateBlock>
      </div>
      <Button
        onClick={() => {
          setShowCreateLabel(false);
          if (content !== "") liContent[liId].content = content;
          liContent[liId].style = color;
          setLiContent(liContent);
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
        Create
      </Button>
    </LabelContainer>
  );
};

export default LabelPopOver;
