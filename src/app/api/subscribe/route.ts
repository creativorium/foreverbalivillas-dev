import { NextRequest, NextResponse } from 'next/server';

const API_KEY  = process.env.MAILCHIMP_API_KEY;
const LIST_ID  = process.env.MAILCHIMP_AUDIENCE_ID;
const SERVER   = process.env.MAILCHIMP_SERVER_PREFIX; // e.g. "us10"

export async function POST(req: NextRequest) {
  if (!API_KEY || !LIST_ID || !SERVER) {
    return NextResponse.json(
      { error: 'Newsletter not configured. Add MAILCHIMP_API_KEY, MAILCHIMP_AUDIENCE_ID, and MAILCHIMP_SERVER_PREFIX to Vercel environment variables.' },
      { status: 503 }
    );
  }

  const { email } = await req.json().catch(() => ({ email: '' }));
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required.' }, { status: 400 });
  }

  const res = await fetch(
    `https://${SERVER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`,
      },
      body: JSON.stringify({ email_address: email, status: 'subscribed' }),
    }
  );

  const data = await res.json();

  if (res.ok) {
    return NextResponse.json({ ok: true });
  }

  // Already subscribed — treat as success so user isn't confused
  if (data.title === 'Member Exists') {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json(
    { error: data.detail || 'Subscription failed. Please try again.' },
    { status: 400 }
  );
}
