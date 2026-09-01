import { Box, Container, Typography, Button as MUIButton } from "@mui/material";
import Image from "next/image";
import React from "react";
import { Button } from "./Button";
import { useAppDispatch, useAppSelector, useIsHydrated } from "../store/hooks";
import { addToCart, decrementCount, incrementCount } from "../store/cartSlice";
import { APIProduct } from "../types";

interface Props {
  product: APIProduct;
}

const Product = ({ product }: Props) => {
  const dispatch = useAppDispatch();
  const isHydrated = useIsHydrated();
  // The counter mirrors the cart, so the two can never drift apart.
  const count = useAppSelector(
    (state) =>
      state.cart.cart.find((item) => item.id === product.id)?.count ?? 0,
  );
  const isInCart = isHydrated && count > 0;

  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "3rem", borderBottom: "2px solid #F1F1F1" }}
    >
      <Image
        src={product.image?.desktop.replace(".", "") || ""}
        width={500}
        height={500}
        alt="headphones"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "75vh",
          width: "25vw",
          justifyContent: "center",
          marginLeft: "8rem",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textTransform: "uppercase",
            fontSize: "1.5rem",
            letterSpacing: "0.5rem",
            color: "#d97d45",
            marginBottom: "1rem",
          }}
        >
          New Product
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 600,
            marginBottom: "2rem",
            textTransform: "uppercase",
            fontSize: "4.5rem",
          }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#727272", fontSize: "1.25rem", marginBottom: "3rem" }}
        >
          {product.description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            ${product.price}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isInCart ? (
              <Box
                sx={{
                  backgroundColor: "#f1f1f1",
                  padding: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <MUIButton
                  aria-label={`Remove one ${product.name} from cart`}
                  onClick={() => {
                    dispatch(decrementCount(product.id));
                  }}
                >
                  -
                </MUIButton>
                {count}
                <MUIButton
                  aria-label={`Add one more ${product.name} to cart`}
                  onClick={() => {
                    dispatch(incrementCount(product.id));
                  }}
                >
                  +
                </MUIButton>
              </Box>
            ) : (
              <Button
                variant="contained"
                color="#d97d45"
                onClick={() => {
                  dispatch(addToCart({ ...product, count: 1 }));
                }}
              >
                Add to Cart
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Product;
