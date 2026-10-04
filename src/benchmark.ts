import data from './bench.json';

/**
 * Measured results written by `crates/loadtest/bench.py` in the product repo.
 * To refresh: run the harness against a release build and copy its JSON over
 * src/bench.json.
 *
 * PUBLISHED gates every performance figure on the site. Turn it on only for
 * numbers a customer can reproduce in a proof of concept on comparable hardware.
 */
export const PUBLISHED = false;

/** Concurrency level whose latency percentiles are headlined. */
const LATENCY_AT = 16;
const at = data.sweep.find(p => p.concurrency === LATENCY_AT) ?? data.sweep[data.sweep.length - 1];

export const BENCH = {
  date: data.date,
  note: data.note,
  env: { cpu: data.env.cpu, cores: data.env.cores, ramGb: data.env.ram_gb },
  idle: { cpuPct: data.idle.cpu_pct, rssMb: data.idle.rss_mb },
  sweep: data.sweep.map(p => ({ concurrency: p.concurrency, msgPerSec: p.msg_per_s })),
  latency: { concurrency: at.concurrency, p50: at.p50, p90: at.p90, p99: at.p99, p999: at.p999 },
  paced: data.paced.map(p => ({ rate: p.rate, cpuPct: p.cpu_pct, rssMb: p.rss_mb })),
};

export const fmt = (n: number) => n.toLocaleString('en-US');
