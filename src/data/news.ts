export type NewsItem = {
  id: string;          // "1"
  date: string;        // "2026-01-05"
  title: string;
  excerpt: string;
  content: string;
  image?: string;      // "/news/1.jpg"
};

export const news: NewsItem[] = [
  {
	id: "1",
	date: "2026-01-05",
	title: "We launched VOLT News",
	excerpt: "Short update text here. Add a new object to this array — and a new post appears automatically.",
	content:
	  "Full article text here.\n\nYou can write multiple paragraphs. This is the detailed page content.",
	image: "/news/1.jpg",
  },
  {
	id: "2",
	date: "2026-01-02",
	title: "New case study published",
	excerpt: "Another update. No slugs required — we use id routes.",
	content:
	  "Full article text here.\n\nAdd any long content, links, etc.",
	image: "/news/2.jpg",
  },
];