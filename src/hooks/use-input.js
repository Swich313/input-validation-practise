import {useState, useReducer} from "react";

const initialState = {
    value: '',
    isTouched: false
};

const inputStateReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_VALUE':
            return {value: action.payload, isTouched: state.isTouched};
        case 'BLUR_CHANGE':
            return {value: state.value, isTouched: true};
        case 'RESET':
            return initialState;
        default:
            return initialState;
    }
};

const useInput = (validateValue) => {
    const [state, dispatch] = useReducer(inputStateReducer, initialState)
    // const [enteredValue, setEnteredValue] = useState('');
    // const [isTouched, setIsTouched] = useState(false);

    // const valueIsValid = validateValue(enteredValue);
    // const hasError = !valueIsValid && isTouched;

    const valueIsValid = validateValue(state.value);
    const hasError = !valueIsValid && state.isTouched;

    const valueChangeHandler = e => {
        dispatch({type: 'CHANGE_VALUE', payload: e.target.value});
        //     setEnteredValue(e.target.value);
    };


    const inputBlurHandler = e => {
        dispatch({type: 'BLUR_CHANGE'});
        // setIsTouched(true);
    };

    const reset = () => {
        dispatch({type: 'RESET'});
        // setEnteredValue('');
        // setIsTouched(false);
    };

    return {
        value: state.value,
        hasError,
        isValid: valueIsValid,
        valueChangeHandler,
        inputBlurHandler,
        reset
    };
};

export default useInput;