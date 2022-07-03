import { useRef, useEffect } from 'react';

const useKey = (listener, key, callback) => {
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

    document.addEventListener(listener, handleEvent);
    return () => document.removeEventListener(listener, handleEvent);
  }, [key]);
};

export const useKeyPress = (key, callback) => useKey('keypress', key, callback);
export const useKeyUp = (key, callback) => useKey('keyup', key, callback);
