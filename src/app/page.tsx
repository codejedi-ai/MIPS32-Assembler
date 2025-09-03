import { Calendar, MapPin, Users, Trophy, Code, Lightbulb, Clock, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      {/* Navigation */}
      <nav className="bg-white border-b border-yellow-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Warrior Life</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-700 hover:text-yellow-600 transition-colors">About</a>
              <a href="#schedule" className="text-gray-700 hover:text-yellow-600 transition-colors">Schedule</a>
              <a href="#prizes" className="text-gray-700 hover:text-yellow-600 transition-colors">Prizes</a>
              <a href="#sponsors" className="text-gray-700 hover:text-yellow-600 transition-colors">Sponsors</a>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Calendar className="w-4 h-4 mr-2" />
              March 15-17, 2024 • University of Waterloo
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Warrior
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent"> Life</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              The ultimate hackathon celebrating student life at the University of Waterloo. 
              Build solutions that enhance the warrior experience on campus.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center">
                Register for Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="border-2 border-gray-300 hover:border-yellow-500 text-gray-700 hover:text-yellow-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all">
                View Schedule
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-gray-600">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-yellow-500" />
                <span>500+ Participants</span>
              </div>
              <div className="flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                <span>$50K in Prizes</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-yellow-500" />
                <span>48 Hours</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Warrior Life</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Celebrating the unique challenges, triumphs, and experiences of University of Waterloo students
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Build Solutions</h3>
              <p className="text-gray-600">
                Create innovative apps and tools that solve real problems faced by UWaterloo students daily.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect & Collaborate</h3>
              <p className="text-gray-600">
                Meet fellow warriors, form teams, and build lasting connections within the UW community.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Learn & Grow</h3>
              <p className="text-gray-600">
                Attend workshops, learn new technologies, and level up your skills with industry mentors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Tracks */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Challenge Tracks</h2>
            <p className="text-xl text-gray-600">Choose your battlefield and make an impact</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Campus Life", desc: "Improve daily campus experiences", color: "yellow" },
              { title: "Academic Tools", desc: "Enhance learning and productivity", color: "blue" },
              { title: "Mental Health", desc: "Support student wellbeing", color: "green" },
              { title: "Social Impact", desc: "Build community connections", color: "purple" }
            ].map((track, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className={`w-12 h-12 bg-${track.color}-500 rounded-lg flex items-center justify-center mb-4`}>
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{track.title}</h3>
                <p className="text-gray-600 text-sm">{track.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Event Schedule</h2>
            <p className="text-xl text-gray-600">48 hours of innovation, learning, and fun</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                { day: "Friday, March 15", events: [
                  { time: "6:00 PM", event: "Registration & Check-in", location: "SLC Great Hall" },
                  { time: "7:00 PM", event: "Opening Ceremony", location: "SLC Great Hall" },
                  { time: "8:00 PM", event: "Team Formation & Networking", location: "SLC Great Hall" },
                  { time: "9:00 PM", event: "Hacking Begins!", location: "Various Rooms" }
                ]},
                { day: "Saturday, March 16", events: [
                  { time: "8:00 AM", event: "Breakfast & Coffee", location: "SLC Food Court" },
                  { time: "10:00 AM", event: "Workshop: AI/ML Fundamentals", location: "MC 4045" },
                  { time: "2:00 PM", event: "Lunch & Sponsor Fair", location: "SLC Great Hall" },
                  { time: "6:00 PM", event: "Dinner & Mentorship", location: "SLC Food Court" },
                  { time: "11:00 PM", event: "Midnight Snacks", location: "SLC Food Court" }
                ]},
                { day: "Sunday, March 17", events: [
                  { time: "8:00 AM", event: "Breakfast", location: "SLC Food Court" },
                  { time: "12:00 PM", event: "Submission Deadline", location: "Online" },
                  { time: "1:00 PM", event: "Project Presentations", location: "SLC Great Hall" },
                  { time: "4:00 PM", event: "Judging & Awards", location: "SLC Great Hall" },
                  { time: "5:00 PM", event: "Closing Ceremony", location: "SLC Great Hall" }
                ]}
              ].map((day, dayIndex) => (
                <div key={dayIndex} className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{day.day}</h3>
                  <div className="space-y-3">
                    {day.events.map((event, eventIndex) => (
                      <div key={eventIndex} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                        <div className="flex items-center space-x-4">
                          <span className="text-yellow-600 font-medium w-20">{event.time}</span>
                          <span className="text-gray-900 font-medium">{event.event}</span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          {event.location}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section id="prizes" className="py-20 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Prizes & Recognition</h2>
            <p className="text-xl text-yellow-100">Compete for amazing prizes and recognition</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-colors">
              <div className="w-16 h-16 bg-yellow-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-8 h-8 text-yellow-700" />
              </div>
              <h3 className="text-2xl font-bold mb-2">1st Place</h3>
              <p className="text-3xl font-bold text-yellow-200 mb-4">$5,000</p>
              <p className="text-yellow-100">Plus mentorship opportunities and internship fast-track</p>
            </div>
            
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-colors">
              <div className="w-16 h-16 bg-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-8 h-8 text-gray-700" />
              </div>
              <h3 className="text-2xl font-bold mb-2">2nd Place</h3>
              <p className="text-3xl font-bold text-yellow-200 mb-4">$3,000</p>
              <p className="text-yellow-100">Plus tech gear and startup resources</p>
            </div>
            
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-colors">
              <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">3rd Place</h3>
              <p className="text-3xl font-bold text-yellow-200 mb-4">$2,000</p>
              <p className="text-yellow-100">Plus exclusive UW merchandise and recognition</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-yellow-100 text-lg">
              Additional prizes for Best Design, Most Innovative, and People's Choice awards
            </p>
          </div>
        </div>
      </section>

      {/* Location & Logistics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Join Us at UWaterloo</h2>
              <p className="text-xl text-gray-600 mb-8">
                Experience the energy of innovation right in the heart of Canada's tech capital. 
                The University of Waterloo campus provides the perfect backdrop for 48 hours of intense creativity.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Student Life Centre</h3>
                    <p className="text-gray-600">200 University Ave W, Waterloo, ON</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">48-Hour Format</h3>
                    <p className="text-gray-600">Friday 6PM - Sunday 5PM</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Team Size</h3>
                    <p className="text-gray-600">1-4 members per team</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg font-medium">Interactive Campus Map</p>
                <p className="text-sm">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Join the Warriors?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Don't miss out on the biggest student life hackathon at University of Waterloo. 
            Register now and be part of something extraordinary.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
              Register Now - Free
            </button>
            <button className="border-2 border-white/30 hover:border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all">
              Join Discord Community
            </button>
          </div>
          
          <p className="text-gray-400 mt-8">
            Questions? Email us at <a href="mailto:hello@warriorlife.ca" className="text-yellow-400 hover:underline">hello@warriorlife.ca</a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Warrior Life</span>
            </div>
            
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Warrior Life Hackathon. Made with ❤️ at University of Waterloo.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}