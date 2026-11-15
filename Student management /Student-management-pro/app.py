from flask import Flask, render_template, request, redirect, session
import sqlite3
app = Flask(__name__)
app.secret_key = 'Student-management-secret-key'

@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        connection = sqlite3.connect("students.db")
        cursor = connection.cursor()
        cursor.execute("""
            SELECT * FROM users
            WHERE username = ?
            AND password = ?
        """, (username, password))
        user = cursor.fetchone()
        connection.close()
        if user:
            session["username"] = username
            return redirect("/dashboard")
        return "Invalid username or password!"
    return render_template("login.html")
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
@app.route("/dashboard")
def dashboard():
    if "username" not in session:
        return redirect("/")
    username = session["username"]
    connection = sqlite3.connect("students.db")
    cursor = connection.cursor()
    cursor.execute("SELECT COUNT(*) FROM students")
    total_students = cursor.fetchone()[0]
    cursor.execute("""
        SELECT COUNT(DISTINCT class_name)
        FROM students
    """)
    total_classes = cursor.fetchone()[0]
    cursor.execute("""
        SELECT * FROM students
        ORDER BY id DESC
        LIMIT 5
    """)
    recent_students = cursor.fetchall()
    connection.close()
    return render_template(
        "dashboard.html",
        username=username,
        total_students=total_students,
        total_classes=total_classes,
        recent_students=recent_students
    )
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
@app.route("/students")
def students():
    if "username" not in session:
        return redirect("/")
    search = request.args.get("search", "")
    connection = sqlite3.connect("students.db")
    cursor = connection.cursor()
    if search:
        cursor.execute("""
            SELECT * FROM students
            WHERE name LIKE ?
        """, ("%" + search + "%",))
    else:
        cursor.execute("""
            SELECT * FROM students
        """)
    students = cursor.fetchall()
    connection.close()
    return render_template(
        "students.html",
        students=students,
        search=search
    )
if __name__ == '__main__':
    app.run(debug=True)
