import data from "../data/data.json";
import { APIProduct } from "../types";

// data.json lists each category oldest-first, but the design leads with the
// newest product — the order the pages' original `unshift` loop produced.
export const getProductsByCategory = (category: string): APIProduct[] =>
  (data as APIProduct[])
    .filter((product) => product.category === category)
    .reverse();
