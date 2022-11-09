import React, { useEffect, useState } from 'react';

export const getDevices = async (
  setter: React.Dispatch<React.SetStateAction<MediaDeviceInfo[]>>
) => {
  if (navigator && navigator?.mediaDevices?.enumerateDevices) {
    setter(
      (await navigator.mediaDevices?.enumerateDevices()).filter(
        ({ kind }) => kind === 'videoinput'
      )
    );
  }
};

export const useVideoDevices = () => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    getDevices(setDevices);
  }, []);

  return devices;
};
