import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Input,
  Modal,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import globalContext from "../../context/globalContext";
import useAxiosGet from "../../hooks/useAxiosGet";
import { authAxios } from "../../utils/authAxios";
import { updateCard } from "../../utils/board";
import { backendUrl } from "../../utils/const";
import { timeSince } from "../../utils/humanizeDuration";
import Labels from "../boards/Labels";
import MemberListItem from "../boards/MemberListItem";
import CardEditActions from "./CardEditActions";

interface CardEditModalProps {
  setOpen: boolean;
  handleClose: (open: boolean) => void;
  card: any;
  list: any;
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

const AttachmentList = styled.ul`
  margin-bottom: 1rem;
`;

const AttachmentContent = styled.div`
  flex: 2;
  display: flex;
  flex-direction: row;
  margin-left: 100px;
  align-items: center;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
`;

const CommentHeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const CommentHeaderRight = styled.div`
  font-size: 0.875em;
  font-weight: 300;
`;

const CardEditModal: React.FC<CardEditModalProps> = ({
  setOpen,
  handleClose,
  card,
  list,
}) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);

  const {
    data: comments,
    addItem: addComment,
    replaceItem: replaceComment,
    removeItem: removeComment,
  } = useAxiosGet(`/boards/comments/?item=${card.id}`);

  console.log(card);

  return (
    <Modal open={setOpen} onClose={handleClose}>
      <CardContainer>
        <CloseContainer>
          <IconButton
            sx={{ height: "30px", width: "30px", marginLeft: "auto" }}
            onClick={handleClose}
          >
            <CloseIcon sx={{ fontSize: "20px" }} />
          </IconButton>
        </CloseContainer>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <CardContentSide>
              <Labels labels={card.labels} />
              {!editingTitle ? (
                <Typography onClick={() => setEditingTitle(true)}>
                  {card.title}
                </Typography>
              ) : (
                <EditCardTitle
                  list={list}
                  card={card}
                  setEditingTitle={setEditingTitle}
                />
              )}

              <p style={{ fontSize: "12px" }}>
                in list <b style={{ fontWeight: "600" }}>{list.title}</b>
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
                {card.description !== "" && (
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<EditOutlinedIcon />}
                    sx={{ marginLeft: "400px" }}
                    onClick={() => setEditingDescription(true)}
                  >
                    Edit
                  </Button>
                )}
              </LogoTextContainer>

              {card.description !== "" && !editingDescription && (
                <p>{card.description}</p>
              )}
              {editingDescription ? (
                <EditCardDescription
                  list={list}
                  card={card}
                  setEditingDescription={setEditingDescription}
                />
              ) : (
                card.description === "" && (
                  <Button onClick={() => setEditingDescription(true)}>
                    Add description
                  </Button>
                )
              )}

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
                    marginLeft: "400px",
                    backgroundColor: "#ebebeb",
                    color: "gray",
                  }}
                >
                  Add
                </Button>
              </LogoTextContainer>
              <Attachments attachments={card.attachments} />
              <CommentForm
                card={card}
                addComment={addComment}
                comment={undefined}
                replaceComment={undefined}
                setIsEditing={undefined}
              />
              <Comments
                card={card}
                comments={comments || []}
                replaceComment={replaceComment}
                removeComment={removeComment}
              />
            </CardContentSide>
          </Grid>
          <Grid item xs={3}>
            <CardEditActions card={card} />
          </Grid>
        </Grid>
      </CardContainer>
    </Modal>
  );
};

const EditCardTitle = ({ list, card, setEditingTitle }) => {
  const { board, setBoard } = useContext(globalContext);
  const [title, setTitle] = useState(card.title);

  const onEditTitle = async (e) => {
    e.preventDefault();
    if (title.trim() === "") return;
    const { data } = await authAxios.put(
      `${backendUrl}/boards/items/${card.id}/`,
      {
        title,
      }
    );
    setEditingTitle(false);
    updateCard(board, setBoard)(list.id, data);
  };

  return (
    <form onSubmit={onEditTitle}>
      <Input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></Input>
    </form>
  );
};

const EditCardDescription = ({ list, card, setEditingDescription }) => {
  const { board, setBoard } = useContext(globalContext);
  const [description, setDescription] = useState(card.description);

  const onEditDesc = async (e) => {
    e.preventDefault();
    if (description.trim() === "") return;
    const { data } = await authAxios.put(
      `${backendUrl}/boards/items/${card.id}/`,
      {
        title: card.title,
        description,
      }
    );
    setEditingDescription(false);
    updateCard(board, setBoard)(list.id, data);
  };

  return (
    <form onSubmit={onEditDesc}>
      <TextareaAutosize
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add description..."
      ></TextareaAutosize>
      {description.trim() !== "" && <Button type="submit">Save</Button>}
    </form>
  );
};

const Attachments = ({ attachments }) =>
  attachments.length !== 0 && (
    <AttachmentList>
      {attachments.map((attachment) => (
        <li
          key={uuidv4()}
          style={{
            listStyle: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png"
              alt=""
              style={{ flex: "1", borderRadius: "5px" }}
              objectFit="contain"
              height={24}
              width={24}
            />
            <AttachmentContent>
              <Typography fontWeight={300} mb="0.75em">
                {timeSince(attachment.created_at)}
              </Typography>
              <Typography mb="0.5em">file</Typography>
              <Typography mb="0.5em">{attachment.title}</Typography>
              <div style={{ marginTop: "auto", display: "flex" }}>
                <Button>Download</Button>
                <Button>Delete</Button>
              </div>
            </AttachmentContent>
          </div>
        </li>
      ))}
    </AttachmentList>
  );

const Comments = ({ card, comments, replaceComment, removeComment }) => {
  const { authUser } = useContext(globalContext);
  const [isEditing, setIsEditing] = useState(false);

  if (comments.length === 0) return null;

  const onDelete = async (comment) => {
    await authAxios.delete(`${backendUrl}/boards/comments/${comment.id}/`);
    removeComment(comment.id);
  };

  return (
    <ul style={{ marginBottom: "1.75em", paddingLeft: "10px" }}>
      {comments.map((comment) => (
        <li key={uuidv4()} style={{ listStyle: "none" }}>
          <div>
            <CommentHeader>
              <CommentHeaderLeft>
                <MemberListItem user={comment.author} header="true" />
                <div style={{ marginLeft: "0.5em" }}>
                  <Typography>{comment.author.full_name}</Typography>
                  <Typography>{timeSince(comment.created_at)}</Typography>
                </div>
              </CommentHeaderLeft>
              {comment.author.username === authUser.username && (
                <CommentHeaderRight>
                  <Button onClick={() => setIsEditing(comment.id)}>Edit</Button>{" "}
                  - <Button onClick={() => onDelete(comment)}>Delete</Button>
                </CommentHeaderRight>
              )}
            </CommentHeader>
            {isEditing !== comment.id ? (
              <div>{comment.body}</div>
            ) : (
              <CommentForm
                card={card}
                comment={comment}
                replaceComment={replaceComment}
                setIsEditing={setIsEditing}
                addComment={undefined}
              />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

const CommentForm = ({
  card,
  comment,
  addComment,
  replaceComment,
  setIsEditing,
}) => {
  // If comment not null, edit form
  const [commentBody, setCommentBody] = useState(comment ? comment.body : "");

  const onAddComment = async (e) => {
    e.preventDefault();
    if (commentBody.trim() === "") return;
    const { data } = await authAxios.post(`${backendUrl}/boards/comments/`, {
      item: card.id,
      body: commentBody,
    });
    addComment(data);
    setCommentBody("");
  };

  const onEditComment = async (e) => {
    e.preventDefault();
    if (commentBody.trim() === "") return;
    const { data } = await authAxios.put(
      `${backendUrl}/boards/comments/${comment.id}/`,
      {
        body: commentBody,
      }
    );
    replaceComment(data);
    setIsEditing(false);
  };
  return (
    <form onSubmit={comment ? onEditComment : onAddComment}>
      {/* <TextareaAutosize
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
      /> */}
      <textarea
        placeholder="Leave a comment..."
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
      ></textarea>
      {commentBody.trim() !== "" && <Button type="submit">Comment</Button>}
    </form>
  );
};

export default CardEditModal;
