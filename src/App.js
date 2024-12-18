// src/App.js

import React, { useState } from "react";
import { Switch, Box, Typography, FormControlLabel } from "@mui/material";
import InventoryTable from "./components/InventoryTable";
import Widgets from "./components/Widgets"; // Import the Widgets component
import { useSelector } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import "./App.css"

function App() {
  const [isAdmin, setIsAdmin] = useState(true); // Default to Admin

  const handleSwitchChange = (event) => {
    setIsAdmin(event.target.checked);
  };

  // Get the widget data from the Redux store
  const totalProducts = useSelector((state) => state.inventory.totalProducts);
  const totalStoreValue = useSelector((state) => state.inventory.totalStoreValue);
  const outOfStock = useSelector((state) => state.inventory.outOfStock);
  const categories = useSelector((state) => state.inventory.categories);

  return (
    <div className="AppDiv">

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', marginBottom: 2 }}>
        <div>
          <FormControlLabel
            control={
              <Switch
                checked={isAdmin}
                onChange={handleSwitchChange}
                value="admin"
                color="success"
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: 'green',
                  },
                  '& .MuiSwitch-track': {
                    backgroundColor: 'grey',
                  },
                }}
              />
            }
            label={isAdmin ? 'Admin' : 'User'}
            labelPlacement="start"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 2,
            }}
          />
        </div>
        <div class="logOutIcon">
          <LogoutIcon />
        </div>
      </Box>
      <Typography variant="h6" sx={{ marginBottom: 2, fontSize: 30 }}>
        Inventory stats
      </Typography>

      {/* Display the Widgets */}
      <Widgets
        totalProducts={totalProducts}
        totalStoreValue={totalStoreValue}
        outOfStock={outOfStock}
        categories={categories}
      />

      {/* Display the Inventory Table */}
      <InventoryTable isAdmin={isAdmin} />
    </div>
  );
}

export default App;
