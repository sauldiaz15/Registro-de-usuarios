// Deshabilitar el botón "Modificar" al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("updateButton").disabled = true; // Botón deshabilitado inicialmente
    document.getElementById("updateButton").c
    renderTable(); // Cargar los registros en la tabla
});

// Función para agregar un nuevo registro
document.getElementById("userForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevenir el envío normal del formulario

    const documento = document.getElementById("documento").value;
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;

    try {
        const response = await fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ documento, nombre, email }),
        });

        if (response.ok) {
            document.getElementById("message").textContent = "Usuario creado exitosamente!";
            document.getElementById("userForm").reset(); // Limpiar el formulario
            renderTable(); // Actualizar la tabla
        } else {
            const error = await response.json();
            document.getElementById("message").textContent = `Error: ${error.error}`;
        }
    } catch (error) {
        document.getElementById("message").textContent = "Error al conectar con el servidor";
    }
});

// Función para renderizar la tabla de registros
async function renderTable() {
    const tableBody = document.querySelector("#recordsTable tbody");
    tableBody.innerHTML = ""; // Limpiar la tabla

    try {
        const response = await fetch('http://localhost:3000/usuarios', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            const records = await response.json();

            if (records.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="5">No hay registros disponibles</td></tr>';
                return;
            }

            records.forEach(record => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${record.id}</td>
                    <td>${record.documento}</td>
                    <td>${record.nombre}</td>
                    <td>${record.email}</td>
                    <td>${record.creadoEn}</td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (error) {
        alert("Error al conectar con el servidor");
    }
}

// Función para buscar un registro por ID
async function searchById() {
    const searchId = document.getElementById("searchId").value;

    if (!searchId) {
        alert("Por favor, ingrese un ID.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/usuarios/${searchId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            const record = await response.json();

            if (record) {
                document.getElementById("idInput").value = record.id;
                document.getElementById("documento").value = record.documento;
                document.getElementById("nombre").value = record.nombre;
                document.getElementById("email").value = record.email;

                // Habilitar el botón "Modificar"
                document.getElementById("updateButton").disabled = false;
                document.getElementById("guardarButton").disabled = true;
            } else {
                alert("Registro no encontrado");
            }
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (error) {
        alert("Error al conectar con el servidor");
    }
}

// Función para actualizar un registro
async function updateRecord() {
    const id = document.getElementById("idInput").value;
    const documento = document.getElementById("documento").value;
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;

    if (!id) {
        alert("Por favor, selecciona un registro para modificar.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ documento, nombre, email }),
        });

        if (response.ok) {
            document.getElementById("message").textContent = "Registro modificado exitosamente!";
            renderTable(); // Actualizar la tabla
            document.getElementById("userForm").reset(); // Limpiar el formulario

            // Deshabilitar el botón "Modificar" nuevamente
            document.getElementById("updateButton").disabled = true;
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (error) {
        alert("Error al conectar con el servidor");
    }
}

// Función para eliminar un registro por ID
async function deleteById() {
    const deleteId = document.getElementById("deleteId").value;

    if (!deleteId) {
        alert("Por favor, ingrese un ID para eliminar.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/usuarios/${deleteId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            alert("Registro eliminado exitosamente");
            renderTable(); // Actualizar la tabla
        } else {
            const error = await response.json();
            alert(`Error: ${error.error || "Error desconocido"}`);
        }
    } catch (error) {
        alert("Error al conectar con el servidor");
    }
}

// Asociar eventos a botones
document.getElementById("updateButton").addEventListener("click", updateRecord);
