import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface IOutputProps {
  text: string | number | undefined;
}

const OutputContainer = styled.div`
  background: #f8f5f2;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px 16px;
  margin-bottom: 8px;
  width: 198px;
  height: 32px;

  font-family: Nunito;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #0a3847;
`;

function Output({ text }: IOutputProps): ReactElement {
  return <OutputContainer>{text}</OutputContainer>;
}

export default Output;
