import { Box, Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Division } from "src/models/division";
import { selectSelectedMember } from "src/slices/member";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ContactInfo } from "src/models/member";

function Member() {
  const member = useSelector(selectSelectedMember);
  const [votes, setVotes] = useState<Division[]>();
  const [contactInfo, setContactInfo] = useState<ContactInfo>();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const divisionDate = (date: Date) => new Date(date).toLocaleDateString();

  const sliderRef = useRef<Slider>(null);

  const fetchMemberVotes = async (memberId: number) => {
    const response = await fetch(
      `https://commonsvotes-api.parliament.uk/data/divisions.json/membervoting?queryParameters.memberId=${memberId}`
    );
    const voteData: Division[] = await response.json();
    setVotes(voteData);
  };

  const fetchMemberContactDetails = async (memberId: number) => {
    const response = await fetch(
      `https://members-api.parliament.uk/api/Members/${memberId}/Contact`
    );
    const contactData: ContactInfo = await response.json();
    setContactInfo(contactData);
  };

  useEffect(() => {
    fetchMemberVotes(member.value.id);
    fetchMemberContactDetails(member.value.id);
  }, [member.value.id]);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false
  };

  const handleSlideChange = (direction: number) => {
    setCurrentSlide(currentSlide + direction);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(currentSlide + direction);
    }
    console.log(currentSlide);
  };

  return (
    <>
      <Typography>Your MP</Typography>
      <Typography>{member.value?.nameFullTitle}</Typography>
      <img
        src={member.value.thumbnailUrl}
        style={{
          width: 225,
          height: 225,
          border: "7px solid black",
          borderRadius: 150
        }}
        alt={member.value.nameFullTitle}
      />
      <Typography> Previous 10 votes</Typography>
      <Slider {...sliderSettings} ref={sliderRef}>
        {votes?.slice(0, 10).map((vote, index) => (
          <div
            key={vote.PublishedDivision.DivisionId}
            style={{ display: currentSlide === index ? "block" : "none" }}
          >
            <Box>
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
      {currentSlide > 0 && (
        <Button onClick={() => handleSlideChange(-1)}>Previous</Button>
      )}
      {currentSlide < 9 && (
        <Button onClick={() => handleSlideChange(1)}>Next</Button>
      )}
    </>
  );
}
export default Member;
