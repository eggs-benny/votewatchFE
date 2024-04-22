import { Search, KeyboardReturn } from "@mui/icons-material";
import { Box, Typography, InputAdornment } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "src/store";
import { StyledTextField } from "src/components/Shared/StyledTextField";
import { fetchLocalMember } from "src/slices/member";
import { PostcodeValidationSchema } from "../SearchValidation";

function MemberPostcodeSearch() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState<string | null>("");
  const [returnPrompt, setReturnPrompt] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    PostcodeValidationSchema()
      .validate({ postcode: value })
      .then(() => {
        setError(null);
        setReturnPrompt(true);
      })
      .catch((err) => {
        setError(err.errors[0]);
        setReturnPrompt(false);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value;
      dispatch(fetchLocalMember(value));
      e.preventDefault();
    }
  };

  return (
    <Box px={"15px"}>
      <Box py={"5px"}>
        <Typography>Enter your postcode to find your local MP:</Typography>
      </Box>
      <Box py={"5px"}>
        <StyledTextField
          type="search"
          name="MP Name Search"
          value={query}
          label="Find MP..."
          placeholder="Hit enter to search"
          onChange={handleChange}
          onKeyUp={handleKeyPress}
          error={!!error}
          helperText={error}
          InputProps={{
            sx: {
              height: "40px"
            },
            startAdornment: (
              <InputAdornment position="start">
                {returnPrompt && <KeyboardReturn sx={{ color: "lightgray" }} />}
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Search sx={{ color: "lightgray" }} />
              </InputAdornment>
            )
          }}
        />
      </Box>
    </Box>
  );
}
export default MemberPostcodeSearch;
