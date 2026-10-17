import React from 'react';
import LegalPage, { H2, P, UL, LI, A } from './LegalPage';

const Licenses = () => (
  <LegalPage title="Fonts, Images & Libraries" lastUpdated="2026-10-17">
    <P>
      This page lists the third-party assets used on this Site and their licenses, as required by their respective
      licenses.
    </P>

    <H2>Fonts</H2>
    <UL>
      <LI><strong>Comfortaa</strong> — SIL Open Font License 1.1 (OFL-1.1).</LI>
      <LI><strong>JetBrains Mono</strong> — SIL Open Font License 1.1 (OFL-1.1).</LI>
    </UL>

    <H2>Images & Icons</H2>
    <UL>
      <LI>Portrait / hero imagery, app icons, favicon, and PWA icons — created by / owned by the site owner.</LI>
      <LI>React logo (<code>react.svg</code>) — used as a technology reference; React is © Meta Platforms, Inc. (MIT).</LI>
      <LI>Vite logo (<code>vite.svg</code>) — used as a technology reference; Vite is © Vite contributors (MIT).</LI>
    </UL>

    <H2>Open-Source Libraries (Third-Party SDK Audit)</H2>
    <UL>
      <LI>React & React DOM — MIT.</LI>
      <LI>Vite — MIT.</LI>
      <LI>framer-motion — MIT.</LI>
      <LI>Lenis — MIT.</LI>
      <LI>lucide-react — ISC.</LI>
      <LI>axios — MIT.</LI>
      <LI>@supabase/supabase-js — MIT.</LI>
      <LI>react-router-dom — MIT.</LI>
      <LI>vite-plugin-pwa — MIT.</LI>
    </UL>

    <P>
      License texts are available in each package's repository. If you believe an attribution is missing, contact{' '}
      <A href="mailto:rvrai1998@gmail.com">rvrai1998@gmail.com</A>.
    </P>
  </LegalPage>
);

export default Licenses;
