export default {
	async fetch(request: Request, env: any, ctx: any): Promise<Response> {
		if (request.url.endsWith('/test')) {
			const fd = new FormData();
			fd.append('file', new File(['plain worker content'], 'plain.txt', { type: 'text/plain' }));

			console.log('[Frontend-Plain] Sending FormData via Service Binding...');

			try {
				const res = await env.BACKEND.fetch('http://internal/upload', {
					method: 'POST',
					body: fd,
				});

				const text = await res.text();
				return new Response(`Status: ${res.status}\nBody: ${text}`);
			} catch (e: any) {
				return new Response(`Error: ${e.message}`, { status: 500 });
			}
		}

		return new Response('Frontend Plain Worker. Go to /test to trigger binding.');
	},
};
