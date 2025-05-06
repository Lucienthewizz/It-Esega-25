import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AuthenticatedAdminLayout from '@/layouts/admin/layout';
import { TeamDetail } from '@/types/teamOverviews';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { UserType } from '@/types/user';

interface Props {
  team: TeamDetail;
}

const TeamDetailPage: React.FC<Props> = ({ team }) => {
  const { user } = usePage<{ user: { data: UserType } }>().props;
  const auth = user.data;
  const [selectedStatus, setSelectedStatus] = useState<string>(team.status);
  const [isProcessing, setIsProcessing] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Menunggu</Badge>;
      case 'verified':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Terverifikasi</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Ditolak</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'ketua':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Ketua</Badge>;
      case 'anggota':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Anggota</Badge>;
      case 'cadangan':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800">Cadangan</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const updateStatus = async () => {
    if (selectedStatus === team.status) {
      toast.error('Status tidak berubah');
      return;
    }
    
    if (confirm(`Anda akan mengubah status tim dari "${team.status}" menjadi "${selectedStatus}". Apakah Anda yakin ingin melanjutkan?`)) {
      setIsProcessing(true);
      try {
        await axios.put(`/secure-admin-essega/teams/${team.game === 'Mobile Legends' ? 'ml' : 'ff'}/${team.id}/status`, {
          status: selectedStatus
        });
        
        toast.success('Status tim berhasil diperbarui');
        // Refresh halaman untuk mendapatkan data terbaru
        router.reload();
      } catch (error) {
        console.error('Error updating team status:', error);
        toast.error('Gagal memperbarui status tim');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <AuthenticatedAdminLayout user={auth} title={`Detail Tim - ${team.name}`} headerTitle="Detail Tim">
      <Head title={`IT-ESEGA 2025 Official Website | Detail Tim - ${team.name}`} />
      
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">{team.name}</h1>
            <p className="text-gray-500">{team.game}</p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => router.visit('/secure-admin-essega/players')}
            >
              Kembali
            </Button>
            
            <Button 
              variant="default"
              onClick={() => window.open(`/secure-admin-essega/export/${team.game === 'Mobile Legends' ? 'MLplayers' : 'FFplayers'}`, '_blank')}
            >
              Export Data Pemain
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tim Info */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Informasi Tim</CardTitle>
              <CardDescription>Detail informasi tim {team.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center mb-4">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={team.logo} />
                  <AvatarFallback>{team.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="mt-1">{getStatusBadge(team.status)}</div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tanggal Daftar</p>
                  <p className="font-medium">{team.created_at}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Jumlah Pemain</p>
                  <p className="font-medium">{team.playerCount}</p>
                </div>
                
                {team.slot_type && (
                  <div>
                    <p className="text-sm text-gray-500">Jenis Slot</p>
                    <p className="font-medium capitalize">{team.slot_type}</p>
                  </div>
                )}
                
                {team.slot_count && (
                  <div>
                    <p className="text-sm text-gray-500">Jumlah Slot</p>
                    <p className="font-medium">{team.slot_count}</p>
                  </div>
                )}
              </div>
              
              {team.payment_proof && (
                <div className="mt-6">
                  <p className="text-sm text-gray-500 mb-2">Bukti Pembayaran</p>
                  <img 
                    src={team.payment_proof} 
                    alt="Bukti Pembayaran" 
                    className="w-full h-auto max-h-64 object-contain border rounded-md"
                    onClick={() => window.open(team.payment_proof || '', '_blank')}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              )}
            </CardContent>
            <CardFooter>
              <div className="w-full space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Ubah Status:</p>
                  <Select 
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Menunggu</SelectItem>
                      <SelectItem value="verified">Terverifikasi</SelectItem>
                      <SelectItem value="rejected">Ditolak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant="default" 
                  className="w-full" 
                  disabled={selectedStatus === team.status || isProcessing}
                  onClick={updateStatus}
                >
                  {isProcessing ? 'Memproses...' : 'Simpan Perubahan'}
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          {/* Daftar Pemain */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Daftar Pemain</CardTitle>
              <CardDescription>Anggota tim {team.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Daftar pemain tim {team.name}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Nickname</TableHead>
                    <TableHead>ID Server</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Kontak</TableHead>
                    <TableHead>Dokumen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {team.players.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell className="font-medium">{player.name}</TableCell>
                      <TableCell>{player.nickname}</TableCell>
                      <TableCell>{player.id_server}</TableCell>
                      <TableCell>{getRoleBadge(player.role)}</TableCell>
                      <TableCell>
                        <div className="text-xs space-y-1">
                          <p>{player.no_hp}</p>
                          <p>{player.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {player.foto && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => window.open(player.foto || '', '_blank')}
                            >
                              Foto
                            </Button>
                          )}
                          {player.tanda_tangan && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => window.open(player.tanda_tangan || '', '_blank')}
                            >
                              TTD
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthenticatedAdminLayout>
  );
};

export default TeamDetailPage; 