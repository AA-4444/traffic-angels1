import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { news } from "@/data/news";
import CTASection from '@/components/CTASection';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
	opacity: 1,
	y: 0,
	transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};


export default function NewsPage() {
  return (
	<>
	  <Header />

	  {/* фикс-хедер отступ */}
	  <main className="pt-24 md:pt-28" style={{ backgroundColor: "hsl(var(--light))" }}>
		<section className="relative py-16 md:py-24">
		  <div className="container mx-auto px-6">
			{/* Header */}
			<motion.div
			  initial={{ opacity: 0, y: 26 }}
			  whileInView={{ opacity: 1, y: 0 }}
			  viewport={{ once: true, margin: "-120px" }}
			  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
			  className="max-w-3xl"
			>
			  <div className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
				News
			  </div>
			  <h2 className="mt-4 font-display font-bold text-3xl md:text-5xl lg:text-6xl text-foreground leading-tight">
				Updates & releases
			  </h2>
			</motion.div>

			{/* List */}
			<motion.div
			  className="mt-12 md:mt-14 space-y-6"
			  variants={container}
			  initial="hidden"
			  whileInView="show"
			  viewport={{ once: true, margin: "-120px" }}
			>
			  {news.map((n) => (
				<motion.article
				  key={n.id}
				  variants={item}
				  className="rounded-2xl border border-border overflow-hidden bg-white"
				>
				  {/* кликабельная обертка */}
				  <Link to={`/news/${n.id}`} className="block">
					<div className="grid grid-cols-1 md:grid-cols-12">
					  {n.image ? (
						<div className="md:col-span-4 h-56 md:h-full bg-black/5">
						  <img
							src={n.image}
							alt={n.title}
							className="w-full h-full object-cover"
							loading="lazy"
						  />
						</div>
					  ) : null}

					  <div className={`${n.image ? "md:col-span-8" : "md:col-span-12"} p-6 md:p-8`}>
						<div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
						  {n.date}
						</div>

						<h3 className="mt-3 font-display font-bold text-xl md:text-2xl text-foreground">
						  {n.title}
						</h3>

						<p className="mt-3 text-foreground/70 leading-relaxed">
						  {n.excerpt}
						</p>

						<div className="mt-5 font-mono text-xs uppercase tracking-widest text-foreground/60">
						  Read more →
						</div>
					  </div>
					</div>
				  </Link>
				</motion.article>
			  ))}
			</motion.div>
		  </div>
		</section>

		<CTASection />
	  </main>

	  <Footer />
	</>
  );
}