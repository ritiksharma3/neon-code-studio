import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, ArrowRight, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
  gradient: string;
  comingSoon?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    title: 'Building Scalable REST APIs with Laravel',
    excerpt: 'Best practices for designing and implementing high-performance APIs that can handle millions of requests.',
    category: 'Backend',
    date: 'Coming Soon',
    readTime: '8 min',
    tags: ['Laravel', 'API', 'Performance'],
    gradient: 'from-primary/20 to-secondary/20',
    comingSoon: true,
  },
  {
    title: 'React Native vs Flutter: 2024 Comparison',
    excerpt: 'An in-depth analysis of both frameworks based on my experience building production apps.',
    category: 'Mobile',
    date: 'Coming Soon',
    readTime: '12 min',
    tags: ['React Native', 'Flutter', 'Mobile'],
    gradient: 'from-secondary/20 to-accent/20',
    comingSoon: true,
  },
  {
    title: 'Machine Learning in Mobile Apps',
    excerpt: 'How I integrated TensorFlow into the Baby Cry Analyzer app to achieve 89% accuracy.',
    category: 'AI/ML',
    date: 'Coming Soon',
    readTime: '10 min',
    tags: ['TensorFlow', 'ML', 'Flutter'],
    gradient: 'from-accent/20 to-primary/20',
    comingSoon: true,
  },
];

const BlogCard = ({ post, index }: { post: BlogPost; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="glass-card-hover h-full flex flex-col overflow-hidden">
        {/* Header gradient */}
        <div className={`relative h-32 bg-gradient-to-br ${post.gradient}`}>
          {post.comingSoon && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
              <Badge variant="outline" className="border-primary text-primary animate-pulse">
                Coming Soon
              </Badge>
            </div>
          )}
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-primary/20 text-primary border-none">
              {post.category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col">
          <h3 className="text-lg font-bold font-mono mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/50">
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const BlogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="blog" className="section-container relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="text-sm font-mono text-primary uppercase tracking-wider">
              Insights
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-mono mb-4">
            <span className="text-primary">&lt;</span>
            Blog
            <span className="text-primary">/&gt;</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technical articles and insights from my development journey
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.title} post={post} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary/10"
          >
            View All Articles
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
