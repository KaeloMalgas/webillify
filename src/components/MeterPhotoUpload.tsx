import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { extractGPSData, verifyMeterLocation } from '@/utils/imageUtils';
import { Camera, Upload } from 'lucide-react';

interface MeterPhotoUploadProps {
  onPhotoUploaded: (photoUrl: string, gpsVerified: boolean) => void;
  registeredLocation: { latitude: number; longitude: number };
}

const MeterPhotoUpload = ({ onPhotoUploaded, registeredLocation }: MeterPhotoUploadProps) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const gpsData = await extractGPSData(file);
      const isLocationValid = verifyMeterLocation(gpsData, registeredLocation);

      if (!gpsData.latitude || !gpsData.longitude) {
        toast({
          title: "GPS Data Missing",
          description: "The uploaded photo doesn't contain GPS information. Please ensure location services are enabled.",
          variant: "destructive",
        });
        return;
      }

      if (!isLocationValid) {
        toast({
          title: "Location Verification Failed",
          description: "The photo wasn't taken at the registered meter location.",
          variant: "destructive",
        });
        return;
      }

      // Create object URL for the image
      const photoUrl = URL.createObjectURL(file);
      onPhotoUploaded(photoUrl, true);

      toast({
        title: "Photo Uploaded Successfully",
        description: "Location verified and photo accepted.",
      });
    } catch (error) {
      toast({
        title: "Upload Error",
        description: "There was an error processing your photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center p-6 border-2 border-dashed rounded-lg">
        <Camera className="w-12 h-12 mb-4 text-gray-400" />
        <div className="text-center">
          <h3 className="font-semibold mb-1">Upload Meter Photo</h3>
          <p className="text-sm text-gray-500 mb-4">
            Please ensure location services are enabled
          </p>
          <Input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileUpload}
            disabled={isProcessing}
            className="hidden"
            id="meter-photo"
          />
          <label htmlFor="meter-photo">
            <Button 
              variant="outline" 
              disabled={isProcessing}
              className="cursor-pointer"
            >
              <Upload className="w-4 h-4 mr-2" />
              {isProcessing ? 'Processing...' : 'Select Photo'}
            </Button>
          </label>
        </div>
      </div>
    </div>
  );
};

export default MeterPhotoUpload;