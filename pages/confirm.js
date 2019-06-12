import ConfirmEmail from "../components/ConfirmEmail";
import { EmptyArray } from "../components/EmptyArray";
import { PageContainer, PageMax } from "./styles/PageStyles";

const JoinPage = (props) => (
  <div>
    {props.query.confirmToken && (
      <PageContainer>
        <PageMax>
          <ConfirmEmail confirmToken={props.query.confirmToken || null} />
        </PageMax>
      </PageContainer>
    )}
    {!props.query.confirmToken && (
      <EmptyArray>
        {{
          text:
            "Click the emailed link to confirm your account. You must sign up to complete this step!"
        }}
      </EmptyArray>
    )}
  </div>
);

export default JoinPage;
