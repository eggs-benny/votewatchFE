import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Member, MpData } from "src/models/member";

function Home() {
  // welcome

  // Find your local MP
  // Enter postcode

  // Find an MP

  // MP List
  const [query, setQuery] = useState<string | null>("");
  const [members, setMembers] = useState<Member[]>([]);
  console.log(members[0]?.value?.nameDisplayAs);

  const fetchMPList = async (mpName: string): Promise<any> => {
    const response = await fetch(
      `https://members-api.parliament.uk/api/Members/Search?Name=${mpName}`
    );
    const mpData: MpData = await response.json();
    setMembers(mpData.items);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    // value.length >= 3 ? setReturnPrompt(true) : setReturnPrompt(false);
    // validationSchema()
    //   .validate(value)
    //   .then(() => {
    //     if (isMounted.current) {
    //       setError(null);
    //     }
    //   })
    //   .catch((err) => {
    //     if (isMounted.current) {
    //       setError(err.message);
    //     }
    //   });
    // if (value.length === 0) {
    //   setFilterSearch("");
    // }
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
    <>
      <Typography>Welcome to Votewatch</Typography>
      <Typography>Enter your postcode to find your local MP:</Typography>
      <Box>
        <Typography>Find an MP by name:</Typography>
        <TextField
          type="search"
          name="MP Search"
          value={query}
          label="MP Search"
          placeholder="Press enter to search"
          onChange={handleChange}
          onKeyUp={handleKeyPress}
        />
      </Box>

      {members?.map((member) => {
        return <Typography>{member?.value?.nameDisplayAs}</Typography>;
      })}
    </>
  );
}

export default Home;
