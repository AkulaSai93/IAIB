"use client";

import type { Problem } from "./problems";

export type TestResult = {
  name: string;
  passed: boolean;
  expected: string;
  got: string;
};

export type RunOutcome =
  | { kind: "ok"; results: TestResult[] }
  | { kind: "error"; message: string }
  | { kind: "runtime-missing"; message: string };

const show = (v: unknown) =>
  typeof v === "string" ? JSON.stringify(v) : String(v);

/** JavaScript runs for real, in-page. */
function runJavaScript(problem: Problem, code: string): RunOutcome {
  let fn: unknown;
  try {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    fn = new Function(`${code}\nreturn typeof ${problem.fn} === "function" ? ${problem.fn} : null;`)();
  } catch (e) {
    return { kind: "error", message: e instanceof Error ? e.message : String(e) };
  }
  if (typeof fn !== "function") {
    return { kind: "error", message: `Couldn't find a function called ${problem.fn}.` };
  }

  const results: TestResult[] = [];
  for (const [i, t] of problem.tests.entries()) {
    try {
      const got = (fn as (...a: unknown[]) => unknown)(...t.args);
      results.push({
        name: `Test ${i + 1}`,
        passed: JSON.stringify(got) === JSON.stringify(t.expected),
        expected: show(t.expected),
        got: show(got),
      });
    } catch (e) {
      results.push({
        name: `Test ${i + 1}`,
        passed: false,
        expected: show(t.expected),
        got: e instanceof Error ? e.message : String(e),
      });
    }
  }
  return { kind: "ok", results };
}

/* ------------------------------------------------------------------ *
 * Python
 *
 * Runs through Pyodide, which is ~10MB and only fetched once the student
 * explicitly asks for it (see `loadPython`). Until then Python problems
 * report `runtime-missing` rather than pretending to pass.
 * ------------------------------------------------------------------ */

const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.mjs";

type Pyodide = { runPython: (src: string) => unknown };
let pyodide: Pyodide | null = null;
let pyLoading: Promise<Pyodide> | null = null;

export const pythonReady = () => pyodide !== null;

export function loadPython(): Promise<Pyodide> {
  if (pyodide) return Promise.resolve(pyodide);
  if (pyLoading) return pyLoading;
  pyLoading = (async () => {
    const mod = await import(/* webpackIgnore: true */ PYODIDE_URL);
    const py = await mod.loadPyodide({
      indexURL: PYODIDE_URL.replace("pyodide.mjs", ""),
    });
    pyodide = py as Pyodide;
    return pyodide;
  })();
  return pyLoading;
}

async function runPython(problem: Problem, code: string): Promise<RunOutcome> {
  if (!pyodide) {
    return {
      kind: "runtime-missing",
      message: "Python runs in your browser — load the runtime to check your answer.",
    };
  }
  const results: TestResult[] = [];
  for (const [i, t] of problem.tests.entries()) {
    const call = `${problem.fn}(${t.args.map((a) => JSON.stringify(a)).join(", ")})`;
    try {
      const got = pyodide.runPython(
        `${code}\nimport json\njson.dumps(${call})`,
      ) as string;
      results.push({
        name: `Test ${i + 1}`,
        passed: got === JSON.stringify(t.expected),
        expected: show(t.expected),
        got: String(got),
      });
    } catch (e) {
      return { kind: "error", message: e instanceof Error ? e.message : String(e) };
    }
  }
  return { kind: "ok", results };
}

export async function runSolution(problem: Problem, code: string): Promise<RunOutcome> {
  return problem.lang === "javascript"
    ? runJavaScript(problem, code)
    : runPython(problem, code);
}
