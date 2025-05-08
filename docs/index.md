---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---


I am currently a PhD student in Computer Science and Engineering in the Hong Kong University of Science and Technology (HKUST). I am proud to be co-advised by two great advisors, [Amir Goharshady](https://amir.goharshady.com) (now an associate professor in the University of Oxford) and [Dimitris Papadopoulos](https://www.cse.ust.hk/~dipapado/index.html). My research is generously supported by the Hong Kong PhD Fellowship Scheme (HKPFS). I am interested in the intersection of applied cryptography (especially on zkSNARKs and MPC), game theory and blockchains. 

Before starting PhD, I was a MPhil in the Amir's group during 2021~2023. Before coming to HKUST, I received my Bechalor's degree in Automation from Tsinghua University in 2021. 

<figure>
    <img src="images/eiffel-night.jpg" 
        width="220" height="400"
        style="float: right"
         alt="I Am Beautiful">
</figure>


# Publication 

Check my [Google scholar profile](https://scholar.google.com/citations?user=1rGe9XMAAAAJ&hl=en). 

Note: My advisor Amir Goharshady adopts the convention from theoretical computer science to order authors in <u>alphabetical</u> order. This applies to all of my publications with 'Goharshady, A.'. 

## 2025 
<ul>
    <li>
    <p> (IJCAI'2025) Barakbayeva, T., <strong>Cai, Z.</strong>,  Goharshady, A. & Keypoor K.  Smart Contracts for Trustless Sampling of Correlated Equilibria. 
    </p>
    </li>
</ul>
## 2024

<ul>
    <li>
        <p>(ICBC'2024) Barakbayeva T.,  <strong>Cai, Z.</strong>, & Goharshady, A. SRNG: An efficient decentralized approach for secret random number generation. 
        <a href="https://hal.science/hal-04518059/document">hal</a>
        </p>
    </li>
    <li>
        <p>(ICBC'2024) Abidha V., Barakbayeva T., <strong>Cai, Z.</strong>, & Goharshady, A. Gas-efficient decentralized random beacons. 
        <a href="https://hal.science/hal-04518100/document">hal</a>
        </p>
    </li>
</ul>


## 2023

<ul>
    <li>
        <p>(ICBC'2023) <strong>Cai, Z.</strong>, & Goharshady, A. Trustless and bias-resistant game-theoretic distributed randomness. 
        <a href="https://ieeexplore.ieee.org/document/10174917">paper </a>
        <a href="https://hal.science/hal-04268410/document">hal</a>
        </p>
    </li>
    <li>
        <p>(MARBLE'2023) <strong>Cai, Z.</strong>, & Goharshady, A. Game-theoretic Randomness for Proof-of-Stake. 
        <a href="https://link.springer.com/chapter/10.1007/978-3-031-48731-6_2">paper</a>
        <a href="https://hal.science/hal-04213085/document">hal</a>
        </p>
    </li>
    <li>
        <p>(OOPSLA'2023) <strong>Cai, Z.</strong>, Farokhnia, S., Goharshady, A., & Hitarth, S. Asparagus: Automated Synthesis of Parametric Gas Upper-Bounds for Smart Contracts. 
        <a href="https://dl.acm.org/doi/10.1145/3622829">paper</a>
        <a href="https://github.com/zhuocai/Asparagus/">code</a>
        </p>
    </li>
    <li>
        <p>(IEEE Blockchain'2023) Ballweg, J., <strong>Cai, Z.</strong>, & Goharshady, A. PureLottery: Fair Leader Election Without Decentralized Random Number Generation. <a href="https://hal.science/hal-04268058v1/file/paper.pdf">hal</a>
        <a href="https://zenodo.org/records/10716465">code</a></p>
    </li>
</ul>

## 2021

<ul>
    <li>
        <p>(ACL'2021) He, X.<sup>*</sup>, <strong>Cai, Z.</strong><sup>*</sup>, Wei, W., Zhang, Y., Mou, L., Xing, E., & Xie, P. Towards Visual Question Answering on Pathology Images. <a href="https://aclanthology.org/2021.acl-short.90">ACL</a></p>
    </li>
    
</ul>


## Miscellaneous Experience
### Academic Service
<ul>
    <li> <p> I served on the program committee of MARBLE'2025.  </p>
    </li>
</ul>

# Research
My interest in research broadly spreads in multiple areas of computer science. An ideal research project for me looks like the following: (1) evaluation is based on mathematics or can be explained deterministically, (an example of contrary is deep learning, where an algorithm is evaluated by a dataset and researchers generally cannot predict/explain the performance of an algorithm by its design choice), (2) the project directly solves an important real-world problem or provides a tool that can help other people solving real problems, (modern mathematic research might help solve problems in the future, but that day in future looks too far away), (3) I spend more time in designing a solution than its implementation and evaluation, (4) I am the only person that tries to solve the problem or I have only few strong competitors to beat. 

## Directions
### Zero-knowledge proofs and SNARKs
I am currently developing efficient verifiable computation solutions for database and blockchain applications based on lookup arguments. Looking forward, I am motivated to bring down the time/memory overhead of verifiable computation to enable large-scale applications. 

### Blockchain and Distributed Systems
At first glance, consensus in distributed systems might look trivial. After thinking about it once more, it becomes confusing. This feature is probably unique across all research fields. I am designing blockchain protocols with nice properties such as concurrency and democracy. 

### Formal Analysis of Distributed Systems
Checking the correctness of a protocol in distributed systems is harder than checking a sequential algorithm. I wrote a Coq proof to formally prove the correctness of a blockchain consensus protocol designed by myself. It is meaningful to automate the procedure of generating similar machine checkable proofs, possibly by modularizng the design of distributed protocols. 

### Economics of Blockchain
Blockchain introduces cryptocurrency, which adds economics to distributed systems. (1) By designing proper incentives, we can relax of assumption of honesty (follow the prescribed protocol selflessly) to rationality (selfishly maximizing their own interests) in distributed protocols, such as the random number generation protocol. (2) Miners want to maximize their revenues, even through deviating from the protocol such as hiding/delaying their block proposals. (3) With consensus and economic factors, games can be played on blockchain among participants that do not trust each other. 

### Program Analysis in Blockchain Smart Contracts
Ethereum smart contracts cause transaction fees (gas) for consuming computational resources. I designed a tool called Asparagus to estimate an parametric expression (supporting non-linear expression) of the gas cost in complicated contracts, e.g., contracts that contain loops and variable-length operations. 
