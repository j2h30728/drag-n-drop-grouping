import styled from "styled-components";

import AlignSection from "./LayPanel/AlignSection";
import AddSection from "./LayPanel/AddSection";
import PanelItemList from "./LayPanel/PanelItemList";

const LayPanel = () => {
  return (
    <PanelContainer>
      <AlignSection />
      <AddSection />
      <PanelItemList />
    </PanelContainer>
  );
};

export default LayPanel;

const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: gray;
  padding: 3px;
`;
