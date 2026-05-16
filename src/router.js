// ═══════════════════════════════════════════════════════════════
// Router minimal — route selon role + hash
// ═══════════════════════════════════════════════════════════════
const ROUTES = {
  eleve: {
    default: () => import('@/pages/eleve/accueil.js'),
    parcours: () => import('@/pages/eleve/parcours.js'),
    quiz: () => import('@/pages/eleve/quiz.js'),
    trophees: () => import('@/pages/eleve/trophees.js'),
    profil: () => import('@/pages/common/profil.js'),
  },
  enseignant: {
    default: () => import('@/pages/enseignant/aujourdhui.js'),
    eleves: () => import('@/pages/enseignant/mes-eleves.js'),
    livret: () => import('@/pages/enseignant/livret-remc.js'),
    profil: () => import('@/pages/common/profil.js'),
  },
  gerant: {
    default: () => import('@/pages/gerant/pulse.js'),
    equipe: () => import('@/pages/gerant/equipe.js'),
    eleves: () => import('@/pages/gerant/eleves.js'),
    profil: () => import('@/pages/common/profil.js'),
  },
};

export async function route(root, me) {
  const role = me.role || 'eleve';
  const map = ROUTES[role] || ROUTES.eleve;
  const hash = (location.hash || '').replace('#/', '').split('/')[0] || 'default';
  const loader = map[hash] || map.default;

  try {
    const mod = await loader();
    await mod.mount(root, me);
  } catch (e) {
    console.error('[router]', e);
    root.innerHTML = `<div class="err">Page introuvable.</div>`;
  }
}

window.addEventListener('hashchange', () => {
  import('@/auth/cur-user.js').then(({ getCurUser }) => {
    const me = getCurUser();
    if (me) route(document.getElementById('app'), me);
  });
});
