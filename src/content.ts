export type Locale = 'en' | 'pt';

export type Lane = 'main' | 'decode' | 'rendair' | 'epicure' | 'onedev' | 'cyos';

export type Shipped = { date: string; ref: string; lane: Lane; text: string };

export type Project = {
  id: string;
  lane: Lane;
  name: string;
  org: string;
  period: string;
  summary: string;
  points: string[];
  stack: string[];
  links: { label: string; href: string }[];
  images?: { src: string; alt: string; width: number; height: number }[];
};

export type Role = {
  id: string;
  lane: Lane;
  company: string;
  title: string;
  kind: string;
  start: string;
  end: string | null;
  place: string;
  points: string[];
};

/** Start and end month of each role (null = ongoing); drives the experience graph. */
export const roleSpans: Record<string, [string, string | null]> = {
  decode: ['2025-09', null],
  rendair: ['2025-10', '2026-06'],
  epicure: ['2025-01', '2025-11'],
  onedev: ['2022-03', '2024-12'],
  cyos: ['2021-02', null],
};

export const contact = {
  email: 'luizricini1@gmail.com',
  phone: '+55 44 99771-3151',
  phoneHref: 'tel:+5544997713151',
  linkedin: 'https://www.linkedin.com/in/luiz-ricini',
  github: 'https://github.com/luizricini',
  cv: '/cv/Luiz-Ricini-CV.pdf',
};

type Dict = {
  meta: { title: string; description: string };
  nav: { work: string; experience: string; stack: string; contact: string; switchTo: string; switchLabel: string };
  hero: {
    refs: string[];
    subject: string;
    body: string;
    author: string;
    based: string;
    cta: { email: string; linkedin: string; github: string; cv: string };
    terminalTitle: string;
    log: Shipped[];
  };
  work: { title: string; intro: string; private: string };
  projects: Project[];
  experience: { title: string; intro: string; present: string; head: string; merged: string };
  roles: Role[];
  education: { title: string; school: string; period: string; note: string };
  stack: { title: string; intro: string; groups: { name: string; items: string[] }[] };
  quote: { label: string; text: string; author: string; role: string; note?: string };
  contact: { title: string; body: string; email: string; phone: string; cv: string; elsewhere: string };
  footer: { built: string; top: string };
};

const stackGroups = {
  en: [
    { name: 'AI & agents', items: ['Agno', 'RAG', 'pgvector', 'OpenAI', 'Claude', 'Langfuse', 'PII & prompt-injection guardrails'] },
    { name: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'TanStack Query & Router', 'Tailwind', 'shadcn/ui'] },
    { name: 'Backend', items: ['Node.js', 'NestJS', 'Python', 'FastAPI', 'tRPC', 'PostgreSQL', 'Drizzle', 'Convex'] },
    { name: 'Cloud & delivery', items: ['AWS Lambda, SQS, S3, CDK', 'Railway', 'Vercel', 'Docker', 'GitHub Actions'] },
    { name: 'Mobile', items: ['Swift', 'SwiftUI', 'React Native', 'App Store releases'] },
  ],
  pt: [
    { name: 'IA & agentes', items: ['Agno', 'RAG', 'pgvector', 'OpenAI', 'Claude', 'Langfuse', 'Guardrails de PII e prompt injection'] },
    { name: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'TanStack Query & Router', 'Tailwind', 'shadcn/ui'] },
    { name: 'Backend', items: ['Node.js', 'NestJS', 'Python', 'FastAPI', 'tRPC', 'PostgreSQL', 'Drizzle', 'Convex'] },
    { name: 'Cloud & entrega', items: ['AWS Lambda, SQS, S3, CDK', 'Railway', 'Vercel', 'Docker', 'GitHub Actions'] },
    { name: 'Mobile', items: ['Swift', 'SwiftUI', 'React Native', 'Publicação na App Store'] },
  ],
};

const appImages = (alt: [string, string]) => [
  { src: '/images/havana.webp', alt: alt[0], width: 1776, height: 601 },
  { src: '/images/herai.webp', alt: alt[1], width: 1776, height: 412 },
];

const en: Dict = {
  meta: {
    title: 'Luiz Ricini · Full-stack engineer shipping AI products',
    description:
      'Full-stack software engineer building AI-powered products end to end: agent layers, React/Next.js apps and Node.js/Python backends. Decode Data, Rendair, Epicure.',
  },
  nav: { work: 'Work', experience: 'Experience', stack: 'Stack', contact: 'Contact', switchTo: 'PT', switchLabel: 'Ver em português' },
  hero: {
    refs: ['HEAD → main', 'open-to-work'],
    subject: 'Full-stack engineer shipping AI products end to end.',
    body: 'I build the agent layer, the product around it and the infrastructure underneath, using React and Next.js, Node.js, Python and PostgreSQL. Now at Decode Data; before that at Rendair, the AI rendering platform architects use worldwide.',
    author: 'Author',
    based: 'Palotina, PR, Brazil · working remote',
    cta: { email: 'Email me', linkedin: 'LinkedIn', github: 'GitHub', cv: 'Download CV' },
    terminalTitle: 'git log --merges --oneline',
    log: [
      { date: '2026-09', ref: 'regulas', lane: 'main', text: 'Regulas: AI tax assistant, waitlist open' },
      { date: '2026-09', ref: 'rcgi', lane: 'decode', text: 'Carbon registry with traceability graph' },
      { date: '2026-08', ref: 'agroid', lane: 'decode', text: 'Rural-credit compliance engine' },
      { date: '2026-07', ref: 'agents', lane: 'decode', text: 'Secure file attachments in agent chat' },
      { date: '2026-06', ref: 'agents', lane: 'decode', text: 'Per-client access control for AI agents' },
      { date: '2026-06', ref: 'firewatch', lane: 'decode', text: 'Farm onboarding from .kmz files' },
      { date: '2026-05', ref: 'rendair', lane: 'rendair', text: 'Assets Library with bulk actions' },
      { date: '2026-02', ref: 'rendair', lane: 'rendair', text: 'Guided onboarding to the first AI render' },
    ],
  },
  work: {
    title: 'Selected work',
    intro: 'Products I built and shipped to production, and what I owned in each.',
    private: 'Client project · not publicly available',
  },
  projects: [
    {
      id: 'rendair',
      lane: 'rendair',
      name: 'Rendair',
      org: 'Rendair · United States',
      period: '2025 — 2026',
      summary:
        'SaaS where architects around the world turn sketches and 3D models into photorealistic renders with AI. I shipped features across the React app and the serverless AWS API.',
      points: [
        'Built the Assets Library end to end: search and filters, folders with drag and drop, and multi-select bulk actions.',
        'Replaced full-size previews with a custom thumbnail pipeline, cutting preview rendering cost by around 60%.',
        'Shipped the guided onboarding that takes new users to their first AI render, and the backend for the Canvas workflow.',
        'Added admin moderation to the public community feed and delivered production fixes across web and API.',
      ],
      stack: ['React', 'TypeScript', 'TanStack', 'Node.js', 'AWS Lambda', 'SQS', 'S3', 'PostgreSQL', 'Stripe'],
      links: [{ label: 'rendair.ai', href: 'https://rendair.ai' }],
    },
    {
      id: 'agents',
      lane: 'decode',
      name: 'AI data agents',
      org: 'Decode Data · Brazil',
      period: '2025 — now',
      summary:
        'A multi-client platform of AI data agents: people ask questions in plain language and get answers, charts and dashboards from their own data. Python (FastAPI + Agno) behind a Next.js product.',
      points: [
        'Built the agent’s chat and interactive canvas: session management, RAG over pgvector, and guardrails for PII and prompt injection.',
        'Designed per-client role-based access control, so an agent only ever reaches the data its user is allowed to see.',
        'Shipped secure file attachments in the chat and a canvas editor with alignment guides and undo/redo.',
        'Built a data anonymization pipeline that protects sensitive information while keeping datasets usable for analysis.',
      ],
      stack: ['Python', 'FastAPI', 'Agno', 'pgvector', 'PostgreSQL', 'Next.js', 'Better Auth', 'Langfuse'],
      links: [],
    },
    {
      id: 'agro',
      lane: 'decode',
      name: 'Alerta de Incêndio & AgroID',
      org: 'Decode Data · client work',
      period: '2026',
      summary:
        'Wildfire monitoring and rural-credit compliance for Brazilian agribusiness: farms, fire hotspots, satellite rasters and the regulatory checks banks and insurers must run.',
      points: [
        'Farm onboarding from .kmz files, with the property boundaries drawn on an interactive map.',
        'Compliance checks for Brazil’s rural-credit and crop-insurance rules (CMN 5.267/2025, CNSP 485/2025), with an audit trail for every result.',
        'Risk analysis fed by public satellite data on fire risk and land use.',
      ],
      stack: ['React', 'Convex', 'Clerk', 'FastAPI', 'PostGIS', 'Leaflet', 'Airflow'],
      links: [{ label: 'app.alertadeincendio.com', href: 'https://app.alertadeincendio.com' }],
    },
    {
      id: 'rcgi',
      lane: 'decode',
      name: 'RCGI-USP Carbon',
      org: 'Decode Data · for RCGI, University of São Paulo',
      period: '2026',
      summary:
        'Greenhouse-gas accounting and a carbon registry: companies and cities compute emissions under IPCC 2006, GHG Protocol and GPC 1.1, submit them for validation, and register carbon projects and credits.',
      points: [
        'Rebuilt a no-code prototype as an owned product on Next.js, tRPC, Drizzle and PostgreSQL.',
        'Emissions calculator following IPCC methodology, with every figure traceable to its emission factor.',
        'Municipal inventory dashboard, mitigation scenarios, and a public carbon registry that traces each credit back to its project.',
      ],
      stack: ['Next.js', 'tRPC', 'Drizzle', 'PostgreSQL', 'Better Auth', 'Railway'],
      links: [],
    },
    {
      id: 'regulas',
      lane: 'main',
      name: 'Regulas',
      org: 'My own product · launching soon',
      period: '2026',
      summary:
        'An AI assistant for Brazilian accountants working through the 2026 tax reform, grounded in official sources and treating legal validity dates as a first-class concept. The waitlist is open.',
      points: [
        'Ingestion pipeline that turns laws and decrees into versioned provisions with validity rules and pgvector embeddings.',
        'Hybrid retrieval (vector + full-text, merged with reciprocal rank fusion) feeding a Claude agent that cites the exact provision behind each answer.',
        'FastAPI backend with chat sessions and usage quotas; Next.js chat with streamed responses and Google sign-in.',
      ],
      stack: ['Python', 'FastAPI', 'pgvector', 'PostgreSQL', 'Claude', 'Next.js', 'Better Auth'],
      links: [{ label: 'Join the waitlist', href: 'https://regulas.com.br' }],
    },
    {
      id: 'apps',
      lane: 'epicure',
      name: 'Havana & HerAI',
      org: 'Epicure · France',
      period: '2025',
      summary:
        'Two AI-powered iOS apps shipped end to end for Epicure: backend, custom AI APIs, the Swift front end and App Store releases.',
      points: [
        'Havana: a team of personal AI agents, such as a travel planner, a career coach and an astrologer, each with its own persona and prompts.',
        'HerAI: an assistant dedicated to women, covering well-being, planning, writing and life coaching.',
        'Custom AI APIs and real-time conversation flows built for fast responses, with secure third-party integrations.',
      ],
      stack: ['Swift', 'SwiftUI', 'React Native', 'Node.js', 'OpenAI'],
      links: [
        { label: 'Havana on the App Store', href: 'https://apps.apple.com/br/app/havana-your-ai-agents/id6742335376' },
        { label: 'HerAI on the App Store', href: 'https://apps.apple.com/br/app/herai-women-dedicated-ai/id6741536208' },
      ],
      images: appImages(['App Store screenshots of Havana, a team of AI agents', 'App Store screenshots of HerAI, an AI assistant for women']),
    },
  ],
  experience: {
    title: 'Experience',
    intro: 'Read it like a log: newest on top.',
    present: 'now',
    head: 'ongoing',
    merged: 'merged',
  },
  roles: [
    {
      id: 'decode',
      lane: 'decode',
      company: 'Decode Data',
      title: 'Full-stack Software Engineer',
      kind: 'Part-time · Remote',
      start: 'Sep 2025',
      end: null,
      place: 'Uberlândia, Brazil',
      points: [
        'AI agent layer with Agno: chat and canvas, session management, RAG over pgvector, PII and prompt-injection guardrails.',
        'Product work across client platforms in agribusiness compliance, wildfire monitoring and carbon accounting.',
      ],
    },
    {
      id: 'rendair',
      lane: 'rendair',
      company: 'Rendair',
      title: 'Full-stack Software Engineer',
      kind: 'Full-time · Remote',
      start: 'Oct 2025',
      end: 'Jun 2026',
      place: 'California, United States',
      points: [
        'Thumbnail pipeline that cut preview rendering cost by around 60%; Assets Library, onboarding and Canvas workflow.',
        'React and Node.js on AWS (Lambda, SQS, S3) for a platform architects use worldwide.',
      ],
    },
    {
      id: 'epicure',
      lane: 'epicure',
      company: 'Epicure',
      title: 'Mobile Software Engineer',
      kind: 'Freelance · Remote',
      start: 'Jan 2025',
      end: 'Nov 2025',
      place: 'Paris, France',
      points: ['Launched Havana and HerAI on the App Store, from backend and AI APIs to the Swift and React Native front end.'],
    },
    {
      id: 'onedev',
      lane: 'onedev',
      company: 'Onedev',
      title: 'Software Developer',
      kind: 'Full-time · Hybrid',
      start: 'Mar 2022',
      end: 'Dec 2024',
      place: 'Palotina, Brazil',
      points: [
        'Built a messaging platform with WhatsApp bot automation on Next.js, NestJS and PostgreSQL.',
        'Cut execution time of core queries by 80% with targeted indexes.',
        'Real-time file sharing to WhatsApp using Node.js streams and Cloudflare.',
      ],
    },
    {
      id: 'cyos',
      lane: 'cyos',
      company: 'Cyos Technologies',
      title: 'Backend Software Engineer',
      kind: 'Self-employed · Remote',
      start: 'Feb 2021',
      end: null,
      place: 'Brazil',
      points: [
        'Freelance backends with AI-powered APIs for mobile apps, and RESTful APIs shared across web and mobile.',
        'Schema restructuring and query optimization for better reliability and less downtime.',
      ],
    },
  ],
  education: {
    title: 'Initial commit',
    school: 'Universidade Paranaense (Unipar)',
    period: '2021 — 2023',
    note: 'Associate degree in Systems Analysis and Development',
  },
  stack: {
    title: 'Stack',
    intro: 'What I reach for, grouped by layer.',
    groups: stackGroups.en,
  },
  quote: {
    label: 'Recommendation on LinkedIn',
    text: 'I had the pleasure of working closely with Luiz at RENDAIR, and throughout that time he consistently stood out for his professionalism, positive attitude, and strong sense of ownership.',
    author: 'Quim Civit',
    role: 'Architect & Co-founder, Rendair',
  },
  contact: {
    title: 'Ready to merge.',
    body: 'Open to full-time roles and freelance projects, from a single feature to a whole AI product. Tell me what you are building.',
    email: 'Email',
    phone: 'Phone',
    cv: 'Download CV (PDF)',
    elsewhere: 'Elsewhere',
  },
  footer: { built: 'Built with Next.js.', top: 'Back to top' },
};

const pt: Dict = {
  meta: {
    title: 'Luiz Ricini · Engenheiro full-stack que entrega produtos com IA',
    description:
      'Engenheiro de software full-stack construindo produtos com IA de ponta a ponta: camadas de agentes, apps em React/Next.js e backends em Node.js/Python. Decode Data, Rendair, Epicure.',
  },
  nav: { work: 'Projetos', experience: 'Experiência', stack: 'Stack', contact: 'Contato', switchTo: 'EN', switchLabel: 'View in English' },
  hero: {
    refs: ['HEAD → main', 'open-to-work'],
    subject: 'Engenheiro full-stack que entrega produtos com IA de ponta a ponta.',
    body: 'Construo a camada de agentes, o produto em volta e a infraestrutura por baixo, com React e Next.js, Node.js, Python e PostgreSQL. Hoje na Decode Data; antes na Rendair, a plataforma de renders com IA usada por arquitetos do mundo todo.',
    author: 'Autor',
    based: 'Palotina, PR · trabalho remoto',
    cta: { email: 'Enviar e-mail', linkedin: 'LinkedIn', github: 'GitHub', cv: 'Baixar CV' },
    terminalTitle: 'git log --merges --oneline',
    log: [
      { date: '2026-09', ref: 'regulas', lane: 'main', text: 'Regulas: assistente tributário com IA, lista de espera aberta' },
      { date: '2026-09', ref: 'rcgi', lane: 'decode', text: 'Registro de carbono com grafo de rastreabilidade' },
      { date: '2026-08', ref: 'agroid', lane: 'decode', text: 'Motor de compliance de crédito rural' },
      { date: '2026-07', ref: 'agents', lane: 'decode', text: 'Anexos seguros no chat dos agentes' },
      { date: '2026-06', ref: 'agents', lane: 'decode', text: 'Controle de acesso por cliente para agentes de IA' },
      { date: '2026-06', ref: 'firewatch', lane: 'decode', text: 'Cadastro de fazendas por arquivo .kmz' },
      { date: '2026-05', ref: 'rendair', lane: 'rendair', text: 'Assets Library com ações em massa' },
      { date: '2026-02', ref: 'rendair', lane: 'rendair', text: 'Onboarding guiado até o primeiro render com IA' },
    ],
  },
  work: {
    title: 'Projetos em destaque',
    intro: 'Produtos que construí e coloquei em produção, e o que foi responsabilidade minha em cada um.',
    private: 'Projeto de cliente · sem acesso público',
  },
  projects: [
    {
      id: 'rendair',
      lane: 'rendair',
      name: 'Rendair',
      org: 'Rendair · Estados Unidos',
      period: '2025 — 2026',
      summary:
        'SaaS em que arquitetos do mundo todo transformam esboços e modelos 3D em renders fotorrealistas com IA. Entreguei features no app React e na API serverless na AWS.',
      points: [
        'Construí a Assets Library de ponta a ponta: busca e filtros, pastas com drag and drop e ações em massa com seleção múltipla.',
        'Troquei os previews em tamanho original por um pipeline próprio de thumbnails, reduzindo o custo de renderização dos previews em cerca de 60%.',
        'Entreguei o onboarding guiado que leva o usuário novo ao primeiro render com IA, e o backend do workflow de Canvas.',
        'Implementei moderação de admin no feed público da comunidade e entreguei correções em produção no web e na API.',
      ],
      stack: ['React', 'TypeScript', 'TanStack', 'Node.js', 'AWS Lambda', 'SQS', 'S3', 'PostgreSQL', 'Stripe'],
      links: [{ label: 'rendair.ai', href: 'https://rendair.ai' }],
    },
    {
      id: 'agents',
      lane: 'decode',
      name: 'Agentes de dados com IA',
      org: 'Decode Data · Brasil',
      period: '2025 — hoje',
      summary:
        'Plataforma multi-cliente de agentes de dados com IA: as pessoas perguntam em linguagem natural e recebem respostas, gráficos e dashboards a partir dos próprios dados. Python (FastAPI + Agno) por trás de um produto em Next.js.',
      points: [
        'Construí o chat e o canvas interativo do agente: gestão de sessões, RAG sobre pgvector e guardrails de PII e prompt injection.',
        'Desenhei o controle de acesso por papel por cliente, para que o agente só alcance os dados que o usuário pode ver.',
        'Entreguei anexos seguros no chat e um editor de canvas com guias de alinhamento e desfazer/refazer.',
        'Construí um pipeline de anonimização que protege dados sensíveis e mantém os datasets utilizáveis para análise.',
      ],
      stack: ['Python', 'FastAPI', 'Agno', 'pgvector', 'PostgreSQL', 'Next.js', 'Better Auth', 'Langfuse'],
      links: [],
    },
    {
      id: 'agro',
      lane: 'decode',
      name: 'Alerta de Incêndio & AgroID',
      org: 'Decode Data · projeto de cliente',
      period: '2026',
      summary:
        'Monitoramento de queimadas e compliance de crédito rural para o agronegócio: fazendas, focos de incêndio, rasters de satélite e as verificações regulatórias que bancos e seguradoras precisam fazer.',
      points: [
        'Cadastro de fazendas por arquivo .kmz, com os limites da propriedade desenhados num mapa interativo.',
        'Verificações de compliance de crédito e seguro rural (CMN 5.267/2025, CNSP 485/2025), com trilha de auditoria para cada resultado.',
        'Análise de risco alimentada por dados públicos de satélite sobre risco de fogo e uso do solo.',
      ],
      stack: ['React', 'Convex', 'Clerk', 'FastAPI', 'PostGIS', 'Leaflet', 'Airflow'],
      links: [{ label: 'app.alertadeincendio.com', href: 'https://app.alertadeincendio.com' }],
    },
    {
      id: 'rcgi',
      lane: 'decode',
      name: 'RCGI-USP Carbon',
      org: 'Decode Data · para o RCGI da Universidade de São Paulo',
      period: '2026',
      summary:
        'Contabilidade de gases de efeito estufa e registro de carbono: empresas e municípios calculam emissões pelo IPCC 2006, GHG Protocol e GPC 1.1, submetem para validação e registram projetos e créditos de carbono.',
      points: [
        'Reconstruí um protótipo no-code como produto próprio em Next.js, tRPC, Drizzle e PostgreSQL.',
        'Calculadora de emissões seguindo a metodologia do IPCC, com cada número rastreável até o fator de emissão.',
        'Painel de inventário municipal, cenários de mitigação e um registro público de carbono que rastreia cada crédito até o projeto de origem.',
      ],
      stack: ['Next.js', 'tRPC', 'Drizzle', 'PostgreSQL', 'Better Auth', 'Railway'],
      links: [],
    },
    {
      id: 'regulas',
      lane: 'main',
      name: 'Regulas',
      org: 'Produto próprio · lançamento em breve',
      period: '2026',
      summary:
        'Um assistente com IA para contadores operarem a Reforma Tributária, ancorado em fonte oficial e com a vigência das normas como conceito central. A lista de espera está aberta.',
      points: [
        'Pipeline de ingestão que transforma leis e decretos em dispositivos versionados, com regras de vigência e embeddings no pgvector.',
        'Recuperação híbrida (vetorial + full-text, combinadas por reciprocal rank fusion) alimentando um agente Claude que cita o dispositivo exato de cada resposta.',
        'Backend FastAPI com sessões de chat e cotas de uso; chat em Next.js com respostas em streaming e login com Google.',
      ],
      stack: ['Python', 'FastAPI', 'pgvector', 'PostgreSQL', 'Claude', 'Next.js', 'Better Auth'],
      links: [{ label: 'Entrar na lista de espera', href: 'https://regulas.com.br' }],
    },
    {
      id: 'apps',
      lane: 'epicure',
      name: 'Havana & HerAI',
      org: 'Epicure · França',
      period: '2025',
      summary:
        'Dois apps iOS com IA entregues de ponta a ponta para a Epicure: backend, APIs de IA próprias, front-end em Swift e publicação na App Store.',
      points: [
        'Havana: um time de agentes de IA pessoais, como planejador de viagens, coach de carreira e astróloga, cada um com persona e prompts próprios.',
        'HerAI: uma assistente dedicada a mulheres, cobrindo bem-estar, planejamento, escrita e coaching de vida.',
        'APIs de IA próprias e fluxos de conversa em tempo real pensados para respostas rápidas, com integrações seguras com terceiros.',
      ],
      stack: ['Swift', 'SwiftUI', 'React Native', 'Node.js', 'OpenAI'],
      links: [
        { label: 'Havana na App Store', href: 'https://apps.apple.com/br/app/havana-your-ai-agents/id6742335376' },
        { label: 'HerAI na App Store', href: 'https://apps.apple.com/br/app/herai-women-dedicated-ai/id6741536208' },
      ],
      images: appImages(['Screenshots do Havana na App Store, um time de agentes de IA', 'Screenshots do HerAI na App Store, uma assistente de IA para mulheres']),
    },
  ],
  experience: {
    title: 'Experiência',
    intro: 'Leia como um log: o mais recente no topo.',
    present: 'hoje',
    head: 'em andamento',
    merged: 'merged',
  },
  roles: [
    {
      id: 'decode',
      lane: 'decode',
      company: 'Decode Data',
      title: 'Engenheiro de Software Full-stack',
      kind: 'Meio período · Remoto',
      start: 'set 2025',
      end: null,
      place: 'Uberlândia, Brasil',
      points: [
        'Camada de agentes com Agno: chat e canvas, gestão de sessões, RAG sobre pgvector e guardrails de PII e prompt injection.',
        'Produto em plataformas de clientes de compliance no agronegócio, monitoramento de queimadas e contabilidade de carbono.',
      ],
    },
    {
      id: 'rendair',
      lane: 'rendair',
      company: 'Rendair',
      title: 'Engenheiro de Software Full-stack',
      kind: 'Tempo integral · Remoto',
      start: 'out 2025',
      end: 'jun 2026',
      place: 'Califórnia, Estados Unidos',
      points: [
        'Pipeline de thumbnails que reduziu em cerca de 60% o custo dos previews; Assets Library, onboarding e workflow de Canvas.',
        'React e Node.js na AWS (Lambda, SQS, S3) numa plataforma usada por arquitetos do mundo todo.',
      ],
    },
    {
      id: 'epicure',
      lane: 'epicure',
      company: 'Epicure',
      title: 'Engenheiro de Software Mobile',
      kind: 'Freelance · Remoto',
      start: 'jan 2025',
      end: 'nov 2025',
      place: 'Paris, França',
      points: ['Lancei o Havana e o HerAI na App Store, do backend e das APIs de IA ao front-end em Swift e React Native.'],
    },
    {
      id: 'onedev',
      lane: 'onedev',
      company: 'Onedev',
      title: 'Desenvolvedor de Software',
      kind: 'Tempo integral · Híbrido',
      start: 'mar 2022',
      end: 'dez 2024',
      place: 'Palotina, Brasil',
      points: [
        'Construí uma plataforma de atendimento com automação de bot no WhatsApp em Next.js, NestJS e PostgreSQL.',
        'Reduzi em 80% o tempo de execução das consultas principais com índices direcionados.',
        'Envio de arquivos em tempo real para o WhatsApp com streams do Node.js e Cloudflare.',
      ],
    },
    {
      id: 'cyos',
      lane: 'cyos',
      company: 'Cyos Technologies',
      title: 'Engenheiro de Software Backend',
      kind: 'Autônomo · Remoto',
      start: 'fev 2021',
      end: null,
      place: 'Brasil',
      points: [
        'Backends freelance com APIs de IA para apps mobile e APIs REST compartilhadas entre web e mobile.',
        'Reestruturação de schemas e otimização de queries para mais confiabilidade e menos indisponibilidade.',
      ],
    },
  ],
  education: {
    title: 'Initial commit',
    school: 'Universidade Paranaense (Unipar)',
    period: '2021 — 2023',
    note: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
  },
  stack: {
    title: 'Stack',
    intro: 'O que eu uso no dia a dia, agrupado por camada.',
    groups: stackGroups.pt,
  },
  quote: {
    label: 'Recomendação no LinkedIn',
    text: 'I had the pleasure of working closely with Luiz at RENDAIR, and throughout that time he consistently stood out for his professionalism, positive attitude, and strong sense of ownership.',
    author: 'Quim Civit',
    role: 'Arquiteto e cofundador, Rendair',
    note: 'Tive o prazer de trabalhar de perto com o Luiz na RENDAIR e, durante todo esse tempo, ele se destacou pelo profissionalismo, pela atitude positiva e pelo forte senso de responsabilidade.',
  },
  contact: {
    title: 'Pronto para o merge.',
    body: 'Aberto a vagas full-time e a projetos freelance, de uma feature a um produto de IA inteiro. Me conta o que você está construindo.',
    email: 'E-mail',
    phone: 'Telefone',
    cv: 'Baixar CV (PDF)',
    elsewhere: 'Em outros lugares',
  },
  footer: { built: 'Feito com Next.js.', top: 'Voltar ao topo' },
};

export const dictionaries: Record<Locale, Dict> = { en, pt };
export type { Dict };
