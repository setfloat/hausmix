import PleaseSignIn from "../components/PleaseSignIn";
import Invite from "../components/Invite";
import { PageContainer, PageMax } from "./styles/PageStyles";

const InvitePage = () => {
  return (
    <PageContainer>
      <PageMax>
        <PleaseSignIn>
          <Invite />
        </PleaseSignIn>
      </PageMax>
    </PageContainer>
  );
};

export default InvitePage;
