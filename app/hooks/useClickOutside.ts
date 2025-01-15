import { useEffect, useRef } from 'react';

type Handler = () => void;

/**
 * カレンダーの外をクリックしたらカレンダーを閉じる 
 * @param handler 
 * @returns 
 */
export const useClickOutside = (handler: Handler) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handler]);

  return ref;
}; 