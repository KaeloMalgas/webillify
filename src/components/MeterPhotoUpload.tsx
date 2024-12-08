import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { extractGPSData, verifyMeterLocation } from '@/utils/imageUtils';
import { Camera, Upload, Check, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface MeterPhotoUploadProps {
  onPhotoUploaded: (photoUrl: string, gpsVerified: boolean) => void;
  registeredLocation: { latitude: number; longitude: number };
}

const MeterPhotoUpload = ({ onPhotoUploaded, registeredLocation }: MeterPhotoUploadProps) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOCRDialog, setShowOCRDialog] = useState(false);
  const [ocrReading, setOcrReading] = useState<string>("");
  const [manualReading, setManualReading] = useState<string>("");
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState<string>("");

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
      setCurrentPhotoUrl(photoUrl);

      // Simulate OCR processing
      setTimeout(() => {
        // Mock OCR result - this should be replaced with actual OCR implementation
        const mockOcrReading = "12345.67";
        setOcrReading(mockOcrReading);
        setShowOCRDialog(true);
      }, 1500);

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

  const handleOCRConfirmation = (accepted: boolean) => {
    if (accepted) {
      toast({
        title: "Reading Confirmed",
        description: `Meter reading of ${ocrReading} has been recorded.`,
      });
    } else {
      setManualReading("");
      toast({
        title: "Manual Entry Required",
        description: "Please enter the meter reading manually.",
      });
    }
    setShowOCRDialog(false);
  };

  const handleManualSubmit = () => {
    if (!manualReading) {
      toast({
        title: "Invalid Reading",
        description: "Please enter a valid meter reading.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Reading Submitted",
      description: `Manual meter reading of ${manualReading} has been recorded.`,
    });
    setShowOCRDialog(false);
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

      <Dialog open={showOCRDialog} onOpenChange={setShowOCRDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Meter Reading</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Detected meter reading: <strong>{ocrReading}</strong></p>
            <p>Is this reading correct?</p>
            <div className="flex justify-center space-x-4">
              <Button onClick={() => handleOCRConfirmation(true)} className="w-32">
                <Check className="w-4 h-4 mr-2" />
                Yes
              </Button>
              <Button onClick={() => handleOCRConfirmation(false)} variant="outline" className="w-32">
                <X className="w-4 h-4 mr-2" />
                No
              </Button>
            </div>
            {!ocrReading && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Enter Reading Manually</label>
                <Input
                  type="number"
                  step="0.01"
                  value={manualReading}
                  onChange={(e) => setManualReading(e.target.value)}
                  placeholder="Enter meter reading"
                />
                <Button onClick={handleManualSubmit} className="w-full">
                  Submit Reading
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MeterPhotoUpload;