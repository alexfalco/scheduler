import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (item, replace) => {
    if (replace) {
      setHistory([...history.slice(0, history.length - 1), item]);
      setMode(item);
    } else {
      setHistory([...history, item]);
      setMode(item);
    }
  };

  const back = () => {
    if (history.length > 1) {
      setHistory(history.slice(0, history.length - 1));
      setMode(history[history.length - 2]);
    } else {
      setMode(history[0]);
    }
  };

  return { mode, transition, back };
}
