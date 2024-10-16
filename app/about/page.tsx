import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">About the BigFive Model</h1>
      <div className="prose max-w-none">
        <p>
          The Big Five personality traits, also known as the five-factor model (FFM) and the OCEAN model, is a taxonomy for personality traits. It is based on common language descriptors. When factor analysis (a statistical technique) is applied to personality survey data, some words used to describe aspects of personality are often applied to the same person.
        </p>
        <h2>The Five Traits</h2>
        <ul>
          <li><strong>Openness to experience</strong>: (inventive/curious vs. consistent/cautious)</li>
          <li><strong>Conscientiousness</strong>: (efficient/organized vs. easy-going/careless)</li>
          <li><strong>Extraversion</strong>: (outgoing/energetic vs. solitary/reserved)</li>
          <li><strong>Agreeableness</strong>: (friendly/compassionate vs. challenging/detached)</li>
          <li><strong>Neuroticism</strong>: (sensitive/nervous vs. secure/confident)</li>
        </ul>
        <p>
          The Big Five model was developed in the 1980s by two independent research teams: Paul Costa and Robert McCrae (at the National Institutes of Health), and Warren Norman (at the University of Michigan)/Lewis Goldberg (at the University of Oregon).
        </p>
      </div>
      <div className="mt-8 flex justify-center">
        <Link href="/test">
          <Button size="lg">Take the Test</Button>
        </Link>
      </div>
    </div>
  );
}