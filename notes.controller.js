const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const { check } = require("yargs");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen("Note was added!"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.bgBlue("Here is the list of Notes:"));
  notes.forEach((note) => {
    console.log(chalk.green(note.id), chalk.blue(note.title));
  });
}

async function removeById(id) {
  const notes = await getNotes();

  if (notes.some((note) => note.id === JSON.stringify(id))) {
    const filtredNotes = notes.filter((note) => note.id !== JSON.stringify(id));

    await fs.writeFile(notesPath, JSON.stringify(filtredNotes));
    console.log(chalk.bgYellowBright("Note was removed"));
  } else console.log(chalk.bgRedBright("Note with this id not found"));
}

module.exports = {
  addNote,
  printNotes,
  removeById,
};
