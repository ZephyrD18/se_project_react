import { useCallback, useRef, useState } from "react";

export function useForm(initialValues = {}) {
  const initialValuesRef = useRef(initialValues);
  const [values, setValues] = useState(initialValuesRef.current);

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const resetForm = useCallback(() => {
    setValues(initialValuesRef.current);
  }, []);

  return { values, handleChange, resetForm };
}
