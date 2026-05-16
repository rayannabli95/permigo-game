// ═══════════════════════════════════════════════════════════════
// Enseignant — Valider une compétence pour un élève
// 1. Sélection élève → 2. Sélection compétence → 3. Validation
// 4. Trigger automatique du post-validation quiz côté élève (push notif)
// ═══════════════════════════════════════════════════════════════
import { sb } from '@/auth/auth.js';
import { getCurUser } from '@/auth/cur-user.js';
import { toast } from '@/components/toast.js';
import { esc } from '@/utils/escape.js';
import { track } from '@/services/analytics.js';

export async function mount(root) {
  const me = getCurUser();
  if (!me) return;

  root.innerHTML = `<div class="skel-page anim-slide-up"></div>`;

  // Fetch élèves de l'enseignant + compétences
  const [elevesRes, compRes] = await Promise.all([
    sb.from('profiles').select('id, prenom, nom, avatar_url').eq('enseignant_id', me.id).eq('role', 'eleve'),
    sb.from('competences_remc').select('*').order('ordre'),
  ]);

  if (elevesRes.error || compRes.error) {
    toast('Erreur de chargement', 'error');
    return;
  }

  const eleves = elevesRes.data || [];
  const competences = compRes.data || [];

  let selectedEleveId = null;
  let selectedCompId = null;

  root.innerHTML = render(me, eleves, competences);
  wire(root, eleves, competences);

  function wire(root, eleves, competences) {
    // Pick élève
    root.querySelectorAll('.eleve-card').forEach(c => {
      c.addEventListener('click', () => {
        root.querySelectorAll('.eleve-card').forEach(x => x.classList.remove('selected'));
        c.classList.add('selected');
        selectedEleveId = c.dataset.id;
        root.querySelector('.step-2').classList.add('active');
      });
    });

    // Pick competence
    root.querySelectorAll('.comp-card').forEach(c => {
      c.addEventListener('click', () => {
        root.querySelectorAll('.comp-card').forEach(x => x.classList.remove('selected'));
        c.classList.add('selected');
        selectedCompId = c.dataset.id;
        root.querySelector('.btn-validate').disabled = false;
      });
    });

    // Valider
    root.querySelector('.btn-validate').addEventListener('click', async () => {
      if (!selectedEleveId || !selectedCompId) return;
      const btn = root.querySelector('.btn-validate');
      btn.disabled = true;
      btn.textContent = 'Validation…';

      const { error } = await sb.from('validations').insert({
        eleve_id: selectedEleveId,
        enseignant_id: me.id,
        competence_id: selectedCompId,
        valide_le: new Date().toISOString(),
        // consolidation_due_le sera set par trigger DB +48h
      });

      if (error) {
        toast('Erreur', 'error');
        btn.disabled = false;
        btn.textContent = 'Valider';
        return;
      }

      track('competence.validated', {
        competence_id: selectedCompId,
        eleve_id: selectedEleveId,
      });

      // Notif push côté élève → post-validation quiz dans 30s
      await sb.from('notifications').insert({
        user_id: selectedEleveId,
        type: 'post_validation_quiz',
        payload: { competence_id: selectedCompId },
        scheduled_for: new Date(Date.now() + 30 * 1000).toISOString(),
      });

      toast('✅ Compétence validée', 'success');
      // Reset
      setTimeout(() => mount(root), 800);
    });
  }
}

function render(me, eleves, competences) {
  return `
    <style>
      .val-page{padding:20px 16px 100px;max-width:560px;margin:0 auto}
      .val-h1{font:800 26px/1.2 'Plus Jakarta Sans';margin:0 0 4px;color:#fff}
      .val-sub{font:500 14px/1.4 'Inter';color:#94a3b8;margin:0 0 24px}
      .step{margin-bottom:28px;opacity:.4;pointer-events:none;transition:opacity .3s}
      .step.active,.step:first-child{opacity:1;pointer-events:auto}
      .step-label{font:700 12px/1 'IBM Plex Mono';letter-spacing:.1em;color:#6366f1;text-transform:uppercase;margin-bottom:10px}
      .step-title{font:700 17px/1.3 'Plus Jakarta Sans';color:#fff;margin:0 0 14px}

      .eleves-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:10px}
      .eleve-card{padding:14px 10px;background:rgba(99,102,241,.08);border:1.5px solid rgba(99,102,241,.2);border-radius:14px;cursor:pointer;text-align:center;transition:all .2s}
      .eleve-card:active{transform:scale(.96)}
      .eleve-card.selected{background:rgba(99,102,241,.2);border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.15)}
      .eleve-avatar{width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);margin:0 auto 8px;display:flex;align-items:center;justify-content:center;color:#fff;font:700 18px/1 'Plus Jakarta Sans'}
      .eleve-nom{font:600 13px/1.2 'Inter';color:#fff}

      .comp-list{display:flex;flex-direction:column;gap:8px;max-height:320px;overflow-y:auto;padding:4px}
      .comp-card{padding:12px 14px;background:rgba(99,102,241,.06);border:1.5px solid rgba(99,102,241,.15);border-radius:12px;cursor:pointer;display:flex;align-items:center;gap:12px;transition:all .15s}
      .comp-card:active{transform:scale(.98)}
      .comp-card.selected{background:rgba(99,102,241,.18);border-color:#6366f1}
      .comp-code{font:700 11px/1 'IBM Plex Mono';color:#6366f1;padding:4px 8px;background:rgba(99,102,241,.15);border-radius:6px;flex-shrink:0}
      .comp-nom{font:600 14px/1.3 'Inter';color:#fff;flex:1}

      .btn-validate{width:100%;padding:18px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border:0;border-radius:16px;color:#fff;font:800 16px/1 'Plus Jakarta Sans';cursor:pointer;margin-top:24px;box-shadow:0 8px 24px rgba(99,102,241,.4);transition:all .2s}
      .btn-validate:disabled{opacity:.4;cursor:not-allowed;box-shadow:none}
      .btn-validate:not(:disabled):active{transform:scale(.98)}

      .empty{padding:40px 20px;text-align:center;color:#64748b;font:500 14px/1.5 'Inter'}
    </style>

    <div class="val-page">
      <h1 class="val-h1">Valider une compétence</h1>
      <p class="val-sub">L'élève reçoit un quiz 30s après la validation.</p>

      <section class="step">
        <div class="step-label">Étape 1</div>
        <div class="step-title">Choisir l'élève</div>
        ${eleves.length ? `
          <div class="eleves-grid">
            ${eleves.map(e => `
              <div class="eleve-card" data-id="${esc(e.id)}">
                <div class="eleve-avatar">${esc((e.prenom?.[0] || '?') + (e.nom?.[0] || ''))}</div>
                <div class="eleve-nom">${esc(e.prenom || '')}</div>
              </div>
            `).join('')}
          </div>
        ` : `<div class="empty">Aucun élève assigné.</div>`}
      </section>

      <section class="step step-2">
        <div class="step-label">Étape 2</div>
        <div class="step-title">Compétence travaillée</div>
        <div class="comp-list">
          ${competences.map(c => `
            <div class="comp-card" data-id="${esc(c.id)}">
              <span class="comp-code">${esc(c.code)}</span>
              <span class="comp-nom">${esc(c.nom)}</span>
            </div>
          `).join('')}
        </div>
      </section>

      <button class="btn-validate" disabled>Valider la compétence</button>
    </div>
  `;
}
