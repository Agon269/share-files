export const handleValidation = (values) => {
  let fields = values;
  let errors = {};
  let formIsValid = true;

  //Email
  if (!fields["email"]) {
    formIsValid = false;
    errors["error"] = "Email cannot be empty";
  }

  if (typeof fields["email"] !== "undefined") {
    let lastAtPos = fields["email"].lastIndexOf("@");
    let lastDotPos = fields["email"].lastIndexOf(".");

    if (
      !(
        lastAtPos < lastDotPos &&
        lastAtPos > 0 &&
        fields["email"].indexOf("@@") === -1 &&
        lastDotPos > 2 &&
        fields["email"].length - lastDotPos > 2
      )
    ) {
      formIsValid = false;
      errors["error"] = "Email is not valid";
    }
  }

  if (!formIsValid) {
    return errors;
  } else {
    //password
    if (!fields["password"]) {
      formIsValid = false;
      errors["error"] = "Password cannot be empty";
      return errors;
    }
  }
  return formIsValid;
};
