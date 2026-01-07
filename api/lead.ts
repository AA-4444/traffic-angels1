import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
	const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
	const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

	if (!BOT_TOKEN || !CHAT_ID) {
	  return res.status(500).json({ error: 'Missing env TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID' });
	}

	const { name, telegram, industry, project } = req.body || {};

	const text =
	  `NEW LEAD\n\n` +
	  `Name: ${name ?? '-'}\n` +
	  `Telegram: ${telegram ?? '-'}\n` +
	  `Industry: ${industry ?? '-'}\n` +
	  `Project: ${project ?? '-'}`;

	const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
	  method: 'POST',
	  headers: { 'Content-Type': 'application/json' },
	  body: JSON.stringify({ chat_id: CHAT_ID, text }),
	});

	const tgData = await tgRes.json();

	if (!tgData.ok) {
	  console.error('Telegram error:', tgData);
	  return res.status(500).json({ error: 'Telegram API error', tgData });
	}

	return res.status(200).json({ ok: true });
  } catch (e) {
	console.error(e);
	return res.status(500).json({ error: 'Internal error' });
  }
}