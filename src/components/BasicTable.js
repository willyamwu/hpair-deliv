import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { getCategory } from "../utils/categories";
import EntryModal from "./EntryModal";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

function formatPhoneNumber(phoneNumber) {
  if (!phoneNumber) {
    return "";
  }

  return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "($1)-$2-$3");
}

export default function BasicTable({ entries }) {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
    clickCount: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (column) => {
    const newDirection =
      sortConfig.key === column && sortConfig.direction === "asc"
        ? "desc"
        : "asc";
    setSortConfig({ key: column, direction: newDirection });
  };

  const filteredEntries = entries.filter((entry) =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedEntries = [...filteredEntries].sort((a, b) => {
    if (sortConfig.key) {
      const keyA = a[sortConfig.key].toUpperCase();
      const keyB = b[sortConfig.key].toUpperCase();
      if (keyA < keyB) return sortConfig.direction === "asc" ? -1 : 1;
      if (keyA > keyB) return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div>
      <InputBase
        type="text"
        placeholder="Search Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        startAdornment={<SearchIcon />}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Button onClick={() => handleSort("name")} variant="text">
                  Name{" "}
                  {sortConfig.key === "name" &&
                    (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                </Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => handleSort("email")} variant="text">
                  Email{" "}
                  {sortConfig.key === "email" &&
                    (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                </Button>
              </TableCell>
              <TableCell>PHONE NUMBER</TableCell>
              <TableCell>
                <Button onClick={() => handleSort("user")} variant="text">
                  Logger{" "}
                  {sortConfig.key === "user" &&
                    (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                </Button>
              </TableCell>
              <TableCell align="left">CATEGORY</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedEntries.map((entry) => (
              <TableRow
                key={entry.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {entry.name}
                </TableCell>
                <TableCell align="left">
                  <a href={`mailto:${entry.email}`}>{entry.email}</a>
                </TableCell>
                <TableCell align="left">
                  {formatPhoneNumber(entry.tel)}
                </TableCell>
                <TableCell align="left">{entry.user}</TableCell>
                <TableCell align="left">
                  {getCategory(entry.category).name}
                </TableCell>
                <TableCell
                  sx={{ "padding-top": 0, "padding-bottom": 0 }}
                  align="left"
                >
                  <EntryModal entry={entry} type="edit" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
