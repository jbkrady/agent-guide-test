// Relais vers la routine : l'URL et le jeton viennent des variables
// d'environnement Vercel (ROUTINE_URL, ROUTINE_TOKEN), jamais de la page.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ erreur: 'Méthode non autorisée' });
  }

  const { ROUTINE_URL, ROUTINE_TOKEN } = process.env;
  if (!ROUTINE_URL || !ROUTINE_TOKEN) {
    return res.status(500).json({ erreur: 'Routine non configurée côté serveur' });
  }

  const sujet = typeof req.body?.sujet === 'string' ? req.body.sujet.trim() : '';
  if (!sujet || sujet.length > 500) {
    return res.status(400).json({ erreur: 'Sujet manquant ou trop long' });
  }

  try {
    const rep = await fetch(ROUTINE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ROUTINE_TOKEN}`,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'experimental-cc-routine-2026-04-01'
      },
      body: JSON.stringify({ text: sujet })
    });
    const data = await rep.json().catch(() => ({}));
    if (!rep.ok) {
      return res.status(502).json({ erreur: `La routine a répondu ${rep.status}` });
    }
    return res.status(200).json({ ok: true, url: data.claude_code_session_url });
  } catch {
    return res.status(502).json({ erreur: 'Routine injoignable' });
  }
}
