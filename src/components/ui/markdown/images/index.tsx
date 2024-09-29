import React, { useRef, useState, useCallback } from "react";
import Cropper from "react-easy-crop";

import { Slider } from "@/components/ui/slider";
import { ZoomIn, ZoomOut, RotateCw, Download } from "lucide-react";
import { Button } from "../../button";
import { getCroppedImg } from "@/lib/cropper";

interface ImageEditorProps {
  selected: { img: string; rawFile: File };
}

const ImageEditor: React.FC<ImageEditorProps> = ({ selected }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [croppedImage, setCroppedImage] = useState<any>(null);

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        selected.img,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  const onClose = () => {
    setCroppedImage(null);
  };

  const handleDownload = () => {
    if (croppedImage) {
      const link = document.createElement("a");
      link.download = "cropped_image.png";
      link.href = croppedImage;
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div
        className="rounded-xl overflow-hidden"
        style={{
          position: "relative",
          width: "500px", // or use CANVAS_SIZE constant
          height: "400px",
        }}
      >
        <Cropper
          image={selected.img}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          restrictPosition={true}
          onZoomChange={setZoom}
          classes={{
            containerClassName: "dems",
          }}
        />
      </div>
      <div className="flex flex-col items-center space-y-4 w-full max-w-md">
        <div className="flex items-center space-x-2 w-full">
          <ZoomIn className="w-4 h-4" />

          <Slider
            value={[zoom]}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onValueChange={(val) => setZoom(val[0])}
            // onValueChange={(e, zoom) => setZoom(zoom)}
          />
          <ZoomOut className="w-4 h-4" />
        </div>
        {/* <div className="flex items-center space-x-2">
          <Button onClick={handleRotate}>
            <RotateCw className="w-4 h-4 mr-2" />
            Rotate
          </Button>
          <Button onClick={handleCropImage}>
            <Download className="w-4 h-4 mr-2" />
            Crop Image
          </Button>
          <Button onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download Cropped Image
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default ImageEditor;
