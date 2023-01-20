import {useEffect, useState} from "react";

const SimpleInput = (props) => {
    const [name, setName] = useState('');
    const [nameIsTouched, setNameIsTouched] = useState(false);
    // const [formIsValid, setFormIsValid] = useState(false);

    const enteredNameIsValid = name.trim() !== '';
    const nameInputIsInvalid = !enteredNameIsValid && nameIsTouched;

    let formIsValid = false;

    if(enteredNameIsValid){
        formIsValid = true;
    }


    const nameInputChangeHandler = e => {
        setName(e.target.value);
    };

    const nameInputBlur = e => {
        setNameIsTouched(true);
    };

    const formSubmissionHandler = e => {
        e.preventDefault();
        setNameIsTouched(true);
        if(!enteredNameIsValid){
            return;
        }
        setName('');
        setNameIsTouched(false);
    };

    const nameInputClasses = !nameInputIsInvalid ? 'form-control' : 'form-control invalid';

    return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
            type='text'
            id='name'
            value={name}
            onChange={nameInputChangeHandler}
            onBlur={nameInputBlur}/>
          {nameInputIsInvalid && <p className="error-text">Name must be!</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
