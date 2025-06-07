const normalizationExercises = [
      {
        name: "Clientes y Pedidos",
        unnormalized_table: {
          title: "Tabla sin Normalizar",
          table: `
            <div class="table-title">clientes_pedidos</div>
            <table class="normalization-table">
              <thead>
                <tr>
                  <th>id_cliente</th>
                  <th>nombre</th>
                  <th>direcciones</th>
                  <th>productos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Juan Pérez</td>
                  <td>Calle A #123, Calle B #456</td>
                  <td>Laptop, Teléfono, Tablet</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>María García</td>
                  <td>Avenida X #789</td>
                  <td>Monitor, Teclado</td>
                </tr>
              </tbody>
            </table>
          `,
          enunciado: "Esta tabla contiene información de clientes y sus pedidos. Identifica los problemas de normalización: grupos repetitivos (direcciones múltiples, productos múltiples) y dependencias no completas.",
          fragments: [
            "id_cliente INT PRIMARY KEY", 
            "nombre VARCHAR(100)", 
            "direcciones VARCHAR(200)", 
            "productos VARCHAR(200)"
          ]
        },
        first_normal_form: {
          title: "1FN (Primera Forma Normal)",
          enunciado: "Elimina grupos repetitivos. Separa los datos en tablas independientes con claves primarias y relaciones definidas.",
          tables: [
            {
              name: "clientes",
              fields: ["id_cliente", "nombre"],
              correctFields: ["id_cliente INT PRIMARY KEY", "nombre VARCHAR(100)"]
            },
            {
              name: "direcciones",
              fields: ["id_direccion", "id_cliente", "direccion"],
              correctFields: ["id_direccion INT PRIMARY KEY", "id_cliente INT FOREIGN KEY", "direccion VARCHAR(200)"]
            },
            {
              name: "pedidos",
              fields: ["id_pedido", "id_cliente", "producto"],
              correctFields: ["id_pedido INT PRIMARY KEY", "id_cliente INT FOREIGN KEY", "producto VARCHAR(100)"]
            }
          ],
          fragments: [
            "id_cliente INT PRIMARY KEY", "nombre VARCHAR(100)",
            "id_direccion INT PRIMARY KEY", "id_cliente INT FOREIGN KEY", "direccion VARCHAR(200)",
            "id_pedido INT PRIMARY KEY", "id_cliente INT FOREIGN KEY", "producto VARCHAR(100)"
          ]
        },
        second_normal_form: {
          title: "2FN (Segunda Forma Normal)",
          enunciado: "Separa campos que dependen parcialmente de la clave primaria. Crea tablas intermedias para relaciones muchos-a-muchos.",
          tables: [
            {
              name: "clientes",
              fields: ["id_cliente", "nombre"],
              correctFields: ["id_cliente INT PRIMARY KEY", "nombre VARCHAR(100)"]
            },
            {
              name: "direcciones",
              fields: ["id_direccion", "direccion"],
              correctFields: ["id_direccion INT PRIMARY KEY", "direccion VARCHAR(200)"]
            },
            {
              name: "clientes_direcciones",
              fields: ["cliente_id", "direccion_id"],
              correctFields: ["cliente_id INT FOREIGN KEY", "direccion_id INT FOREIGN KEY"]
            }
          ],
          fragments: [
            "id_cliente INT PRIMARY KEY", "nombre VARCHAR(100)",
            "id_direccion INT PRIMARY KEY", "direccion VARCHAR(200)",
            "cliente_id INT FOREIGN KEY", "direccion_id INT FOREIGN KEY"
          ]
        },
        third_normal_form: {
          title: "3FN (Tercera Forma Normal)",
          enunciado: "Elimina dependencias transitivas. Separa campos que dependen de otros campos que no son la clave primaria.",
          tables: [
            {
              name: "clientes",
              fields: ["id_cliente", "nombre", "direccion_id"],
              correctFields: ["id_cliente INT PRIMARY KEY", "nombre VARCHAR(100)", "direccion_id INT FOREIGN KEY"]
            },
            {
              name: "direcciones",
              fields: ["id_direccion", "direccion"],
              correctFields: ["id_direccion INT PRIMARY KEY", "direccion VARCHAR(200)"]
            },
            {
              name: "pedidos",
              fields: ["id_pedido", "cliente_id", "producto_id", "fecha"],
              correctFields: ["id_pedido INT PRIMARY KEY", "cliente_id INT FOREIGN KEY", "producto_id INT FOREIGN KEY", "fecha DATETIME"]
            },
            {
              name: "productos",
              fields: ["id_producto", "nombre_producto"],
              correctFields: ["id_producto INT PRIMARY KEY", "nombre_producto VARCHAR(100)"]
            }
          ],
          fragments: [
            "id_cliente INT PRIMARY KEY", "nombre VARCHAR(100)", "direccion_id INT FOREIGN KEY",
            "id_direccion INT PRIMARY KEY", "direccion VARCHAR(200)",
            "id_pedido INT PRIMARY KEY", "cliente_id INT FOREIGN KEY", "producto_id INT FOREIGN KEY", "fecha DATETIME",
            "id_producto INT PRIMARY KEY", "nombre_producto VARCHAR(100)"
          ]
        }
      },
      {
        name: "Empleados y Departamentos",
        unnormalized_table: {
          title: "Tabla sin Normalizar",
          table: `
            <div class="table-title">empleados_departamentos</div>
            <table class="normalization-table">
              <thead>
                <tr>
                  <th>id_empleado</th>
                  <th>nombre</th>
                  <th>departamento</th>
                  <th>habilidades</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>101</td>
                  <td>Carlos Ruiz</td>
                  <td>Ventas</td>
                  <td>Comunicación, Negociación, Inglés</td>
                </tr>
                <tr>
                  <td>102</td>
                  <td>Ana López</td>
                  <td>Desarrollo</td>
                  <td>Java, Python, SQL</td>
                </tr>
              </tbody>
            </table>
          `,
          enunciado: "Esta tabla almacena información de empleados y sus departamentos. Identifica problemas de normalización como grupos repetitivos (habilidades múltiples) y dependencias no completas.",
          fragments: [
            "id_empleado INT PRIMARY KEY", 
            "nombre VARCHAR(100)", 
            "departamento VARCHAR(50)", 
            "habilidades VARCHAR(200)"
          ]
        },
        first_normal_form: {
          title: "1FN (Primera Forma Normal)",
          enunciado: "Separa los grupos repetitivos en tablas independientes con claves primarias y relaciones definidas.",
          tables: [
            {
              name: "empleados",
              fields: ["id_empleado", "nombre"],
              correctFields: ["id_empleado INT PRIMARY KEY", "nombre VARCHAR(100)"]
            },
            {
              name: "departamentos",
              fields: ["id_departamento", "nombre_departamento"],
              correctFields: ["id_departamento INT PRIMARY KEY", "nombre_departamento VARCHAR(50)"]
            },
            {
              name: "habilidades",
              fields: ["id_habilidad", "nombre_habilidad"],
              correctFields: ["id_habilidad INT PRIMARY KEY", "nombre_habilidad VARCHAR(50)"]
            }
          ],
          fragments: [
            "id_empleado INT PRIMARY KEY", "nombre VARCHAR(100)",
            "id_departamento INT PRIMARY KEY", "nombre_departamento VARCHAR(50)",
            "id_habilidad INT PRIMARY KEY", "nombre_habilidad VARCHAR(50)"
          ]
        },
        second_normal_form: {
          title: "2FN (Segunda Forma Normal)",
          enunciado: "Crea tablas intermedias para relaciones muchos-a-muchos y asegura que todos los campos dependan completamente de la clave primaria.",
          tables: [
            {
              name: "empleados",
              fields: ["id_empleado", "nombre", "departamento_id"],
              correctFields: ["id_empleado INT PRIMARY KEY", "nombre VARCHAR(100)", "departamento_id INT FOREIGN KEY"]
            },
            {
              name: "departamentos",
              fields: ["id_departamento", "nombre_departamento"],
              correctFields: ["id_departamento INT PRIMARY KEY", "nombre_departamento VARCHAR(50)"]
            },
            {
              name: "empleados_habilidades",
              fields: ["empleado_id", "habilidad_id"],
              correctFields: ["empleado_id INT FOREIGN KEY", "habilidad_id INT FOREIGN KEY"]
            }
          ],
          fragments: [
            "id_empleado INT PRIMARY KEY", "nombre VARCHAR(100)", "departamento_id INT FOREIGN KEY",
            "id_departamento INT PRIMARY KEY", "nombre_departamento VARCHAR(50)",
            "empleado_id INT FOREIGN KEY", "habilidad_id INT FOREIGN KEY"
          ]
        },
        third_normal_form: {
          title: "3FN (Tercera Forma Normal)",
          enunciado: "Elimina dependencias transitivas y asegura que cada campo dependa directamente de la clave primaria.",
          tables: [
            {
              name: "empleados",
              fields: ["id_empleado", "nombre", "departamento_id"],
              correctFields: ["id_empleado INT PRIMARY KEY", "nombre VARCHAR(100)", "departamento_id INT FOREIGN KEY"]
            },
            {
              name: "departamentos",
              fields: ["id_departamento", "nombre_departamento"],
              correctFields: ["id_departamento INT PRIMARY KEY", "nombre_departamento VARCHAR(50)"]
            },
            {
              name: "habilidades",
              fields: ["id_habilidad", "nombre_habilidad"],
              correctFields: ["id_habilidad INT PRIMARY KEY", "nombre_habilidad VARCHAR(50)"]
            },
            {
              name: "empleados_habilidades",
              fields: ["empleado_id", "habilidad_id"],
              correctFields: ["empleado_id INT FOREIGN KEY", "habilidad_id INT FOREIGN KEY"]
            }
          ],
          fragments: [
            "id_empleado INT PRIMARY KEY", "nombre VARCHAR(100)", "departamento_id INT FOREIGN KEY",
            "id_departamento INT PRIMARY KEY", "nombre_departamento VARCHAR(50)",
            "id_habilidad INT PRIMARY KEY", "nombre_habilidad VARCHAR(50)",
            "empleado_id INT FOREIGN KEY", "habilidad_id INT FOREIGN KEY"
          ]
        }
      },
      {
        name: "Biblioteca",
        unnormalized_table: {
          title: "Tabla sin Normalizar",
          table: `
            <div class="table-title">biblioteca</div>
            <table class="normalization-table">
              <thead>
                <tr>
                  <th>id_libro</th>
                  <th>titulo</th>
                  <th>autores</th>
                  <th>generos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>L001</td>
                  <td>El Quijote</td>
                  <td>Miguel de Cervantes</td>
                  <td>Novela, Clásico, Aventuras</td>
                </tr>
                <tr>
                  <td>L002</td>
                  <td>Cien Años de Soledad</td>
                  <td>Gabriel García Márquez</td>
                  <td>Realismo mágico, Novela</td>
                </tr>
              </tbody>
            </table>
          `,
          enunciado: "Esta tabla gestiona información de libros en una biblioteca. Identifica problemas de normalización como grupos repetitivos (géneros múltiples) y dependencias no completas.",
          fragments: [
            "id_libro VARCHAR(10) PRIMARY KEY", 
            "titulo VARCHAR(200)", 
            "autores VARCHAR(200)", 
            "generos VARCHAR(200)"
          ]
        },
        first_normal_form: {
          title: "1FN (Primera Forma Normal)",
          enunciado: "Separa los grupos repetitivos en tablas independientes con claves primarias y relaciones definidas.",
          tables: [
            {
              name: "libros",
              fields: ["id_libro", "titulo"],
              correctFields: ["id_libro VARCHAR(10) PRIMARY KEY", "titulo VARCHAR(200)"]
            },
            {
              name: "autores",
              fields: ["id_autor", "nombre_autor"],
              correctFields: ["id_autor INT PRIMARY KEY", "nombre_autor VARCHAR(100)"]
            },
            {
              name: "generos",
              fields: ["id_genero", "nombre_genero"],
              correctFields: ["id_genero INT PRIMARY KEY", "nombre_genero VARCHAR(50)"]
            }
          ],
          fragments: [
            "id_libro VARCHAR(10) PRIMARY KEY", "titulo VARCHAR(200)",
            "id_autor INT PRIMARY KEY", "nombre_autor VARCHAR(100)",
            "id_genero INT PRIMARY KEY", "nombre_genero VARCHAR(50)"
          ]
        },
        second_normal_form: {
          title: "2FN (Segunda Forma Normal)",
          enunciado: "Crea tablas intermedias para relaciones muchos-a-muchos y asegura que todos los campos dependan completamente de la clave primaria.",
          tables: [
            {
              name: "libros",
              fields: ["id_libro", "titulo"],
              correctFields: ["id_libro VARCHAR(10) PRIMARY KEY", "titulo VARCHAR(200)"]
            },
            {
              name: "autores",
              fields: ["id_autor", "nombre_autor"],
              correctFields: ["id_autor INT PRIMARY KEY", "nombre_autor VARCHAR(100)"]
            },
            {
              name: "libros_autores",
              fields: ["libro_id", "autor_id"],
              correctFields: ["libro_id VARCHAR(10) FOREIGN KEY", "autor_id INT FOREIGN KEY"]
            },
            {
              name: "libros_generos",
              fields: ["libro_id", "genero_id"],
              correctFields: ["libro_id VARCHAR(10) FOREIGN KEY", "genero_id INT FOREIGN KEY"]
            }
          ],
          fragments: [
            "id_libro VARCHAR(10) PRIMARY KEY", "titulo VARCHAR(200)",
            "id_autor INT PRIMARY KEY", "nombre_autor VARCHAR(100)",
            "libro_id VARCHAR(10) FOREIGN KEY", "autor_id INT FOREIGN KEY",
            "libro_id VARCHAR(10) FOREIGN KEY", "genero_id INT FOREIGN KEY"
          ]
        },
        third_normal_form: {
          title: "3FN (Tercera Forma Normal)",
          enunciado: "Elimina dependencias transitivas y asegura que cada campo dependa directamente de la clave primaria.",
          tables: [
            {
              name: "libros",
              fields: ["id_libro", "titulo"],
              correctFields: ["id_libro VARCHAR(10) PRIMARY KEY", "titulo VARCHAR(200)"]
            },
            {
              name: "autores",
              fields: ["id_autor", "nombre_autor"],
              correctFields: ["id_autor INT PRIMARY KEY", "nombre_autor VARCHAR(100)"]
            },
            {
              name: "generos",
              fields: ["id_genero", "nombre_genero"],
              correctFields: ["id_genero INT PRIMARY KEY", "nombre_genero VARCHAR(50)"]
            },
            {
              name: "libros_autores",
              fields: ["libro_id", "autor_id"],
              correctFields: ["libro_id VARCHAR(10) FOREIGN KEY", "autor_id INT FOREIGN KEY"]
            },
            {
              name: "libros_generos",
              fields: ["libro_id", "genero_id"],
              correctFields: ["libro_id VARCHAR(10) FOREIGN KEY", "genero_id INT FOREIGN KEY"]
            }
          ],
          fragments: [
            "id_libro VARCHAR(10) PRIMARY KEY", "titulo VARCHAR(200)",
            "id_autor INT PRIMARY KEY", "nombre_autor VARCHAR(100)",
            "id_genero INT PRIMARY KEY", "nombre_genero VARCHAR(50)",
            "libro_id VARCHAR(10) FOREIGN KEY", "autor_id INT FOREIGN KEY",
            "libro_id VARCHAR(10) FOREIGN KEY", "genero_id INT FOREIGN KEY"
          ]
        }
      },
      {
        name: "Ventas de Productos",
        unnormalized_table: {
          title: "Tabla sin Normalizar",
          table: `
            <div class="table-title">ventas_productos</div>
            <table class="normalization-table">
              <thead>
                <tr>
                  <th>id_venta</th>
                  <th>fecha</th>
                  <th>cliente</th>
                  <th>productos_vendidos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>V1001</td>
                  <td>2023-05-15</td>
                  <td>Tienda ABC</td>
                  <td>Camisa:2, Pantalón:1, Zapatos:1</td>
                </tr>
                <tr>
                  <td>V1002</td>
                  <td>2023-05-16</td>
                  <td>Tienda XYZ</td>
                  <td>Pantalón:3, Camisa:1</td>
                </tr>
              </tbody>
            </table>
          `,
          enunciado: "Esta tabla registra ventas de productos. Identifica problemas de normalización como grupos repetitivos (productos múltiples con cantidades) y dependencias no completas.",
          fragments: [
            "id_venta VARCHAR(10) PRIMARY KEY", 
            "fecha DATE", 
            "cliente VARCHAR(100)", 
            "productos_vendidos VARCHAR(200)"
          ]
        },
        first_normal_form: {
          title: "1FN (Primera Forma Normal)",
          enunciado: "Separa los grupos repetitivos en tablas independientes con claves primarias y relaciones definidas.",
          tables: [
            {
              name: "ventas",
              fields: ["id_venta", "fecha", "cliente_id"],
              correctFields: ["id_venta VARCHAR(10) PRIMARY KEY", "fecha DATE", "cliente_id INT FOREIGN KEY"]
            },
            {
              name: "productos",
              fields: ["id_producto", "nombre"],
              correctFields: ["id_producto INT PRIMARY KEY", "nombre VARCHAR(50)"]
            },
            {
              name: "detalle_ventas",
              fields: ["venta_id", "producto_id", "cantidad"],
              correctFields: ["venta_id VARCHAR(10) FOREIGN KEY", "producto_id INT FOREIGN KEY", "cantidad INT"]
            }
          ],
          fragments: [
            "id_venta VARCHAR(10) PRIMARY KEY", "fecha DATE", "cliente_id INT FOREIGN KEY",
            "id_producto INT PRIMARY KEY", "nombre VARCHAR(50)",
            "venta_id VARCHAR(10) FOREIGN KEY", "producto_id INT FOREIGN KEY", "cantidad INT"
          ]
        },
        second_normal_form: {
          title: "2FN (Segunda Forma Normal)",
          enunciado: "Asegura que todos los campos dependan completamente de la clave primaria y crea tablas para entidades independientes.",
          tables: [
            {
              name: "ventas",
              fields: ["id_venta", "fecha", "cliente_id"],
              correctFields: ["id_venta VARCHAR(10) PRIMARY KEY", "fecha DATE", "cliente_id INT FOREIGN KEY"]
            },
            {
              name: "clientes",
              fields: ["id_cliente", "nombre"],
              correctFields: ["id_cliente INT PRIMARY KEY", "nombre VARCHAR(100)"]
            },
            {
              name: "detalle_ventas",
              fields: ["venta_id", "producto_id", "cantidad"],
              correctFields: ["venta_id VARCHAR(10) FOREIGN KEY", "producto_id INT FOREIGN KEY", "cantidad INT"]
            }
          ],
          fragments: [
            "id_venta VARCHAR(10) PRIMARY KEY", "fecha DATE", "cliente_id INT FOREIGN KEY",
            "id_cliente INT PRIMARY KEY", "nombre VARCHAR(100)",
            "venta_id VARCHAR(10) FOREIGN KEY", "producto_id INT FOREIGN KEY", "cantidad INT"
          ]
        },
        third_normal_form: {
          title: "3FN (Tercera Forma Normal)",
          enunciado: "Elimina dependencias transitivas y asegura que cada campo dependa directamente de la clave primaria.",
          tables: [
            {
              name: "ventas",
              fields: ["id_venta", "fecha", "cliente_id"],
              correctFields: ["id_venta VARCHAR(10) PRIMARY KEY", "fecha DATE", "cliente_id INT FOREIGN KEY"]
            },
            {
              name: "clientes",
              fields: ["id_cliente", "nombre"],
              correctFields: ["id_cliente INT PRIMARY KEY", "nombre VARCHAR(100)"]
            },
            {
              name: "productos",
              fields: ["id_producto", "nombre"],
              correctFields: ["id_producto INT PRIMARY KEY", "nombre VARCHAR(50)"]
            },
            {
              name: "detalle_ventas",
              fields: ["venta_id", "producto_id", "cantidad"],
              correctFields: ["venta_id VARCHAR(10) FOREIGN KEY", "producto_id INT FOREIGN KEY", "cantidad INT"]
            }
          ],
          fragments: [
            "id_venta VARCHAR(10) PRIMARY KEY", "fecha DATE", "cliente_id INT FOREIGN KEY",
            "id_cliente INT PRIMARY KEY", "nombre VARCHAR(100)",
            "id_producto INT PRIMARY KEY", "nombre VARCHAR(50)",
            "venta_id VARCHAR(10) FOREIGN KEY", "producto_id INT FOREIGN KEY", "cantidad INT"
          ]
        }
      },
      {
        name: "Sistema de Reservas",
        unnormalized_table: {
          title: "Tabla sin Normalizar",
          table: `
            <div class="table-title">reservas</div>
            <table class="normalization-table">
              <thead>
                <tr>
                  <th>id_reserva</th>
                  <th>fecha_reserva</th>
                  <th>cliente</th>
                  <th>servicios</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>R001</td>
                  <td>2023-06-10</td>
                  <td>Juan Pérez</td>
                  <td>Habitación:101, Spa:2 personas, Restaurante:20:00</td>
                </tr>
                <tr>
                  <td>R002</td>
                  <td>2023-06-12</td>
                  <td>Ana Gómez</td>
                  <td>Habitación:205, Restaurante:19:30</td>
                </tr>
              </tbody>
            </table>
          `,
          enunciado: "Esta tabla gestiona reservas en un hotel. Identifica problemas de normalización como grupos repetitivos (servicios múltiples con detalles) y dependencias no completas.",
          fragments: [
            "id_reserva VARCHAR(10) PRIMARY KEY", 
            "fecha_reserva DATE", 
            "cliente VARCHAR(100)", 
            "servicios VARCHAR(200)"
          ]
        },
        first_normal_form: {
          title: "1FN (Primera Forma Normal)",
          enunciado: "Separa los grupos repetitivos en tablas independientes con claves primarias y relaciones definidas.",
          tables: [
            {
              name: "reservas",
              fields: ["id_reserva", "fecha_reserva", "cliente_id"],
              correctFields: ["id_reserva VARCHAR(10) PRIMARY KEY", "fecha_reserva DATE", "cliente_id INT FOREIGN KEY"]
            },
            {
              name: "servicios",
              fields: ["id_servicio", "nombre_servicio"],
              correctFields: ["id_servicio INT PRIMARY KEY", "nombre_servicio VARCHAR(50)"]
            },
            {
              name: "detalle_reservas",
              fields: ["reserva_id", "servicio_id", "detalles"],
              correctFields: ["reserva_id VARCHAR(10) FOREIGN KEY", "servicio_id INT FOREIGN KEY", "detalles VARCHAR(100)"]
            }
          ],
          fragments: [
            "id_reserva VARCHAR(10) PRIMARY KEY", "fecha_reserva DATE", "cliente_id INT FOREIGN KEY",
            "id_servicio INT PRIMARY KEY", "nombre_servicio VARCHAR(50)",
            "reserva_id VARCHAR(10) FOREIGN KEY", "servicio_id INT FOREIGN KEY", "detalles VARCHAR(100)"
          ]
        },
        second_normal_form: {
          title: "2FN (Segunda Forma Normal)",
          enunciado: "Asegura que todos los campos dependan completamente de la clave primaria y crea tablas para entidades independientes.",
          tables: [
            {
              name: "reservas",
              fields: ["id_reserva", "fecha_reserva", "cliente_id"],
              correctFields: ["id_reserva VARCHAR(10) PRIMARY KEY", "fecha_reserva DATE", "cliente_id INT FOREIGN KEY"]
            },
            {
              name: "clientes",
              fields: ["id_cliente", "nombre"],
              correctFields: ["id_cliente INT PRIMARY KEY", "nombre VARCHAR(100)"]
            },
            {
              name: "detalle_reservas",
              fields: ["reserva_id", "servicio_id", "detalles"],
              correctFields: ["reserva_id VARCHAR(10) FOREIGN KEY", "servicio_id INT FOREIGN KEY", "detalles VARCHAR(100)"]
            }
          ],
          fragments: [
            "id_reserva VARCHAR(10) PRIMARY KEY", "fecha_reserva DATE", "cliente_id INT FOREIGN KEY",
            "id_cliente INT PRIMARY KEY", "nombre VARCHAR(100)",
            "reserva_id VARCHAR(10) FOREIGN KEY", "servicio_id INT FOREIGN KEY", "detalles VARCHAR(100)"
          ]
        },
        third_normal_form: {
          title: "3FN (Tercera Forma Normal)",
          enunciado: "Elimina dependencias transitivas y asegura que cada campo dependa directamente de la clave primaria.",
          tables: [
            {
              name: "reservas",
              fields: ["id_reserva", "fecha_reserva", "cliente_id"],
              correctFields: ["id_reserva VARCHAR(10) PRIMARY KEY", "fecha_reserva DATE", "cliente_id INT FOREIGN KEY"]
            },
            {
              name: "clientes",
              fields: ["id_cliente", "nombre"],
              correctFields: ["id_cliente INT PRIMARY KEY", "nombre VARCHAR(100)"]
            },
            {
              name: "servicios",
              fields: ["id_servicio", "nombre_servicio"],
              correctFields: ["id_servicio INT PRIMARY KEY", "nombre_servicio VARCHAR(50)"]
            },
            {
              name: "detalle_reservas",
              fields: ["reserva_id", "servicio_id", "detalles"],
              correctFields: ["reserva_id VARCHAR(10) FOREIGN KEY", "servicio_id INT FOREIGN KEY", "detalles VARCHAR(100)"]
            }
          ],
          fragments: [
            "id_reserva VARCHAR(10) PRIMARY KEY", "fecha_reserva DATE", "cliente_id INT FOREIGN KEY",
            "id_cliente INT PRIMARY KEY", "nombre VARCHAR(100)",
            "id_servicio INT PRIMARY KEY", "nombre_servicio VARCHAR(50)",
            "reserva_id VARCHAR(10) FOREIGN KEY", "servicio_id INT FOREIGN KEY", "detalles VARCHAR(100)"
          ]
        }
      },
      {
        name: "Cursos y Estudiantes",
        unnormalized_table: {
          title: "Tabla sin Normalizar",
          table: `
            <div class="table-title">cursos_estudiantes</div>
            <table class="normalization-table">
              <thead>
                <tr>
                  <th>id_curso</th>
                  <th>nombre_curso</th>
                  <th>profesor</th>
                  <th>estudiantes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>C101</td>
                  <td>Programación Web</td>
                  <td>Dr. Martínez</td>
                  <td>Juan Pérez: A, María García: B, Carlos Ruiz: C</td>
                </tr>
                <tr>
                  <td>C102</td>
                  <td>Base de Datos</td>
                  <td>Dra. Rodríguez</td>
                  <td>Ana López: A, Carlos Ruiz: B</td>
                </tr>
              </tbody>
            </table>
          `,
          enunciado: "Esta tabla gestiona cursos universitarios y sus estudiantes. Identifica problemas de normalización como grupos repetitivos (estudiantes múltiples con calificaciones) y dependencias no completas.",
          fragments: [
            "id_curso VARCHAR(10) PRIMARY KEY", 
            "nombre_curso VARCHAR(100)", 
            "profesor VARCHAR(100)", 
            "estudiantes VARCHAR(200)"
          ]
        },
        first_normal_form: {
          title: "1FN (Primera Forma Normal)",
          enunciado: "Separa los grupos repetitivos en tablas independientes con claves primarias y relaciones definidas.",
          tables: [
            {
              name: "cursos",
              fields: ["id_curso", "nombre_curso", "profesor_id"],
              correctFields: ["id_curso VARCHAR(10) PRIMARY KEY", "nombre_curso VARCHAR(100)", "profesor_id INT FOREIGN KEY"]
            },
            {
              name: "estudiantes",
              fields: ["id_estudiante", "nombre"],
              correctFields: ["id_estudiante INT PRIMARY KEY", "nombre VARCHAR(100)"]
            },
            {
              name: "inscripciones",
              fields: ["curso_id", "estudiante_id", "calificacion"],
              correctFields: ["curso_id VARCHAR(10) FOREIGN KEY", "estudiante_id INT FOREIGN KEY", "calificacion CHAR(1)"]
            }
          ],
          fragments: [
            "id_curso VARCHAR(10) PRIMARY KEY", "nombre_curso VARCHAR(100)", "profesor_id INT FOREIGN KEY",
            "id_estudiante INT PRIMARY KEY", "nombre VARCHAR(100)",
            "curso_id VARCHAR(10) FOREIGN KEY", "estudiante_id INT FOREIGN KEY", "calificacion CHAR(1)"
          ]
        },
        second_normal_form: {
          title: "2FN (Segunda Forma Normal)",
          enunciado: "Asegura que todos los campos dependan completamente de la clave primaria y crea tablas para entidades independientes.",
          tables: [
            {
              name: "cursos",
              fields: ["id_curso", "nombre_curso", "profesor_id"],
              correctFields: ["id_curso VARCHAR(10) PRIMARY KEY", "nombre_curso VARCHAR(100)", "profesor_id INT FOREIGN KEY"]
            },
            {
              name: "profesores",
              fields: ["id_profesor", "nombre"],
              correctFields: ["id_profesor INT PRIMARY KEY", "nombre VARCHAR(100)"]
            },
            {
              name: "inscripciones",
              fields: ["curso_id", "estudiante_id", "calificacion"],
              correctFields: ["curso_id VARCHAR(10) FOREIGN KEY", "estudiante_id INT FOREIGN KEY", "calificacion CHAR(1)"]
            }
          ],
          fragments: [
            "id_curso VARCHAR(10) PRIMARY KEY", "nombre_curso VARCHAR(100)", "profesor_id INT FOREIGN KEY",
            "id_profesor INT PRIMARY KEY", "nombre VARCHAR(100)",
            "curso_id VARCHAR(10) FOREIGN KEY", "estudiante_id INT FOREIGN KEY", "calificacion CHAR(1)"
          ]
        },
        third_normal_form: {
          title: "3FN (Tercera Forma Normal)",
          enunciado: "Elimina dependencias transitivas y asegura que cada campo dependa directamente de la clave primaria.",
          tables: [
            {
              name: "cursos",
              fields: ["id_curso", "nombre_curso", "profesor_id"],
              correctFields: ["id_curso VARCHAR(10) PRIMARY KEY", "nombre_curso VARCHAR(100)", "profesor_id INT FOREIGN KEY"]
            },
            {
              name: "profesores",
              fields: ["id_profesor", "nombre"],
              correctFields: ["id_profesor INT PRIMARY KEY", "nombre VARCHAR(100)"]
            },
            {
              name: "estudiantes",
              fields: ["id_estudiante", "nombre"],
              correctFields: ["id_estudiante INT PRIMARY KEY", "nombre VARCHAR(100)"]
            },
            {
              name: "inscripciones",
              fields: ["curso_id", "estudiante_id", "calificacion"],
              correctFields: ["curso_id VARCHAR(10) FOREIGN KEY", "estudiante_id INT FOREIGN KEY", "calificacion CHAR(1)"]
            }
          ],
          fragments: [
            "id_curso VARCHAR(10) PRIMARY KEY", "nombre_curso VARCHAR(100)", "profesor_id INT FOREIGN KEY",
            "id_profesor INT PRIMARY KEY", "nombre VARCHAR(100)",
            "id_estudiante INT PRIMARY KEY", "nombre VARCHAR(100)",
            "curso_id VARCHAR(10) FOREIGN KEY", "estudiante_id INT FOREIGN KEY", "calificacion CHAR(1)"
          ]
        }
      }
    ];

    let currentExerciseIndex = 0;
    let currentPhase = "unnormalized_table";
    let score = 0;
    let timerInterval;

    const phaseText = document.getElementById("phaseText");
    const exerciseNameText = document.getElementById("exerciseName");
    const enunciadoDiv = document.getElementById("enunciado");
    const currentTable = document.getElementById("currentTable");
    const fragmentsDiv = document.getElementById("fragments");
    const targetsDiv = document.getElementById("targets");
    const timerSpan = document.getElementById("timer");
    const scoreSpan = document.getElementById("score");
    const difficultySelect = document.getElementById("difficulty");
    const restartBtn = document.getElementById("restartBtn");
    const checkBtn = document.getElementById("checkBtn");
    const hintBtn = document.getElementById("hintBtn");
    const exerciseCards = document.querySelectorAll(".exercise-card");

    function startTimer() {
      let time;
      const level = difficultySelect.value;

      if (level === "principiante") time = 120;
      else if (level === "intermedio") time = 60;
      else if (level === "avanzado") time = 30;

      timerSpan.textContent = time;
      clearInterval(timerInterval);
      
      timerInterval = setInterval(() => {
        time--;
        timerSpan.textContent = time;
        
        // Cambio de color cuando quedan 10 segundos
        if (time <= 10) {
          timerSpan.classList.add("animate-pulse");
        }
        
        if (time <= 0) {
          clearInterval(timerInterval);
          timerSpan.classList.remove("animate-pulse");
          showTimeUpAlert();
        }
      }, 1000);
    }

    function showTimeUpAlert() {
      Swal.fire({
        title: '⏱️ ¡Tiempo Agotado!',
        html: `<p>Se ha terminado el tiempo para esta fase.</p>
               <p class="mt-2 text-sm">Se reiniciará el ejercicio automáticamente.</p>`,
        icon: 'warning',
        confirmButtonText: 'Continuar',
        allowOutsideClick: false,
        timer: 3000,
        timerProgressBar: true,
        willClose: () => {
          loadCurrentPhase();
        }
      });
    }

    function createFieldCard(text) {
      const el = document.createElement("div");
      
      // Parseamos el campo para resaltar elementos SQL
      let displayText = text;
      if (text.includes("PRIMARY KEY")) {
        displayText = `<span class="pk-indicator" title="Clave Primaria">PK</span>` + 
                      text.replace("PRIMARY KEY", "").trim();
      }
      if (text.includes("FOREIGN KEY")) {
        displayText = `<span class="fk-indicator" title="Clave Foránea">FK</span>` + 
                      text.replace("FOREIGN KEY", "").trim();
      }
      
      // Resaltamos partes SQL
      displayText = displayText
        .replace(/(INT|VARCHAR\([0-9]+\)|DATETIME|DATE|CHAR\([0-9]+\))/g, '<span class="sql-type">$1</span>')
        .replace(/(id_cliente|nombre|direccion|producto|fecha|id_direccion|id_pedido|id_producto|nombre_producto|id_empleado|departamento|habilidades|id_departamento|nombre_departamento|empleado_id|habilidad_id|id_libro|titulo|autores|generos|id_autor|nombre_autor|id_genero|nombre_genero|libro_id|autor_id|genero_id|id_venta|cliente|productos_vendidos|id_producto|venta_id|producto_id|cantidad|id_reserva|fecha_reserva|servicios|id_servicio|nombre_servicio|reserva_id|servicio_id|detalles|id_curso|nombre_curso|profesor|estudiantes|id_profesor|id_estudiante|calificacion|curso_id|estudiante_id)/g, 
                 '<span class="sql-field">$1</span>');
      
      el.innerHTML = `
        <div class="field-card bg-gray-800 p-3 rounded-lg border border-gray-700 cursor-move hover:border-blue-500 transition-colors">
          <div class="field-definition">
            ${displayText}
          </div>
        </div>
      `;
      
      el.draggable = true;
      el.ondragstart = e => e.dataTransfer.setData("text", text);
      return el;
    }

    function createTableStructure(tableData) {
      const tableEl = document.createElement("div");
      tableEl.className = "mb-8";
      
      tableEl.innerHTML = `
        <div class="table-title">${tableData.name}</div>
        <table class="normalization-table">
          <thead>
            <tr>
              ${tableData.fields.map(field => `<th>${field}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            <tr>
              ${tableData.fields.map(() => `<td><div class="cell-drop empty" data-correct=""></div></td>`).join("")}
            </tr>
          </tbody>
        </table>
      `;
      
      // Asignamos los valores correctos a cada celda
      tableData.fields.forEach((field, index) => {
        const cell = tableEl.querySelector(`tr:last-child td:nth-child(${index+1}) .cell-drop`);
        cell.dataset.correct = tableData.correctFields[index];
      });
      
      return tableEl;
    }

    function loadCurrentPhase() {
      fragmentsDiv.innerHTML = "";
      targetsDiv.innerHTML = "";
      const exercise = normalizationExercises[currentExerciseIndex];

      if (currentPhase === "unnormalized_table") {
        phaseText.textContent = "Tabla sin Normalizar";
        enunciadoDiv.querySelector("p").textContent = exercise.unnormalized_table.enunciado;
        currentTable.innerHTML = exercise.unnormalized_table.table;
        
        // Fragmentos para arrastrar
        exercise.unnormalized_table.fragments.forEach(text => {
          fragmentsDiv.appendChild(createFieldCard(text));
        });

      } else if (currentPhase === "first_normal_form") {
        phaseText.textContent = "1FN (Primera Forma Normal)";
        enunciadoDiv.querySelector("p").textContent = exercise.first_normal_form.enunciado;
        currentTable.innerHTML = `
          <div class="text-lg font-semibold mb-3 text-green-400">Tablas en 1FN</div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${exercise.first_normal_form.tables.map(table => `
              <div class="table-structure">
                <div class="table-title">${table.name}</div>
                <div class="p-3">(${table.fields.join(", ")})</div>
              </div>
            `).join("")}
          </div>
        `;
        
        // Tablas objetivo
        exercise.first_normal_form.tables.forEach(table => {
          targetsDiv.appendChild(createTableStructure(table));
        });

        // Fragmentos para arrastrar
        exercise.first_normal_form.fragments.forEach(text => {
          fragmentsDiv.appendChild(createFieldCard(text));
        });

      } else if (currentPhase === "second_normal_form") {
        phaseText.textContent = "2FN (Segunda Forma Normal)";
        enunciadoDiv.querySelector("p").textContent = exercise.second_normal_form.enunciado;
        currentTable.innerHTML = `
          <div class="text-lg font-semibold mb-3 text-yellow-400">Tablas en 2FN</div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${exercise.second_normal_form.tables.map(table => `
              <div class="table-structure">
                <div class="table-title">${table.name}</div>
                <div class="p-3">(${table.fields.join(", ")})</div>
              </div>
            `).join("")}
          </div>
        `;
        
        // Tablas objetivo
        exercise.second_normal_form.tables.forEach(table => {
          targetsDiv.appendChild(createTableStructure(table));
        });

        // Fragmentos para arrastrar
        exercise.second_normal_form.fragments.forEach(text => {
          fragmentsDiv.appendChild(createFieldCard(text));
        });

      } else if (currentPhase === "third_normal_form") {
        phaseText.textContent = "3FN (Tercera Forma Normal)";
        enunciadoDiv.querySelector("p").textContent = exercise.third_normal_form.enunciado;
        currentTable.innerHTML = `
          <div class="text-lg font-semibold mb-3 text-purple-400">Tablas en 3FN</div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${exercise.third_normal_form.tables.map(table => `
              <div class="table-structure">
                <div class="table-title">${table.name}</div>
                <div class="p-3">(${table.fields.join(", ")})</div>
              </div>
            `).join("")}
          </div>
        `;
        
        // Tablas objetivo
        exercise.third_normal_form.tables.forEach(table => {
          targetsDiv.appendChild(createTableStructure(table));
        });

        // Fragmentos para arrastrar
        exercise.third_normal_form.fragments.forEach(text => {
          fragmentsDiv.appendChild(createFieldCard(text));
        });
      }

      startTimer();
      initDropZones();
    }

    function initDropZones() {
      const targets = document.querySelectorAll(".cell-drop");
      targets.forEach(cell => {
        cell.ondragover = e => {
          e.preventDefault();
          if (cell.classList.contains("empty")) {
            cell.style.backgroundColor = "#3c4b64";
          }
        };
        
        cell.ondragleave = () => {
          if (cell.classList.contains("empty")) {
            cell.style.backgroundColor = "";
          }
        };
        
        cell.ondrop = e => {
          e.preventDefault();
          const dragged = e.dataTransfer.getData("text");
          const correct = cell.dataset.correct;

          if (cell.classList.contains("empty")) {
            cell.style.backgroundColor = "";
            
            if (dragged === correct) {
              // Parseamos el campo para mostrar
              let displayText = dragged;
              if (dragged.includes("PRIMARY KEY")) {
                displayText = `<span class="pk-indicator">PK</span>` + 
                              dragged.replace("PRIMARY KEY", "").trim();
              }
              if (dragged.includes("FOREIGN KEY")) {
                displayText = `<span class="fk-indicator">FK</span>` + 
                              dragged.replace("FOREIGN KEY", "").trim();
              }
              
              // Resaltamos partes SQL
              displayText = displayText
                .replace(/(INT|VARCHAR\([0-9]+\)|DATETIME|DATE|CHAR\([0-9]+\))/g, '<span class="sql-type">$1</span>')
                .replace(/(id_cliente|nombre|direccion|producto|fecha|id_direccion|id_pedido|id_producto|nombre_producto|id_empleado|departamento|habilidades|id_departamento|nombre_departamento|empleado_id|habilidad_id|id_libro|titulo|autores|generos|id_autor|nombre_autor|id_genero|nombre_genero|libro_id|autor_id|genero_id|id_venta|cliente|productos_vendidos|id_producto|venta_id|producto_id|cantidad|id_reserva|fecha_reserva|servicios|id_servicio|nombre_servicio|reserva_id|servicio_id|detalles|id_curso|nombre_curso|profesor|estudiantes|id_profesor|id_estudiante|calificacion|curso_id|estudiante_id)/g, 
                         '<span class="sql-field">$1</span>');
              
              cell.innerHTML = `<div class="field-definition">${displayText}</div>`;
              cell.classList.add("correct");
              cell.classList.remove("empty", "incorrect");
              
              // Removemos el fragmento usado
              [...fragmentsDiv.children].forEach(el => {
                if (el.querySelector(".field-definition").textContent === dragged) {
                  el.remove();
                }
              });
              
              score += 10;
              scoreSpan.textContent = score;
              checkCompletion();
            } else {
              cell.classList.add("incorrect");
              cell.classList.remove("empty");
              cell.innerHTML = "Inténtalo de nuevo";
              setTimeout(() => {
                cell.classList.remove("incorrect");
                cell.classList.add("empty");
                cell.innerHTML = "";
              }, 1000);
            }
          }
        };
      });
    }

    function checkCompletion() {
      const targets = document.querySelectorAll(".cell-drop");
      const filled = [...targets].every(cell => !cell.classList.contains("empty"));
      
      if (filled) {
        clearInterval(timerInterval);
        timerSpan.classList.remove("animate-pulse");
        
        let resultMessage = '';
        let consoleOutput = '';

        if (currentPhase === "unnormalized_table") {
          resultMessage = "✅ Tabla cargada correctamente.";
          consoleOutput = "Esta tabla no está normalizada. Contiene grupos repetitivos y campos multivaluados.";
        } else if (currentPhase === "first_normal_form") {
          resultMessage = "✅ 1FN aplicada correctamente.";
          consoleOutput = "Tablas en 1FN:\n" + normalizationExercises[currentExerciseIndex].first_normal_form.tables.map(t => `- ${t.name}(${t.fields.join(", ")})`).join("\n");
        } else if (currentPhase === "second_normal_form") {
          resultMessage = "✅ 2FN aplicada correctamente.";
          consoleOutput = "Tablas en 2FN:\n" + normalizationExercises[currentExerciseIndex].second_normal_form.tables.map(t => `- ${t.name}(${t.fields.join(", ")})`).join("\n");
        } else if (currentPhase === "third_normal_form") {
          resultMessage = "✅ 3FN aplicada correctamente.";
          consoleOutput = "Tablas en 3FN:\n" + normalizationExercises[currentExerciseIndex].third_normal_form.tables.map(t => `- ${t.name}(${t.fields.join(", ")})`).join("\n");
        }

        Swal.fire({
          title: '✅ Fase Completada',
          html: `<p class="text-xl font-bold text-green-500">${resultMessage}</p>
                 <div class="mt-4 p-3 bg-gray-800 rounded-lg">
                   <pre class="text-green-400 font-mono text-sm">${consoleOutput}</pre>
                 </div>`,
          icon: 'success',
          confirmButtonText: 'Continuar',
          customClass: {
            popup: 'bg-gray-800 border border-green-700 rounded-xl'
          }
        }).then(() => nextPhase());
      }
    }

    function nextPhase() {
      const phases = Object.keys(normalizationExercises[currentExerciseIndex]);
      const currentIndex = phases.indexOf(currentPhase);

      if (currentIndex < phases.length - 1) {
        currentPhase = phases[currentIndex + 1];
        loadCurrentPhase();
      } else {
        if (currentExerciseIndex < normalizationExercises.length - 1) {
          currentExerciseIndex++;
          currentPhase = "unnormalized_table";
          Swal.fire({
            title: '🎉 ¡Ejercicio Completado!',
            text: 'Pasando al siguiente ejercicio...',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
            willClose: () => {
              loadCurrentPhase();
            }
          });
        } else {
          Swal.fire({
            title: '🏆 ¡Felicidades!',
            html: `<p>¡Has completado todos los ejercicios de normalización!</p>
                   <p class="mt-4 text-2xl font-bold">Puntuación final: <span class="text-yellow-400">${score}</span></p>`,
            icon: 'success',
            confirmButtonText: 'Volver a empezar',
            customClass: {
              popup: 'bg-gray-800 border border-yellow-600 rounded-xl'
            }
          }).then(() => {
            currentExerciseIndex = 0;
            currentPhase = "unnormalized_table";
            score = 0;
            scoreSpan.textContent = 0;
            loadCurrentPhase();
          });
        }
      }
    }

    function showHint() {
      const exercise = normalizationExercises[currentExerciseIndex][currentPhase];
      let hintMessage = '';
      
      if (currentPhase === "unnormalized_table") {
        hintMessage = "Busca campos que contengan múltiples valores en una sola celda (como direcciones y productos). Estos necesitan ser separados en tablas independientes.";
      } else if (currentPhase === "first_normal_form") {
        hintMessage = "Recuerda que en 1FN cada tabla debe tener una clave primaria y eliminar grupos repetitivos. Las tablas deben relacionarse mediante claves foráneas.";
      } else if (currentPhase === "second_normal_form") {
        hintMessage = "En 2FN, separa campos que dependen solo de parte de la clave primaria. Para relaciones muchos-a-muchos, crea tablas intermedias.";
      } else if (currentPhase === "third_normal_form") {
        hintMessage = "En 3FN, elimina dependencias transitivas. Si un campo depende de otro campo que no es la clave primaria, debe ir en una tabla separada.";
      }
      
      Swal.fire({
        title: '💡 Pista de Normalización',
        html: `<div class="text-left">
                <p class="mb-3">${hintMessage}</p>
                <div class="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-700">
                  <p class="font-semibold">Estructura esperada:</p>
                  <ul class="list-disc pl-5 mt-2">
                    ${exercise.tables.map(table => 
                      `<li><span class="font-mono text-cyan-300">${table.name}</span>: ${table.correctFields.join(", ")}</li>`
                    ).join("")}
                  </ul>
                </div>
              </div>`,
        icon: 'info',
        confirmButtonText: 'Entendido',
        customClass: {
          popup: 'bg-gray-800 border border-blue-700 rounded-xl max-w-2xl'
        }
      });
    }

    // Event Listeners
    restartBtn.addEventListener("click", () => {
      Swal.fire({
        title: '¿Reiniciar ejercicio?',
        text: 'Se perderá el progreso actual',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, reiniciar',
        cancelButtonText: 'Cancelar',
        customClass: {
          popup: 'bg-gray-800 border border-gray-700 rounded-xl'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          currentExerciseIndex = 0;
          currentPhase = "unnormalized_table";
          score = 0;
          scoreSpan.textContent = 0;
          loadCurrentPhase();
        }
      });
    });

    checkBtn.addEventListener("click", () => {
      const emptyCells = document.querySelectorAll(".cell-drop.empty");
      if (emptyCells.length > 0) {
        Swal.fire({
          title: 'Campos faltantes',
          text: `Aún hay ${emptyCells.length} campos por completar.`,
          icon: 'warning',
          confirmButtonText: 'Continuar',
          customClass: {
            popup: 'bg-gray-800 border border-yellow-600 rounded-xl'
          }
        });
      } else {
        checkCompletion();
      }
    });

    hintBtn.addEventListener("click", showHint);

    difficultySelect.addEventListener("change", () => {
      localStorage.setItem("lastDifficulty", difficultySelect.value);
      loadCurrentPhase();
    });

    // Selector de ejercicios
    exerciseCards.forEach(card => {
      card.addEventListener("click", () => {
        const index = parseInt(card.dataset.index);
        
        // Actualizar tarjeta activa
        exerciseCards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        
        // Cambiar ejercicio
        currentExerciseIndex = index;
        currentPhase = "unnormalized_table";
        exerciseNameText.textContent = normalizationExercises[index].name;
        loadCurrentPhase();
      });
    });

    // Inicialización
    document.addEventListener("DOMContentLoaded", () => {
      const lastDifficulty = localStorage.getItem("lastDifficulty") || "intermedio";
      difficultySelect.value = lastDifficulty;
      exerciseNameText.textContent = normalizationExercises[0].name;
      loadCurrentPhase();
    });