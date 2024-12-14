import styled from "styled-components";

const SVGButton = ({ onDownload }: { onDownload: () => void }) => {
  return <DownloadButton onClick={onDownload}>SVG 다운로드</DownloadButton>;
};

export default SVGButton;

const DownloadButton = styled.button`
  width: 130px;
  height: 30px;
  border: 1px solid black;
  cursor: pointer;
  font-size: 14px;
`;
