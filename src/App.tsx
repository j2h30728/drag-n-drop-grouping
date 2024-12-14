import { useEffect, useRef } from "react";
import styled from "styled-components";

import { useItemsStore, useSelectionStore } from "./store";
import LayPanel from "./components/LayPanel";
import ViewPort from "./components/ViewPort";
import useDownloadSvgImage from "./hooks/useDownloadSvgImage";
import SVGButton from "./components/SVGButton";

const App = () => {
  const groupSelectedElements = useItemsStore((state) => state.groupSelectedElements);
  const unGroupSelectedElements = useItemsStore((state) => state.unGroupSelectedElements);
  const selectedIds = useSelectionStore((state) => state.selectedIds);

  const ctrlPressedRef = useRef(false);
  const shiftPressedRef = useRef(false);

  const viewPortRef = useRef<HTMLDivElement>(null);

  const { downloadSvgImage } = useDownloadSvgImage(viewPortRef, {
    filename: "viewport",
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") shiftPressedRef.current = true;
      if (e.key === "Control") ctrlPressedRef.current = true;

      if (ctrlPressedRef.current && e.code === "KeyG" && !shiftPressedRef.current) {
        groupSelectedElements(selectedIds);
      }

      if (ctrlPressedRef.current && shiftPressedRef.current && e.code === "KeyG") {
        unGroupSelectedElements(selectedIds);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") shiftPressedRef.current = false;
      if (e.key === "Control") ctrlPressedRef.current = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [groupSelectedElements, unGroupSelectedElements, selectedIds]);

  return (
    <Container>
      <LayPanel />
      <section>
        <SVGButton onDownload={downloadSvgImage} />
        <ViewPort ref={viewPortRef} />
      </section>
    </Container>
  );
};

export default App;

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;

  section {
    width: 100%;
  }
`;
