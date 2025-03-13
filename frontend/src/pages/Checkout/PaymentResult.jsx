import { useEffect, useState } from 'react';
import { environment } from '~/utils/environment';
import CheckoutSuccess from './CheckoutStatus/CheckoutSuccess';
import { useAuthStore } from '~/stores/authStore';
import { useCartStore } from '~/stores/cartStore';

function PaymentResultPage() {
  const [loading, setLoading] = useState(true)

  const getCartItems = useCartStore(state => state.getCartItems)
  const getQuantityCart = useCartStore(state => state.getQuantityCart)

  useEffect(() => {
    handlePaymentReturn();
  }, []);

  async function handlePaymentReturn() {
    // Lấy tham số từ URL
    const queryParams = new URLSearchParams(window.location.search);

    // Tạo object chứa tham số
    const params = {};
    queryParams.forEach((value, key) => {
      params[key] = value;
    });

    // Gửi tham số về backend để xác minh
    const response = await fetch(`${environment.BACKEND_URL}/vnpay-return`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const result = await response.json();
    if (response.ok) {
      await getCartItems()
      await getQuantityCart()
      setLoading(false)
    } else {
      setLoading(true)
    }
  }

  if (loading) {
    return <div className='text-2xl text-center text-red-500 py-5'>Đang xử lý thanh toán...</div>;
  }
  return <div>
    <CheckoutSuccess />
  </div>;
}

export default PaymentResultPage;
