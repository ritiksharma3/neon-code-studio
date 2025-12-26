import { motion } from 'framer-motion';
import { ArrowDown, Download, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TypingEffect from '@/components/TypingEffect';

const HeroSection = () => {
  const techStack = ['React', 'Laravel', 'Node.js', 'Flutter', 'Python', 'System Design'];

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />
      
      {/* Cyber grid background */}
      <div 
        className="absolute inset-0 opacity-20 z-0"
        style={{
          backgroundImage: 'linear-gradient(hsl(187 100% 45% / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(187 100% 45% / 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
        >
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Jaipur, India</span>
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold font-mono mb-4"
        >
          <span className="gradient-text">Ritik Sharma</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl text-muted-foreground mb-6"
        >
          Full-Stack Developer <span className="text-primary">|</span> System Architect{' '}
          <span className="text-primary">|</span> Problem Solver
        </motion.p>

        {/* Typing effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-12 flex items-center justify-center mb-10"
        >
          <span className="text-lg sm:text-xl font-mono text-primary">
            {'<'}
            <TypingEffect words={techStack} className="text-foreground" />
            {' />'}
          </span>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8 mb-10"
        >
          {[
            { value: '3+', label: 'Years Experience' },
            { value: '20+', label: 'Projects Delivered' },
            { value: '5+', label: 'Tech Stacks' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary neon-glow">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button
            onClick={scrollToProjects}
            className="btn-glow bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold"
          >
            View Projects
            <ArrowDown className="ml-2 w-5 h-5" />
          </Button>
          <Button
            onClick={scrollToContact}
            variant="outline"
            className="btn-glow border-primary/50 text-primary hover:bg-primary/10 px-8 py-6 text-lg font-semibold"
          >
            <Mail className="mr-2 w-5 h-5" />
            Hire Me
          </Button>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground px-8 py-6 text-lg"
            asChild
          >
            <a href="/resume.pdf" download>
              <Download className="mr-2 w-5 h-5" />
              Resume
            </a>
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
