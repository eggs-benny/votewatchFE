import { Box, Typography, Container, styled, Link } from "@mui/material";

const MainContent = styled(Box)(
  () => `
      padding-top: 10%;
      height: 100%;
      display: flex;
      flex: 1;
      overflow: auto;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  `
);

function Status404() {
  return (
    <>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center">
            <img alt="404" height={180} src="/static/images/status/404.svg" />
            <Typography
              variant="h2"
              sx={{
                my: 2
              }}
            >
              {"The page you were looking for doesn't exist."}
            </Typography>
            <Typography
              variant="h4"
              color="text.secondary"
              fontWeight="normal"
              sx={{
                mb: 4
              }}
            >
              <Link href="/">{"Navigate back home."}</Link>
            </Typography>
          </Box>
        </Container>
      </MainContent>
    </>
  );
}

export default Status404;
