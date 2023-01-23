import useInput from "../hooks/use-input";

const BasicForm = (props) => {
    const nameRegEx = /\d/;
    const validationForName = value => !nameRegEx.test(value) && value.trim() !== '';
    const emailRegEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/;

    const {
        value: enteredFirstName,
        hasError: firstNameHasError,
        isValid: firstNameIsValid,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
        reset: firstNameReset
    } = useInput(validationForName);

    const {
        value: enteredLastName,
        hasError: lastNameHasError,
        isValid: lastNameIsValid,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        reset: lastNameReset
    } = useInput(validationForName);

    const {
        value: enteredEmail,
        hasError: emailHasError,
        isValid: emailIsValid,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: emailReset
    } = useInput(value => emailRegEx.test(value));

    let formIsValid = false;
    if(firstNameIsValid && lastNameIsValid && emailIsValid){
        formIsValid = true;
    }

    const formSubmissionHandler = e => {
        e.preventDefault();

        if(!formIsValid){
            return
        }
        console.log('Submitted!');
        console.log({firstName: enteredFirstName, lastName: enteredLastName, email: enteredEmail});
        firstNameReset();
        lastNameReset();
        emailReset();

    };

    const firstNameClassNames = firstNameHasError ? 'form-control invalid' : 'form-control';
    const lastNameClassNames = lastNameHasError ? 'form-control invalid' : 'form-control';
    const emailClassNames = emailHasError ? 'form-control invalid' : 'form-control';


    return (
    <form onSubmit={formSubmissionHandler}>
      <div className='control-group'>
        <div className={firstNameClassNames}>
          <label htmlFor='name'>First Name</label>
          <input
              type='text'
              id='name'
              onBlur={firstNameBlurHandler}
              onChange={firstNameChangeHandler}
              value={enteredFirstName}/>
            {firstNameHasError && <p className='error-text'>Enter a valid first name!</p>}
        </div>
        <div className={lastNameClassNames}>
          <label htmlFor='name'>Last Name</label>
          <input
              type='text'
              id='name'
          value={enteredLastName}
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}/>
            {lastNameHasError && <p className='error-text'>Enter a valid last name!</p>}
        </div>
      </div>
      <div className={emailClassNames}>
        <label htmlFor='name'>E-Mail Address</label>
        <input
            type='text'
            id='name'
            value={enteredEmail}
            onChange={emailChangeHandler}
        onBlur={emailBlurHandler}/>
          {emailHasError && <p className='error-text'>Enter a valid email!</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
