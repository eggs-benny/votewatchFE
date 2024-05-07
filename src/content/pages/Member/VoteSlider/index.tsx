import { Box, Button, Divider, Tooltip, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Division } from "src/models/division";
import { selectVotes } from "src/slices/vote";
import { useSelector } from "src/store";
import ResultTypography from "./ResultTypography";
import { RefObject, useState } from "react";
import EmailModal from "src/components/Shared/EmailModal";
import PieChart from "src/components/Shared/PieChart";

interface VoteSliderProps {
  sliderRef: RefObject<Slider>;
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
    return <ResultTypography vote={mpVote} />;
  }

  function houseVote(vote: Division) {
    const isAyeMajority =
      vote.PublishedDivision.AyeCount > vote.PublishedDivision.NoCount;
    return <ResultTypography vote={isAyeMajority} />;
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
              <Tooltip className="" title={vote.PublishedDivision.Title}>
                <Typography
                  sx={{
                    fontWeight: "800",
                    maxWidth: "500px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginBottom: "10px"
                  }}
                >
                  {vote.PublishedDivision.Title}
                </Typography>
              </Tooltip>
              <Typography fontSize="body2.fontSize">
                Division took place on{" "}
                {divisionDate(vote.PublishedDivision.Date)}
              </Typography>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Box
                  px="25px"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Typography>Member Voted:</Typography>
                  {memberVote(vote.MemberVotedAye)}
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Box
                  px="25px"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Typography>Commons result:</Typography>
                  <Box sx={{ width: "125px", height: "125px" }}>
                    <PieChart
                      ayeCount={vote.PublishedDivision.AyeCount}
                      noeCount={vote.PublishedDivision.NoCount}
                    />
                  </Box>
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Box
                  px="25px"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Typography>House Voted:</Typography>
                  {houseVote(vote)}
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                paddingX="20px"
              >
                <Button
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    window.open(
                      `https://votes.parliament.uk/Votes/Commons/Division/${vote.PublishedDivision.DivisionId}`,
                      "_blank"
                    )
                  }
                  title={`${vote.PublishedDivision.Title}`}
                >
                  Details of vote
                </Button>
                <Box paddingX="20px" />
                <Button
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleClick(vote)}
                  title="Email"
                >
                  Email your MP about this
                </Button>
              </Box>
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
