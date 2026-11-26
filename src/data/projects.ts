import { z } from "zod";

/* RESEARCH TEXT EDITING GUIDE
 * researchIntroduction -> opening paragraph on /research/.
 * researchVision -> the short, general closing paragraph on /research/.
 * For each project:
 *   title / summary -> research heading and homepage research-area preview.
 *   paragraphs -> the area's scientific motivation, before the paper accounts.
 *   papers -> selected public results, with a website account of each contribution.
 *     publicationId refers to a filename in src/content/publications/.
 *     description is shown only on /research/; the homepage uses the publication's
 *     shorter summary. An optional anchorId preserves an older section link.
 *   category -> primary/supporting areas or the small earlier-work section.
 * Keep established area ids when revising prose: homepage links use them.
 * Explain released results here. Keep unpublished constructions, manuscript
 * details, and specific future projects in the gitignored research registry.
 */

const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.enum(["primary", "supporting", "earlier"]),
  summary: z.string(),
  paragraphs: z.array(z.string()).min(1),
  papers: z.array(z.object({
    publicationId: z.string(),
    description: z.string(),
    anchorId: z.string().optional()
  }))
});

export const researchIntroduction =
  "My research concerns decentralized system security and distributed algorithms, with a focus on blockchains. I study how protocols can protect transaction order, support fair randomized selection, and enable verifiable coordination among mutually distrustful participants. I combine distributed computing, game theory, cryptography, and verification to turn these goals into precise protocol guarantees.";

export const researchVision =
  "My broader goal is to develop decentralized systems with rigorous guarantees for security, fairness, and participation. I am interested in how communication networks, cryptographic tools, and economic incentives shape those guarantees, and how theory can guide practical protocol design.";

export const projects = z.array(projectSchema).parse([
  {
    id: "ordering-consensus",
    title: "Transaction Order Fairness and Consensus",
    category: "primary",
    summary: "Establishing when protocols can protect transaction precedence and how participants can influence collective block selection.",
    paragraphs: [
      "Transaction order affects the outcomes users receive from a blockchain. A participant who can place a trade before another user's transaction may profit at that user's expense. Different nodes receive transactions at different times, so protecting precedence requires a rule for reconciling their observations in the presence of malicious participants.",
      "My work establishes which ordering protections distributed algorithms can enforce under explicit timing and fault assumptions. I also study how consensus can incorporate participants' preferences about block contents, giving collective decisions a precise protocol guarantee."
    ],
    papers: [
      {
        publicationId: "tx-order",
        description: "I study approximate-order fairness: one transaction must precede another when sufficiently many nodes receive it sufficiently earlier. Using physical clocks and bounded communication delay, I derive feasibility bounds relating the protected time gap, the supporting fraction of nodes, and the number of faulty participants. These bounds establish when strict pairwise protection is achievable, including gaps smaller than the worst-case dissemination delay."
      },
      {
        publicationId: "proof-of-election",
        description: "In Proof of Election, I developed a protocol for collective block selection through stake-weighted voting. Participants can support multiple candidate blocks, and their support constrains which block consensus may accept. Assuming bounded communication delay, the analysis establishes agreement, progress, and a democracy guarantee for candidates delivered to the committee, with proofs checked by the Coq proof assistant. This provides a foundation for expressing community preferences directly in block selection."
      }
    ]
  },
  {
    id: "incentives-resources",
    title: "Randomness, Coordination, and Incentives",
    category: "supporting",
    summary: "Designing incentives for unbiased selection, private coordination, transaction admission, and efficient execution.",
    paragraphs: [
      "Decentralized protocols depend on choices made by participants with their own objectives. My work combines game theory with cryptographic protocols to make random selection and coordination possible without a trusted intermediary, and to connect transaction access and resource use to explicit economic incentives."
    ],
    papers: [
      {
        publicationId: "game-theoretic-randomness-proof-of-stake",
        description: "I developed a game whose equilibrium has every participant sample uniformly: each participant's strategy is a best response to the others. I translated it into distributed protocols using commitments that bind participants to hidden choices before revelation, together with mechanisms for recovering withheld contributions. Under these equilibrium strategies, the resulting uniform randomness supports fair selection, including stake-proportional leader selection. Related published work studies direct leader election and other forms of distributed randomness."
      },
      {
        publicationId: "trustless-sampling-correlated-equilibria",
        description: "A correlated equilibrium gives players private recommendations that each has an incentive to follow when the others do. I formulated the problem of sampling these recommendations without a trusted mediator and designed smart-contract protocols for two-player games. Cryptographic tools protect the recommendations, while collateral and penalties support participation. The work establishes private, incentive-compatible coordination in the stated game model."
      },
      {
        publicationId: "no-tx-fee",
        description: "In LockFee, I developed transaction admission through temporarily locked collateral whose principal is returned after a prescribed duration. Users bear the opportunity cost of committed capital. Under an equal-size transaction model, I derive conditions linking collateral, lock duration, and system capacity to resistance against sustained capacity-exhaustion attacks. This connects transaction access to refundable resource commitments and explicit economic costs."
      },
      {
        publicationId: "parallel-execution-marble",
        description: "In this collaborative work, we make a verifiable parallel execution schedule part of a block proposal. Validators check that the schedule respects transaction dependencies, and the reward accounts for both transaction inclusion and completion time. The analysis identifies incentives for using parallel hardware effectively while accounting for strategic transaction exclusion in the model."
      }
    ]
  },
  {
    id: "cryptographic-protocols",
    title: "Cryptographic Proofs and Program Verification",
    category: "supporting",
    summary: "Making computation verifiable through cryptographic proofs and sound analysis of smart-contract execution costs.",
    paragraphs: [
      "Participants need ways to check computation and understand its resource requirements. My work addresses these questions through cryptographic proofs for changing data and automated verification of smart-contract execution costs. Each approach provides a concrete guarantee that a user or another system can check."
    ],
    papers: [
      {
        publicationId: "rogue",
        description: "A lookup argument proves that queried values belong to committed data. Rogue develops updatable matrix lookup arguments for verifiable databases, addressing the cost of maintaining proof-related data structures when tables change. I implemented algorithms and evaluated their performance as part of the collaborative work, connecting the cryptographic construction to practical queries and updates."
      },
      {
        publicationId: "asparagus",
        anchorId: "smart-contract-analysis",
        description: "Gas measures the execution resources charged by a smart-contract platform. In Asparagus, I developed algebraic verification methods for synthesizing sound upper bounds on gas consumption that depend on program inputs. The method applies to programs whose state updates are polynomial expressions. On the 10,186-function comparison dataset, Asparagus analyzed 86.94% of functions, compared with GASTAP's 58.62%. These bounds help users estimate execution requirements and allocate resources for smart-contract applications."
      }
    ]
  },
  {
    id: "multimodal-learning",
    title: "Earlier Work in Multimodal Learning",
    category: "earlier",
    summary: "Visual question answering on pathology images.",
    paragraphs: [
      "Before focusing on decentralized systems, I worked on visual question answering for pathology images. This collaboration studied how models can answer questions using medical images and associated text."
    ],
    papers: [{ publicationId: "pathology-vqa", description: "" }]
  }
]);

export type Project = (typeof projects)[number];
