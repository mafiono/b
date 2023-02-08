import { ChangeEvent, useCallback } from 'react';
import { readFile } from '../../utils/readFile';

export const useBase64Uploader = (
  cb: (file: string[], fileList: File[]) => void,
  allowedTypes: string[] = [],
) =>
  useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const fileList = Array.from(event.target.files || []);
      const files = await Promise.all(
        fileList
          .filter((file) => !allowedTypes?.length || allowedTypes.includes(file.type))
          .map(readFile),
      );

      if (!files.length) {
        return;
      }
      
      cb(files.filter((f) => !!f), fileList);
    },
    [cb],
  );
