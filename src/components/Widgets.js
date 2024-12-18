import React from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from '@mui/icons-material/Category';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import "../App.css"

const Widgets = ({ totalProducts, totalStoreValue, outOfStock, categories }) => {
    return (
        <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3} >
                    <Card class="widgetCard">
                        <CardContent>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <ShoppingCartIcon sx={{ fontSize: 40, marginRight: 2 }} />
                                <Box>
                                    <Typography variant="h6" gutterBottom>
                                        Total Products
                                    </Typography>
                                    <Typography variant="h4">{totalProducts}</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Total Store Value Widget */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card class="widgetCard">
                        <CardContent>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <CurrencyExchangeIcon sx={{ fontSize: 40, marginRight: 2 }} />
                                <Box>
                                    <Typography variant="h6" gutterBottom>
                                        Total Store Value
                                    </Typography>
                                    <Typography variant="h4">{`$${totalStoreValue}`}</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Out of Stock Widget */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card class="widgetCard">
                        <CardContent>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <RemoveShoppingCartIcon sx={{ fontSize: 40, marginRight: 2 }} />
                                <Box>
                                    <Typography variant="h6" gutterBottom>
                                        Out of Stock
                                    </Typography>
                                    <Typography variant="h4">{outOfStock}</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Categories Widget */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card class="widgetCard">
                        <CardContent>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <CategoryIcon sx={{ fontSize: 40, marginRight: 2 }} />
                                <Box>
                                    <Typography variant="h6" gutterBottom>
                                        No. of Categories
                                    </Typography>
                                    <Typography variant="h4">{categories}</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Widgets;
