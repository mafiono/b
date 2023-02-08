import { storiesOf } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { keys } from 'ramda';
import { select } from '@storybook/addon-knobs/dist';
import FileUpload from './index';
import { FileStatus } from '../../constants/fileStatus';

const fileStatuses: Record<FileStatus, FileStatus> = keys(FileStatus).reduce(
  (acc, type) => ({ ...acc, [type]: type }),
  {} as Record<FileStatus, FileStatus>,
);

storiesOf('Basic', module).add('File Upload', () => {
  const onUpload = action('onUpload');
  const onClear = action('onClear');
  const fileStatus = select('File Status', fileStatuses, keys(fileStatuses)[0]);
  
  return (
    <div style={{ width: 600 }}>
      <FileUpload onUpload={onUpload} fileStatus={fileStatus} onClear={onClear} id="" />
    </div>
  );
});
