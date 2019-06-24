import PleaseSignIn from "../components/PleaseSignIn";
import Settings from "../components/Settings";
import { PageContainer, PageMax } from "./styles/PageStyles";

const SettingsPage = () => {
  return (
    <PageContainer>
      <PageMax>
        <PleaseSignIn>
          <Settings />
        </PleaseSignIn>
      </PageMax>
    </PageContainer>
  );
};
// }

export default SettingsPage;
