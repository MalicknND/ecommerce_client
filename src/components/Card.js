import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Card = ({ product }) => {
  return (
    <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <Link
        class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        to={`/product/${product.slug}`}
      >
        <img className="object-cover" src={product.image} alt="productimage" />
      </Link>
      <div class="mt-4 px-5 pb-5">
        <Link to={`/product/${product.slug}`}>
          <h5 class="text-xl tracking-tight text-slate-900">{product.name}</h5>
        </Link>
        <div class="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span class="text-2xl font-bold text-slate-900">
              {product.price} €
            </span>
          </p>
          <div class="flex items-center">
            <Rating rating={product.rating} numReviews={product.numReviews} />
          </div>
        </div>
        <Link
          href="#"
          class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to cart
        </Link>
      </div>
    </div>
  );
};

export default Card;
