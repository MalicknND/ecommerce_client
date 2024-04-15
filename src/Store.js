import { createContext, useReducer } from "react";

// Création du contexte pour le store global
export const Store = createContext();

// État initial du store
const initialState = {
  cart: {
    cartItems: [], // Tableau d'articles dans le panier
  },
};

// Reducer pour gérer les actions sur le store
function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM": // Action pour ajouter un article au panier
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      return { ...state, cart: { ...state.cart, cartItems } };

    default:
      return state;
  }
}

// Provider pour envelopper l'application et fournir le store global via le contexte
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState); // Utilisation de useReducer pour gérer l'état global
  return (
    <Store.Provider value={{ state, dispatch }}>
      {props.children} {/* Rendu des composants enfants */}
    </Store.Provider>
  );
}
