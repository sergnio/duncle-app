import React from "react";
import { Query, useQueryClient } from "react-query";
import { allUsersKey } from "../constants/queryKeys";
import UserDAO from "../model/userDAO";

export default () => {
  const queryClient = useQueryClient();

  const getUserById = (userId: string) =>
    queryClient.getQueryData(allUsersKey, {
      predicate: (query: Query<UserDAO>) => query.state.data._id === userId,
    });
  return { getUserById };
};
