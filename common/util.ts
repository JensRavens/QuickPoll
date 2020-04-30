export type VoidFunction = () => void;

export function wait(seconds: number): Promise<void> {
  return new Promise((res) => {
    setTimeout(res, seconds * 1000);
  });
}

export function isDevelopment(): boolean {
  return process.env["NODE_ENV"] !== "production";
}

export function guid(): string {
  function s4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return [s4() + s4(), s4(), s4(), s4(), s4() + s4() + s4()].join("-");
}
