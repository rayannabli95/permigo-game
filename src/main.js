// ═══════════════════════════════════════════════════════════════
// PermiGo Game — entry point
// ═══════════════════════════════════════════════════════════════
import './styles/main.css';
import { restoreSession } from '@/auth/auth.js';
import { getCurUser } from '@/auth/cur-user.js';
import { route } from '@/router.js';
import { track } from '@/services/analytics.js';

const app = document.getElementById('app');

async function boot() {
  try {
    await restoreSession();
    const me = getCurUser();
    track('app.opened', { role: me?.role || 'guest' });

    if (!me) {
      const { mount } = await import('@/pages/auth/login.js');
      return mount(app);
    }

    route(app, me);
  } catch (e) {
    console.error('[boot]', e);
    app.innerHTML = `<div class="err">Erreur de chargement. Recharge la page.</div>`;
  }
}

boot();

// PWA service worker (production only)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
