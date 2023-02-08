import { DeviceUUID } from 'device-uuid';

export const getDeviceName = () => {
  const { browser, version, os } = new DeviceUUID().parse();
  return `${browser} ${version} ${os}`;
};

export const getDeviceUUID = () => new DeviceUUID().get();
