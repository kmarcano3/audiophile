import { Box, Dialog, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "./Button";
import { ProductType } from "../types";

interface Props {
  open: boolean;
  // A snapshot taken when the order was placed, not live cart state — the receipt has to survive the cart being emptied underneath it.
  items: ProductType[];
  onStartNewOrder: () => void;
}

const formatPrice = (price: number) =>
  price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const OrderConfirmation = ({ open, items, onStartNewOrder }: Props) => {
  const router = useRouter();
  const orderTotal = items.reduce(
    (total, product) => total + product.price * product.count,
    0
  );

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <Box sx={{ backgroundColor: "white", padding: "2rem" }}>
        <Image
          src="/assets/checkout/icon-order-confirmation.svg"
          width={64}
          height={64}
          alt="Order confirmed"
        />
        <Typography
          variant="h1"
          sx={{
            fontSize: "2rem",
            textTransform: "uppercase",
            fontWeight: 800,
            letterSpacing: 1.5,
            margin: "1.5rem 0 1rem",
          }}
        >
          Thank you for your order
        </Typography>
        <Typography variant="body1" sx={{ color: "#808080" }}>
          You will receive an email confirmation shortly.
        </Typography>

        <Box sx={{ backgroundColor: "#f1f1f1", margin: "2rem 0" }}>
          <Box sx={{ padding: "1.5rem" }}>
            {items.map((product) => {
              return (
                <Box
                  key={product.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Image
                      src={product.image.mobile.replace(".", "")}
                      width={50}
                      height={50}
                      alt={product.name}
                    />
                    <Box sx={{ marginLeft: "0.5rem" }}>
                      <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#6f7275" }}>
                        {product.count}x @ ${formatPrice(product.price)}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    ${formatPrice(product.price * product.count)}
                  </Typography>
                </Box>
              );
            })}
          </Box>
          <Box
            sx={{
              backgroundColor: "black",
              color: "white",
              padding: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "#FFFFFF", textTransform: "uppercase" }}
            >
              Order Total
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              ${formatPrice(orderTotal)}
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          color="#d87d4a"
          sx={{ width: "100%" }}
          onClick={onStartNewOrder}
        >
          Start New Order
        </Button>
        <Button
          variant="outlined"
          color="#000000"
          sx={{ width: "100%", marginTop: "1rem" }}
          onClick={() => {
            onStartNewOrder();
            router.push("/");
          }}
        >
          Done
        </Button>
      </Box>
    </Dialog>
  );
};

export default OrderConfirmation;
