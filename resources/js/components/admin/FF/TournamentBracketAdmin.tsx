import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

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

export default function TournamentBracketAdmin() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [initializing, setInitializing] = useState<boolean>(false);
  const [availableTeams, setAvailableTeams] = useState<Team[]>([]);
  const [brackets, setBrackets] = useState<{[key: string]: BracketEntry[]}>({
    A: [],
    B: [],
    C: [],
    D: []
  });
  const [selectedBracket, setSelectedBracket] = useState<BracketEntry | null>(null);
  const [editValues, setEditValues] = useState({
    team_id: "",
    placement: "",
    kill: "",
    booyah: "",
  });

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

  const fetchAvailableTeams = async () => {
    try {
      const response = await axios.get('/api/ff-tournament/available-teams');
      if (response.data.status === 'success') {
        setAvailableTeams(response.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch available teams:", err);
      toast.error("Failed to load available teams");
    }
  };

  useEffect(() => {
    fetchBrackets();
    fetchAvailableTeams();
  }, []);

  const handleInitializeGroup = async (group: string) => {
    try {
      setInitializing(true);
      const response = await axios.post('/api/ff-tournament/initialize-group', { group });
      if (response.data.status === 'success') {
        toast.success(`Group ${group} initialized successfully`);
        fetchBrackets();
      } else {
        toast.error(response.data.message || `Failed to initialize Group ${group}`);
      }
    } catch (err: unknown) {
      console.error(err);
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || `Error initializing Group ${group}`);
    } finally {
      setInitializing(false);
    }
  };

  const handleEditClick = (bracket: BracketEntry) => {
    setSelectedBracket(bracket);
    setEditValues({
      team_id: bracket.team_id ? String(bracket.team_id) : "",
      placement: bracket.placement ? String(bracket.placement) : "",
      kill: bracket.kill ? String(bracket.kill) : "",
      booyah: bracket.booyah ? String(bracket.booyah) : "",
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string, value: string } }) => {
    setEditValues({
      ...editValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveChanges = async () => {
    if (!selectedBracket) return;

    try {
      const payload: Record<string, number> = {};
      
      if (editValues.team_id) {
        payload.team_id = parseInt(editValues.team_id);
      }
      
      if (editValues.placement) {
        payload.placement = parseInt(editValues.placement);
      }
      
      if (editValues.kill) {
        payload.kill = parseInt(editValues.kill);
      }
      
      if (editValues.booyah) {
        payload.booyah = parseInt(editValues.booyah);
      }
      
      // Calculate total points based on placement and kill
      if (editValues.placement && editValues.kill) {
        // Game scoring rules - customize as needed
        const placementPoints = [20, 17, 15, 13, 12, 10, 8, 6, 4, 2, 1, 0];
        const placementValue = parseInt(editValues.placement);
        const killValue = parseInt(editValues.kill);
        const booyahValue = parseInt(editValues.booyah || "0");
        
        // Placement between 1-12
        const placementPoint = placementValue >= 1 && placementValue <= 12 
          ? placementPoints[placementValue - 1] 
          : 0;
          
        // Each kill worth 1 point
        const killPoint = killValue;
        
        // Booyah bonus (1 = yes, 0 = no)
        const booyahPoint = booyahValue ? 5 : 0;
        
        // Total points
        payload.total_point = placementPoint + killPoint + booyahPoint;
      }

      const response = await axios.put(`/api/ff-tournament/brackets/${selectedBracket.id}`, payload);
      
      if (response.data.status === 'success') {
        toast.success('Bracket updated successfully');
        fetchBrackets();
        fetchAvailableTeams();
        setSelectedBracket(null);
      } else {
        toast.error('Failed to update bracket');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error updating bracket');
    }
  };

  const renderTable = (group: string) => {
    const groupBrackets = brackets[group] || [];

    if (loading && groupBrackets.length === 0) {
      return (
        <div className="text-center p-4">
          Loading...
        </div>
      );
    }

    if (groupBrackets.length === 0) {
      return (
        <div className="text-center p-4">
          <p className="mb-4">No data available for Group {group}</p>
          <Button 
            onClick={() => handleInitializeGroup(group)}
            disabled={initializing}
          >
            {initializing ? 'Initializing...' : `Initialize Group ${group}`}
          </Button>
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Rank</TableHead>
            <TableHead className="w-40">Tim</TableHead>
            <TableHead className="w-24">Placement</TableHead>
            <TableHead className="w-24">Kill</TableHead>
            <TableHead className="w-24">Booyah</TableHead>
            <TableHead className="w-24">Total Point</TableHead>
            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groupBrackets.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.rank}</TableCell>
              <TableCell>{entry.team?.name || '-'}</TableCell>
              <TableCell>{entry.placement ?? '-'}</TableCell>
              <TableCell>{entry.kill ?? '-'}</TableCell>
              <TableCell>{entry.booyah ?? '-'}</TableCell>
              <TableCell>{entry.total_point ?? '-'}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => handleEditClick(entry)}>
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Bracket Entry - Group {entry.group}, Rank {entry.rank}</DialogTitle>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="team_id" className="text-right">Team</Label>
                        <Select 
                          name="team_id"
                          value={editValues.team_id}
                          onValueChange={(value) => handleEditChange({ target: { name: 'team_id', value }})}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select team" />
                          </SelectTrigger>
                          <SelectContent>
                            {entry.team && (
                              <SelectItem value={String(entry.team.id)}>
                                {entry.team.name} (Current)
                              </SelectItem>
                            )}
                            <SelectItem value="">None</SelectItem>
                            {availableTeams.map(team => (
                              <SelectItem key={team.id} value={String(team.id)}>
                                {team.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="placement" className="text-right">Placement</Label>
                        <Input
                          id="placement"
                          name="placement"
                          type="number"
                          min="1"
                          max="12"
                          placeholder="1-12"
                          value={editValues.placement}
                          onChange={handleEditChange}
                          className="col-span-3"
                        />
                      </div>
                      
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="kill" className="text-right">Kill</Label>
                        <Input
                          id="kill"
                          name="kill"
                          type="number"
                          min="0"
                          placeholder="Number of kills"
                          value={editValues.kill}
                          onChange={handleEditChange}
                          className="col-span-3"
                        />
                      </div>
                      
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="booyah" className="text-right">Booyah</Label>
                        <Select 
                          name="booyah"
                          value={editValues.booyah}
                          onValueChange={(value) => handleEditChange({ target: { name: 'booyah', value }})}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Booyah" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Yes</SelectItem>
                            <SelectItem value="0">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button onClick={handleSaveChanges}>Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
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
        <CardTitle className="text-center text-2xl font-bold">Free Fire Tournament Bracket Management</CardTitle>
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