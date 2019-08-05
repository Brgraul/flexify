from django.db import models
from timezone_field import TimeZoneField
from datetime import datetime, timedelta
from utils.hashing import create_hash
from django.contrib.auth.models import User, AbstractBaseUser


class Address(models.Model):
    """Class representing an address."""

    street = models.CharField("Street Name", max_length=400)
    number = models.IntegerField()
    zip_code = models.CharField("ZIP / Postal code", max_length=12)
    city = models.CharField("City", max_length=1024)
    country = models.CharField(max_length=20)

    # str-method to get meaningful text if we print it
    def __str__(self):
        return self.street + " " + str(self.number)


class Property(models.Model):
    """Class for a property object. It comprises a set of units."""

    name = models.CharField(max_length=20)
    code = models.CharField(max_length=10, unique=True)
    description = models.CharField(max_length=20)
    address = models.OneToOneField(Address, on_delete=models.CASCADE)
    time_zone = TimeZoneField()
    created = models.DateTimeField(auto_now_add=True)
    # added attribute occupancy of property
    occupancy = models.FloatField(default=0)

    class Meta:
        verbose_name_plural = "properties"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.code = create_hash(self.name, "p")
        super(Property, self).save(*args, **kwargs)


class UnitGroup(models.Model):
    """Class for gathering units into groups."""

    name = models.CharField(max_length=20)
    # code = models.CharField(max_length=10, unique=True)
    description = models.CharField(max_length=200)
    member_count = models.IntegerField()
    max_persons = models.IntegerField()
    property = models.ForeignKey(
        Property, on_delete=models.CASCADE, related_name="floors"
    )

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.code = create_hash(self.name + self.property.name, "g")
        super(UnitGroup, self).save(*args, **kwargs)
    """ def save(self, *args, **kwargs):
        self.code = create_hash(self.name, "g")
        super(UnitGroup, self).save(*args, **kwargs) """


class Unit(models.Model):
    """Class for a unit object."""

    CLEAN = "CL"
    CLEANTOBEINSPECTED = "CL_TB"
    DIRTY = "DR"

    CONDITION_CHOICES = [
        (CLEAN, "Clean"),
        (CLEANTOBEINSPECTED, "Clean to be inspected"),
        (DIRTY, "Dirty"),
    ]

    name = models.CharField(max_length=20)
    code = models.CharField(max_length=10, unique=True)
    description = models.CharField(max_length=200)
    property = models.ForeignKey(
        Property, on_delete=models.CASCADE, related_name="units"
    )
    unit_group = models.ForeignKey(
        UnitGroup, on_delete=models.CASCADE, blank=True, related_name="units"
    )
    max_persons = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    is_occupied = models.BooleanField()
    condition = models.CharField(
        max_length=5, choices=CONDITION_CHOICES, default=CLEAN)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # self.code = create_hash(self.name + self.property.name, "u")
        self.code = create_hash(self.name + str(self.created), "u")
        self.unit_group.member_count = self.unit_group.units.count()
        super(Unit, self).save(*args, **kwargs)


class UnitCleaningModel(models.Model):
    """Class for an assigned cleaning to a room and one persone of the cleaning personnel."""

    VIP = "VIP"  # guest has a vip status
    Full_Cleaning = "FC"  # guest checks out and full cleaning hast to be done
    Basic_Cleaning = "BC"  # guest want stays but wants to have the room cleaned

    Cleaning_Choices = [(VIP, "VIP"),
                        (Full_Cleaning, "Cleaning after check-out"),
                        (Basic_Cleaning, "Cleaning without check-out")]

    cleaning_type = models.CharField(
        max_length=5, choices=Cleaning_Choices, default=Full_Cleaning)

    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    maintenance = models.CharField(max_length=100, default="")
    personal_belongings = models.CharField(max_length=100, default="")

    unit = models.OneToOneField(
        Unit,  on_delete=models.CASCADE, null=True, related_name="unit_cleaning_model")

    def __str__(self):
        return (
            self.unit.name
            + " "
            + str(self.start_time)
        )

class Cleaner(AbstractBaseUser):
    email = models.CharField(max_length=30, primary_key=True, default="")
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    unit_cleaning_model = models.OneToOneField(
    UnitCleaningModel,  on_delete=models.CASCADE, null=True, related_name="assigned_cleaner")

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email


class ToDo(models.Model):
    """Class for to-dos that the cleaning personnel has to do. """
    to_do = models.CharField(max_length=50, default="")
    unit_cleaning_model = models.ForeignKey(
        UnitCleaningModel, on_delete=models.CASCADE, related_name="to_dos"
    )

    def __str__(self):
        return self.to_do


class Reservation(models.Model):
    """Class for an individual reservation assigned to a guest."""

    CONFIRMED = "C"
    INHOUSE = "IH"
    CHECKED_OUT = "CO"
    CANCELLED = "CA"
    NO_SHOW = "NS"

    STATUS_CHOICES = [
        (CONFIRMED, "Confirmed"),
        (INHOUSE, "In the unit"),
        (CHECKED_OUT, "Checked out"),
        (CANCELLED, "Canceled"),
        (NO_SHOW, "Didn't show up"),
    ]

    # hash code that is assigned as the primary key (pk)
    code = models.CharField(max_length=12, unique=True,
                             null=False, primary_key=True, default="")
    """     code = models.CharField(max_length=12, unique=True,
                                null=False, primary_key=True) """
    status = models.CharField( max_length=5, choices=STATUS_CHOICES, default=CONFIRMED)
    check_in = models.DateTimeField()
    check_out = models.DateTimeField()
    cancellation_time = models.DateTimeField(blank=True, null=True)
    no_show_time = models.DateTimeField(blank=True, null=True)

    unit = models.ForeignKey(
        Unit, on_delete="set_null", related_name="unit_reservations"
    )  # Set logic to notify if property deleted

    main_guest = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="guest_reservations"
    )
    adults = models.IntegerField()
    children = models.IntegerField()
    guest_comments = models.CharField(max_length=400, blank=True)

    price = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    currency = models.CharField(max_length=5, default='€')

    def __str__(self):
        return (
            self.check_in.strftime("%d.%m.%y")
            + " "
            + self.unit.unit_group.property.name
        )

    def save(self, *args, **kwargs):
        self.code = create_hash(
        self.main_guest.username + str(self.check_in), "r")
        super(Reservation, self).save(*args, **kwargs)


class ReservationExtension(models.Model):
    """Class for an individual extended reservation assigned to a guest."""
    extended_check_in = models.DateTimeField(blank=True, null=True)
    extended_check_out = models.DateTimeField(blank=True, null=True)

    # max. available check-out and check-in current booking situation (default are 11:00 and 15:00)
    avail_check_in = models.DateTimeField(blank=True, null=True)
    avail_check_out = models.DateTimeField(blank=True, null=True)

    price_extension = models.DecimalField(
        max_digits=5, decimal_places=2, default=0)
    currency = models.CharField(max_length=5, default='€')

    # ReservationExtension is a part of Reservation, but only one extension object is possible per Reservation object
    # related name is important for nested serializer, to_field is telling ReservationExtension that the new primary key is code
    # to_field="code", db_column="code"
    reservation = models.OneToOneField(
        Reservation,  on_delete=models.CASCADE, null=True, to_field="code", db_column="code", related_name="extension")

    def __str__(self):
        return (
            self.extended_check_in.strftime("%d.%m.%y")
            + " "
            + self.extended_check_out.strftime("%d.%m.%y")
        )
