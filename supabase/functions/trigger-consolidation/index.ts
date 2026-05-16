// ═══════════════════════════════════════════════════════════════
// Edge Function : trigger-consolidation
// Cron horaire — scanne les validations dont consolidation_due_le ≤ now()
// et crée une notification pour l'élève (quiz 2 questions).
//
// Setup :
//   supabase functions deploy trigger-consolidation --no-verify-jwt
//   supabase secrets set SERVICE_ROLE_KEY=xxx
//   Schedule via Supabase Dashboard → Database → Cron : every hour
// ═══════════════════════════════════════════════════════════════
import { createClient } from 'jsr:@supabase/supabase-js@2';

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SERVICE_ROLE_KEY')!,
  );

  const now = new Date().toISOString();

  // Validations dues, sans notif consolidation déjà créée
  const { data: dues, error } = await supabase
    .from('validations')
    .select('id, eleve_id, competence_id, consolidation_due_le, consolidation_notified')
    .lte('consolidation_due_le', now)
    .eq('consolidation_notified', false)
    .limit(500);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  if (!dues?.length) {
    return new Response(JSON.stringify({ ok: true, processed: 0 }));
  }

  // Crée les notifications + flag validations
  const notifs = dues.map(v => ({
    user_id: v.eleve_id,
    type: 'consolidation_quiz',
    payload: { competence_id: v.competence_id, validation_id: v.id },
    scheduled_for: now,
  }));

  const { error: notifErr } = await supabase.from('notifications').insert(notifs);
  if (notifErr) {
    return new Response(JSON.stringify({ error: notifErr.message }), { status: 500 });
  }

  const ids = dues.map(v => v.id);
  await supabase.from('validations').update({ consolidation_notified: true }).in('id', ids);

  return new Response(JSON.stringify({ ok: true, processed: dues.length }));
});
