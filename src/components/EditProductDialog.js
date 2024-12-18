import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { editProduct } from "../redux/InventorySlice";
import "./EditProductDialog.css"; // Import the external CSS file
import "../App.css"

const EditProductDialog = ({ open, handleClose, product }) => {
  const dispatch = useDispatch();

  const [updatedProduct, setUpdatedProduct] = useState({
    category: "",
    price: "",
    quantity: "",
    value: "",
  });

  useEffect(() => {
    if (product) {
      setUpdatedProduct({
        category: product.category || "",
        price: product.price ? parseFloat(product.price.replace("$", "")) : "",
        quantity: product.quantity || "",
        value: product.value ? parseFloat(product.value.replace("$", "")) : "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    dispatch(editProduct({ id: product.id, updatedProduct }));
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ className: "dialog-paper" }}
    >
      <DialogTitle className="dialog-title">
        <div className="dialog-title-container">
          <div>
            <Typography variant="h5" className="dialog-title-heading">
              Edit product
            </Typography>
            <Typography variant="subtitle1" className="dialog-subtitle">
              {product.name || "Product Details"}
            </Typography>
          </div>
          <div className ="cancelButtonDiv">
          <IconButton onClick={handleClose} className="cancel-button">
            <CloseIcon />
          </IconButton>
          </div>
        </div>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Category"
              name="category"
              value={updatedProduct.category}
              onChange={handleChange}
              fullWidth
              margin="dense"
              variant="filled"
              className="input-field"
              InputLabelProps={{ className: "input-label" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Price"
              name="price"
              value={updatedProduct.price}
              onChange={handleChange}
              fullWidth
              margin="dense"
              variant="filled"
              className="input-field"
              InputLabelProps={{ className: "input-label" }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} className="field-container">
          <Grid item xs={6}>
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={updatedProduct.quantity}
              onChange={handleChange}
              fullWidth
              margin="dense"
              variant="filled"
              className="input-field"
              InputLabelProps={{ className: "input-label" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Value"
              name="value"
              type="number"
              value={Number(updatedProduct.value)}
              onChange={handleChange}
              fullWidth
              margin="dense"
              variant="filled"
              className="input-field"
              InputLabelProps={{ className: "input-label" }}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions className="dialog-actions">
        <Button onClick={handleClose} className="cancel-button">
          Cancel
        </Button>
        <Button onClick={handleSave} className="save-button">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductDialog;
