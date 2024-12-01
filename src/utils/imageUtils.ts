interface GPSCoordinates {
  latitude: number | null;
  longitude: number | null;
}

export const extractGPSData = (file: File): Promise<GPSCoordinates> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        // Load EXIF data parser
        const EXIF = await import('exif-js');
        
        const img = new Image();
        img.src = e.target?.result as string;
        
        img.onload = () => {
          EXIF.getData(img as any, function(this: any) {
            const exifData = EXIF.getAllTags(this);
            
            if (exifData?.GPSLatitude && exifData?.GPSLongitude) {
              const latitude = EXIF.GPSLatitudeRef === 'S' ? 
                -EXIF.GPSLatitude : EXIF.GPSLatitude;
              const longitude = EXIF.GPSLongitudeRef === 'W' ? 
                -EXIF.GPSLongitude : EXIF.GPSLongitude;
              
              resolve({ latitude, longitude });
            } else {
              resolve({ latitude: null, longitude: null });
            }
          });
        };
      } catch (error) {
        reject(error);
      }
    };
    
    reader.readAsDataURL(file);
  });
};

export const verifyMeterLocation = (
  uploadedGPS: GPSCoordinates,
  registeredGPS: GPSCoordinates,
  toleranceInMeters: number = 100
): boolean => {
  if (!uploadedGPS.latitude || !uploadedGPS.longitude || 
      !registeredGPS.latitude || !registeredGPS.longitude) {
    return false;
  }

  // Calculate distance between points using Haversine formula
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (uploadedGPS.latitude * Math.PI) / 180;
  const φ2 = (registeredGPS.latitude * Math.PI) / 180;
  const Δφ = ((registeredGPS.latitude - uploadedGPS.latitude) * Math.PI) / 180;
  const Δλ = ((registeredGPS.longitude - uploadedGPS.longitude) * Math.PI) / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
           Math.cos(φ1) * Math.cos(φ2) *
           Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;

  return distance <= toleranceInMeters;
};