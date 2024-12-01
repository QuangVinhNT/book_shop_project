import {useState} from 'react';
import OrderCard from './OrderCard/OrderCard';

export default function Order({orders}) {
  const [tabSelect, setTabSelect] = useState ('All');
  return (
    <div className="bg-lightGray p-10 rounded-xl">
      <div className="flex justify-between text-sm font-semibold">
        <span
          className={`${tabSelect === 'All' ? 'text-primary cursor-default' : 'transition-all hover:text-primary cursor-pointer'}`}
          onClick={() => setTabSelect ('All')}
        >
          All
        </span>
        <span
          className={`${tabSelect === 'Processing' ? 'text-primary cursor-default' : 'transition-all hover:text-primary cursor-pointer'}`}
          onClick={() => setTabSelect ('Processing')}
        >
          Processing
        </span>
        <span
          className={`${tabSelect === 'Shipping' ? 'text-primary cursor-default' : 'transition-all hover:text-primary cursor-pointer'}`}
          onClick={() => setTabSelect ('Shipping')}
        >
          Shipping
        </span>
        <span
          className={`${tabSelect === 'Delivered' ? 'text-primary cursor-default' : 'transition-all hover:text-primary cursor-pointer'}`}
          onClick={() => setTabSelect ('Delivered')}
        >
          Delivered
        </span>
        <span
          className={`${tabSelect === 'Cancelled' ? 'text-primary cursor-default' : 'transition-all hover:text-primary cursor-pointer'}`}
          onClick={() => setTabSelect ('Cancelled')}
        >
          Cancelled
        </span>
      </div>
      <div>
        {tabSelect === 'All'
          ? orders.map ((order, index) => {
              const orderItems = [
                ...order.processing.map (item => ({
                  image: item.image,
                  quantity: item.quantity,
                })),
                ...order.shipping.map (item => ({
                  image: item.image,
                  quantity: item.quantity,
                })),
                ...order.delivered.map (item => ({
                  image: item.image,
                  quantity: item.quantity,
                })),
                ...order.cancelled.map (item => ({
                  image: item.image,
                  quantity: item.quantity,
                })),
              ];
              const orderPrice = [
                ...order.processing.map (item => item.totalPrice),
                ...order.shipping.map (item => item.totalPrice),
                ...order.delivered.map (item => item.totalPrice),
                ...order.cancelled.map (item => item.totalPrice),
              ].reduce ((prev, curr) => prev + curr, 0);
              return (
                <OrderCard
                  key={index}
                  orderId={order.id}
                  orderItems={orderItems}
                  orderPrice={orderPrice}
                />
              );
            })
          : orders.map ((order, index) => {
              const orderItems = order[tabSelect.toString ().toLowerCase ()];
              const orderPrice = order[tabSelect.toString ().toLowerCase ()]
                .map (item => item.totalPrice)
                .reduce ((prev, curr) => prev + curr, 0);
              return (
                <OrderCard
                  key={index}
                  orderId={order.id}
                  orderItems={orderItems}
                  orderPrice={orderPrice}
                />
              );
            })}
      </div>
      <div className="flex justify-end mt-10">
        <button className="text-sm font-medium bg-lessDark text-white px-16 py-2 rounded-lg transition-all hover:brightness-125 cursor-pointer">
          Cancel order
        </button>
      </div>
    </div>
  );
}
