const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const app = express();
const PDFDocument = require('pdfkit');


app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "students",
});

app.post("/add_user", (req, res) => {
  const sql =
    "INSERT INTO student_details (`name`,`email`,`age`,`gender`) VALUES (?, ?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.age, req.body.gender];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "Student added successfully" });
  });
});

app.get("/students", (req, res) => {
  const sql = "SELECT * FROM student_details";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});

app.get("/get_student/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM student_details WHERE `id`= ?";
  db.query(sql, [id], (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});

app.post("/edit_user/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "UPDATE student_details SET `name`=?, `email`=?, `age`=?, `gender`=? WHERE id=?";
  const values = [
    req.body.name,
    req.body.email,
    req.body.age,
    req.body.gender,
    id,
  ];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "Student updated successfully" });
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM student_details WHERE id=?";
  const values = [id];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "Student updated successfully" });
  });
});

app.get("/download_pdf/:id", (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM student_details WHERE `id`= ?", [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Server error" });
      return;
    }

    const student = result[0];

    const doc = new PDFDocument();
    doc.fontSize(16);
    doc.text(`Student Details - ${student.name}`, 15, 15);
    doc.text(`ID: ${student.id}`, 15, 30);
    doc.text(`Name: ${student.name}`, 15, 45);
    doc.text(`Email: ${student.email}`, 15, 60);
    doc.text(`Age: ${student.age}`, 15, 75);
    doc.text(`Gender: ${student.gender}`, 15, 90);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${student.name}.pdf`);
    doc.pipe(res);
    doc.end();
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port} `);
});
