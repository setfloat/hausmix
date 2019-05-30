import PleaseSignIn from "../components/PleaseSignIn";
import CreateChoreTemplate from "../components/CreateChoreTemplate";
import { PageContainer, PageMax } from "./styles/PageStyles";

const ChoresPage = () => {
  return (
    <PageContainer>
      <PageMax>
        <PleaseSignIn>
          <CreateChoreTemplate />
        </PleaseSignIn>
      </PageMax>
    </PageContainer>
  );
};
// }

export default ChoresPage;
