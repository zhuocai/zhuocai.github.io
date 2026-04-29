import { z } from "zod";

const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.enum(["primary", "prior", "earlier"]),
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
    id: "proof-systems",
    title: "Proof Systems and Verifiable Computation",
    category: "primary",
    period: "Current",
    summary:
      "I study proof systems and cryptographic tools that make outsourced computation and large-scale data queries verifiable — efficiently and without trusting the service provider.",
    narrative:
      "The core challenge is achieving succinct verification while supporting rich query structure and practical update patterns. My work uses updatable lookup arguments and related proof components to bridge theory-heavy ZK ideas with real systems. The Rogue paper (CCS 2026) advances updatable matrix lookup arguments and connects directly to verifiable database applications, pointing toward a broader framework for dynamic SNARKs over evolving state in rollups and verifiable infrastructure.",
    significance:
      "This is the technical core of my research agenda. It points toward cryptographic interfaces that let users trust results from outsourced computation and data services without trusting the provider, a primitive that becomes more important as compute and storage move off-chain.",
    highlights: [
      "Updatable and dynamic lookup arguments for verifiable databases",
      "Bridging ZK proof theory with concrete systems applications",
      "Forward vision: dynamic SNARKs for rollup state transitions and verifiable infrastructure"
    ],
    publicationIds: ["rogue"]
  },
  {
    id: "cryptographic-coordination",
    title: "Cryptographic Coordination Protocols",
    category: "primary",
    period: "2022–present",
    summary:
      "How do strategic participants coordinate without a trusted third party? I study this through bias-resistant randomness generation, fair leader election, and game-theoretic protocol design.",
    narrative:
      "A recurring question in decentralized systems is how to achieve coordination guarantees when every participant is rational and no central authority can be trusted. My work addresses this at the cryptographic and game-theoretic level: from verifiable random functions and secret random number generation to smart-contract protocols that implement richer solution concepts without a trusted mediator. The unifying concern is robustness — bias resistance, incentive compatibility, and fairness — across adversarial and strategic settings. This is also where I study the strategic behavior of validators and miners in proof-of-stake systems, asking when rational participants deviate and how protocol design can close those gaps.",
    significance:
      "This direction connects cryptography, distributed systems, and economics. The goal is not just secure randomness sampling, but coordination mechanisms that remain robust when participants are strategic and incentives diverge from protocol intent.",
    highlights: [
      "Bias-resistant and gas-efficient decentralized random beacons",
      "Leader election without trusted setup or centralized DRNG",
      "Strategic mining analysis in proof-of-stake and its protocol implications"
    ],
    publicationIds: [
      "strategic-mining-proof-of-stake-practical-random-election",
      "srng",
      "gas-efficient-random-beacons",
      "trustless-bias-resistant-randomness",
      "game-theoretic-randomness-proof-of-stake",
      "purelottery"
    ]
  },
  {
    id: "blockchain-mechanism-design",
    title: "Blockchain Mechanism Design",
    category: "primary",
    period: "2024–present",
    summary:
      "What ordering and incentive structures make blockchain protocols work honestly at scale? I study transaction order fairness, fee mechanisms, and strategic equilibrium design for modern decentralized infrastructures.",
    narrative:
      "Real blockchain infrastructure turns transaction ordering into a strategic object: builders can exploit ordering and delay, DAG-based consensus runs concurrent proposers across overlapping transaction sets, and parallel execution engines remove some ordering constraints while introducing new manipulation surfaces via conflict graphs. My PODC brief announcement studies delay-optimal transaction order fairness, while related work asks what fee-mechanism desiderata survive modern architectures and what mechanisms restore incentive compatibility and user welfare. My work on trustless sampling of correlated equilibria extends this to a richer question: how can smart contracts act as trustless mediators implementing solution concepts beyond Nash equilibria?",
    significance:
      "This is the broadest and most forward-looking of my three directions. It addresses strategic design questions that become unavoidable as blockchain infrastructure scales toward DAG, sharded, and parallel execution environments.",
    highlights: [
      "Transaction order fairness and fee mechanisms under multi-block, DAG, and parallel-execution architectures",
      "Smart contracts as trustless mediators for correlated equilibria",
      "MEV and incentive design for next-generation blockchain infrastructure"
    ],
    publicationIds: ["tx-order", "no-tx-fee", "trustless-sampling-correlated-equilibria"]
  },
  {
    id: "smart-contract-analysis",
    title: "Smart Contract Resource Analysis",
    category: "prior",
    period: "2023",
    summary:
      "Prior work on automated static analysis for reasoning about gas consumption in smart contracts before deployment.",
    narrative:
      "Smart contracts need more than correctness — they need predictable resource usage. This track combines formal methods and tool building to automate gas upper-bound synthesis, turning resource-bound reasoning into something practically usable. The Asparagus tool (OOPSLA 2023) synthesizes parametric gas upper bounds for Solidity contracts automatically.",
    significance:
      "This earlier direction contributed a formal-methods lens on blockchain software engineering and informs how I think about protocol-level safety and efficiency tradeoffs in my current work.",
    highlights: [
      "Automated synthesis of parametric gas upper bounds for Solidity",
      "Tool-oriented work with direct implications for contract assurance"
    ],
    publicationIds: ["asparagus"]
  },
  {
    id: "multimodal-learning",
    title: "Multimodal Learning for Scientific Imaging",
    category: "earlier",
    period: "Earlier work",
    summary:
      "Earlier work on vision-language modeling for visual question answering on pathology images.",
    narrative:
      "Before focusing on cryptography and decentralized systems, I worked on multimodal learning problems involving pathology images and language. The central task was scientific VQA in a domain where images are artifacts rather than everyday photographs, raising distinct challenges around representation and evaluation.",
    significance:
      "This work sharpened my interest in principled methods for high-stakes domains and informs how I evaluate modeling assumptions and measure correctness in current research.",
    highlights: [
      "Vision-language modeling applied to pathology images",
      "Scientific VQA at the boundary of machine learning and healthcare"
    ],
    publicationIds: ["pathology-vqa"]
  }
]);

export type Project = (typeof projects)[number];
