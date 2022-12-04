import {
	Container,
} from '@mantine/core';

import {
	MantineProvider,
	ColorSchemeProvider,
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import Parent from './Parent';
import Tasks from './Tasks';

export default function App() {

	const toggleColorScheme = value =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	useHotkeys([['mod+J', () => toggleColorScheme()]]);
	const [colorScheme, setColorScheme] = useLocalStorage({
		key: 'mantine-color-scheme',
		defaultValue: 'light',
		getInitialValueInEffect: true,
	});

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}>
			<MantineProvider
				theme={{ colorScheme, defaultRadius: 'md' }}
				withGlobalStyles
				withNormalizeCSS>
				<div className='App'>

					<Container size={550} my={40}>

						<Tasks />
						<Parent />
					</Container>
				</div>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}
