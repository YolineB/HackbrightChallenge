"""Models for Melon Reservation"""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    """Create a User """

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    fname = db.Column(db.String(50), nullable=False)


    def __repr__(self):
        """Provide output when printing """

        return f"<User user_id= {self.user_id} name={self.fname}>"

    #reservations = a list of Reservation Objects


class Reservations(db.Model):
    """"Create a reservation """
    __tablename__ = "reservations"

    reservation_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    day_of = db.Column(db.String(20), nullable=False)
    time_slot = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        """Provide output when printing """

        return f"<Reservation id={self.user_id} on {self.day_of}>"

    user = db.relationship("User", backref="reservations")



def connect_to_db(app, db_URI="postgresql:///melons_reservation_data"):
    """Connect to database Call connect_to_db(app, echo=False) to not set each SQLAlchemy execution"""

    app.config["SQLALCHEMY_DATABASE_URI"] = db_URI
    app.config["SQLALCHEMY_ECHO"] = True #output the raw SQL executed by SQLAlchemy to assist debugging
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = app
    db.init_app(app)

    print("Connected to melons_reservation_data!")
if __name__ == "__main__":
    from server import app
    connect_to_db(app)
    db.create_all()