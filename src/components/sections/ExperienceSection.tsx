import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';

interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  type: string;
  achievements: string[];
  technologies: string[];
}

const experiences: Experience[] = [
  {
    company: 'BigMovies',
    role: 'Software Developer',
    duration: 'Dec 2023 – Present',
    location: 'Jaipur, India',
    type: 'Full-time',
    achievements: [
      'Developed a robust back-end system for cinema management using PHP and Laravel',
      'Built scalable REST APIs ensuring seamless communication between front-end and services',
      'Reduced system downtime by implementing comprehensive error handling, achieving 80% reduction',
      'Designed and optimized MySQL databases for over 6+ applications, improving query performance',
      'Collaborated with cross-functional teams to deliver high-quality software solutions',
    ],
    technologies: ['Laravel', 'PHP', 'MySQL', 'React', 'REST APIs', 'Redis'],
  },
  {
    company: 'PCPS (P.C. Parmar School)',
    role: 'Jr. Software Developer',
    duration: 'Dec 2022 – Dec 2023',
    location: 'Jaipur, India',
    type: 'Full-time',
    achievements: [
      'Developed web and mobile applications to enhance operational efficiency',
      'Automated deployment for PHP projects, streamlining CI/CD pipeline using GitHub Actions',
      'Built scalable backend APIs using Laravel, integrating with MySQL databases',
      'Collaborated with senior developers to deliver high-quality software solutions',
      'Implemented responsive UI components using modern JavaScript frameworks',
    ],
    technologies: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'GitHub Actions', 'Vue.js'],
  },
];

const ExperienceCard = ({ experience, index, isLast }: { experience: Experience; index: number; isLast: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative flex gap-6 md:gap-10"
    >
      {/* Timeline line and dot */}
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-primary neon-border flex-shrink-0" />
        {!isLast && (
          <div className="w-0.5 h-full bg-gradient-to-b from-primary/50 to-transparent min-h-[200px]" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-12">
        <div className="glass-card-hover p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold font-mono text-primary mb-1">
                {experience.company}
              </h3>
              <p className="text-lg text-foreground font-medium">{experience.role}</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/30">
              {experience.type}
            </span>
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              {experience.duration}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-secondary" />
              {experience.location}
            </div>
          </div>

          {/* Achievements */}
          <ul className="space-y-3 mb-6">
            {experience.achievements.map((achievement, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-3 text-sm text-muted-foreground"
              >
                <ChevronRight className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span>{achievement}</span>
              </motion.li>
            ))}
          </ul>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono rounded-full bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section-container relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Briefcase className="w-6 h-6 text-primary" />
            <span className="text-sm font-mono text-primary uppercase tracking-wider">
              Work History
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-mono mb-4">
            <span className="text-primary">&lt;</span>
            Experience
            <span className="text-primary">/&gt;</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My professional journey building scalable software solutions
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.company}
              experience={experience}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
