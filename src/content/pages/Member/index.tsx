import { Box, Button, Typography } from "@mui/material";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  fetchMemberContactInfo,
  selectSelectedMember,
  SliceStatusEnum
} from "src/slices/member";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router";
import VoteSlider from "./VoteSlider";
import { useDispatch, useSelector } from "src/store";
import { fetchMemberVotes, selectVotesStatus } from "src/slices/vote";
import LoadingSpinner from "src/components/Shared/LoadingSpinner";
import { ArrowCircleLeft, ArrowCircleRight, Home } from "@mui/icons-material";

function Member() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const member = useSelector(selectSelectedMember);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const sliderRef = useRef<Slider>(null);
  const votesStatus = useSelector(selectVotesStatus);

  useEffect(() => {
    dispatch(fetchMemberVotes(member.value.id));
    dispatch(fetchMemberContactInfo(member.value.id));
  }, [dispatch, member.value.id]);

  const handleSlideChange = (direction: number) => {
    setCurrentSlide(currentSlide + direction);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(currentSlide + direction);
    }
  };

  let votesList: ReactNode;
  switch (votesStatus) {
    case SliceStatusEnum.SUCCEEDED:
      votesList = (
        <VoteSlider sliderRef={sliderRef} currentSlide={currentSlide} />
      );
      break;
    case SliceStatusEnum.LOADING:
      votesList = <LoadingSpinner />;
      break;
  }

  return (
    <Box
      sx={{ width: "100vw", minHeight: "100vh", backgroundColor: "#fffdeb" }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" py="50px">
        <Typography>Your MP</Typography>
        <Typography>{member.value?.nameFullTitle}</Typography>
        <img
          src={member.value.thumbnailUrl}
          style={{
            width: 225,
            height: 225,
            border: "7px solid #012e31",
            borderRadius: 150
          }}
          alt={member.value.nameFullTitle}
        />
      </Box>
      {votesList}
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box>
          {currentSlide > 0 && (
            <ArrowCircleLeft
              onClick={() => handleSlideChange(-1)}
              cursor="pointer"
              fontSize="large"
              sx={{ color: "#012e31" }}
            >
              Previous
            </ArrowCircleLeft>
          )}
          {currentSlide < 9 && (
            <ArrowCircleRight
              onClick={() => handleSlideChange(1)}
              cursor="pointer"
              fontSize="large"
              sx={{ color: "#012e31" }}
            >
              Previous
            </ArrowCircleRight>
          )}
        </Box>
        <Home
          onClick={() => navigate("/home")}
          cursor="pointer"
          fontSize="large"
          sx={{ color: "#012e31" }}
        >
          Home
        </Home>
      </Box>
    </Box>
  );
}
export default Member;
