"use client"

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { generateResult, Result } from '@/lib/bigfive';

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    async function loadResults() {
      const scores = searchParams.get('scores');
      if (scores) {
        const generatedResults = await generateResult(JSON.parse(scores));
        setResults(generatedResults);
      }
    }
    loadResults();
  }, [searchParams]);

  if (results.length === 0) {
    return <div>Loading results...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your BigFive Personality Test Results</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.map((result) => (
          <Card key={result.domain}>
            <CardHeader>
              <CardTitle>{result.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={result.score} className="mb-2" />
              <p className="text-sm text-muted-foreground">{result.shortDescription}</p>
              <p className="text-lg font-semibold mt-2">{result.score}% - {result.scoreText}</p>
              <details className="mt-4">
                <summary className="cursor-pointer">Facets</summary>
                <ul className="mt-2 space-y-2">
                  {result.facets.map((facet, index) => (
                    <li key={index}>
                      <strong>{facet.title}:</strong> {facet.score}%
                      <p className="text-sm">{facet.text}</p>
                    </li>
                  ))}
                </ul>
              </details>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}