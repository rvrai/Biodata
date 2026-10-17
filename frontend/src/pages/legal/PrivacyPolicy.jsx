import React from 'react';
import LegalPage, { H2, P, UL, LI, A } from './LegalPage';

const PrivacyPolicy = () => (
  <LegalPage title="Privacy Policy" lastUpdated="2026-10-17">
    <P>
      Your privacy is important. This portfolio website is designed to collect as little personal data as
      possible. This policy explains what (if anything) is processed when you visit this site.
    </P>

    <H2>1. Information We Collect</H2>
    <UL>
      <LI><strong>We do not run tracking or advertising cookies.</strong></LI>
      <LI>
        <strong>Contact form:</strong> when you use the "Send a Message" form, your email application is opened
        (via a <code>mailto:</code> link) with your name, email, subject, and message. The message is sent
        directly from your own email app to the site owner's address — it is <strong>not stored on our servers</strong>.
      </LI>
      <LI>
        <strong>Local storage:</strong> your browser may store a small consent flag (whether you accepted or
        declined the cookie notice) and, if you are an administrator, a login session token. This data never
        leaves your device.
      </LI>
      <LI>
        <strong>Server logs:</strong> the hosting provider (Netlify) may keep standard technical logs (IP address,
        user agent, timestamps) for security and performance. These are not used for profiling.
      </LI>
    </UL>

    <H2>2. Third-Party Services</H2>
    <UL>
      <LI><strong>Google Fonts</strong> — fonts are loaded from Google's servers; Google may log the request. No account data is shared with Google.</LI>
      <LI><strong>Supabase</strong> — public portfolio content may be read from a Supabase database using anonymous (public) read access.</LI>
      <LI><strong>Netlify</strong> — hosting and content delivery.</LI>
    </UL>

    <H2>3. Data Minimization</H2>
    <P>
      We follow a data-minimization approach: we only process the minimum data needed to display the portfolio and
      let you contact the owner. We do not collect analytics identifiers, advertising IDs, or build user profiles.
    </P>

    <H2>4. How We Use Data</H2>
    <P>
      Any data processed is used solely to (a) serve the website, (b) respond to messages you choose to send, and
      (c) maintain security.
    </P>

    <H2>5. Sharing</H2>
    <P>We do not sell, rent, or share your personal data with third parties for marketing.</P>

    <H2>6. Your Rights</H2>
    <P>
      Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict the processing of
      your personal data. To exercise these rights, contact <A href="mailto:rvrai1998@gmail.com">rvrai1998@gmail.com</A>.
    </P>

    <H2>7. Contact</H2>
    <P>
      For privacy questions, contact: <A href="mailto:rvrai1998@gmail.com">rvrai1998@gmail.com</A>.
    </P>
  </LegalPage>
);

export default PrivacyPolicy;
