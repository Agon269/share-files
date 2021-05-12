export const handleValidation = (values) => {
  let fields = values;
  let errors = {};
  let formIsValid = true;

  //Email
  if (!fields["email"]) {
    formIsValid = false;
    errors["email"] = "Cannot be empty";
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
      errors["email"] = "Email is not valid";
    }
  }

  if (!formIsValid) {
    return errors;
  }
  return formIsValid;
};
