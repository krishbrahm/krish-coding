from flask import Flask, render_template, request, redirect
import sqlite3

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact', methods = ['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        age = request.form['age']
        message = request.form['message']
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO messages(name, email, age, message)
                VALUES(?, ?, ?, ?)
        ''', (name, email, age, message))
        conn.commit()
        conn.close()
        print(f'Name: {name}. Email: {email}. Age: {age}. Message: {message}')
        return 'Message received successfuly!'
    return render_template('contact.html')

@app.route('/messages')
def messages():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM messages')
    messages = cursor.fetchall()
    conn.commit()
    conn.close()
    return render_template('messages.html', messages=messages)
@app.route('/delete/<int:id>')
def delete_message(id):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('DELETE FROM messages WHERE id =? ', (id, ))
    conn.commit()
    conn.close()
    return redirect('/messages')
@app.route('/edit/<int:id>', methods=['GET', 'POST'])
def edit_message(id):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    if request.method == "POST":
        name = request.form["name"]
        email = request.form["email"]
        age = request.form["age"]
        message = request.form["message"]
        cursor.execute(
            """ 
                UPDATE messages 
                SET name=?, 
                email=?, 
                age=?,
                message=? 
                WHERE id=? 
            """, 
            ( name, email, age, message, id )
        )
        conn.commit() 
        conn.close() 
        return redirect("/messages") 
    cursor.execute( "SELECT * FROM messages WHERE id=?", (id,) ) 
    message = cursor.fetchone() 
    conn.close() 
    return render_template( "edit.html", message=message )

# @app.route('/register', methods = ['POST'])
# def register():
#     name = request.form['name']
#     age = request.form['age']

#     html_start = '''
#     <!DOCTYPE html>
#     <html>
#     <head>
#         <link href="/static/css/style.css" rel="stylesheet">
#     </head>
#     <body>
#         <div class="result-container">
#             <h1>Registration Successful!</h1>
#             <p><strong>Student:</strong> '''
            
#     html_middle = '''</p>
#             <p><strong>Age:</strong> '''
            
#     html_end = '''</p>
#             <a href="/">Home</a>
#         </div>
#     </body>
#     </html>
#     '''
    
#     return html_start + name + html_middle + age + html_end

if __name__ == '__main__':
    app.run(debug = True)
