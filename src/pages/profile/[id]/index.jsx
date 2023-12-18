import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Main } from "../../../templates/Main/Main";
import CardUser from "../../../components/CardUser/CardUser";
import Event from "../../../components/Event/Event";
import { ProfileContext } from "../../../store/Profile";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  let location = useLocation();
  const { profile, eventList, loadProfile, loadUserEvents } =
    useContext(ProfileContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    loadProfile(id);
    loadUserEvents(id);
    setLoading(false);
  }, []);

  if (!sessionStorage.getItem("token")) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return (
    <Main title={profile?.username || "Profile"}>
      {loading || !eventList || !profile ? (
        <div className="absolute left-1/2 top-1/2">
          <CircularProgress />
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center">
            <CardUser user={profile} />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {eventList
              ?.filter((event) => event?.title)
              ?.map((event) => {
                return (
                  <div
                    onClick={() => navigate(`/event/${event.id}`)}
                    className="cursor-pointer hover:opacity-70"
                  >
                    <Event
                      {...event}
                      classname={"min-h-fit"}
                      imageClassname={"max-h-[200px]"}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </Main>
  );
}

export default Profile;
