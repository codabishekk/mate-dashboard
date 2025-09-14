import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { useUsers } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateUserDialog = ({ open, onOpenChange }: CreateUserDialogProps) => {
  const { addUser } = useUsers();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: '',
      },
    },
  });

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as any,
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email) {
      toast({
        title: "Validation Error",
        description: "Name and email are required fields.",
        variant: "destructive",
      });
      return;
    }

    addUser(formData);
    toast({
      title: "User Created",
      description: `${formData.name} has been added successfully.`,
    });
    
    // Reset form and close dialog
    setFormData({
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      company: { name: '', catchPhrase: '', bs: '' },
      address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } },
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-card-foreground flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Create New User
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="bg-background border-border">
            <CardContent className="p-4 space-y-4">
              <h3 className="font-medium text-foreground">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="John Doe"
                    className="bg-background border-border text-foreground"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-foreground">Username</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    placeholder="johndoe"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john@example.com"
                    className="bg-background border-border text-foreground"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1-555-123-4567"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="website" className="text-foreground">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://example.com"
                    className="bg-background border-border text-foreground"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card className="bg-background border-border">
            <CardContent className="p-4 space-y-4">
              <h3 className="font-medium text-foreground">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="company.name" className="text-foreground">Company Name</Label>
                  <Input
                    id="company.name"
                    value={formData.company.name}
                    onChange={(e) => handleInputChange('company.name', e.target.value)}
                    placeholder="Acme Corp"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company.catchPhrase" className="text-foreground">Catch Phrase</Label>
                  <Input
                    id="company.catchPhrase"
                    value={formData.company.catchPhrase}
                    onChange={(e) => handleInputChange('company.catchPhrase', e.target.value)}
                    placeholder="Innovation at its best"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company.bs" className="text-foreground">Business</Label>
                  <Input
                    id="company.bs"
                    value={formData.company.bs}
                    onChange={(e) => handleInputChange('company.bs', e.target.value)}
                    placeholder="Technology solutions"
                    className="bg-background border-border text-foreground"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card className="bg-background border-border">
            <CardContent className="p-4 space-y-4">
              <h3 className="font-medium text-foreground">Address Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address.street" className="text-foreground">Street</Label>
                  <Input
                    id="address.street"
                    value={formData.address.street}
                    onChange={(e) => handleInputChange('address.street', e.target.value)}
                    placeholder="123 Main St"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address.suite" className="text-foreground">Suite/Apt</Label>
                  <Input
                    id="address.suite"
                    value={formData.address.suite}
                    onChange={(e) => handleInputChange('address.suite', e.target.value)}
                    placeholder="Apt 101"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address.city" className="text-foreground">City</Label>
                  <Input
                    id="address.city"
                    value={formData.address.city}
                    onChange={(e) => handleInputChange('address.city', e.target.value)}
                    placeholder="New York"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address.zipcode" className="text-foreground">Zip Code</Label>
                  <Input
                    id="address.zipcode"
                    value={formData.address.zipcode}
                    onChange={(e) => handleInputChange('address.zipcode', e.target.value)}
                    placeholder="10001"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address.geo.lat" className="text-foreground">Latitude</Label>
                  <Input
                    id="address.geo.lat"
                    value={formData.address.geo.lat}
                    onChange={(e) => handleInputChange('address.geo.lat', e.target.value)}
                    placeholder="40.7128"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address.geo.lng" className="text-foreground">Longitude</Label>
                  <Input
                    id="address.geo.lng"
                    value={formData.address.geo.lng}
                    onChange={(e) => handleInputChange('address.geo.lng', e.target.value)}
                    placeholder="-74.0060"
                    className="bg-background border-border text-foreground"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-border hover:bg-muted"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-primary-foreground"
            >
              Create User
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;