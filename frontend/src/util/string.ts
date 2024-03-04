export function generateRandomPasscode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmopqrstuvwxyz0123456789';
    const length = 8;
    let passcode = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      passcode += characters.charAt(randomIndex);
    }
    return passcode;
  }