import { useCallback, useState } from "react";

export default function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValidForm, setIsValidForm] = useState(false);

  const handleChange = (e) => {
    const { name, value, validationMessage } = e.target;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationMessage });
    setIsValidForm(e.target.closest('form').checkValidity());
  }

  const handleBlur = (e) => {
    const { name, validationMessage } = e.target;
    setErrors({ ...errors, [name]: validationMessage });
    setIsValidForm(e.target.closest('form').checkValidity());
  }

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValidForm(newIsValid);
  }, [setValues, setErrors, setIsValidForm])

  return { setValues, values, handleBlur, handleChange, errors, isValidForm, setIsValidForm }
}
