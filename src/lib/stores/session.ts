import debug from "debug";
import { writable } from "svelte/store";

const log = debug("app:lib:stores:session");

interface Session {
	user?: User | null;
}
export const session = writable<Session>({ user: null });

session.subscribe((session) => log("session:", session));

export function setUser(user: User) {
	session.set({ user });
  }
  
export function updateUser(updates: Partial<User>) {
	session.update((current) => ({
		user: { ...current.user, ...updates } as User,
}));
  }
  
  export function clearUser() {
	session.set({ user: null });
  }