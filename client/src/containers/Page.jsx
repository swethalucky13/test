import {Box, IconButton, Drawer} from "@mui/material";
import {useCallback, useEffect, useMemo} from "react";
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from "../assets/logo.svg"
import {useAuth} from "../providers/AuthProvider.jsx";
import tempProfileImage from "../assets/temp-profile-image.svg"
import {useLocation, useNavigate} from "react-router-dom";

const drawerWidth = 80

const Page = ({
  children,
  verticalCenter = false,
  horizontalCenter = false,
  title = "Virtual Study Room",
  loading = false,
  excludeNavigation = false,
  sx
}) => {

  const {logout} = useAuth()
  const navigate = useNavigate()
  const {pathname} = useLocation()

  const logoutHandler = useCallback(() => logout(), [logout])

  const iconClickHandler = useCallback(() => navigate("/public-rooms"), [])

  const profileClickHandler = useCallback(() => navigate("/profile"), [])

  useEffect(() => {
    document.title = title
  }, [title])

  const navigationOptions = useMemo(() => [
    {
      icon: <PublicIcon />,
      onClick: () => navigate("/public-rooms"),
      shouldHighlight: pathname.startsWith("/public-rooms")
    },
    {
      icon: <PublicOffIcon />,
      onClick: () => navigate("/private-rooms"),
      shouldHighlight: pathname.startsWith("/private-rooms")
    },
    {
      icon: <LeaderboardIcon />,
      onClick: () => navigate("/leaderboard"),
      shouldHighlight: pathname.startsWith("/leaderboard")
    },
    {
      icon: <ShoppingCartIcon />,
      onClick: () => navigate("/marketplace"),
      shouldHighlight: pathname.startsWith("/marketplace")
    }
  ], [navigate, pathname])

  if (loading) {
    return (
      <Box>
        Loading...
      </Box>
    )
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(to right, #400A71, #1D0652)",
        overflowX: "hidden",
        position: "relative",
        display: "flex",
        ...sx
      }}
    >
      {!excludeNavigation && (
        <Drawer
          sx={{width: `${drawerWidth}px`, "& .MuiPaper-root": {border: "none"}}}
          variant={"permanent"}
          anchor={"left"}
        >
          <Box
            sx={{
              width: `${drawerWidth}px`,
              height: "100vh",
              backgroundColor: "primary.dark",
              padding: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Box>
              <Box
                onClick={iconClickHandler}
                sx={{cursor: "pointer"}}
              >
                <img src={logo} alt={""} />
              </Box>
              <Box
                sx={{
                  borderBottom: "1px solid white",
                  margin: 1
                }}
              />
              <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                {navigationOptions.map(({icon, onClick, shouldHighlight}) => (
                  <Box
                    sx={{
                      marginY: 1,
                      borderRadius: "10000px",
                      backgroundColor: shouldHighlight ? "primary.light" : "transparent"
                    }}
                  >
                    <IconButton
                      onClick={onClick}
                      sx={{
                        "& svg": {
                          color: "white",
                          fontSize: "35px"
                        }
                      }}
                    >
                      {icon}
                    </IconButton>
                  </Box>
                ))}
                <Box sx={{marginY: 1}}>
                  <IconButton
                    onClick={profileClickHandler}
                    sx={{
                      "& svg": {
                        color: "white",
                        fontSize: "35px"
                      }
                    }}
                  >
                    <img src={tempProfileImage} alt={""} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Box>
              <IconButton
                onClick={logoutHandler}
                sx={{
                  "& svg": {
                    color: "white",
                    fontSize: "35px"
                  }
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          </Box>
        </Drawer>
      )}
      <Box
        sx={{
          width: "100%",
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: verticalCenter ? "center" : "flex-start",
          alignItems: horizontalCenter ? "center" : "flex-start",
          overflowX: "hidden"
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Page
