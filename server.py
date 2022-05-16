from flask import (Flask, render_template, request, session,
                   redirect, jsonify, flash)

app = Flask(__name__)
app.secret_key = 'dev'

import crud
from model import connect_to_db, db

@app.route('/')
def home():
    """main page"""

    return render_template('index.html')

@app.route('/register_user', methods=['POST'])
def register_user():
    """register user if not already in db"""
    reg_username = request.json.get('regUserName')
    fname = request.json.get('firstName')

    if crud.check_username(reg_username) is not None:
        return jsonify('in db')
    else: 
        new_user = crud.register_user(reg_username, fname)
        db.session.add(new_user)
        db.session.commit()
        return jsonify('registered')

@app.route('/show_times/<search_date>')
def generate_times(search_date):
    """jsonify available time results"""

    time_results = crud.check_date(search_date)

    return jsonify(time_results)

if __name__ == '__main__':
    connect_to_db(app)
    app.run('0.0.0.0', debug=True)