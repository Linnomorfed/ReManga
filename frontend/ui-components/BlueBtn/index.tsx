import classNames from 'classnames';
import React from 'react';

import styles from './BlueBtn.module.scss';

interface BlueBtnProps {
	children: React.ReactChild | React.ReactNode;
	type?: 'default' | 'manga';
	disabled?: boolean;
	color?: 'default' | 'white';
	size?: 'sm' | 'normal';
	onClick?: () => void;
}

export const BlueBtn: React.FC<BlueBtnProps> = React.memo(
	({
		children,
		type = 'default',
		disabled = false,
		size = 'normal',
		color = 'default',
		onClick,
	}) => {
		return (
			<button
				disabled={disabled}
				onClick={onClick}
				className={classNames(
					styles.btn,
					`${type === 'manga' ? styles.btnManga : ''}`,
					`${color === 'white' ? styles.btnWhite : ''}`,
					`${size === 'sm' ? styles.btnSm : ''}`
				)}
			>
				{children}
			</button>
		);
	}
);

BlueBtn.displayName = 'BlueBtn';
