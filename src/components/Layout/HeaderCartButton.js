
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';


const HeaderCartButton = props => {
    const [isToBump, setIsToBump] = useState(false);

    const cartCtx = useContext(CartContext);

    const { items } = cartCtx;

    const numberOfCartItems = items.reduce((currentAmount, item) => {
        return currentAmount + item.amount
    }, 0)

    useEffect(() => {
        if (items.length > 0) {
            setIsToBump(true)
        }
        // the animation has to be stopped so it can be started again. Otherwise,
        // it would run only once.
        const timer = setTimeout(() => {
            setIsToBump(false)
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [items])
    

    const badgeClasses = `${classes.badge} ${isToBump && classes.bump}`

    return (
        <button className={classes.button} onClick={props.onClick}>
            <span className={classes.icon}><CartIcon/></span>
            <span>Your Cart</span>
            <span className={badgeClasses}>{numberOfCartItems}</span>
        </button>
    )
}


export default HeaderCartButton