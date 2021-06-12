import useLogin from "./useLogin";

test("compare works", () => {
  const loginService = useLogin();

  expect(
    loginService.compare(
      "password",
      "$2a$10$MYryWQ97Mb/LFDYbkkTk1OnoljBLLIrD9Sx1S4C/TxpIAYHlBR0T6"
    )
  ).toBe(true);
});
