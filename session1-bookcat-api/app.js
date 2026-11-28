const express = require('express');
const sql = require('mssql');
const app = express();
const dbConfig = require('./dbConfig');
const Joi = require('joi');
const copySchema = Joi.object({
  isbn: Joi.string().length(10).required(),
  copyNo: Joi.number().integer().min(1).required()
});
app.use(express.json());

// Lab 5
// app.get('/authors', async (req, res) => {
//   let connection;
//   try {
//     connection = await sql.connect(dbConfig);
//     const sqlQuery = 'SELECT AuthorID, Name FROM Author';
//     const request = connection.request();
//     const result = await request.query(sqlQuery);
//     res.json(result.recordset);
//   } catch (err) {
//     res.status(500).json({ connected: false, error: err.message });
//   } finally {
//     if (connection) await connection.close();
//   }
// });
// app.post('/authors', async(req, res) => {
//   let connection;
//   try {
//     connection = await sql.connect(dbConfig);
//     const sqlQuery = `INSERT INTO Author (AuthorID, Name) VALUES (900, 'Test Author')`;
//     const request = connection.request();
//     const result = await request.query(sqlQuery);
//     res.json(result.recordset);
//   } catch (err) {
//     res.status(500).json({ connected: false, error: err.message });
//   } finally {
//     if (connection) await connection.close();
//   }
// });
// app.put('/authors/:id', async(req, res) => {
//   let connection;
//   try {
//     connection = await sql.connect(dbConfig);
//     const sqlQuery = `UPDATE Author SET Name = 'Rename' WHERE AuthorID = @AuthorID`;
//     const request = connection.request();
//     request.input('AuthorID', sql.Int, req.params.id);
//     const result = await request.query(sqlQuery);
//     res.json(result.recordset);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   } finally {
//     if (connection) await connection.close();
//   }
// });
// app.delete('/authors/:id', async(req, res) => {
//   let connection;
//   try {
//     connection = await sql.connect(dbConfig);
//     const sqlQuery = `DELETE FROM Author WHERE AuthorID = @AuthorID`;
//     const request = connection.request();
//     request.input('AuthorID', sql.Int, req.params.id);
//     const result = await request.query(sqlQuery);
//     res.json(result.recordset);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   } finally {
//     if (connection) await connection.close();
//   }
// });
console.log();
// Lab 6
// app.get('/books', async (req, res) => {
//   const { title } = req.query;
//   let connection;
//   try {
//     connection = await sql.connect(dbConfig);
//     const request = connection.request();
//     let query = 'SELECT ISBN, Title, YearPublish, PublisherID, BookCat FROM Book';
//     if (title) {
//       query += " WHERE Title LIKE '%' + @title + '%'";
//       request.input('title', sql.VarChar(200), title);
//     }
//     const result = await request.query(query);
//     res.status(200).json(result.recordset);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   } finally {
//     if (connection) await connection.close();
//   }
// });
// app.get('/books/:isbn', async (req, res) => {
//   let connection;
//   try {
//     connection = await sql.connect(dbConfig);
//     const request = connection.request();
//     request.input('isbn', sql.Char(10), req.params.isbn);
//     const result = await request.query(
//       'SELECT ISBN, Title, YearPublish, PublisherID, BookCat FROM Book WHERE ISBN = @isbn'
//     );
//     if (result.recordset.length === 0) {
//       return res.status(404).json({ error: 'Not found' });
//     }
//     res.status(200).json(result.recordset[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Database error' });
//   } finally {
//     if (connection) await connection.close();
//   }
// });
// app.post('/books', async (req, res) => {
//   const { isbn, title, yearPublish, publisherId, bookCat, authorId } = req.body;
//   let connection;
//   let transaction;
//   try {
//     connection = await sql.connect(dbConfig);
//     transaction = new sql.Transaction(connection);
//     await transaction.begin();
//     const bookRequest = transaction.request();
//     bookRequest.input('isbn', sql.Char(10), isbn);
//     bookRequest.input('title', sql.VarChar(200), title);
//     bookRequest.input('yearPublish', sql.Char(4), yearPublish);
//     bookRequest.input('publisherId', sql.SmallInt, publisherId);
//     bookRequest.input('bookCat', sql.Char(2), bookCat);
//     const bookResult = await bookRequest.query(
//       'INSERT INTO Book (ISBN, Title, YearPublish, PublisherID, BookCat) ' +
//       'OUTPUT INSERTED.* VALUES (@isbn, @title, @yearPublish, @publisherId, @bookCat)'
//     );
//     const authorRequest = transaction.request();
//     authorRequest.input('isbn', sql.Char(10), isbn);
//     authorRequest.input('authorId', sql.SmallInt, authorId);
//     await authorRequest.query(
//       'INSERT INTO BookAuthor (ISBN, AuthorID) VALUES (@isbn, @authorId)'
//     );
//     await transaction.commit();
//     res.status(201).json(bookResult.recordset[0]);
//   } catch (err) {
//     console.error(err);
//     if (transaction) {
//       try {
//         await transaction.rollback();
//       } catch (rollbackErr) {
//         console.error(rollbackErr);
//       }
//     }
//     res.status(500).json({ error: 'Database error' });
//   } finally {
//     if (connection) await connection.close();
//   }
// });
console.log();
// Lab 7
// app.get('/books/:isbn/copies/:copyNo', async (req, res) => {
//   let connection;
//   try {
//     connection = await sql.connect(dbConfig);
//     const request = connection.request();
//     request.input('isbn', sql.Char(10), req.params.isbn);
//     request.input('copyNo', sql.TinyInt, req.params.copyNo);
//     const result = await request.query(
//       'SELECT ISBN, CopyNo, RentalRate, Status FROM BookCopy ' +
//       'WHERE ISBN = @isbn AND CopyNo = @copyNo'
//     );
//     if (result.recordset.length === 0) {
//       return res.status(404).json({ error: 'Not found' });
//     }
//     res.status(200).json(result.recordset[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Database error' });
//   } finally {
//     if (connection) await connection.close();
//   }
// });
// app.put('/books/:isbn/copies/:copyNo', async (req, res) => {
//   let connection;
//   try {
//     connection = await sql.connect(dbConfig);
//     const request = connection.request();
//     request.input('isbn', sql.Char(10), req.params.isbn);
//     request.input('copyNo', sql.TinyInt, req.params.copyNo);
//     request.input('rentalRate', sql.SmallMoney, req.body.rentalRate);
//     const result = await request.query(
//       'UPDATE BookCopy SET RentalRate = @rentalRate OUTPUT INSERTED.* ' +
//       'WHERE ISBN = @isbn AND CopyNo = @copyNo'
//     );
//     if (result.rowsAffected[0] === 0) {
//       return res.status(404).json({ error: 'Not found' });
//     }
//     res.status(200).json(result.recordset[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Database error' });
//   } finally {
//     if (connection) await connection.close();
//   }
// });
// app.delete('/books/:isbn/copies/:copyNo', async (req, res) => {
//   let connection;
//   try {
//     connection = await sql.connect(dbConfig);
//     const request = connection.request();
//     request.input('isbn', sql.Char(10), req.params.isbn);
//     request.input('copyNo', sql.TinyInt, req.params.copyNo);
//     const result = await request.query(
//       'DELETE FROM BookCopy WHERE ISBN = @isbn AND CopyNo = @copyNo'
//     );
//     if (result.rowsAffected[0] === 0) {
//       return res.status(404).json({ error: 'Not found' });
//     }
//     res.status(204).send();
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Database error' });
//   } finally {
//     if (connection) await connection.close();
//   }
// });
console.log();
// Lab 8
// async function checkAvailable(isbn, copyNo) {
//   let connection;
//   try {
//     connection = await sql.connect(dbConfig);
//     const result = await connection.request()
//       .input('isbn', sql.Char(10), isbn)
//       .input('copyNo', sql.TinyInt, copyNo)
//       .query('SELECT Status FROM BookCopy WHERE ISBN = @isbn AND CopyNo = @copyNo');
//     if (result.recordset.length === 0) return null;
//     return result.recordset[0].Status === 'D';
//   } finally {
//     if (connection) await connection.close();
//   }
// }
// async function markRented(isbn, copyNo) {
//   let connection;
//   try {
//     connection = await sql.connect(dbConfig);
//     await connection.request()
//       .input('isbn', sql.Char(10), isbn)
//       .input('copyNo', sql.TinyInt, copyNo)
//       .query("UPDATE BookCopy SET Status = 'M' WHERE ISBN = @isbn AND CopyNo = @copyNo");
//   } finally {
//     if (connection) await connection.close();
//   }
// }
// async function markReturned(isbn, copyNo) {
//   let connection;
//   try {
//     connection = await sql.connect(dbConfig);
//     await connection.request()
//       .input('isbn', sql.Char(10), isbn)
//       .input('copyNo', sql.TinyInt, copyNo)
//       .query("UPDATE BookCopy SET Status = 'D' WHERE ISBN = @isbn AND CopyNo = @copyNo");
//   } finally {
//     if (connection) await connection.close();
//   }
// }
// app.put('/books/:isbn/copies/:copyNo/rent', async (req, res) => {
//   const { error, value } = copySchema.validate(req.params);
//   if (error) return res.status(400).json({ error: error.details[0].message });
//   const isbn = value.isbn;
//   const copyNo = value.copyNo;
//   try {
//     const available = await checkAvailable(isbn, copyNo);
//     if (available === null) return res.status(404).json({ error: 'Not found' });
//     if (available === false) return res.status(409).json({ error: 'Copy is already rented' });
//     await markRented(isbn, copyNo);
//     res.status(200).json({ ISBN: isbn, copyNo: copyNo, Status: 'M' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });
console.log();
// Lab 9
// some lines in Lab 8
// app.put('/books/:isbn/copies/:copyNo/return', async (req, res) => {
//   const { error, value } = copySchema.validate(req.params);
//   if (error) return res.status(400).json({ error: error.details[0].message });
//   try {
//     const available = await checkAvailable(value.isbn, value.copyNo);
//     if (available === null) return res.status(404).json({ error: 'Not found' });
//     if (available === true) return res.status(409).json({ error: 'Copy is not rented' });
//     await markReturned(value.isbn, value.copyNo);
//     res.status(200).json({ ISBN: value.isbn, copyNo: value.copyNo, Status: 'D' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// Base
// app.get('/', (req, res) => {
// res.send('Welcome to the Book Category API');
// });
// app.get('/categories', (req, res) => {
// res.json([
// { id: 1, name: 'Fiction' },
// { id: 2, name: 'Non-Fiction' },
// { id: 3, name: 'Biography' }
// ]);
// });
console.log();
// Lab 10
// replaced get route in Lab 6


app.listen(3000, () => {
console.log('Listening on port 3000');
});