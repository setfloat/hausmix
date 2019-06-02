import styled from "styled-components";

const DeskNav = styled.nav`
  background-color: rgb(170, 240, 170);
  border-bottom: 1px solid rgba(70, 70, 70, 0.5);
  display: flex;
  flex-direction: row;
  min-width: 100%;
  justify-content: flex-end;
  min-height: 4rem;
  max-height: 70px;
  align-items: center;
  padding: 0 2rem 0 2rem;
  margin-bottom: 1rem;
  @media (max-width: 700px) {
    display: none;
  }
`;

const MobNavStyled = styled(DeskNav)`
  min-height: min-content;
  max-height: 120px;
  max-height: 100vh;
  overflow: auto;
  padding: 0 0.1rem 0 1rem;
  align-items: flex-start;
  @media (max-width: 700px) {
    display: flex;
  }
  @media (min-width: 701px) {
    display: none;
  }
`;

const NavUL = styled.ul`
  list-style-type: none;
  flex-direction: row;
  display: flex;
  margin: 0;
  padding: 1rem;
`;

const MobNavUL = styled(NavUL)`
  padding: 0;
  flex-direction: column;
  align-items: flex-end;
  min-height: 100%;
  min-width: 100%;
`;

const LinkButton = styled.button`
  box-sizing: border-box;
  background-color: rgba(220, 240, 240, 1);
  border: 0.1rem solid rgba(120, 120, 120, 1);
  border-radius: 8%;
  padding: 1.1rem 1.4rem 1.1rem 1.4rem;
  font-size: 1.5rem;
  line-height: normal;
  margin-left: 1rem;
  :hover {
    cursor: pointer;
  }
  color: #525252;
`;

const LinkLi = styled.li`
  box-sizing: border-box;
  background-color: rgba(220, 240, 240, 1);
  border: 0.1rem solid rgba(120, 120, 120, 1);
  padding: 1.1rem 1.4rem 1.1rem 1.4rem;
  line-height: normal;
  margin-left: 1rem;
  :hover {
    cursor: pointer;
  }
`;

const InnerButtonLinkLi = styled(LinkLi)`
  padding: 0;
  border-radius: 8%;
`;

const MobLinkLi = styled.li`
  box-sizing: border-box;
  padding: 1.1rem 1.4rem 1.1rem 1.4rem;
  min-height: 100%;
  line-height: 15px;
  border-top: 0.1rem solid rgba(250, 250, 250, 1);
  background-color: rgba(255, 255, 255, 0);
  margin: 0 1.5rem 0 0;
  :hover {
    background-color: rgba(220, 240, 240, 0.5);
    cursor: pointer;
  }
`;

const MobTitleLi = styled(MobLinkLi)`
  border: none;
`;

const MobOutLinkLi = styled(MobLinkLi)`
  padding: 0;
`;

// 🍔
const NavBurger = styled.button`
  min-height: 100%;
  margin: 0 1.5rem 0 0;
  padding: 1.1rem 1.4rem 1.1rem 1.4rem;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0);
  border: 0.1rem solid rgba(120, 120, 120, 0);
  font-size: 1.5rem;
  line-height: 1.5rem;
  transform: rotate(90deg);
  :hover {
    background-color: rgba(220, 240, 240, 0.5);
    border: 0.1rem solid rgba(120, 120, 120, 1);
    cursor: pointer;
  }
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  min-width: 100%;
`;

const BoringH3 = styled.h3`
  padding: none;
  margin: none;
  align-self: center;
`;

export {
  DeskNav,
  MobNavStyled,
  NavUL,
  MobNavUL,
  LinkLi,
  LinkButton,
  MobLinkLi,
  MobTitleLi,
  NavBurger,
  FlexRow,
  BoringH3,
  InnerButtonLinkLi,
  MobOutLinkLi
};
