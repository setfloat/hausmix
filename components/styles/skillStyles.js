import styled from "styled-components";
import Server from "./icons/server.svg";
import Browser from "./icons/browser.svg";
import General from "./icons/general.svg";

const SkillContainer = styled.div`
  border: 1px solid grey;
  border: 1px solid rgba(160, 160, 160, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(220, 240, 240, 1);
  border-radius: 1.5rem;
  padding-top: 3rem;
  margin-bottom: 1rem;
`;

const SkillTitle = styled.h2`
  color: rgba(40, 40, 40, 1);
`;

const SkillsDescription = styled.h4`
  max-width: 80%;
  padding: 1rem 2rem 1rem 2rem;
`;

const SkillRow = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 100%;
  justify-content: space-around;
  padding: 1rem 1rem 1rem 1rem;
  flex-wrap: wrap;
`;

const SkillBox = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgba(120, 120, 120, 1);
  border-radius: 2%;
  border-radius: 0.8rem;
  margin: 10rem 1rem 0 1rem;
  min-width: 28rem;
  background-color: white;
  box-shadow: 1px 0 2px rgba(140, 140, 140, 1);
`;

const SkillContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: -4rem;
`;

const IconDiamond = styled.div`
  position: relative;
  height: 14rem;
  width: 14rem;
  /* padding: 2rem; */
  border: 0.1rem solid rgba(100, 100, 100, 1);
  border-radius: 10%;
  box-sizing: border-box;
  top: -6rem;
  background-color: rgba(240, 240, 240, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(45deg);
  box-shadow: 1px 0 4px rgba(70, 70, 70, 1);
`;

const DoubleDiamond = styled.div`
  border: 0.1rem solid rgba(80, 80, 80, 1);
  border-radius: 10%;
  height: 12rem;
  width: 12rem;
  padding: 2rem;
  background-color: rgba(250, 250, 190, 1);
`;

const RightedServer = styled(Server)`
  transform: rotate(-45deg);
`;

const RightedBrowser = styled(Browser)`
  transform: rotate(-45deg);
`;

const RightedGeneral = styled(General)`
  transform: rotate(-45deg);
`;

const Skill = styled.h5``;

export {
  SkillContainer,
  SkillTitle,
  SkillsDescription,
  SkillRow,
  SkillBox,
  SkillContent,
  IconDiamond,
  DoubleDiamond,
  RightedServer,
  RightedBrowser,
  RightedGeneral,
  Skill
};
