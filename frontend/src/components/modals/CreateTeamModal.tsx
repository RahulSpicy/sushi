import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Modal } from "@mui/material";
import useAxiosGet from "../../hooks/useAxiosGet";
import CreateTeamForm from "./CreateTeamForm";

interface CreateTeamModalProps {
  setOpen: boolean;
  handleClose: (open: boolean) => void;
}

const CreateTeamModal: React.FC<CreateTeamModalProps> = ({
  setOpen,
  handleClose,
}) => {
  const { addItem: addProject } = useAxiosGet("/projects/");
  return (
    <Modal open={setOpen} onClose={handleClose}>
      <div className="absolute top-1/2 left-1/2 w-[45%] bg-white rounded p-1 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex">
          <IconButton
            sx={{ height: "30px", width: "30px", marginLeft: "auto" }}
            onClick={handleClose}
          >
            <CloseIcon sx={{ fontSize: "20px" }} />
          </IconButton>
        </div>

        <div className="flex-1 pb-4 pr-4 pl-4">
          <h1 className="font-mono text-2xl font-semibold mb-1">
            Start a project
          </h1>
          <p className="font-mono mb-5 text-gray-600">
            Team up without the chaos! Build the workflow you want.
          </p>
          <CreateTeamForm addProject={addProject} handleClose={handleClose} />
        </div>
      </div>
    </Modal>
  );
};

export default CreateTeamModal;
