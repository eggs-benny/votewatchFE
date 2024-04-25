import { Box, Button, Typography } from "@mui/material";
import Slider from "react-slick";
import { Division } from "src/models/division";
import { ContactInfo } from "src/models/member";
import { selectSelectedMember } from "src/slices/member";
import { useSelector } from "src/store";

interface VoteSliderProps {
  votes: Division[];
  contactInfo: ContactInfo;
  sliderRef: Slider;
  currentSlide: number;
}

function VoteSlider({
  votes,
  contactInfo,
  sliderRef,
  currentSlide
}: VoteSliderProps) {
  const divisionDate = (date: Date) => new Date(date).toLocaleDateString();
  const member = useSelector(selectSelectedMember);
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false
  };

  function ayeNoe(mpVote: boolean) {
    if (mpVote) {
      return (
        <Typography
          style={{
            fontSize: 60,
            color: "forestgreen",
            fontWeight: "900",
            alignItems: "center"
          }}
        >
          {`\n`}AYE
        </Typography>
      );
    } else if (!mpVote) {
      return (
        <Typography
          style={{
            fontSize: 60,
            color: "firebrick",
            fontWeight: "900",
            alignItems: "center"
          }}
        >
          {`\n`}NO
        </Typography>
      );
    }
  }

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography>Recent Commons Votes</Typography>
      </Box>
      <Slider {...sliderSettings} ref={sliderRef}>
        {votes?.slice(0, 10).map((vote, index) => (
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
              </Button>
              <Typography>Member Voted</Typography>
              <Box>{ayeNoe(vote.MemberVotedAye)}</Box>
              <Typography>Result: {vote.PublishedDivision.AyeCount} Ayes, {vote.PublishedDivision.NoCount} Noes</Typography>
              <Button
                onClick={() =>
                  window.open(
                    `mailto:${contactInfo.value[0].email}?subject=${vote.PublishedDivision.Title}&body=Dear ${member.value.nameAddressAs},\n\n I am writing to you regarding your vote on the recent division titled: "${vote.PublishedDivision.Title}". \n\nIt has come to my attention that you voted ${
                      true ? "Aye" : "Noe"
                    } for this Division. \n\n I would therefore share my [SUPPORT / CONCERN] because [ENTER REASON]. \n\n Yours Sincerely,\n\n [ENTER NAME]`
                  )
                }
                title="Email"
              >
                Email your MP about this
              </Button>
              <Typography> Approve / Disapprove</Typography>
            </Box>
          </div>
        ))}
      </Slider>
    </>
  );
}

export default VoteSlider;
