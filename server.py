from flask import (Flask, render_template, request, session,
                   redirect, jsonify)

import crud

app = Flask(__name__)
app.secret_key = 'dev'

@app.route('/')
def home():
    """main page"""

    return render_template('index.html')

@app.route('/show_times/<search_date>')
def generate_times(search_date):
    """jsonify available time results"""

    time_results = crud.check_date(search_date)

    return jsonify(time_results)

if __name__ == '__main__':
    # connect_to_db(app)
    app.run('0.0.0.0', debug=True)