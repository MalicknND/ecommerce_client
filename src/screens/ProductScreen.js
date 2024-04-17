import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { Helmet } from "react-helmet-async";
import Loader from "../components/Loader";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { Store } from "../Store";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case "FETCH_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

function ProductScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    product: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({
        type: "FETCH_REQUEST",
      });
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/slug/${slug}`
        );
        dispatch({
          type: "FETCH_SUCCESS",
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(
      `http://localhost:5000/api/products/${product._id}`
    );
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    navigate("/cart");
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <MessageBox error={error} />
  ) : (
    <div className="container mx-auto py-12">
      <div className="flex">
        <div className="thumbnail lg:flex-1">
          <div className="group/show w-4/5 h-[550px] overflow-hidden cursor-pointer">
            <img
              className="object-cover h-full w-full group-hover/show:scale-105 transition ease-in-out delay-150 z-1"
              alt={product.name}
              src={product.image}
            />
          </div>
          <div className="carousel flex mt-4 overflow-hidden">
            <div className="item w-[100px] h-[100px] mr-2">
              <img
                className="cursor-pointer object-cover h-full w-full "
                alt={product.name}
                src={product.image}
              />
            </div>
          </div>
        </div>
        <div className="content lg:flex-1 p-6">
          <Helmet>
            <title>{product.name}</title>
          </Helmet>
          <p className="leading-7">{product.name}</p>
          <p className="leading-7">{product.description}</p>
          <p className="mb-3 font-semibold text-lg">
            {" "}
            Price : {product.price} €
          </p>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <div>
            {product.countInStock > 0 ? (
              <>
                <div className="badge badge-success">En Stock</div>
                <div className="group-hover/card:opacity-100 transition ease-in-out delay-150">
                  <Link
                    className="transition ease-in-out delay-150 mt-4 inline-flex items-center px-4 py-3 text-sm border border-slate-500 font-medium text-center text-slate-500 bg-white hover:bg-slate-500 hover:text-white"
                    href="/panier"
                    onClick={addToCartHandler}
                  >
                    Aouter au panier
                  </Link>
                </div>
              </>
            ) : (
              <span className="badge badge-error">En rupture de stock</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductScreen;
