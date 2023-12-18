import { getMyUser } from "../../hooks/UseMyUser";
import { generateImageURL } from "./postEvent";

export const updateEvent = async (eventData) => {
  const imageUrl = eventData.image
    ? await generateImageURL(eventData.image)
    : "";

  const token = sessionStorage.getItem("token");
  const user = getMyUser();

  try {
    const eventDataList = {
      title: eventData.title,
      color: eventData.color,
      start: eventData.startDate,
      end: eventData.endDate,
      image: imageUrl,
      location: eventData?.location || "",
      description: eventData?.description || "",
      capacity: 100,
    };

    const response = await fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/events/${eventData.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventDataList,
          guestList: eventData.guests,
          admin: user.id,
        }),
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
