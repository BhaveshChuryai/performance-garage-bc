import { useState, useEffect } from "react";

const MESSAGES = [
  { icon:"🔥", text:"3 people viewed this car today" },
  { icon:"⚡", text:"1 inquiry sent in the last hour" },
  { icon:"👁", text:"12 people are browsing right now" },
  { icon:"🏎", text:"2 cars sold this week" },
  { icon:"📦", text:"Available for immediate delivery" },
  { icon:"💬", text:"Advisor online — ask a question" },
];

export default function FakeNotification() {
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState(MESSAGES[0]);

  useEffect(() => {
    const show = () => {
      setMsg(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    };
    const delay = setTimeout(show, 3000);
    const interval = setInterval(show, 18000);
    return () => { clearTimeout(delay); clearInterval(interval); };
  }, []);

  return (
    <div className={`fake-notif ${visible ? "show" : ""}`}>
      <span className="notif-icon">{msg.icon}</span>
      <span className="notif-text">{msg.text}</span>
    </div>
  );
}
