import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { Buffer } from 'buffer';

const app = express();
const PORT = 3001;
const JWT_SECRET = 'caminho-reino-secret-key-2024';
const DB_FILE = path.resolve('database.sqlite');

app.use(cors());
app.use(express.json());

let db;
let SQL;

async function saveDatabase() {
  if (db && SQL) {
    const data = db.export();
    fs.writeFileSync(DB_FILE, Buffer.from(data));
  }
}

async function initDatabase() {
  SQL = await initSqlJs();
  if (fs.existsSync(DB_FILE)) {
    const filebuffer = fs.readFileSync(DB_FILE);
    db = new SQL.Database(filebuffer);
    console.log('Banco de dados carregado do arquivo.');
  } else {
    db = new SQL.Database();
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS user_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        quests_completed INTEGER DEFAULT 0,
        badges INTEGER DEFAULT 0,
        study_time INTEGER DEFAULT 0,
        points INTEGER DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);
    await saveDatabase();
    console.log('Banco de dados criado novo.');
  }
}

initDatabase();

// Helper para salvar após alterações
function runAndSave(sql, params = []) {
  db.run(sql, params);
  saveDatabase();
}

app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Preencha todos os campos' });
    }
    const existingUser = db.exec('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0 && existingUser[0].values.length > 0) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    runAndSave('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
    const userId = db.exec('SELECT last_insert_rowid()')[0].values[0][0];
    runAndSave('INSERT INTO user_progress (user_id) VALUES (?)', [userId]);
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, user: { id: userId, name, email } });
  } catch {
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Preencha email e senha' });
    }
    const result = db.exec('SELECT * FROM users WHERE email = ?', [email]);
    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }
    const user = {
      id: result[0].values[0][0],
      name: result[0].values[0][1],
      email: result[0].values[0][2],
      password: result[0].values[0][3]
    };
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    const progressResult = db.exec('SELECT * FROM user_progress WHERE user_id = ?', [user.id]);
    const progress = progressResult.length > 0 && progressResult[0].values.length > 0 ? {
      id: progressResult[0].values[0][0],
      user_id: progressResult[0].values[0][1],
      quests_completed: progressResult[0].values[0][2],
      badges: progressResult[0].values[0][3],
      study_time: progressResult[0].values[0][4],
      points: progressResult[0].values[0][5]
    } : null;
    res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email }, progress });
  } catch {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

app.post('/api/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Preencha o email' });
    }
    const result = db.exec('SELECT id FROM users WHERE email = ?', [email]);
    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(404).json({ error: 'Email não encontrado' });
    }
    const userId = result[0].values[0][0];
    const resetToken = jwt.sign({ userId, type: 'reset' }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, message: 'Token de recuperação gerado', resetToken });
  } catch {
    res.status(500).json({ error: 'Erro ao processar solicitação' });
  }
});

app.post('/api/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Token e nova senha são obrigatórios' });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.type !== 'reset') {
      return res.status(401).json({ error: 'Token inválido' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    runAndSave('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, decoded.userId]);
    res.json({ success: true, message: 'Senha atualizada com sucesso' });
  } catch {
    res.status(401).json({ error: 'Token expirado ou inválido' });
  }
});

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

app.get('/api/profile', authenticate, (req, res) => {
  const userResult = db.exec('SELECT id, name, email, created_at FROM users WHERE id = ?', [req.userId]);
  const user = userResult.length > 0 && userResult[0].values.length > 0 ? {
    id: userResult[0].values[0][0],
    name: userResult[0].values[0][1],
    email: userResult[0].values[0][2],
    created_at: userResult[0].values[0][3]
  } : null;
  const progressResult = db.exec('SELECT * FROM user_progress WHERE user_id = ?', [req.userId]);
  const progress = progressResult.length > 0 && progressResult[0].values.length > 0 ? {
    id: progressResult[0].values[0][0],
    user_id: progressResult[0].values[0][1],
    quests_completed: progressResult[0].values[0][2],
    badges: progressResult[0].values[0][3],
    study_time: progressResult[0].values[0][4],
    points: progressResult[0].values[0][5]
  } : null;
  res.json({ user, progress });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
