import React from 'react';
import LegalPage, { H2, P, UL, LI, A } from './LegalPage';

const CookiePolicy = () => (
  <LegalPage title="Cookie Policy" lastUpdated="2026-10-17">
    <P>This Site does not use tracking, advertising, or analytics cookies.</P>

    <H2>1. What We Store</H2>
    <UL>
      <LI>
        <strong>Consent flag:</strong> a single local-storage value records whether you accepted or declined the
        cookie notice. It contains no personal data.
      </LI>
      <LI>
        <strong>Admin session:</strong> if you log in as an administrator, a session token is kept in local storage
        so you stay signed in. It is removed on sign-out.
      </LI>
    </UL>

    <H2>2. Third-Party Cookies</H2>
    <P>
      Google Fonts may set technical cookies when serving fonts. Supabase may use a session cookie only when
      database content is fetched. Neither is used for advertising or cross-site tracking.
    </P>

    <H2>3. Managing Cookies</H2>
    <P>
      You can clear local storage or block cookies in your browser settings at any time. The Site will continue to
      work (portfolio content may fall back to a static copy).
    </P>

    <H2>4. Contact</H2>
    <P>
      Questions: <A href="mailto:rvrai1998@gmail.com">rvrai1998@gmail.com</A>.
    </P>
  </LegalPage>
);

export default CookiePolicy;
