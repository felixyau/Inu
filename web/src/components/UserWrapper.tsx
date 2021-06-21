import { withApollo } from "next-apollo";
import { createContext, useContext } from "react";
import { MeQuery, useMeQuery } from "../generated/graphql";
import { ApolloProvider } from "@apollo/client";

const UserContext = createContext(null);

export const UserWrapper: React.FC = ({ children }) => {
  const { data: userProfile } = useMeQuery();
  return (
      <UserContext.Provider value={userProfile}>
        {children}
      </UserContext.Provider>
  );
};

export const useUserContext = (): MeQuery => useContext(UserContext);
