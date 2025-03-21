"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { CldImage } from 'next-cloudinary';

import Container from '@/components/Container';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cloudinaryResources } from '@/types/cloudinary';
import DownloadBtn from '../downloadBtngallery';

interface MediaGalleryProps {
  resources: Array<cloudinaryResources>
}

const MediaGallery = ({ resources }: MediaGalleryProps) => {
  const [selected, setSelected] = useState<Array<string>>([]);
  /**
   * handleOnClearSelection
   */
  function handleOnClearSelection() {
    setSelected([]);
  }

  function handleDownload() {
    selected.forEach((id) => {
      const resource = resources.find((resource) => resource.public_id === id);
      if (resource) {
        const link = document.createElement('a');
        link.href = resource.secure_url; // Use the secure URL of the image
        link.download = resource.public_id; // Set the filename for the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  }

  return (
    <>
      {/** Management navbar presented when assets are selected */}
      {selected.length > 0 && (
        <Container className="fixed z-50 top-0 left-0 w-full h-16 flex items-center justify-between gap-4 bg-white shadow-lg">
          <div className="flex items-center gap-4">
            <ul>
              <li>
                <Button variant="ghost" className='text-black' onClick={handleOnClearSelection}>
                  <X className="h-6 w-6" />
                  <span className="sr-only text-black">Clear Selected</span>
                </Button>
              </li>
            </ul>
            <p>
              <span className='text-black'>{selected?.length} Selected</span>
            </p>
          </div>
          <ul className="flex items-center gap-4">
            <li>
              <DownloadBtn
                resources={selected
                  .map(id => resources.find(resource => resource.public_id === id))
                  .filter((resource): resource is cloudinaryResources => resource !== undefined)} // Filter out undefined values
              />
            </li>
          </ul>
        </Container>
      )}

      {/** Gallery */}
      <Container>
        <form>
          {Array.isArray(resources) && (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
              {resources.map((resource) => {
                const isChecked = selected.includes(resource.public_id);

                function handleOnSelectResource(checked: boolean) {
                  setSelected((prev) => {
                    if (checked) {
                      return Array.from(new Set([...(prev || []), resource.public_id]));
                    } else {
                      return prev.filter((id) => id !== resource.public_id);
                    }
                  });
                }

                return (
                  <div key={resource.public_id} className="xl:row-span-2 bg-transparent">
                    <div className="relative bg-zinc rounded-md">
                      <label className={`bg-transparent absolute ${isChecked ? 'opacity-100' : 'opacity-0'} hover:opacity-100 transition-opacity top-3 left-3 p-1`} htmlFor={resource.public_id}>
                        <span className="sr-only">
                          Select Image &quot;{resource.public_id}&quot;
                        </span>
                        <Checkbox
                          className={`w-6 h-6 rounded-full bg-black ${isChecked ? 'border-blue-500 bg-white' : 'border-zinc-300'}`}
                          id={resource.public_id}
                          onCheckedChange={handleOnSelectResource}
                          checked={isChecked}
                        />
                      </label>
                      <Link
                        className={` cursor-pointer rounded-xl transition-[border] ${isChecked ? 'border-white' : 'border-none'}`}
                        href={`/resources/${resource.asset_id}`}
                      >
                        <CldImage
                          width={resource.width}
                          height={resource.height}
                          src={resource.public_id}
                          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw'
                          alt="wait krle bhaii!!"
                          className='max-w-full h-auto rounded-lg'
                        />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </form>
      </Container>
    </>
  )
}

export default MediaGallery;