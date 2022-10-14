import { atom } from 'nanostores';

export const isVisible = atom(false);
export const notificationText = atom('');

export function setVisible(value: boolean): void {
	isVisible.set(value);
}

export function setNotificationText(value: string): void {
	notificationText.set(value);
}

export function spawnNotification(value: string): void {
	notificationText.set(value);
	isVisible.set(true);
}
