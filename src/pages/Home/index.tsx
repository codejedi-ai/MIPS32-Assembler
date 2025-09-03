export function Home() {
	return (
		<div class="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<section class="bg-gradient-to-br from-uw-blue to-blue-800 text-white">
				<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
					<div class="text-center">
						<h1 class="text-5xl md:text-7xl font-barlow-condensed font-bold mb-6">
							WARRIOR LIFE
							<span class="block text-uw-gold">HACKATHON 2024</span>
						</h1>
						<p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
							Build innovative solutions to enhance life at the University of Waterloo. 
							From study tools to community platforms - make campus life better for everyone.
						</p>
						<div class="flex flex-col sm:flex-row gap-4 justify-center">
							<a href="#register" class="bg-uw-gold text-uw-blue px-8 py-4 rounded-lg text-lg font-bold hover:bg-yellow-400 transition-colors">
								Register Now
							</a>
							<a href="#about" class="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-uw-blue transition-colors">
								Learn More
							</a>
						</div>
						<div class="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
							<div>
								<div class="text-3xl font-bold text-uw-gold">48</div>
								<div class="text-sm">Hours</div>
							</div>
							<div>
								<div class="text-3xl font-bold text-uw-gold">$10K</div>
								<div class="text-sm">In Prizes</div>
							</div>
							<div>
								<div class="text-3xl font-bold text-uw-gold">500+</div>
								<div class="text-sm">Students</div>
							</div>
							<div>
								<div class="text-3xl font-bold text-uw-gold">∞</div>
								<div class="text-sm">Possibilities</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* About Section */}
			<section id="about" class="py-20">
				<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div class="text-center mb-16">
						<h2 class="text-4xl md:text-5xl font-barlow-condensed font-bold text-uw-blue mb-6">
							About the Hackathon
						</h2>
						<p class="text-xl text-gray-600 max-w-3xl mx-auto">
							Warrior Life Hackathon is a 48-hour innovation marathon where Waterloo students 
							come together to solve real campus challenges and enhance university life.
						</p>
					</div>
					<div class="grid md:grid-cols-3 gap-8">
						<div class="text-center p-6 bg-white rounded-xl shadow-lg">
							<div class="text-4xl mb-4">🏫</div>
							<h3 class="text-xl font-bold text-uw-blue mb-4">Campus Life</h3>
							<p class="text-gray-600">
								Improve dining, housing, transportation, and social experiences on campus.
							</p>
						</div>
						<div class="text-center p-6 bg-white rounded-xl shadow-lg">
							<div class="text-4xl mb-4">📚</div>
							<h3 class="text-xl font-bold text-uw-blue mb-4">Academic Tools</h3>
							<p class="text-gray-600">
								Create better study tools, course management systems, and learning platforms.
							</p>
						</div>
						<div class="text-center p-6 bg-white rounded-xl shadow-lg">
							<div class="text-4xl mb-4">🔬</div>
							<h3 class="text-xl font-bold text-uw-blue mb-4">Research & Innovation</h3>
							<p class="text-gray-600">
								Develop tools to support research collaboration and knowledge sharing.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Challenges Section */}
			<section id="challenges" class="py-20 bg-gray-100">
				<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div class="text-center mb-16">
						<h2 class="text-4xl md:text-5xl font-barlow-condensed font-bold text-uw-blue mb-6">
							Challenge Categories
						</h2>
						<p class="text-xl text-gray-600 max-w-3xl mx-auto">
							Choose from these focus areas or create your own innovative solution
						</p>
					</div>
					<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						<div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
							<h3 class="text-lg font-bold text-uw-blue mb-3">🍽️ Dining & Food</h3>
							<p class="text-gray-600 text-sm">
								Meal planning, nutrition tracking, food waste reduction, dining hall optimization
							</p>
						</div>
						<div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
							<h3 class="text-lg font-bold text-uw-blue mb-3">🚌 Transportation</h3>
							<p class="text-gray-600 text-sm">
								Bus tracking, ride sharing, parking solutions, campus navigation
							</p>
						</div>
						<div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
							<h3 class="text-lg font-bold text-uw-blue mb-3">🤝 Community</h3>
							<p class="text-gray-600 text-sm">
								Student networking, event discovery, mentorship matching, clubs management
							</p>
						</div>
						<div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
							<h3 class="text-lg font-bold text-uw-blue mb-3">💰 Finance</h3>
							<p class="text-gray-600 text-sm">
								Budget tracking, textbook exchange, financial literacy, scholarship matching
							</p>
						</div>
						<div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
							<h3 class="text-lg font-bold text-uw-blue mb-3">🏠 Housing</h3>
							<p class="text-gray-600 text-sm">
								Roommate matching, subletting platforms, residence life improvement
							</p>
						</div>
						<div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
							<h3 class="text-lg font-bold text-uw-blue mb-3">💪 Wellness</h3>
							<p class="text-gray-600 text-sm">
								Mental health support, fitness tracking, study-life balance, stress management
							</p>
						</div>
						<div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
							<h3 class="text-lg font-bold text-uw-blue mb-3">📱 Campus Tech</h3>
							<p class="text-gray-600 text-sm">
								Course registration optimization, library systems, campus app integration
							</p>
						</div>
						<div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
							<h3 class="text-lg font-bold text-uw-blue mb-3">🌱 Sustainability</h3>
							<p class="text-gray-600 text-sm">
								Environmental impact tracking, green initiatives, waste reduction solutions
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Prizes Section */}
			<section id="prizes" class="py-20">
				<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div class="text-center mb-16">
						<h2 class="text-4xl md:text-5xl font-barlow-condensed font-bold text-uw-blue mb-6">
							Prizes & Recognition
						</h2>
						<p class="text-xl text-gray-600 max-w-3xl mx-auto">
							Compete for amazing prizes and the chance to see your solution implemented on campus
						</p>
					</div>
					<div class="grid md:grid-cols-3 gap-8">
						<div class="text-center p-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl shadow-lg">
							<div class="text-6xl mb-4">🥇</div>
							<h3 class="text-2xl font-bold text-uw-blue mb-4">First Place</h3>
							<div class="text-3xl font-bold text-uw-blue mb-2">$5,000</div>
							<p class="text-uw-blue">
								+ Implementation opportunity with UW
							</p>
						</div>
						<div class="text-center p-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl shadow-lg">
							<div class="text-6xl mb-4">🥈</div>
							<h3 class="text-2xl font-bold text-uw-blue mb-4">Second Place</h3>
							<div class="text-3xl font-bold text-uw-blue mb-2">$3,000</div>
							<p class="text-uw-blue">
								+ Mentorship program access
							</p>
						</div>
						<div class="text-center p-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl shadow-lg">
							<div class="text-6xl mb-4">🥉</div>
							<h3 class="text-2xl font-bold text-uw-blue mb-4">Third Place</h3>
							<div class="text-3xl font-bold text-uw-blue mb-2">$2,000</div>
							<p class="text-uw-blue">
								+ Tech resources and tools
							</p>
						</div>
					</div>
					<div class="mt-12 grid md:grid-cols-2 gap-8">
						<div class="text-center p-6 bg-white rounded-xl shadow-lg">
							<h3 class="text-xl font-bold text-uw-blue mb-4">🌟 People's Choice</h3>
							<p class="text-gray-600 mb-2">$1,000 + Campus showcase opportunity</p>
						</div>
						<div class="text-center p-6 bg-white rounded-xl shadow-lg">
							<h3 class="text-xl font-bold text-uw-blue mb-4">💡 Most Innovation</h3>
							<p class="text-gray-600 mb-2">$1,000 + Patent support resources</p>
						</div>
					</div>
				</div>
			</section>

			{/* Timeline Section */}
			<section id="timeline" class="py-20 bg-gray-100">
				<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div class="text-center mb-16">
						<h2 class="text-4xl md:text-5xl font-barlow-condensed font-bold text-uw-blue mb-6">
							Event Timeline
						</h2>
						<p class="text-xl text-gray-600">
							48 hours of innovation, collaboration, and creation
						</p>
					</div>
					<div class="max-w-4xl mx-auto">
						<div class="space-y-8">
							<div class="flex items-center">
								<div class="flex-shrink-0 w-24 text-right pr-4">
									<div class="text-sm font-semibold text-uw-blue">Fri 6PM</div>
								</div>
								<div class="flex-shrink-0 w-8 h-8 bg-uw-gold rounded-full flex items-center justify-center">
									<div class="w-3 h-3 bg-uw-blue rounded-full"></div>
								</div>
								<div class="flex-grow pl-4">
									<h3 class="text-lg font-bold text-uw-blue">Opening Ceremony</h3>
									<p class="text-gray-600">Welcome, team formation, challenge presentation</p>
								</div>
							</div>
							<div class="flex items-center">
								<div class="flex-shrink-0 w-24 text-right pr-4">
									<div class="text-sm font-semibold text-uw-blue">Fri 8PM</div>
								</div>
								<div class="flex-shrink-0 w-8 h-8 bg-uw-gold rounded-full flex items-center justify-center">
									<div class="w-3 h-3 bg-uw-blue rounded-full"></div>
								</div>
								<div class="flex-grow pl-4">
									<h3 class="text-lg font-bold text-uw-blue">Hacking Begins</h3>
									<p class="text-gray-600">Start building your solutions</p>
								</div>
							</div>
							<div class="flex items-center">
								<div class="flex-shrink-0 w-24 text-right pr-4">
									<div class="text-sm font-semibold text-uw-blue">Sat 12PM</div>
								</div>
								<div class="flex-shrink-0 w-8 h-8 bg-uw-gold rounded-full flex items-center justify-center">
									<div class="w-3 h-3 bg-uw-blue rounded-full"></div>
								</div>
								<div class="flex-grow pl-4">
									<h3 class="text-lg font-bold text-uw-blue">Mentor Check-ins</h3>
									<p class="text-gray-600">Get feedback and guidance from industry experts</p>
								</div>
							</div>
							<div class="flex items-center">
								<div class="flex-shrink-0 w-24 text-right pr-4">
									<div class="text-sm font-semibold text-uw-blue">Sat 6PM</div>
								</div>
								<div class="flex-shrink-0 w-8 h-8 bg-uw-gold rounded-full flex items-center justify-center">
									<div class="w-3 h-3 bg-uw-blue rounded-full"></div>
								</div>
								<div class="flex-grow pl-4">
									<h3 class="text-lg font-bold text-uw-blue">Deadline Approaches</h3>
									<p class="text-gray-600">Final 2 hours - polish and prepare presentations</p>
								</div>
							</div>
							<div class="flex items-center">
								<div class="flex-shrink-0 w-24 text-right pr-4">
									<div class="text-sm font-semibold text-uw-blue">Sun 8PM</div>
								</div>
								<div class="flex-shrink-0 w-8 h-8 bg-uw-gold rounded-full flex items-center justify-center">
									<div class="w-3 h-3 bg-uw-blue rounded-full"></div>
								</div>
								<div class="flex-grow pl-4">
									<h3 class="text-lg font-bold text-uw-blue">Presentations & Awards</h3>
									<p class="text-gray-600">Demo your solutions and celebrate achievements</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Registration Section */}
			<section id="register" class="py-20 bg-uw-blue text-white">
				<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 class="text-4xl md:text-5xl font-barlow-condensed font-bold mb-6">
						Ready to Make a Difference?
					</h2>
					<p class="text-xl mb-8">
						Join hundreds of Waterloo students in building the future of campus life
					</p>
					<div class="bg-white p-8 rounded-xl text-uw-blue">
						<h3 class="text-2xl font-bold mb-6">Registration Details</h3>
						<div class="grid md:grid-cols-2 gap-6 text-left mb-8">
							<div>
								<h4 class="font-semibold mb-2">📅 When</h4>
								<p class="text-gray-600">March 15-17, 2024</p>
							</div>
							<div>
								<h4 class="font-semibold mb-2">📍 Where</h4>
								<p class="text-gray-600">Engineering 7 & Davis Centre</p>
							</div>
							<div>
								<h4 class="font-semibold mb-2">💰 Cost</h4>
								<p class="text-gray-600">Free for all UW students</p>
							</div>
							<div>
								<h4 class="font-semibold mb-2">🥪 Included</h4>
								<p class="text-gray-600">Meals, snacks, swag, and workshops</p>
							</div>
						</div>
						<button class="bg-uw-gold text-uw-blue px-8 py-4 rounded-lg text-lg font-bold hover:bg-yellow-400 transition-colors">
							Register Now - It's Free!
						</button>
						<p class="text-sm text-gray-600 mt-4">
							Registration closes March 10th or when we reach capacity
						</p>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer class="bg-gray-900 text-white py-12">
				<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div class="grid md:grid-cols-3 gap-8">
						<div>
							<h3 class="text-xl font-bold mb-4">Warrior Life Hackathon</h3>
							<p class="text-gray-400">
								Building better solutions for University of Waterloo student life
							</p>
						</div>
						<div>
							<h3 class="text-xl font-bold mb-4">Contact</h3>
							<p class="text-gray-400">hackathon@uwaterloo.ca</p>
							<p class="text-gray-400">@WarriorLifeHack</p>
						</div>
						<div>
							<h3 class="text-xl font-bold mb-4">Sponsors</h3>
							<p class="text-gray-400">Interested in sponsoring? Contact us!</p>
						</div>
					</div>
					<div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
						<p>&copy; 2024 University of Waterloo. Made with ❤️ by students, for students.</p>
					</div>
				</div>
			</footer>
		</div>
	);
}