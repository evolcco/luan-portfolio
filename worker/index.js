const FILE_EXTENSION = /\.[a-z0-9]+$/i;

function assetRequest(request, pathname) {
  const url = new URL(request.url);
  url.pathname = pathname;
  return new Request(url, request);
}

async function fetchFirstAsset(request, env, paths) {
  for (const path of paths) {
    const response = await env.ASSETS.fetch(assetRequest(request, path));
    if (response.status !== 404) return response;
  }
  return null;
}

const worker = {
  async fetch(request, env) {
    if (!env.ASSETS?.fetch) {
      return new Response("Asset binding unavailable", { status: 500 });
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", {
        status: 405,
        headers: { allow: "GET, HEAD" },
      });
    }

    const direct = await env.ASSETS.fetch(request);
    if (direct.status !== 404) return direct;

    const url = new URL(request.url);
    const pathname = url.pathname;
    const candidates = [];

    if (pathname === "/") {
      candidates.push("/index.html");
    } else if (!FILE_EXTENSION.test(pathname)) {
      const base = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
      candidates.push(`${base}/index.html`, `${base}.html`);
    }

    const page = await fetchFirstAsset(request, env, candidates);
    if (page) return page;

    const notFound = await fetchFirstAsset(request, env, ["/404.html", "/_not-found/index.html"]);
    if (!notFound) return direct;

    return new Response(request.method === "HEAD" ? null : notFound.body, {
      status: 404,
      headers: notFound.headers,
    });
  },
};

export default worker;
