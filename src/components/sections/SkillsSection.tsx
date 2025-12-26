import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Skill {
  name: string;
  level: number;
  years: string;
  color: string;
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'React / React Native', level: 85, years: '2+ yrs', color: 'var(--primary)' },
      { name: 'Flutter', level: 70, years: '1+ yr', color: 'var(--secondary)' },
      { name: 'Tailwind CSS', level: 90, years: '2+ yrs', color: 'var(--accent)' },
      { name: 'JavaScript/TS', level: 85, years: '3+ yrs', color: 'var(--primary)' },
    ],
  },
  {
    title: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'PHP / Laravel', level: 90, years: '3+ yrs', color: 'var(--secondary)' },
      { name: 'Node.js', level: 75, years: '2+ yrs', color: 'var(--accent)' },
      { name: 'Python', level: 65, years: '1+ yr', color: 'var(--primary)' },
      { name: 'REST APIs', level: 90, years: '3+ yrs', color: 'var(--secondary)' },
    ],
  },
  {
    title: 'Database',
    icon: '🗄️',
    skills: [
      { name: 'MySQL', level: 90, years: '3+ yrs', color: 'var(--primary)' },
      { name: 'PostgreSQL', level: 80, years: '2+ yrs', color: 'var(--accent)' },
      { name: 'Firebase', level: 75, years: '1+ yr', color: 'var(--secondary)' },
      { name: 'MongoDB', level: 65, years: '1+ yr', color: 'var(--primary)' },
    ],
  },
  {
    title: 'DevOps & Tools',
    icon: '🔧',
    skills: [
      { name: 'Git / GitHub', level: 85, years: '3+ yrs', color: 'var(--accent)' },
      { name: 'Docker', level: 70, years: '1+ yr', color: 'var(--primary)' },
      { name: 'CI/CD', level: 70, years: '1+ yr', color: 'var(--secondary)' },
      { name: 'AWS / Cloud', level: 60, years: '1+ yr', color: 'var(--accent)' },
    ],
  },
];

const SkillRing = ({ skill, index }: { skill: Skill; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (skill.level / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center gap-2"
    >
      <div className="relative w-24 h-24">
        <svg className="w-full h-full progress-ring" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="6"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={`hsl(${skill.color})`}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isInView ? strokeDashoffset : circumference}
            className="progress-ring-circle"
            style={{
              filter: `drop-shadow(0 0 6px hsl(${skill.color} / 0.5))`,
            }}
          />
        </svg>
        {/* Percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold font-mono">{skill.level}%</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium">{skill.name}</p>
        <p className="text-xs text-muted-foreground">{skill.years}</p>
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="section-container relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold font-mono mb-4">
            <span className="text-primary">&lt;</span>
            Skills
            <span className="text-primary">/&gt;</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.15 }}
              className="glass-card-hover p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-xl font-semibold font-mono text-primary">
                  {category.title}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <SkillRing key={skill.name} skill={skill} index={skillIndex} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
