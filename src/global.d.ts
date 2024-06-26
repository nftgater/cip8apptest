export {};

declare global {
  interface Window {
    cardano: {
      nami: {
        enable: () => Promise<any>; // Replace `any` with the correct type if available
      };
    };
  }
}
