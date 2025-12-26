import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Terminal as TerminalIcon, Circle } from 'lucide-react';

interface TerminalLine {
  type: 'command' | 'output' | 'comment';
  content: string;
  delay: number;
}

const terminalLines: TerminalLine[] = [
  { type: 'comment', content: '# Welcome to my terminal', delay: 0 },
  { type: 'command', content: '$ whoami', delay: 500 },
  { type: 'output', content: 'Ritik Sharma - Full-Stack Developer', delay: 1000 },
  { type: 'command', content: '$ cat skills.json', delay: 2000 },
  { type: 'output', content: '{\n  "frontend": ["React", "Flutter", "Tailwind"],\n  "backend": ["Laravel", "Node.js", "Python"],\n  "database": ["MySQL", "PostgreSQL", "Firebase"]\n}', delay: 2500 },
  { type: 'command', content: '$ experience --years', delay: 4000 },
  { type: 'output', content: '3+ years of building scalable applications', delay: 4500 },
  { type: 'command', content: '$ npm run hire-me', delay: 5500 },
  { type: 'output', content: '✓ Ready to build something amazing together!', delay: 6000 },
];

const TerminalSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    if (!isInView) return;

    const timeouts: NodeJS.Timeout[] = [];

    terminalLines.forEach((line, index) => {
      const timeout = setTimeout(() => {
        setVisibleLines(index + 1);
      }, line.delay);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [isInView]);

  return (
    <section className="section-container relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <TerminalIcon className="w-6 h-6 text-primary" />
            <span className="text-sm font-mono text-primary uppercase tracking-wider">
              Interactive
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-mono mb-4">
            <span className="text-primary">&lt;</span>
            Terminal
            <span className="text-primary">/&gt;</span>
          </h2>
        </motion.div>

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card overflow-hidden"
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-muted/30 border-b border-border">
            <div className="flex gap-2">
              <Circle className="w-3 h-3 fill-destructive text-destructive" />
              <Circle className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              <Circle className="w-3 h-3 fill-accent text-accent" />
            </div>
            <span className="flex-1 text-center text-sm text-muted-foreground font-mono">
              ritik@portfolio:~
            </span>
          </div>

          {/* Terminal Content */}
          <div className="p-6 font-mono text-sm min-h-[400px] bg-background/50">
            {terminalLines.slice(0, visibleLines).map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`mb-2 ${
                  line.type === 'comment'
                    ? 'text-muted-foreground italic'
                    : line.type === 'command'
                    ? 'text-accent'
                    : 'text-foreground'
                }`}
              >
                {line.type === 'output' && line.content.includes('{') ? (
                  <pre className="whitespace-pre-wrap text-secondary/80">
                    {line.content}
                  </pre>
                ) : line.type === 'output' && line.content.includes('✓') ? (
                  <span className="text-accent">{line.content}</span>
                ) : (
                  line.content
                )}
              </motion.div>
            ))}

            {/* Blinking cursor */}
            {visibleLines === terminalLines.length && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-block"
              >
                <span className="text-accent">$ </span>
                <span className="animate-blink text-primary">▊</span>
              </motion.span>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TerminalSection;
