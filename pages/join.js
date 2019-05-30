import JoinHousehold from "../components/JoinHousehold";
import { EmptyArray } from "../components/EmptyArray";
import { PageContainer, PageMax } from "./styles/PageStyles";

const JoinPage = (props) => (
  <div>
    {props.query.joinToken && (
      <PageContainer>
        <PageMax>
          <JoinHousehold joinToken={props.query.joinToken || null}>
            You have been invited to join a household!
          </JoinHousehold>
        </PageMax>
      </PageContainer>
    )}
    {!props.query.joinToken && (
      <EmptyArray>
        {{
          text:
            "You need an invitation to join a household. Sign up to create your own!"
        }}
      </EmptyArray>
    )}
  </div>
);

export default JoinPage;
