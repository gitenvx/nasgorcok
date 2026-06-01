import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const repo = "gitenvx/nasgorcok"; // Private repository

    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Nasgorcok-App'
    };

    // Gunakan token dari environment variable jika tersedia
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (!token) {
      console.warn("GITHUB_TOKEN is missing in environment variables!");
    }

    const res = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`, {
      headers,
      cache: 'no-store' // Matikan cache sementara biar langsung nyedot data baru
    });

    if (!res.ok) {
      console.error(`GitHub API Error: ${res.status} ${res.statusText}`);
      return NextResponse.json({ error: 'Failed to fetch commits from GitHub' }, { status: res.status });
    }

    const data = await res.json();
    
    // Pastikan data yang dikembalikan ada isinya
    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'No commits found' }, { status: 404 });
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
