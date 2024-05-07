import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "src/store";
import {
  selectMemberContactInfo,
  selectSelectedMember
} from "src/slices/member";
import { ContactInfo } from "src/models/member";
import {
  modalActionButtonStyle,
  modalCancelButtonStyle,
  modalStyle,
  modalSubtextStyle,
  modalTextFieldStyle,
  modalTextStyle
} from "src/styles/modal";
import ModalIcon from "src/components/ModalIcon";

const EmailModal = ({ setOpenEmailModal, openEmailModal, vote }) => {
  const [message, setMessage] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<boolean>(false);
  const member = useSelector(selectSelectedMember);
  const contactInfo = useSelector(selectMemberContactInfo);

  useEffect(() => {
    setFullName("");
    if (vote) {
      setMessage(
        `I am writing to you regarding your vote on the recent division titled: "${vote?.PublishedDivision?.Title}". \n\nIt has come to my attention that you voted ${
          vote.MemberVotedAye ? "Aye" : "No"
        } for this Division. \n\nI would therefore like to share my [SUPPORT / CONCERN] because [ENTER REASON].`
      );
    }
  }, [vote]);

  const toggleOpen = () => {
    setOpenEmailModal(!openEmailModal);
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

  const handleSubmit = () => {
    if (!fullName.trim() || !message.trim()) {
      setNameError(!fullName.trim());
      setMessageError(!message.trim());
      return;
    }

    const memberEmail = findMemberEmail(contactInfo);
    if (memberEmail instanceof Error) {
      alert(memberEmail.message);
      return;
    }

    const subject = encodeURIComponent(vote?.PublishedDivision?.Title);
    const body = encodeURIComponent(
      `Dear ${member.value.nameAddressAs},\n\n${message}\n\nYours Sincerely,\n${fullName}`
    );
    window.open(`mailto:${memberEmail}?subject=${subject}&body=${body}`);
  };

  const handleNameInput = (e) => {
    const value = e.target.value;
    setFullName(value);
    setNameError(value.trim() === "");
  };

  const handleMessageInput = (e) => {
    const value = e.target.value;
    setMessage(value);
    setMessageError(value.trim() === "");
  };

  return (
    <Modal open={openEmailModal} onClose={toggleOpen}>
      <Box sx={modalStyle}>
        <>
          <ModalIcon />
          <Typography textAlign="center" sx={modalTextStyle}>
            Email your MP
          </Typography>
          <Typography textAlign="center" sx={modalSubtextStyle}>
            Adapt the template message as required
          </Typography>
          <TextField
            fullWidth
            error={messageError}
            multiline
            minRows={3}
            maxRows={15}
            placeholder="Write a message here"
            onChange={handleMessageInput}
            sx={modalTextFieldStyle}
            required
            value={message}
            helperText={messageError && "The message input cannot be empty."}
          />
          <Typography textAlign="center" sx={modalSubtextStyle}>
            Enter your name
          </Typography>
          <TextField
            fullWidth
            id="outlined-basic"
            value={fullName}
            error={nameError}
            placeholder="Enter first & last name"
            onChange={handleNameInput}
            required
            helperText={nameError && "Please enter your name."}
            sx={{ ...modalTextFieldStyle, marginBottom: "25px" }}
          />
          <Box display="flex" flexDirection="row" justifyContent="space-evenly">
            <Button sx={modalCancelButtonStyle} onClick={toggleOpen}>
              Cancel
            </Button>

            <Button sx={modalActionButtonStyle} onClick={handleSubmit}>
              Send Email
            </Button>
          </Box>
        </>
      </Box>
    </Modal>
  );
};

export default EmailModal;
