---
title: Statistics
author: Morgan Askins
theme: assets/chalk.css
revealOptions:
  transition: none
  controls: false
  center: false 
  width: 70%
  slideNumber: 'c/t'
---

<!-- .slide: class="center" -->
# Statistics Comparison
## Knoll & PDG
### Morgan Askins

---
## Introduction
All of the plots and examples used here are available on github for review at 
[AStudyInStatistics.git]

The goal here is to understand the various sensitivity metrics we use here and
draw comparisons between them.

- Compare Knoll to PDG
- Show the assumptions required to be compatible
- Confusion Matrix and ROC

[AStudyInStatistics.git]: https://github.com/MorganAskins/AStudyInStatistics.git

---
## Beginning with Knoll
Here we consider the scenario where we can take a background only count to
assess the background levels. We measure $N_T$ (signal + background) and $N_B$
background-only both with equal time. <ins>Asymptotically</ins> this yields 
$$N_S = N_T - N_B$$ 

We will look at two cases: $N=0$ and $N>0$

__Knoll Assumption 1__: $N_T, N_B, N_S$ are normally distributed.

---
## Knoll: As Probabilites
Given that we deal with finite counts we choose a cut-off with low false
positive and low false negative.  We can rewrite this as arbitrary probability
distributions in the finite regime where we denote the measured number of
events as $n$ and the estimator of $N$ as $\hat{N}$.

\begin{equation}
P_S(\nu) = \int_{-\infty}^{\infty}P_T(n)P_B(\nu-n)~dn
\end{equation}

---
## Knoll: Case 1
Background only: Determine an acceptable false positive rate.
$$N_S = 0 \rightarrow N_T=N_B \textrm{  &  } \sigma_T=\sigma_B$$
__Knoll Assumption 2__: We are interested in a false positive rate of 5%,
which spans from $-\infty$

If the background counts are normally distributed
$$P_B(n) = \frac{1}{\sqrt{2\pi\sigma_B^2}}\exp\bigg( \frac{-(n-N_B)^2}{2\sigma_B^2} \bigg) $$

---
## Knoll: Case 1
Since this is background only, then $P_T(n) = P_B(n)$, and
$$P_S(n) = \frac{1}{\sqrt{4\pi\sigma_B^2}}\exp\bigg( \frac{-n^2}{4\sigma_B^2} \bigg) $$
We seek to assign our selection criteria $L_c$ at 5% FP
$$0.95 = \int_{-\infty}^{L_c}P_S(n)~dn$$

---
## Knoll: Case 1
We find a 95% confidence at $L_c \geq 2.326\sigma_B$
<img src="figs/knoll_bkg_selection.svg" class="plain" height=500px />

---
## Side case
Imagine we know our background very well (either through an infinite measurement,
a sideband analysis, or a theoretical prediction).
$$
\lim_{t\to \infty}P_B(x) \rightarrow \delta(x-N_B)
$$
this leads to
$$P_S(n) = \frac{1}{\sqrt{2\pi\sigma_B^2}}\exp\bigg( \frac{-n^2}{2\sigma_B^2} \bigg) $$

---
## Knoll: Case 2
We have now chosen to __fix__ the value at which we claim a signal exists.
Given this value, what is the smallest signal we could see whose false negative
rate $\alpha \leq 5\\% $? Once again perform the convolution, but now with $N_S>0$:
\begin{equation}
P_S(n) = \frac{1}{\sqrt{2\pi(2\sigma_B^2+\sigma_S^2)}}
\exp\bigg( \frac{-(n-N_S)^2}{2(2\sigma_B^2+\sigma_S^2)} \bigg)
\end{equation}
Asymptotically: $\sigma_B^2\rightarrow N_B$, and $\sigma_S^2\rightarrow N_S$

---
## Knoll: Case 2
Once again we must solve
$$0.05 = \int_{-\infty}^{L_c}P_S(n)~dn$$
however, this time $L_c$ is known, and we seek $N_S$, to do this we have options
1. Taylor Expansion: $N_S \geq 4.653\sigma_B + 2.706$
2. Numerical Integration

---
## Knoll: Case 2
Example: $N_B=100$, $L_c=23.261$, $N_S=49.236$

<img src="figs/knoll_sig_selection.svg" class="plain" height=500px />

---
## Time dependence
The implicit assumption was that we measure the background only and sample
for the same period of time. Keeping with this, how does our ability to see
a signal change with sample time?

<div class="container"><div class="col">

How weak of a signal can you see as a function
of time.
\begin{equation}
(s/b) = (4.653\sqrt{bt} + 2.706)/bt
\end{equation}
_multiply by two since we assume equal measurements_
</div><div class="col">
<img src="figs/Knoll_Time.svg" class="plain"/>
</div></div>

---
## Knoll Examining Assumptions

1. Equal time for signal and background.
2. Zero prior knowledge of background.
3. Normally distributed components.
4. Errors are only statistical.

Answers the question: To what minimum signal level am I sensitive to?

Summary notebook can be found here:
<div style="font-size:30px">
<a href="https://github.com/MorganAskins/AStudyInStatistics/blob/master/1_Knoll.ipynb">
https://github.com/MorganAskins/AStudyInStatistics/blob/master/1_Knoll.ipynb
</a>
</div>

---
## PDG: Neyman-Pearson
Probabilities from before still hold, and we can still choose our test statistic
and whether we want to go with Poisson or Gaussian distributed variables. How do
we choose?
> Neyman-Pearson Lemma  
> The likelihood ratio is the uniformly most powerful statistical test for
> a set of statistically independent samples.

We can apply this when testing to reject the null hypothesis when a specific
alternative hypothesis is true.

---
## PDG: Likelihood Ratio
If we assume the same probability distributions as before (normal, background
subtracted), we can write the likelihood as:
$$
\mathcal{L}(N_S|n) = \frac{1}{\sqrt{2\pi(2N_B+N_S)}}
\exp\bigg( \frac{-(n-N_S)^2}{2(2N_B+N_S)} \bigg)
$$
Then the likelihood ratio can be expressed as
$$\lambda(N_S) = \frac{\mathcal{L}(N_S|H_0)}{\mathcal{L}(N_S|H_1)}$$

---
## PDG: Likelihood Ratio
In this case the null hypothesis $H_0$ is when $N_S = 0$, while the alternative
hypothesis is the most likely value of $\hat{N}_S$ given the data. If we then
take the "Asimov" dataset: $\hat{N}_S = N_S$, we find:
<div style="font-size:28px">
$$
\lambda(N_S) = \sqrt{\frac{2N_B+N_S}{2N_B}}\exp\bigg( 
\frac{-(x-N_B)^2}{4N_B}+\frac{(x-N_S-N_B)^2}{2(2N_B+N_S)} \bigg)
$$
</div>

__PDG Assumption I__: Wilk's Theorem (probability is $\chi^2$ distributed,
symmetric errors)

---
## PDG: Wilk's Theorem
Applying Wilk's Theorem one can calculate the experimental sensitivity
$$
Z = \sqrt{-2\ln\lambda(N_S+N_B)}
$$
In our case this yields
$$
Z = \sqrt{\frac{N_S^2}{2N_B} - \ln\frac{2N_B+N_S}{2N_B}}
$$

---
## Applying the Knoll assumptions
1. We can assume $N_S \ll N_B$ and Taylor expand which yields

<div class="container"><div class="col">
$$
Z \simeq \sqrt{\frac{N_S(N_S-1)}{2N_B}}
$$
for $N_T > N_B$
</div><div class="col">
<img src="figs/Knoll_PDG_Time.svg" class="plain" height=500px/>
</div></div>

---
## Outline / Remaining
1. Add time dependence and time array to knoll notebooks.
2. Show generic / time dependence.
3. PDG
4. Extension: Sideband for random coincidence
