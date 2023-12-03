import { Character } from "@/api/characters";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";

export type CharacterCardProps = {
  character: Character;
};

function getCharacterIdFromUrl(url: string): number | null {
  const match = url.match(/\d+/);
  if (match) return parseInt(match[0]);

  return null;
}

function PersonTrait({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="font-mono text-sm">
      {label}: {value}
    </div>
  );
}

export function CharacterCard({ character }: CharacterCardProps) {
  const link = `/characters/${getCharacterIdFromUrl(character.url)}`;

  return (
    <Card className="bg-card">
      <CardHeader className="font-bold hover:underline">
        <Link to={link}>
          {character.name}, {character.birth_year}
        </Link>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <PersonTrait label="Height" value={character.height} />
        <PersonTrait label="Gender" value={character.gender} />
        <PersonTrait label="Eye color" value={character.eye_color} />
      </CardContent>
    </Card>
  );
}

export function CharacterCardSkeleton() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <Skeleton className="w-10 h-4" />
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
      </CardContent>
    </Card>
  );
}
