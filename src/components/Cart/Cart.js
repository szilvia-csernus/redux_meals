import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useHttp from '../../hooks/useHttp';
import { cartActions } from '../../store/cart-slice';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = props => {
    const [isCheckout, setIsCheckout] = useState(false);
    const cart = useSelector(state => state.cart);
    const total = cart.total;
    const hasItems = cart.totalQuantity > 0;

    const dispatch = useDispatch();

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cart.items.map((item) => (
                <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                />
            ))}
        </ul>
    );

    const orderHandler = () => {
        setIsCheckout(true)
    }

    const { isLoading, success, error, sendRequest } = useHttp();

    const orderConfirmHandler = userData => {
        const apply = data => {
            console.log(data);
            dispatch(cartActions.clearCart());
            success && console.log('Success!!')
            // send feedback of successful order
        }

        const configData = {
          url: "https://redux-meals-9213d-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
          method: "POST",
          body: { cart: cart.items, user: userData },
        };
        sendRequest(configData, apply);
    }

    let content;

    if (error) {
        content = (
          <div className={classes.warning}>
            <p>{error} Something went wrong!</p>
            <button className={classes.button} onClick={props.onClose}>
              Close
            </button>
          </div>
        );
    } else if (isLoading) {
        content = <p className={classes.loading}>Loading...</p>
    } else if (success) {
        content = <>
            <h3>Order Successful!</h3>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            </div>
        </>
    } else if (isCheckout) {
        content = <>
            <div className={classes.total}>
                <span>Total</span>
                <span>{total}</span>
            </div>
            <Checkout onClick={props.onClose} onOrder={orderConfirmHandler} />
        </>
    } else {
        content =
            <>
                {cartItems}
                <div className={classes.total}>
                    <span>Total</span>
                    <span>{total}</span>
                </div>
                <div className={classes.actions}>
                    <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                    {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
                </div>
            </>
    }


    return (
        <Modal onClose={props.onClose}>
            {content}
        </Modal>
    )
}

export default Cart