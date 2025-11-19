import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SimpleNameInput = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [greeting, setGreeting] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters');
      setGreeting('');
    } else {
      setError('');
      setGreeting(`Hello, ${name.trim()}!`);
    }
  };

  const handleClear = () => {
    setName('');
    setError('');
    setGreeting('');
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Simple Name Input (Beginner)</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">Submit</Button>
            <Button type="button" variant="outline" onClick={handleClear} className="flex-1">Clear</Button>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}
          {greeting && <div className="text-sm text-green-600">{greeting}</div>}
        </form>
      </CardContent>
    </Card>
  );
};

export default SimpleNameInput;
