'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Download } from 'lucide-react';

import Container from '@/components/Container';
import { Button, buttonVariants } from '@/components/ui/button';
import { cloudinaryResources } from '@/types/cloudinary';
import CldImage from '../CldImage';
import DownloadBtn from '../downloadBtnViewer';

interface Deletion {
  state: string;
}

interface MediaViewerProps {
  resource: cloudinaryResources;
}

const MediaViewer = ({ resource }: MediaViewerProps) => {
  const [deletion, setDeletion] = useState<Deletion>();
  // Canvas sizing based on the image dimensions. The tricky thing about
  // showing a single image in a space like this in a responsive way is trying
  // to take up as much room as possible without distorting it or upscaling
  // the image. Since we have the resource width and height, we can dynamically
  // determine whether it's landscape, portrait, or square, and change a little
  // CSS to make it appear centered and scalable!

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

  /**
   * closeMenus
   * @description Closes all panel menus and dialogs
   */

  function closeMenus() {
    setDeletion(undefined)
  }

  /**
   * handleOnDeletionOpenChange
   */

  function handleOnDeletionOpenChange(isOpen: boolean) {
    // Reset deletion dialog if the user is closing it
    if ( !isOpen ) {
      setDeletion(undefined);
    }
  }

  // Listen for clicks outside of the panel area and if determined
  // to be outside, close the panel. This is marked by using
  // a data attribute to provide an easy way to reference it on
  // multiple elements

  useEffect(() => {
    document.body.addEventListener('click', handleOnOutsideClick)
    return () => {
      document.body.removeEventListener('click', handleOnOutsideClick)
    }
  }, []);

  function handleOnOutsideClick(event: MouseEvent) {
    const excludedElements = Array.from(document.querySelectorAll('[data-exclude-close-on-click="true"]'));
    const clickedExcludedElement = excludedElements.filter(element => event.composedPath().includes(element)).length > 0;

    if ( !clickedExcludedElement ) {
      closeMenus();
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