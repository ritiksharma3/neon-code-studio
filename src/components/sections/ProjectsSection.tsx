import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Film, Baby, Heart, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Project {
  title: string;
  company: string;
  description: string;
  longDescription: string;
  techStack: string[];
  tags: string[];
  icon: React.ReactNode;
  achievements: string[];
  liveUrl?: string;
  githubUrl?: string;
  gradient: string;
}

const projects: Project[] = [
  {
    title: 'Cinema Operations System',
    company: 'BigMovies',
    description: 'Full-stack web application managing cinema operations including bookings, inventory, and scheduling.',
    longDescription: 'Developed comprehensive cinema management system with real-time booking, inventory tracking, and automated scheduling features.',
    techStack: ['Laravel', 'React', 'MySQL', 'Redis', 'REST API'],
    tags: ['Web App', 'SaaS', 'Enterprise'],
    icon: <Film className="w-8 h-8" />,
    achievements: [
      'Reduced system downtime by 80%',
      'Built scalable REST APIs',
      'Implemented real-time features',
    ],
    gradient: 'from-primary/20 to-secondary/20',
  },
  {
    title: 'Baby Cry Analyzer',
    company: 'Personal Project',
    description: 'AI-powered mobile app that analyzes baby cries to identify needs like hunger, discomfort, or tiredness.',
    longDescription: 'Machine learning application achieving 89% accuracy in classifying baby cry patterns using audio signal processing.',
    techStack: ['Flutter', 'Python', 'TensorFlow', 'Firebase', 'ML'],
    tags: ['Mobile App', 'AI/ML', 'Innovation'],
    icon: <Baby className="w-8 h-8" />,
    achievements: [
      '89% cry classification accuracy',
      'Real-time audio processing',
      'Cross-platform mobile app',
    ],
    gradient: 'from-secondary/20 to-accent/20',
  },
  {
    title: 'Partner PHR',
    company: 'Healthcare Platform',
    description: 'Secure Personal Health Records platform enabling patients and providers to manage medical data.',
    longDescription: 'HIPAA-compliant health records system with secure data sharing, appointment management, and health tracking.',
    techStack: ['React Native', 'Node.js', 'PostgreSQL', 'AWS'],
    tags: ['Healthcare', 'Mobile App', 'Security'],
    icon: <Heart className="w-8 h-8" />,
    achievements: [
      'HIPAA-compliant architecture',
      'Secure data encryption',
      'Multi-platform support',
    ],
    gradient: 'from-accent/20 to-primary/20',
  },
  {
    title: 'Academic Management System',
    company: 'PCPS',
    description: 'Comprehensive school management system for attendance, grades, and administrative tasks.',
    longDescription: 'Built end-to-end academic platform streamlining operations for educational institutions.',
    techStack: ['Laravel', 'Vue.js', 'MySQL', 'REST API'],
    tags: ['Web App', 'Education', 'Enterprise'],
    icon: <GraduationCap className="w-8 h-8" />,
    achievements: [
      'Automated attendance tracking',
      'Grade management system',
      'Parent portal integration',
    ],
    gradient: 'from-primary/20 to-accent/20',
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group"
    >
      <div className="glass-card-hover h-full flex flex-col overflow-hidden">
        {/* Header with gradient */}
        <div className={`relative p-6 bg-gradient-to-br ${project.gradient}`}>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 animate-pulse" />
          </div>
          <div className="relative flex items-start justify-between">
            <div className="p-3 rounded-xl bg-background/50 text-primary">
              {project.icon}
            </div>
            <Badge variant="outline" className="border-primary/50 text-primary">
              {project.company}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col">
          <h3 className="text-xl font-bold font-mono mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 flex-1">
            {project.description}
          </p>

          {/* Achievements */}
          <ul className="space-y-1 mb-4">
            {project.achievements.map((achievement, i) => (
              <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {achievement}
              </li>
            ))}
          </ul>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs bg-muted/50 hover:bg-primary/20 transition-colors"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-primary/80 font-mono"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-auto">
            <Button
              size="sm"
              className="flex-1 btn-glow bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-border hover:border-primary hover:text-primary"
            >
              <Github className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="section-container relative">
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
            Projects
            <span className="text-primary">/&gt;</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Featured projects that showcase my expertise in building scalable applications
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
