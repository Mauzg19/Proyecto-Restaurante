## ¿Cómo ejecutar el backend?

- ### Instalar Java-17 y JavaC

- ### Configuración de MySQL
	- Descargar MySQL
        ```
        sudo dnf install community-mysql-server -y
        ```
	- Habilitar e iniciar `mysqld`
        ```
        sudo systemctl enable --now mysqld
        ```
	- Instalar MySQL
        ```
        sudo mysql_secure_installation
        ```

- ### Editar **`src/resources/application.properties`**
  - Editar la configuración de la base de datos MySQL
    ```
    mysql -u root -p
    ```
    ```
    create database SU_NOMBRE_DE_BASE_DE_DATOS;
    ```
    ```
    use SU_NOMBRE_DE_BASE_DE_DATOS
    ```
    ```
    show tables;
    ```
  - Pegue la clave secreta de su pasarela de pago de Stripe
  - Pegue su correo electrónico y contraseña de la aplicación

- ### Iniciar el servidor backend localmente
	```
	export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
	```
	```
	path/to/mvn spring-boot:run
	```

## ¿Cómo ejecutar el frontend?
```
npm install
```
```
npm start
```


