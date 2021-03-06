import * as firebase from "firebase";
import { TProduct } from "../model/product.model";

export const formatFirebaseDate = (date: firebase.firestore.Timestamp): string => {
  if (date === null) return "";
  return new Date(date.seconds * 1000).toLocaleDateString("en-US");
};

export const trimText = (text: string, size: number = 140): string => {
  if (text.length < size) return text;
  return text.slice(0, size) + "...";
};

export const getProduct = (products: TProduct[], seen: Set<string>) => {
  let index: number = Math.floor(Math.random() * products.length);
  while (seen.has(products[index].id)) {
    index = Math.floor(Math.random() * products.length);
  }
  seen.add(products[index].id);
  return products[index];
};