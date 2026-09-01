import { Box, Container, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import { Button } from "../Button";
import Link from "next/link";
import { RecommendationType } from "../../types";

interface Props {
  recommendations: RecommendationType[];
}

const Recommendations = ({ recommendations }: Props) => {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "6rem 0",
          padding: "6rem",
          borderTop: "2px solid #F1F1F1"
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textTransform: "uppercase",
            fontSize: "2rem",
            fontWeight: 500,
            marginBottom: "4rem",
          }}
        >
          You May Also Like
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {recommendations.map((product) => {
            return (
              <Box
                key={product.slug}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Image
                  src={product.image.desktop.replace(".", "")}
                  alt={product.name}
                  width={350}
                  height={350}
                />
                <Typography
                  variant="h3"
                  sx={{
                    textTransform: "uppercase",
                    fontSize: "2rem",
                    fontWeight: 500,
                    margin: "2rem 0",
                  }}
                >
                  {product.name}
                </Typography>
                <Button variant="contained" color="#d87d4a">
                  <Link href={`/${product.slug}`}>See Product</Link>
                </Button>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Container>
  );
};

export default Recommendations;
