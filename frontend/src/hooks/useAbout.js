import { useState, useEffect } from 'react';
import { fromSupabase } from '../utils/result';

const DEFAULT_ABOUT = {
  location: 'Noida, INDIA',
  tagline: 'Who I Am',
  years_exp: '5+',
  apps_shipped: '8+',
  downloads: '1M+',
  pillars: [
    { title: 'Growth', desc: 'Constant learning and exploring new paradigms.' },
    { title: 'Focus', desc: 'Deep work on efficiency and precision in every layer built.' },
    { title: 'Craft', desc: 'Discipline and dedication in every single line of code.' }
  ],
};

/**
 * ViewModel for the About section (MVVM).
 * Owns fetching + state so the About view stays purely presentational.
 */
export default function useAbout() {
  const [about, setAbout] = useState(DEFAULT_ABOUT);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { supabase } = await import('../lib/supabase.js');
      const result = fromSupabase(await supabase.from('about_config').select('*').single());
      if (mounted && result.ok && result.data) {
        setAbout({ ...DEFAULT_ABOUT, ...result.data });
      }
    })();
    return () => { mounted = false; };
  }, []);

  return about;
}
