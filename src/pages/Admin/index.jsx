import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Main } from "../../templates/Main/Main";
import { getMyUser } from "../../hooks/UseMyUser";
import Table from "../../components/Table/Table";
import Dropdown from "../../components/Dropdown/Dropdown";
import { getUserList } from "../../api/Guest/getUsers";
import { getAllEvents } from "../../api/Event/getAllEvents";

import { removeUser } from "../../api/Guest/removeUser";
import { removeEvent } from "../../api/Event/removeEvent";
import Modal from "../../components/Modal/Modal";
import { CreateEventCard } from "../../components/CreateEventCard/CreateEventCard";

const columns = [{ id: "", label: "" }];

const data = [{ id: 1, nombre: "", descripcion: "" }];
const DropdownData = [
  { id: 1, value: "Users" },
  { id: 2, value: "Events" },
];
function Admin() {
  const [columnData, setColumnData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [eventData, setEventData] = useState({});
  const [isEditVisible, setIsEditVisible] = useState(false);
  const token = sessionStorage.getItem("token");

  const [selectedItem, setSelectedItem] = useState(DropdownData?.[0]?.value);

  const navigate = useNavigate();

  const user = getMyUser();

  const addColumnData = (column) => {
    setColumnData(
      column
        ?.filter(
          (label) =>
            ![
              "isAdmin",
              "capacity",
              "createdAt",
              "image",
              "guestLists",
            ].includes(label)
        )
        ?.map((label, id) => {
          return {
            id,
            label,
          };
        })
    );
  };
  const fetchData = async () => {
    if (selectedItem === "Users") {
      const users = await getUserList();
      setRowData(users);
      addColumnData(Object.keys(users?.[0]));
    } else {
      const events = await getAllEvents();
      setRowData(events);

      addColumnData(Object.keys(events?.[0]));
    }
  };

  useEffect(() => {
    if (!user?.isAdmin) {
      return navigate("/");
    }

    fetchData();
  }, [selectedItem]);

  const fetchEventData = async (id) => {
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
    return await response.json();
  };
  const handleEdit = async (id) => {
    console.log(`Editar elemento con ID: ${id}`);
    if (selectedItem === "Users") {
      /*    const users = await getUserList();
      setRowData(users);
      addColumnData(Object.keys(users?.[0])); */
    } else {
      const currEvent = await fetchEventData(id);

      const guests = currEvent?.guestLists?.map((guest) => guest.guestId);
      setEventData({ ...currEvent, guests });
    }
    setIsEditVisible(true);
  };

  const handleDelete = async (id) => {
    if (selectedItem === "Users") {
      await removeUser(id);
    } else {
      await removeEvent(id);
    }
    fetchData();
  };

  const handleDropdownChange = (value) => {
    setSelectedItem(value);
  };

  const handleEditClose = () => {
    fetchData();
    setEventData({});
    setIsEditVisible(false);
  };

  return (
    <>
      <Main>
        <div>
          <Dropdown
            onChange={handleDropdownChange}
            items={DropdownData}
            defaultValue={selectedItem}
          />
          <Table
            columns={columnData}
            data={rowData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </Main>
      <Modal
        visible={isEditVisible}
        handleClose={() => setIsEditVisible(false)}
      >
        <CreateEventCard
          isEdit={true}
          onClose={handleEditClose}
          defaultForm={{
            ...eventData,
            startDate: eventData?.start,
            endDate: eventData?.end,
          }}
        />
      </Modal>
    </>
  );
}

export default Admin;
