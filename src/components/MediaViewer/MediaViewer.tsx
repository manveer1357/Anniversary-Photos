'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Download } from 'lucide-react';

import Container from '@/components/Container';
import { Button, buttonVariants } from '@/components/ui/button';
import { cloudinaryResources } from '@/types/cloudinary';
import CldImage from '../CldImage';
import DownloadBtn from '../downloadBtnViewer';

interface MediaViewerProps {
  resource: cloudinaryResources;
}

const MediaViewer = ({ resource }: MediaViewerProps) => {
  const canvasHeight = resource.height;
  const canvasWidth = resource.width;

  const isSquare = canvasHeight === canvasWidth;
  const isLandscape = canvasWidth > canvasHeight;
  const isPortrait = canvasHeight > canvasWidth;

  const imgStyles: Record<string, string | number> = {};

  if ( isLandscape ) {
    imgStyles.maxWidth = resource.width;
    imgStyles.width = '100%';
    imgStyles.height = 'auto';
    if (screen.width > 768) {
      imgStyles.height = '100%';
      imgStyles.width = 'auto';
    }
  } else if ( isPortrait || isSquare ) {
    imgStyles.maxHeight = resource.height;
    imgStyles.height = '90%';
    imgStyles.width = 'auto'
    if (screen.width > 768) {
      imgStyles.height = '100vh';
      imgStyles.width = 'auto';
    }
  }

  return (
    <div className="h-screen bg-black px-0">

      <Container className="fixed z-10 top-0 left-0 w-full h-16 flex items-center justify-between gap-4 bg-gradient-to-b from-black">
        <div className="flex items-center gap-4">
          <ul>
            <li>
              <Link href="/" className={`${buttonVariants({ variant: "ghost" })} text-white`}>
                <ChevronLeft className="h-6 w-6" />
                Back
              </Link>
            </li>
          </ul>
        </div>
        <ul className="flex items-center gap-4">
          <li>
            <DownloadBtn resources={resource} />
          </li>
        </ul>
      </Container>

      {/** Asset viewer */}

      <div className="relative flex justify-center items-center align-center w-full h-full">
        <CldImage
          className="object-cover"
          width={resource.width}
          height= {resource.height}
          src={resource.public_id}
          alt=" "
          style={imgStyles}
        />
      </div>
    </div>
  )
};

export default MediaViewer;