import { useCallback, useState } from "react";

export default function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValidForm, setIsValidForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const errorMessage = e.target.validationMessage;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: errorMessage });
    setIsValidForm(e.target.closest('form').checkValidity());
  }

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValidForm(newIsValid);
  }, [setValues, setErrors, setIsValidForm])

  return { values, handleChange, errors, isValidForm, resetForm }
}
