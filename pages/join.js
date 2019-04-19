// import CreateItem from "../components/CreateItem";
import Link from "next/link";
import JoinHousehold from "../components/JoinHousehold";

const JoinPage = (props) => (
  <div>
    {props.query.joinToken && (
      // <div>hello</div>
      <JoinHousehold joinToken={props.query.joinToken || null}>
        You have been invited to join a household!
      </JoinHousehold>
    )}
    {!props.query.joinToken && (
      <Link href="/">
        <a>Home</a>
      </Link>
    )}
  </div>
);

export default JoinPage;
