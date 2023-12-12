import { getMyUser } from "../../hooks/UseMyUser";

const CLOUD_UPLOAD_PRESET = "finalWeb";
const CLOUD_NAME = "dgs8ytgfs";
const generateImageURL = async (image) => {
  try {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", CLOUD_UPLOAD_PRESET);
    data.append("cloud_name", CLOUD_NAME);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "post",
        body: data,
      }
    );

    const responseData = await response.json();

    return responseData.secure_url;
  } catch (error) {
    console.log("Error generating image URL:", error);
    return null;
  }
};

export const postEvent = async (eventData) => {
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

    const response = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        eventDataList,
        guestList: eventData.guests,
        admin: user.id,
      }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
