// Max dimension (longest side) and target byte size before base64 encoding.
// Vercel Hobby body limit is 4.5 MB; base64 adds ~33%, so keep raw < 1.2 MB.
const MAX_PX = 1400;
const MAX_BYTES = 1_200_000;

export interface ProcessedImage {
  base64: string;
  mimeType: string;
  originalName: string;
  compressedKB: number;
}

function isHeic(file: File): boolean {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return (
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    ext === "heic" ||
    ext === "heif"
  );
}

async function convertHeicToBlob(file: File): Promise<Blob> {
  // Dynamically import so it only loads on demand (saves ~200 KB for other users)
  const heic2any = (await import("heic2any")).default;
  const result = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.85 });
  return Array.isArray(result) ? result[0] : result;
}

async function loadImage(blob: Blob): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(blob);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Could not read image")); };
    img.src = url;
  });
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Strip the data URI prefix: "data:image/jpeg;base64,"
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function compressToBlob(img: HTMLImageElement, quality: number): Promise<Blob> {
  const scale = Math.min(1, MAX_PX / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.round(img.naturalWidth * scale);
  const h = Math.round(img.naturalHeight * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  ctx.drawImage(img, 0, 0, w, h);

  // Primary path: toBlob (async, memory-efficient)
  try {
    const blob = await new Promise<Blob | null>(resolve =>
      canvas.toBlob(resolve, "image/jpeg", quality)
    );
    if (blob) return blob;
  } catch {
    // fall through to toDataURL
  }

  // Fallback: toDataURL — synchronous, universally supported (incl. iOS Safari)
  const dataUrl = canvas.toDataURL("image/jpeg", quality);
  const b64 = dataUrl.split(",")[1];
  if (!b64) throw new Error("Canvas export failed");
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: "image/jpeg" });
}

export async function processImageForUpload(
  file: File,
  onProgress?: (msg: string) => void
): Promise<ProcessedImage> {
  onProgress?.("Preparing image…");

  let sourceBlob: Blob = file;

  // 1. HEIC/HEIF conversion (iPhone default format)
  if (isHeic(file)) {
    onProgress?.("Converting HEIC…");
    try {
      sourceBlob = await convertHeicToBlob(file);
    } catch {
      // heic2any failed — iOS Safari can often render HEIC natively in canvas,
      // so fall through and attempt canvas load directly.
      sourceBlob = file;
    }
  }

  // 2. Load into canvas for resize + compress
  onProgress?.("Compressing…");
  const img = await loadImage(sourceBlob);

  // Try quality 0.85 first, step down if still too large
  let blob = await compressToBlob(img, 0.85);
  if (blob.size > MAX_BYTES) {
    blob = await compressToBlob(img, 0.72);
  }
  if (blob.size > MAX_BYTES) {
    blob = await compressToBlob(img, 0.55);
  }

  // 3. Base64 via FileReader (avoids the slow char-by-char loop)
  onProgress?.("Uploading…");
  const base64 = await blobToBase64(blob);

  return {
    base64,
    mimeType: "image/jpeg",
    originalName: file.name,
    compressedKB: Math.round(blob.size / 1024),
  };
}
