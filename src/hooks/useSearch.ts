import { useState } from "react";
import { useDispatch } from "src/store";

interface SearchHookOptions {
  fetchAction: any;
  validationSchema: any;
}

export const useSearch = ({
  fetchAction,
  validationSchema
}: SearchHookOptions) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState<string | null>("");
  const [returnPrompt, setReturnPrompt] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    validationSchema()
      .validate({ value })
      .then(() => {
        setError(null);
        setReturnPrompt(true);
      })
      .catch((err: { errors: string[] }) => {
        setError(err.errors[0]);
        setReturnPrompt(false);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value;
      dispatch(fetchAction(value));
      e.preventDefault();
    }
  };

  return { query, returnPrompt, error, handleChange, handleKeyPress };
};
