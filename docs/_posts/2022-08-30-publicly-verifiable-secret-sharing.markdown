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

\\((n, t\)\\)-secret sharing can be realized easily with a polynomial of order \\(t-1\\).  