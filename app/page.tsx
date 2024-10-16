import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">BigFive Personality Test</h1>
      <p className="text-lg mb-8 text-center">
        Discover your personality traits with the scientifically validated BigFive model.
      </p>
      <div className="flex flex-col items-center space-y-4">
        <Link href="/test">
          <Button size="lg">Start Test</Button>
        </Link>
        <Link href="/about" className="text-sm text-muted-foreground hover:underline">
          Learn more about the BigFive model
        </Link>
      </div>
    </div>
  );
}