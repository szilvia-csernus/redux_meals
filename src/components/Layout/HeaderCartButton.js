import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';


const HeaderCartButton = props => {
    const [isToBump, setIsToBump] = useState(false);

    const itemsQuantity = useSelector(state => state.cart.totalQuantity);

    useEffect(() => {
        if (itemsQuantity > 0) {
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
    }, [itemsQuantity])
    

    const badgeClasses = `${classes.badge} ${isToBump && classes.bump}`

    return (
        <button className={classes.button} onClick={props.onClick}>
            <span className={classes.icon}><CartIcon/></span>
            <span>Your Cart</span>
            <span className={badgeClasses}>{itemsQuantity}</span>
        </button>
    )
}


export default HeaderCartButton