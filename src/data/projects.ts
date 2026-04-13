import { z } from "zod";

const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  period: z.string(),
  summary: z.string(),
  narrative: z.string(),
  significance: z.string(),
  highlights: z.array(z.string()).min(1),
  publicationIds: z.array(z.string()).min(1)
});

const projectsSchema = z.array(projectSchema);

export const projects = projectsSchema.parse([
  {
    id: "verifiable-computation",
    title: "Verifiable Computation and Database Arguments",
    period: "Current",
    summary:
      "I study proof systems and related cryptographic tools that make outsourced computation and large-scale data queries verifiable without sacrificing efficiency.",
    narrative:
      "This line of work focuses on the proof-system machinery needed to make large computations and database queries trustworthy. The core challenge is to preserve succinct verification while still supporting rich query structure and practical update patterns. My work in this area uses lookup arguments and related proof components to bridge theory-heavy zero-knowledge ideas with settings closer to real systems.",
    significance:
      "The payoff is broader than a single paper: it points toward cryptographic interfaces that let users trust results from outsourced computation and data services without trusting the service provider itself.",
    highlights: [
      "Lookup arguments and proof-system components for verifiable databases",
      "Bridging theoretical proof techniques with concrete systems applications",
      "Cryptographic abstractions that support trustworthy data access at scale"
    ],
    publicationIds: ["rogue"]
  },
  {
    id: "decentralized-randomness",
    title: "Randomness, Leader Election, and Strategic Coordination",
    period: "2023-present",
    summary:
      "A major thread of my research focuses on distributed randomness, fair leader election, and strategic behavior in blockchain protocols.",
    narrative:
      "A recurring question in blockchain systems is how to coordinate strategic participants when no central authority can be trusted. My work studies this through randomness generation, leader election, and game-theoretic mechanism design. The technical angle ranges from bias-resistant random beacons to smart-contract protocols that implement richer solution concepts such as correlated equilibria without relying on a trusted mediator.",
    significance:
      "This theme connects cryptography, distributed systems, and economics: the goal is not just to sample randomness securely, but to design coordination mechanisms that remain robust when participants are strategic and incentives matter.",
    highlights: [
      "Bias-resistant and decentralized randomness generation",
      "Random beacons and leader election without trusted setup",
      "Mechanism design for equilibrium-oriented blockchain interactions"
    ],
    publicationIds: [
      "strategic-mining-proof-of-stake-practical-random-election",
      "trustless-sampling-correlated-equilibria",
      "srng",
      "gas-efficient-random-beacons",
      "trustless-bias-resistant-randomness",
      "game-theoretic-randomness-proof-of-stake",
      "purelottery"
    ]
  },
  {
    id: "smart-contract-analysis",
    title: "Smart Contract Analysis and Cost Reasoning",
    period: "2023",
    summary:
      "I work on static and automated reasoning techniques that make smart-contract behavior easier to analyze before deployment.",
    narrative:
      "Smart contracts need more than correctness; they need predictable resource usage and deployable tooling. This track focuses on static reasoning about gas consumption and contract behavior before deployment. The work combines formal methods with tool building, aiming to turn upper-bound reasoning into something automated enough to be useful in practice.",
    significance:
      "The broader aim is to make blockchain software engineering more analyzable and less guess-driven, especially when execution costs and resource bounds directly affect security and usability.",
    highlights: [
      "Automated synthesis of gas upper bounds",
      "Tool-oriented work with practical implications for contract assurance",
      "A formal-methods lens on blockchain software engineering"
    ],
    publicationIds: ["asparagus"]
  },
  {
    id: "multimodal-learning",
    title: "Multimodal Learning for Scientific and Medical Imaging",
    period: "Earlier work",
    summary:
      "My earlier research included multimodal learning methods for visual question answering on pathology images.",
    narrative:
      "Before focusing fully on cryptography and blockchains, I worked on multimodal learning problems involving pathology images and language. The central task was visual question answering in a domain where images are scientific artifacts rather than everyday photographs, which raises different challenges around representation and evaluation.",
    significance:
      "This work sharpened my interest in building technically grounded systems for specialized, high-stakes settings, and it still informs how I think about modeling assumptions and evaluation quality.",
    highlights: [
      "Vision-language modeling for scientific images",
      "Task design at the boundary of machine learning and healthcare",
      "Applied ML experience that informs my later systems and security work"
    ],
    publicationIds: ["pathology-vqa"]
  }
]);

export type Project = (typeof projects)[number];
