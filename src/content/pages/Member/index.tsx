import {
  Box,
  Divider,
  Pagination,
  PaginationItem,
  Typography
} from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  fetchMemberContactInfo,
  selectSelectedMember,
  SliceStatusEnum
} from "src/slices/member";
import Slider from "react-slick";
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
import Header from "./Header";

function Member() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const member = useSelector(selectSelectedMember);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const sliderRef = useRef<Slider>(null);
  const votesStatus = useSelector(selectVotesStatus);
  const votes = useSelector(selectVotes);

  useEffect(() => {
    if (member.value?.id) {
      dispatch(fetchMemberVotes(member.value.id));
      dispatch(fetchMemberContactInfo(member.value.id));
    }
  }, [dispatch, member.value?.id]);

  const handleChange = (
    event: ChangeEvent<unknown>,
    value: number
  ) => {
    event.preventDefault();
    setCurrentSlide(value - 1);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(value - 1);
    }
  };
  function memberStartDate() {
    const startDate = new Date(
      member.value?.latestHouseMembership.membershipStartDate
    );
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }).format(startDate);
    return formattedDate;
  }

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        fontSize: "h1.fontSize",
        fontFamily: "h1.fontFamily",
        color: "background.default"
      }}
    >
      <Header member={member} />
      <Box display="flex" flexDirection="column" alignItems="center">
        <img
          src={member.value?.thumbnailUrl}
          style={{
            width: 225,
            height: 225,
            border: "7px solid #012e31",
            borderRadius: "50%",
            marginTop: "10px"
          }}
          alt={member.value?.nameFullTitle}
        />
        <Typography
          sx={{
            fontSize: "h3.fontSize",
            fontWeight: 600,
            color: `#${member.value?.latestParty.backgroundColour}`
          }}
        >
          {member.value?.latestParty.name}
        </Typography>
        <Typography>
          MP for {member.value?.latestHouseMembership.membershipFrom} since{" "}
          {memberStartDate()}
        </Typography>
      </Box>
      <Typography>
        <Divider sx={{ marginTop: "10px" }} aria-hidden="true">
          Recent Commons Votes
        </Divider>
      </Typography>
      {votesStatus === SliceStatusEnum.LOADING ? (
        <LoadingSpinner />
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              count={votes.length}
              page={currentSlide + 1}
              onChange={handleChange}
              renderItem={(item) => (
                <PaginationItem
                  slots={{
                    previous: ArrowCircleLeft,
                    next: ArrowCircleRight
                  }}
                  {...item}
                />
              )}
            />
          </Box>
          <VoteSlider sliderRef={sliderRef} currentSlide={currentSlide} />
        </>
      )}

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ color: "background.paper" }}
      >
        <Home
          aria-label="home"
          fontSize="large"
          onClick={() => navigate("/home")}
          style={{ cursor: "pointer" }}
        />
      </Box>
    </Box>
  );
}
export default Member;
