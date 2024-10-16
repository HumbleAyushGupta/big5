"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';
import { getQuestions, getChoices, Question, Choice } from '@/lib/bigfive';

export default function TestPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [choices, setChoices] = useState<Choice[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: number}>({});
  const router = useRouter();

  useEffect(() => {
    async function loadTestData() {
      const loadedQuestions = await getQuestions();
      const loadedChoices = await getChoices();
      setQuestions(loadedQuestions);
      setChoices(loadedChoices);
    }
    loadTestData();
  }, []);

  const handleAnswer = (score: number) => {
    const question = questions[currentQuestion];
    const finalScore = question.keyed === 'minus' ? 6 - score : score;
    
    setAnswers(prev => ({
      ...prev,
      [question.id]: finalScore
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      router.push('/results?scores=' + JSON.stringify(answers));
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (questions.length === 0 || choices.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">BigFive Personality Test</h1>
      <Progress value={progress} className="mb-6" />
      <Card>
        <CardContent className="p-6">
          <p className="text-lg mb-4">{questions[currentQuestion].text}</p>
          <div className="flex flex-col space-y-2">
            {choices.map((choice) => (
              <Button
                key={choice.score}
                onClick={() => handleAnswer(choice.score)}
                variant="outline"
                className="justify-start"
              >
                {choice.text}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}