import { useEffect, useState } from 'react';
import { DEFAULT_META, SECTION_META } from '../utils/sections';

/**
 * Scroll-spy ViewModel: tracks which section is in view and keeps the
 * document title + meta description in sync with it (SEO / share previews).
 *
 * @param {string[]} sectionIds - DOM ids to observe, in order
 * @returns {string} the active section id
 */
export default function useSectionMeta(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] || 'hero');
  const idsKey = sectionIds.join(',');

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey]);

  useEffect(() => {
    const meta = SECTION_META[activeId] || DEFAULT_META;
    document.title = meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', meta.description);
  }, [activeId]);

  return activeId;
}
