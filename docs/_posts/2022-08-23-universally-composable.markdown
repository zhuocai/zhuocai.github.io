---
layout: post
title:  "Universally Composable Security Framework"
date:   2022-08-23 17:16:52 +0800
categories: cryptography and blockchain protocol
---
This is my note from learning the paper [Universally Composable Security: A New Paradigm for Cryptographic Protocols](https://eprint.iacr.org/2000/067.pdf). Since my current interest in mainly in blockchain protocols, I will mostly discuss what I think is useful for a beginner-level blockchain protocol designer. 

## 1. Introduction

In short, UC is a framework to analyze the security of cryptographic protocols. The security refers to implementing the desired functionality of the protocol. This framework has been used widely in blockchain security analysis, where we expect a rigorous proof that the protocol really implements the blockchain ledger, under complicated real-world setting. 

Security analysis for blockchains is much more complicated than traditional computing systems because: 

* blockchain is a decentralized system, 
* a blockchain has many modules that might interact with each other, 
* blockchain allows dynamic participation, including adversarial attackers, 
* synchronous and secure communication channels might be unavailable. 

The core idea of UC framework is to decompose a complicated protocol to smaller protocols. These small protocols involve fewer parties, span shorter time intervals and realize simpler functionalities, so that their security analysis is much easier. If every sub-protocol can realize its own desired functionality, then the original protocol can also realize its functionality. This is guaranteed by universal composition theorem. 

The UC framework is a general framework for security analysis. Detailed examples include its application to Bitcoin [Bitcoin as a Transaction Ledger: A Composable Treatment](https://eprint.iacr.org/2017/149.pdf), security analysis of Ouroboros protocols. 

## Reference
<ol>
  <li> Universally Composable Security: A New Paradigm for Cryptographic Protocols.  </li>
</ol>