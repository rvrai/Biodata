import React from 'react';
import LegalPage, { H2, P, UL, LI, A } from './LegalPage';

const TermsOfService = () => (
  <LegalPage title="Terms of Service" lastUpdated="2026-10-17">
    <P>By accessing and using this portfolio website (the "Site"), you agree to these Terms of Service.</P>

    <H2>1. Acceptance of Terms</H2>
    <P>Your use of the Site constitutes acceptance of these terms. If you do not agree, please do not use the Site.</P>

    <H2>2. Use of the Site</H2>
    <UL>
      <LI>The Site is provided for informational purposes to showcase the professional portfolio of the owner.</LI>
      <LI>You agree not to misuse the Site, attempt unauthorized access, or disrupt its operation.</LI>
      <LI>You may not copy, redistribute, or republish the Site's content without attribution to the owner.</LI>
    </UL>

    <H2>3. Intellectual Property</H2>
    <P>
      All content, code, and design on the Site belong to the owner unless otherwise attributed (e.g., open-source
      libraries and fonts listed on the <A href="/legal/licenses">Licenses</A> page).
    </P>

    <H2>4. Disclaimer</H2>
    <P>
      The Site is provided "as is" without warranties of any kind. The owner is not liable for any damages arising
      from the use of the Site.
    </P>

    <H2>5. Third-Party Links</H2>
    <P>The Site may link to external websites. We are not responsible for their content or practices.</P>

    <H2>6. Governing Law</H2>
    <P>These terms are governed by the laws of India.</P>

    <H2>7. Contact</H2>
    <P>
      Questions: <A href="mailto:rvrai1998@gmail.com">rvrai1998@gmail.com</A>.
    </P>
  </LegalPage>
);

export default TermsOfService;
