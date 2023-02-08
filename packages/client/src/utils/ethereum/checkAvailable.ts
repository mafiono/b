export const checkAvailable = () => {
  const { ethereum } = (window as any);

  return ethereum && ethereum.isMetaMask;
};
