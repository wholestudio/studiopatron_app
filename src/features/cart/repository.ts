import type { CartSnapshot } from "@/types/commerce";

export type CartRepository = {
  get(): Promise<CartSnapshot>;
  save(snapshot: CartSnapshot): Promise<void>;
};

const emptyCart: CartSnapshot = { items: [] };

export const localCartRepository: CartRepository = {
  async get() {
    return emptyCart;
  },
  async save() {
    // Persistence will be connected to local storage or the customer cart API.
  },
};
