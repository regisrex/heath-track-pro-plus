const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());

const db = new sqlite3.Database('patients.db');


db.run('CREATE TABLE IF NOT EXISTS patients (id INTEGER PRIMARY KEY AUTOINCREMENT, patient_name TEXT, patient_national_id TEXT, frequent_sickness TEXT)');
db.run('CREATE TABLE IF NOT EXISTS record (patient_id INTEGER PRIMARY KEY AUTOINCREMENT, heart_rate INTEGER, body_temperature REAL)');


app.post('/patients', (req, res) => {
    const { patient_name, patient_national_id, frequent_sickness } = req.body;
    db.run('INSERT INTO patients (patient_name, patient_national_id, frequent_sickness) VALUES (?, ?, ?)',
        [patient_name, patient_national_id, frequent_sickness],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID });
        });
});


app.get('/patients', (req, res) => {
    db.all('SELECT * FROM patients', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ patients: rows });
    });
});

app.get('/patients/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM patients WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.json({ patient: row });
    });
});


app.put('/patients/:id', (req, res) => {
    const id = req.params.id;
    const { patient_name, patient_national_id, frequent_sickness } = req.body;
    db.run('UPDATE patients SET patient_name = ?, patient_national_id = ?, frequent_sickness = ? WHERE id = ?',
        [patient_name, patient_national_id, frequent_sickness, id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Patient not found' });
            }
            res.json({ message: 'Patient updated successfully' });
        });
});

app.delete('/patients/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM patients WHERE id = ?', [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.json({ message: 'Patient deleted successfully' });
    });
});


// Create a new record
app.post('/records', (req, res) => {
    const { heart_rate, body_temperature } = req.body;
    db.run('INSERT INTO record (heart_rate, body_temperature) VALUES (?, ?)',
        [heart_rate, body_temperature],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ patient_id: this.lastID });
        });
});

// Get all records
app.get('/records', (req, res) => {
    db.all('SELECT * FROM record', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ records: rows });
    });
});

// Get a specific record by ID
app.get('/records/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM record WHERE patient_id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Record not found' });
        }
        res.json({ record: row });
    });
});

// Update a record by ID
app.put('/records/:id', (req, res) => {
    const id = req.params.id;
    const { heart_rate, body_temperature } = req.body;
    db.run('UPDATE record SET heart_rate = ?, body_temperature = ? WHERE patient_id = ?',
        [heart_rate, body_temperature, id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Record not found' });
            }
            res.json({ message: 'Record updated successfully' });
        });
});

app.delete('/records/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM records WHERE id = ?', [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.json({ message: 'Patient deleted successfully' });
    });
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
