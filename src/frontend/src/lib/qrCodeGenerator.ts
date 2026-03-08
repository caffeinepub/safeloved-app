/**
 * Enhanced QR Code Generator with dual-purpose data and custom styling
 * Generates QR codes that display fallback text for external scanners
 * and contain the unique record code for in-app scanning
 */

interface QRCodeOptions {
  size?: number;
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";
  logoUrl?: string;
  logoSize?: number;
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
}

/**
 * Encodes dual-purpose data for QR code
 * Format: SAFELOVED:{uniqueCode}|{displayText}
 */
export function encodeDualPurposeData(
  uniqueCode: string,
  displayText: string,
): string {
  // Ensure uniqueCode and displayText are properly trimmed
  const cleanCode = uniqueCode.trim();
  const cleanText = displayText.trim();

  if (!cleanCode) {
    throw new Error("Unique code cannot be empty");
  }

  return `SAFELOVED:${cleanCode}|${cleanText}`;
}

/**
 * Decodes dual-purpose QR data
 * Returns null if not a SafeLoved QR code or if format is invalid
 */
export function decodeDualPurposeData(
  data: string,
): { uniqueCode: string; displayText: string } | null {
  try {
    // Validate input
    if (!data || typeof data !== "string") {
      return null;
    }

    const trimmedData = data.trim();

    // Check if it's a SafeLoved QR code
    if (!trimmedData.startsWith("SAFELOVED:")) {
      return null;
    }

    const content = trimmedData.substring("SAFELOVED:".length);

    // Split by pipe character
    const pipeIndex = content.indexOf("|");

    if (pipeIndex === -1) {
      // No pipe found - invalid format
      return null;
    }

    const uniqueCode = content.substring(0, pipeIndex).trim();
    const displayText = content.substring(pipeIndex + 1).trim();

    // Validate that we have both parts
    if (!uniqueCode || uniqueCode.length === 0) {
      return null;
    }

    return {
      uniqueCode,
      displayText: displayText || "", // displayText can be empty
    };
  } catch (error) {
    console.error("Error decoding QR data:", error);
    return null;
  }
}

/**
 * Checks if scanned data is a SafeLoved QR code
 */
export function isSafeLovedQRCode(scannedData: string): boolean {
  if (!scannedData || typeof scannedData !== "string") {
    return false;
  }
  return scannedData.trim().startsWith("SAFELOVED:");
}

/**
 * Extracts the unique code from scanned QR data
 * Returns the code if it's a SafeLoved QR, otherwise returns null
 */
export function extractUniqueCode(scannedData: string): string | null {
  const decoded = decodeDualPurposeData(scannedData);
  return decoded ? decoded.uniqueCode : null;
}

/**
 * Gets the display text from scanned QR data
 * Returns the display text if it's a SafeLoved QR, otherwise returns the raw data
 */
export function getDisplayText(scannedData: string): string {
  const decoded = decodeDualPurposeData(scannedData);
  return decoded ? decoded.displayText : scannedData;
}

/**
 * Validates that a scanned SafeLoved QR code has proper format
 * Returns true if valid, false otherwise
 */
export function validateSafeLovedQRCode(scannedData: string): boolean {
  if (!isSafeLovedQRCode(scannedData)) {
    return false;
  }

  const decoded = decodeDualPurposeData(scannedData);
  return decoded !== null && decoded.uniqueCode.length > 0;
}

/**
 * Generates an enhanced QR code with custom styling and logo overlay
 */
export async function generateEnhancedQRCode(
  uniqueCode: string,
  displayText: string,
  options: QRCodeOptions = {},
): Promise<string> {
  const {
    size = 400,
    errorCorrectionLevel = "H",
    logoUrl = "/assets/generated/safeloved-logo-new-transparent.dim_300x100.png",
    logoSize = 80,
    primaryColor = "#8b5cf6",
    secondaryColor = "#06b6d4",
    backgroundColor = "#ffffff",
  } = options;

  // Encode dual-purpose data
  const qrData = encodeDualPurposeData(uniqueCode, displayText);

  // Create canvas
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  // Generate base QR code using external API with high error correction
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrData)}&ecc=${errorCorrectionLevel}`;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = async () => {
      try {
        // Draw white background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, size, size);

        // Apply gradient overlay to QR code
        ctx.drawImage(img, 0, 0, size, size);

        // Apply color gradient effect
        const gradient = ctx.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, primaryColor);
        gradient.addColorStop(1, secondaryColor);

        ctx.globalCompositeOperation = "multiply";
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);

        // Reset composite operation
        ctx.globalCompositeOperation = "source-over";

        // Add rounded corners effect by clipping
        const cornerRadius = size * 0.05;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cornerRadius, 0);
        ctx.lineTo(size - cornerRadius, 0);
        ctx.quadraticCurveTo(size, 0, size, cornerRadius);
        ctx.lineTo(size, size - cornerRadius);
        ctx.quadraticCurveTo(size, size, size - cornerRadius, size);
        ctx.lineTo(cornerRadius, size);
        ctx.quadraticCurveTo(0, size, 0, size - cornerRadius);
        ctx.lineTo(0, cornerRadius);
        ctx.quadraticCurveTo(0, 0, cornerRadius, 0);
        ctx.closePath();
        ctx.clip();

        // Redraw the QR code within the clipped area
        ctx.clearRect(0, 0, size, size);
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);

        // Reapply gradient
        ctx.globalCompositeOperation = "multiply";
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
        ctx.globalCompositeOperation = "source-over";

        ctx.restore();

        // Load and draw logo in center
        if (logoUrl) {
          const logo = new Image();
          logo.crossOrigin = "anonymous";

          logo.onload = () => {
            const logoX = (size - logoSize) / 2;
            const logoY = (size - logoSize * 0.4) / 2; // Adjust for logo aspect ratio

            // Draw white background circle for logo
            const bgRadius = logoSize * 0.6;
            ctx.fillStyle = backgroundColor;
            ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 2;
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, bgRadius, 0, Math.PI * 2);
            ctx.fill();

            // Reset shadow
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            // Draw logo
            ctx.drawImage(logo, logoX, logoY, logoSize, logoSize * 0.4);

            // Convert to data URL
            const dataUrl = canvas.toDataURL("image/png");
            resolve(dataUrl);
          };

          logo.onerror = () => {
            // If logo fails to load, return QR code without logo
            const dataUrl = canvas.toDataURL("image/png");
            resolve(dataUrl);
          };

          logo.src = logoUrl;
        } else {
          const dataUrl = canvas.toDataURL("image/png");
          resolve(dataUrl);
        }
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to generate QR code"));
    };

    img.src = qrApiUrl;
  });
}
