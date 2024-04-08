import { Search, KeyboardReturn } from "@mui/icons-material";
import { Box, Typography, InputAdornment } from "@mui/material";
import { useState } from "react";
import { StyledTextField } from "src/components/Shared/StyledTextField";
import { Member, MpData } from "src/models/member";
import * as Yup from "yup";

interface MemberNameSearchProps {
  setMembers: (memberData: Member[]) => void;
}

function validationSchema() {
  return Yup.string().min(3, "Minimum term 3 chars");
}

function MemberNameSearch({ setMembers }: MemberNameSearchProps) {
  const [query, setQuery] = useState<string | null>("");
  const [returnPrompt, setReturnPrompt] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMPList = async (mpName: string): Promise<any> => {
    const response = await fetch(
      `https://members-api.parliament.uk/api/Members/Search?Name=${mpName}`
    );
    const mpData: MpData = await response.json();
    setMembers(mpData.items);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    value.length >= 3 ? setReturnPrompt(true) : setReturnPrompt(false);
    validationSchema()
      .validate(value)
      .then(() => {
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
    if (value.length === 0) {
      setQuery("");
    }
    setQuery(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value;
      fetchMPList(value);
      e.preventDefault();
    }
  };

  return (
    <Box px={"15px"}>
      <Box py={"5px"}>
        <Typography>Find an MP by name:</Typography>
      </Box>
      <Box py={"5px"}>
        <StyledTextField
          type="search"
          name="MP Search"
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
