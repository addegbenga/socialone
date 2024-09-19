// // import React, { useState, useRef, useEffect } from "react";
// // import { Crop, ZoomIn, ZoomOut, RotateCw, Download } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { Slider } from "@/components/ui/slider";

// // export default function ImageEditor({
// //   selected,
// // }: {
// //   selected: { img: string; rawFile: File };
// // }) {
// //   const [image, setImage] = useState<HTMLImageElement | null>(null);
// //   const [zoom, setZoom] = useState(1);
// //   const [rotation, setRotation] = useState(0);
// //   const [crop, setCrop] = useState({ x: 0, y: 0, width: 200, height: 200 });
// //   const [isCropping, setIsCropping] = useState(false);
// //   const [isDragging, setIsDragging] = useState(false);
// //   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
// //   const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
// //   const [resizeHandle, setResizeHandle] = useState<string | null>(null);
// //   const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
// //   const imageCanvasRef = useRef<HTMLCanvasElement>(null);

// //   const CANVAS_SIZE = 600;
// //   const PADDING = 20;
// //   const MIN_ZOOM = 0.1;
// //   const MAX_ZOOM = 3;

// //   useEffect(() => {
// //     if (image) {
// //       drawImage();
// //     }
// //   }, [image, zoom, rotation, crop, imagePosition, isCropping]);

// //   useEffect(() => {
// //     if (isCropping) {
// //       adjustImagePositionAndZoom();
// //     }
// //   }, [crop, isCropping]);

// //   const handleImageUpload = (base64Data: string) => {
// //     const img = new Image();
// //     img.onload = () => {
// //       setImage(img);
// //       const aspectRatio = img.width / img.height;
// //       const newWidth = Math.min(CANVAS_SIZE - 2 * PADDING, img.width);
// //       const newHeight = newWidth / aspectRatio;
// //       setCrop({
// //         x: PADDING,
// //         y: PADDING,
// //         width: newWidth,
// //         height: newHeight,
// //       });
// //       setImagePosition({ x: 0, y: 0 });
// //       adjustZoomForCrop(newWidth, newHeight, img.width, img.height);
// //     };
// //     img.src = base64Data;
// //   };
// //   useEffect(() => {
// //     handleImageUpload(selected.img);
// //   }, []);

// //   const drawImage = () => {
// //     const imageCanvas = imageCanvasRef.current;
// //     const overlayCanvas = overlayCanvasRef.current;
// //     if (!imageCanvas || !overlayCanvas || !image) return;

// //     const imageCtx = imageCanvas.getContext("2d");
// //     const overlayCtx = overlayCanvas.getContext("2d");

// //     if (!imageCtx || !overlayCtx) return;

// //     // Clear both canvases
// //     imageCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
// //     overlayCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

// //     // Draw the image on the first canvas (image layer)
// //     imageCtx.save();
// //     imageCtx.translate(crop.x + crop.width / 2, crop.y + crop.height / 2);
// //     imageCtx.rotate((rotation * Math.PI) / 180);
// //     imageCtx.scale(zoom, zoom);
// //     imageCtx.drawImage(
// //       image,
// //       -image.width / 2 + imagePosition.x,
// //       -image.height / 2 + imagePosition.y,
// //       image.width,
// //       image.height
// //     );
// //     imageCtx.restore();

// //     // Draw crop overlay
// //     if (isCropping) {
// //       overlayCtx.fillStyle = "rgba(0, 0, 0, 0.3)";
// //       overlayCtx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
// //       overlayCtx.clearRect(crop.x, crop.y, crop.width, crop.height);
// //       overlayCtx.strokeStyle = "#1e2027";
// //       overlayCtx.lineWidth = 2;
// //       overlayCtx.strokeRect(crop.x, crop.y, crop.width, crop.height);

// //       // Draw resize handles
// //       const handleSize = 10;
// //       const drawHandle = (x: number, y: number) => {
// //         overlayCtx.fillStyle = "white";

// //         overlayCtx.fillRect(
// //           x - handleSize / 2,
// //           y - handleSize / 2,
// //           handleSize,
// //           handleSize
// //         );
// //         overlayCtx.strokeStyle = "#1e2027";
// //         overlayCtx.strokeRect(
// //           x - handleSize / 2,
// //           y - handleSize / 2,
// //           handleSize,
// //           handleSize
// //         );
// //       };

// //       drawHandle(crop.x, crop.y);
// //       drawHandle(crop.x + crop.width, crop.y);
// //       drawHandle(crop.x, crop.y + crop.height);
// //       drawHandle(crop.x + crop.width, crop.y + crop.height);
// //     }
// //   };

// //   const handleZoom = (value: number[]) => {
// //     const newZoom = Math.max(getMinZoom(), Math.min(value[0], MAX_ZOOM));
// //     setZoom(newZoom);
// //     adjustImagePositionAndZoom(newZoom);
// //   };

// //   const getMinZoom = () => {
// //     if (!image) return MIN_ZOOM;
// //     const cropAspectRatio = crop.width / crop.height;
// //     const imageAspectRatio = image.width / image.height;
// //     if (cropAspectRatio > imageAspectRatio) {
// //       return crop.width / image.width;
// //     } else {
// //       return crop.height / image.height;
// //     }
// //   };

// //   const handleRotate = () => {
// //     setRotation((prev) => (prev + 90) % 360);
// //     adjustImagePositionAndZoom();
// //   };

// //   const handleCropToggle = () => {
// //     setIsCropping(!isCropping);
// //     if (!isCropping) {
// //       adjustImagePositionAndZoom();
// //     }
// //   };

// //   const handleMouseDown = (e: React.MouseEvent) => {
// //     if (!overlayCanvasRef.current) return;

// //     const rect = overlayCanvasRef.current.getBoundingClientRect();
// //     const x = e.clientX - rect.left;
// //     const y = e.clientY - rect.top;

// //     setDragStart({ x, y });
// //     setIsDragging(true);

// //     if (isCropping) {
// //       const handleSize = 10;

// //       if (
// //         Math.abs(x - crop.x) <= handleSize &&
// //         Math.abs(y - crop.y) <= handleSize
// //       ) {
// //         setResizeHandle("topLeft");
// //       } else if (
// //         Math.abs(x - (crop.x + crop.width)) <= handleSize &&
// //         Math.abs(y - crop.y) <= handleSize
// //       ) {
// //         setResizeHandle("topRight");
// //       } else if (
// //         Math.abs(x - crop.x) <= handleSize &&
// //         Math.abs(y - (crop.y + crop.height)) <= handleSize
// //       ) {
// //         setResizeHandle("bottomLeft");
// //       } else if (
// //         Math.abs(x - (crop.x + crop.width)) <= handleSize &&
// //         Math.abs(y - (crop.y + crop.height)) <= handleSize
// //       ) {
// //         setResizeHandle("bottomRight");
// //       } else {
// //         setResizeHandle("move");
// //       }
// //     } else {
// //       setResizeHandle("move");
// //     }
// //   };

// //   const handleMouseMove = (e: React.MouseEvent) => {
// //     if (!isDragging || !overlayCanvasRef.current || !image) return;

// //     const rect = overlayCanvasRef.current.getBoundingClientRect();
// //     const x = e.clientX - rect.left;
// //     const y = e.clientY - rect.top;
// //     const dx = x - dragStart.x;
// //     const dy = y - dragStart.y;

// //     if (resizeHandle === "move") {
// //       // Apply rotation transformation to dx and dy
// //       const radians = (rotation * Math.PI) / 180;
// //       const rotatedDx = dx * Math.cos(radians) + dy * Math.sin(radians);
// //       const rotatedDy = -dx * Math.sin(radians) + dy * Math.cos(radians);

// //       setImagePosition((prev) => ({
// //         x: prev.x + rotatedDx / zoom,
// //         y: prev.y + rotatedDy / zoom,
// //       }));
// //     } else if (isCropping && resizeHandle) {
// //       setCrop((prevCrop) => {
// //         const newCrop = { ...prevCrop };
// //         switch (resizeHandle) {
// //           case "topLeft":
// //             newCrop.x = Math.max(
// //               PADDING,
// //               Math.min(prevCrop.x + dx, prevCrop.x + prevCrop.width - 10)
// //             );
// //             newCrop.y = Math.max(
// //               PADDING,
// //               Math.min(prevCrop.y + dy, prevCrop.y + prevCrop.height - 10)
// //             );
// //             newCrop.width = prevCrop.width - (newCrop.x - prevCrop.x);
// //             newCrop.height = prevCrop.height - (newCrop.y - prevCrop.y);
// //             break;
// //           case "topRight":
// //             newCrop.y = Math.max(
// //               PADDING,
// //               Math.min(prevCrop.y + dy, prevCrop.y + prevCrop.height - 10)
// //             );
// //             newCrop.width = Math.max(
// //               10,
// //               Math.min(prevCrop.width + dx, CANVAS_SIZE - PADDING - prevCrop.x)
// //             );
// //             newCrop.height = prevCrop.height - (newCrop.y - prevCrop.y);
// //             break;
// //           case "bottomLeft":
// //             newCrop.x = Math.max(
// //               PADDING,
// //               Math.min(prevCrop.x + dx, prevCrop.x + prevCrop.width - 10)
// //             );
// //             newCrop.width = prevCrop.width - (newCrop.x - prevCrop.x);
// //             newCrop.height = Math.max(
// //               10,
// //               Math.min(prevCrop.height + dy, CANVAS_SIZE - PADDING - prevCrop.y)
// //             );
// //             break;
// //           case "bottomRight":
// //             newCrop.width = Math.max(
// //               10,
// //               Math.min(prevCrop.width + dx, CANVAS_SIZE - PADDING - prevCrop.x)
// //             );
// //             newCrop.height = Math.max(
// //               10,
// //               Math.min(prevCrop.height + dy, CANVAS_SIZE - PADDING - prevCrop.y)
// //             );
// //             break;
// //         }
// //         return newCrop;
// //       });
// //     }

// //     setDragStart({ x, y });
// //     adjustImagePositionAndZoom();
// //   };

// //   const handleMouseUp = () => {
// //     setIsDragging(false);
// //     setResizeHandle(null);
// //   };

// //   const adjustZoomForCrop = (
// //     cropWidth: number,
// //     cropHeight: number,
// //     imageWidth: number,
// //     imageHeight: number
// //   ) => {
// //     const cropAspectRatio = cropWidth / cropHeight;
// //     const imageAspectRatio = imageWidth / imageHeight;

// //     let newZoom;

// //     if (cropAspectRatio > imageAspectRatio) {
// //       newZoom = cropWidth / imageWidth;
// //     } else {
// //       newZoom = cropHeight / imageHeight;
// //     }

// //     newZoom = Math.max(getMinZoom(), Math.min(newZoom, MAX_ZOOM));
// //     setZoom(newZoom);
// //   };

// //   const adjustImagePositionAndZoom = (newZoom: number = zoom) => {
// //     if (!image) return;

// //     const minZoom = getMinZoom();
// //     newZoom = Math.max(minZoom, newZoom);
// //     setZoom(newZoom);

// //     const scaledImageWidth = image.width * newZoom;
// //     const scaledImageHeight = image.height * newZoom;

// //     setImagePosition((prev) => ({
// //       x: Math.max(
// //         Math.min(prev.x, 0),
// //         -Math.abs(scaledImageWidth - crop.width) / (2 * newZoom)
// //       ),
// //       y: Math.max(
// //         Math.min(prev.y, 0),
// //         -Math.abs(scaledImageHeight - crop.height) / (2 * newZoom)
// //       ),
// //     }));
// //   };

// //   const handleDownload = () => {
// //     if (!imageCanvasRef.current || !image) return;

// //     const canvas = document.createElement("canvas");
// //     const ctx = canvas.getContext("2d");
// //     if (!ctx) return;

// //     canvas.width = crop.width;
// //     canvas.height = crop.height;

// //     ctx.save();
// //     ctx.translate(crop.width / 2, crop.height / 2);
// //     ctx.rotate((rotation * Math.PI) / 180);
// //     ctx.scale(zoom, zoom);
// //     ctx.drawImage(
// //       image,
// //       -image.width / 2 + imagePosition.x,
// //       -image.height / 2 + imagePosition.y,
// //       image.width,
// //       image.height
// //     );
// //     ctx.restore();

// //     const link = document.createElement("a");
// //     link.download = "cropped-image.png";
// //     link.href = canvas.toDataURL();
// //     link.click();
// //   };

// //   return (
// //     <div className="flex flex-col items-center space-y-2">
// //       <div
// //         style={{
// //           position: "relative",
// //           width: `${CANVAS_SIZE}px`,
// //           height: `${CANVAS_SIZE}px`,
// //         }}
// //       >
// //         <canvas
// //           ref={imageCanvasRef}
// //           width={CANVAS_SIZE}
// //           height={CANVAS_SIZE}
// //           onMouseDown={handleMouseDown}
// //           onMouseMove={handleMouseMove}
// //           onMouseUp={handleMouseUp}
// //           onMouseLeave={handleMouseUp}
// //           style={{
// //             position: "absolute",
// //             left: 0,
// //             top: 0,
// //             background: "#f0f0f0",
// //           }}
// //         />
// //         <canvas
// //           ref={overlayCanvasRef}
// //           width={CANVAS_SIZE}
// //           height={CANVAS_SIZE}
// //           style={{
// //             position: "absolute",
// //             left: 0,
// //             top: 0,
// //             pointerEvents: "none",
// //           }}
// //         />
// //       </div>
// //       <div className="flex flex-col items-center space-y-4 w-full max-w-md">
// //         <div className="flex items-center space-x-2 w-full">
// //           <ZoomIn className="w-4 h-4" />
// //           <Slider
// //             value={[zoom]}
// //             onValueChange={handleZoom}
// //             min={getMinZoom()}
// //             max={MAX_ZOOM}
// //             step={0.01}
// //             className="flex-grow"
// //           />
// //           <ZoomOut className="w-4 h-4" />
// //         </div>
// //         <div className="flex items-center space-x-2">
// //           <Button onClick={handleRotate}>
// //             <RotateCw className="w-4 h-4 mr-2" />
// //             Rotate
// //           </Button>
// //           <Button onClick={handleCropToggle}>
// //             <Crop className="w-4 h-4 mr-2" />
// //             {isCropping ? "Finish Crop" : "Start Crop"}
// //           </Button>
// //           <Button onClick={handleDownload}>
// //             <Download className="w-4 h-4 mr-2" />
// //             Download
// //           </Button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useEffect, useRef, useState } from "react";

// import { Slider } from "@/components/ui/slider";
// import { Button } from "../../button";
// import { ZoomIn, ZoomOut, RotateCw, Crop, Download } from "lucide-react";

// const CANVAS_SIZE = 500; // Adjust canvas size as needed
// const MAX_ZOOM = 2; // Max zoom level

// const ImageEditor = ({
//   selected,
// }: {
//   selected: { img: string; rawFile: File };
// }) => {
//   const imageCanvasRef = useRef<HTMLCanvasElement>(null);
//   const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
//   const [zoom, setZoom] = useState(1);
//   const [rotation, setRotation] = useState(0);
//   const [isCropping, setIsCropping] = useState(false);
//   const [cropCoords, setCropCoords] = useState({
//     startX: 0,
//     startY: 0,
//     endX: 0,
//     endY: 0,
//   });
//   const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);

//   useEffect(() => {
//     const image = new Image();
//     image.src = selected.img; // Base64 image from props
//     image.onload = () => {
//       setLoadedImage(image); // Set image when it's loaded
//       redrawImage(image); // Redraw the image initially
//     };
//   }, [selected.img]);

//   const handleMouseDown = (e: React.MouseEvent) => {
//     if (isCropping) {
//       const { offsetX, offsetY } = e.nativeEvent;
//       setCropCoords({ ...cropCoords, startX: offsetX, startY: offsetY });
//     }
//   };

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (isCropping) {
//       const { offsetX, offsetY } = e.nativeEvent;
//       setCropCoords((prevCoords) => ({
//         ...prevCoords,
//         endX: offsetX,
//         endY: offsetY,
//       }));
//       drawCropOverlay();
//     }
//   };

//   const handleMouseUp = () => {
//     if (isCropping) {
//       performCrop();
//     }
//   };

//   const handleZoom = (value: number[]) => {
//     setZoom(value[0]);
//     if (loadedImage) {
//       redrawImage(loadedImage);
//     }
//   };

//   const handleRotate = () => {
//     setRotation((prevRotation) => (prevRotation + 90) % 360);
//     if (loadedImage) {
//       redrawImage(loadedImage);
//     }
//   };
//   const handleCropToggle = () => {
//     setIsCropping(!isCropping);
//   };

//   const handleDownload = () => {
//     if (imageCanvasRef.current) {
//       const link = document.createElement("a");
//       link.download = "edited_image.png";
//       link.href = imageCanvasRef.current.toDataURL();
//       link.click();
//     }
//   };

//   const drawCropOverlay = () => {
//     const overlayCanvas = overlayCanvasRef.current;
//     if (overlayCanvas) {
//       const ctx = overlayCanvas.getContext("2d");
//       if (ctx) {
//         ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
//         ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
//         ctx.lineWidth = 2;
//         ctx.strokeRect(
//           cropCoords.startX,
//           cropCoords.startY,
//           cropCoords.endX - cropCoords.startX,
//           cropCoords.endY - cropCoords.startY
//         );
//       }
//     }
//   };

//   const performCrop = () => {
//     const canvas = imageCanvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         const { startX, startY, endX, endY } = cropCoords;
//         const cropWidth = endX - startX;
//         const cropHeight = endY - startY;
//         const croppedImage = ctx.getImageData(
//           startX,
//           startY,
//           cropWidth,
//           cropHeight
//         );
//         ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
//         canvas.width = cropWidth;
//         canvas.height = cropHeight;
//         ctx.putImageData(croppedImage, 0, 0);
//         setIsCropping(false);
//       }
//     }
//   };

//   const redrawImage = (image: HTMLImageElement) => {
//     const canvas = imageCanvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
//         ctx.save();
//         ctx.translate(CANVAS_SIZE / 2, CANVAS_SIZE / 2);
//         ctx.scale(zoom, zoom);
//         ctx.rotate((rotation * Math.PI) / 180);
//         ctx.translate(-CANVAS_SIZE / 2, -CANVAS_SIZE / 2);
//         ctx.drawImage(image, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
//         ctx.restore();
//       }
//     }
//   };

//   const getMinZoom = () => {
//     return 1;
//   };

//   return (
//     <div className="flex flex-col items-center space-y-2">
//       <div
//         style={{
//           position: "relative",
//           width: `${CANVAS_SIZE}px`,
//           height: `${CANVAS_SIZE}px`,
//         }}
//       >
//         <canvas
//           ref={imageCanvasRef}
//           width={CANVAS_SIZE}
//           height={CANVAS_SIZE}
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//           onMouseLeave={handleMouseUp}
//           style={{
//             position: "absolute",
//             left: 0,
//             top: 0,
//             background: "#f0f0f0",
//           }}
//         />
//         <canvas
//           ref={overlayCanvasRef}
//           width={CANVAS_SIZE}
//           height={CANVAS_SIZE}
//           style={{
//             position: "absolute",
//             left: 0,
//             top: 0,
//             pointerEvents: "none",
//           }}
//         />
//       </div>
//       <div className="flex flex-col items-center space-y-4 w-full max-w-md">
//         <div className="flex items-center space-x-2 w-full">
//           <ZoomIn className="w-4 h-4" />
//           <Slider
//             value={[zoom]}
//             onValueChange={handleZoom}
//             min={getMinZoom()}
//             max={MAX_ZOOM}
//             step={0.01}
//             className="flex-grow"
//           />
//           <ZoomOut className="w-4 h-4" />
//         </div>
//         <div className="flex items-center space-x-2">
//           <Button onClick={handleRotate}>
//             <RotateCw className="w-4 h-4 mr-2" />
//             Rotate
//           </Button>
//           <Button onClick={handleCropToggle}>
//             <Crop className="w-4 h-4 mr-2" />
//             {isCropping ? "Finish Crop" : "Start Crop"}
//           </Button>
//           <Button onClick={handleDownload}>
//             <Download className="w-4 h-4 mr-2" />
//             Download
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageEditor;

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
