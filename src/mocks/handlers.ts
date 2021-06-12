// src/mocks/handlers.js
import { rest } from "msw";
import { AllLibrariesResponse } from "../common/queries/queriesUtils";
import { listOfLibrariesResponse } from "../components/storybook-mocks/constants";

const ONE_SECOND = 1000;

const simpleGet = <T>(url: string, mockData: T, statusCode: number = 200) => {
  return rest.get(url, (req, res, ctx) =>
    res(ctx.delay(ONE_SECOND), ctx.status(statusCode), ctx.json(mockData))
  );
};

export const handlers = [
  rest.post("/login", (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  }),
  // todo - might need to do api.sergionajera.com/user
  //  also need one probably for api.sergionajera.com/user_*
  simpleGet<AllLibrariesResponse>(
    "https://api.sergionajera.com/user_dummy",
    listOfLibrariesResponse
  ),
];
