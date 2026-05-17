const URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://nasgorcok.onrender.com";

async function selfPing() {
  try {
    const res = await fetch(URL);

    console.log(
      `[SELF PING] ${res.status} ${new Date().toISOString()}`
    );
  } catch (err) {
    console.error("[SELF PING ERROR]", err);
  }
}

declare global {
  var __SELF_PING__: boolean | undefined;
}

export {};

if (
  process.env.NODE_ENV === "production" &&
  !(globalThis as any).__SELF_PING__
) {
  (globalThis as any).__SELF_PING__ = true;

  selfPing();

  setInterval(() => {
    selfPing();
  }, 5 * 60 * 1000); // 5 menit
}
