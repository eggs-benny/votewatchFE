import { Search, KeyboardReturn } from "@mui/icons-material";
import { Box, Typography, InputAdornment } from "@mui/material";
import { StyledTextField } from "src/components/Shared/StyledTextField";
import { fetchMembersList } from "src/slices/member";
import { NameValidationSchema } from "../SearchValidation";
import { useSearch } from "src/hooks/useSearch";

function MemberNameSearch() {
  const { query, returnPrompt, error, handleChange, handleKeyPress } =
    useSearch({
      fetchAction: fetchMembersList,
      validationSchema: NameValidationSchema
    });

  return (
    <Box px={"15px"}>
      <Box py={"5px"}>
        <Typography>Find an MP by name:</Typography>
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
export default MemberNameSearch;
