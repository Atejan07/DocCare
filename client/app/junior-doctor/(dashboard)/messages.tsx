/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { io } from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { TypeMessage } from "../../../../server/types/types";
import { useAppSelector } from "@/redux/store";
import { TUser } from "@/types/types";
import { useDispatch } from "react-redux";
import { setAllMessages } from "@/redux/features/messages-slice";
import { LeftCircleOutlined, SendOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { toggleDisplaySection } from "@/redux/features/display-section";
import { toggleDisplayChat } from "@/redux/features/display-chat";
import "../../css/junior-doctor.css";

const socket = io("ws://localhost:3001");

interface Props {
  currentJunior: TUser;
}
export default function JuniorDoctorMessages({ currentJunior }: Props) {
  const router = useRouter();
  const initialState = { message: "", user: "" };
  const [messageState, setMessageState] = useState(initialState);
  const [messages, setMessages] = useState<TypeMessage[]>([]);
  const allMessages = useAppSelector((state) => state.allMessagesReducer.value);
  const dispatch = useDispatch();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMessageState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const chatToPatient = useAppSelector(
    (state) => state.chatPatientReducer.value
  );
  const selectedPatient = useAppSelector(
    (state) => state.chatPatientReducer.value
  );

  useEffect(() => {
    setMessages(
      allMessages.filter(
        (mes) =>
          mes.sender_id === selectedPatient.id ||
          mes.receiver_id === selectedPatient.id
      )
    );
  }, [chatToPatient.name]);

  function handleClick() {
    const newMessage = {
      content: messageState.message,
      sender_id: currentJunior.id,
      sender_name: "Doctor",
      receiver_id: selectedPatient.id,
      receiver_name: selectedPatient.name,
    } as TypeMessage;

    socket.auth = { name: "junior" };
    socket.connect();
    socket.emit("from junior", newMessage, selectedPatient.id);
    setMessages([...messages, newMessage]);
    dispatch(setAllMessages([...allMessages, newMessage]));
    setMessageState(initialState);
  }

  socket.on("patient message", (message) => {
    setMessages([...messages, message]);
  });

  function hideChat() {
    dispatch(toggleDisplaySection(true));
    dispatch(toggleDisplayChat(false));
  }

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <section className="chat">
      <div className="header-chat">
        <button onClick={hideChat} className="back-button">
          <LeftCircleOutlined style={{ fontSize: "1.4rem" }} />
        </button>
        <p className="name">{selectedPatient.name}</p>
      </div>
      <div className="messages-chat" ref={chatContainerRef}>
        {messages.map((mes, idx) => {
          return mes.sender_name === "Doctor" ? (
            <div className="message" key={idx}>
              <div className="response">
                <div className="text" key={mes.id}>
                  {mes.content}
                </div>
              </div>
            </div>
          ) : (
            <div className="message text-only">
              <div className="text" key={mes.id}>
                {mes.content}
              </div>
            </div>
          );
        })}
      </div>
      <div className="footer-chat">
        <div className="send-container">
          <input
            className="write-message"
            name="message"
            value={messageState.message}
            onChange={(e) => handleChange(e)}
            placeholder="Type your message..."
          ></input>
          <button className="send-button" onClick={handleClick}>
            <SendOutlined />
          </button>
        </div>
      </div>
    </section>
  );
}
