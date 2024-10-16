// Mock data for languages
const languages = [
  { code: 'en', text: 'English' },
  { code: 'es', text: 'Español' },
  { code: 'fr', text: 'Français' },
];

export type Language = {
  code: string;
  text: string;
};

export type Question = {
  id: string;
  text: string;
  keyed: 'plus' | 'minus';
  domain: 'N' | 'E' | 'O' | 'A' | 'C';
  facet: number;
};

export type Choice = {
  text: string;
  score: number;
  color: number;
};

export type Scores = {
  [key: string]: number;
};

export type Result = {
  domain: string;
  title: string;
  shortDescription: string;
  description: string;
  scoreText: string;
  count: number;
  score: number;
  facets: {
    title: string;
    text: string;
    score: number;
  }[];
};

// Mock questions data
const mockQuestions: Question[] = [
  {
    id: '1',
    text: 'I am the life of the party',
    keyed: 'plus',
    domain: 'E',
    facet: 1
  },
  {
    id: '2',
    text: 'I feel little concern for others',
    keyed: 'minus',
    domain: 'A',
    facet: 1
  },
  {
    id: '3',
    text: 'I am always prepared',
    keyed: 'plus',
    domain: 'C',
    facet: 1
  },
  {
    id: '4',
    text: 'I get stressed out easily',
    keyed: 'plus',
    domain: 'N',
    facet: 1
  },
  {
    id: '5',
    text: 'I have a rich vocabulary',
    keyed: 'plus',
    domain: 'O',
    facet: 1
  }
];

// Mock choices data
const mockChoices: Choice[] = [
  { text: 'Disagree', score: 1, color: 1 },
  { text: 'Slightly disagree', score: 2, color: 2 },
  { text: 'Neutral', score: 3, color: 3 },
  { text: 'Slightly agree', score: 4, color: 4 },
  { text: 'Agree', score: 5, color: 5 }
];

export async function getQuestions(language: string = 'en'): Promise<Question[]> {
  // In a real implementation, we would load language-specific questions
  return mockQuestions;
}

export async function getChoices(language: string = 'en'): Promise<Choice[]> {
  // In a real implementation, we would load language-specific choices
  return mockChoices;
}

export function getInfo() {
  return {
    name: "Simplified BigFive Test",
    id: 'simplified-bigfive',
    shortId: 'b5-simple',
    time: 2,
    questions: mockQuestions.length,
    languages
  };
}

export async function generateResult(scores: Scores, language: string = 'en'): Promise<Result[]> {
  const domains = ['N', 'E', 'O', 'A', 'C'];
  const results: Result[] = [];

  for (const domain of domains) {
    const domainScore = calculateDomainScore(scores, domain);
    
    results.push({
      domain: domain,
      title: getDomainTitle(domain),
      shortDescription: `This is a short description for ${getDomainTitle(domain)}.`,
      description: `This is a longer description for ${getDomainTitle(domain)}.`,
      scoreText: getScoreText(domainScore),
      count: Object.keys(scores).filter(key => key.startsWith(domain)).length,
      score: domainScore,
      facets: [
        {
          title: `${getDomainTitle(domain)} Facet 1`,
          text: `This is a description for ${getDomainTitle(domain)} Facet 1.`,
          score: calculateFacetScore(scores, domain, 1)
        }
      ]
    });
  }

  return results;
}

function getDomainTitle(domain: string): string {
  const titles = {
    N: 'Neuroticism',
    E: 'Extraversion',
    O: 'Openness to Experience',
    A: 'Agreeableness',
    C: 'Conscientiousness'
  };
  return titles[domain];
}

function calculateDomainScore(scores: Scores, domain: string): number {
  const domainScores = Object.entries(scores).filter(([key]) => key.startsWith(domain));
  const total = domainScores.reduce((sum, [, score]) => sum + score, 0);
  return Math.round((total / (domainScores.length * 5)) * 100);
}

function calculateFacetScore(scores: Scores, domain: string, facet: number): number {
  const facetScores = Object.entries(scores).filter(([key]) => key.startsWith(`${domain}${facet}`));
  const total = facetScores.reduce((sum, [, score]) => sum + score, 0);
  return Math.round((total / (facetScores.length * 5)) * 100);
}

function getScoreText(score: number): string {
  if (score < 35) return 'low';
  if (score < 65) return 'average';
  return 'high';
}