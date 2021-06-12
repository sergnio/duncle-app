import React from "react";

interface Props {
  top: string | number | undefined;
  bottom: string | number | undefined;
}

export default function ({ top, bottom }: Props) {
  return (
    <>
      {!(top === undefined) && <div>{top}</div>}
      {!(bottom === undefined) && <div>{bottom}</div>}
    </>
  );
}
