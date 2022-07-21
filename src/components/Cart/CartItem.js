import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import classes from './CartItem.module.css';

const CartItem = (props) => {
    const price = `$${props.price.toFixed(2)}`;
    const item = props;

    const dispatch = useDispatch();
    const addOneItemHandler = () =>
      dispatch(cartActions.addItems({ ...item, amount: 1 }));
    const removeOneItemHandler = () => dispatch(cartActions.removeItem(item.id));

    return (
        <li className={classes['cart-item']}>
            <div>
                <h3>{item.name}</h3>
                <div className={classes.summary}>
                    <span className={classes.price}>{price}</span>
                    <span className={classes.amount}>x {item.amount}</span>
                </div>
            </div>
            <div className={classes.actions}>
                <button onClick={removeOneItemHandler}>−</button>
                <button onClick={addOneItemHandler}>+</button>
            </div>
        </li>
    );
};

export default CartItem;