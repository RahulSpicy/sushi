import styled from "@emotion/styled";
import { IconButton, Typography } from "@mui/material";
import HomeSidebar from "../components/sidebars/HomeSidebar";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const HomeWrapper = styled.div`
  display: flex;
  background-color: #f6f7fb;
  padding: 100px 200px 0;
  width: 100vw;
  min-height: 100vh;
  height: 100%;
`;

const HomeSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5em;
`;

const HomeBoards = styled.div`
display: flex;
        flex-wrap: wrap;
        margin-bottom: 1em;
        > .board-preview {
            margin: 0 1em 1.5em;
            width: calc(25% - 1.5em);

            &:nth-of-type(4n + 1) {
                margin-left: 0;
            }

            &:nth-of-type(4n) {
                margin-right: 0;
            }
        }
    }
`;

const Home = () => {
  return (
    <HomeWrapper>
      <HomeSidebar />
      <div style={{ flex: 5, paddingLeft: "1.5em" }}>
        <HomeSection>
          <div style={{ display: "flex", alignItems: "center" }}>
            <AccessTimeOutlinedIcon />
            <Typography fontWeight={400} variant="h6" ml={1}>
              Recently Viewed
            </Typography>
          </div>
        </HomeSection>
        <HomeBoards>here</HomeBoards>
        <HomeSection>
          <div style={{ display: "flex", alignItems: "center" }}>
            <PersonOutlineOutlinedIcon />
            <Typography fontWeight={400} variant="h6" ml={1}>
              Personal Boards
            </Typography>{" "}
          </div>
          <IconButton>
            <AddOutlinedIcon />
          </IconButton>
        </HomeSection>
        <HomeBoards>here</HomeBoards>
      </div>
    </HomeWrapper>
  );
};

export default Home;
