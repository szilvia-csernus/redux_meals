import { useEffect, useState } from 'react';
import useInput from '../../hooks/useInput';
import classes from './Checkout.module.css';


const isNotEmpty = value => value.trim() !== '';

const Checkout = props => {
    const [formValid, setFormValid] = useState(false);

    const {
        value: nameValue,
        isValid: nameIsValid,
        hasError: nameHasError,
        inputChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: nameReset
    } = useInput(isNotEmpty);

    const {
        value: streetValue,
        isValid: streetIsValid,
        hasError: streetHasError,
        inputChangeHandler: streetChangeHandler,
        inputBlurHandler: streetBlurHandler,
        reset: streetReset
    } = useInput(isNotEmpty);

    const {
        value: postalCodeValue,
        isValid: postalCodeIsValid,
        hasError: postalCodeHasError,
        inputChangeHandler: postalCodeChangeHandler,
        inputBlurHandler: postalCodeBlurHandler,
        reset: postalCodeReset
    } = useInput(isNotEmpty);

    const {
        value: cityValue,
        isValid: cityIsValid,
        hasError: cityHasError,
        inputChangeHandler: cityChangeHandler,
        inputBlurHandler: cityBlurHandler,
        reset: cityReset
    } = useInput(isNotEmpty);

    
    useEffect(() => {
        if (nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid) {
            setFormValid(true)
        }
        return () => setFormValid(false)
    }, [nameIsValid, streetIsValid, postalCodeIsValid, cityIsValid])

    const confirmHandler = event => {
        event.preventDefault();

        console.log("form handler!")
        if (!formValid) {
            return;
        }

        props.onOrder({
            name: nameValue,
            street: streetValue,
            postalCode: postalCodeValue,
            city: cityValue
        })

        nameReset();
        streetReset();
        postalCodeReset();
        cityReset();
    }

    const nameClassNames = ` ${classes.control } ${nameHasError && classes.invalid}`;
    const streetClassNames = ` ${classes.control } ${streetHasError && classes.invalid}`;
    const postalCodeClassNames = ` ${classes.control } ${postalCodeHasError && classes.invalid}`;
    const cityClassNames = ` ${classes.control } ${cityHasError && classes.invalid}`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameClassNames}>
                <label htmlFor='name'> Your Name</label>
                <input
                    type='text'
                    id='name'
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                    
                    value={nameValue}
                />
                {nameHasError && <p className="error">Invalid Name.</p>}
            </div>
            <div className={streetClassNames}>
                <label htmlFor='street'> Street</label>
                <input
                    type='text'
                    id='street'
                    onChange={streetChangeHandler}
                    onBlur={streetBlurHandler}
                    
                    value={streetValue} 
                />
            </div>
            <div className={postalCodeClassNames}>
                <label htmlFor='postal'> Postal Code</label>
                <input
                    type='text'
                    id='postal'
                    onChange={postalCodeChangeHandler}
                    onBlur={postalCodeBlurHandler}
                    
                 value={postalCodeValue} 
                />
            </div>
            <div className={cityClassNames}>
                <label htmlFor='city'> City</label>
                <input
                    type='text'
                    id='city'
                    onChange={cityChangeHandler}
                    onBlur={cityBlurHandler}
                    
                 value={cityValue} 
                />
            </div>
            <div className={classes.actions}>
                <button type="button" className={classes['button--alt']} onClick={props.onClick}>Cancel</button>
                <button disabled={!formValid}>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout