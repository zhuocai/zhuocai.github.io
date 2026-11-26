import { z } from "zod";
import { projects, researchIntroduction } from "./projects";

/* SHARED PROFILE EDITING GUIDE
 * Edit the values in export const profile below; the schemas above it describe
 * valid fields and are not page content.
 * - name / chineseName: homepage name; name also supplies the shared site identity.
 * - role / institution / email / quickLinks: homepage sidebar and contact details.
 * - positionContext: the linked position and advisor sentence on the homepage.
 *   Edit text inside each segment; href supplies that segment's link.
 * - summary: homepage description metadata and default page-description metadata.
 *   It is NOT displayed in the visible homepage biography.
 * - hero / bio / affiliations / milestones: retained from an older design;
 *   currently not rendered by the website's pages. Edits here will not appear.
 * - researchAreas: derived from projects.ts. Edit project title / summary there.
 * - cvHighlights: Research highlights on /cv/.
 * - education / teaching / service / awardsAndAchievements: corresponding CV sections.
 * - publicationNote: author-order note on the homepage and publications page.
 * - contact / contactContext: contact-page content.
 * Visible homepage research/biography prose is in src/pages/index.astro, in the
 * home-biography block. Research-page prose is in src/data/projects.ts.
 */

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
        id: z.string(),
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
  // Page-description metadata only. Edit home-biography in index.astro for visible prose.
  summary: "PhD student researching decentralized system security and distributed algorithms, with a focus on blockchains, transaction order fairness, coordination, and verification.",
  // Legacy landing-page fields. The current academic homepage does not render these.
  hero: {
    eyebrow: "hero eyebrow",
    title: "hero title",
    intro: researchIntroduction,
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
        value: "13",
        label: "published and accepted papers"
      },
      {
        value: "3",
        label: "research areas"
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
  // Legacy extended biography: currently not rendered. Homepage prose is in index.astro.
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
      { text: "My current focus is transaction order fairness and distributed consensus, complemented by cryptographic protocols and incentive design. I am supported by the " },
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
  researchAreas: projects
    .filter((project) => project.category === "primary" || project.category === "supporting")
    .map((project) => ({ id: project.id, title: project.title, description: project.summary })),
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
      title: "Transaction order fairness",
      detail: [
        { text: "The PODC 2026 brief announcement and its full version establish feasibility bounds for approximate-order fairness under synchrony, relating transaction receipt times, supporting nodes, and fault tolerance." }
      ],
      href: "/research/#ordering-consensus"
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
        { text: " studies trustworthy decentralized systems through transaction order fairness, consensus, cryptographic protocols, and incentives." }
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
    { text: ", and currently focused on transaction order fairness and distributed consensus, with related work in cryptography and incentive design." }
  ],
  cvHighlights: [
    "Selected work on order fairness (PODC), correlated-equilibrium sampling (IJCAI), updatable lookup arguments (CCS), gas analysis (OOPSLA), and parallel execution (MARBLE).",
    "Published work on democratic block selection and refundable transaction admission (IEEE DAPPS), and game-theoretic distributed randomness (ICBC and MARBLE)."
  ],
  service: [
    "Conference reviewer: The Web Conference (WWW 2027); IEEE BCCA 2026; MARBLE 2025, 2026.",
    "Journal reviewer: Blockchain: Research and Applications, 2026."
  ],
  publicationNote: [
    { text: "Papers coauthored with " },
    { text: "Amir Goharshady", href: links.amir },
    { text: " follow the theoretical computer science convention of alphabetical author order." }
  ],
  awardsAndAchievements: [
    { year: "2023", title: "Hong Kong PhD Fellowship" },
    { year: "2023", title: "Young Researcher, 10th Heidelberg Laureate Forum" }
  ],
  education: [
    {
      period: "2023 – present",
      institution: "Hong Kong University of Science and Technology",
      institutionHref: links.hkust,
      location: "Hong Kong",
      degree: "PhD in Computer Science and Engineering",
      detail: "Advisors: Amir Goharshady and Dimitris Papadopoulos. Expected graduation: July 2027."
    },
    {
      period: "2021 – 2023",
      institution: "Hong Kong University of Science and Technology",
      institutionHref: links.hkust,
      location: "Hong Kong",
      degree: "Master of Philosophy in Computer Science and Engineering"
    },
    {
      period: "2017 – 2021",
      institution: "Tsinghua University",
      institutionHref: links.tsinghua,
      location: "Beijing",
      degree: "Bachelor of Automation"
    },
    {
      period: "July – October 2025",
      institution: "University of Oxford",
      institutionHref: links.oxford,
      location: "UK",
      degree: "Visiting Scholar"
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
