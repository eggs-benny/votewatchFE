import { Box, Button, Divider, Typography } from "@mui/material";
import Slider from "react-slick";
import { Division } from "src/models/division";
import { ContactInfo } from "src/models/member";
import {
  selectMemberContactInfo,
  selectSelectedMember
} from "src/slices/member";
import { selectVotes } from "src/slices/vote";
import { useSelector } from "src/store";
import ResultTypography from "./ResultTypography";

interface VoteSliderProps {
  sliderRef: Slider;
  currentSlide: number;
}

function VoteSlider({ sliderRef, currentSlide }: VoteSliderProps) {
  const divisionDate = (date: Date) => new Date(date).toLocaleDateString();
  const member = useSelector(selectSelectedMember);
  const contactInfo = useSelector(selectMemberContactInfo);
  const votes = useSelector(selectVotes);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false
  };

  function findMemberEmail(contactInfo: ContactInfo) {
    if (contactInfo?.value[0]?.email !== undefined) {
      return contactInfo.value[0].email;
    }
    if (contactInfo?.value[1]?.email !== undefined) {
      return contactInfo.value[1].email;
    }
    return new Error("Can't find MP's Email");
  }
  const memberEmail = findMemberEmail(contactInfo);

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

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography>Recent Commons Votes</Typography>
      </Box>
      <Slider {...sliderSettings} ref={sliderRef}>
        {votes?.map((vote, index) => (
          <div
            key={vote.PublishedDivision.DivisionId}
            style={{ display: currentSlide === index ? "block" : "none" }}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography>
                {divisionDate(vote.PublishedDivision.Date)}
              </Typography>
              <Typography className="text-3xl font-bold underline">
                {vote.PublishedDivision.Title}
              </Typography>
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
              <Typography>
                Result: {vote.PublishedDivision.AyeCount} Ayes,{" "}
                {vote.PublishedDivision.NoCount} Noes
              </Typography>
              <Button
                onClick={() =>
                  window.open(
                    `mailto:${memberEmail}?subject=${vote.PublishedDivision.Title}&body=Dear ${member.value.nameAddressAs},\n\n I am writing to you regarding your vote on the recent division titled: "${vote.PublishedDivision.Title}". \n\nIt has come to my attention that you voted ${
                      true ? "Aye" : "Noe"
                    } for this Division. \n\n I would therefore share my [SUPPORT / CONCERN] because [ENTER REASON]. \n\n Yours Sincerely,\n\n [ENTER NAME]`
                  )
                }
                title="Email"
              >
                Email your MP about this
              </Button>
              {/* <Typography> Approve / Disapprove</Typography> */}
            </Box>
          </div>
        ))}
      </Slider>
    </>
  );
}

export default VoteSlider;
