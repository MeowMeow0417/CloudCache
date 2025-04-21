'use client'

import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

interface ToggleProps {
  enabled: boolean;
  onChange: (value: boolean) => void;
}

export const GeoLocationToggle = ({ enabled, onChange }: ToggleProps) => {
  return (
    <div className="flex items-center space-x-2 justify-between">
      <Label htmlFor="geo-toggle">Enable Geolocation</Label>
      <Switch id="geo-toggle" checked={enabled} onCheckedChange={onChange} />
    </div>
  );
};
