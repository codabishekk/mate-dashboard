import React, { useState } from 'react';
import { Search, Plus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUsers } from '@/contexts/UserContext';
import UserCard from './UserCard';
import CreateUserDialog from './CreateUserDialog';

const Dashboard = () => {
  const { state } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredUsers = state.users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                <Users className="h-5 w-5" />
              </div>
              <h1 className="text-xl font-semibold text-foreground">User Dashboard</h1>
            </div>
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats and Search */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 bg-card hover:bg-card-hover transition-colors border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-card-foreground">Search Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent to-accent-light text-accent-foreground border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-accent-foreground">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent-foreground">
                {state.loading ? '...' : state.users.length}
              </div>
              <p className="text-accent-foreground/80 text-sm mt-1">
                Active users in system
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Users Grid */}
        {state.loading ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              Loading users...
            </div>
          </div>
        ) : state.error ? (
          <Card className="border-destructive bg-destructive/5">
            <CardContent className="pt-6">
              <p className="text-destructive text-center">{state.error}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
            {filteredUsers.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                {searchTerm ? `No users found matching "${searchTerm}"` : 'No users available'}
              </div>
            )}
          </div>
        )}
      </main>

      <CreateUserDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen} 
      />
    </div>
  );
};

export default Dashboard;