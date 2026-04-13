import { z } from "zod";

const iconSchema = z.enum([
  "scholar",
  "cv",
  "github",
  "linkedin",
  "email",
  "external"
]);

const richTextSegmentSchema = z.object({
  text: z.string(),
  href: z.string().optional()
});

const richTextBlockSchema = z.array(richTextSegmentSchema).min(1);

const heroSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  intro: z.string(),
  primaryCta: z.object({
    label: z.string(),
    href: z.string()
  }),
  secondaryCta: z.object({
    label: z.string(),
    href: z.string()
  }),
  stats: z
    .array(
      z.object({
        value: z.string(),
        label: z.string()
      })
    )
    .min(1)
});

const milestoneSchema = z.object({
  period: z.string(),
  title: z.string(),
  detail: richTextBlockSchema,
  href: z.string().optional()
});

const contactItemSchema = z.object({
  label: z.string(),
  value: z.string(),
  href: z.string().optional(),
  note: z.string().optional()
});

const profileSchema = z.object({
  name: z.string(),
  preferredName: z.string(),
  role: z.string(),
  institution: z.string(),
  institutionHref: z.string(),
  email: z.email(),
  location: z.string(),
  summary: z.string(),
  hero: heroSchema,
  bio: z.array(richTextBlockSchema).min(2),
  researchAreas: z
    .array(
      z.object({
        title: z.string(),
        description: z.string()
      })
    )
    .min(1),
  affiliations: z
    .array(
      z.object({
        label: z.string(),
        value: richTextBlockSchema
      })
    )
    .min(1),
  quickLinks: z
    .array(
      z.object({
        label: z.string(),
        href: z.string(),
        icon: iconSchema,
        external: z.boolean().default(false)
      })
    )
    .min(1),
  milestones: z.array(milestoneSchema).min(1),
  contact: z.array(contactItemSchema).min(1),
  positionContext: richTextBlockSchema,
  locationContext: richTextBlockSchema,
  contactContext: richTextBlockSchema,
  cvHighlights: z.array(z.string()).min(1),
  service: z.array(z.string()).default([]),
  publicationNote: richTextBlockSchema
});

const links = {
  hkust: "https://hkust.edu.hk/",
  hkustCse: "https://cse.hkust.edu.hk/",
  amir: "https://amir.goharshady.com",
  dimitris: "https://www.cse.ust.hk/~dipapado/index.html",
  oxford: "https://www.ox.ac.uk/",
  tsinghua: "https://www.tsinghua.edu.cn/en/",
  hkpfs: "https://cerg1.ugc.edu.hk/hkpfs/index.html"
} as const;

export const profile = profileSchema.parse({
  name: "Zhuo Cai",
  preferredName: "Joe",
  role: "PhD Student in Computer Science and Engineering",
  institution: "The Hong Kong University of Science and Technology (HKUST)",
  institutionHref: links.hkust,
  email: "zcaiam@connect.ust.hk",
  location: "Hong Kong",
  summary:
    "PhD student in applied cryptography, zero-knowledge proofs, game theory, and blockchain systems.",
  hero: {
    eyebrow: "Applied cryptography, zero-knowledge, and decentralized systems",
    title: "Research in proof systems, distributed randomness, and blockchain mechanism design.",
    intro:
      "I am a PhD student in Computer Science and Engineering at HKUST. My work focuses on proof systems, randomness protocols, and strategic questions in decentralized protocols.",
    primaryCta: {
      label: "View publications",
      href: "/publications/"
    },
    secondaryCta: {
      label: "Research themes",
      href: "/project/"
    },
    stats: [
      {
        value: "8+",
        label: "research papers"
      },
      {
        value: "4",
        label: "core research themes"
      },
      {
        value: "HKPFS",
        label: "doctoral fellowship"
      },
      {
        value: "Oxford",
        label: "visiting scholar experience"
      }
    ]
  },
  bio: [
    [
      { text: "I am a PhD student in Computer Science and Engineering at the " },
      { text: "Hong Kong University of Science and Technology (HKUST)", href: links.hkust },
      { text: ", co-advised by " },
      { text: "Amir Goharshady", href: links.amir },
      { text: " and " },
      { text: "Dimitris Papadopoulos", href: links.dimitris },
      { text: ". During my doctoral studies, I was also a visiting scholar at the " },
      { text: "University of Oxford", href: links.oxford },
      { text: "." }
    ],
    [
      { text: "My work sits at the intersection of applied cryptography, zero-knowledge proofs, MPC, game theory, and blockchain systems. I am supported by the " },
      { text: "Hong Kong PhD Fellowship Scheme (HKPFS)", href: links.hkpfs },
      { text: "." }
    ],
    [
      { text: "Before the PhD, I completed an MPhil at " },
      { text: "HKUST", href: links.hkust },
      { text: " from 2021 to 2023 and received my bachelor's degree in Automation from " },
      { text: "Tsinghua University", href: links.tsinghua },
      { text: " in 2021." }
    ]
  ],
  researchAreas: [
    {
      title: "Zero-Knowledge and Verifiable Computation",
      description:
        "Lookup arguments, verifiable databases, and cryptographic techniques for trustworthy computation."
    },
    {
      title: "Distributed Randomness and Leader Election",
      description:
        "Fair randomness generation, random beacons, and incentive-aware coordination in decentralized systems."
    },
    {
      title: "Game Theory for Blockchains",
      description:
        "Mechanism design and strategic analysis for blockchain protocols and smart-contract-enabled systems."
    },
    {
      title: "Smart Contract Analysis",
      description:
        "Formal and automated analysis of smart contracts, especially around gas behavior and protocol safety."
    }
  ],
  affiliations: [
    {
      label: "Program",
      value: [
        { text: "PhD in " },
        { text: "Computer Science and Engineering", href: links.hkustCse },
        { text: ", " },
        { text: "HKUST", href: links.hkust }
      ]
    },
    {
      label: "Advisors",
      value: [
        { text: "Amir Goharshady", href: links.amir },
        { text: " and " },
        { text: "Dimitris Papadopoulos", href: links.dimitris }
      ]
    },
    {
      label: "Support",
      value: [{ text: "Hong Kong PhD Fellowship Scheme (HKPFS)", href: links.hkpfs }]
    },
    {
      label: "Visiting Scholar",
      value: [{ text: "University of Oxford", href: links.oxford }]
    }
  ],
  quickLinks: [
    {
      label: "Google Scholar",
      href: "https://scholar.google.com/citations?user=1rGe9XMAAAAJ&hl=en",
      icon: "scholar",
      external: true
    },
    {
      label: "CV",
      href: "/cv/",
      icon: "cv",
      external: false
    },
    {
      label: "GitHub",
      href: "https://github.com/zhuocai",
      icon: "github",
      external: true
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/steinwaycaizhuo",
      icon: "linkedin",
      external: true
    },
    {
      label: "Email",
      href: "mailto:zcaiam@connect.ust.hk",
      icon: "email",
      external: true
    }
  ],
  milestones: [
    {
      period: "2026",
      title: "CCS paper on verifiable databases",
      detail: [
        { text: "Rogue advances updatable matrix lookup arguments and connects proof-system ideas to verifiable database applications under the supervision of " },
        { text: "Dimitris Papadopoulos", href: links.dimitris },
        { text: "." }
      ]
    },
    {
      period: "2025",
      title: "IJCAI paper on correlated equilibria",
      detail: [
        { text: "The IJCAI 2025 paper on trustless sampling of correlated equilibria is now published, extending my work on strategic coordination in blockchain-mediated systems." }
      ],
      href: "https://www.ijcai.org/proceedings/2025/0416.pdf"
    },
    {
      period: "2023-present",
      title: "PhD research at HKUST",
      detail: [
        { text: "Current work at " },
        { text: "HKUST", href: links.hkust },
        { text: " spans zero-knowledge proofs, distributed randomness, smart contract analysis, and the economics of decentralized protocols." }
      ]
    },
    {
      period: "During PhD",
      title: "Visiting scholar at the University of Oxford",
      detail: [
        { text: "The visit to the " },
        { text: "University of Oxford", href: links.oxford },
        { text: " strengthened the theoretical side of my research and broadened collaboration around cryptography and secure systems." }
      ]
    },
    {
      period: "2021-2023",
      title: "MPhil at HKUST",
      detail: [
        { text: "I developed the research base for my later work on blockchain mechanisms, proof systems, and formal analysis at " },
        { text: "HKUST", href: links.hkust },
        { text: "." }
      ]
    },
    {
      period: "2021",
      title: "Bachelor's degree from Tsinghua University",
      detail: [
        { text: "I received my bachelor's degree in Automation from " },
        { text: "Tsinghua University", href: links.tsinghua },
        { text: " before moving fully into systems, security, and cryptography research." }
      ]
    }
  ],
  contact: [
    {
      label: "Email",
      value: "zcaiam@connect.ust.hk",
      href: "mailto:zcaiam@connect.ust.hk",
      note: "Best for research discussions and collaboration."
    },
    {
      label: "Office",
      value: "1001-09, Academic Building, HKUST",
      note: "Hong Kong University of Science and Technology."
    },
    {
      label: "Affiliation",
      value: "Computer Science and Engineering, HKUST",
      href: links.hkustCse
    },
    {
      label: "Profiles",
      value: "Google Scholar, GitHub, LinkedIn",
      note: "See the quick links below for publications, code, and background."
    }
  ],
  positionContext: [
    { text: "PhD student in " },
    { text: "Computer Science and Engineering", href: links.hkustCse },
    { text: " at " },
    { text: "HKUST", href: links.hkust },
    { text: ", co-advised by " },
    { text: "Amir Goharshady", href: links.amir },
    { text: " and " },
    { text: "Dimitris Papadopoulos", href: links.dimitris },
    { text: "." }
  ],
  locationContext: [
    { text: "Based in Hong Kong, supported by the " },
    { text: "Hong Kong PhD Fellowship Scheme (HKPFS)", href: links.hkpfs },
    { text: ", and shaped by visiting scholar experience at the " },
    { text: "University of Oxford", href: links.oxford },
    { text: "." }
  ],
  contactContext: [
    { text: "Based in " },
    { text: "Hong Kong", href: links.hkust },
    { text: ", affiliated with " },
    { text: "HKUST", href: links.hkust },
    { text: " and " },
    { text: "HKUST CSE", href: links.hkustCse },
    { text: ", and currently focused on zero-knowledge systems, cryptographic mechanisms, and strategic questions in decentralized protocols." }
  ],
  cvHighlights: [
    "Research emphasis on zero-knowledge proofs, randomness protocols, and cryptographic mechanisms for decentralized systems.",
    "Publications across CCS, IJCAI, ICBC, OOPSLA, IEEE Blockchain, MARBLE, and ACL.",
    "Supported by the Hong Kong PhD Fellowship Scheme, with experience spanning both theory-oriented and systems-facing work."
  ],
  service: ["Program committee member, MARBLE 2025"],
  publicationNote: [
    { text: "Papers coauthored with " },
    { text: "Amir Goharshady", href: links.amir },
    { text: " follow the theoretical computer science convention of alphabetical author order." }
  ]
});

export type RichTextSegment = z.infer<typeof richTextSegmentSchema>;
export type RichTextBlock = z.infer<typeof richTextBlockSchema>;
export type Profile = typeof profile;
