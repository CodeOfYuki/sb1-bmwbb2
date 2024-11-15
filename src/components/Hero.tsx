import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import WordRotator from './WordRotator';
import RainbowButton from './RainbowButton';

export default function Hero() {
  const scrollToHowItWorks = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const section = document.getElementById('how-it-works');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="home" className="relative isolate overflow-hidden bg-[#8D75E6] min-h-screen flex items-center">
      {/* Grid Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <div className="grid grid-cols-6 h-full">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border-l border-gray-300/30 h-full">
              {[...Array(6)].map((_, j) => (
                <div key={j} className="border-t border-gray-300/30 h-[calc(100%/6)]" />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20 lg:flex lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8"
        >
          <h1 className="text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-bold tracking-tight text-white leading-[1.15]">
            Revolutionize Your{' '}
            <span className="inline-block">
              <WordRotator words={['Job', 'Internship', 'Apprenticeship']} />
            </span>{' '}
            Search with AI
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white/90">
            Send <span className="font-bold">Hundreds of Personalized Applications</span> in Minutes
          </p>
          <div className="mt-6 sm:mt-8 flex items-center gap-x-4 sm:gap-x-6">
            <RainbowButton to="/signup" className="text-sm sm:text-base whitespace-nowrap">
              TRY FOR FREE
            </RainbowButton>
            <a 
              href="#how-it-works" 
              onClick={scrollToHowItWorks}
              className="text-sm sm:text-base font-semibold leading-6 text-white hover:text-white/80 transition-colors whitespace-nowrap"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-8 sm:mt-12 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none xl:ml-32"
        >
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <img
              src="/images/hero-illustration.png"
              alt="Dashboard preview"
              className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}