import styled from "styled-components";
import { COMPONENTS, ElementType } from "../../utils/types";
import { useItemsStore } from "../../store";

const AddSection = () => {
  const addItem = useItemsStore((state) => state.addItem);

  return (
    <SectionContainer>
      <h3>Add</h3>
      {Object.entries(COMPONENTS).map(([componentName, componentTag]) => (
        <button type="button" key={componentName} onClick={() => addItem(componentTag as ElementType)}>
          {componentName}
        </button>
      ))}
    </SectionContainer>
  );
};

export default AddSection;

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
