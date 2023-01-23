// import {useState} from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
    const {value: enteredName,
           isValid: enteredNameIsValid,
           hasError: nameInputHasError,
           valueChangeHandler: nameChangeHandler,
           inputBlurHandler: nameBlurHandler,
           reset: resetNameInput} = useInput(value => value.trim() !== '');

    const emailRedExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/;

    const {value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput} = useInput(value => emailRedExp.test(value));

    // const [name, setName] = useState('');
    // const [nameIsTouched, setNameIsTouched] = useState(false);

    // const [email, setEmail] = useState('');
    // const [emailIsTouched, setEmailIsTouched] = useState(false);
    // const [formIsValid, setFormIsValid] = useState(false);

    // const enteredNameIsValid = name.trim() !== '';
    // const nameInputIsInvalid = !enteredNameIsValid && nameIsTouched;

    // const enteredEmailIsValid = emailRedExp.test(email);
    // const emailInputIsInvalid = !enteredEmailIsValid && emailIsTouched;

    let formIsValid = false;
    console.log()

    if(enteredNameIsValid && enteredEmailIsValid){
        formIsValid = true;
    }


    // const nameInputChangeHandler = e => {
    //     setName(e.target.value);
    // };

    // const nameInputBlur = e => {
    //     setNameIsTouched(true);
    // };

    // const emailInputChangeHandler = e => {
    //     setEmail(e.target.value);
    // };
    //
    // const emailInputBlur = e => {
    //     setEmailIsTouched(true);
    // };

    const formSubmissionHandler = e => {
        e.preventDefault();
        if(!enteredNameIsValid || !enteredEmailIsValid){
            return;
        }
        resetNameInput();
        resetEmailInput()
    };

    const nameInputClasses = !nameInputHasError ? 'form-control' : 'form-control invalid';
    const emailInputClasses = !emailInputHasError ? 'form-control' : 'form-control invalid';

    return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
            type='text'
            id='name'
            value={enteredName}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}/>
          {nameInputHasError && <p className="error-text">Name must be!</p>}
      </div>
      <div className={emailInputClasses}>
          <label htmlFor='email'>Your Email</label>
          <input
              type='email'
              id='email'
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}/>
          {emailInputHasError && <p className="error-text">Email must be valid!</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
