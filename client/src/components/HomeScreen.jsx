import React from "react"
import Page from "../containers/HomePageContainer.jsx";
import headphoneSvg from "../assets/headphone.svg"
import {Box, styled, Typography, Button} from "@mui/material";
import AuthBlock from "../components/AuthBlock.jsx";


const HomeScreen = ({onLogin, onSignup}) => {

  return (
    <Page horizontalCenter verticalCenter>
      <Box sx={{position: "absolute", top: 0, left: 0}}>
        <img src={headphoneSvg} alt={""} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 20,
          right: 20
        }}
      >
        <AuthBlock
          onLogin={onLogin}
          onSignup={onSignup}
        />
      </Box>
      {/* main content */}
      <Box>
        <Box>
          <StyledTypography
            sx={{
              fontWeight: "999",
              fontSize: "48px",
              textShadow: "2px 2px #9f7ff3"
            }}
          >
            EXPERIENCE THE
          </StyledTypography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontWeight: "999",
              fontSize: "48px",
              color: "transparent",
              WebkitTextStroke: "3px #9f7ff3"
            }}
          >
            Virtual Study room
          </Typography>
        </Box>
        <Box sx={{mt: 10}}>
          <StyledTypography sx={{fontWeight: "bold"}}>
            50M+
          </StyledTypography>
          <StyledTypography>
            Experiencing it
          </StyledTypography>
        </Box>
        <Box sx={{mt: 10, display: "flex", justifyContent: "center", width: "100%"}}>
          <Button
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              "&:hover": {backgroundColor: "primary.light"}
            }}
          >
            <StyledTypography sx={{color: "#000"}}>
              KNOW MORE
            </StyledTypography>
          </Button>
        </Box>
      </Box>
    </Page>
  )
}

const StyledTypography = styled(Typography)({
  color: "#fff", textAlign: "center", fontFamily: 'Rubik'
})

export default HomeScreen
