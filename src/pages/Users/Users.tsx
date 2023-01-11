import React from "react";
import Header from "../../components/Header/Header";
import UsersTable from "../../components/Table/UsersTable";
const Users = () => {
  return (
    <>
      <Header to="/" toDescription="Back to homepage" homepage={false} />
      <UsersTable />
    </>
  );
};

export default Users;
