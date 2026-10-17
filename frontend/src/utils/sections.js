// Static per-section metadata (title + description) used for
// dynamic <title> and <meta name="description"> so search engines
// and social scrapers can read what each section is about.

export const SITE_NAME = 'Raj Vaibhav Rai';

export const SECTION_META = {
  hero: {
    title: `${SITE_NAME} | Senior Android Developer`,
    description:
      'Raj Vaibhav Rai — Senior Android Developer with 5+ years of experience building scalable, high-performance mobile apps using Kotlin, Java, and Jetpack Compose.',
  },
  about: {
    title: `About — ${SITE_NAME}`,
    description:
      'About Raj Vaibhav Rai — Senior Android Developer based in Noida, India, specializing in MVVM, Clean Architecture, Coroutines, and modern Android.',
  },
  projects: {
    title: `Projects — ${SITE_NAME}`,
    description:
      'Featured Android projects by Raj Vaibhav Rai — HappyMob, Kido Protect, DolledUp, Magenative, Classical Archive, and more.',
  },
  experience: {
    title: `Experience — ${SITE_NAME}`,
    description:
      'Professional experience of Raj Vaibhav Rai — Android Developer across fintech, parental control, and e-commerce companies.',
  },
  skills: {
    title: `Skills — ${SITE_NAME}`,
    description:
      'Tech stack of Raj Vaibhav Rai — Kotlin, Java, Jetpack Compose, MVVM, Room, Hilt, Firebase, REST APIs, and more.',
  },
  education: {
    title: `Education — ${SITE_NAME}`,
    description:
      'Education of Raj Vaibhav Rai — B.Tech from ITM School of Management Lucknow, plus CBSE schooling.',
  },
  certificates: {
    title: `Certificates — ${SITE_NAME}`,
    description:
      'Certifications and professional recognition of Raj Vaibhav Rai, Senior Android Developer.',
  },
  contact: {
    title: `Contact — ${SITE_NAME}`,
    description:
      'Contact Raj Vaibhav Rai — Senior Android Developer in Noida, India. Reach out for Android development opportunities.',
  },
  footer: {
    title: `${SITE_NAME} | Senior Android Developer`,
    description:
      'Raj Vaibhav Rai — Senior Android Developer portfolio. Kotlin, Java, Jetpack Compose, MVVM, Clean Architecture.',
  },
};

export const DEFAULT_META = SECTION_META.hero;
