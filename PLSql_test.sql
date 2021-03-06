SET SERVEROUTPUT ON;

SELECT NOMBRES_NOMBRE||' '||APELLIDOP_NOMBRE||' '||APELLIDOM_NOMBRE AS FULLNAME, ROL_USUARIO
FROM USUARIO
WHERE ROL_USUARIO = 'ADMINISTRADOR' AND NOMBRES_NOMBRE LIKE 'A%';

DECLARE
    UDNI USUARIO.DNI%TYPE:=10101002;
    fullName VARCHAR2(150);
    ROLUSUARIO VARCHAR2(15);
BEGIN
    SELECT NOMBRES_NOMBRE||' '||APELLIDOP_NOMBRE||' '||APELLIDOM_NOMBRE, ROL_USUARIO
    INTO fullName, ROLUSUARIO
    FROM USUARIO
    WHERE USUARIO.DNI = UDNI;
    
    DBMS_OUTPUT.PUT_LINE('Nombre completo: ' || fullName);
    DBMS_OUTPUT.PUT_LINE('Rol del usuario: ' || ROLUSUARIO);
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('No se encuentra el usuario');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error desconocido');
END;