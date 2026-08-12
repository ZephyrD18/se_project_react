import { useCallback, useRef, useState } from "react";

export function useForm(initialValues = {}) {
  const initialValuesRef = useRef(initialValues);
  const [values, setValues] = useState(initialValuesRef.current);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const resetForm = useCallback((nextValues = initialValuesRef.current) => {
    setValues(nextValues);
  }, []);

  return { values, handleChange, resetForm };
}
