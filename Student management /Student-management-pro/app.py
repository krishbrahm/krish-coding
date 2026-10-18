from flask import Flask, render_template, request, redirect, session
import sqlite3

app = Flask(__name__)
app.secret_key = 'Student-management-secret-key'
@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        conn = sqlite3.connect('students.db')
        cursor = conn.cursor()
        cursor.execute('''
            SELECT * FROM users
            WHERE username = ?
            AND password = ?
        ''', (username, password))
        user = cursor.fetchone()
        conn.close()
        if user:
            return 'Login successful!'
        return 'Invalid username or password!'
    return render_template('login.html')
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        conn = sqlite3.connect('students.db')
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO users(username, password)
                VALUES(?, ?)
        ''', (username, password))
        conn.commit()
        conn.close()
        return 'Account created successfully!'
    return render_template('register.html')
@app.route('/dashboard')
def dashboard():
    if 'username' not in session:
        return redirect('/')
    username = session['username']
    return render_template('dashboard.html', username=username)
@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect('/')

@app.route('/add-student', methods=['GET', 'POST'])
def add_student():
    if 'username' not in session:
        return redirect('/')
    if request.method == 'POST':
        name = request.form['name']
        age = request.form['age']
        class_name = request.form['class_name']
        city = request.form['city']
        phone = request.form['phone']
        conn = sqlite3.connect('students.db')
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO students
                (
                    name, age, class_name, city, phone
                )
                    VALUES (?, ?, ?, ?, ?)
        ''', (name, age, class_name, city, phone))
        conn.commit()
        conn.close()
        return redirect('/students')
    return render_template('add-student.html')
if __name__ == '__main__':
    app.run(debug = True)