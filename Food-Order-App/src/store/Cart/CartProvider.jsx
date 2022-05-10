import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        let updatedItems = [...state.items];
        const updatedTotalAmount =
            state.totalAmount + action.item.price * action.item.amount;
        const targetItem = updatedItems.find(
            (item) => item.id === action.item.id
        );

        if (targetItem) {
            targetItem.amount += action.item.amount;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    } else if (action.type === 'REMOVE') {
        let updatedItems = [...state.items];
        const targetItem = updatedItems.find((item) => item.id === action.id);
        const updatedTotalAmount = state.totalAmount - targetItem.price;

        if (targetItem.amount === 1) {
            updatedItems = updatedItems.filter((item) => item.id !== action.id);
        } else {
            targetItem.amount--;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }

    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    );
    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD', item });
    };
    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', id });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
