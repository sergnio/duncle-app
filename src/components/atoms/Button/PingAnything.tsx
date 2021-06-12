import React, { useState } from "react";
import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

interface PingAnythingProps {
  name: string;
  callback: any;
}

export default ({ name, callback }: PingAnythingProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setLoading(true);
        callback();
        setLoading(false);
      }}
    >
      {name}
      {loading ? <CircularProgress /> : null}
    </Button>
  );
};
