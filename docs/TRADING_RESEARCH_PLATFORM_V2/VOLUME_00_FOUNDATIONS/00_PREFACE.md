# TRADING RESEARCH PLATFORM V2
## Volume 0 — Foundations

> The goal of this document is not to describe a trading bot.
> The goal is to define the scientific and engineering foundations of a quantitative research laboratory.

---

# 0. Preface

The Trading Research Platform V2 (TRP V2) exists to transform market observations into reproducible quantitative knowledge.

It is not designed primarily to emit buy or sell orders.
It is not designed primarily to maximize the win rate.
It is not designed primarily to produce pretty charts or attractive backtests.

It is designed to answer a more difficult question:

> **Does a given market pattern, under explicit conditions, produce a persistent edge after costs, over time, and across regimes?**

The answer to that question must be discovered scientifically, documented rigorously, and stored permanently.

TRP V2 is therefore a research system first, and a trading system only as a downstream consequence of validated research.

## 0.1 Why this document exists

The first version of the project (V1) already established important foundations:

- structured data acquisition from Binance-derived market data,
- indicator computation and voting logic,
- confluence-based strategies,
- strategy catalogues stored as data,
- brute and capital backtests,
- walk-forward and placebo validation,
- MAE analysis and risk management,
- paper trading and journaling,
- a research workflow built around combinations, associations, and ranking.

These achievements are valuable and must not be discarded.
However, V1 remains centered around a specific working philosophy:

> indicators produce votes, votes produce confluence, confluence produces a trading state.

That philosophy is useful, but it is not sufficient for a true quantitative research laboratory.

TRP V2 expands the scope from “strategy execution” to “strategy discovery, validation, explanation, and lifecycle management”.

## 0.2 The core ambition

The ambition of TRP V2 is to create an engineering environment where a researcher can:

1. formulate a hypothesis,
2. translate it into a machine-readable experiment,
3. run the experiment on one or more assets and timeframes,
4. validate the result scientifically,
5. classify the result according to robust criteria,
6. preserve the full research trace,
7. compare it with alternative hypotheses,
8. and revisit it later under new market regimes.

A strategy that cannot be reproduced is not a strategy.
A result that cannot be validated is not a result.
A signal that cannot be explained is not yet knowledge.

## 0.3 What TRP V2 is

TRP V2 is a quantitative research platform with the following properties:

- it is modular,
- it is reproducible,
- it is auditable,
- it is statistically disciplined,
- it is versioned,
- it is extensible,
- it is compatible with the existing V1 architecture,
- it preserves the history of all experiments,
- it can ingest ideas from code, papers, GitHub repositories, and human observations,
- it separates research from execution,
- it treats every strategy as a testable object.

## 0.4 What TRP V2 is not

TRP V2 is not:

- a black-box AI that guesses price direction,
- a single monolithic trading robot,
- a collection of notebooks without governance,
- a backtest that is assumed to be proof,
- a signal factory without validation,
- a strategy selector based only on past profit.

Those tools may exist inside the platform, but they are not the definition of the platform.

## 0.5 The scientific stance

The platform adopts a falsification-oriented stance.

Every research artifact must be considered as a hypothesis until proven otherwise.
A profitable in-sample result is not enough.
A strategy must survive multiple forms of stress:

- out-of-sample testing,
- walk-forward validation,
- placebo/permutation tests,
- slippage and fee sensitivity,
- regime shifts,
- cross-asset comparison,
- cross-timeframe comparison,
- parameter perturbation.

A hypothesis is useful only if it remains meaningful after these tests.

## 0.6 The engineering stance

The platform adopts a software engineering stance suitable for long-term research:

- each module has a single responsibility,
- all interfaces are explicit,
- all data transformations are traceable,
- all decisions are logged,
- all experiments are reproducible,
- all computations are deterministic unless randomness is explicitly declared,
- all randomness must be seeded and tracked,
- all outputs must be versioned,
- all research artifacts must be discoverable later.

## 0.7 Relationship with V1

V1 is not a prototype to throw away.
It is the current operational base.

TRP V2 must therefore:

- reuse stable and proven components of V1 when appropriate,
- wrap or isolate components that are still useful but conceptually limited,
- replace only what blocks scientific research or long-term maintainability,
- preserve historical research outputs,
- retain backwards compatibility where practical.

The V1 documentation already shows a working pipeline around Binance data, indicators, confluence, strategy studies, backtests, risk rules, and paper trading.
TRP V2 must extend that pipeline into a broader research laboratory, not erase it.

## 0.8 Success definition for the platform

TRP V2 succeeds if it can do all of the following:

- generate candidate hypotheses from structured research inputs,
- test these hypotheses on explicit asset/timeframe combinations,
- validate them using rigorous and repeatable methods,
- rank them according to robustness rather than hype,
- explain why they work or fail,
- preserve the full trace of research,
- and allow future researchers to repeat the exact same process.

## 0.9 Volume 0 role

This volume defines the foundations:

- vocabulary,
- scientific philosophy,
- engineering philosophy,
- research philosophy,
- notion of edge,
- notion of evidence,
- role of AI,
- role of Codex,
- development rules,
- standards of proof,
- migration principles from V1 to V2.

It does not attempt to define all code.
That work begins in later volumes.

---

# 1. Document conventions

This documentation uses the following conventions:

- **MUST** means mandatory.
- **SHOULD** means strongly recommended.
- **MAY** means optional.
- “Research artifact” means any file, notebook, dataset, report, strategy definition, metric table, or experiment record produced by the platform.
- “Edge” means a repeatable statistical advantage observed after costs and validated out of sample.
- “Experiment” means a fully parameterized, reproducible research run.

All later volumes inherit these conventions unless explicitly overridden.

---

# 2. First engineering principle

The platform must be designed so that a later researcher can answer:

- what was tested,
- on which asset,
- on which timeframe,
- with which data,
- with which version of the code,
- with which parameters,
- with which cost model,
- and with which validation method.

If any of those elements cannot be answered, the experiment is incomplete.

---

# 3. First architecture principle

The platform must separate these concerns:

- data acquisition,
- feature extraction,
- market context detection,
- hypothesis generation,
- strategy formalization,
- parameter optimization,
- statistical validation,
- execution simulation,
- performance analysis,
- knowledge retention.

A module may depend on previous outputs, but it must not own responsibilities that belong to another layer.

---

# 4. First research principle

A good research platform does not try to be clever first.
It tries to be correct first.

Correctness means:

- no leakage,
- no hidden assumptions,
- no silent data mutation,
- no untracked parameters,
- no unlogged results,
- no untestable claims.

---

# 5. First note on AI

AI may assist the research workflow, but it must not become the definition of the research workflow.

AI can:

- summarize,
- compare,
- propose,
- extract structure,
- transform documentation into candidate code or experiment ideas.

AI must not:

- replace validation,
- replace statistical testing,
- replace traceability,
- replace the need for explicit rules.

---

# 6. Immediate implication for Codex

Codex must treat this document as a binding specification, not as a suggestion list.

When Codex implements a module, it must:

1. preserve the stated architectural boundaries,
2. preserve the documented vocabulary,
3. preserve the research process,
4. create explicit interfaces,
5. add tests,
6. add usage examples,
7. update the documentation when a design decision changes.

Codex must not silently invent architecture.
Codex must not flatten research logic into ad hoc scripts.
Codex must not remove traceability in the name of simplicity.
