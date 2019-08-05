import string
import hashlib


def create_hash(input_string: string, obj: string):
    """ Returns a hash representing the string passed that depends on the type of
    object that we create

    Args:
        str: String to encode belonging to your base object
        obj: the char identifier of the type of object that we hash
        Can take values: {

        }

    Returns:
        10 figure hash depending  on the input received
    """
    seed = hashlib.sha224(input_string.encode()).hexdigest()
    out_dict = {"g": 0, "u": 1, "p": 2, "r": 3}
    return seed[:9] + str(out_dict[obj])
