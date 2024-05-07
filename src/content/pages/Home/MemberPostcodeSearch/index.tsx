import { Box, Typography } from "@mui/material";
import { StyledTextField } from "src/components/Shared/StyledTextField";
import { fetchLocalMember } from "src/slices/member";
import { PostcodeValidationSchema } from "../SearchValidation";
import { useSearch } from "src/hooks/useSearch";
import SearchInputProps from "../searchInputProps";

function MemberPostcodeSearch({ onSearch }: { onSearch: () => void }) {
  const { query, returnPrompt, error, handleChange, handleKeyPress } =
    useSearch({
      fetchAction: fetchLocalMember,
      validationSchema: PostcodeValidationSchema,
      onSearch,
      validationKey: "postcode"
    });

  return (
    <Box px={"15px"}>
      <Box py={"5px"}>
        <Typography fontSize={"1.5rem"}>Find your local MP:</Typography>
      </Box>
      <Box py={"10px"}>
        <StyledTextField
          type="search"
          name="Local MP Search"
          value={query}
          label="Enter your postcode..."
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
export default MemberPostcodeSearch;
