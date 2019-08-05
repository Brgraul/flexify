from django.contrib.auth.models import User
from rest_framework import serializers
from landing.models import Reservation, ReservationExtension, Address


# serialize to json
# serializer for ReservationExtension

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("username", "first_name", "last_name", "email")

        model = User

class addressSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("street", "number", "zip_code", "city", "country")
        model = Address

class reservationExtensionSerializer(serializers.ModelSerializer):

    class Meta:
        model = ReservationExtension
        fields = ('extended_check_in', 'extended_check_out',
                  'price_extension', 'currency')


# serializer for Reservation
class reservationSerializer(serializers.ModelSerializer):
    # choose related_name for nested serializers
    extension = reservationExtensionSerializer()
    main_guest = UserSerializer()
    

    class Meta:
        fields = ('code', 'check_in', 'check_out', 'unit', 'main_guest',
                  'price', 'currency', 'extension')
        model = Reservation

    # overwrite create function to be able post a new instance
    def create(self, validated_data):
        extension_data = validated_data.pop('extension')
        reservation = Reservation.objects.create(**validated_data)
        ReservationExtension.objects.create(
            reservation=reservation, **extension_data)

        return reservation

    # overwrite update function -> provides only the ability to change extended_check_in and extended_check_out
    def update(self, instance, validated_data):
        extension_data = validated_data.pop('extension', None)
        check_in_data = validated_data.pop('check_in', None)
        check_out_data = validated_data.pop('check_out', None)
        # Unless the application properly enforces that this field is
        # always set, the follow could raise a `DoesNotExist`, which
        # would need to be handled.

        instance.check_in = check_in_data
        instance.check_out = check_out_data

        extension = instance.extension
        extension.extended_check_in = extension_data.get(
            'extended_check_in', extension.extended_check_in)

        extension.extended_check_out = extension_data.get(
            'extended_check_out', extension.extended_check_out)

        # so far price is not needed -> let's check at a later stage if we need it
        # extension.price_extension = extension_data.get(
        #     'price_extension', extension.price_extension)

        # extension.save()
        instance.save()

        return instance
