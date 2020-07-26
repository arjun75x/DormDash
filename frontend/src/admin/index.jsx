import React, { useState, useEffect } from "react";
import QueueSelect from "../queue/queueSelect";
import { getToken } from "../utils";
import Box from "@material-ui/core/Box";
import TableUpdater from "./tableUpdater";
import TableInserter from "./tableInserter";
import Navbar from "../nav/navbar";

const Admin = () => {
  const [diningTableDict, setDiningTableDict] = useState({});
  const [selectedDiningHall, setSelectedDiningHall] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/dev/admin/dining-hall", {
      headers: {
        Authorization: getToken(),
      },
    })
      .then((response) => response.json())
      .then(({ diningHalls }) => {
        setDiningTableDict(
          diningHalls.reduce((acc, { DiningHallName, Tables }) => {
            acc[DiningHallName] = Tables;
            return acc;
          }, {})
        );
      });
  }, []);

  const handleSelect = (event) => {
    setSelectedDiningHall(event.target.value);
  };

  const addTable = (curDiningHall) => (Capacity) => {
    fetch("http://localhost:3000/dev/admin/dining-hall-table", {
      headers: {
        Authorization: getToken(),
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ DiningHallName: curDiningHall, Capacity }),
    })
      .then((response) => response.json())
      .then(({ table }) => {
        setDiningTableDict({
          ...diningTableDict,
          [curDiningHall]: [
            { TableID: table.TableID, Capacity: table.Capacity },
            ...diningTableDict[curDiningHall],
          ],
        });
      });
  };

  const updateTable = (TableID, curDiningHall) => (Capacity) => {
    fetch("http://localhost:3000/dev/admin/dining-hall-table", {
      headers: {
        Authorization: getToken(),
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ TableID, Capacity }),
    })
      .then((response) => response.json())
      .then(() => {
        setDiningTableDict({
          ...diningTableDict,
          [curDiningHall]: diningTableDict[curDiningHall].map((table) =>
            table.TableID === TableID ? { ...table, Capacity } : table
          ),
        });
      });
  };

  const deleteTable = (TableID, curDiningHall) => () => {
    fetch("http://localhost:3000/dev/admin/dining-hall-table", {
      headers: {
        Authorization: getToken(),
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({ TableID: TableID.toString() }),
    })
      .then((response) => response.json())
      .then(() => {
        setDiningTableDict({
          ...diningTableDict,
          [curDiningHall]: diningTableDict[curDiningHall].filter(
            (table) => table.TableID !== TableID
          ),
        });
      });
  };

  return (
    <>
      <Navbar />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding="50px 0"
      >
        <QueueSelect
          diningHalls={Object.keys(diningTableDict)}
          selectedDiningHall={selectedDiningHall}
          handleSelect={handleSelect}
        />
        {selectedDiningHall !== "" && (
          <TableInserter addTable={addTable(selectedDiningHall)} />
        )}
        {selectedDiningHall !== "" &&
          diningTableDict[
            selectedDiningHall
          ].map(({ TableID, Capacity }, i) => (
            <TableUpdater
              updateTableCapacity={updateTable(TableID, selectedDiningHall)}
              deleteTable={deleteTable(TableID, selectedDiningHall)}
              capacity={Capacity}
              key={i}
            />
          ))}
      </Box>
    </>
  );
};

export default Admin;
