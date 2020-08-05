import React, { useState, useEffect } from "react";
import QueueSelect from "../queue/queueSelect";
import { getToken, encodeBasicAuthHeader } from "../utils";
import Box from "@material-ui/core/Box";
import TableUpdater from "./tableUpdater";
import TableInserter from "./tableInserter";
import DHInserter from "./DHInserter";
import DHDeleter from "./DHDeleter";
import AdminNavbar from "../nav/adminNavbar";

const Admin = ({ baseUrl }) => {
  const [diningTableDict, setDiningTableDict] = useState({});
  const [selectedDiningHall, setSelectedDiningHall] = useState("");

  useEffect(() => {
    fetch(`${baseUrl}/admin/dining-hall`, {
      headers: {
        // Authorization: getToken(),
        Authorization: encodeBasicAuthHeader("DeveloperOnly", "naymanl2"),
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
    fetch(`${baseUrl}/admin/dining-hall-table`, {
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
    fetch(`${baseUrl}/admin/dining-hall-table`, {
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
    fetch(`${baseUrl}/admin/dining-hall-table`, {
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

  const addDH = () => (DHName, Lat, Long) => {
    fetch(`${baseUrl}/admin/dining-hall`, {
      headers: {
        Authorization: getToken(),
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        DiningHallName: DHName,
        Latitude: Lat,
        Longitude: Long,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        setDiningTableDict({
          [DHName]: [],
          ...diningTableDict,
        });
      });
  };
  const deleteDH = (DHName) => () => {
    fetch(`${baseUrl}/admin/dining-hall`, {
      headers: {
        Authorization: getToken(),
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({ DiningHallName: DHName }),
    })
      .then((response) => response.json())
      .then(function (r) {
        console.log(r);
      })
      .then(() => {
        const { [DHName]: garbage, ...rest } = diningTableDict;
        setDiningTableDict(rest);
      });
    //should probably have error checking here since you need to delete entries in table that references DH
  };

  return (
    <>
      {/* super ugly fix and I'm not proud of it, dunno how to do it better :( */}
      <AdminNavbar />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding="50px 0"
      >
        <QueueSelect
          diningHalls={[
            ...Object.keys(diningTableDict),
            "Insert Dining Hall",
            "Delete Dining Hall",
          ]}
          selectedDiningHall={selectedDiningHall}
          handleSelect={handleSelect}
        />
        {selectedDiningHall !== "" &&
          selectedDiningHall !== "Insert Dining Hall" &&
          selectedDiningHall !== "Delete Dining Hall" && (
            <TableInserter addTable={addTable(selectedDiningHall)} />
          )}
        {selectedDiningHall !== "" &&
          selectedDiningHall !== "Insert Dining Hall" &&
          selectedDiningHall !== "Delete Dining Hall" &&
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
        {selectedDiningHall !== "" &&
          selectedDiningHall === "Insert Dining Hall" &&
          selectedDiningHall !== "Delete Dining Hall" && (
            <DHInserter addDHCB={addDH()} />
          )}
        {selectedDiningHall !== "" &&
          selectedDiningHall !== "Insert Dining Hall" &&
          selectedDiningHall === "Delete Dining Hall" &&
          Object.keys(diningTableDict).map((DHName, i) => (
            <DHDeleter deleteDHCB={deleteDH(DHName)} DHName={DHName} key={i} />
          ))}
      </Box>
    </>
  );
};

export default Admin;
