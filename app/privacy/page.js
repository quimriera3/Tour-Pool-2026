export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Grand Tour Pool: account data, predictions, optional emails, analytics and cookie choices.",
  alternates: { canonical: "/privacy", languages: { en: "/privacy", es: "/es/privacy" } },
};

export default function Privacy() {
  return <div>
    <div className="page-header"><span className="eyebrow">Legal</span><h1>Privacy Policy</h1><p className="subtitle">Last updated: 14 September 2026</p></div>
    <div className="legal-stack">
      <section className="card"><h2>What we store</h2><p className="subtitle">When you create an account, Supabase stores the information needed to authenticate you and Grand Tour Pool stores your profile, race predictions and scores so the game can work. We do not sell your personal data.</p></section>
      <section className="card"><h2>Optional game emails</h2><p className="subtitle">Game reminders and result updates are optional. They are sent only when your profile has explicitly opted in. You can change that preference from your account controls or contact us if you want help changing it.</p></section>
      <section className="card"><h2>Cookies and analytics</h2><p className="subtitle">Essential storage is used for authentication and your cookie choice. Vercel Analytics provides aggregated site-usage statistics. Google Tag Manager is loaded only after you choose “Accept analytics” in the consent banner. Rejecting analytics does not prevent you from playing.</p></section>
      <section className="card"><h2>Advertising</h2><p className="subtitle">Grand Tour Pool is not currently loading Google AdSense advertising scripts. If advertising is enabled in the future, this policy and the consent controls will be updated before those scripts are activated for visitors who require consent.</p></section>
      <section className="card"><h2>Service providers</h2><p className="subtitle">We use Supabase for authentication and database services, Vercel for hosting and aggregated analytics, and Resend to deliver transactional or opted-in game emails. These providers process data only as needed to provide those services.</p></section>
      <section className="card"><h2>Your rights</h2><p className="subtitle">You can ask to access, correct or delete your personal data, or withdraw optional email consent, by using our <a href="/contact">contact page</a>.</p></section>
      <section className="card"><h2>Changes</h2><p className="subtitle">If this policy changes materially, the date above will be updated.</p></section>
    </div>
  </div>;
}
