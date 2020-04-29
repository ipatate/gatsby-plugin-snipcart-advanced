const React = require("react");

export const initialState = {
  ready: false,
  userStatus: "SignedOut",
  cartQuantity: 0,
};

// create context for dispatch
export const SnipCartContext = React.createContext(initialState);

const reducer = (state, action) => {
  switch ((state, action.type)) {
    case "setReady":
      return { ...state, ...{ ready: action.payload } };
    case "setQuantity":
      return { ...state, ...{ cartQuantity: action.payload } };
    case "setUserStatus":
      return { ...state, ...{ userStatus: action.payload } };
    case "setTotal":
      return { ...state, ...{ cartTotal: action.payload } };
    case "setSubTotal":
      return { ...state, ...{ cartSubTotal: action.payload } };
    default:
      return state;
  }
};

export const useStore = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  // update state
  React.useEffect(() => {
    const { Snipcart } = window;
    if (Snipcart && state.ready === true) {
      // update state infos on change
      const listenSnipCart = () => {
        const { customer, cart } = Snipcart.store.getState();
        // get quantity in cart
        dispatch({
          type: "setQuantity",
          payload: cart.items.reduce((total, item) => total + item.quantity, 0),
        });
        // connected or not
        dispatch({
          type: "setUserStatus",
          payload: customer.status,
        });
        // connected or not
        dispatch({
          type: "setTotal",
          payload: cart.total,
        });
        // connected or not
        dispatch({
          type: "setSubTotal",
          payload: cart.subtotal,
        });
      };
      // listen store update
      const unsubscribe = Snipcart.store.subscribe(listenSnipCart);
      // call first
      listenSnipCart();
      return () => unsubscribe();
    }
  }, [state.ready, dispatch]);

  return [state, dispatch];
};
