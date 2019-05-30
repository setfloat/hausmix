import PleaseSignIn from "../components/PleaseSignIn";
import Money from "../components/Money";
import { PageContainer, PageMax } from "./styles/PageStyles";

const MoneyPage = (props) => {
  return (
    <PageContainer>
      <PageMax>
        <PleaseSignIn {...props}>
          <Money />
        </PleaseSignIn>
      </PageMax>
    </PageContainer>
  );
};

export default MoneyPage;
