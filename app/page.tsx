
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-8 text-center">
        <Logo size="lg" />
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Workforce Management <br /> Reimagined.
        </h1>
        <p className="max-w-[600px] text-muted-foreground text-lg">
          Track time, manage projects, and optimize productivity with Trackup.
          The premium solution for modern teams.
        </p>
        <div className="flex gap-4">
          <Link href="/login">
            <Button size="lg" variant="outline">Log In</Button>
          </Link>
          <Link href="/signup">
            <Button size="lg">Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
