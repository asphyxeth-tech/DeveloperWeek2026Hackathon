"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "soon" | "error";

export function UrlAnalyzeForm() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed || !/^https?:\/\/.+/i.test(trimmed)) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    window.setTimeout(() => setStatus("soon"), 500);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full" noValidate>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="Paste your Google Business Profile URL"
          className="flex-1 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-base text-[color:var(--foreground)] placeholder:text-[color:var(--muted)] transition focus:border-[color:var(--accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]/30"
          aria-label="Google Business Profile URL"
          autoComplete="off"
          required
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-lg bg-[color:var(--accent)] px-6 py-3 text-base font-semibold text-black transition hover:bg-[color:var(--accent-glow)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Scanning…" : "Scan for fraud signals"}
        </button>
      </div>
      <p className="mt-3 text-sm text-[color:var(--muted)]">
        Free analysis. No login. Public review data only.
      </p>
      {status === "soon" && (
        <div
          role="status"
          className="mt-5 rounded-lg border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/10 px-4 py-3 text-sm text-[color:var(--muted-strong)]"
        >
          <strong className="text-[color:var(--foreground)]">
            Analysis pipeline coming online.
          </strong>{" "}
          The Nimble scrape and Claude analysis layers are being connected for
          this hackathon submission. Watch{" "}
          <a
            href="https://github.com/asphyxeth-tech/DeveloperWeek2026Hackathon"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-[color:var(--accent)] underline-offset-2"
          >
            the GitHub repo
          </a>{" "}
          for live progress.
        </div>
      )}
      {status === "error" && (
        <div
          role="alert"
          className="mt-5 rounded-lg border border-[color:var(--danger)]/40 bg-[color:var(--danger)]/10 px-4 py-3 text-sm text-[color:var(--muted-strong)]"
        >
          That doesn&apos;t look like a URL. Paste a full link starting with{" "}
          <code className="font-mono">https://</code>.
        </div>
      )}
    </form>
  );
}
