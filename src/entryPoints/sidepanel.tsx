import renderRoot from '@/entryPoints/render/render-root.tsx';
import '@/entryPoints/main.css';
import SidePanel from '@/components/content';

// Renders sidepanel.html
const element = document.getElementById('sidepanel-root')!;
renderRoot(element, <SidePanel />);


