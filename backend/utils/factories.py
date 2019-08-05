import string
import urllib.request
import random
from django.contrib.auth.models import User
from landing.models import Reservation, Unit, Address, Property, UnitGroup, Cleaner
from datetime import datetime, timedelta
import random

CITY_NAMES = ["Aachen", "Augsburg", "Bamberg", "Berlin", "Erfurt", "Essen", "Ingolstadt",
                "Kassel", "Koblenz", "Leipzig", "Magdeburg", "Mainz", "Montabaur", "Regensburg", "Ulm"]

def rand_name():
    """ Random name generator.
        Credits: http://andrewjmoodie.com/2018/03/python-3-silly-random-name-generator/
    Returns:
        A string that holds a name as stupid as you want.
    """
    word_url = "http://svnweb.freebsd.org/csrg/share/dict/words?view=co&content-type=text/plain"
    response = urllib.request.urlopen(word_url)
    long_txt = response.read().decode()
    words = long_txt.splitlines()

    upper_words = [word for word in words if word[0].isupper()]
    name_words = [word for word in upper_words if not word.isupper()]
    name = " ".join([name_words[random.randint(0, len(name_words))]
                     for i in range(2)])
    return name


def generate_users(n: int):
    """ Creates and flushes into the database n users
        Credits: https://gist.github.com/L422Y
    Args:
        n: number of users to be created
    """

    print("Generating %s user(s)..." % n)
    print(
        "{:20s} {:20s} {:20s} {:20s}".format(
            "#", "username", "firstname", "lastname")
    )

    for user_index in range(n):
        name = rand_name().split()
        user = User.objects.create(
            username=name[1][0] + name[0], first_name=name[1], last_name=name[0]
        )
        print(
            "{:<20d} {:20s} {:20s} {:20s}".format(
                user_index + 1, user.username, user.first_name, user.last_name
            )
        )

        user.save()


def generate_addresses(n: int):
    """Generates the specified number of address objects and populates them with random
    content.
    Args:
        n: Number of addresses to generate
    Returns:
        Array of all the address elements created
    """
    addresses = []
    street_names = ["Mefferdatisstrasse", "Vereinsstrasse", "Am Katzenstadel", "Siechenstrasse", "Schlüterstrasse", "Schlüterstrasse",
                    "Johannesstrasse", "Viehoferstrasse", "Kleine Rosengasse", "Motzstrasse", "Gerichtsstrasse", "Michaelisstrasse", "Breiter Weg", "Am Quendelberg", "Kirchstrasse", "Thaliastrasse"]

    for elem in range(n):
        address = Address.objects.create(
            street=random.choice(street_names),
            number=random.randint(0, 99),
            zip_code=random.randint(10000, 99999),
            city=random.choice(CITY_NAMES),
            country="Germany",
        )
        addresses.append(address)
        address.save()

    return addresses


def generate_properties(n: int):
    """ Generates the specified number of property objects and populates them with random
    content.
    Args:
        n: Number of properties to generate
    """

    for elem in range(n):
        property = Property.objects.create(
            name=random.choice(CITY_NAMES),
            description="".join(
                random.choice(string.ascii_lowercase) for x in range(10)
            ),
            address=generate_addresses(1)[0],
            time_zone="Europe/Berlin",
        )
        property.save()


def populate_property(property: Property, n_floors: int, n_rooms: int):
    """ Populates the introduced property with n_floors each of which will have n_rooms
    Args:
        property: Property object to which we assign the rooms
        n_floors: Number of floors created in the property
        n_rooms: Number of rooms per floor in the property
    """

    for floor in range(n_floors):
        group = UnitGroup.objects.create(
            name="floor " + str(floor),
            description="".join(
                random.choice(string.ascii_lowercase) for x in range(20)
            ),
            member_count=0,
            max_persons=0,
            property=property,
        )

        for room in range(n_rooms):
            room = Unit.objects.create(
                name=str(floor) + "0" + str(room)
                if len(str(room)) < 2
                else str(floor) + str(room),
                description="".join(
                    random.choice(string.ascii_lowercase) for x in range(20)
                ),
                property=property,
                unit_group=group,
                max_persons=random.randint(1, 3),
                is_occupied=False,
            )
            group.max_persons += room.max_persons
            room.save()

        group.save()


def generate_reservations(user: User, unit: Unit, n: int):
    """ Creates a specified number of reservations for a given user
    Args:
        user: User object for which we want to create reservations
        unit: The unit for which we create the reservations
        n : Number of reservations to be created
    """

    today = datetime.now()
    init= today.replace(hour=14, minute=0)
    cleaning = timedelta(hours=3)

    for day in range(n):
        stay = timedelta(hours=21)
        reservation = Reservation.objects.create(
            status="C",
            check_in=init,
            check_out=init + stay ,
            main_guest=user,
            unit=unit,
            adults=1,
            children=0,
            guest_comments="",
        )
        reservation.save()
        init = init + stay + cleaning


def generate_database():
    """
    Generate a random database.
    Args:
        No arguments required.
    """
    N_USERS = 10
    N_PROPERTIES = 5

    generate_users(N_USERS)
    generate_properties(N_PROPERTIES)
    for property in range(1, N_PROPERTIES):
        prop = Property.objects.get(pk=property)
        populate_property(prop, 2, 10)

    for user in range(1, N_USERS):
        user_ = User.objects.get(pk=user)
        unit_ = Unit.objects.get(pk=user)
        generate_reservations(user_, unit_, 1)


def nearest_check_in(res_list, base_res: Reservation):
    # get the reservation with a check_in at the same day as check_out of base_res
    nearest = 0
    count = 0
    for res in range(res_list.count()):
        # check if the date is the same (extension not needed, as only the date is important)
        if res_list[res].check_in.date() == base_res.check_out.date():
            if res_list[res] != base_res:
                nearest = res_list[res]
                count = count + 1

    if count > 1:
        print('There are probably overlaps between check-out of the reservation you look at and check-in of the next reservation! Please check!')

    return nearest


def nearest_check_out(res_list, base_res: Reservation):
    # get the reservation with a check_out at the same day as check_in of base_res
    nearest = 0
    count = 0
    for res in range(res_list.count()):
        # check if the date is the same (extension not needed, as only the date is important)
        if res_list[res].check_out.date() == base_res.check_in.date():
            if res_list[res] != base_res:
                nearest = res_list[res]
                count = count + 1

    if count > 1:
        print('There are probably overlaps between check-in of the reservation you look at and check-out of the previous reservation! Please check!')

    return nearest
