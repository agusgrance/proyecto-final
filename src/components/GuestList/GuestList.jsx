import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";

export default function GuestList({ onRemove, guestData, isHost }) {
  return (
    <div className="flex-none w-full bg-gray-200 rounded-xl p-4 overflow-y-auto shadow-xl">
      <div className="w-full text-center">
        <h3 className="text-[23px] font-bold">Guest List</h3>
      </div>
      {guestData
        ?.filter((contact) => contact?.guest?.username)
        ?.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center px-4 justify-between mb-4 border-b border-black border-dashed pb-4 "
          >
            <button className="flex items-center hover:opacity-70">
              <img
                src={contact?.guest?.avatar}
                alt="Avatar"
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <p className="font-bold">{contact?.guest?.username}</p>
              </div>
            </button>
            <Stack direction="row" spacing={1}>
              {contact.isHost && <Chip label="Admin" color="secondary" />}
              {contact.accepted ? (
                <Chip label="Aceptado" color="success" />
              ) : (
                <Chip label="Pendiente" color="warning" />
              )}
              {!contact.isHost && isHost && (
                <Chip
                  icon={<DeleteIcon />}
                  label="Remove"
                  variant="filled"
                  color={"error"}
                  onClick={() => onRemove(contact.id)}
                />
              )}
            </Stack>
          </div>
        ))}
    </div>
  );
}
