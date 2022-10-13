import styled from "@emotion/styled";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Button, IconButton, Popover, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { authAxios } from "../../utils/authAxios";
import { backendUrl } from "../../utils/const";
import { timeSince } from "../../utils/humanizeDuration";
import Labels from "../boards/Labels";
import MemberListItem from "../boards/MemberListItem";
import dog from "../../images/dog.svg";
import CommentIcon from "@mui/icons-material/Comment";

interface NotificationsModalProps {
  anchorEl: HTMLElement | null;
  handleClosePopover: () => void;
  notifications: any;
  setNotifications: any;
}

const NotificationHeader = styled.div`
  margin: 1em;
  margin-bottom: 0;
  padding: 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 350px;
`;

const ModalFilter = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 400;
  font-size: 0.875rem;
  color: blue;
  margin-bottom: 0.875em;
`;

const NoNotification = styled.div`
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1em;
`;

const NotificationContainer = styled.div`
  margin-bottom: 0.5em;
  font-weight: 400;
  border-bottom: 1px solid grey;
  padding: 1em;
  padding-bottom: 1.75em;
`;
const NotificationCard = styled.div`
  border: 1px solid grey;
  border-radius: 5px;
  padding: 0.5em;
  margin-bottom: 0.875em;
`;

const NotificationsModal: React.FC<NotificationsModalProps> = ({
  anchorEl,
  handleClosePopover,
  notifications,
  setNotifications,
}) => {
  const [showAll, setShowAll] = useState(false); // See all or just unread?
  const notificationsToShow = showAll
    ? notifications || []
    : (notifications || []).filter(
        (notification) => notification.unread === true
      );

  const markAllRead = async () => {
    await authAxios.post(`${backendUrl}/notifications/`);
    const newNotifications = notifications.map((notification) => ({
      ...notification,
      unread: false,
    }));

    setNotifications(newNotifications);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClosePopover}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <NotificationHeader>
        <Typography variant="body1">Notifications</Typography>
        <IconButton onClick={handleClosePopover}>
          <CloseOutlinedIcon />
        </IconButton>
      </NotificationHeader>
      <div style={{ padding: "0 1em 1em" }}>
        <ModalFilter>
          <Button fullWidth onClick={() => setShowAll((showAll) => !showAll)}>
            {!showAll ? "View All" : "Filter by Unread"}
          </Button>
          {!showAll && notificationsToShow.length !== 0 && (
            <Button fullWidth onClick={markAllRead}>
              Mark all read
            </Button>
          )}
        </ModalFilter>
        {notificationsToShow.map((notification) => (
          <Notification notification={notification} key={notification} />
        ))}
        {notificationsToShow.length === 0 && (
          <NoNotification>
            <Image src={dog} alt="No" width={200} height={200} />
            <Typography>No Notification</Typography>
          </NoNotification>
        )}
      </div>
    </Popover>
  );
};

const appendTargetTitleVerbs = [
  "assigned you to",
  "invited you to",
  "made you admin of",
];

const formatNotification = (notification) => {
  if (appendTargetTitleVerbs.includes(notification.verb))
    return `${notification.verb} ${notification.target.title}`;
  else if (notification.verb === "commented")
    return `${notification.action_object.body}`;
};

const iconMap = {
  "assigned you to": "fal fa-user-plus",
  "invited you to": "fal fa-paper-plane",
  "made you admin of": "fal fa-arrow-up",
  commented: <CommentIcon />,
};

const Notification = ({ notification }: any) => {
  const { actor, verb, target, target_model, created_at } = notification;
  return (
    <NotificationContainer>
      {target_model === "Item" && (
        <NotificationCard>
          <Labels labels={target.labels} />
          <Typography>{target.title}</Typography>
        </NotificationCard>
      )}
      <div style={{ display: "flex", alignItems: "center" }}>
        <MemberListItem user={actor} header="true" />
        <Typography ml="0.5em">{actor.full_name}</Typography>
        <Typography
          ml="0.5em"
          color="grey"
          fontWeight={300}
          fontSize="0.875rem"
        >
          {timeSince(created_at)}
        </Typography>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <CommentIcon />
        <Typography>{formatNotification(notification)}</Typography>
      </div>
    </NotificationContainer>
  );
};

export default NotificationsModal;
