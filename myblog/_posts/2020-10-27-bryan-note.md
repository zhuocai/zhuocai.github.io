# Paper Reading

## Paper 1: deep anomaly detection with outlier exposure

Related Work: 

* OOD detection with DNN: deep, pre-trained classifier, with GAN
* utilizing auxiliary datasets: 



OE can help detectors generalize to new text and image anomalies

Supervised Learning helps?



#### Maximum Softmax Probability(MSP)

OOD drawn from various unseen distributions

Fine-tuning with Outlier Exposure? 

Confidence Branch

density estimation: learn a probability density function over th data distribution $D_in$

OE to improve density estimates on low-probability, outlying data





### Conclusion:

training set: D_in^train + D_OE

Test: D_in^test, D_out^test

a bit more data D_OE helps to generalize to unseen outlier data. D_out^test. 

## Paper2: Do Deep Generative Models Know What They Don't Know

My thoughts: Continuous -> Discrete

generative models may assign more probability to test data than training data

The probabilities are not trustable. 



training neural generative models: approximate log-likelihood via sampling

generative models via change of variables: f: X \to Z. Diffeomorphism f's parameter + auxiliary distribution Z's parameter

Z usually fixed as standard Gaussian: optimizing must be done carefully otherwise

Affine coupling layers: transform x by translation and scaling. 



#### Digging Deeper into the flow-based model

Terms: log p(z) + log |Jacobian|

Volume seems to be the cause, but not actually



#### Second Order Analysis

linearizing the difference in expected log-likelihoods



## Paper 3 Glow: generative flow with invertible 1x1 convolution

learning realistic world models, potentially allowing agents to plan in a world model before actual interaction with the world. 

learning meaningful features of the input while requiring little or no human supervision or labeling. 



GLOW: actnorm + invertible 1x1 convolution + affine coupling layers

## paper 4: Contrastive Training for Improved Out-of-Distribution Detection

Confusion Log Probability(CLP): measure the similarity of inlier/outlier dataset pairs. 

Supervised learning not enough. 

OE require access to examples labeled explicitly as OOD

RP relies on the assumption that an unrelated auxiliary task will produce beneficial representations. 



this paper: encourage f to learn as many high-level, task-agnostic, semantic features as possible from the in-distribution dataset. 

Contrastive learning techniques: SimCLR

Density Estimation: 

* encode all features capable of distinguishing between samples rather than only those necessary to discriminate between classes. 
* label smoothing to simplify distribution of the activation

density estimation performed class-wise, over the activations z at the peultimate layer. 

For each class, estimate an n-dim multivariate Gaussian 

Openness score: a difficulty measure based on the number of classes in the training set compared to the number of classes in the test set. Ignores similarity between classes, relative difficulty of detecting different unknown classes. 

MMD with L2 distance kernel can only identify nearly identical images

CLP is based on probability with which a classifier confused outliers with inliers, that has access to outlier samples during training. 

Given D_in, D_out, C_in, C_out. train an ensemble of classifiers, estimate confusion matrix between classes on held-out test data. probability of *x* predicted as class *k*: *c_k(x)* 

CLP of D_test with inlier classes C_in

Hypothesis that scoring with standard Gaussian density estimation benefits significantly from tigher class clusters obetained via label smoothing

## Paper 5: Deep Anomaly Detection Using Geometric Transformations

deep structured energy-based models

energy function: negative log probability

deep autoencoding gaussian mixture model

Wide Residual Network



## Paper 6: Unsupervised Data Augmentation for Consistency Training

the quality of noising, specifically those produced by advanced data augmentation methods, plays a crucial role in semi-supervised learning

consistency training methods simply regularize model predictions to be invariant to small noise applied to either input examples or hidden states. 

Loss = supervised loss + unsupervised loss(invariant to noise injected by improved data augmentation)

#### Theoretical Analysis

* all transformed version of a sample/class forms a fully-connected subgraph, supervised data augmentation use only directly connected neighbors, UNsupervised DA ensures the traversal of the entire subgraph

* More diverse examples, reduced number of components 

prob cannot infer label of new test example given *m* labeled examples: label of new test example does not exist in *m* examples. 

Label -> multiclass classification

## Paper 7: Contrastive Adaptative Network for Unsupervised Domain Adaptation

Unsupervised Domain Adaptation: makes prediction for the target domain data while manual annotations are only available in the source domain. 

**propose Contrastive Adaptation Network(CAN)** optimizing a new metric, explicitly model the intra-class domain discrepancy and the inter-class domain discrepancy. 

Related work - **Long Mingsheng**, Seminal line of work, domain level. Do not discriminate whether samples from two domains should be aligned according to their class labels. 

Different classes may be aligned incorrectly. 

**propose CDD: contrastive domain discrepancy**, established on the difference between *conditional* data distributions across domains. 

Maximum Mean Discrepancy: the difference between two distributions with their mean embeddings in the reproducing kernel Hilbert space. 



Alternatively optimize target label hypothesis(predict the unknown target labels for CDD computation) and the feature representations. 



## Paper 8: AutoAugment, Learning Augmentation Strategies from Data

Use RL(RL for discrete search is not the focus) to search for best augmentation policies(each policy is a stochastic combination of stochastic augmentation with stochastic arguments)

### Paper 8.1: RandAugment

Reduce search space, so as to search on whole dataset instead a reduced dataset. 

Inspiration: 

* PBA find optimal magnitude increase over time -> use fixed magnitude scheduler.  
* data augmentation for density matching improves generalization -> add first-order differentiable term

## Paper 9: (2020) Why Normalizing Flows Fail to Detect Out-of-Distribution Data 2006.08545

* flows learn largely based on local pixel correlations, rather than semantic content
* identify mechanisms, through which flows can simultaneously increase likelihood for all structured images. 
* change coupling layers, encourage flows to learn transformations specific to the target data
* OOD detection is improved when flows are trained on high-level features which contain semantic information extracted from image datasets. 

inductive biases needed for OOD detection? what objects are presented in the data. 

flows have capacity to distinguish datasets



coupling layer co-adaptation



changing biases: 

* changing masking strategy: cycle-mask: infomation about a part of the image has to travel through three coupling layers before it can be used to update the same part of the image. 



## Paper 10: Neural Architecture Search with Reinforcement Learning 2016

Use RNN to generate settings/hyperparameters of neural networks. 

Trained using Policy Gradient, using val acc of child network as reward. 



## Paper 11: Practical bayesian optimization of machine learning algorithms

Don't understand Bayesian Optimization. Read some blog first:

#### blog on *beyesian optimization*: http://krasserm.github.io/2018/03/21/bayesian-optimization/

**Aim to describe the theory and implementation. Not very accessible. **

Bayesian optimization techniques: find global optimum in a minumum number of steps. 

* Incoporate belief about $f$, prior
* update prior with samples drawn from $f$ to get a posterior
* *surrogate model* to approximate objective function
* *acquisition function* directs sampling to areas where an improvement over the current best observation is likely. 

**Surrograte model**: Gaussian processes (not familiar, read a blog on it)

**Acquisition functions**: proposing sampling points, exploitation high objective and exploring high uncertainty. 

$x_t = \mathrm{argmax}_x u(x|D_{1:t-1})$, $u$ acquisition function and $D_i = (x_i, y_i)$ sampled by $f$. 

Popular choice of acquisition functions: *maximum probability of improvement(MPI)*,*expected improvement(EI)*, *upper confidence bound(UCB)*. 

Optimizing algorithm: 

* find $x_t$ by  $x_t = \mathrm{argmax}_x u(x|D_{1:t-1})$
* obtain a possibly noisy sample $y_t=f(x_t)+\epsilon_t$ from $f$
* add sample to $D_{1:t}$, update the GP

*Expected Improvement*: $EI(x)=E(\max(f(x)-f(x^+)))$

$f(x^+)$ is the value of the best sample so far in $D_{1:t}$. 

Evaluate *EI*: using $\mu(x)$ and $\sigma(x)$ 

![image-20201027222343735](/Users/caizhuo/Documents/papers/bryan/note_with_Bryan.assets/image-20201027222343735.png)

#### Another blog on Bayesian Optimization: https://distill.pub/2020/bayesian-optimization/

**More high level ideas clearly explained. **Distill is a very good website for peer reviewed well explained machine learning articles. 

**Active learning**/bayesian optimization

Reduce uncertainty/ balance between high value and high uncertainty. -> acquisition function. 



#### Blog on *Gaussian Processes*: http://krasserm.github.io/2018/03/19/gaussian-processes/

 Gaussian processes as a non-parametric ml method. 

GP infer a distribution over functions directly without infering a distribution over the parameters of a parametric function. 

**Def**: GP is a random process $f$: $x\in R^d \mapsto R$, where joint distribution of a finite number of these variables $p(f(x_1), \dots, f(x_N))$ is Gaussian: $p(f|X)=\mathcal{N}(f|\mu, K)$. $K_{ij}=k(x_i, x_j)$ usually Gassuian/RBF kernel with some parameters. 

Prior to posterior with observation of samples: $p(f|X) \to p(f|X, y)$

Make predictions based on posterior predictive distribution: 

$p(f_\star| X_\star, X, y)=\int p(f_\star|X_\star, f)p(f|X,y)\mathrm{d}f$

$=\mathcal{N}(f_\star|\mu_\star, \Sigma_\star)$

By definition of GP: 

$$(\matrix{y\\ f_\star}) \sim \mathcal{N} (0, (\matrix{K_y,K_\star\\ K_\star^T,K_{\star\star}}))$$

calculate $\mu_\star$ and $\Sigma_\star$ from this. 

**Still puzzled**: needs some more: 

# talk

### talk July 16, 2020

Theoretically 

Most theoretically: theoretical

Graph neural networks: graph structure data

Normalizing flows cannot reduce dimension

Ordering dimensions based on importance

Molecule

Graph NN can’t be too deep 2-3 layers only

Combine irrelevant information. Over smoothing

Normalization

Overfitting

Vanishing gradient





Contrastive learning anomaly detection

Data: image/traditional data. 

Specially designed for 

ImageNet-C

MNIST-C



Normalizing flows -> likelihood



flow++, NL more computationally expensive

NL has likelihood, 

### email July 17, 2020

Hi Zhuo,

Here is another relevant reference for the contrastive learning topic, and also some ideas I was thinking about. The ideas are not fully fleshed out but more like brainstorming, but we can gradually think and discuss and fix one idea (whether these or a different one). You can also feel free to come up with your own ideas if you like.

[1] https://arxiv.org/pdf/2007.05566v1.pdf

This is an interesting work, but one limitation I see is in the choice of transformations - it makes the implicit assumption that the transformations should not affect an image semantically (in case you’re wondering, “semantically” refers to the “meaning” of an image, i.e. the characteristics relevant for distinguishing images of various classes, or for distinguishing in-distribution vs out-of-distribution images). However, the transformations themselves are more or less arbitrarily (or heuristically) chosen, so this assumption may not always be reasonable. Interestingly, there are competing approaches e.g. [2] https://arxiv.org/pdf/1805.10917.pdf that also applies geometric transformations, but uses an “opposite” approach of trying to distinguish the transformations from one another, so this suggests that the transformations shouldn’t be assumed to necessarily have no semantic effects. 

Ideas:

\- Improved data augmentation: [1] is more or less a data augmentation method (in particular, it is similar to “unsupervised data augmentation”, e.g. see https://arxiv.org/abs/1904.12848.) Recently, more advanced data augmentation techniques have been developed which try to “train” the data augmentation, e.g. AutoAugment (https://arxiv.org/abs/1805.09501, and a simpler version RandAugment, https://arxiv.org/pdf/1909.13719.pdf). In our case, it also makes sense to train the augmentation transformation - e.g. by evaluating how well the resulting model is ability to separate the various classes from one another (ideally on some held-out data). There is also the option of using these improved data augmentation ideas to improve [2] instead of [1]. 

\- Unsupervised domain adaptation: [1] learns a single common representation space, that is shared by the 2 transformations. However, since the transformations may have significant impact on the image semantics, it may be more appropriate to use approaches based on domain adaptation (https://openaccess.thecvf.com/content_CVPR_2019/papers/Kang_Contrastive_Adaptation_Network_for_Unsupervised_Domain_Adaptation_CVPR_2019_paper.pdf). Domain adaptation tries to “align” two domains (“source” and “target”) into a common representation space. Similarly, in our case, we would like to “align” the various domains (corresponding to different transformations applied to each image) with one another, and learn neural networks that map them into a common representation space. 

Cheers,

Bryan

### Email on July 28, 2020

Hi Zhuo,

Thanks for the detailed thoughts. No worries about the timeline, that’s totally fine.

About the idea you suggested, I totally agree, though the challenging part is how to how to evaluate how much semantics are being preserved by various augmentation transformations. Maybe this can also be combined with the ideas I suggested below: for the first idea, the goal is to learn which augmentations are more useful (i.e. preserving semantics) better than others. And to explain the second (domain adaptation) idea more: I was thinking that while [1] assumes that the augmentations should have completely no effect on the representation, we instead want to use a representation space that jointly models the representations of each image, while also modelling the effect of each data augmentation transformation, which correspond to transformations in this space. We can discuss in detail next time.

BTW, about *Do Deep Generative Models Know What They Don't Know*, there have been various explanations for this observation but in my opinion the most convincing reason is the likelihood score in most generative models primarily measures the model’s ability to exploit low-level statistical correlations (e.g. nearby pixels are correlated in certain predictable ways), rather than its ability to understand the images semantically. So, when OOD data is fed to a trained model, even though this OOD data is semantically very different from the original data, the OOD data could have low-level statistical characteristics that cause it to be assigned higher likelihoods than the original data (e.g. the OOD data being smoother than the original data). You can see https://arxiv.org/abs/2006.08545 for a more detailed explanation.

This suggests that contrastive learning, by learning representations that better capture semantic properties rather than statistical correlations, can be a good way of improving OOD performance and fixing these problematic OOD observations. Hence, it is quite reasonable to expect that incorporating contrastive learning (whether using any of the ideas we suggested) should learn more semantically useful representations and thus improve OOD performance. So we can also test this in experiments later on.

Cheers,

Bryan

