import { useEffect, useReducer } from "react";
import axios from "axios";
import Card from "../components/Card";

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
        products: action.payload,
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

function HomeScreen() {
  //const [products, setProducts] = useState([]);
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    products: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({
        type: "FETCH_REQUEST",
      });
      try {
        const response = await axios.get("/api/products");
        dispatch({
          type: "FETCH_SUCCESS",
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          payload: error.message,
        });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl ml-5">Featured Products</h1>
      <div className="products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((product) => <Card product={product} />)
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
