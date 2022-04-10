export const getTruncatedAddress = (
  address: string | undefined | null,
  length: number = 10
): string => {
  if (!address) {
    return '';
  }

  return `${address.slice(0, length)}...${address.slice(
    address.length - length
  )}`;
};
