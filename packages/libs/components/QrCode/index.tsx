import React, { FC } from 'react';
import QRCode from 'qrcode.react';

interface Props {
  value: string
  bgColor?: string
  fgColor?: string
  size?: number
}

const QrCode: FC<Props> = ({
  value,
  bgColor = '#222638',
  fgColor = '#fff',
  size,
}) => (
  <QRCode value={value} bgColor={bgColor} fgColor={fgColor} size={size} />
);

export default QrCode;
