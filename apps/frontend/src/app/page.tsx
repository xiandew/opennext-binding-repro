'use client';

import { useState } from 'react';
import { uploadFile, uploadFileDirect } from './actions';

export default function Home() {
  const [result, setResult] = useState<any>(null);

  return (
    <main style={{ padding: '20px' }}>
      <h1>Service Binding FormData Reproduction</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={async () => {
            const res = await uploadFile();
            setResult(res);
          }}
          style={{ padding: '10px 20px', fontSize: '16px' }}
        >
          Trigger Binding Upload (Fails)
        </button>
        <button 
          onClick={async () => {
            const res = await uploadFileDirect();
            setResult(res);
          }}
          style={{ padding: '10px 20px', fontSize: '16px' }}
        >
          Trigger Direct Upload (Succeeds)
        </button>
      </div>
      {result && (
        <pre style={{ marginTop: '20px', background: '#f0f0f0', padding: '10px' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}
