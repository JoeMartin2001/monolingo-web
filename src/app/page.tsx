export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Monolingo
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              How it Works
            </a>
            <a
              href="#community"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Community
            </a>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Sign In
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium mb-8">
            🌍 Join 50,000+ language learners worldwide
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Connect, Learn, and
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Grow Together
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Meet amazing people from around the world, practice languages with
            native speakers, and build lasting friendships through shared
            learning experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Start Your Journey
            </button>
            <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 text-lg font-semibold rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300">
              See How It Works
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full border-2 border-white dark:border-gray-900"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full border-2 border-white dark:border-gray-900"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full border-2 border-white dark:border-gray-900"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full border-2 border-white dark:border-gray-900"></div>
              </div>
              <span>Join thousands of active learners</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🗣️</span>
              <span>50+ languages supported</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span>4.9/5 average rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Real Stories from Real People
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See how Monolingo has transformed language learning for people
              around the world.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  S
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Sarah Chen
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Learning Spanish
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                &quot;I met my best friend Maria through Monolingo! We&apos;ve
                been practicing Spanish together for 6 months. The community
                here is incredible - it&apos;s like having a global
                family.&quot;
              </p>
              <div className="flex text-yellow-400 mt-4">⭐⭐⭐⭐⭐</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  A
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Ahmed Hassan
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Learning French
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                &quot;The group discussions with native speakers helped me gain
                confidence. I went from being shy to leading conversations in
                just 3 months!&quot;
              </p>
              <div className="flex text-yellow-400 mt-4">⭐⭐⭐⭐⭐</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  E
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Emma Rodriguez
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Learning Japanese
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                &quot;The AI tutors are amazing, but the real magic happens when
                you connect with people. I&apos;ve made friends from Tokyo to
                Osaka through this platform!&quot;
              </p>
              <div className="flex text-yellow-400 mt-4">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Where Connections Come to Life
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              More than just learning - build meaningful relationships while
              mastering new languages.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* AI Bots Feature */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-8 rounded-2xl border border-blue-200 dark:border-blue-800">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Smart AI Companions
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get 24/7 practice with AI tutors that understand your learning
                style, then connect with real people to apply what you&apos;ve
                learned.
              </p>
            </div>

            {/* Language Mates Feature */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-8 rounded-2xl border border-green-200 dark:border-green-800">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Find Your Language Soulmate
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with native speakers who share your interests. Build
                lasting friendships while practicing authentic conversations and
                cultural exchange.
              </p>
            </div>

            {/* Group Calls Feature */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-8 rounded-2xl border border-purple-200 dark:border-purple-800">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Join the Conversation
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Participate in lively group discussions with learners from
                around the world. Share stories, debate topics, and make new
                friends while improving your speaking skills.
              </p>
            </div>

            {/* Communities Feature */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-8 rounded-2xl border border-orange-200 dark:border-orange-800">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Your Global Family
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Become part of tight-knit communities where members support each
                other&apos;s journey. Share resources, celebrate milestones, and
                create lifelong bonds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Join a Thriving Global Community
            </h2>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Real people, real connections, real results.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-4xl font-bold text-white mb-2">50,000+</div>
              <div className="text-indigo-100">Active Learners</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-4xl font-bold text-white mb-2">150+</div>
              <div className="text-indigo-100">Countries</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-4xl font-bold text-white mb-2">1M+</div>
              <div className="text-indigo-100">Conversations</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-indigo-100">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="px-6 py-20 bg-gray-50 dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              How Monolingo Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get started in minutes and begin your language learning journey
              today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Choose Your Language
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Select from 20+ languages and set your learning goals. Our AI
                will create a personalized curriculum.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Connect & Practice
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Practice with AI tutors, find language partners, and join group
                discussions to accelerate your learning.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Join Communities
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Become part of active learning communities, share progress, and
                help others on their language journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Your Language Journey Starts Here
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join 50,000+ learners who are building friendships, mastering
            languages, and creating memories that last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Start Your Journey Free
            </button>
            <button className="px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white/10 transition-all duration-300">
              Meet the Community
            </button>
          </div>
          <div className="text-blue-100 text-sm">
            ✨ No credit card required • Join thousands of happy learners •
            Start connecting today
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className="text-2xl font-bold">Monolingo</span>
              </div>
              <p className="text-gray-400">
                The complete language learning platform that connects AI,
                community, and real-world practice.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Languages
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Forums
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Monolingo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
