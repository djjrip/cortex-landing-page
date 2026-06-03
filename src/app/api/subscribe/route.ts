import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    console.log(`🚀 LEAD CAPTURED: ${email} just joined the waitlist!`);

    // In a production setup with a real Resend Key, we send an auto-responder
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Founder <founder@projectcortex.app>',
        to: email,
        subject: 'Welcome to the Project Cortex Waitlist',
        html: `
          <h2>You are on the list.</h2>
          <p>The current batch of Lifetime Licenses is sold out.</p>
          <p>We will email you the exact moment the next batch becomes available. Be ready, they sell out in minutes.</p>
          <p>- Jayson</p>
        `
      });
      console.log(`✅ Waitlist confirmation email sent to ${email}`);
    } else {
      console.log('⚠️ RESEND_API_KEY not set. Mocking email send.');
    }

    // Returning success triggers the green UI state on the frontend
    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Subscription Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
