"use client";

// Client-side auth calls: login/register are POSTs with a real session to manage
// afterwards, so this stays separate from lib/api.ts (that file's apiFetch() is
// GET-only and relies on Next.js server-side `revalidate` caching, which doesn't
// apply to client-side POST requests or to storing a token in the browser).

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const SESSION_KEY = "md_session";

export type Session = {
  userId: string;
  companyId: string;
  email: string;
  firstName?: string;
  role?: string;
  accessToken: string;
  refreshToken: string;
};

export class AuthError extends Error {}

async function post<T>(path: string, body: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new AuthError(`Impossible de contacter le serveur (${API_BASE}). Le backend est-il demarre ?`);
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new AuthError(data.error || "Une erreur est survenue.");
  }
  return data as T;
}

function saveSession(session: Session) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
}

export async function login(email: string, password: string): Promise<Session> {
  const data = await post<{
    userId: string;
    companyId: string;
    email: string;
    firstName?: string;
    role?: string;
    accessToken?: string;
    refreshToken?: string;
    mfaRequired?: boolean;
    mfaToken?: string;
  }>("/api/auth/login", { email, password });

  if (data.mfaRequired) {
    // MFA isn't wired up in the UI yet - surface this clearly instead of
    // pretending login succeeded, since accessToken won't be present.
    throw new AuthError("La verification en deux etapes (MFA) n'est pas encore geree par cette interface.");
  }

  const session: Session = {
    userId: data.userId,
    companyId: data.companyId,
    email: data.email,
    firstName: data.firstName,
    role: data.role,
    accessToken: data.accessToken!,
    refreshToken: data.refreshToken!,
  };
  saveSession(session);
  return session;
}

export type RegisterInput = {
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  industry?: string;
  region?: string;
};

export async function register(input: RegisterInput): Promise<Session> {
  const data = await post<{
    userId: string;
    companyId: string;
    email: string;
    accessToken: string;
    refreshToken: string;
  }>("/api/auth/register", input);

  const session: Session = {
    userId: data.userId,
    companyId: data.companyId,
    email: data.email,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };
  saveSession(session);
  return session;
}

export type MeResponse = {
  user: { id: string; email: string; firstName: string; lastName: string; role: string };
  company: { id: string; name: string; subscription_status: string } | null;
};

// GET /api/auth/me - the session (localStorage) only holds what login/register
// returned at that moment (id, email, tokens). Anything else about the company -
// its real name, subscription status, etc. - has to come from this endpoint.
export async function getMe(): Promise<MeResponse> {
  const session = getSession();
  if (!session) throw new AuthError("Not logged in");

  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/auth/me`, {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    });
  } catch {
    throw new AuthError(`Impossible de contacter le serveur (${API_BASE}).`);
  }

  if (res.status === 401) {
    clearSession();
    throw new AuthError("Session expiree, veuillez vous reconnecter.");
  }
  if (!res.ok) {
    throw new AuthError("Impossible de charger le profil.");
  }
  return res.json();
}
