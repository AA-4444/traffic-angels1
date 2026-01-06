import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  index: number;
}

const ProjectCard = ({ title, category, image, index }: ProjectCardProps) => {
  return (
    <motion.div
      className="group relative cursor-pointer"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      data-cursor-hover
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-6">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
        
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-volt/0 flex items-center justify-center"
          whileHover={{ backgroundColor: 'hsl(68 100% 50% / 0.1)' }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-16 h-16 rounded-full bg-volt flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight className="w-6 h-6 text-background" />
          </motion.div>
        </motion.div>

        {/* Border Glow */}
        <motion.div
          className="absolute inset-0 border-2 border-volt/0 rounded-lg"
          whileHover={{ borderColor: 'hsl(68 100% 50% / 0.5)' }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content */}
      <div className="flex items-start justify-between">
        <div>
          <motion.h3
            className="text-2xl font-display font-semibold text-foreground group-hover:text-volt transition-colors duration-300"
          >
            {title}
          </motion.h3>
          <p className="text-muted-foreground mt-1">{category}</p>
        </div>
        <motion.span
          className="text-sm font-mono text-muted-foreground"
          whileHover={{ color: 'hsl(68 100% 50%)' }}
        >
          0{index + 1}
        </motion.span>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
