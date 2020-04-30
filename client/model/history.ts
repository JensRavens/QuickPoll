import { createBrowserHistory } from "history";
export const history = createBrowserHistory();

export function lobbyPath(): string {
  return `/`;
}

export function roomPath({ id }: { id: string }): string {
  return `/${id}`;
}
