export type VoidFunction = () => void;

export function wait(seconds: number): Promise<void> {
  return new Promise((res) => {
    setTimeout(res, seconds * 1000);
  });
}

export function isDevelopment(): boolean {
  return process.env["NODE_ENV"] !== "production";
}
