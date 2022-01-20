import React, { ReactElement } from 'react';
import { SelectionContainer } from '../../shared/Shared';

interface ISelectionProps {
  number: number;
  color: string;
  background: string;
}

function Selection({
  number,
  color,
  background,
}: ISelectionProps): ReactElement {
  return (
    <SelectionContainer color={color} background={background}>
      {number}
    </SelectionContainer>
  );
}

export default Selection;
