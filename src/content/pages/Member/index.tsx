import {
  Box,
  Pagination,
  PaginationItem,
  Typography
} from "@mui/material";
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
import {
  fetchMemberVotes,
  selectVotes,
  selectVotesStatus
} from "src/slices/vote";
import LoadingSpinner from "src/components/Shared/LoadingSpinner";
import { ArrowCircleLeft, ArrowCircleRight, Home } from "@mui/icons-material";

function Member() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const member = useSelector(selectSelectedMember);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const sliderRef = useRef<Slider>(null);
  const votesStatus = useSelector(selectVotesStatus);
  const votes = useSelector(selectVotes);

  useEffect(() => {
    dispatch(fetchMemberVotes(member.value.id));
    dispatch(fetchMemberContactInfo(member.value.id));
  }, [dispatch, member.value.id]);

  const handleChange = (event, value) => {
    setCurrentSlide(value - 1);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(value - 1);
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
      <Box
        sx={{
          width: "100vw",
          overflow: "hidden",
          backgroundColor: "#012e31",
          py: "20px"
        }}
      >
        <img
          src="/owl-logo.png"
          style={{
            width: 120,
            height: 120,
            borderRadius: 25,
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)"
          }}
          alt={"Votewatch Owl Logo"}
        />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" py="50px">
        <Typography fontSize={40} fontFamily={"Roboto Slab"}>
          {member.value?.nameFullTitle}
        </Typography>
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
        <Pagination
          count={votes.length}
          page={currentSlide + 1}
          onChange={handleChange}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowCircleLeft, next: ArrowCircleRight }}
              {...item}
            />
          )}
        />
        <Home
          aria-label="home"
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
