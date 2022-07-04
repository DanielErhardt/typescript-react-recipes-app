import { useRef, useEffect } from 'react';

const useKeyboardEventListener = (eventName, key, callback) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    const handleEvent = (event) => {
      if (event.code === key) {
        callbackRef.current(event);
      }
    };

    document.addEventListener(eventName, handleEvent);
    return () => document.removeEventListener(eventName, handleEvent);
  }, [key]);
};

export const useKeyPress = (key, callback) => useKeyboardEventListener('keypress', key, callback);
export const useKeyUp = (key, callback) => useKeyboardEventListener('keyup', key, callback);
export const useKeyDown = (key, callback) => useKeyboardEventListener('keydown', key, callback);
