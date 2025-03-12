import { HttpTypes } from "@medusajs/types";
import { sdk } from "./sdk";

export async function createCart(regionId?: string) {
  const cart = await sdk.store.cart.create({
    region_id: regionId,
  });
  return cart;
}

export async function getCartById(cartId: string) {
  const cart = await sdk.store.cart.retrieve(cartId);
  return cart;
}

export async function addItemToCart(cartId: string, variantId: string, quantity: number) {
  const cart = sdk.store.cart.createLineItem(cartId, {
    variant_id: variantId,
    quantity: quantity
  })
  
  return cart
}

export async function updateItem(cartId: string, itemId: string, quantity: number) {
  const updatedCart = sdk.store.cart.updateLineItem(
    cartId,
    itemId,
    {
      quantity: quantity
    }
  )
  return updatedCart;
}


export async function deleteItem(cartId: string, itemId: string) {
  const deletionResponse = sdk.store.cart.deleteLineItem(
    cartId,
    itemId,
  )

  return deletionResponse;
  
}