import { useGlobalDatePickerState } from "../../../common/providers/GlobalDatePickerProvider";
import { LastContactType } from "../../../model/newLibrary";
import { useLibraryState } from "../../../common/providers/LibraryProvider";
import useSaveLibraryQuery from "../../../common/queries/useSaveLibraryQuery";
import Library from "../../../model/library";
import { useEffect, useState } from "react";
import { dateNowIso } from "../../../utils/dateUtil";

interface ReturnProps {
  handleOpen(contactType: LastContactType): void;
  handleClose(): void;
}

export default (): ReturnProps => {
  const { setOpen } = useGlobalDatePickerState();
  const { currentLibrary } = useLibraryState();
  const { mutate: saveLibrary, isSuccess, reset } = useSaveLibraryQuery();

  const handleOpen = (contactType: LastContactType) => {
    setOpen(true);
    currentLibrary.lastContactType = contactType;
  };

  const handleClose = () => {
    setOpen(false);
    currentLibrary.lastContactType = undefined;
  };

  if (isSuccess) {
    handleClose();
    reset();
  }

  return { handleOpen, handleClose };
};
