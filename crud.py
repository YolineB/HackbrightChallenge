"""CRUD operations """

def day_of_time_slots():
    """generate time slots when date is instantiated """

    hours = ['12', '1', '2', '3', '4', '5', '6',
            '7', '8', '9', '10', '11']
    minutes = ['00', '30']
    i = 0
    time_slots = []

    while i < 24:
        if i < 12:
            time_a = hours[i%len(hours)] + ":" + minutes[0] + "am"
            time_b = hours[i%len(hours)] + ":" + minutes[1] + "am"
            time_slots.extend([{time_a: None}, {time_b: None}])

        else:
            time_c = hours[i%len(hours)] + ":" + minutes[0] + "pm"
            time_d = hours[i%len(hours)] + ":" + minutes[1] + "pm"
            time_slots.extend([{time_c: None}, {time_d: None}])

        i += 1

    return time_slots

def check_date(date):
    """return appointment results of date"""

    time_slots = day_of_time_slots()

    # reservations_on_date = receive reservations and cross check with time_slots. if equal, set to True


    return time_slots

if __name__ == '__main__':
    from server import app