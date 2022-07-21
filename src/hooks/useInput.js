import { useReducer } from "react"

const initialState = {
    value: '',
    isTouched: false
}

const inputReducer = (state, action) => {
    if (action.type === "INPUT") {
        return {
            value: action.value,
            isTouched: state.isTouched
        }
    }
    if (action.type === "BLUR") {
        return {
            value: state.value,
            isTouched: true
        }
    }
    if (action.type === "RESET") {
        return initialState
    }
    return state
}

const useInput = (validateInput) => {
    const [inputState, dispatch] = useReducer(inputReducer, initialState)

    const valueIsValid = validateInput(inputState.value);
    const hasError = (valueIsValid === false) && inputState.isTouched;

    const inputChangeHandler = (event) => {
        dispatch({ type: "INPUT", value: event.target.value });
    };

    const inputBlurHandler = () => {
        dispatch({ type: "BLUR" });
    };

    const reset = () => {
        dispatch({ type: "RESET" })
    }

    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        inputChangeHandler,
        inputBlurHandler,
        reset
    }
}

export default useInput