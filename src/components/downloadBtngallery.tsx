import { cloudinaryResources } from '../types/cloudinary';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';



interface DownloadBtnProps {
  resources: cloudinaryResources[];
}

const DownloadBtn = ({ resources }: DownloadBtnProps) => {
  const handleDownload = () => {
    const downloadResource = (resource: cloudinaryResources) => {
      fetch(resource.secure_url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.blob();
        })
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${resource.public_id}.${resource.format}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    };

    if (Array.isArray(resources)) {
      resources.forEach(downloadResource);
    } else {
      downloadResource(resources);
    }
  };

  return (
    <Button variant="ghost" className="text-black" onClick={handleDownload}>
      <Download className="h-6 w-6" />
      <span className="sr-only">Download</span>
    </Button>
  );
};

export default DownloadBtn;