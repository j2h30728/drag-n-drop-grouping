import styled from "styled-components";

import { useLayoutStore, useSelectionStore } from "../../store";

const AlignSection = () => {
  const setIsAllVertically = useLayoutStore((state) => state.setIsAllVertically);
  const setIsGroupVertically = useLayoutStore((state) => state.setGroupAlignState);
  const selectionIds = useSelectionStore((state) => state.selectedIds);

  const handleChangeVertically = () => setIsAllVertically(true);
  const handleChangeHorizontally = () => setIsAllVertically(false);
  const handleChangeGroupVertically = () => {
    selectionIds.forEach((id) => setIsGroupVertically(id, "raw"));
  };
  const handleChangeGroupHorizontally = () => {
    selectionIds.forEach((id) => setIsGroupVertically(id, "column"));
  };

  return (
    <SectionContainer>
      <h3>Align</h3>
      <button onClick={handleChangeVertically}>All Vertically</button>
      <button onClick={handleChangeHorizontally}>All Horizontally</button>
      <button onClick={handleChangeGroupVertically}>Group Vertically</button>
      <button onClick={handleChangeGroupHorizontally}>Group Horizontally</button>
    </SectionContainer>
  );
};

export default AlignSection;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  border: 1px solid gray;
  background-color: lightgray;
  gap: 3px;
  padding: 3px 1px;

  h3 {
    font-weight: 600;
    font-size: 20px;
  }

  button {
    width: 100%;
    background-color: white;
    border: 1px solid black;
    padding: 2px;
    margin: 3px 0;
    cursor: pointer;
  }
`;
