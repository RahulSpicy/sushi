import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal } from "@mui/material";
import useAxiosGet from "../../hooks/useAxiosGet";
import CreateTeamForm from "./CreateTeamForm";

interface CreateTeamModalProps {
  setOpen: boolean;
  handleClose: (open: boolean) => void;
}

const CardContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 45%;
  background-color: white;
  border-radius: 5px;
  padding: 5px;
`;

const CloseContainer = styled.div`
  display: flex;
`;

const FormContainer = styled.div`
  flex: 1;
  padding: 0 1.5em 1.5em 1.5em;
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

const CreateTeamModal: React.FC<CreateTeamModalProps> = ({
  setOpen,
  handleClose,
}) => {
  const { addItem: addProject } = useAxiosGet("/projects/");
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

        <FormContainer>
          <Title>Start a project</Title>
          <SubTitle>
            Team up without the chaos! Build the workflow you want.
          </SubTitle>
          <CreateTeamForm addProject={addProject} handleClose={handleClose} />
        </FormContainer>
      </CardContainer>
    </Modal>
  );
};

export default CreateTeamModal;
