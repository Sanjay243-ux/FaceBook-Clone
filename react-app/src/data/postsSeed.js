/** Seed posts for the demo feed (shared by PostsContext). */
export const INITIAL_POSTS = [
  {
    id: 1,
    type: 'Tech News',
    author: 'TechHub Editorial',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=TechHub',
    timestamp: '2 hours ago',
    title: 'Google Releases Gemini 2.5 Ultra — Fastest AI Yet',
    body: 'Google has officially unveiled Gemini 2.5 Ultra with benchmark scores surpassing GPT-4o. The model features a 2M token context window and...',
    fullBody:
      'Google has officially unveiled Gemini 2.5 Ultra with benchmark scores surpassing GPT-4o. The model features a 2M token context window and native multimodal capabilities. Early benchmarks show a 23% improvement in reasoning tasks and 40% faster inference compared to previous generations. Industry experts predict this could reshape the competitive AI landscape significantly. Developers can access the model through Google AI Studio and the Gemini API starting next week.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    reactions: 1240,
    comments: 87,
    shares: 234,
    category: 'News',
  },
  {
    id: 2,
    type: 'Troubleshooting Guide',
    author: 'Sarah Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    timestamp: '4 hours ago',
    title: 'Fix: Windows 11 Wi-Fi Keeps Disconnecting',
    body: 'Having trouble with your Wi-Fi dropping on Windows 11? Follow these steps to resolve the issue permanently...',
    fullBody:
      "Having trouble with your Wi-Fi dropping on Windows 11? Follow these steps to resolve the issue permanently. This is one of the most common issues after the 24H2 update and affects Intel and Realtek adapters primarily.",
    reactions: 530,
    comments: 45,
    shares: 89,
    category: 'Guides',
    codeLang: 'powershell',
    codeBlock: `<span class="code-comment"># Step 1: Open Device Manager and disable power saving</span>
<span class="code-func">Get-NetAdapter</span> | <span class="code-func">Set-NetAdapterPowerManagement</span> <span class="code-const">-WakeOnMagicPacket Disabled</span>

<span class="code-comment"># Step 2: Reset the network stack</span>
<span class="code-func">netsh</span> winsock reset
<span class="code-func">netsh</span> int ip reset
<span class="code-func">ipconfig</span> /flushdns

<span class="code-comment"># Step 3: Update the driver</span>
<span class="code-func">pnputil</span> /scan-devices`,
  },
  {
    id: 3,
    type: 'Tutorial',
    author: 'Alex Rodriguez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    timestamp: '6 hours ago',
    title: 'Build a REST API with Node.js and Express in 15 Minutes',
    body: 'In this guide, we walk you through setting up a complete REST API from scratch using Node.js, Express, and MongoDB...',
    fullBody:
      "In this guide, we walk you through setting up a complete REST API from scratch using Node.js, Express, and MongoDB. By the end, you'll have a fully functional CRUD API with input validation, error handling, and proper project structure ready for production deployment.",
    reactions: 980,
    comments: 112,
    shares: 156,
    category: 'Tutorials',
    codeLang: 'javascript',
    codeBlock: `<span class="code-keyword">const</span> <span class="code-const">express</span> = <span class="code-func">require</span>(<span class="code-string">'express'</span>);
<span class="code-keyword">const</span> <span class="code-const">mongoose</span> = <span class="code-func">require</span>(<span class="code-string">'mongoose'</span>);
<span class="code-keyword">const</span> <span class="code-const">app</span> = <span class="code-func">express</span>();

app.<span class="code-func">use</span>(express.<span class="code-func">json</span>());

<span class="code-comment">// Connect to MongoDB</span>
mongoose.<span class="code-func">connect</span>(<span class="code-string">'mongodb://localhost/techapi'</span>);

<span class="code-comment">// Define a route</span>
app.<span class="code-func">get</span>(<span class="code-string">'/api/posts'</span>, <span class="code-keyword">async</span> (req, res) => {
  <span class="code-keyword">const</span> posts = <span class="code-keyword">await</span> Post.<span class="code-func">find</span>();
  res.<span class="code-func">json</span>(posts);
});

app.<span class="code-func">listen</span>(<span class="code-const">3000</span>, () => console.<span class="code-func">log</span>(<span class="code-string">'Server running'</span>));`,
  },
  {
    id: 4,
    type: 'Tech News',
    author: 'Maya Patel',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya',
    timestamp: '8 hours ago',
    title: 'Apple Vision Pro 2 Leaks: Thinner, Lighter, and Half the Price',
    body: "Supply chain sources reveal Apple's next-gen headset will feature micro-OLED displays, an M5 chip, and a dramatically reduced weight...",
    fullBody:
      "Supply chain sources reveal Apple's next-gen headset will feature micro-OLED displays, an M5 chip, and a dramatically reduced weight of under 350g. The Vision Pro 2 is expected to launch at $1,799, making spatial computing more accessible to mainstream consumers. New features include hand-tracking improvements, wider FOV, and EyeSight 2.0.",
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&h=400&fit=crop',
    reactions: 2100,
    comments: 156,
    shares: 312,
    category: 'News',
  },
  {
    id: 5,
    type: 'Tutorial',
    author: 'James Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    timestamp: '12 hours ago',
    title: 'Docker for Beginners: Containerize Your First App',
    body: 'Learn the fundamentals of Docker by containerizing a simple web application. This beginner-friendly guide covers everything from installation to deployment...',
    reactions: 745,
    comments: 68,
    shares: 94,
    category: 'Tutorials',
    codeLang: 'dockerfile',
    codeBlock: `<span class="code-keyword">FROM</span> <span class="code-const">node:20-alpine</span>
<span class="code-keyword">WORKDIR</span> <span class="code-string">/app</span>
<span class="code-keyword">COPY</span> package*.json ./
<span class="code-keyword">RUN</span> <span class="code-func">npm</span> ci --only=production
<span class="code-keyword">COPY</span> . .
<span class="code-keyword">EXPOSE</span> <span class="code-const">3000</span>
<span class="code-keyword">CMD</span> [<span class="code-string">"node"</span>, <span class="code-string">"server.js"</span>]`,
  },
  {
    id: 6,
    type: 'Troubleshooting Guide',
    author: 'Lisa Park',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    timestamp: '1 day ago',
    title: 'Fix: VS Code Running Slow — 7 Performance Tweaks',
    body: 'Is VS Code lagging? These 7 proven tweaks will dramatically boost your editor performance and reduce memory usage...',
    reactions: 890,
    comments: 73,
    shares: 120,
    category: 'Guides',
  },
  {
    id: 7,
    type: 'Video',
    author: 'Code & Build',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CodeBuild',
    timestamp: '3 hours ago',
    title: 'React Server Components Explained in 12 Minutes',
    body: 'A concise walkthrough of RSC patterns, when to use them, and how they fit next to client components in modern React apps.',
    fullBody:
      'A concise walkthrough of RSC patterns, when to use them, and how they fit next to client components in modern React apps. Includes mental models for data fetching and bundle size tradeoffs.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    reactions: 4200,
    comments: 310,
    shares: 890,
    category: 'Videos',
  },
  {
    id: 8,
    type: 'Video',
    author: 'Tech Review Weekly',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TRW',
    timestamp: '1 day ago',
    title: 'M3 Max vs M4 Pro: Real Developer Benchmarks',
    body: 'We ran compile times, Docker builds, and ML workloads to see where the new silicon actually saves you time.',
    reactions: 15600,
    comments: 1200,
    shares: 3400,
    category: 'Videos',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 100,
    type: 'Tech News',
    author: 'Tech Admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    timestamp: '2 days ago',
    title: 'Update on the new TechHub features',
    body: 'I just deployed the new Profile page layout. Check it out and let me know what you think. #webdev #react',
    fullBody:
      'I just deployed the new Profile page layout. Check it out and let me know what you think. #webdev #react',
    reactions: 42,
    comments: 12,
    shares: 3,
    category: 'News',
  },
];
