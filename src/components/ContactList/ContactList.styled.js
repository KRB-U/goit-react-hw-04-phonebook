import styled from 'styled-components';

export const ContactItem = styled.li`
  margin: 0 auto;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  width: 300px;
  justify-content: space-between;
`;

export const Button = styled.button`
  border: none;
  border-radius: 5px;

  background-color: orange;
  cursor: pointer;

  width: fit-content;
  height: 25px;

  display: flex;
  align-items: center;
  padding: 10px;

  color: black;

  &:hover {
    background-color: green;
    color: white;
  }

  &:active {
    background-color: red;
    color: white;
  }
`;
