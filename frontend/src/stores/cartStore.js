import { create } from "zustand";
import { useAuthStore } from "./authStore";
import { toast } from "react-toastify";
import { environment } from "~/utils/environment";

export const useCartStore = create((set) => ({
  quantity: 0,
  cartItems: [],

  removeItem: async (productId) => {
    const accountId = useAuthStore.getState().account?.id;

    if (!accountId) {
      toast.warn('Please login!');
      return;
    }

    try {
      const toastId = toast.loading('Removing item...');
      const response = await fetch(`${environment.BACKEND_URL}/cart/remove`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: productId,
          account_id: accountId,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.update(toastId, {
          render: 'Item removed successfully!',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        });

        // Gọi lại API để cập nhật danh sách giỏ hàng
        await useCartStore.getState().getCartItems();
      } else {
        toast.update(toastId, {
          render: data.message || 'Failed to remove item',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while removing the item.');
    }
  },


  getCartItems: async () => {
    const accountId = useAuthStore.getState().account?.id;

    if (!accountId) {
      toast.warn('Please login!');
      return;
    }

    try {
      const response = await fetch(`${environment.BACKEND_URL}/cart/${accountId}`)

      const data = await response.json()
      if (response.ok) {
        set((state) => ({
          ...state,
          cartItems: data
        }))
      }
      else {
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
  },

  addToCart: async (productId) => {
    const accountId = useAuthStore.getState().account?.id;

    if (!accountId) {
      toast.warn('Please login!');
      return;
    }

    const toastId = toast.loading('Please wait...');
    try {
      const response = await fetch(`${environment.BACKEND_URL}/cart/add`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
          account_id: accountId,
          product_id: productId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        await useCartStore.getState().getCartItems(); 
        toast.update(toastId, { type: 'success', autoClose: 3000, isLoading: false, render: 'Add to cart success' })
      } else {
        toast.update(toastId, { render: 'Add to cart error', type: 'error', autoClose: 3000, isLoading: false, })
      }
    } catch (error) {
      toast.update(toastId, { render: 'Internal server error', type: 'error', autoClose: 3000, isLoading: false, })
    }
  },

}))