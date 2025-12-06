export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const contentType = request.headers.get("content-type") || "missing";
    console.log(`[Backend] Received request. Content-Type: ${contentType}`);

    if (request.method === "POST") {
      try {
        if (!contentType.includes("multipart/form-data")) {
           return new Response(`Error: Expected multipart/form-data, got ${contentType}`, { status: 400 });
        }

        const formData = await request.formData();
        const file = formData.get("file");
        
        if (file instanceof File) {
            return new Response(`Success: Received file "${file.name}" with size ${file.size} and type ${file.type}`);
        } else {
            return new Response(`Error: 'file' field missing or not a File. Received: ${file}`, { status: 400 });
        }
      } catch (e: any) {
        console.error("[Backend] Error reading body:", e);
        return new Response(`Backend Error: ${e.message}`, { status: 500 });
      }
    }

    return new Response("Backend received request");
  }
}
