import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { zeitgeist } from './assets/constants';
import { cn } from './lib/utils';
import { Input } from './components/ui/input';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

function App() {
	const [internalQuery, setInternalQuery] = useState('');
	const [query, setQuery] = useSearchParams({
		q: '',
	});
	const parsedQuery = query.get('q') || '';

	// debounce
	useEffect(() => {
		const timeout = setTimeout(() => {
			if (internalQuery === '') {
				// remove query param from URL
				setQuery({});
				return;
			}

			setQuery(
				{ q: internalQuery },
				{
					replace: true,
				}
			);
		}, 300);

		return () => clearTimeout(timeout);
	}, [internalQuery]);

	return (
		<main className="space-y-4 lg:space-y-8 dark min-h-svh flex flex-col items-center lg:py-24 py-8 container px-4 md:px-8">
			<h1 className="mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-electric-lime-400">
				<div className="logo grid gap-[0.25em]">
					<span className="top">ZEITGEIST</span>
					<span className="bottom">ZEITGEIST</span>
				</div>
			</h1>

			<div className="w-full lg:w-1/2 relative">
				<Input
					className="pl-10"
					type="search"
					placeholder="Bussin"
					value={internalQuery}
					onChange={(e) => setInternalQuery(e.target.value)}
				/>

				<Search className="absolute top-1/2 left-2 transform -translate-y-1/2" />
			</div>

			<div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
				{zeitgeist
					.sort((a, b) => b.aura - a.aura)
					.filter(
						(item) =>
							item.name.toLowerCase().includes(parsedQuery.toLowerCase()) ||
							item.description.toLowerCase().includes(parsedQuery.toLowerCase())
					)
					.map((item) => (
						<Card key={item.name}>
							<CardHeader className="pb-4">
								<CardTitle className="flex gap-2 justify-between">
									{item.name} {item.hot && <span>🔥</span>}
								</CardTitle>
								<CardDescription
									className={cn(
										item.aura >= 0 ? 'text-electric-lime-400' : 'text-red-300'
									)}
								>
									{item.aura >= 0 ? '+' : ''}
									{item.aura} Aura points
								</CardDescription>
							</CardHeader>

							<CardContent>
								<p>{item.description}</p>
							</CardContent>
						</Card>
					))}
			</div>
		</main>
	);
}

export default App;
