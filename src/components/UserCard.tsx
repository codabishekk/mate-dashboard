import React from 'react';
import { Mail, Phone, Building2, MapPin, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { User } from '@/contexts/UserContext';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="group bg-card hover:bg-card-hover transition-all duration-300 hover:shadow-lg border-border cursor-pointer" 
          onClick={() => navigate(`/user/${user.id}`)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg text-card-foreground group-hover:text-primary transition-colors">
              {user.name}
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              @{user.username}
            </Badge>
          </div>
          <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <div className="p-1.5 rounded-md bg-primary/10 text-primary">
              <Mail className="h-3.5 w-3.5" />
            </div>
            <span className="text-card-foreground truncate">{user.email}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <div className="p-1.5 rounded-md bg-accent/10 text-accent">
              <Phone className="h-3.5 w-3.5" />
            </div>
            <span className="text-card-foreground">{user.phone}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <div className="p-1.5 rounded-md bg-secondary/10 text-secondary-foreground">
              <Building2 className="h-3.5 w-3.5" />
            </div>
            <span className="text-card-foreground truncate">{user.company.name}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <div className="p-1.5 rounded-md bg-muted text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
            </div>
            <span className="text-muted-foreground truncate">{user.address.city}</span>
          </div>
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-4 border-border hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/user/${user.id}`);
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserCard;