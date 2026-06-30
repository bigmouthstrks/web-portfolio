import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const production = process.argv.includes('--production');

function loadEnv() {
  const env = { ...process.env };

  try {
    const dotenv = readFileSync(resolve(root, '.env'), 'utf8');
    for (const line of dotenv.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      if (env[key]) continue;
      env[key] = trimmed.slice(eq + 1).trim();
    }
  } catch {
    // No local .env — rely on process.env (e.g. Vercel build).
  }

  return env;
}

const env = loadEnv();
const content = `// Auto-generated — do not edit. Run \`npm run env\` to regenerate.

export const environment = {
  production: ${production},
  mailer: {
    apiKey: ${JSON.stringify(env['MAILER_API_KEY'] ?? '')},
    baseUrl: ${JSON.stringify(env['MAILER_BASE_URL'] ?? 'https://mailer.maberc.com')},
    contactToEmail: ${JSON.stringify(env['CONTACT_TO_EMAIL'] ?? '')},
  },
};
`;

writeFileSync(resolve(root, 'src/environments/environment.ts'), content);
console.log(`[env] Wrote src/environments/environment.ts (${production ? 'production' : 'development'})`);
