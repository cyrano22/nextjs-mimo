import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Cette fonction s'exécutera pour chaque requête
  // Elle peut aider à déboguer et à résoudre certains problèmes
  return NextResponse.next();
}
