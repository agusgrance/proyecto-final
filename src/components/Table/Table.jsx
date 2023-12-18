import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Table as TableComponent,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmModal from "../Modal/ConfirmModal";

const Table = ({ columns, data, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemID, setItemID] = useState(null);

  const handleRemoveItem = (id) => {
    setItemID(id);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setItemID(null);
  };
  const handleConfirmModal = () => {
    onDelete?.(itemID);
    handleCloseModal();
  };
  return (
    <>
      <TableContainer component={Paper}>
        <TableComponent>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column.id}>{row[column.label]}</TableCell>
                ))}
                <TableCell>
                  <IconButton
                    onClick={() => onEdit(row.id)}
                    aria-label="Editar"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    disabled={row?.isAdmin}
                    onClick={() => handleRemoveItem(row.id)}
                    aria-label="Eliminar"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableComponent>
      </TableContainer>
      <ConfirmModal
        open={isOpen && itemID}
        content={
          itemID &&
          `¿Estas seguro que deseas eliminar el item con el id: ${itemID}?`
        }
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
      />
    </>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Table;
