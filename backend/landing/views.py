from django.shortcuts import render
from utils import factories
from django.contrib.auth.models import User
from landing.models import Unit, Property


# Create your views here.


def index(request):
    """ View to serve the main landing page

    Args:
        request: object containing the received http request to the url "/"

    Returns:
        render(): method to render the indicated html template with the context dictionary

    """
    """ factories.generate_properties(3)
    prop = Property.objects.all().first()
    if prop:
        factories.populate_property(prop, 3, 10)
    unit = Unit.objects.all().first()
    user = User.objects.all().first()
    factories.generate_reservations(user, unit, 10) """

    #factories.generate_database()

    context = {}
    return render(request, "index.html", context)

def generate_properties(request):
    """ View to generate new properties for display purposes

    Args:
        request: object containing the received http request to the url "/"

    Returns:
        render(): method to render the indicated html template with the context dictionary

    """
    N_PROPERTIES = 3
    factories.generate_properties(N_PROPERTIES)
    prop = Property.objects.all().first()
    print(prop)
    if prop:
        factories.populate_property(prop, 3, 10)

    context = {}
    return render(request, "genProps.html", context)

def generate_users(request):
    """ View to generate new properties for display purposes

    Args:
        request: object containing the received http request to the url "/"

    Returns:
        render(): method to render the indicated html template with the context dictionary

    """
    N_USERS = 3
    factories.generate_users(N_USERS)

    context = {}
    return render(request, "genUsers.html", context)

def generate_reservations(request):
    """ Generates reservations for the first user and property

    Args:
        request: object containing the received http request to the url "/"

    Returns:
        render(): method to render the indicated html template with the context dictionary

    """
    unit = Unit.objects.all().first()
    user = User.objects.all().first()
    factories.generate_reservations(user, unit, 10) 

    context = {}
    return render(request, "genReservations.html", context)

def init(request):
    """ Generates reservations for the first user and property

    Args:
        request: object containing the received http request to the url "/"

    Returns:
        render(): method to render the indicated html template with the context dictionary

    """
    N_USERS = 3
    N_PROPERTIES = 3

    factories.generate_users(N_USERS)
    factories.generate_properties(N_PROPERTIES)
    prop = Property.objects.all().first()
    if prop:
        factories.populate_property(prop, 3, 10)

    unit = Unit.objects.all().first()
    user = User.objects.all().first()
    factories.generate_reservations(user, unit, 10) 

    context = {}
    return render(request, "init.html", context)

