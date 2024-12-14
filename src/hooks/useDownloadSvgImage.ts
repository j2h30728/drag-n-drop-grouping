import { useCallback, useState } from "react";
import domtoimage from "dom-to-image";

interface DownloadOptions {
  filename?: string;
}

const useDownloadSvgImage = (ref: React.RefObject<HTMLDivElement>, options?: DownloadOptions) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadSvgImage = useCallback(() => {
    if (!ref.current) {
      console.error("캡처할 요소가 없습니다.");
      setError("캡처할 요소가 없습니다.");
      return;
    }

    setIsDownloading(true);
    setError(null);

    domtoimage
      .toSvg(ref.current)
      .then((dataUrl: string) => {
        const link = document.createElement("a");
        const fileName = options?.filename || "viewport.svg";
        link.download = fileName;
        link.href = dataUrl;
        link.click();
        setIsDownloading(false);
      })
      .catch((err: unknown) => {
        console.error("SVG 다운로드 실패:", err);
        setError("SVG 다운로드에 실패했습니다.");
        setIsDownloading(false);
      });
  }, [ref, options]);

  return { downloadSvgImage, isDownloading, error };
};

export default useDownloadSvgImage;
