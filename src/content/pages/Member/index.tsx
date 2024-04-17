import { Box, Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Division } from "src/models/division";
import { selectSelectedMember } from "src/slices/member";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ContactInfo } from "src/models/member";
import { useNavigate } from "react-router";
import VoteSlider from "./VoteSlider";

function Member() {
  const navigate = useNavigate();
  const member = useSelector(selectSelectedMember);
  const [votes, setVotes] = useState<Division[]>();
  const [contactInfo, setContactInfo] = useState<ContactInfo>();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
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

  const handleSlideChange = (direction: number) => {
    setCurrentSlide(currentSlide + direction);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(currentSlide + direction);
    }
  };

  return (
    <>
     <Box display="flex" flexDirection="column" alignItems="center">
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
            </Box>
      <VoteSlider
        votes={votes}
        contactInfo={contactInfo}
        sliderRef={sliderRef}
        currentSlide={currentSlide}
      />
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box>
          {currentSlide > 0 && (
            <Button onClick={() => handleSlideChange(-1)}>Previous</Button>
          )}
          {currentSlide < 9 && (
            <Button onClick={() => handleSlideChange(1)}>Next</Button>
          )}
        </Box>
        <Button onClick={() => navigate("/home")}>Home</Button>
      </Box>
    </>
  );
}
export default Member;
