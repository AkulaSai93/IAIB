export type TestCase = { args: unknown[]; expected: unknown };

export type Problem = {
  id: string;
  lang: "python" | "javascript";
  title: string;
  blurb: string;
  difficulty: "Easy" | "Medium" | "Hard";
  credits: number;
  prompt: string;
  fn: string;
  starter: string;
  tests: TestCase[];
};

export const PROBLEMS: Problem[] = [
  {
    id: "two-sum-pairs",
    lang: "python",
    title: "Count the Pairs",
    blurb: "Warm up with a classic array problem.",
    difficulty: "Easy",
    credits: 50,
    prompt:
      "Given a list of integers and a target, return how many unordered pairs add up to the target.",
    fn: "count_pairs",
    starter: `def count_pairs(nums, target):
    # return the number of unordered pairs summing to target
    return 0
`,
    tests: [
      { args: [[1, 2, 3, 4], 5], expected: 2 },
      { args: [[1, 1, 1], 2], expected: 3 },
      { args: [[5], 5], expected: 0 },
      { args: [[2, 2, 3, 3], 5], expected: 4 },
    ],
  },
  {
    id: "reverse-words",
    lang: "javascript",
    title: "Reverse the Words",
    blurb: "String handling, no built-in shortcuts.",
    difficulty: "Easy",
    credits: 40,
    prompt:
      "Given a sentence, return it with the order of the words reversed. Collapse extra spaces.",
    fn: "reverseWords",
    starter: `function reverseWords(sentence) {
  // return the words in reverse order
  return sentence;
}
`,
    tests: [
      { args: ["hello world"], expected: "world hello" },
      { args: ["  build  think create "], expected: "create think build" },
      { args: ["one"], expected: "one" },
    ],
  },
];

/**
 * Same problem for everyone on a given day. An `id` override lets you
 * preview a specific problem (e.g. ?p=reverse-words).
 */
export function problemForToday(iso: string, override?: string | null): Problem {
  if (override) {
    const found = PROBLEMS.find((p) => p.id === override);
    if (found) return found;
  }
  const n = [...iso].reduce((a, c) => a + c.charCodeAt(0), 0);
  return PROBLEMS[n % PROBLEMS.length];
}
