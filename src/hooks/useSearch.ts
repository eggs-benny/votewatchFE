import { debounce } from "@mui/material";
import { AsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { useMemo, useState } from "react";
import { Member } from "src/models/member";
import { useDispatch } from "src/store";
import * as Yup from "yup";

interface SearchHookOptions {
  fetchAction: AsyncThunk<void | Member[], string, AsyncThunkConfig>;
  validationSchema: () => Yup.ObjectSchema<any>;
  onSearch?: () => void;
  validationKey: string;
}

export const useSearch = ({
  fetchAction,
  validationSchema,
  onSearch,
  validationKey
}: SearchHookOptions) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState<string | null>("");
  const [returnPrompt, setReturnPrompt] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const validateInput = useMemo(
    () =>
      debounce((value) => {
        validationSchema()
          .validate({ [validationKey]: value })
          .then(() => {
            setError(null);
            setReturnPrompt(true);
          })
          .catch((err) => {
            setError(err.errors ? err.errors[0] : "Invalid input");
            setReturnPrompt(false);
          });
      }, 200),
    [validationSchema, validationKey]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    validateInput(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query && !error) {
      e.preventDefault();
      if (onSearch) onSearch();
      dispatch(fetchAction(query));
    }
  };

  return { query, returnPrompt, error, handleChange, handleKeyPress };
};
