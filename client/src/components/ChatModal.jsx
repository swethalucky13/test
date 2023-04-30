import React, {useState} from "react"
import {
  Box,
  Button,
  Collapse,
  Fade,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useAuth} from "../providers/AuthProvider.jsx";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

/*
chatHistory: array of {
  name: string
  profileImageUrl: string
  content: string
}

targetUser: {
  name: string
  uid: string
}

userList: undefined or array of {
  name: string
  uid: string
  isOnline: boolean
}
 */

const ChatModal = ({chatHistory, targetUser, userList, onSend, onChangeTargetUser}) => {
  const [message, setMessage] = useState("")
  const {getCurrentUser} = useAuth()
  const [showUserList, setShowUserList] = useState(false)

  return (
    <Box
      sx={{
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        overflowY: "hidden",
        height: "100%"
      }}
    >
      {/* HEADER */}
      <Box sx={{backgroundColor: "#C6C6C6", paddingX: 2, paddingY: .5}}>
        <Box
          onClick={() => setShowUserList(prev => !prev)}
          onBlur={() => setShowUserList(false)}
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            cursor: userList && "pointer"
          }}
        >
          <Typography variant={"h4"} sx={{color: "#3D3A3A"}}>
            {targetUser.username}
          </Typography>
          {userList && !showUserList && (
            <KeyboardArrowDownIcon />
          )}
          {userList && showUserList && (
            <KeyboardArrowUpIcon />
          )}
          {userList && (
            <Fade in={showUserList} unmountOnExit>
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  backgroundColor: "#400b71",
                  borderRadius: "5px",
                  width: "50%"
                }}
              >
                <Box sx={{borderBottom: "1px solid #58337A", m: 1, mb: 0, pb: 1}}>
                  <Button
                    onClick={() => onChangeTargetUser({username: "All users"})}
                    sx={{backgroundColor: "#6b35a0", paddingY: 0.2, paddingX: 0.7, width: "100%"}}
                  >
                    Group Chat
                  </Button>
                </Box>
                <Box>
                  <List
                    dense
                    sx={{
                      overflowY: "scroll",
                      maxHeight: "200px",
                      "&::-webkit-scrollbar": {
                        width: '10px'
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: "rgba(0,0,0,0)",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "rgba(0,0,0,.5)",
                      }
                    }}
                  >
                    {userList.map((user) => (
                      <ListItem
                        onClick={() => onChangeTargetUser(user)}
                        key={`${Math.random()}`}
                        sx={{
                          paddingX: 1,
                          paddingY: .3,
                          "&:hover": { backgroundColor: "rgba(255,255,255,.1)" }
                        }}
                      >
                        <ListItemText
                          sx={{
                            width: "auto",
                            color: "white",
                            "& span": {
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis"
                            }
                          }}
                        >
                          {user.username}
                        </ListItemText>
                        {/*{isOnline && (*/}
                        {/*  <ListItemIcon sx={{minWidth: "0"}}>*/}
                        {/*    <FiberManualRecordIcon sx={{color: "#61FF00", fontSize: "8px"}} />*/}
                        {/*  </ListItemIcon>*/}
                        {/*)}*/}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            </Fade>
          )}
        </Box>
      </Box>

      {/* CHAT HISTORY */}
      <Box
        sx={{
          backgroundColor: "rgba(255,255,255,.5)",
          flex: 1,
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: '10px'
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "rgba(0,0,0,0)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255,255,255,.4)",
          }
        }}
      >
        {chatHistory.map(({senderId, profileImageUrl, content}) => (
          <Box
            key={`${+new Date()}${Math.random()}`}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: getCurrentUser().uid !== senderId ? "row" : "row-reverse",
              paddingY: 1,
              "& .mui-image-wrapper": {m: 0}
            }}
          >
            <Box sx={{borderRadius: "10000px", ml: 1}}>
              <img src={profileImageUrl} alt={""} width={"100%"} />
            </Box>
            <Box
              sx={{
                ml: 1,
                flex: 1,
                display: "flex",
                flexDirection: getCurrentUser().uid !== senderId ? "row" : "row-reverse",
                pr: getCurrentUser().uid !== senderId ? 4 : 0
              }}
            >
              <Box
                sx={{
                  backgroundColor: getCurrentUser().uid !== senderId ? "#7012d3" : "#CEC1DB",
                  color: getCurrentUser().uid !== senderId ? "white" : "black",
                  p: 1,
                  borderRadius: "5px"
                }}
              >
                <Typography>{content}</Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* MESSAGE SEND FORM */}
      <Box sx={{backgroundColor: "#CEC1DB"}}>
        <form
          onSubmit={e => {
            e.preventDefault()
            onSend(message)
            setMessage("")
          }}
        >
          <Box display={"flex"}>
            <TextField
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder={"Enter your message..."}
              sx={{"& fieldset": {border: "none"}, boxSizing: "border-box"}}
            />
            <Button
              type={"submit"}
              variant={"text"}
              sx={{color: "#350968"}}
            >
              Send
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default ChatModal
