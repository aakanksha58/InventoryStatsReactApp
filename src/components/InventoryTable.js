import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInventory, deleteProduct, disableProduct } from "../redux/InventorySlice";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditProductDialog from "./EditProductDialog";
import { styled } from '@mui/system';

// Styled components using `styled` from @mui/system
const StyledTableContainer = styled(TableContainer)({
  backgroundColor: "#212124",
  border: "1px solid #616161",
  minHeight: "100%"
});

const StyledTableHeader = styled(TableHead)({
  backgroundColor: "#212124",
  border: "1px solid black",
});

const StyledTableHeaderCell = styled(TableCell)({
  color: "#8d9b4c",
  borderBottom: "1px solid #616161",
});

const StyledTableCell = styled(TableCell)({
  color: "white",
  borderBottom: "1px solid #616161",
});

const ActionButton = styled(IconButton)(({ theme, disabled, isAdmin }) => ({
  color: disabled || !isAdmin ? "gray" : "inherit",
  "&.editIcon": {
    color: disabled || !isAdmin ? "gray" : "#8d9b4c",
  },
  "&.viewIcon": {
    color: disabled || !isAdmin ? "gray" : "pink",
  },
  "&.deleteIcon": {
    color: disabled || !isAdmin ? "gray" : "red",
  },
}));


export default function InventoryTable({ isAdmin }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.inventory.products);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);

  // Handle Edit button click
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true); // Open the dialog
  };

  // Handle Delete button click
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  // Handle View (Eye) button click
  const handleView = (id) => {
    dispatch(disableProduct(id));
  };

  // Handle Close of Dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <StyledTableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="inventory table">
          <StyledTableHeader>
            <TableRow>
              <StyledTableHeaderCell>Product Name</StyledTableHeaderCell>
              <StyledTableHeaderCell align="right">Category</StyledTableHeaderCell>
              <StyledTableHeaderCell align="right">Price</StyledTableHeaderCell>
              <StyledTableHeaderCell align="right">Quantity</StyledTableHeaderCell>
              <StyledTableHeaderCell align="right">Value</StyledTableHeaderCell>
              <StyledTableHeaderCell align="center">Actions</StyledTableHeaderCell>
            </TableRow>
          </StyledTableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{
                  backgroundColor: "transparent",
                  opacity: product.disabled ? 0.5 : 1,
                  pointerEvents: product.disabled ? "none" : "auto",
                }}
              >
                <StyledTableCell>{product.name}</StyledTableCell>
                <StyledTableCell align="right">{product.category}</StyledTableCell>
                <StyledTableCell align="right">{product.price}</StyledTableCell>
                <StyledTableCell align="right">{product.quantity}</StyledTableCell>
                <StyledTableCell align="right">{product.value}</StyledTableCell>
                <StyledTableCell align="center">
                  <ActionButton
                    onClick={() => handleEdit(product)}
                    aria-label="edit"
                    disabled={product.disabled || !isAdmin}
                    isAdmin={isAdmin}
                    className={product.disabled || !isAdmin ? "disabled editIcon" : "editIcon"}
                  >
                    <EditIcon />
                  </ActionButton>

                  <ActionButton
                    onClick={() => handleView(product.id)}
                    aria-label="view"
                    disabled={product.disabled || !isAdmin}
                    isAdmin={isAdmin}
                    className={product.disabled || !isAdmin ? "disabled viewIcon" : "viewIcon"}
                  >
                    <VisibilityIcon />
                  </ActionButton>

                  <ActionButton
                    onClick={() => handleDelete(product.id)}
                    aria-label="delete"
                    disabled={product.disabled || !isAdmin}
                    isAdmin={isAdmin}
                    className={product.disabled || !isAdmin ? "disabled deleteIcon" : "deleteIcon"}
                  >
                    <DeleteIcon />
                  </ActionButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      {selectedProduct && (
        <EditProductDialog
          open={openDialog}
          handleClose={handleCloseDialog}
          product={selectedProduct}
        />
      )}
    </>
  );
}
