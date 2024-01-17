export function generateRandomString(length: number): string {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset.charAt(randomIndex);
  }

  return result;
}

export function generateRandomUnicodeString(length: number): string {
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomCodePoint = Math.floor(
      Math.random() * (0x10ffff - 0x20) + 0x20
    );
    result += String.fromCodePoint(randomCodePoint);
  }

  return result;
}
