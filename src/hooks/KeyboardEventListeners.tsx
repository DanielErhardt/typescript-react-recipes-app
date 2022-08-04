// import { useRef, useEffect } from 'react';

// const useKeyboardEventListener = (type: string, key: string, callback: (event: KeyboardEvent) => void): void => {
//   const callbackRef = useRef(callback);

//   useEffect(() => {
//     callbackRef.current = callback;
//   });

//   useEffect(() => {
//     const eventListener = (event: KeyboardEvent): void => {
//       if (event.code === key) {
//         callbackRef.current(event);
//       }
//     };

//     document.addEventListener(type, eventListener);
//     return () => document.removeEventListener(type, eventListener);
//   }, [key]);
// };

// export const useKeyPress = (key: string, callback: () => {}): void => useKeyboardEventListener('keypress', key, callback);
// export const useKeyUp = (key: string, callback: () => {}): void => useKeyboardEventListener('keyup', key, callback);
// export const useKeyDown = (key: string, callback: () => {}): void => useKeyboardEventListener('keydown', key, callback);
