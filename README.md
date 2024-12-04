# Proyecto de Gestión de Registros

Este proyecto permite gestionar registros a través de una API y una interfaz web.

## Requisitos previos

1. Tener instalado [Node.js](https://nodejs.org/) (versión 16 o superior recomendada).
2. Tener un servidor de base de datos MySQL o MongoDB configurado.
3. [Git](https://git-scm.com/) para clonar el repositorio.

## Instalación

1. Clona el repositorio en tu máquina local:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio

2. Instala las dependencias del proyecto usando npm:

    npm install


3.  Restaurar la Base de Datos

     Abre tu terminal y navega a la carpeta del proyecto.
     Usa el siguiente comando para restaurar la base de datos:
     ```bash
     mysql -u root -p db_prisma < database/backup.sql

4. Inicia el servidor:
    
    inicia el servicio de Mysql en windows 

    desde la carpeta raiz del proyecto ejecuta : nodemon app.js 
    
    Accede a la aplicación en tu navegador en http://localhost:3000/ para comprobar que todo esta bien con "Hola Mundo"

5. Corre el Archivo index.html
