import styled from 'styled-components';

export const SideBartext = styled.span`
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  color: #205a6d;
  margin-bottom: 16px;
  align-self: flex-start;
`;

export const SelectionContainer = styled.div<{
  background: string;
  color: string;
}>`
  width: 57px;
  height: 56px;
  background: ${(props) => props.background};
  border-radius: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  color: ${(props) => props.color};
  margin-bottom: 8px;
`;
