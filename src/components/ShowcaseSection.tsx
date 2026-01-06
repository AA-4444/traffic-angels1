import { motion } from 'framer-motion';

const showcaseItems = [
  {
    title: 'Nike Campaign',
    author: 'Brand Strategy',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop',
  },
  {
    title: 'Spotify Rebrand',
    author: 'Visual Identity',
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=600&h=400&fit=crop',
  },
  {
    title: 'Tesla Launch',
    author: 'Digital Campaign',
    image: 'https://images.unsplash.com/photo-1617704548623-340376564e68?w=600&h=400&fit=crop',
  },
  {
    title: 'Apple Watch',
    author: 'Product Marketing',
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&h=400&fit=crop',
  },
  {
    title: 'Airbnb Experience',
    author: 'Social Media',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop',
  },
  {
    title: 'Meta Ads',
    author: 'Performance',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const ShowcaseSection = () => {
  return (
    <section className="py-32 relative overflow-hidden" style={{ backgroundColor: 'hsl(var(--dark))' }}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-white">
            Featured <span className="text-primary">Work</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Campaigns that drove results and brands that became household names.
          </p>
        </motion.div>

        {/* Showcase Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {showcaseItems.map((item) => (
            <motion.div
              key={item.title}
              className="group relative aspect-[3/2] rounded-2xl overflow-hidden cursor-pointer"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              {/* Image */}
              <motion.img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6 }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
              >
                <h3 className="text-lg font-display font-semibold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-white/60">
                  by {item.author}
                </p>
              </motion.div>

              {/* Border glow */}
              <div className="absolute inset-0 rounded-2xl border border-primary/0 group-hover:border-primary/50 transition-colors duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:border-primary hover:text-primary transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Projects
            <span className="text-primary">→</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
