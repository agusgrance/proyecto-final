import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Main } from "../../../templates/Main/Main";
import Event from "../../../components/Event/Event";
import GuestList from "../../../components/GuestList/GuestList";
import { removeGuestList } from "../../../api/GuestList/removeGuest";
import { getMyUser } from "../../../hooks/UseMyUser";
import { addGuestList } from "../../../api/GuestList/addGuestList";
import { updateGuestList } from "../../../api/GuestList/updateGuestList";

export default function EventID() {
  const user = getMyUser();
  const { id } = useParams();
  const [eventData, setEventData] = useState({});
  const [isAccepted, setIsAccepted] = useState(false);
  const [isInvited, setIsInvited] = useState(false);
  const [isHost, setIsHost] = useState(false);

  const fetchEventData = async () => {
    const token = sessionStorage.getItem("token");

    const response = await fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/events/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();

    const isInvited = data.guestLists.find(
      (guest) => guest.guestId === user.id
    );
    const isAdmin = data.guestLists.find(
      (guest) => guest.guestId === user.id && guest.isHost
    );
    const isEventAccepted = data.guestLists.find(
      (guest) => guest.guestId === user.id && guest.accepted
    );

    setIsInvited(!!isInvited);
    setIsHost(!!isAdmin);
    setIsAccepted(!!isEventAccepted);
    setEventData(data);
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  const onRemove = async (guestListId) => {
    try {
      await removeGuestList(guestListId);
      fetchEventData();
    } catch (error) {
      console.log(error);
    }
  };
  const onJoin = async () => {
    await addGuestList({
      guestId: user.id,
      eventId: eventData.id,
      accepted: true,
    });
    fetchEventData();
  };
  const onUpdate = async (isAccepted) => {
    const guestData = eventData.guestLists.find(
      (guest) => guest.guestId === user.id
    );
    if (guestData.id) {
      await updateGuestList(guestData.id, {
        guestId: user.id,
        eventId: eventData.id,
        accepted: isAccepted,
      });
      fetchEventData();
    }
  };

  const onDeny = async () => {
    const guestData = eventData.guestLists.find(
      (guest) => guest.guestId === user.id
    );

    if (guestData.id) {
      try {
        await removeGuestList(guestData?.id);
        fetchEventData();
      } catch (error) {
        console.log(error);
      }
    }
  };
  const onClose = () => {
    fetchEventData();
  };
  return (
    <Main page={"event"}>
      <div className="flex gap-4 w-full">
        <div className="flex w-1/2">
          <Event
            {...eventData}
            isHost={isHost}
            isAccepted={isAccepted}
            isInvited={isInvited}
            onJoin={onJoin}
            onUpdate={onUpdate}
            onClose={onClose}
            onDeny={onDeny}
          />
        </div>
        <div className="flex w-full">
          <GuestList
            guestData={eventData?.guestLists || []}
            onRemove={onRemove}
            isHost={isHost}
          />
        </div>
      </div>
    </Main>
  );
}
