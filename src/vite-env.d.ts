/// <reference types="vite/client" />

declare module '*.yml' {
  const content: string;
  export default content;
}

declare module '*.css';

// Global for tests
declare const global: typeof globalThis;
