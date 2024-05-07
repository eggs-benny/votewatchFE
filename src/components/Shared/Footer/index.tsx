import { Box, Card, Typography, styled } from '@mui/material';

const FooterWrapper = styled(Card)(
  ({ theme }) => `
        border-radius: 0;
        margin-top: ${theme.spacing(4)};
`
);

interface Props {
  fixed?: boolean;
  center?: boolean;
}


function Footer({ fixed = false, center = false }: Props) {
  return (
    <FooterWrapper className="footer-wrapper">
      <Box
        p={2}
        display={{ xs: 'block', md: 'flex' }}
        position={fixed ? { md: 'fixed' } : {}}
        left={center ? 0 : {}}
        bottom={{ md: 0 }}
        width="100%"
        alignItems="center"
        textAlign={center ? { xs: "center", md: "center"} : { xs: "center", md: "left" }}
        justifyContent={ center ? "center" : "space-between"}
      >
        <Box>
          <Typography variant="subtitle1" fontSize={".6rem"}>
            &copy; Benedict Smith. Data provided by TheyWorkForYou and the Open Parliament Licence v3.0
          </Typography>
        </Box>
      </Box>
    </FooterWrapper>
  );
}

export default Footer;
