export enum FileStatus {
  New = 'New',
  Pending = 'Pending',
  Rejected = 'Rejected',
  Approved = 'Approved',
}

export const fileStatusNames: Record<FileStatus, string> = {
  [FileStatus.New]: 'New',
  [FileStatus.Pending]: 'Pending',
  [FileStatus.Rejected]: 'Rejected',
  [FileStatus.Approved]: 'Approved',
};
