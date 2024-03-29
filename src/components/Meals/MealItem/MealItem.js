import { useDispatch } from 'react-redux';
import { cartActions } from '../../../store/cart-slice';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = props => {
    
    const dispatch = useDispatch();
    
    const addToCartHandler = amount => {
        dispatch(cartActions.addItems({
            id: props.id,
            name: props.name,
            price: props.price,
            amount: +amount
            })
        )
    }

    const price = `£${props.price.toFixed(2)}`;

    return (
            <li className={classes.meal}>
                <div>
                    <h3>{props.name}</h3>
                    <div className={classes.description}>{props.description}</div>
                    <div className={classes.price}>{price}</div>
                </div>
                <div>
                    <MealItemForm id={props.id} onAddToCart={addToCartHandler}/>
                </div>
            </li>
        
    )
}

export default MealItem