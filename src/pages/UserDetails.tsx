import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Globe, Building2, MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useUsers } from '@/contexts/UserContext';

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useUsers();

  const user = state.users.find(u => u.id === parseInt(id || '0'));

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <p className="text-card-foreground text-center">User not found</p>
            <Button 
              onClick={() => navigate('/')} 
              className="w-full mt-4 bg-primary hover:bg-primary-dark text-primary-foreground"
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-foreground hover:bg-muted"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <Badge variant="secondary" className="text-xs">
              ID: {user.id}
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Header */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground border-0">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-primary-foreground mb-2">{user.name}</h1>
                  <p className="text-primary-foreground/80 text-lg">@{user.username}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge variant="secondary" className="self-start md:self-end bg-white/20 text-primary-foreground border-0">
                    Active User
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <Card className="bg-card hover:bg-card-hover transition-colors border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                  <div className="p-2 rounded-md bg-accent/10 text-accent">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <p className="text-muted-foreground">{user.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                  <div className="p-2 rounded-md bg-secondary/10 text-secondary-foreground">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Website</p>
                    <p className="text-muted-foreground">{user.website}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card className="bg-card hover:bg-card-hover transition-colors border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-foreground">{user.company.name}</p>
                  <p className="text-sm text-muted-foreground italic">"{user.company.catchPhrase}"</p>
                </div>
                
                <Separator className="bg-border" />
                
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Business Focus</p>
                  <p className="text-muted-foreground capitalize">{user.company.bs}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card className="lg:col-span-2 bg-card hover:bg-card-hover transition-colors border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Address & Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-background rounded-lg">
                    <h4 className="font-medium text-foreground mb-3">Street Address</h4>
                    <div className="space-y-1 text-muted-foreground">
                      <p>{user.address.street}</p>
                      <p>{user.address.suite}</p>
                      <p>{user.address.city}, {user.address.zipcode}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-background rounded-lg">
                    <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                      <Navigation className="h-4 w-4 text-primary" />
                      Coordinates
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Latitude:</span>
                        <span className="font-mono text-foreground">{user.address.geo.lat}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Longitude:</span>
                        <span className="font-mono text-foreground">{user.address.geo.lng}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center">
          <Button 
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-primary-foreground px-8"
          >
            Back to Dashboard
          </Button>
        </div>
      </main>
    </div>
  );
};

export default UserDetails;