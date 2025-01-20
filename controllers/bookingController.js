const db = require('../libs/db');

exports.getAllBookings = (req, res) => {
  const { token  } = req.body;    
  if (token === "QpwL5tke4Pnpja7X4") {
    const sql = 'SELECT * FROM bookings';
    db.all(sql, [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ data: rows });
    }); 
  } else {
    return res.status(401).json({ error: 'Not authorized' });
  }
};

exports.getBookingById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM bookings WHERE id = ?';

  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Prenotazione non trovata' });
    }
    res.json({ data: row });
  });
};


exports.createBooking = (req, res) => {
  const { name, email, num_people, booking_date, notes } = req.body;
  const sql = 'INSERT INTO bookings (name, email, num_people, booking_date, notes) VALUES (?, ?, ?, ?, ?)';
  
  db.run(sql, [name, email, num_people, booking_date, notes], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Prenotazione creata', bookingId: this.lastID });
  });
};


exports.updateBooking = (req, res) => {
  const { id } = req.params;
  const { name, email, num_people, booking_date, notes } = req.body;
  const sql = 'UPDATE bookings SET name = ?, email = ?, num_people = ?, booking_date = ?, notes = ? WHERE id = ?';
  db.run(sql, [name, email, num_people, booking_date, notes, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Prenotazione non trovata' });
    }
    res.json({ message: 'Prenotazione aggiornata' });
  });
};


exports.deleteBooking = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM bookings WHERE id = ?';
  
  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Prenotazione non trovata' });
    }
    res.json({ message: 'Prenotazione eliminata' });
  });
};