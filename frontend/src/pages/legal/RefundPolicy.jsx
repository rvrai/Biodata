import React from 'react';
import LegalPage, { H2, P, UL, LI, A } from './LegalPage';

const RefundPolicy = () => (
  <LegalPage title="Refund Policy" lastUpdated="2026-10-17">
    <P>
      This is a free, informational portfolio website. We do not sell products, services, or subscriptions, and we
      do not charge any fees.
    </P>

    <H2>1. No Charges</H2>
    <P>There are no paid features, hidden fees, or charges of any kind on this Site.</P>

    <H2>2. Refunds</H2>
    <P>Because no payments are collected, no refunds are applicable.</P>

    <H2>3. Future Paid Services</H2>
    <P>
      If any paid products or services are introduced in the future, this policy will be updated to describe the
      applicable refund terms before any charge is made.
    </P>

    <H2>4. Contact</H2>
    <P>
      Questions: <A href="mailto:rvrai1998@gmail.com">rvrai1998@gmail.com</A>.
    </P>
  </LegalPage>
);

export default RefundPolicy;
