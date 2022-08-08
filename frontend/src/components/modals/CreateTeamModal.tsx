import { css } from "@emotion/css";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import { Button, TextareaAutosize } from "@mui/material";
import Image from "next/image";
import { useForm } from "react-hook-form";
import board from "../../images/board.svg";

interface CreateTeamModalProps {
  setShowModal: (showModal: boolean) => void;
}

type FormData = {
  name: string;
  description: string;
  members: string[];
};

const CreateTeam = styled.div`
  z-index: 4;
  background-color: white;
  border-radius: 5px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 925px;
  display: flex;
`;

const CreateTeamForm = styled.div`
  flex: 1;
  padding: 3em 0 3em 3em;
`;

const CreateTeamBg = styled.div`
  flex: 1;
`;

const Label = styled.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 0.3em;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 0.75em;
`;

const SubTitle = styled.p`
color: #838282
margin-bottom: 1.5em;
`;

const fal = css`
  position: fixed;
  top: 20px;
  right: 20px;
  font-size: 1.25rem;
`;

const CreateTeamModal: React.FC<CreateTeamModalProps> = ({ setShowModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const nameValue: String = watch("name", "");

  const onSubmit = (data: any) => {
    console.log(data);
    setShowModal(false);
  };

  return (
    <CreateTeam>
      <CreateTeamForm>
        <Title>Start a Project</Title>
        <SubTitle>
          Boost your productivity by making it easier for everyone to access
          boards in one location.
        </SubTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="name">Project Name</Label>
          <TextareaAutosize
            {...register("name")}
            required
            placeholder="The Boys"
            style={{
              padding: "0.5em",
              width: "80%",
              marginBottom: "1em",
              resize: "none",
            }}
          />
          <Label htmlFor="description">Project Description</Label>
          <TextareaAutosize
            {...register("description")}
            placeholder="Get your members on board with a few words about your project"
            style={{
              resize: "none",
              width: "80%",
              height: "100px",
              padding: "0.5em",
              marginBottom: "1em",
            }}
          />

          <Label htmlFor="members">Invite Members</Label>
          <TextareaAutosize
            {...register("members")}
            placeholder="Type in username or email"
            style={{
              padding: "0.5em",
              width: "80%",
              marginBottom: "1em",
              resize: "none",
            }}
          />
          {nameValue.trim() !== "" ? (
            <Button
              variant="contained"
              color="primary"
              style={{
                display: "block",
                width: "83.5%",
                textAlign: "center",
                padding: "0.85em 2em",
                borderRadius: "3px",
              }}
            >
              Create Project
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              disabled
              style={{
                display: "block",
                width: "83.5%",
                textAlign: "center",
                padding: "0.85em 2em",
                borderRadius: "3px",
              }}
            >
              Create Project
            </Button>
          )}
        </form>
      </CreateTeamForm>
      <CreateTeamBg>
        <Button onClick={() => setShowModal(false)}>
          <CloseIcon className={fal} />
        </Button>
        <Image src={board} alt="board" width={400} height={500} />
      </CreateTeamBg>
    </CreateTeam>
  );
};

export default CreateTeamModal;
