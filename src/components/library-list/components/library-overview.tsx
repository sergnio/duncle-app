import React from "react";
import Library from "../../../model/library";
import { ListItem } from "@material-ui/core";

interface LibraryOverviewProps {
  library: Library;
  onClick(library: Library): void;
}

export default function LibraryOverview(props: LibraryOverviewProps) {
  return (
    <ListItem button onClick={() => props.onClick(props.library)}>
      {props.library.libraryName}
    </ListItem>
  );
}
