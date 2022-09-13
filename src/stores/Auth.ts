import { atom } from "nanostores";

export const auth = atom(false);

export function setAuth(value: boolean) {
	auth.set(value);
}
