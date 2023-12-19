
import { emailRegex,regex,mobileRegex } from "../constants/regexConstants";


function validate(values) {
    const errors = {};
    if (values.firstName.length < 2) {
      errors.firstName = "name is too short";
    } else if (!values.firstName.match(regex)) {
      errors.firstName = "Invalid form first name can be 3 to 16 characters ";
    }
    if (!emailRegex.test(values.email)) {
      errors.email = "Invalid form write a valid email";
    }

    if (!mobileRegex.test(values.mobile)) {
      errors.mobile = "please enter a valid mobile number";
    }
    if (values.password.length < 8) {
      errors.password = "Weak password. Please choose a stronger password.";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "password do not match ,please try again";
    }

    return errors;
  }


  export default validate