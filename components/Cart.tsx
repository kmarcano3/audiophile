import { Box, Typography, Button as MUIButton } from "@mui/material";
import React, { useEffect } from "react";
import { Button } from "./Button";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  clearCart,
  decrementCount,
  incrementCount,
  selectCartTotal,
} from "../store/cartSlice";
import Link from "next/link";

interface Props {
  onClose: () => void;
}

const Cart = ({ onClose }: Props) => {
  const { cart } = useAppSelector((state) => state.cart);
  const total = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();
  const isEmpty = cart.length === 0;

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  // Freeze the page behind the cart. The padding replaces the scrollbar's
  // width so the layout doesn't jump sideways as it disappears.
  useEffect(() => {
    const { overflow, paddingRight } = document.body.style;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, []);

  return (
    <Box
      onClick={onClose}
      sx={{
        // Fixed, so it keeps covering the page as it scrolls — anything behind
        // it (Add to Cart included) is unclickable while the cart is open.
        position: "fixed",
        top: 120,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1200,
      }}
    >
      <Box
        // Clicks inside the panel must not reach the backdrop's close handler.
        onClick={(event) => event.stopPropagation()}
        sx={{
          position: "absolute",
          right: 400,
          top: 20,
          minHeight: "20vh",
          width: "25vw",
          backgroundColor: "white",
          color: "black",
          padding: "1.5rem",
          textTransform: "uppercase",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Cart</Typography>
          <MUIButton onClick={() => dispatch(clearCart())}>
            Remove All
          </MUIButton>
        </Box>
        {cart.map((product) => {
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
                  backgroundColor: "#f1f1f1",
                  padding: "0.25rem",
                  display: "flex",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <MUIButton
                  aria-label={`Remove one ${product.name} from cart`}
                  onClick={() => dispatch(decrementCount(product.id))}
                >
                  -
                </MUIButton>
                <Typography variant="body1" sx={{ fontWeight: 800 }}>
                  {product.count}
                </Typography>
                <MUIButton
                  aria-label={`Add one more ${product.name} to cart`}
                  onClick={() => dispatch(incrementCount(product.id))}
                >
                  +
                </MUIButton>
              </Box>
            </Box>
          );
        })}
        <Box sx={{ display: "flex", justifyContent: "space-between", margin: "1rem 0" }}>
          <Typography>Total</Typography>
          <Typography sx={{ fontWeight: 700 }}>${total.toLocaleString("en-US")}</Typography>
        </Box>
        <Button
          color={isEmpty ? "#f2f2f2" : "#d97d45"}
          variant="contained"
          sx={{
            width: "100%",
            marginTop: "1rem",
            // No link to follow and no pointer events, so an empty cart can't
            // reach the checkout page by click or by keyboard.
            ...(isEmpty && { color: "#808080", pointerEvents: "none" }),
          }}
        >
          {isEmpty ? "Checkout" : <Link href="/checkout">Checkout</Link>}
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
