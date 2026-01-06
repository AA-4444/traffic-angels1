import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { news } from "@/data/news";

export default function NewsArticlePage() {
  const { id } = useParams<{ id: string }>();

  const post = useMemo(() => news.find((n) => n.id === id), [id]);

  // простая SEO-база: title + description
  useEffect(() => {
	if (!post) return;
	document.title = `${post.title} — VOLT`;

	const meta = document.querySelector('meta[name="description"]');
	if (meta) meta.setAttribute("content", post.excerpt);
  }, [post]);

  if (!post) {
	return (
	  <>
		<Header />
		<main className="pt-24 md:pt-28" style={{ backgroundColor: "hsl(var(--light))" }}>
		  <div className="container mx-auto px-6 py-16">
			<div className="font-display font-bold text-2xl text-foreground">Post not found</div>
			<Link to="/news" className="mt-4 inline-block font-mono text-sm underline">
			  Back to News
			</Link>
		  </div>
		</main>
		<Footer />
	  </>
	);
  }

  return (
	<>
	  <Header />

	  <main className="pt-24 md:pt-28" style={{ backgroundColor: "hsl(var(--light))" }}>
		<article className="py-16 md:py-24">
		  <div className="container mx-auto px-6 max-w-4xl">
			<Link to="/news" className="font-mono text-xs uppercase tracking-widest text-foreground/60 hover:text-foreground">
			  ← Back to News
			</Link>

			<div className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
			  {post.date}
			</div>

			<h1 className="mt-4 font-display font-bold text-3xl md:text-5xl text-foreground leading-tight">
			  {post.title}
			</h1>

			{post.image ? (
			  <div className="mt-10 rounded-2xl overflow-hidden border border-border bg-black/5">
				<img src={post.image} alt={post.title} className="w-full h-[320px] md:h-[420px] object-cover" />
			  </div>
			) : null}

			<div className="mt-10 text-foreground/80 leading-relaxed whitespace-pre-line">
			  {post.content}
			</div>
		  </div>
		</article>
	  </main>

	  <Footer />
	</>
  );
}