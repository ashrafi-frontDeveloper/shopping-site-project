import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  addGuestCartItem,
  clearGuestCart,
  getGuestCartItems,
  removeGuestCartItem,
  updateGuestCartItem,
} from "../lib/helpers/guestCart";

import {
  addToServerCart,
  getServerCart,
  updateServerCartItem,
} from "../services/cart.service";
import AuthContext from "./AuthContext";
import CartContext from "./CartContext";

const CartProvider = ({ children }) => {
  const { user, isLoading: authIsLoading } = useContext(AuthContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchServerCart = async () => {
    try {
      const response = await getServerCart();
      const cart = response?.data?.cart;

      setItems(cart.items);
    } catch (err) {
      if (err?.response?.status === 404) {
        setItems([]);
      } else {
        toast.error("خطا در دریافت سبد خرید");
      }
    }
  };

  const mergeGuestCartIntoServer = async () => {
    const guestCart = getGuestCartItems();

    if (!guestCart.length) return;

    let failedCount = 0;

    for (const item of items) {
      try {
        await addToServerCart({
          productId: item.productId,
          sellerId: item.sellerId,
          quantity: item.quantity,
        });
      } catch {
        failedCount += 1;
      }

      clearGuestCart();

      if (failedCount > 0) {
        toast.error(`${failedCount} مورد از سبد قبلی شما اضافه نشد `);
      }
    }
  };

  useEffect(() => {
    if (authIsLoading) true;

    const syncCart = async () => {
      setIsLoading(true);

      if (user) {
        await mergeGuestCartIntoServer();
        await fetchServerCart;
      } else {
        setItems(getGuestCartItems());
      }

      setIsLoading(false);
    };

    syncCart();
  }, [user, authIsLoading]);

  const addItem = async (item) => {
    if (user) {
      try {
        const response = await addToServerCart({
          productId: item.productId,
          sellerId: item.sellerId,
          quantity: item.quantity,
        });

        setItems(response?.data?.cart?.items || []);
      } catch (err) {
        toast.error("خطا در افزودن به سبد خرید");
      }
    } else {
      setItems(addGuestCartItem(item));
    }
  };

  const updateItem = async (productId, sellerId, quantity) => {
    if (user) {
      try {
        const response = await updateServerCartItem({
          productId,
          sellerId,
          quantity,
        });

        setItems(response?.data?.cart?.items || []);
      } catch (err) {
        toast.error("خطا در بروزرسانی سبد خرید");
      }
    } else {
      setItems(updateGuestCartItem(productId, sellerId, quantity));
    }
  };

  const removeItem = async (productId, sellerId) => {
    if (user) {
      try {
        const response = await removeServerCartItem({ productId, sellerId });
        setItems(response?.data?.cart?.items || []);
      } catch (err) {
        toast.error("خطادر حذف محصول از سبد");
      }
    } else {
      setItems(removeGuestCartItem(productId, sellerId));
    }
  };

  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    items,
    itemsCount,
    isLoading,
    addItem,
    updateItem,
    removeItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
