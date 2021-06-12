import React, { useEffect, useState } from "react";
import ContactDrawer from "../../elements/ContactDrawer/ContactDrawer";
import { useHistory, useParams } from "react-router-dom";
import NoteList from "../../elements/NoteList/NoteList";
import useStyles from "../../../global-styles";
import SalesArea from "../../atoms/Sales/SalesArea";
import NewNote from "../../elements/Note/NewNote";
import { Grid } from "@material-ui/core";
import DefaultButton from "../../atoms/Button/DefaultButton";
import useUpdateLibrary from "../../../common/hooks/useUpdateLibrary";
import useLibraryQuery from "../../../common/queries/useLibraryQuery";
import PersonalNotes from "../../elements/PersonalNotes/PersonalNotes";

export default () => {
  const { content, alignToDrawer, paddingOne, paddingTopTiny } = useStyles();
  const { libraryId } = useParams<{ libraryId: string }>();

  const {
    data: currentLibrary,
    isSuccess,
    error,
    isLoading,
    isFetching,
  } = useLibraryQuery(libraryId);

  const {
    handleNewAppointment,
    addSale,
    submitNewEditableNote,
  } = useUpdateLibrary();

  const history = useHistory();

  if (isLoading) return <h1>Loading...</h1>;

  function onBack(): void {
    history.goBack();
  }

  function onEdit(id: string): void {
    history.push(`/library/${id}/edit`);
  }

  return (
    <>
      {error && (
        <h2>
          {error.status} Error loading: {error.message}
        </h2>
      )}
      {isSuccess && (
        <>
          <div className={paddingTopTiny}>
            <DefaultButton onClick={onBack}>Back</DefaultButton>
            <DefaultButton onClick={() => onEdit(libraryId)}>
              Edit
            </DefaultButton>
          </div>
          <div className={alignToDrawer}>
            <ContactDrawer
              library={currentLibrary}
              handleScheduleNextAppointment={handleNewAppointment}
            />
            <div className={content}>
              <Grid container>
                <Grid item xs={12} md={3}>
                  <div className={paddingOne}>
                    <SalesArea
                      totalSales={currentLibrary.totalSales}
                      lastSale={currentLibrary.lastSale}
                      addSale={({ newSale }) =>
                        addSale(newSale, currentLibrary)
                      }
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div className={paddingOne}>
                    <PersonalNotes library={currentLibrary} />
                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div className={paddingOne}>
                    <NewNote />
                  </div>
                </Grid>
              </Grid>
              {isFetching ? (
                <h1>Getting new Data...</h1>
              ) : (
                <NoteList
                  notes={currentLibrary.notes}
                  SubmitForm={submitNewEditableNote}
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
