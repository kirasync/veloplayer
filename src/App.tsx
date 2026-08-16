/**
 * @license
 * SPDX-License-Identifier: MIT
 */

import React, { useState, useEffect } from 'react';
import './player/index.ts';
import { 
  Play, 
  Terminal, 
  Settings, 
  Cpu, 
  Keyboard, 
  Sliders, 
  Code, 
  Copy, 
  Check, 
  BookOpen, 
  Radio,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Palette,
  Volume2,
  Tv,
  HelpCircle,
  Menu,
  X,
  Search,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  ArrowLeft,
  ChevronDown
} from 'lucide-react';

const VideoPlayer = 'video-player' as any;

const VIDEO_PRESETS = [
  {
    name: 'Oceans (MP4)',
    url: 'https://vjs.zencdn.net/v/oceans.mp4',
    poster: 'https://vjs.zencdn.net/v/oceans.png'
  },
  {
    name: 'Blue Moon Trailer (MP4)',
    url: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
    poster: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg'
  },
  {
    name: 'Sintel Trailer (MP4)',
    url: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=60'
  },
  {
    name: 'HLS Live Stream (M3U8)',
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=60'
  }
];

const DOCUMENTATION_GROUPS = [
  {
    title: 'GETTING STARTED',
    items: [
      { id: 'overview', name: 'Overview', icon: BookOpen },
      { id: 'installation', name: 'Getting Started', icon: Terminal },
    ]
  },
  {
    title: 'PLAYGROUND',
    items: [
      { id: 'playground', name: 'Interactive Customizer', icon: Sliders },
    ]
  },
  {
    title: 'API REFERENCE',
    items: [
      { id: 'attributes', name: 'Attributes Reference', icon: Settings },
      { id: 'events', name: 'Methods & Events', icon: Cpu },
      { id: 'styling', name: 'Theme Customization', icon: Palette },
    ]
  },
  {
    title: 'RESOURCES',
    items: [
      { id: 'shortcuts', name: 'Keyboard Shortcuts', icon: Keyboard },
      { id: 'faq', name: 'Frequently Asked Questions', icon: HelpCircle },
    ]
  }
] as const;

const TOC_HEADINGS: Record<string, { id: string; name: string }[]> = {
  overview: [
    { id: 'what-is-veloplayer', name: 'What is VeloPlayer?' },
    { id: 'interactive-demo', name: 'Interactive Demo' },
    { id: 'core-features', name: 'Core Features' },
    { id: 'performance-metrics', name: 'Performance Metrics' }
  ],
  installation: [
    { id: 'getting-started-installation', name: 'Getting Started' },
    { id: 'cdn-script-tag', name: 'Quick CDN Setup' },
    { id: 'html-js', name: 'HTML / JS Integration' },
    { id: 'react-integration', name: 'React Integration' },
    { id: 'vue-integration', name: 'Vue Integration' },
    { id: 'angular-integration', name: 'Angular Integration' },
    { id: 'vite-esm', name: 'Vite & Vanilla ES6' }
  ],
  playground: [
    { id: 'interactive-customizer-title', name: 'Interactive Customizer' },
    { id: 'live-preview', name: 'Live Preview Frame' },
    { id: 'knobs', name: 'Configuration Knobs' },
    { id: 'generated-code', name: 'Generated Embed Code' }
  ],
  attributes: [
    { id: 'attributes-api-reference', name: 'Attributes API Reference' },
    { id: 'attributes-table', name: 'Attributes Catalog' },
    { id: 'boolean-flags', name: 'Boolean Configuration' }
  ],
  events: [
    { id: 'methods-event-api', name: 'Methods & Event API' },
    { id: 'instance-methods', name: 'Instance Methods & Props' },
    { id: 'event-listeners', name: 'Event Observers' }
  ],
  styling: [
    { id: 'theme-css-variables', name: 'Theme & CSS Custom Variables' },
    { id: 'shadow-dom-variables', name: 'Shadow CSS Overrides' },
    { id: 'branding', name: 'Branding Integration' },
    { id: 'accessibility', name: 'Contrast Accessibility' }
  ],
  shortcuts: [
    { id: 'keyboard-shortcuts-title', name: 'Keyboard Shortcuts' },
    { id: 'keyboard-map', name: 'Core Shortcuts Guide' },
    { id: 'focus-behavior', name: 'Accessibility Integration' }
  ],
  faq: [
    { id: 'frequently-asked-questions', name: 'Frequently Asked Questions' },
    { id: 'faq-codecs', name: 'Codec & Format Support' },
    { id: 'faq-autoplay', name: 'Autoplay Block Policies' },
    { id: 'faq-styling', name: 'Custom Control Overrides' }
  ]
};

const SEARCH_ITEMS = [
  { tab: 'overview', title: 'What is VeloPlayer?', desc: 'A production-ready custom Web Component video player built in TypeScript with zero third-party dependencies.' },
  { tab: 'overview', title: 'Interactive Demo player', desc: 'Test live video with beautiful controls overlay on the landing page.' },
  { tab: 'overview', title: 'Core Features & Benefits', desc: 'HLS streaming support, CSS variables customization, and full keyboard control.' },
  { tab: 'installation', title: 'Quick Start CDN Installation', desc: 'Import the custom element script globally from the Vercel CDN.' },
  { tab: 'installation', title: 'React custom element rendering', desc: 'Import, dynamically load scripts, and cast components inside React.' },
  { tab: 'installation', title: 'Vue component options schema', desc: 'Enable custom elements inside Vue with compilerOptions.isCustomElement.' },
  { tab: 'installation', title: 'Angular custom element schema', desc: 'Import CUSTOM_ELEMENTS_SCHEMA into App NgModule.' },
  { tab: 'installation', title: 'Vite & Vanilla ES6 dynamic import', desc: 'Perform lazy-loading on route activation with dynamic imports.' },
  { tab: 'playground', title: 'Live Preview Frame', desc: 'A live container reflecting config changes, aspect ratios, and custom accent colors.' },
  { tab: 'playground', title: 'Configuration Knobs controls', desc: 'Tweak controls, autoplay, muted, loop, aspect-ratio, and accent-color.' },
  { tab: 'playground', title: 'Auto-Generated Embed Code', desc: 'Instantly compile and copy code block templates.' },
  { tab: 'attributes', title: 'Attributes API Reference catalog', desc: 'Review HTML attributes supported on the video-player DOM element.' },
  { tab: 'attributes', title: 'Custom Aspect Ratio constraints', desc: 'Supports widescreen, classic, square, vertical, and ultrawide constraints.' },
  { tab: 'events', title: 'JavaScript methods and properties', desc: 'Access video-player properties like play(), pause(), currentTime, volume, and duration.' },
  { tab: 'events', title: 'Event Observers registration', desc: 'Listen to play, pause, loadedmetadata, and error events using standard event listeners.' },
  { tab: 'styling', title: 'Theme & CSS Custom Variables overrides', desc: 'Styling options using --velo-accent, --velo-bg, --velo-text, and --velo-control-bg.' },
  { tab: 'styling', title: 'WCAG AA Accessibility standards', desc: 'Ensure beautiful, readable layout contrasts matching official accessibility criteria.' },
  { tab: 'shortcuts', title: 'Playback hotkeys shortcuts', desc: 'Press Space or K for play/pause, left/right arrow to seek, and up/down arrow for volume.' },
  { tab: 'shortcuts', title: 'Picture-in-picture & Fullscreen keys', desc: 'Use F to trigger fullscreen mode and P for picture-in-picture stream overlay.' },
  { tab: 'faq', title: 'Is adaptive streaming (HLS) supported?', desc: 'Yes, VeloPlayer supports .m3u8 adaptive playlists automatically via inline Hls.js fallback.' },
  { tab: 'faq', title: 'Why does my video block from autoplaying?', desc: 'Most web browsers require autoplaying videos to be explicitly muted or started after user interaction.' }
];

const tabsList = [
  { id: 'overview', name: 'Overview' },
  { id: 'installation', name: 'Getting Started' },
  { id: 'playground', name: 'Interactive Customizer' },
  { id: 'attributes', name: 'Attributes Reference' },
  { id: 'events', name: 'Methods & Events' },
  { id: 'styling', name: 'Theme Customization' },
  { id: 'shortcuts', name: 'Keyboard Shortcuts' },
  { id: 'faq', name: 'Frequently Asked Questions' }
] as const;

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'installation' | 'playground' | 'attributes' | 'events' | 'styling' | 'shortcuts' | 'faq'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [installFramework, setInstallFramework] = useState<'html' | 'react' | 'vue' | 'angular' | 'vite'>('html');

  // Interactive documentation search & feedback
  const [searchQuery, setSearchQuery] = useState('');
  const [feedbackVoted, setFeedbackVoted] = useState<'yes' | 'no' | null>(null);

  // Playground Config State
  const [videoSrc, setVideoSrc] = useState(VIDEO_PRESETS[0].url);
  const [posterSrc, setPosterSrc] = useState(VIDEO_PRESETS[0].poster);
  const [accentColor, setAccentColor] = useState('#6366f1');
  const [aspectRatio, setAspectRatio] = useState('16/9');
  const [controls, setControls] = useState(true);
  const [autoplay, setAutoplay] = useState(false);
  const [muted, setMuted] = useState(true);
  const [loop, setLoop] = useState(false);
  
  const [copiedText, setCopiedText] = useState<string | null>(null);

  useEffect(() => {
    // Reset feedback on tab switch
    setFeedbackVoted(null);
    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handlePresetChange = (presetName: string) => {
    const preset = VIDEO_PRESETS.find(p => p.name === presetName);
    if (preset) {
      setVideoSrc(preset.url);
      setPosterSrc(preset.poster);
    }
  };

  const generatedHTML = `<video-player
  src="${videoSrc}"
  poster="${posterSrc}"
  accent-color="${accentColor}"
  aspect-ratio="${aspectRatio}"
  controls="${controls}"
  autoplay="${autoplay}"
  muted="${muted}"
  loop="${loop}"
></video-player>`;

  const generatedReact = `import React, { useEffect } from 'react';

// Cast Custom Element for React + TypeScript
const VideoPlayer = 'video-player' as any;

export default function MyPlayer() {
  useEffect(() => {
    // Load VeloPlayer custom element script dynamically
    if (!customElements.get('video-player')) {
      const script = document.createElement('script');
      script.src = 'https://veloplayer.vercel.app/player.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <VideoPlayer
      src="${videoSrc}"
      poster="${posterSrc}"
      accent-color="${accentColor}"
      aspect-ratio="${aspectRatio}"
      controls="${controls}"
      autoplay={${autoplay}}
      muted={${muted}}
      loop={${loop}}
    />
  );
}`;

  // Filter search results
  const filteredSearch = searchQuery.trim() === '' 
    ? [] 
    : SEARCH_ITEMS.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="app-shell min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-primary-foreground">
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <Play className="h-5 w-5 fill-current" />
            </div>
            <div>
              <span className="font-bold text-lg text-white tracking-tight">VeloPlayer</span>
              <span className="ml-2 rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-400">v1.0.0</span>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button 
            className="block md:hidden text-neutral-300 hover:text-white p-1 ml-auto"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      <div className="w-full max-w-7xl mx-auto flex px-4 sm:px-6 py-6 sm:py-8 gap-8 min-h-[calc(100vh-4rem)] min-w-0">
        {/* Navigation Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 top-16 z-30 w-64 shrink-0 border-r border-neutral-800/60 bg-[#09090b] px-5 sm:px-6 py-6 transition-transform md:sticky md:block md:translate-x-0 overflow-y-auto h-[calc(100vh-4rem)]
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          {/* Documentation Search Bar */}
          <div className="relative mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
              <input 
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-neutral-800 bg-neutral-950/80 py-2 pl-9 pr-4 text-xs text-neutral-300 placeholder-neutral-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-neutral-500 hover:text-neutral-300"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Search results overlay dropdown */}
            {filteredSearch.length > 0 && (
              <div className="absolute left-0 right-0 top-11 z-50 rounded-xl border border-neutral-800 bg-neutral-950 p-2 shadow-2xl max-h-80 overflow-y-auto">
                <div className="px-2 py-1 text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Search Results</div>
                <div className="mt-1 space-y-1">
                  {filteredSearch.map((result, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setActiveTab(result.tab as any);
                        setSearchQuery('');
                        setSidebarOpen(false);
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-neutral-900 transition-colors block group"
                    >
                      <div className="text-xs font-semibold text-white group-hover:text-indigo-400 transition-colors flex items-center justify-between">
                        <span>{result.title}</span>
                        <span className="text-[10px] bg-neutral-900 px-1.5 py-0.5 rounded text-neutral-400 capitalize">{result.tab}</span>
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-0.5 line-clamp-1">{result.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {searchQuery.trim() !== '' && filteredSearch.length === 0 && (
              <div className="absolute left-0 right-0 top-11 z-50 rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-center shadow-2xl">
                <p className="text-xs text-neutral-400">No documentation matching "{searchQuery}"</p>
              </div>
            )}
          </div>

          {/* Grouped Sidebar Items */}
          <nav className="space-y-6">
            {DOCUMENTATION_GROUPS.map((group) => (
              <div key={group.title} className="space-y-1.5">
                <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  {group.title}
                </div>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id as any);
                          setSidebarOpen(false);
                        }}
                        className={`
                          w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all text-left
                          ${isActive 
                            ? 'bg-neutral-800 text-white font-semibold border-l-2 border-indigo-500 rounded-l-none' 
                            : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60'}
                        `}
                      >
                        <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-400' : 'text-neutral-500'}`} />
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-20 bg-black/60 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main 2-Column Grid (Content + Table of Contents right sidebar) */}
        <div className="flex-1 flex gap-8 items-start min-w-0">
          {/* Central Main Content Pane */}
          <main className="flex-1 max-w-3xl min-w-0 pb-16">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  Modern, Lightweight Web Video Player
                </h1>
                <p className="text-lg text-neutral-400 leading-relaxed max-w-3xl">
                  VeloPlayer is an incredibly lightweight, responsive, and cross-framework Web Component video player. Written purely in TypeScript with native APIs, it wraps around default HTML5 video controls to offer a beautiful customizable playback experience.
                </p>
              </div>

              {/* Highlight Hero Demo */}
              <div className="relative rounded-2xl overflow-hidden border border-neutral-800/80 bg-neutral-950 p-1.5 shadow-2xl">
                <VideoPlayer
                  src="https://vjs.zencdn.net/v/oceans.mp4"
                  poster="https://vjs.zencdn.net/v/oceans.png"
                  accent-color="#6366f1"
                />
              </div>

              <section className="docs-card rounded-2xl p-5 sm:p-6" aria-labelledby="quick-start-heading">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                  <div className="space-y-2">
                    <p className="docs-kicker">Start here</p>
                    <h2 id="quick-start-heading" className="text-2xl font-bold text-white">From zero to playback in four moves.</h2>
                    <p className="max-w-xl text-sm leading-6 text-neutral-400">Choose a path, preview the player, then copy the exact embed you need. Every section is designed to be tested, not just read.</p>
                  </div>
                  <button onClick={() => setActiveTab('installation')} className="docs-action inline-flex shrink-0 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold">
                    Open quick start <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-5 grid gap-2 sm:grid-cols-4">
                  {['Install', 'Embed', 'Customize', 'Ship'].map((step, index) => (
                    <button key={step} onClick={() => setActiveTab(index < 2 ? 'installation' : 'playground')} className="docs-action rounded-lg p-3 text-left">
                      <span className="docs-kicker">0{index + 1}</span>
                      <span className="mt-1 block text-sm font-semibold">{step}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="space-y-4" aria-labelledby="lab-heading">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="docs-kicker">Build with confidence</p>
                    <h2 id="lab-heading" className="mt-1 text-2xl font-bold text-white">The docs are a working lab.</h2>
                  </div>
                  <button onClick={() => setActiveTab('playground')} className="hidden items-center gap-1 text-sm font-semibold text-indigo-300 hover:text-white sm:flex">Launch playground <ChevronRight className="h-4 w-4" /></button>
                </div>
                <div className="docs-grid">
                  <button onClick={() => setActiveTab('playground')} className="docs-card rounded-xl p-5 text-left">
                    <div className="flex items-center justify-between"><Sliders className="h-5 w-5 text-indigo-300" /><span className="text-xs text-neutral-500">Live</span></div>
                    <h3 className="mt-5 font-semibold text-white">Interactive Player Lab</h3>
                    <p className="mt-2 text-sm leading-6 text-neutral-400">Tune source, poster, controls, ratio, and accent color while the real custom element updates beside you.</p>
                  </button>
                  <button onClick={() => setActiveTab('installation')} className="docs-card rounded-xl p-5 text-left">
                    <div className="flex items-center justify-between"><Code className="h-5 w-5 text-indigo-300" /><span className="text-xs text-neutral-500">Copy-ready</span></div>
                    <h3 className="mt-5 font-semibold text-white">Framework Recipes</h3>
                    <p className="mt-2 text-sm leading-6 text-neutral-400">Jump into HTML, React, Vue, Angular, or Vite with focused snippets that can go straight into a project.</p>
                  </button>
                </div>
              </section>

              {/* Key Features Grid */}
              <div className="space-y-6 pt-4">
                <h2 className="text-2xl font-bold text-white tracking-tight">Library Core Features</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="p-5 docs-card rounded-xl hover:border-neutral-700/60 transition-all space-y-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                      <Cpu className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-white">Universal & Zero Dependencies</h3>
                    <p className="text-sm text-neutral-400">Built as an HTML5 Custom Element. Works instantly with raw HTML/CSS, React, Vue, Svelte, Next.js, or Angular.</p>
                  </div>

                  <div className="p-5 docs-card rounded-xl hover:border-neutral-700/60 transition-all space-y-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                      <Radio className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-white">HLS Streaming & Adaptive Rates</h3>
                    <p className="text-sm text-neutral-400">Natively auto-detects `.m3u8` playlists and lazy-loads standard adaptive streaming (`hls.js`) directly in the pipeline.</p>
                  </div>

                  <div className="p-5 docs-card rounded-xl hover:border-neutral-700/60 transition-all space-y-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400">
                      <Palette className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-white">CSS-Variable Powered</h3>
                    <p className="text-sm text-neutral-400">Extremely simple to style. Tweak `--velo-accent`, `--velo-bg`, or `--velo-font` inside any stylesheet layer.</p>
                  </div>

                  <div className="p-5 docs-card rounded-xl hover:border-neutral-700/60 transition-all space-y-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                      <Keyboard className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-white">Full Keyboard Shortcuts</h3>
                    <p className="text-sm text-neutral-400">Rich keyboard mapping for quick, interactive user controls: play, seek, volume, speed adjustments, and full screen.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GETTING STARTED */}
          {activeTab === 'installation' && (
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-2">
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Getting Started</h1>
                <p className="text-neutral-400 text-lg">
                  VeloPlayer is distributed directly via a high-performance Vercel CDN script, with no NPM package overhead. Setup takes under a minute.
                </p>
              </div>

              {/* Sub tabs for Framework integrations */}
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2 border-b border-neutral-800 pb-px">
                  {(['html', 'react', 'vue', 'angular', 'vite'] as const).map((fw) => (
                    <button
                      key={fw}
                      onClick={() => setInstallFramework(fw)}
                      className={`
                        px-4 py-2.5 text-sm font-medium border-b-2 transition-all capitalize -mb-px
                        ${installFramework === fw
                          ? 'border-indigo-500 text-white font-semibold bg-indigo-500/5'
                          : 'border-transparent text-neutral-400 hover:text-neutral-200'}
                      `}
                    >
                      {fw === 'html' ? 'HTML / CDN' : fw}
                    </button>
                  ))}
                </div>

                {/* HTML/CDN Content */}
                {installFramework === 'html' && (
                  <div className="space-y-4">
                    <p className="text-neutral-300">
                      Include the direct production script bundle in the header or at the bottom of your HTML file, then use the standard custom tag anywhere in your code.
                    </p>
                    <div className="relative">
                      <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 font-mono text-sm overflow-x-auto text-indigo-300">
                        <p className="text-neutral-500">{`<!-- 1. Include VeloPlayer Script -->`}</p>
                        <p>{`<script src="https://veloplayer.vercel.app/player.js"></script>`}</p>
                        <br />
                        <p className="text-neutral-500">{`<!-- 2. Write HTML Custom Element -->`}</p>
                        <p className="text-green-400">{`<video-player`}</p>
                        <p className="text-green-400">{`  src="https://vjs.zencdn.net/v/oceans.mp4"`}</p>
                        <p className="text-green-400">{`  poster="https://vjs.zencdn.net/v/oceans.png"`}</p>
                        <p className="text-green-400">{`  accent-color="#6366f1"`}</p>
                        <p className="text-green-400">{`  aspect-ratio="16/9">`}</p>
                        <p className="text-green-400">{`</video-player>`}</p>
                      </div>
                      <button
                        onClick={() => handleCopy(`<script src="https://veloplayer.vercel.app/player.js"></script>\n\n<video-player\n  src="https://vjs.zencdn.net/v/oceans.mp4"\n  poster="https://vjs.zencdn.net/v/oceans.png"\n  accent-color="#6366f1"\n  aspect-ratio="16/9">\n</video-player>`, 'inst-html')}
                        className="absolute top-4 right-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 p-2 rounded-lg transition-all"
                      >
                        {copiedText === 'inst-html' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* React Content */}
                {installFramework === 'react' && (
                  <div className="space-y-4">
                    <p className="text-neutral-300">
                      For modern React frameworks (Vite, Next.js, Create React App), load the script dynamically inside a component hooks cycle or inside `index.html`. Then, render using a generic constant to keep your TypeScript build system safe from element namespace warnings.
                    </p>
                    <div className="relative">
                      <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 font-mono text-sm overflow-x-auto text-indigo-300">
                        <p className="text-neutral-500">{`import React, { useEffect } from 'react';`}</p>
                        <br />
                        <p className="text-neutral-500">{`// Safe approach for React + TypeScript namespace overrides`}</p>
                        <p className="text-white">{`const VideoPlayer = 'video-player' as any;`}</p>
                        <br />
                        <p className="text-neutral-500">{`export default function App() {`}</p>
                        <p className="text-neutral-500">{`  useEffect(() => {`}</p>
                        <p className="text-neutral-500">{`    // Mount the VeloPlayer custom element script from CDN`}</p>
                        <p className="text-neutral-400">{`    if (!customElements.get('video-player')) {`}</p>
                        <p className="text-neutral-400">{`      const script = document.createElement('script');`}</p>
                        <p className="text-neutral-400">{`      script.src = 'https://veloplayer.vercel.app/player.js';`}</p>
                        <p className="text-neutral-400">{`      script.async = true;`}</p>
                        <p className="text-neutral-400">{`      document.body.appendChild(script);`}</p>
                        <p className="text-neutral-400">{`    }`}</p>
                        <p className="text-neutral-500">{`  }, []);`}</p>
                        <br />
                        <p className="text-green-400">{`  return (`}</p>
                        <p className="text-green-400">{`    <VideoPlayer`}</p>
                        <p className="text-green-400">{`      src="https://vjs.zencdn.net/v/oceans.mp4"`}</p>
                        <p className="text-green-400">{`      accent-color="#6366f1"`}</p>
                        <p className="text-green-400">{`      aspect-ratio="16/9"`}</p>
                        <p className="text-green-400">{`    />`}</p>
                        <p className="text-green-400">{`  );`}</p>
                        <p className="text-neutral-500">{`}`}</p>
                      </div>
                      <button
                        onClick={() => handleCopy(`import React, { useEffect } from 'react';\n\nconst VideoPlayer = 'video-player' as any;\n\nexport default function App() {\n  useEffect(() => {\n    if (!customElements.get('video-player')) {\n      const script = document.createElement('script');\n      script.src = 'https://veloplayer.vercel.app/player.js';\n      script.async = true;\n      document.body.appendChild(script);\n    }\n  }, []);\n\n  return (\n    <VideoPlayer\n      src="https://vjs.zencdn.net/v/oceans.mp4"\n      accent-color="#6366f1"\n      aspect-ratio="16/9"\n    />\n  );\n}`, 'inst-react')}
                        className="absolute top-4 right-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 p-2 rounded-lg transition-all"
                      >
                        {copiedText === 'inst-react' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Vue Content */}
                {installFramework === 'vue' && (
                  <div className="space-y-4">
                    <p className="text-neutral-300">
                      In Vue, you can load the script dynamically in the component's `mounted` hook or add it globally in `index.html`. You must declare <code className="text-indigo-400 font-mono">&lt;video-player&gt;</code> in your bundler configuration to skip unrecognized tag compiler warnings.
                    </p>
                    
                    <div className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">1. Vue Component (VeloPlayer.vue)</span>
                      <div className="relative">
                        <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 font-mono text-sm overflow-x-auto text-indigo-300">
                          <p className="text-neutral-500">{`<template>`}</p>
                          <p className="text-green-400">{`  <video-player`}</p>
                          <p className="text-green-400">{`    src="https://vjs.zencdn.net/v/oceans.mp4"`}</p>
                          <p className="text-green-400">{`    accent-color="#6366f1"`}</p>
                          <p className="text-green-400">{`    aspect-ratio="16/9"`}</p>
                          <p className="text-green-400">{`  />`}</p>
                          <p className="text-neutral-500">{`</template>`}</p>
                          <br />
                          <p className="text-neutral-500">{`<script>`}</p>
                          <p className="text-neutral-500">{`export default {`}</p>
                          <p className="text-neutral-500">{`  name: 'VeloPlayerComponent',`}</p>
                          <p className="text-neutral-500">{`  mounted() {`}</p>
                          <p className="text-neutral-400">{`    if (!customElements.get('video-player')) {`}</p>
                          <p className="text-neutral-400">{`      const script = document.createElement('script');`}</p>
                          <p className="text-neutral-400">{`      script.src = 'https://veloplayer.vercel.app/player.js';`}</p>
                          <p className="text-neutral-400">{`      script.async = true;`}</p>
                          <p className="text-neutral-400">{`      document.body.appendChild(script);`}</p>
                          <p className="text-neutral-400">{`    }`}</p>
                          <p className="text-neutral-500">{`  }`}</p>
                          <p className="text-neutral-500">{`}`}</p>
                          <p className="text-neutral-500">{`</script>`}</p>
                        </div>
                        <button
                          onClick={() => handleCopy(`<template>\n  <video-player\n    src="https://vjs.zencdn.net/v/oceans.mp4"\n    accent-color="#6366f1"\n    aspect-ratio="16/9"\n  />\n</template>\n\n<script>\nexport default {\n  name: 'VeloPlayerComponent',\n  mounted() {\n    if (!customElements.get('video-player')) {\n      const script = document.createElement('script');\n      script.src = 'https://veloplayer.vercel.app/player.js';\n      script.async = true;\n      document.body.appendChild(script);\n    }\n  }\n}\n</script>`, 'inst-vue-cmp')}
                          className="absolute top-4 right-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 p-2 rounded-lg transition-all"
                        >
                          {copiedText === 'inst-vue-cmp' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">2. Bundler Setup (vite.config.js)</span>
                      <div className="relative">
                        <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 font-mono text-sm overflow-x-auto text-indigo-300">
                          <p className="text-neutral-500">{`import { defineConfig } from 'vite'`}</p>
                          <p className="text-neutral-500">{`import vue from '@vitejs/plugin-vue'`}</p>
                          <br />
                          <p className="text-neutral-500">{`export default defineConfig({`}</p>
                          <p className="text-neutral-500">{`  plugins: [`}</p>
                          <p className="text-neutral-500">{`    vue({`}</p>
                          <p className="text-neutral-500">{`      template: {`}</p>
                          <p className="text-neutral-500">{`        compilerOptions: {`}</p>
                          <p className="text-neutral-400">{`          // Register custom custom tag to avoid compilation warnings`}</p>
                          <p className="text-white">{`          isCustomElement: (tag) => tag === 'video-player'`}</p>
                          <p className="text-neutral-500">{`        }`}</p>
                          <p className="text-neutral-500">{`      }`}</p>
                          <p className="text-neutral-500">{`    })`}</p>
                          <p className="text-neutral-500">{`  ]`}</p>
                          <p className="text-neutral-500">{`})`}</p>
                        </div>
                        <button
                          onClick={() => handleCopy(`import { defineConfig } from 'vite'\nimport vue from '@vitejs/plugin-vue'\n\nexport default defineConfig({\n  plugins: [\n    vue({\n      template: {\n        compilerOptions: {\n          isCustomElement: (tag) => tag === 'video-player'\n        }\n      }\n    })\n  ]\n})`, 'inst-vue-vite')}
                          className="absolute top-4 right-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 p-2 rounded-lg transition-all"
                        >
                          {copiedText === 'inst-vue-vite' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Angular Content */}
                {installFramework === 'angular' && (
                  <div className="space-y-4">
                    <p className="text-neutral-300">
                      In Angular, you can dynamically load the custom element script during `ngOnInit()`. To make the Angular compiler accept standard custom web element tags, you must register the `CUSTOM_ELEMENTS_SCHEMA` inside your module schemas.
                    </p>
                    
                    <div className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">1. Component Logic (app.component.ts)</span>
                      <div className="relative">
                        <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 font-mono text-sm overflow-x-auto text-indigo-300">
                          <p className="text-neutral-500">{`import { Component, OnInit } from '@angular/core';`}</p>
                          <br />
                          <p className="text-neutral-500">{`@Component({`}</p>
                          <p className="text-neutral-500">{`  selector: 'app-root',`}</p>
                          <p className="text-green-400">{`  template: \``}</p>
                          <p className="text-green-400">{`    <video-player`}</p>
                          <p className="text-green-400">{`      src="https://vjs.zencdn.net/v/oceans.mp4"`}</p>
                          <p className="text-green-400">{`      accent-color="#6366f1"`}</p>
                          <p className="text-green-400">{`      aspect-ratio="16/9">`}</p>
                          <p className="text-green-400">{`    </video-player>`}</p>
                          <p className="text-green-400">{`  \``}</p>
                          <p className="text-neutral-500">{`})`}</p>
                          <p className="text-neutral-500">{`export class AppComponent implements OnInit {`}</p>
                          <p className="text-neutral-500">{`  ngOnInit() {`}</p>
                          <p className="text-neutral-400">{`    if (!customElements.get('video-player')) {`}</p>
                          <p className="text-neutral-400">{`      const script = document.createElement('script');`}</p>
                          <p className="text-neutral-400">{`      script.src = 'https://veloplayer.vercel.app/player.js';`}</p>
                          <p className="text-neutral-400">{`      script.async = true;`}</p>
                          <p className="text-neutral-400">{`      document.body.appendChild(script);`}</p>
                          <p className="text-neutral-400">{`    }`}</p>
                          <p className="text-neutral-500">{`  }`}</p>
                          <p className="text-neutral-500">{`}`}</p>
                        </div>
                        <button
                          onClick={() => handleCopy(`import { Component, OnInit } from '@angular/core';\n\n@Component({\n  selector: 'app-root',\n  template: \`\n    <video-player\n      src="https://vjs.zencdn.net/v/oceans.mp4"\n      accent-color="#6366f1"\n      aspect-ratio="16/9">\n    </video-player>\n  \`\n})\nexport class AppComponent implements OnInit {\n  ngOnInit() {\n    if (!customElements.get('video-player')) {\n      const script = document.createElement('script');\n      script.src = 'https://veloplayer.vercel.app/player.js';\n      script.async = true;\n      document.body.appendChild(script);\n    }\n  }\n}`, 'inst-ang-cmp')}
                          className="absolute top-4 right-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 p-2 rounded-lg transition-all"
                        >
                          {copiedText === 'inst-ang-cmp' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">2. Module Import (app.module.ts)</span>
                      <div className="relative">
                        <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 font-mono text-sm overflow-x-auto text-indigo-300">
                          <p className="text-neutral-500">{`import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';`}</p>
                          <p className="text-neutral-500">{`import { BrowserModule } from '@angular/platform-browser';`}</p>
                          <br />
                          <p className="text-neutral-500">{`@NgModule({`}</p>
                          <p className="text-neutral-500">{`  declarations: [AppComponent],`}</p>
                          <p className="text-neutral-500">{`  imports: [BrowserModule],`}</p>
                          <p className="text-neutral-400">{`  // schemas parameter is required for web components`}</p>
                          <p className="text-white">{`  schemas: [CUSTOM_ELEMENTS_SCHEMA],`}</p>
                          <p className="text-neutral-500">{`  bootstrap: [AppComponent]`}</p>
                          <p className="text-neutral-500">{`})`}</p>
                          <p className="text-neutral-500">{`export class AppModule { }`}</p>
                        </div>
                        <button
                          onClick={() => handleCopy(`import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';\nimport { BrowserModule } from '@angular/platform-browser';\n\n@NgModule({\n  declarations: [AppComponent],\n  imports: [BrowserModule],\n  schemas: [CUSTOM_ELEMENTS_SCHEMA],\n  bootstrap: [AppComponent]\n})\nexport class AppModule { }`, 'inst-ang-mod')}
                          className="absolute top-4 right-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 p-2 rounded-lg transition-all"
                        >
                          {copiedText === 'inst-ang-mod' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Vite/Vanilla ES6 Content */}
                {installFramework === 'vite' && (
                  <div className="space-y-4">
                    <p className="text-neutral-300">
                      With modern ESM bundlers (Vite, Rollup, ESBuild, Webpack 5), you can dynamically import standard custom elements over the web without installing any node modules.
                    </p>
                    <div className="relative">
                      <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 font-mono text-sm overflow-x-auto text-indigo-300">
                        <p className="text-neutral-500">{`// main.js - Directly import CDN url`}</p>
                        <p className="text-white">{`import 'https://veloplayer.vercel.app/player.js';`}</p>
                        <br />
                        <p className="text-neutral-500">{`// Or load on route activation dynamically`}</p>
                        <p className="text-green-400">{`export async function loadVideoPlayer() {`}</p>
                        <p className="text-green-400">{`  await import('https://veloplayer.vercel.app/player.js');`}</p>
                        <p className="text-green-400">{`  console.log('VeloPlayer loaded and ready!');`}</p>
                        <p className="text-green-400">{`}`}</p>
                      </div>
                      <button
                        onClick={() => handleCopy(`import 'https://veloplayer.vercel.app/player.js';\n\nexport async function loadVideoPlayer() {\n  await import('https://veloplayer.vercel.app/player.js');\n  console.log('VeloPlayer loaded and ready!');\n}`, 'inst-vite')}
                        className="absolute top-4 right-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 p-2 rounded-lg transition-all"
                      >
                        {copiedText === 'inst-vite' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PLAYGROUND / CUSTOMIZER */}
          {activeTab === 'playground' && (
            <div className="space-y-8 animate-fade-in w-full min-w-0">
              <div id="interactive-customizer-title" className="space-y-2">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">Interactive Customizer</h1>
                <p className="text-neutral-400 text-sm sm:text-base lg:text-lg">Configure playback, customize theme variables, and test live behaviors in real-time.</p>
              </div>

              {/* Dynamic Live Preview Panel */}
              <div id="live-preview" className="rounded-2xl border border-neutral-800/90 bg-black overflow-hidden shadow-2xl w-full min-w-0 p-1 bg-gradient-to-b from-neutral-900/60 to-black">
                <VideoPlayer
                  key={`${videoSrc}-${posterSrc}-${accentColor}-${aspectRatio}-${controls}-${autoplay}-${muted}-${loop}`}
                  src={videoSrc}
                  poster={posterSrc}
                  accent-color={accentColor}
                  aspect-ratio={aspectRatio}
                  controls={controls ? 'true' : 'false'}
                  autoplay={autoplay ? 'true' : 'false'}
                  muted={muted ? 'true' : 'false'}
                  loop={loop ? 'true' : 'false'}
                />
              </div>

              {/* Playground knobs & Code generator */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2 w-full min-w-0">
                {/* Knobs configuration panel */}
                <div id="knobs" className="space-y-5 p-4 sm:p-6 rounded-xl border border-neutral-800/80 bg-neutral-900/25 w-full min-w-0">
                  <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Sliders className="h-4 w-4 text-indigo-400 shrink-0" /> Knobs & Controls
                    </h3>
                    <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {aspectRatio} • {accentColor}
                    </span>
                  </div>
                  
                  {/* Presets */}
                  <div className="space-y-1.5 w-full min-w-0">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">Select Video Preset</label>
                    <select 
                      onChange={(e) => handlePresetChange(e.target.value)}
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs sm:text-sm text-neutral-200 outline-none focus:border-indigo-500 transition-colors"
                    >
                      {VIDEO_PRESETS.map((preset) => (
                        <option key={preset.name} value={preset.name}>{preset.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Manual video input */}
                  <div className="space-y-1.5 w-full min-w-0">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">Custom URL (MP4 / HLS M3U8)</label>
                    <input 
                      type="text" 
                      value={videoSrc}
                      onChange={(e) => setVideoSrc(e.target.value)}
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs font-mono text-neutral-300 outline-none focus:border-indigo-500 transition-colors truncate"
                      placeholder="https://..."
                    />
                  </div>

                  {/* Accent Color picker & Aspect Ratio */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full min-w-0">
                    <div className="space-y-1.5 w-full min-w-0">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">Accent Color</label>
                      <div className="flex items-center gap-2 w-full min-w-0">
                        <input 
                          type="color" 
                          value={accentColor}
                          onChange={(e) => setAccentColor(e.target.value)}
                          className="w-9 h-9 shrink-0 rounded border border-neutral-800 bg-neutral-950 p-1 cursor-pointer"
                        />
                        <input 
                          type="text" 
                          value={accentColor}
                          onChange={(e) => setAccentColor(e.target.value)}
                          className="w-full min-w-0 rounded-lg border border-neutral-800 bg-neutral-950 px-2.5 py-1.5 text-xs text-neutral-300 outline-none focus:border-indigo-500 transition-colors font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 w-full min-w-0">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">Aspect Ratio</label>
                      <select 
                        value={aspectRatio}
                        onChange={(e) => setAspectRatio(e.target.value)}
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-200 outline-none focus:border-indigo-500 transition-colors"
                      >
                        <option value="16/9">16/9 (Widescreen)</option>
                        <option value="4/3">4/3 (Classic)</option>
                        <option value="1/1">1/1 (Square)</option>
                        <option value="9/16">9/16 (Vertical)</option>
                        <option value="21/9">21/9 (Ultrawide)</option>
                      </select>
                    </div>
                  </div>

                  {/* Toggles & Flags */}
                  <div className="space-y-2 pt-1 w-full min-w-0">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">Toggles & Flags</label>
                    <div className="grid grid-cols-2 gap-2.5 w-full min-w-0">
                      <label className="flex items-center gap-2 p-2 rounded-lg border border-neutral-800/60 bg-neutral-950/50 hover:bg-neutral-900/50 cursor-pointer select-none text-xs text-neutral-300 transition-colors min-w-0">
                        <input type="checkbox" checked={controls} onChange={(e) => setControls(e.target.checked)} className="rounded border-neutral-700 bg-neutral-900 text-indigo-500 focus:ring-0 shrink-0" />
                        <span className="truncate">Controls</span>
                      </label>
                      <label className="flex items-center gap-2 p-2 rounded-lg border border-neutral-800/60 bg-neutral-950/50 hover:bg-neutral-900/50 cursor-pointer select-none text-xs text-neutral-300 transition-colors min-w-0">
                        <input type="checkbox" checked={autoplay} onChange={(e) => setAutoplay(e.target.checked)} className="rounded border-neutral-700 bg-neutral-900 text-indigo-500 focus:ring-0 shrink-0" />
                        <span className="truncate">Autoplay</span>
                      </label>
                      <label className="flex items-center gap-2 p-2 rounded-lg border border-neutral-800/60 bg-neutral-950/50 hover:bg-neutral-900/50 cursor-pointer select-none text-xs text-neutral-300 transition-colors min-w-0">
                        <input type="checkbox" checked={muted} onChange={(e) => setMuted(e.target.checked)} className="rounded border-neutral-700 bg-neutral-900 text-indigo-500 focus:ring-0 shrink-0" />
                        <span className="truncate">Muted</span>
                      </label>
                      <label className="flex items-center gap-2 p-2 rounded-lg border border-neutral-800/60 bg-neutral-950/50 hover:bg-neutral-900/50 cursor-pointer select-none text-xs text-neutral-300 transition-colors min-w-0">
                        <input type="checkbox" checked={loop} onChange={(e) => setLoop(e.target.checked)} className="rounded border-neutral-700 bg-neutral-900 text-indigo-500 focus:ring-0 shrink-0" />
                        <span className="truncate">Loop</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Live Code Generation cards */}
                <div id="generated-code" className="flex flex-col gap-4 w-full min-w-0">
                  {/* HTML Component Embed */}
                  <div className="p-4 sm:p-5 rounded-xl border border-neutral-800/80 bg-neutral-950/90 flex flex-col justify-between w-full min-w-0 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2">
                        <Code className="h-4 w-4 text-emerald-400 shrink-0" /> HTML Web Component
                      </span>
                      <button 
                        onClick={() => handleCopy(generatedHTML, 'play-html')}
                        className="text-neutral-400 hover:text-white hover:bg-neutral-800 p-1.5 rounded-lg transition-all text-xs flex items-center gap-1.5 border border-neutral-800"
                        title="Copy HTML snippet"
                      >
                        {copiedText === 'play-html' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        <span className="hidden sm:inline">{copiedText === 'play-html' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <div className="w-full min-w-0 overflow-hidden rounded-lg border border-neutral-800/80 bg-black">
                      <pre className="font-mono text-[11px] sm:text-xs text-green-400 overflow-x-auto p-3.5 max-h-[160px] leading-relaxed select-all">
                        <code>{generatedHTML}</code>
                      </pre>
                    </div>
                  </div>

                  {/* React / JSX Usage Embed */}
                  <div className="p-4 sm:p-5 rounded-xl border border-neutral-800/80 bg-neutral-950/90 flex flex-col justify-between w-full min-w-0 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2">
                        <Code className="h-4 w-4 text-indigo-400 shrink-0" /> React / JSX Usage
                      </span>
                      <button 
                        onClick={() => handleCopy(generatedReact, 'play-react')}
                        className="text-neutral-400 hover:text-white hover:bg-neutral-800 p-1.5 rounded-lg transition-all text-xs flex items-center gap-1.5 border border-neutral-800"
                        title="Copy React snippet"
                      >
                        {copiedText === 'play-react' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        <span className="hidden sm:inline">{copiedText === 'play-react' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <div className="w-full min-w-0 overflow-hidden rounded-lg border border-neutral-800/80 bg-black">
                      <pre className="font-mono text-[11px] sm:text-xs text-indigo-300 overflow-x-auto p-3.5 max-h-[160px] leading-relaxed select-all">
                        <code>{generatedReact}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ATTRIBUTES REFERENCE */}
          {activeTab === 'attributes' && (
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-2">
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Attributes API Reference</h1>
                <p className="text-neutral-400 text-lg">Full catalog of attributes supported on the <code className="text-indigo-400 font-mono">&lt;video-player&gt;</code> DOM element.</p>
              </div>

              <div className="rounded-xl border border-neutral-800 overflow-hidden bg-neutral-950">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-neutral-800 bg-neutral-900/60 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                        <th className="px-6 py-4">Attribute</th>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4">Default</th>
                        <th className="px-6 py-4">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-850 text-sm text-neutral-300">
                      <tr>
                        <td className="px-6 py-4 font-mono font-semibold text-indigo-400">src</td>
                        <td className="px-6 py-4 text-xs font-mono">string</td>
                        <td className="px-6 py-4 text-xs text-neutral-500">—</td>
                        <td className="px-6 py-4 leading-relaxed">Source URL of your video. Supports standard video containers (`.mp4`, `.webm`) and adaptive streaming manifests (`.m3u8` playlists via hls.js fallback mechanism).</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-mono font-semibold text-indigo-400">poster</td>
                        <td className="px-6 py-4 text-xs font-mono">string</td>
                        <td className="px-6 py-4 text-xs text-neutral-500">—</td>
                        <td className="px-6 py-4 leading-relaxed">The cover frame or poster image path displayed while the video source resolves/loads.</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-mono font-semibold text-indigo-400">aspect-ratio</td>
                        <td className="px-6 py-4 text-xs font-mono">string</td>
                        <td className="px-6 py-4 text-xs font-mono text-neutral-400">"16/9"</td>
                        <td className="px-6 py-4 leading-relaxed">Display container layout constraint. Valid standard bounds: `16/9`, `4/3`, `1/1`, `9/16` or any valid numeric CSS aspect-ratio.</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-mono font-semibold text-indigo-400">accent-color</td>
                        <td className="px-6 py-4 text-xs font-mono">string</td>
                        <td className="px-6 py-4 text-xs font-mono text-neutral-400">"#6366f1"</td>
                        <td className="px-6 py-4 leading-relaxed">The design accent. Styles seekbars, thumb points, speed-selectors, and volume trackers dynamically. Supports hex, rgb, hsl, or CSS system terms.</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-mono font-semibold text-indigo-400">controls</td>
                        <td className="px-6 py-4 text-xs font-mono">"true" | "false"</td>
                        <td className="px-6 py-4 text-xs font-mono text-neutral-400">"true"</td>
                        <td className="px-6 py-4 leading-relaxed">Setting to `false` disables, hides, and unbinds the custom floating controls container cleanly.</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-mono font-semibold text-indigo-400">autoplay</td>
                        <td className="px-6 py-4 text-xs font-mono">"true" | "false"</td>
                        <td className="px-6 py-4 text-xs font-mono text-neutral-400">"false"</td>
                        <td className="px-6 py-4 leading-relaxed">When true, video automatically starts playing on load. (Note: standard browser autoplay policies usually require the player to be explicitly `muted`).</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-mono font-semibold text-indigo-400">muted</td>
                        <td className="px-6 py-4 text-xs font-mono">"true" | "false"</td>
                        <td className="px-6 py-4 text-xs font-mono text-neutral-400">"false"</td>
                        <td className="px-6 py-4 leading-relaxed">Silences audio stream on start. Emitted volume updates adjust slider bounds synchronously.</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-mono font-semibold text-indigo-400">loop</td>
                        <td className="px-6 py-4 text-xs font-mono">"true" | "false"</td>
                        <td className="px-6 py-4 text-xs font-mono text-neutral-400">"false"</td>
                        <td className="px-6 py-4 leading-relaxed">When enabled, triggers continuous, seamless looping playback once video completion boundary is reached.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: METHODS & EVENTS */}
          {activeTab === 'events' && (
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-2">
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Methods & Event API</h1>
                <p className="text-neutral-400 text-lg">Interact with the VeloPlayer element programmatically using clean JavaScript bindings.</p>
              </div>

              {/* JS Methods */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Code className="h-5 w-5 text-indigo-400" /> Instance Properties & Methods
                </h2>
                <p className="text-neutral-400 text-sm">VeloPlayer instances expose direct properties/methods representing native video elements.</p>
                
                <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 font-mono text-sm space-y-4">
                  <div>
                    <span className="text-indigo-400">player.play()</span>
                    <span className="text-neutral-500 block text-xs mt-1">// Begins playing video. Returns a Promise.</span>
                  </div>
                  <div>
                    <span className="text-indigo-400">player.pause()</span>
                    <span className="text-neutral-500 block text-xs mt-1">// Pauses active playback.</span>
                  </div>
                  <div>
                    <span className="text-indigo-400">player.currentTime = 30;</span>
                    <span className="text-neutral-500 block text-xs mt-1">// Gets or sets the current play position in seconds.</span>
                  </div>
                  <div>
                    <span className="text-indigo-400">player.volume = 0.5;</span>
                    <span className="text-neutral-500 block text-xs mt-1">// Gets or sets play volume level (0.0 to 1.0 bounds).</span>
                  </div>
                  <div>
                    <span className="text-indigo-400">player.duration</span>
                    <span className="text-neutral-500 block text-xs mt-1">// Read-only float representing overall video length in seconds.</span>
                  </div>
                </div>
              </div>

              {/* Custom Events */}
              <div className="space-y-4 pt-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-emerald-400" /> Event Observers
                </h2>
                <p className="text-neutral-400 text-sm">VeloPlayer propagates native video events cleanly. Standard event payloads allow analytical and layout reactivity.</p>
                
                <div className="relative group">
                  <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 font-mono text-sm overflow-x-auto text-green-400">
                    <p className="text-neutral-500">{`// Locate video component`}</p>
                    <p>{`const player = document.querySelector('video-player');`}</p>
                    <br />
                    <p className="text-neutral-500">{`// Observe Play state shifts`}</p>
                    <p>{`player.addEventListener('play', () => {`}</p>
                    <p>{`  console.log('Video playing has commenced');`}</p>
                    <p>{`});`}</p>
                    <br />
                    <p className="text-neutral-500">{`// Monitor duration metadata loaded`}</p>
                    <p>{`player.addEventListener('loadedmetadata', () => {`}</p>
                    <p>{`  console.log('Overall duration registered:', player.duration);`}</p>
                    <p>{`});`}</p>
                    <br />
                    <p className="text-neutral-500">{`// Register streaming/playback error handling`}</p>
                    <p>{`player.addEventListener('error', (e) => {`}</p>
                    <p>{`  console.warn('Network or playback failure reported', e);`}</p>
                    <p>{`});`}</p>
                  </div>
                  <button 
                    onClick={() => handleCopy(`const player = document.querySelector('video-player');\n\nplayer.addEventListener('play', () => {\n  console.log('Video playing has commenced');\n});\n\nplayer.addEventListener('loadedmetadata', () => {\n  console.log('Overall duration registered:', player.duration);\n});\n\nplayer.addEventListener('error', (e) => {\n  console.warn('Network or playback failure reported', e);\n});`, 'events-code')}
                    className="absolute top-4 right-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 p-2 rounded-lg transition-all"
                    title="Copy code"
                  >
                    {copiedText === 'events-code' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: STYLE VARIABLE CUSTOMIZATION */}
          {activeTab === 'styling' && (
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-2">
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Theme & CSS Custom Variables</h1>
                <p className="text-neutral-400 text-lg">Learn how to easily re-style VeloPlayer elements to seamlessly fit your application branding.</p>
              </div>

              {/* Theme Customizer Preview */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Shadow DOM Variables</h2>
                <p className="text-neutral-400">The entire custom player controls structure relies on high-contrast, beautiful CSS variables. You can override these variables globally or locally on individual elements.</p>
                
                <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 font-mono text-sm overflow-x-auto text-neutral-300">
                  <p className="text-indigo-400">{`video-player {`}</p>
                  <p className="text-indigo-400">{`  /* Override colors */`}</p>
                  <p className="text-green-400">{`  --velo-accent: #10b981;      /* Interactive controls accent */`}</p>
                  <p className="text-green-400">{`  --velo-bg: #000000;          /* Player canvas background */`}</p>
                  <p className="text-green-400">{`  --velo-text: #f4f4f5;        /* Default button & timer labels */`}</p>
                  <p className="text-green-400">{`  --velo-control-bg: rgba(15, 23, 42, 0.7); /* Hover container panel */`}</p>
                  <p className="text-green-400">{`  --velo-font: 'Plus Jakarta Sans', system-ui;`}</p>
                  <p className="text-indigo-400">{`}`}</p>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-indigo-900/40 bg-indigo-950/20 space-y-3">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Palette className="h-5 w-5 text-indigo-400" /> Accessibility Bound Rules
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  We highly recommend using a custom accent color (`--velo-accent`) that satisfies the standard **WCAG AA contrast criteria (4.5:1 ratio)** against your background container color. Bright vibrant shades (like emerald greens, high-contrast pinks, or standard Indigo) look incredible!
                </p>
              </div>
            </div>
          )}

          {/* TAB 7: KEYBOARD SHORTCUTS */}
          {activeTab === 'shortcuts' && (
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-2">
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Keyboard Shortcuts</h1>
                <p className="text-neutral-400 text-lg">VeloPlayer includes professional desktop keyboard shortcut triggers out-of-the-box for convenient web accessibility.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/30 flex items-center justify-between">
                  <span className="font-medium text-neutral-300">Play / Pause video</span>
                  <div className="flex gap-1">
                    <kbd className="bg-neutral-850 border border-neutral-700 px-2.5 py-1 text-xs rounded text-white shadow font-semibold">Space</kbd>
                    <span className="text-neutral-500 text-xs self-center">or</span>
                    <kbd className="bg-neutral-850 border border-neutral-700 px-2.5 py-1 text-xs rounded text-white shadow font-semibold">K</kbd>
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/30 flex items-center justify-between">
                  <span className="font-medium text-neutral-300">Rewind 5 seconds</span>
                  <kbd className="bg-neutral-850 border border-neutral-700 px-2.5 py-1 text-xs rounded text-white shadow font-semibold">← Arrow Left</kbd>
                </div>

                <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/30 flex items-center justify-between">
                  <span className="font-medium text-neutral-300">Fast Forward 5 seconds</span>
                  <kbd className="bg-neutral-850 border border-neutral-700 px-2.5 py-1 text-xs rounded text-white shadow font-semibold">→ Arrow Right</kbd>
                </div>

                <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/30 flex items-center justify-between">
                  <span className="font-medium text-neutral-300">Toggle Fullscreen mode</span>
                  <kbd className="bg-neutral-850 border border-neutral-700 px-2.5 py-1 text-xs rounded text-white shadow font-semibold">F</kbd>
                </div>

                <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/30 flex items-center justify-between">
                  <span className="font-medium text-neutral-300">Toggle Mute / Unmute</span>
                  <kbd className="bg-neutral-850 border border-neutral-700 px-2.5 py-1 text-xs rounded text-white shadow font-semibold">M</kbd>
                </div>

                <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/30 flex items-center justify-between">
                  <span className="font-medium text-neutral-300">Increase playback volume</span>
                  <kbd className="bg-neutral-850 border border-neutral-700 px-2.5 py-1 text-xs rounded text-white shadow font-semibold">↑ Arrow Up</kbd>
                </div>

                <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/30 flex items-center justify-between">
                  <span className="font-medium text-neutral-300">Decrease playback volume</span>
                  <kbd className="bg-neutral-850 border border-neutral-700 px-2.5 py-1 text-xs rounded text-white shadow font-semibold">↓ Arrow Down</kbd>
                </div>

                <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/30 flex items-center justify-between">
                  <span className="font-medium text-neutral-300">Picture-in-Picture mode</span>
                  <kbd className="bg-neutral-850 border border-neutral-700 px-2.5 py-1 text-xs rounded text-white shadow font-semibold">P</kbd>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-8 animate-fade-in">
              <div id="frequently-asked-questions" className="space-y-2">
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Frequently Asked Questions</h1>
                <p className="text-neutral-400 text-lg">Common questions regarding integration, features, and advanced player usage.</p>
              </div>

              <div className="space-y-6">
                <div id="faq-codecs" className="p-6 docs-card rounded-xl space-y-3">
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <Tv className="h-4.5 w-4.5 text-indigo-400" /> Which media formats and streaming codecs are natively supported?
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    VeloPlayer supports all standard modern HTML5 video formats, including <strong>MP4 (H.264 / AAC)</strong>, <strong>WebM (VP9 / Opus)</strong>, and Ogg. For adaptive bitrate streaming, VeloPlayer natively detects and handles <strong>HLS (HTTP Live Streaming)</strong> playlists (M3U8) by dynamically importing the tiny, high-performance <code>hls.js</code> engine only when needed.
                  </p>
                </div>

                <div id="faq-autoplay" className="p-6 docs-card rounded-xl space-y-3">
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <Volume2 className="h-4.5 w-4.5 text-emerald-400" /> Why does my video block or fail to autoplay on page load?
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    Almost all modern desktop and mobile browsers (Chrome, Safari, iOS Safari, Android Chrome) block auto-playing video with sound to conserve user bandwidth and prevent unsolicited audio disruption. To guarantee autoplay succeeds, you must declare the <code>muted="true"</code> attribute on your element, or let the user explicitly trigger playback via an interactive play control.
                  </p>
                </div>

                <div id="faq-styling" className="p-6 docs-card rounded-xl space-y-3">
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <Palette className="h-4.5 w-4.5 text-pink-400" /> Can I override or hide the default controls overlay?
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    Absolutely! If you prefer to implement your own custom buttons, seekbars, or remote layouts, you can disable the entire floating overlay layout cleanly by setting the <code>controls="false"</code> attribute on the element. The player will then render as a raw, responsive, unstyled canvas, allowing you to trigger playback, volume, and seek operations programmatically via standard JavaScript bindings.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Helpfulness Rating Widget */}
          <div className="mt-16 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-white">Was this page helpful?</p>
              <p className="text-xs text-neutral-400">Help us improve the VeloPlayer developer resources.</p>
            </div>
            <div className="flex items-center gap-2">
              {feedbackVoted === null ? (
                <>
                  <button 
                    onClick={() => setFeedbackVoted('yes')}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900/40 text-xs font-medium text-neutral-300 hover:text-white hover:border-neutral-700 hover:bg-neutral-900/80 transition-all"
                  >
                    <ThumbsUp className="h-3.5 w-3.5 text-emerald-400" /> Yes
                  </button>
                  <button 
                    onClick={() => setFeedbackVoted('no')}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900/40 text-xs font-medium text-neutral-300 hover:text-white hover:border-neutral-700 hover:bg-neutral-900/80 transition-all"
                  >
                    <ThumbsDown className="h-3.5 w-3.5 text-pink-400" /> No
                  </button>
                </>
              ) : (
                <div className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3.5 py-1.5 rounded-lg border border-emerald-500/20 animate-fade-in flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Thanks for your feedback!
                </div>
              )}
            </div>
          </div>

          {/* Sequential Bottom Pagination Footer */}
          <div className="mt-8 pt-4 flex items-center justify-between gap-4">
            {(() => {
              const currentTabIndex = tabsList.findIndex(t => t.id === activeTab);
              const prevTab = currentTabIndex > 0 ? tabsList[currentTabIndex - 1] : null;
              const nextTab = currentTabIndex < tabsList.length - 1 ? tabsList[currentTabIndex + 1] : null;
              
              return (
                <>
                  {prevTab ? (
                    <button
                      onClick={() => setActiveTab(prevTab.id as any)}
                      className="flex-1 max-w-[240px] text-left p-4 rounded-xl border border-neutral-800 bg-neutral-900/10 hover:bg-neutral-900/20 hover:border-neutral-700 transition-all group"
                    >
                      <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider flex items-center gap-1">
                        <ArrowLeft className="h-3 w-3" /> Previous
                      </span>
                      <span className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors mt-1 block">
                        {prevTab.name}
                      </span>
                    </button>
                  ) : (
                    <div className="flex-1" />
                  )}
                  
                  {nextTab ? (
                    <button
                      onClick={() => setActiveTab(nextTab.id as any)}
                      className="flex-1 max-w-[240px] text-right p-4 rounded-xl border border-neutral-800 bg-neutral-900/10 hover:bg-neutral-900/20 hover:border-neutral-700 transition-all group"
                    >
                      <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider flex items-center justify-end gap-1">
                        Next <ArrowRight className="h-3 w-3" />
                      </span>
                      <span className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors mt-1 block font-sans">
                        {nextTab.name}
                      </span>
                    </button>
                  ) : (
                    <div className="flex-1" />
                  )}
                </>
              );
            })()}
          </div>

        </main>

        {/* Table of Contents Right Sidebar */}
        <div className="hidden lg:block w-52 shrink-0 sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pr-2 space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">On This Page</p>
          <ul className="space-y-2 text-xs">
            {(TOC_HEADINGS[activeTab] || []).map((heading) => (
              <li key={heading.id}>
                <a 
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(heading.id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      window.history.pushState(null, '', `#${heading.id}`);
                    }
                  }}
                  className="text-neutral-400 hover:text-white transition-colors block py-0.5 text-[11px] truncate leading-normal"
                  title={heading.name}
                >
                  {heading.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

      {/* Styled Footer */}
      <footer className="border-t border-neutral-800/80 bg-[#09090b] py-8 text-center text-sm text-neutral-500">
        <p>©2026 VeloPlayer.</p>
      </footer>
    </div>
  );
}
