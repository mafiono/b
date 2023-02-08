import { useEffect, useState } from 'react';

const useResize = (fn: Function = () => {}) => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    function updateSize() {
      setWidth(+window.innerWidth);
      setHeight(+window.innerHeight);
      fn(width, height);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [fn]);

  return {
    width,
    height,
  };
};

export default useResize;
