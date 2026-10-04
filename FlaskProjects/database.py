import sqlite3
conn = sqlite3.connect('database.db')
cursor = conn.cursor()
cursor.execute('''
    CREATE TABLE IF NOT EXISTS messages(
       id integer primary key autoincrement,
       name text not null,
       email text not null,
       age integer not null,
       message text not null
    )
''')
conn.commit()
conn.close()
print('Database created successfully!')