import styled from "styled-components";

const ProjectContainer = styled.section`
  max-width: 100%;
  overflow: hidden;
  border: 1px solid rgba(160, 160, 160, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(240, 240, 220, 1);
  border-radius: 1.5rem;
  padding-top: 3rem;
  padding-bottom: 2rem;
  margin-bottom: 1rem;
`;

const ProjectTitle = styled.h1`
  color: rgba(40, 40, 40, 1);
`;

const HausmixTitle = styled.h1`
  font-size: 4rem;
  color: rgba(40, 40, 40, 1);
`;

const ProjectDescription = styled.h3`
  max-width: 90%;
  padding: 1rem 2rem 1rem 2rem;
`;

const ProjectRow = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 100%;
  justify-content: space-around;
  padding: 1rem 1rem 1rem 1rem;
  flex-wrap: wrap;
  padding: 0;
`;

const ProjectBox = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgba(120, 120, 120, 1);
  border-radius: 2%;
  border-radius: 0.8rem;
  margin: 2rem 1rem 0 1rem;
  min-width: 28rem;
  background-color: white;
`;
const ProjectContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 40rem;
  padding: 2rem;
`;

const RowItem = styled.span`
  padding: 0 1rem 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  flex-basis: 1;
  max-width: 250px;
`;

const WorksRow = styled(ProjectRow)`
  justify-content: space-evenly;
`;

const WorksContent = styled(ProjectContent)`
  max-width: 100%;
`;

const EmojiSpan = styled.span`
  font-size: 6rem;
  line-height: 1.4;
`;

const CenteredSpan = styled.span`
  text-align: center;
`;

export {
  ProjectContainer,
  ProjectTitle,
  HausmixTitle,
  ProjectDescription,
  ProjectRow,
  ProjectBox,
  ProjectContent,
  RowItem,
  WorksRow,
  WorksContent,
  EmojiSpan,
  CenteredSpan
};
