import React from "react";
import { Column } from "material-table";
import { Library } from "../../../model";
import StackedField from "../../atoms/Table/StackedField";
import { readableDate } from "../../../utils/dateUtil";
import { formatContactType } from "../../../utils/textFormatUtils";
import useTerritoriesQuery from "../../../queries/useTerritoriesQuery";
import Territory from "../../../model/territory";

// todo - this should just be a component which does this...
export const getTerritoryDisplayName = (
  territoryId: string,
  territories: Territory[]
): string => {
  const defaultName = {
    name: "No Territory",
  };
  const display = territoryId
    ? territories?.find((t) => t._id === territoryId) ?? defaultName
    : defaultName;
  return display.name;
};

const searchHasMatch = (term: string, value: string | number | undefined) => {
  if (!value) return false;

  const formattedValue =
    typeof value === "number"
      ? value.toString().toLowerCase()
      : value.toLowerCase();

  return formattedValue.indexOf(term.toLowerCase()) != -1;
};

export default (): Column<Library>[] => {
  const { data: territories } = useTerritoriesQuery();

  return [
    { title: "Library", field: "libraryName" },
    { title: "County", field: "county" },
    {
      title: "Contact / Aide",
      field: "contactName",
      customFilterAndSearch: (
        term: string,
        { librarian, assistant }: Library
      ) => searchHasMatch(term, librarian) || searchHasMatch(term, assistant),
      render: ({ librarian, assistant }: Library) => (
        <StackedField top={librarian} bottom={assistant} />
      ),
    },
    {
      title: "Territory",
      field: "territoryId",
      customFilterAndSearch: (term: string, { territoryId }: Library) => {
        const territory = getTerritoryDisplayName(territoryId, territories);
        return searchHasMatch(term, territory);
      },
      render: ({ territoryId }: Library) => (
        <p>{getTerritoryDisplayName(territoryId, territories)}</p>
      ),
    },
    {
      title: "Phone / Email",
      field: "contactInfo",
      customFilterAndSearch: (term: string, { phoneNumber, email }: Library) =>
        searchHasMatch(term, phoneNumber) || searchHasMatch(term, email),
      render: ({ phoneNumber, email }: Library) => (
        <StackedField top={phoneNumber} bottom={email} />
      ),
    },
    {
      title: "Last Sale / Date",
      field: "lastSaleInfo",
      customFilterAndSearch: (
        term: string,
        { lastSale, dateLastSale }: Library
      ) => searchHasMatch(term, lastSale) || searchHasMatch(term, dateLastSale),
      render: ({ lastSale, dateLastSale }: Library) => {
        const formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        });
        const formattedToDollars = formatter.format(lastSale);
        if (dateLastSale !== undefined) {
          dateLastSale = readableDate(dateLastSale);
        }
        return <StackedField top={formattedToDollars} bottom={dateLastSale} />;
      },
    },
    {
      title: "Last Contacted",
      field: "dateLastContact",
      render: ({ dateLastContact, lastContactType }: Library) => {
        const lastContactText =
          dateLastContact !== undefined
            ? readableDate(dateLastContact)
            : dateLastContact;

        return (
          <StackedField
            top={lastContactText}
            bottom={formatContactType(lastContactType)}
          />
        );
      },
    },
    {
      title: "Next Contact",
      field: "dateNextContact",
      defaultSort: "asc",
      render: ({ dateNextContact }: Library) => {
        return dateNextContact !== undefined
          ? readableDate(dateNextContact)
          : dateNextContact;
      },
    },
  ];
};
