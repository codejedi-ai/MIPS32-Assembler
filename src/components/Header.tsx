import { useLocation } from 'preact-iso';

export function Header() {
	const { url } = useLocation();

	return (
		<header class="bg-uw-blue shadow-lg">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between items-center py-4">
					<div class="flex items-center">
						<a href="/" class="text-white font-barlow-condensed text-2xl font-bold">
							🛡️ WARRIOR LIFE HACKATHON
						</a>
					</div>
					<nav class="hidden md:flex space-x-8">
						<a href="#about" class="text-white hover:text-uw-gold transition-colors">
							About
						</a>
						<a href="#challenges" class="text-white hover:text-uw-gold transition-colors">
							Challenges
						</a>
						<a href="#prizes" class="text-white hover:text-uw-gold transition-colors">
							Prizes
						</a>
						<a href="#timeline" class="text-white hover:text-uw-gold transition-colors">
							Timeline
						</a>
						<a href="#register" class="bg-uw-gold text-uw-blue px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
							Register
						</a>
					</nav>
					<div class="md:hidden">
						<button class="text-white">
							<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</header>
	);
}