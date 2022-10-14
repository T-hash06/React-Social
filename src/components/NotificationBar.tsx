import '../styles/ui/NotificationBar.css';

import { IoMdClose } from 'react-icons/io';
import { useStore } from '@nanostores/react';
import { isVisible, notificationText, setVisible } from '../stores/Notification';

import classNames from 'classnames';

export default function NotificationBar(): JSX.Element {
	const visible = useStore(isVisible);
	const text = useStore(notificationText);

	const handleClose = (): void => {
		setVisible(false);
	};

	return (
		<>
			<div
				className={classNames('notification-bar', {
					visible,
				})}
			>
				<p className='notification-text'>{text}</p>
				<button className='close-notification' onClick={handleClose}>
					<IoMdClose></IoMdClose>
				</button>
			</div>
		</>
	);
}
