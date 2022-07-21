import { useContext, useState } from 'react';
import useHttp from '../../hooks/useHttp';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = props => {
    const [isCheckout, setIsCheckout] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = cartCtx.totalAmount.toFixed(2);
    const hasItems = cartCtx.items.length > 0;

    const addOneItem = item => cartCtx.addItem({ ...item, amount: 1 });
    const removeOneItem = id => cartCtx.removeItem(id);

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={() => removeOneItem(item.id)}
                    onAdd={() => addOneItem(item)}
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
            console.log(data)
            cartCtx.clearCart();
            success && console.log('Success!!')
            // send feedback of successful order
        }

        const configData = {
            url: 'https://food-order-app-b8109-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
            method: 'POST',
            body: { cart: cartCtx.items, user: userData }

        }
        sendRequest(configData, apply);
    }

    let content;

    if (error) {
        content = <div className={classes.warning}>
            <p >{error} Something went wrong!</p>
            <button className={classes.button} onClick={props.onFetch}>Try again</button>
        </div>;
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
                <span>{totalAmount}</span>
            </div>
            <Checkout onClick={props.onClose} onOrder={orderConfirmHandler} />
        </>
    } else {
        content =
            <>
                {cartItems}
                <div className={classes.total}>
                    <span>Total</span>
                    <span>{totalAmount}</span>
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