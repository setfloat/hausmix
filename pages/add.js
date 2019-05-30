import AssignChore from "../components/AssignChore";
import CreateChoreTemplate from "../components/CreateChoreTemplate";
import PleaseSignIn from "../components/PleaseSignIn";
import { PageContainer, PageMax } from "./styles/PageStyles";

const AssignPage = (props) => (
  <PageContainer>
    <PageMax>
      <PleaseSignIn>
        <AssignNest {...props} />
      </PleaseSignIn>
    </PageMax>
  </PageContainer>
);

export default AssignPage;

const AssignNest = (props) => {
  return (
    <>
      {!props.query.chore && <CreateChoreTemplate {...props} />}
      {props.query.chore && (
        <AssignChore choreTemplateId={props.query.chore || null} />
      )}
    </>
  );
};
