/**
 * Cloudflare Worker — Contact Form to Discord
 *
 * Deploy with: wrangler deploy
 * Required secrets: DISCORD_WEBHOOK_URL
 */

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default {
  async fetch(request: Request, env: { DISCORD_WEBHOOK_URL: string }): Promise<Response> {
    const DISCORD_WEBHOOK_URL = env.DISCORD_WEBHOOK_URL;
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const data: ContactFormData = await request.json();

      // Validate required fields
      if (!data.name || !data.email || !data.message) {
        return new Response(
          JSON.stringify({ error: 'Name, email, and message are required' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Sanitize inputs
      const sanitizedName = data.name.trim().slice(0, 100);
      const sanitizedEmail = data.email.trim().slice(0, 254);
      const sanitizedMessage = data.message.trim().slice(0, 2000);

      // Build Discord embed
      const discordBody = {
        embeds: [
          {
            title: 'Nuevo mensaje de contacto',
            color: 0x0a0a0a, // B&W theme
            fields: [
              {
                name: 'Nombre',
                value: sanitizedName,
                inline: true,
              },
              {
                name: 'Email',
                value: sanitizedEmail,
                inline: true,
              },
              {
                name: 'Mensaje',
                value: sanitizedMessage,
                inline: false,
              },
            ],
            footer: {
              text: 'Web Resume Contact Form',
            },
            timestamp: new Date().toISOString(),
          },
        ],
      };

      // Send to Discord
      const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discordBody),
      });

      if (!discordResponse.ok) {
        console.error('Discord webhook error:', await discordResponse.text());
        return new Response(
          JSON.stringify({ error: 'Failed to send message' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ success: true }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  },
};
