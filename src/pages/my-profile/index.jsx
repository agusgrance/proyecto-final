import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Main } from "../../templates/Main/Main";
import CardUser from "../../components/CardUser/CardUser";
import { ProfileContext } from "../../store/Profile";
import { getMyUser } from "../../hooks/UseMyUser";
import Event from "../../components/Event/Event";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const { id } = getMyUser();
  const navigate = useNavigate();
  let location = useLocation();
  const { profile, eventList, loadProfile, loadUserEvents } =
    useContext(ProfileContext);

  useEffect(() => {
    loadProfile(id);
    loadUserEvents(id);
  }, []);

  if (!sessionStorage.getItem("token")) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return (
    <Main page={"profile"}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center">
          <CardUser user={profile} onRefresh={() => loadProfile(id)} />
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
                    classname={"min-h-[450px] h-[450px]"}
                    imageClassname={"h-[200px]"}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </Main>
  );
}

export default MyProfile;
