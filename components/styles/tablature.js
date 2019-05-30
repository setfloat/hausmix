import styled from "styled-components";

const TabRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
`;

const TabHeader = styled.button`
  font-size: ${(props) => `1.5rem`};
  padding: 1rem;
  margin-right: 0.5rem;
  border: 1px solid rgba(170, 170, 170, 1);
  border: ${(props) =>
    props.tabStatus === props.children.toUpperCase()
      ? "1px solid rgba(170, 170, 170, 1);"
      : "1px solid rgba(222, 222, 222, 1);"};
  border-bottom: none;
  box-sizing: border-box;
  line-height: 3rem;
  background-color: ${(props) => {
    if (props.tabStatus === props.children.toUpperCase()) {
      return props.tabColor || "rgba(200,240,230,0.9)";
    }
  }};
`;

export { TabRow, TabHeader };
