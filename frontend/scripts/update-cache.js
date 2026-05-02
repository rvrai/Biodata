import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from frontend root
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateCache() {
  console.log('Fetching live data from Supabase...');
  
  const { data: entries, error: entriesError } = await supabase
    .from('content_entries')
    .select('*')
    .order('id', { ascending: true });

  if (entriesError) {
    console.error('Error fetching content_entries:', entriesError);
    process.exit(1);
  }

  const { data: sections, error: sectionsError } = await supabase
    .from('sections')
    .select('*')
    .order('order', { ascending: true });

  if (sectionsError) {
    console.error('Error fetching sections:', sectionsError);
    process.exit(1);
  }

  const cacheData = {
    timestamp: new Date().toISOString(),
    entries,
    sections
  };

  const cacheDir = path.join(__dirname, '..', 'public', 'cache');
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  const cachePath = path.join(cacheDir, 'data.json');
  fs.writeFileSync(cachePath, JSON.stringify(cacheData, null, 2));
  
  // Also saving to data.md as requested by user as a fallback format
  const mdPath = path.join(cacheDir, 'data.md');
  const mdContent = `# Cached Data\n\n\`\`\`json\n${JSON.stringify(cacheData, null, 2)}\n\`\`\`\n`;
  fs.writeFileSync(mdPath, mdContent);

  console.log(`Cache successfully updated at ${cachePath} and ${mdPath}`);
}

updateCache();
