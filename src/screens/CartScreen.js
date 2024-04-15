import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";

const CartScreen = () => {
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  return (
    <div className="container mx-auto">
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className="max-w-6xl mx-auto px-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            {cartItems.length === 0 ? (
              <>
                <h1 className="text-2xl font-bold text-gray-900">Cart</h1>
                <p className="text-gray-500">Your cart is empty</p>
                <Link to="/" className="text-blue-500 hover:text-blue-700">
                  Continue Shopping
                </Link>
              </>
            ) : (
              <ul className="divide-y divide-gray-200" key="">
                {cartItems.map((item) => (
                  <li key="" className="flex items-center justify-between py-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt=""
                        className="w-24 h-24 rounded img-thumbnail cover"
                      ></img>
                      <Link href="" className="font-semibold">
                        {item.name}
                      </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </button>

                      <div>{item.price} €</div>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700">
                      <i className="fas fa-trash"></i>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <div className="bg-white shadow-md rounded-md p-6">
              <h2 className="text-lg font-semibold mb-4">
                Total ({cartItems.reduce((a, c) => a + c.quantity, 0)} produits){" "}
                <br />
              </h2>
              <div className="text-xl font-semibold">
                {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)} €
              </div>
              <button
                disabled={cartItems.length === 0}
                className="w-full mt-4 bg-black hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
              >
                Paiement
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
