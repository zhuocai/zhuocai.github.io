---
layout: post
title:  "Publicly Verifiable Secret Sharing"
date:   2022-08-30 20:39:00 +0800
categories: cryptography and blockchain protocol
---

<script type="text/javascript"
  src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>

Publicly verifiable secret sharing is an interesting cryptography application in multi-party communication. In proof-of-stake blockchain protocols, PVSS can be used to generate decentralized randomness and achieve consensus. 

In this post, I will introduce the [A Simple Publicly Verifiable Secret Sharing Scheme and Its Application to Electronic](https://dl.acm.org/doi/10.5555/646764.703956) construction of PVSS. At the time of writing, I am especially interested in the communication assumptions and its security guarantees. 

## 1. Introduction
Publicly verifiable secret sharing (PVSS) is a task to distribute shares of a secret among a group of \\(n\\) participants, such that any set of at least \\(t\\) participants can collaborate to reconstruct the secret. The distribution phase and reconstrution phase are both publicly verifiable. In detail, anyone can verify the correctness of each share of the secret without learning the secret itself. Anyone can verify the correctness of the values submitted by each participant to resonstruct the values without learning the secret share itself. 

\\((n, t\)\\)-secret sharing can be realized easily with a polynomial of order \\(\le t-1\\).  The **dealer** who wants to release a secret \\(s\\) can choose a random polynomial function \\(f\\) such that the order is \\(\le t-1\\) and \\(f(0)=s\\). Then the secret share for party \\(i\\) is \\(f(i)\\). Any set of at least \\(t\\) shares can reconstruct the polynomial function, particularly the value \\(f(0)=s\\). 

In this basic scheme, we assume all the parties follow the protocol honestly. There can be adversarial parties so that all the parties cannot trust each other. It is then desirable to be able to verify the correctness of the shares from the dealer and the participants. It is tricky because the dealer cannot prove the correctness of the secret shares by revealing the secret itself, otherwise it is not a secret anymore. The solution uses the idea of zero knowledge proof. 

## 2. Discrete-log based zero knowledge proof

Consider the problem that a prover wants to prove to a verifier that \\(\log_{g_1}h_1 = \log_{g_2}h_2\\), without revealing the value of the discrete logarithm. \\(g_1, h_1, g_2, h_2\\) are generators in a group \\(G_q\\). They are known to both the prover and the verifier, while the value \\(\alpha (=\log_{g_1}h_1 = \log_{g_2}h_2)\\) is only known to the prover. The proof between the prover and the verifier consists of the following interacting steps: 
* Prover sends to Verifier: \\(a_1(=g_1^{w}), a_2(=g_2^{w})\\). \\(w\\) is chosen randomly from \\(\mathbb{Z}_q\\) and kept secret by the prover. 
* Verifier sends to Prover: a random challenge \\(c\\) from \\( \mathbb{Z}_q \\). 
* Prover sends to Verifier: \\( r=w-\alpha c (\text{mod }q) \\). 
* The verifier checks that \\( a_1 = g_1^r h_1^c\\) and \\( a_2=g_2^r h_2^c \\). 

