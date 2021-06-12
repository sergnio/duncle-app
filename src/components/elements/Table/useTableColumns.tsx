import React from "react";
import { Column } from "material-table";
import { Library } from "../../../model";
import StackedField from "../../atoms/Table/StackedField";
import { readableDate } from "../../../utils/dateUtil";
import { formatContactType } from "../../../utils/textFormatUtils";

export default (): Column<Library>[] => [
  { title: "Library", field: "libraryName" },
  { title: "County", field: "county" },
  {
    title: "Contact / Aide",
    field: "contactName",
    render: ({ librarian, assistant }: Library) => (
      <StackedField top={librarian} bottom={assistant} />
    ),
  },
  {
    title: "Phone / Email",
    field: "contactInfo",
    render: ({ phoneNumber, email }: Library) => (
      <StackedField top={phoneNumber} bottom={email} />
    ),
  },
  {
    title: "Last Sale / Date",
    field: "lastSaleInfo",
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
