import { Box, Typography } from "@mui/material";
import { StyledTextField } from "src/components/Shared/StyledTextField";
import { fetchMembersList } from "src/slices/member";
import { NameValidationSchema } from "../SearchValidation";
import { useSearch } from "src/hooks/useSearch";
import SearchInputProps from "../searchInputProps";

function MemberNameSearch({ onSearch }: { onSearch: () => void }) {
  const { query, returnPrompt, error, handleChange, handleKeyPress } =
    useSearch({
      fetchAction: fetchMembersList,
      validationSchema: NameValidationSchema,
      onSearch,
      validationKey: "memberName"
    });

  return (
    <Box px={"15px"}>
      <Box py={"5px"}>
        <Typography fontSize={"1.5rem"}>Find an MP by name:</Typography>
      </Box>
      <Box py={"10px"}>
        <StyledTextField
          type="search"
          name="MP Name Search"
          value={query}
          label="Enter a name..."
          placeholder="Hit return to search"
          onChange={handleChange}
          onKeyUp={handleKeyPress}
          error={!!error}
          helperText={error}
          InputProps={SearchInputProps({ returnPrompt })}
        />
      </Box>
    </Box>
  );
}
export default MemberNameSearch;
