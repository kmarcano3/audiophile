import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { Button } from "./Button";
import { useAppDispatch, useAppSelector, useIsHydrated } from "../store/hooks";
import { clearCart, getCartTotal } from "../store/cartSlice";
import Image from "next/image";
import OrderConfirmation from "./OrderConfirmation";
import { ProductType } from "../types";

const TAX_RATE = 0.0825;

// Cents, so the tax and grand total line up with what a card would be charged.
const formatCurrency = (amount: number) =>
  amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const Summary = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const isHydrated = useIsHydrated();
  const items = isHydrated ? cart : [];
  const total = getCartTotal(items);
  const tax = total * TAX_RATE;
  const grandTotal = total + tax;
  const [confirmedOrder, setConfirmedOrder] = useState<ProductType[] | null>(
    null
  );

  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "2rem",
        margin: "4rem 0",
        marginLeft: "2rem",
        width: "25%",
        height: "30%",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "2rem",
          textTransform: "uppercase",
          fontWeight: 800,
          letterSpacing: 1.5,
          marginBottom: "2rem",
        }}
      >
        Summary
      </Typography>
      {items.map((product) => {
        return (
          <Box
            key={product.id}
            sx={{
              display: "flex",
              margin: "1rem 0",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Image
                src={product.image.mobile.replace(".", "")}
                width={50}
                height={50}
                alt="headphones"
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "1rem",
                }}
              >
                <Typography variant="body1">{product.name}</Typography>
                <Typography variant="body2" sx={{ color: " #6f7275" }}>
                  ${product.price}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 800 }}>
                ({product.count})
              </Typography>
            </Box>
          </Box>
        );
      })}
      <Box sx={{ marginBottom: "2rem" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "#808080",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Total
          </Typography>
          <Typography variant="body1">
            ${total.toLocaleString("en-US")}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="body1"
            sx={{
              color: "#808080",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Shipping
          </Typography>
          <Typography variant="body1">Free</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="body1"
            sx={{
              color: "#808080",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Tax
          </Typography>
          <Typography variant="body1">${formatCurrency(tax)}</Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="body1"
          sx={{ color: "#808080", textTransform: "uppercase", fontWeight: 600 }}
        >
          Grand Total
        </Typography>
        <Typography variant="body1">${formatCurrency(grandTotal)}</Typography>
      </Box>
      <Button
        variant="contained"
        color="#d87d4a"
        sx={{ marginTop: "1rem", width: "100%" }}
        onClick={() => {
          if (items.length === 0) return;
          setConfirmedOrder(items);
        }}
      >
        Continue & Pay
      </Button>
      <OrderConfirmation
        open={confirmedOrder !== null}
        items={confirmedOrder ?? []}
        onStartNewOrder={() => {
          dispatch(clearCart());
          setConfirmedOrder(null);
        }}
      />
    </Box>
  );
};

export default Summary;
