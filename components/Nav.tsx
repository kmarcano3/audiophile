import { Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Cart from "./Cart";
import { useAppSelector, useIsHydrated } from "../store/hooks";
import { getCartCount } from "../store/cartSlice";

const Nav = () => {
  const [showCart, setShowCart] = useState(false);
  const { cart } = useAppSelector((state) => state.cart);
  const isHydrated = useIsHydrated();
  const cartCount = isHydrated ? getCartCount(cart) : 0;
  return (
    <div
      style={{
        padding: "2rem 0",
        color: "white",
        backgroundColor: "#191919",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link href="/">
          <Image
            src="./assets/shared/desktop/logo.svg"
            alt="logo"
            width={150}
            height={30}
          />
        </Link>
        <ul style={{ textTransform: "uppercase", textDecoration: "none" }}>
          <Link href="/" style={{ marginRight: "2rem", fontWeight: 700 }}>
            Home
          </Link>
          <Link
            href="/headphones"
            style={{ marginRight: "2rem", fontWeight: 700 }}
          >
            Headphones
          </Link>
          <Link
            href="/speakers"
            style={{ marginRight: "2rem", fontWeight: 700 }}
          >
            Speakers
          </Link>
          <Link
            href="/earphones"
            style={{ marginRight: "2rem", fontWeight: 700 }}
          >
            Earphones
          </Link>
        </ul>
        <Button onClick={() => setShowCart(!showCart)}>
          <Image
            src="./assets/shared/desktop/icon-cart.svg"
            alt="logo"
            width={30}
            height={30}
          />
          {cartCount > 0 ? (
            <Typography sx={{ marginLeft: "0.5rem", color: "white" }}>
              ({cartCount})
            </Typography>
          ) : null}
        </Button>
      </Container>
      {showCart ? <Cart onClose={() => setShowCart(false)} /> : null}
    </div>
  );
};

export default Nav;