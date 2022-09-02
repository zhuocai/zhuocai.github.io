---
layout: post
title:  "Publicly Verifiable Secret Sharing"
date:   2022-08-30 20:39:00 +0800
categories: cryptography and blockchain protocol
---

<script type="text/javascript" id="MathJax-script" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
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

Denote this protocol as \\(DLEQ(g_1, h_1, g_2, h_2)\\). It also proves that the prover knows the value of the dicrete log \\(\alpha\\). 

The process can become non-interactive by choosing the challenge \\(c\\) as a cryptographic hash of \\(g_1, h_1, g_2, h_2, a_1, a_2\\). Then a third party can be convinced using the response values \\(a_1, a_2\\). 

## 3. Special PVSS - Share a random secret

Let's recall the problem setting again: a person (called **dealer**) wants to share a secret among \\(n\\) participants. 

### 3.1 Initialization

Public Parameters: the group \\(G_q\\) and the generators \\(g, G\\). 
Each participant \\(P_i\\) has a private key \\(x_i\\) and a corresponding registered public key \\(y_i = G^{x_i}\\). 

The dealer chooses a value \\(s\\), then \\(S=G^s\\) is the secret to share. Right now the dealer cannot choose any value as the secret, but it is easy to do with some simple additional steps. 

### 3.2 First phase: Distribution

The dealer picks a random polynomial of order \\(\le t-1\\), \\( p(x) = \sum_{j=0}^{t-1}\alpha_j x^j \\), with coefficients in \\(\mathbb{Z}_q\\). The \\(s\\) is the \\(\alpha_0\\). 

**Secret Share.** The share for participant \\(P_i\\) is the value \\(G^{p(i)}\\). To make it only readable to \\(P_i\\), encrypt the secret share using \\(P_i\\)'s public key, so the secret share is \\(Y_i = y_i ^ {p(i)} = G^{x_i p(i)}\\). 

**Commitment to the Polynomial.** The dealer must commit to a single polynomial to ensure no equivocation on it (in case the dealer is malicious). The commitments \\(C_j=g^{\alpha_j}\\) for \\(0\le j < t \\) are published. 

**Proof of Secret Share.** Let \\(X_i=\prod_{j=0}^{t-1} C_j^{i^j}\\). The dealer proves the consistency of the secret shares by proving a knowledge of the unique \\(p(i)\\), \\(1 \le i \le n\\), satisfying: 
\\[ X_i = g^{p(i)}, Y_i = y_i^{p(i)} \\]

The \\(n\\) proofs can be composited: choose the challenge \\(c\\) as a cryptographic hash of all \\(X_i, Y_i, a_{1i}, a_{2i}\\). Then the concise proof is \\(c\\) and the \\(n\\) responses \\(r_i\\). 

**Verification of proof.** The verifier (can be a third party) computes \\(X_i\\) from the \\(C_j
\\) values based on the polynomial commitments. Using \\(y_i\\) from public keys, \\(Y_i\\) from secret shares, \\(X_i\\), \\(r_i\\) from share proofs, \\(1\le i \le n\\) and \\(c\\) as input, the verifier computes \\(a_{1i}, a_{2i}\\) as \\( a_{1i}=g^{r_i}X_i^c, a_{2i}=y_i^{r_i}Y_i^c \\). Then he checks that the hash of \\(X_i, Y_i, a_{1i}, a_{2i}\\) matches \\(c\\). 

### 3.3 Second phase: Reconstruction

**Decryption of the shares.** From the encrypted secret share \\(Y_i=G^{p(i) x_i}\\), the participant \\(P_i\\) can compute the secret share using its private key \\(x_i\\) as \\(S_i = Y_i^{1/x_i}\\). They publish the share \\(S_i\\) plus a proof that the decryption is correct. This is done by proving \\(\log_{G}y_i = \log_{S_i}Y_i = x_i\\), without revealing the value \\(x_i\\), which is accommplished by the non-interactive \\(DLEQ(G, y_i, S_i, Y_i)\\). 

**Pooling the shares.** Suppose w.l.o.g. that participants \\(P_1, P_2, \dots, P_t\\) produce corrent shares. The secret \\(G^s\\) is obtained by Lagrange interpolation: 
\\[ \prod_{i=1}^t S_i^{\lambda_i} = \prod_{i=1}^t (G^{p(i)})^{\lambda_i} = G^{\sum_{i=1}^t p(i)\lambda_i}=G^{p(0)} = G^s\\]

## 4. Security Analysis

### 4.1 Security of the share-encryptions
Directly breaking the encryptions of secret shares implies breaking the Diffie-Hellman assumption. Breaking the encryption of the shares amounts to finding \\(G^{p(i)}\\) given \\(g, G, X_i, y_i, Y_i\\), for the group \\(G_q\\). Writing \\(G\\) as \\(g^\alpha\\), \\(X_i=g^\beta\\), \\(y_i=g^\gamma\\), then \\(Y_i=g^{\beta\gamma}\\) and the secret share to break is \\(g^{\alpha\beta}\\). Recall that Diffie-Hellamn assumption states that it is infeasible to compute \\(g^{\alpha\beta}\\) given \\(g^\alpha\\) and \\(g^\beta\\). Even if we provide the extra information of the value of \\(\gamma\\), breaking the secret share is as hard as breaking the Diffie-Hellman assumption. 

### 4.2 Security of pooling shares

**Result:** If a set of \\(t-1\\) participants can obtain the secret by pooling their shares, then we can break the Diffie-Hellman assumption. 

Given \\(g^\alpha\\), \\(g^\beta\\), 


 
