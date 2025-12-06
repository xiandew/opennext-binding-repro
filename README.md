# OpenNext Cloudflare Service Binding Reproduction

This repository reproduces an issue where `FormData` is serialized as `text/plain` when sent over a Service Binding in the local `next dev` environment using `@opennextjs/cloudflare`.

## Structure

- `apps/backend`: A standard Cloudflare Worker that logs the `Content-Type` of incoming requests.
  - **Port**: Configured to run on port `8788` (see `package.json`).
- `apps/frontend`: A Next.js app using `@opennextjs/cloudflare` that sends a `FormData` request to the backend via a Service Binding.

## Reproduction Steps

1.  Install dependencies:
    ```bash
    pnpm install
    ```

2.  Start the backend (in a separate terminal):
    ```bash
    cd apps/backend
    pnpm dev
    ```
    *Note: This starts the worker on port 8788.*

3.  Start the frontend in Dev mode:
    ```bash
    cd apps/frontend
    pnpm dev
    ```
    *Note: We use `pnpm dev` (Next.js dev server) to test the `initOpenNextCloudflareForDev` proxy behavior.*

4.  Open the frontend URL (usually http://localhost:3000).

5.  **Test Case 1: Service Binding (The Bug)**
    - Click "Trigger Binding Upload (Fails)".
    - **Expected**: Backend receives `multipart/form-data`.
    - **Actual**: Backend receives `text/plain;charset=UTF-8`.
    - *Diagnosis*: The `initOpenNextCloudflareForDev` proxy incorrectly serializes `FormData`.

6.  **Test Case 2: Direct HTTP (The Control)**
    - Click "Trigger Direct Upload (Succeeds)".
    - **Expected**: Backend receives `multipart/form-data`.
    - **Actual**: Backend receives `multipart/form-data`.
    - *Diagnosis*: Direct fetch to `http://127.0.0.1:8788` works correctly, proving the issue is isolated to the Service Binding proxy.

## Notes

This issue seems specific to the `initOpenNextCloudflareForDev` proxy in `@opennextjs/cloudflare` when running in `next dev`.
