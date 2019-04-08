import Link from "next/link";
import User from "./User";
import SignOut from "./SignOut";

const Nav = () => (
  <User>
    {({ data: { loggedInUser } }) => (
      <div>
        {loggedInUser && (
          <>
            <div>Logged In user</div>
            <Link href="/households">
              <a>Households</a>
            </Link>
            <SignOut />
          </>
        )}
        <div>hello NAV</div>
      </div>
    )}
  </User>
);

export default Nav;
