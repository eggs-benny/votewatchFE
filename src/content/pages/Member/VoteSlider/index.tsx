import { Box, Button, Divider, Tooltip, Typography } from "@mui/material";
import Slider from "react-slick";
import { Division } from "src/models/division";
import { selectVotes } from "src/slices/vote";
import { useSelector } from "src/store";
import ResultTypography from "./ResultTypography";
import { useState } from "react";
import EmailModal from "src/components/Shared/EmailModal";

interface VoteSliderProps {
  sliderRef: Slider;
  currentSlide: number;
}

function VoteSlider({ sliderRef, currentSlide }: VoteSliderProps) {
  const divisionDate = (date: Date) => new Date(date).toLocaleDateString();
  const votes = useSelector(selectVotes);
  const [selectedVote, setSelectedVote] = useState<Division>();
  const [openEmailModal, setOpenEmailModal] = useState<boolean>(false);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false
  };

  function memberVote(mpVote: boolean) {
    return (
      <ResultTypography
        voteResult={mpVote ? "AYE" : "NO"}
        color={mpVote ? "forestgreen" : "firebrick"}
      />
    );
  }

  function houseVote(vote: Division) {
    const isAyeMajority =
      vote.PublishedDivision.AyeCount > vote.PublishedDivision.NoCount;
    return (
      <ResultTypography
        voteResult={isAyeMajority ? "AYE" : "NO"}
        color={isAyeMajority ? "forestgreen" : "firebrick"}
      />
    );
  }

  function handleClick(vote: Division) {
    setSelectedVote(vote);
    setOpenEmailModal(true);
  }

  return (
    <>
      <Slider {...sliderSettings} ref={sliderRef}>
        {votes?.map((vote, index) => (
          <div
            key={vote.PublishedDivision.DivisionId}
            style={{ display: currentSlide === index ? "block" : "none" }}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography fontSize={15} fontFamily={"Roboto Slab"}>
                {divisionDate(vote.PublishedDivision.Date)}
              </Typography>
              <Tooltip className="" title={vote.PublishedDivision.Title}>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontFamily: "Roboto Slab",
                    maxWidth: "500px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}
                  className="text-3xl font-bold underline"
                >
                  {vote.PublishedDivision.Title}
                </Typography>
              </Tooltip>
              <Button
                onClick={() =>
                  window.open(
                    `https://votes.parliament.uk/Votes/Commons/Division/${vote.PublishedDivision.DivisionId}`,
                    "_blank"
                  )
                }
                title={`${vote.PublishedDivision.Title}`}
              >
                Details of Commons Vote
              </Button>{" "}
              <Box display="flex" flexDirection="row" alignItems="center">
                <Box
                  px="25px"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Typography fontFamily={"Roboto Slab"}>
                    Member Voted:
                  </Typography>
                  <Box>{memberVote(vote.MemberVotedAye)}</Box>
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Box
                  px="25px"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Typography fontFamily={"Roboto Slab"}>
                    House Voted:
                  </Typography>
                  <Box>{houseVote(vote)}</Box>
                </Box>
              </Box>
              <Typography fontFamily={"Roboto Slab"}>
                Commons result: {vote.PublishedDivision.AyeCount} Ayes,{" "}
                {vote.PublishedDivision.NoCount} Noes
              </Typography>
              <Button onClick={() => handleClick(vote)} title="Email">
                Email your MP about this
              </Button>
            </Box>
          </div>
        ))}
      </Slider>
      {selectedVote && (
        <EmailModal
          setOpenEmailModal={setOpenEmailModal}
          openEmailModal={openEmailModal}
          vote={selectedVote}
        />
      )}
    </>
  );
}

export default VoteSlider;
