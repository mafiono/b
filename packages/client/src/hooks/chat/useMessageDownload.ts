import { useEffect, useState } from 'react';
import { chatMessageDownload } from '../../store/chat/api';

const cache: Record<string, string> = {};

export const useMessageDownload = (messageID: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [src, setSRC] = useState('');

  useEffect(() => {
    if (cache[messageID]) {
      setSRC(cache[messageID]);
      setIsLoading(false);
    } else {
      chatMessageDownload(messageID)
        .then((result) => {
          cache[messageID] = `data:image/png;base64,${result.data.encodedData}`;
          setSRC(cache[messageID]);
          setIsLoading(false);
        })
        .catch();
    }

    return () => {
      setIsLoading(true);
      setSRC('');
    };
  }, [messageID]);

  return { isLoading, src };
};
