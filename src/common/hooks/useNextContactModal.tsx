import noop from "../../utils/noop";
import Library from "../../model/library";
import useSaveLibrary from "../queries/useSaveLibraryQuery";
import { useLibraryState } from "../providers/LibraryProvider";

interface Props {
  optionalCallback?: Function;
  library: Library;
  nextAppointmentDate: string;
}

interface ReturnProps {
  handleScheduleNextContact(p: Props): void;
}

export default (): ReturnProps => {
  const { currentLibrary } = useLibraryState();

  const x = useSaveLibrary();

  // just return a noop if no callback was defined
  const handleScheduleNextContact = async ({
    nextAppointmentDate,
    optionalCallback = noop(),
  }: Props) => {
    currentLibrary.dateNextContact = nextAppointmentDate;
    x.mutate(currentLibrary);

    optionalCallback();
  };

  return { handleScheduleNextContact };
};
