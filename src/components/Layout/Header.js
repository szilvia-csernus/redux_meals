import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = props => {
    return (
        <>
            <header className={classes.header}>
                <h1>ReduxMeals</h1>
                <HeaderCartButton onClick={props.onCartClick}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt='A delicious meal on the table!' />
            </div>
        </>
    )
}

export default Header