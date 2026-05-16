// ═══════════════════════════════════════════════════════════════
// Les 4 mondes PermiGo — mapping visuel des 4 compétences REMC
// ═══════════════════════════════════════════════════════════════
export const WORLDS = [
  {
    id: 1,
    code: 'campagne',
    nom: 'Campagne',
    titre: 'Maîtriser le véhicule',
    description: 'Les bases : démarrer, freiner, diriger.',
    couleur: '#10b981', // emerald
    emoji: '🌾',
    sousCompetences: 7, // C01.1 → C01.7
  },
  {
    id: 2,
    code: 'ville',
    nom: 'Ville',
    titre: 'Circuler en conditions normales',
    description: 'Intersections, ronds-points, partage de la route.',
    couleur: '#06b6d4', // cyan
    emoji: '🏙️',
    sousCompetences: 8, // C02.1 → C02.8
  },
  {
    id: 3,
    code: 'montagne',
    nom: 'Montagne',
    titre: 'Conditions difficiles',
    description: 'Autoroute, nuit, intempéries, dépassements.',
    couleur: '#8b5cf6', // violet
    emoji: '⛰️',
    sousCompetences: 8, // C03.1 → C03.8
  },
  {
    id: 4,
    code: 'sommet',
    nom: 'Sommet',
    titre: 'Conduite autonome & sûre',
    description: 'Voyage longue distance, éco-conduite, sécurité.',
    couleur: '#f59e0b', // amber
    emoji: '🏔️',
    sousCompetences: 8, // C04.1 → C04.8
  },
];

export function getWorld(id) {
  return WORLDS.find(w => w.id === id);
}
