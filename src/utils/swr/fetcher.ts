const fetcher = async (url: string) => {
  const res = await fetch(url);
  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(
      `Request failed (${res.status} ${res.statusText}) for ${url}. Response starts with: ${errorBody.slice(0, 120)}`
    );
  }

  if (!contentType.includes("application/json")) {
    const rawBody = await res.text();
    throw new Error(
      `Expected JSON from ${url}, got '${contentType || "unknown"}'. Response starts with: ${rawBody.slice(0, 120)}`
    );
  }

  return res.json();
};

export default fetcher;