const BASE = '/api';

function getSessionId(): string | null {
  return localStorage.getItem('pokemon_session_id');
}

export function setSessionId(id: string): void {
  localStorage.setItem('pokemon_session_id', id);
}

export function clearSessionId(): void {
  localStorage.removeItem('pokemon_session_id');
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const sid = getSessionId();
  if (sid) headers['X-Session-Id'] = sid;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error((data as { message?: string }).message || (data as { error?: string }).error || `HTTP ${res.status}`);
  }

  return res.json();
}

export const api = {
  get: <T>(path: string) => request<T>('GET', path),
  post: <T>(path: string, body?: unknown) => request<T>('POST', path, body),
};
