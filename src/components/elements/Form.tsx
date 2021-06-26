import React, { ReactNode } from "react";
import { Form as FinalForm } from "react-final-form";

interface Props {
  onSubmit(...args: any[]): any;
  children: ReactNode;
}

export default ({ onSubmit, children }: Props) => (
  <FinalForm
    onSubmit={onSubmit}
    // @ts-ignore
    render={({ handleSubmit }) => (
      <>
        <form onSubmit={handleSubmit}>{children}</form>
      </>
    )}
  />
);
