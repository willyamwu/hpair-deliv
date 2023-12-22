import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";
import { categories } from "../utils/categories";
import { addEntry, deleteEntry, updateEntry } from "../utils/mutations";
import { Edit } from "@mui/icons-material";

// Modal component for BOTH adding and editing entries

export default function EntryModal({ entry, type, user }) {
  // State variables for modal status

  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(entry.name);
  const [email, setEmail] = useState(entry.email);
  const [tel, setPhoneNumber] = useState(entry.tel);
  const [description, setDescription] = useState(entry.description);
  const [category, setCategory] = React.useState(entry.category);

  // Modal visibility

  const handleClickOpen = () => {
    setOpen(true);
    setName(entry.name);
    setEmail(entry.email);
    setPhoneNumber(entry.tel);
    setDescription(entry.description);
    setCategory(entry.category);
    // setIsEditing(true);

    // handleEdit();
  };

  const handleEditOpen = () => {
    setOpen(true);
    setName(entry.name);
    setEmail(entry.email);
    setPhoneNumber(entry.tel);
    setDescription(entry.description);
    setCategory(entry.category);
    setIsEditing(true);

    // handleEdit();
  };

  const handleClose = () => {
    setIsEditing(false);
    setOpen(false);
  };

  // Mutation handlers

  const handleEdit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Convert the number to a string
    let numberValid = String(tel).length === 10 || String(tel) === "";

    let nameValid = name.trim() !== "";
    let emailValid = emailRegex.test(email) || email === "";

    if (nameValid && emailValid && numberValid) {
      const updatedEntry = {
        name: name,
        email: email,
        tel: tel,
        description: description,
        category: category,
        id: entry.id,
      };
      updateEntry(updatedEntry).catch(console.error);
      handleClose();
    }
    if (!nameValid) {
      alert("Please enter a name before editing the entry.");
    } else if (!emailValid) {
      alert("Please enter a valid email.");
    } else if (!numberValid) {
      alert("Please enter a valid phone number 1234567890.");
    }
  };

  const handleAdd = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let numberValid = String(tel).length === 10 || String(tel) === "";

    let nameValid = name.trim() !== "";
    let emailValid = emailRegex.test(email) || email === "";

    if (nameValid && emailValid && numberValid) {
      const newEntry = {
        name: name,
        email: email,
        tel: tel,
        description: description,
        user: user?.displayName,
        category: category,
        userid: user?.uid,
      };

      addEntry(newEntry).catch(console.error);
      handleClose();
    }
    if (!nameValid) {
      alert("Please enter a name before editing the entry.");
    } else if (!emailValid) {
      alert("Please enter a valid email.");
    } else if (!numberValid) {
      alert("Please enter a valid phone number 1234567890.");
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete?")) {
      deleteEntry(entry.id).catch(console.error);
      handleClose();
    }
  };

  // Button handlers for modal opening and modal actions

  const openButton =
    type === "edit" ? (
      <IconButton onClick={handleEditOpen}>
        <Edit />
      </IconButton>
    ) : type === "add" ? (
      <Button variant="contained" onClick={handleClickOpen}>
        Add Entry
      </Button>
    ) : null;

  const actionButtons =
    type === "edit" ? (
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="warning" onClick={handleDelete}>
          Delete
        </Button>
        <Button
          variant="contained"
          onClick={handleEdit}
          sx={{ display: isEditing ? "inline" : "none" }}
        >
          Save
        </Button>
        {/* <Button variant="contained" onClick={() => setIsEditing(true)} sx={{ display: isEditing ? 'none' : 'inline' }}>Edit</Button> */}
      </DialogActions>
    ) : type === "add" ? (
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleAdd}>
          Add Entry
        </Button>
      </DialogActions>
    ) : null;

  return (
    <div>
      {openButton}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{type === "edit" ? name : "Add Entry"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            id="name"
            label="Name"
            fullWidth
            variant="standard"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            InputProps={{
              readOnly: type === "edit" ? !isEditing : false,
            }}
          />
          <TextField
            margin="normal"
            id="email"
            label="Email"
            type="email"
            placeholder="e.g. john_doe@google.com"
            fullWidth
            variant="standard"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            InputProps={{
              readOnly: type === "edit" ? !isEditing : false,
            }}
          />
          <TextField
            margin="normal"
            id="phone number"
            label="Phone Number"
            type="tel"
            placeholder="1234567890"
            fullWidth
            variant="standard"
            value={tel}
            onChange={(event) => {
              setPhoneNumber(event.target.value);
            }}
            InputProps={{
              readOnly: type === "edit" ? !isEditing : false,
            }}
          />
          <TextField
            margin="normal"
            id="description"
            label="Description"
            fullWidth
            variant="standard"
            multiline
            maxRows={8}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            InputProps={{
              readOnly: type === "edit" ? !isEditing : false,
            }}
          />
          <FormControl fullWidth sx={{ marginTop: 20 }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={(event) => setCategory(event.target.value)}
              inputProps={{
                readOnly: type === "edit" ? !isEditing : false,
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        {actionButtons}
      </Dialog>
    </div>
  );
}
