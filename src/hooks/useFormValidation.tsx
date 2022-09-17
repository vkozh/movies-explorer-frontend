import React, { /*useCallback,*/ useState } from "react";
import { Values, Errors } from "../components/types/types";

export default function useFormValidation() {
  const [values, setValues] = useState<Values | undefined>(undefined);
  const [errors, setErrors] = useState<Errors | undefined>(undefined);
  const [isValidForm, setIsValidForm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, validationMessage } = e.target;
    const form = e.target.closest('form');

    setValues({ ...values, [name]: value } as Values);
    setErrors({ ...errors, [name]: validationMessage } as Errors);
    form !== null && setIsValidForm(form.checkValidity());
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, validationMessage } = e.target;
    const form = e.target.closest('form');

    setErrors({ ...errors, [name]: validationMessage } as Errors);
    form !== null && setIsValidForm(form.checkValidity());
  }

  // const resetForm = useCallback((newValues: Values, newErrors: Errors, newIsValid = false) => {
  //   setValues(newValues);
  //   setErrors(newErrors);
  //   setIsValidForm(newIsValid);
  // }, [setValues, setErrors, setIsValidForm])

  return { setValues, values, handleBlur, handleChange, errors, isValidForm, setIsValidForm }
}
