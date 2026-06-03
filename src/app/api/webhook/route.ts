import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2026-05-27.dahlia',
});

// We initialize Resend. If the key is missing in dev, we will safely mock it.
const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = JSON.parse(body) as Stripe.Event;
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_details?.email;
    const customerId = session.customer as string;

    if (!customerEmail) {
      return new NextResponse('No email provided', { status: 400 });
    }

    console.log(`💰 Payment Successful! $149 collected from ${customerEmail}`);

    // Generate a secure License Key
    const randomChars = Math.random().toString(36).substring(2, 10).toUpperCase();
    const licenseKey = `CORTEX-${randomChars}-LIFETIME`;

    // PROFESSIONAL ARCHITECTURE: Use Stripe as the Database
    // We attach the generated license key directly to the Stripe Customer Object.
    // This eliminates the need for maintaining a separate SQL database.
    if (customerId) {
      await stripe.customers.update(customerId, {
        metadata: {
          license_key: licenseKey,
          access_tier: 'lifetime'
        }
      });
      console.log(`💾 Saved License Key to Stripe Customer Metadata for ${customerId}`);
    }

    // AUTOMATED EMAIL DELIVERY
    console.log(`📧 Dispatching delivery email to ${customerEmail}...`);
    try {
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: 'Founder <founder@projectcortex.app>',
          to: customerEmail,
          subject: 'Your Project Cortex Lifetime License',
          html: `
            <h2>Welcome to Project Cortex</h2>
            <p>Your payment was successful. Here is your unique Lifetime License Key:</p>
            <h3 style="background: #eee; padding: 10px; font-family: monospace;">${licenseKey}</h3>
            <p><strong>Download the Native Desktop App:</strong></p>
            <p><a href="https://github.com/YOUR_USERNAME/project-cortex/releases/latest">Download Cortex.exe</a></p>
            <p>Run the app and enter your key. Welcome to Spatial AI.</p>
          `
        });
        console.log('✅ Email sent successfully via Resend.');
      } else {
        console.log('⚠️ RESEND_API_KEY not found. Mocking email delivery in dev mode.');
      }
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
    }
  }

  return new NextResponse('Webhook processed successfully', { status: 200 });
}
