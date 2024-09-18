import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { BsChatDots } from "react-icons/bs";

const Chatbot = () => {
  const [open, setOpen] = useState(false); // State to control drawer open/close
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const toggleDrawer = (state) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(state);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prev) => [...prev, { text: message, from: "user" }]);
      setMessage("");
    }
  };

  return (
    <>
      <IconButton onClick={toggleDrawer(true)}>
        <BsChatDots color="#13661e" size={24} />
      </IconButton>

      <Drawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          width: "100%",
          height: "50vh",
        }}
      >
        <Box
          sx={{
            p: 2,
            height: "50vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" textAlign="center" sx={{ mb: 2 }}>
            Demo Chatbot
          </Typography>

          {/* Chat Window */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              border: "1px solid lightgray",
              borderRadius: "8px",
              padding: 2,
              mb: 2,
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent:
                    msg.from === "user" ? "flex-end" : "flex-start",
                  mb: 1,
                }}
              >
                <Typography
                  sx={{
                    backgroundColor:
                      msg.from === "user" ? "#13661e" : "#e0e0e0",
                    color: msg.from === "user" ? "white" : "black",
                    padding: "8px",
                    borderRadius: "12px",
                    maxWidth: "70%",
                  }}
                >
                  {msg.text}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Input and Send Button */}
          <Stack direction="row" spacing={1}>
            <TextField
              variant="outlined"
              placeholder="Type a message..."
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <Button
              variant="contained"
              onClick={handleSendMessage}
              sx={{ backgroundColor: "#13661e", color: "white" }}
            >
              Send
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default Chatbot;
