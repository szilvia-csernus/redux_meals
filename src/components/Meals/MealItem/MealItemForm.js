import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = props => {
    const [amountIsValid, setAmountIsValid] = useState(true);

    const amountInputRef = useRef();
    

    const submitHandler = event => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false);
            return;
        } else {
            setAmountIsValid(true)
        }

        props.onAddToCart(enteredAmount)
    }
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input label="Amount" 
                    ref={amountInputRef}
                    input={
                    {
                        id: props.id,
                        type: "number",
                        min: "1",
                        max: "10",
                        step: "1",
                        defaultValue: "1"
                    }}
            />
            <button>Add</button>
            {!amountIsValid && <p>Max order is 5 portions!</p>}
        </form>
    )
}

export default MealItemForm