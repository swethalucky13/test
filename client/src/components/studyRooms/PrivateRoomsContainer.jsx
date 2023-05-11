import { Grid } from "@mui/material";
import RoomCard from "../RoomCard.jsx";
import RoomCreater from "../RoomCreater.jsx";
import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * A private room container contains the private rooms that the user created. Each room card
 * contains a background image and a room name. The room creater will be used if the user would
 * like to create a new private room.
 */

const PrivateRoomsContainer = ({
  privateRooms = [],
  isCreateRoom = true,
  onAddNewRoom,
}) => {
  const navigate = useNavigate();

  const handleOpenRoom = (id) => {
    navigate(`/rooms/${id}`);
  };

  return (
    <Grid container sx={{ height: "100%" }}>
      {privateRooms.map(({ _id, name, backgroundUrl }, index) => (
        <Grid
          item
          xs={6}
          key={_id}
          sx={{
            minWidth: 250,
            minHeight: 200,
            maxHeight: 300,
            maxWidth: 350,
            paddingX: 3,
            paddingY: 3,
          }}
          className={"w-5/12"}
        >
          <RoomCard
            title={name}
            showLockIcon={true}
            showPeopleAmount={false}
            image={`/src/assets/backgrounds/${backgroundUrl}`}
            showVagueBackground={true}
            onClick={() => handleOpenRoom(_id)}
          />
        </Grid>
      ))}

      {onAddNewRoom && (
        <Grid
          item
          xs={6}
          sx={{
            minWidth: 250,
            minHeight: 200,
            maxHeight: 300,
            maxWidth: 350,
            paddingX: 3,
            paddingY: 3,
          }}
        >
          {isCreateRoom && <RoomCreater onClick={() => onAddNewRoom()} />}
        </Grid>
      )}
    </Grid>
  );
};

export default PrivateRoomsContainer;
