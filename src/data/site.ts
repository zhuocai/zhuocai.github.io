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

const awardSchema = z.object({
  year: z.string(),
  title: z.string(),
  detail: z.string().optional()
});

const educationEntrySchema = z.object({
  period: z.string(),
  institution: z.string(),
  institutionHref: z.string().url().optional(),
  location: z.string(),
  degree: z.string(),
  detail: z.string().optional()
});

const teachingEntrySchema = z.object({
  period: z.string(),
  role: z.enum(["Instructor", "Teaching Assistant"]),
  institution: z.string(),
  institutionHref: z.string().url().optional(),
  course: z.string()
});

const contactItemSchema = z.object({
  label: z.string(),
  value: z.string(),
  href: z.string().optional(),
  note: z.string().optional()
});

const profileSchema = z.object({
  name: z.string(),
  chineseName: z.string().optional(),
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
  publicationNote: richTextBlockSchema,
  awardsAndAchievements: z.array(awardSchema).min(1),
  education: z.array(educationEntrySchema).min(1),
  teaching: z.array(teachingEntrySchema).default([])
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
  chineseName: "蔡卓",
  preferredName: "Joe",
  role: "PhD Student in Computer Science and Engineering",
  institution: "The Hong Kong University of Science and Technology (HKUST)",
  institutionHref: links.hkust,
  email: "zcaiam@connect.ust.hk",
  location: "Hong Kong",
  summary:
    "PhD student building cryptographic and game-theoretic foundations for trustworthy decentralized protocols.",
  hero: {
    eyebrow: "Proof systems, cryptographic coordination, and blockchain mechanism design",
    title: "Building cryptographic and game-theoretic foundations for trustworthy decentralized protocols.",
    intro:
      "My research builds the cryptographic and game-theoretic foundations that make decentralized protocols trustworthy at scale. I work across three directions: (1) proof systems — constructing efficient, updatable SNARKs and lookup arguments for verifiable computation over evolving data; (2) cryptographic coordination protocols — designing bias-resistant, incentive-aware randomness and leader-election protocols secure against strategic manipulation; and (3) blockchain mechanism design — analyzing and repairing transaction ordering and fee mechanisms for modern architectures including DAG consensus, sharded execution, and parallel transaction processing. My work appears at PODC, CCS, IJCAI, OOPSLA, ICBC, and IEEE Blockchain. I am a PhD student at HKUST, supported by the Hong Kong PhD Fellowship (HKPFS), and a former visiting scholar at the University of Oxford.",
    primaryCta: {
      label: "View publications",
      href: "/publications/"
    },
    secondaryCta: {
      label: "Research themes",
      href: "/research/"
    },
    stats: [
      {
        value: "8+",
        label: "research papers"
      },
      {
        value: "3",
        label: "research thrusts"
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
      { text: "My research builds the cryptographic and game-theoretic foundations for trustworthy decentralized protocols, spanning proof systems, cryptographic coordination protocols, and mechanism design for blockchain infrastructure. I am supported by the " },
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
      title: "Proof Systems and Verifiable Computation",
      description:
        "Updatable lookup arguments, verifiable databases, and SNARK constructions for trustworthy outsourced computation over evolving data."
    },
    {
      title: "Cryptographic Coordination Protocols",
      description:
        "Bias-resistant randomness generation, random beacons, and incentive-aware leader-election protocols secure against strategic manipulation in decentralized systems."
    },
    {
      title: "Blockchain Mechanism Design",
      description:
        "Transaction fee mechanism theory for modern architectures — DAG consensus, sharded execution, parallel processing — and strategic equilibrium design via smart contracts."
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
      label: "Fellowship",
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
        { text: " spans proof systems, cryptographic coordination protocols, distributed randomness, and mechanism design for decentralized infrastructure." }
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
    { text: "Based in Hong Kong. " },
    { text: "Hong Kong PhD Fellowship (HKPFS)", href: links.hkpfs },
    { text: " recipient. Visiting scholar at the " },
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
    { text: ", and currently focused on proof systems, cryptographic coordination protocols, and mechanism design for decentralized infrastructure." }
  ],
  cvHighlights: [
    "Research agenda: cryptographic and game-theoretic foundations for trustworthy decentralized protocols — spanning proof systems, cryptographic coordination protocols, and blockchain mechanism design.",
    "Publications across PODC, CCS, IJCAI, ICBC, OOPSLA, IEEE Blockchain, MARBLE, and ACL.",
    "Hong Kong PhD Fellowship (HKPFS) recipient. Young Researcher at the 10th Heidelberg Laureate Forum."
  ],
  service: ["Program committee member, MARBLE 2025"],
  publicationNote: [
    { text: "Papers coauthored with " },
    { text: "Amir Goharshady", href: links.amir },
    { text: " follow the theoretical computer science convention of alphabetical author order." }
  ],
  awardsAndAchievements: [
    { year: "2023", title: "Hong Kong PhD Fellowship" },
    { year: "2023", title: "Young Researcher, 10th Heidelberg Laureate Forum" },
    { year: "2023", title: "Research Travel Grant, HKUST" },
    { year: "2019", title: "Honor of Academic Excellency, Tsinghua University", detail: "Awarded to top 10% students." },
    { year: "2018", title: "Honor of Academic Excellency, Tsinghua University" },
    { year: "2016", title: "1st Level in National High School Mathematics League, the Chinese Mathematical Society", detail: "Ranked within the top 2% in the province of Anhui." }
  ],
  education: [
    {
      period: "July – Oct 2025",
      institution: "University of Oxford",
      institutionHref: links.oxford,
      location: "UK",
      degree: "Visiting Scholar"
    },
    {
      period: "2023 – present",
      institution: "Hong Kong University of Science and Technology",
      institutionHref: links.hkust,
      location: "Hong Kong",
      degree: "PhD in Computer Science and Engineering",
      detail: "Co-supervised by Amir Goharshady and Dimitris Papadopoulos."
    },
    {
      period: "2021 – 2023",
      institution: "Hong Kong University of Science and Technology",
      institutionHref: links.hkust,
      location: "Hong Kong",
      degree: "Master of Philosophy in Computer Science and Engineering",
      detail: "Supervised by Amir Goharshady. GPA: 3.88/4.0."
    },
    {
      period: "2017 – 2021",
      institution: "Tsinghua University",
      institutionHref: links.tsinghua,
      location: "Beijing",
      degree: "Bachelor of Automation",
      detail: "GPA: 3.81/4. GPA Ranking: 17/168."
    },
    {
      period: "2019 Fall",
      institution: "National University of Singapore",
      location: "Singapore",
      degree: "Visiting Undergraduate Researcher",
      detail: "GPA: 4.0/4."
    }
  ],
  teaching: [
    {
      period: "2026 Spring",
      role: "Instructor",
      institution: "ALPACAS Research Group",
      institutionHref: "https://amir.goharshady.com/group",
      course: "Modern Blockchain Consensus"
    },
    {
      period: "2025 Spring, 2026 Spring",
      role: "Teaching Assistant",
      institution: "Hong Kong University of Science and Technology",
      course: "COMP5631: Cryptography and Security"
    },
    {
      period: "2024 Spring",
      role: "Teaching Assistant",
      institution: "Hong Kong University of Science and Technology",
      course: "COMP4541: Blockchains, Cryptocurrencies and Smart Contracts"
    },
    {
      period: "2022 Spring, 2022 Fall",
      role: "Teaching Assistant",
      institution: "Hong Kong University of Science and Technology",
      course: "COMP2012: Object-Oriented Programming and Data Structures"
    }
  ]
});

export type RichTextSegment = z.infer<typeof richTextSegmentSchema>;
export type RichTextBlock = z.infer<typeof richTextBlockSchema>;
export type Profile = typeof profile;
