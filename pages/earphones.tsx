import { GetStaticProps, NextPage } from "next";
import React from "react";
import CategoryCardContainer from "../components/CategoryCardContainer";
import Nav from "../components/Nav";
import About from "../components/shared/About";
import CategoryPageHeader from "../components/shared/CategoryPageHeader";
import Footer from "../components/shared/Footer";
import CategoryItemContainer from "../components/shared/CategoryItemContainer";
import { APIProduct } from "../types";
import { getProductsByCategory } from "../utility/products";

const category = "earphones";

interface Props {
  products: APIProduct[];
}

const Earphones: NextPage<Props> = ({ products }) => {
  return (
    <div>
      <Nav />
      <CategoryPageHeader category={category} />

      {products.map((item) => {
        return <CategoryItemContainer item={item} key={item.id} />;
      })}

      <CategoryCardContainer />
      <About />
      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return { props: { products: getProductsByCategory(category) } };
};

export default Earphones;
