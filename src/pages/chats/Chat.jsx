import React, { useEffect, useRef, useState } from "react";
import { theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import apiConfig from "../../api/apiConfig";
import { ReactComponent as Send } from "../../assets/icon/🦆 icon _send_.svg";
import { messageActions } from "../../store/messageSilce";
import "./Chat.css";
import io from "socket.io-client";
import { DebounceInput } from "react-debounce-input";

const socket = io("https://ecommerce-server-hqbv.onrender.com");

const Chat = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { user } = useSelector((state) => state.user?.user);
  const { users } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);
  const chatMessagesRef = useRef(null);
  const [room, setRoom] = useState();
  const [isUser, setIsUser] = useState();
  const [search, setSearch] = useState();

  const userClients = users?.filter((user) => user.role === 0);

  const userSearch = userClients?.filter((user) =>
    user.fullName?.toLowerCase().includes(search?.toLowerCase())
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiConfig.getAllUsers());
  }, [dispatch]);

  const handleJoinRoom = (id) => {
    setRoom(id);
  };

  const messageRoom = messages?.filter((message) => message.room === room);

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (message.trim() !== "" && room) {
      const messageData = {
        room: room,
        author: user?.fullName,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      dispatch(messageActions.getMessage(messageData));

      setMessage("");
    }
  };

  useEffect(() => {
    const receiveMessageListener = (data) => {
      setIsUser(data.room);
      dispatch(messageActions.getMessage(data));
    };

    socket.on("receive_message", receiveMessageListener);

    userClients?.map((user) => socket.emit("join_room", user._id));

    return () => {
      socket.off("receive_message", receiveMessageListener);
    };
  }, [dispatch, userClients]);

  useEffect(() => {
    // Scroll to the bottom of the chat messages container when new messages are added
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Scroll to the bottom of the chat messages container when new messages are added
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Content
      style={{
        margin: "24px 16px 0",
      }}
    >
      <div style={{ margin: "16px 0" }}>Chat </div>
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
        }}
      >
        <div className="messageBox-wrapper ">
          <div className="user-text">
            <div className="search-user">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="user-message-box">
              {userSearch?.length > 0
                ? userSearch?.map((item) => {
                    return (
                      <div
                        key={item._id}
                        className="user-message"
                        onClick={() => handleJoinRoom(item._id)}
                      >
                        {item.fullName}
                        {isUser === item._id && (
                          <span
                            style={{
                              marginLeft: "10px",
                              padding: "0px 4px",
                              borderRadius: "4px",
                              color: "white",
                              backgroundColor: "red",
                            }}
                          >
                            message
                          </span>
                        )}
                      </div>
                    );
                  })
                : userClients?.map((item) => {
                    return (
                      <div
                        key={item._id}
                        className="user-message"
                        onClick={() => handleJoinRoom(item._id)}
                      >
                        {item.fullName}
                        {isUser === item._id && (
                          <span
                            style={{
                              marginLeft: "10px",
                              padding: "0px 4px",
                              borderRadius: "4px",
                              color: "white",
                              backgroundColor: "red",
                            }}
                          >
                            message
                          </span>
                        )}
                      </div>
                    );
                  })}
            </div>
          </div>
          <div className="chat-box ">
            <div className="chat-title">
              <div>Customer Support</div>
              <div>Let's Chat App</div>
            </div>
            <div className="chat-messages " ref={chatMessagesRef}>
              {messageRoom.map((msg, index) => {
                return (
                  <div
                    key={index}
                    className={
                      user?.fullName === msg.author
                        ? "message-right"
                        : "message-left"
                    }
                  >
                    <span className="content">{msg.message}</span>
                    <span className="sub-message">{msg.time}</span>
                  </div>
                );
              })}
            </div>
            <div className="input-box">
              <DebounceInput
                type="text"
                minLength={1}
                debounceTimeout={500}
                className="chat-input"
                placeholder="Type your message here..."
                value={message}
                onChange={handleInputChange}
                onKeyPress={(event) => {
                  event.key === "Enter" && sendMessage();
                }}
              />
              <button onClick={sendMessage} className="send-button">
                <Send />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default Chat;
