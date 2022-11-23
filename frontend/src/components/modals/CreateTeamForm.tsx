import { TextareaAutosize } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { authAxios } from "../../utils/authAxios";
import { backendUrl } from "../../utils/const";

type FormData = {
  title: string;
  description: string;
  members: string;
};

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
      <label htmlFor="name" className="block font-medium font-mono mb-1">
        Project Name
      </label>
      <TextareaAutosize
        {...register("title")}
        required
        placeholder="The Boys"
        style={{
          padding: "0.5em",
          width: "100%",
          marginBottom: "1em",
          resize: "none",
        }}
      />
      <label htmlFor="description" className="block font-medium font-mono mb-1">
        Project Description
      </label>

      <TextareaAutosize
        {...register("description")}
        placeholder="Get your members on board with a few words about your project."
        style={{
          resize: "none",
          width: "100%",
          height: "100px",
          padding: "0.5em",
          marginBottom: "1em",
        }}
      />
      <label htmlFor="members" className="block font-medium font-mono mb-1">
        Invite Members
      </label>

      <TextareaAutosize
        {...register("members")}
        placeholder="Type in username or email"
        style={{
          padding: "0.5em",
          width: "100%",
          marginBottom: "1em",
          resize: "none",
        }}
      />

      {titleValue.trim() !== "" ? (
        <button
          className="bg-black text-white font-semibold text-xl py-3 px-4 rounded w-full tracking-wider font-mono"
          type="submit"
        >
          Create Project
        </button>
      ) : (
        <button
          className="bg-black text-white font-semibold text-xl py-3 px-4 rounded opacity-50 cursor-not-allowed w-full tracking-wider font-mono"
          disabled
        >
          Create Project
        </button>
      )}
    </form>
  );
};

export default CreateTeamForm;
