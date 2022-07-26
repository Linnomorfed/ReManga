import Head from 'next/head';

import React, { FC } from 'react';

interface MetaHeadProps {
	title: string;
	description?: string;
}

export const MetaHead: FC<MetaHeadProps> = ({ title, description }) => {
	return (
		<Head>
			<title>{title}</title>
			<link rel="shortcut icon" href="../public/icon.png" type="image/png" />
			{description ? (
				<meta itemProp="description" name="description" content={description} />
			) : (
				<meta name="robots" content="noindex, nofollow" />
			)}
		</Head>
	);
};
