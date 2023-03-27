import React from "react"
import {Box} from "@mui/material";
import Page from "../containers/Page.jsx";
import animation from "../assets/login-animation.json"
import LottiePlayer from "../components/LottiePlayer.jsx";
import AuthModal from "../components/AuthModal.jsx";

const LoginPage = () => {
  return (
    <Page
      title={"Get Started"}
    >
      <Box
        sx={{
          flex: 1,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "stretch",
          "&>.MuiBox-root": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }
        }}
      >
        <Box>
          <Box sx={{width: "100%"}}>
            <LottiePlayer animationData={animation} />
          </Box>
        </Box>
        <Box>
          <Box sx={{width: "70%", height: "70%"}}>
            <AuthModal
              onLogin={(username, password) => console.log(username, password)}
              onSignup={(username, password) => console.log(username, password)}
              onStatusChange={(status) => console.log(status)}
            />
          </Box>
        </Box>
      </Box>
    </Page>
  )
}

export default LoginPage
