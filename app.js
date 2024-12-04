const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hola, mundo!');
});

// API POST (Crear un nuevo usuario)
app.post('/usuarios', async (req, res) => {
  const { documento, nombre, email } = req.body;
  try {
    const usuario = await prisma.usuario.create({
      data: {
        documento,
        nombre,
        email,
      },
    });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el usuario' });
  }
});

// API GET (Obtener todos los usuarios)
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// API GET por ID (Obtener un usuario por su ID)
// Definición de la ruta GET para obtener un usuario por su ID
app.get('/usuarios/:id', async (req, res) => {
    // Desestructuramos el parámetro 'id' de la URL. 'req.params' contiene los parámetros de la ruta
    const { id } = req.params;
  
    try {
      // Usamos Prisma para buscar un usuario en la base de datos con el ID proporcionado
      // 'findUnique' busca un único registro que coincida con las condiciones especificadas
      const usuario = await prisma.usuario.findUnique({
        where: { id: parseInt(id) }, // Convertimos el 'id' a número con 'parseInt' para asegurarnos de que sea un entero
      });
  
      // Verificamos si se encontró el usuario
      if (usuario) {
        // Si el usuario existe, respondemos con un código de estado 200 (OK) y el usuario en formato JSON
        res.status(200).json(usuario);
      } else {
        // Si el usuario no fue encontrado, respondemos con un código de estado 404 (No encontrado) y un mensaje de error
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      // Si ocurre un error durante el proceso, capturamos el error y respondemos con un código de estado 500 (Error interno del servidor)
      // y un mensaje de error genérico
      res.status(500).json({ error: 'Error al obtener el usuario' });
    }
  });
  

// API PUT (Actualizar un usuario)
app.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { documento, nombre, email } = req.body;
  try {
    const usuario = await prisma.usuario.update({
      where: { id: parseInt(id) },
      data: { documento, nombre, email },
    });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el usuario' });
  }
});

// API DELETE (Eliminar un usuario)
app.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.usuario.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar el usuario' });
  }
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

