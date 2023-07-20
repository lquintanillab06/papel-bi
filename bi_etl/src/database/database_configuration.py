import mysql.connector
import json



class LocalDataBaseConnection():  
    def __init__(self):
        with open("conf/config.json") as f:
            configuracion = json.loads(f.read())
            datasource = configuracion["datasource"]

        self.database = mysql.connector.connect(
                host = datasource['host'],
                user = datasource['user'],
                passwd = datasource['passwd'] ,
                database = datasource['database'],
                charset='utf8'
            )

        self.cursor = self.database.cursor(dictionary=True, buffered=True)

class RemoteDataBaseConnection():
    def __init__(self):
        with open("conf/config.json") as f:
            configuracion = json.loads(f.read())
            datasource = configuracion["datasource_remote"]
        self.database = mysql.connector.connect(
                host = datasource['host'],
                user = datasource['user'],
                passwd = datasource['passwd'] ,
                database = datasource['database'],
                 charset='utf8'
            )
        self.cursor = self.database.cursor(dictionary=True, buffered=True)

class RemoteDataBaseConnectionConfig():
    def __init__(self, configuracion):
            datasource = configuracion
            self.database = mysql.connector.connect(
                host = datasource['host'],
                user = datasource['user'],
                passwd = datasource['passwd'] ,
                database = datasource['database'],
                 charset='utf8'
            )
            self.cursor = self.database.cursor(dictionary=True, buffered=True)

