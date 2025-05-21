import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Team {
  id: number;
  name: string;
}

interface BracketEntry {
  id: number;
  group: string;
  rank: number;
  team_id: number | null;
  team: Team | null;
  placement: number | null;
  kill: number | null;
  booyah: number | null;
  total_point: number | null;
}

export default function TournamentBracket() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [brackets, setBrackets] = useState<{[key: string]: BracketEntry[]}>({
    A: [],
    B: [],
    C: [],
    D: []
  });

  useEffect(() => {
    const fetchBrackets = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/ff-tournament/brackets');
        if (response.data.status === 'success') {
          setBrackets(response.data.data);
        } else {
          setError('Failed to load bracket data');
        }
      } catch (err) {
        setError('Error loading bracket data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBrackets();

    // Set up polling for real-time updates
    const intervalId = setInterval(fetchBrackets, 10000); // Poll every 10 seconds

    return () => {
      clearInterval(intervalId); // Clean up on unmount
    };
  }, []);

  const renderTable = (group: string) => {
    const groupBrackets = brackets[group] || [];

    if (loading && groupBrackets.length === 0) {
      return (
        <div className="space-y-2">
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))}
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Rank</TableHead>
            <TableHead className="w-60">Tim</TableHead>
            <TableHead className="w-32">Placement</TableHead>
            <TableHead className="w-24">Kill</TableHead>
            <TableHead className="w-24">Booyah</TableHead>
            <TableHead className="w-32">Total Point</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groupBrackets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No data available for Group {group}
              </TableCell>
            </TableRow>
          ) : (
            groupBrackets.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{entry.rank}</TableCell>
                <TableCell>{entry.team?.name || '-'}</TableCell>
                <TableCell>{entry.placement ?? '-'}</TableCell>
                <TableCell>{entry.kill ?? '-'}</TableCell>
                <TableCell>{entry.booyah ?? '-'}</TableCell>
                <TableCell>{entry.total_point ?? '-'}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    );
  };

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        {error}
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">Free Fire Tournament Bracket</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="A">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="A">Group A</TabsTrigger>
            <TabsTrigger value="B">Group B</TabsTrigger>
            <TabsTrigger value="C">Group C</TabsTrigger>
            <TabsTrigger value="D">Group D</TabsTrigger>
          </TabsList>
          
          <TabsContent value="A">
            {renderTable('A')}
          </TabsContent>
          
          <TabsContent value="B">
            {renderTable('B')}
          </TabsContent>
          
          <TabsContent value="C">
            {renderTable('C')}
          </TabsContent>
          
          <TabsContent value="D">
            {renderTable('D')}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 