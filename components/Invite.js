import HouseholdInvite from "../components/HouseholdInvite";
import PropTypes from "prop-types";
import Head from "next/head";

const Invite = ({ household }) => {
  return (
    <>
      <Head>
        <title>{household.name} | Invite</title>
      </Head>
      <HouseholdInvite householdId={household.id} />
    </>
  );
};

Invite.propTypes = {
  household: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })
};

export default Invite;
