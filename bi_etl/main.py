from src.database.database_connection import get_local_pool_connection
import mysql






if __name__ == "__main__":
    run = True 
    ''' connection = get_local_pool_connection() '''
    ''' cnx = connection.get_conexion()
    cursor = cnx.cursor(dictionary=True, buffered=True)
    query = "select* from sucursal;"
    cursor.execute(query)
    rows = cursor.fetchall()
    print(rows) '''
    ''' while run :

        print("Running !!")
        cnx = connection.get_conexion()
        cursor = cnx.cursor(dictionary=True, buffered=True)
        query = "select* from sucursal;"
        cursor.execute(query)
        rows = cursor.fetchall()
        print(rows)
        cnx.close() '''
    

    cnx = mysql.connector.connect(
                    host = 'localhost',
                    user = 'root',
                    passwd = 'sys' ,
                    database = 'siipapx_tacuba',
                    charset='utf8'
                )
    
    cursor = cnx.cursor(dictionary=True, buffered=True)
    cursor2 = cnx.cursor(dictionary=True, buffered=True)
    query = "select* from sucursal;"
    cursor.execute(query)
    rows = cursor.fetchall()
    print(rows)
  
    cursor2.execute(query)
    rows2 = cursor2.fetchall()
    print(rows2)
    
    
    '''  while run :
        print("Running !!")  '''
        
        