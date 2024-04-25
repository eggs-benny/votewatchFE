import { debounce } from "@mui/material";
import { useMemo, useState } from "react";
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

  const validateInput = useMemo(() => debounce((value) => {
    validationSchema()
      .validate({ postcode: value })
      .then(() => {
        setError(null);
        setReturnPrompt(true);
      })
      .catch((err) => {
        setError(err.errors ? err.errors[0] : "Invalid input");
        setReturnPrompt(false);
      });
  }, 200), [validationSchema]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    validateInput(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query) {
      e.preventDefault();
      dispatch(fetchAction(query));
    }
  };

  return { query, returnPrompt, error, handleChange, handleKeyPress };
};
