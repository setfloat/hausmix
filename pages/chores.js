import PleaseSignIn from "../components/PleaseSignIn";
import HouseholdChores from "../components/HouseholdChores";
import { PageContainer, PageMax } from "./styles/PageStyles";

const ChoresPage = () => {
  return (
    <PageContainer>
      <PageMax>
        <PleaseSignIn>
          <HouseholdChores />
        </PleaseSignIn>
      </PageMax>
    </PageContainer>
  );
};
// }

export default ChoresPage;
