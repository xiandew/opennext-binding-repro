'use server';

import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function uploadFile() {
  const { env } = await getCloudflareContext();
  
  const fd = new FormData();
  fd.append('file', new File(['test content'], 'test.txt', { type: 'text/plain' }));

  console.log('Sending FormData via Service Binding...');
  
  try {
    const res = await env.BACKEND.fetch('http://internal/upload', {
      method: 'POST',
      body: fd,
    });
    
    const text = await res.text();
    console.log('Response status:', res.status);
    console.log('Response body:', text);
    return { status: res.status, body: text };
  } catch (e) {
    console.error('Error:', e);
    return { error: String(e) };
  }
}

export async function uploadFileDirect() {
  const fd = new FormData();
  fd.append('file', new File(['test content'], 'test.txt', { type: 'text/plain' }));

  console.log('Sending FormData via Direct HTTP (Bypass Binding)...');
  
  try {
    // Direct fetch to the backend worker (bypassing Service Binding)
    // Backend is configured to run on port 8788 in package.json
    const res = await fetch('http://127.0.0.1:8788/upload', {
      method: 'POST',
      body: fd,
    });
    
    const text = await res.text();
    console.log('Response status:', res.status);
    console.log('Response body:', text);
    return { status: res.status, body: text };
  } catch (e) {
    console.error('Error:', e);
    return { error: String(e) };
  }
}
