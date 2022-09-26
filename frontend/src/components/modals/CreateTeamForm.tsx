import styled from "@emotion/styled";
import { Button, TextareaAutosize } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { authAxios } from "../../utils/authAxios";
import { backendUrl } from "../../utils/const";

type FormData = {
  title: string;
  description: string;
  members: string;
};

const Label = styled.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 0.3em;
`;

interface CreateTeamFormProps {
  addProject: any;
  handleClose: (open: boolean) => void;
}

const CreateTeamForm = ({ addProject, handleClose }: CreateTeamFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const titleValue = watch("title", "");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const invitedMembers =
      data.members !== ""
        ? data.members.split(",").map((user) => user.trim())
        : [];
    try {
      const { data: resData } = await authAxios.post(
        backendUrl + "/projects/",
        data
      );
      if (invitedMembers.length !== 0) {
        await authAxios.post(backendUrl + `/projects/${resData.id}/invite/`, {
          users: invitedMembers,
        });
      }
      addProject(resData);
    } catch (error) {
      console.log(error);
    }
    handleClose(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="name">Project Name</Label>
      <TextareaAutosize
        {...register("title")}
        required
        placeholder="The Boys"
        style={{
          padding: "0.5em",
          width: "98%",
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
          width: "98%",
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
          width: "98%",
          marginBottom: "1em",
          resize: "none",
        }}
      />

      {titleValue.trim() !== "" ? (
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{
            display: "block",
            width: "100%",
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
          type="submit"
          disabled
          style={{
            display: "block",
            width: "100%",
            textAlign: "center",
            padding: "0.85em 2em",
            borderRadius: "3px",
          }}
        >
          Create Project
        </Button>
      )}
    </form>
  );
};

export default CreateTeamForm;
