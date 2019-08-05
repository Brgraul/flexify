from django.shortcuts import render

from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.http import Http404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from landing.models import Reservation, ReservationExtension
from api.serializers import reservationSerializer, reservationExtensionSerializer, addressSerializer
from rest_framework import generics
from datetime import datetime, timedelta
from utils.factories import nearest_check_in, nearest_check_out
from rest_framework_swagger.views import get_swagger_view
from django.conf.urls import url


class ReservationExtensionViewSet(viewsets.ModelViewSet):
    queryset = ReservationExtension.objects.all()
    serializer_class = reservationExtensionSerializer


class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = reservationSerializer

    @action(detail=True)
    # pass the primary key (pk) from the url, if not overwritten (default) -> None
    def get_availability(self, request, pk=None):
        # get all reservations on this room
        reservation = Reservation.objects.get(code=pk)
        unit = reservation.unit
        all_reservations = unit.unit_reservations.all()
        prop = reservation.unit.property.name
        address = addressSerializer(reservation.unit.property.address)

        # reduce it to only the previous and the next reservation on this room
        prev_res = nearest_check_out(all_reservations, reservation)
        next_res = nearest_check_in(all_reservations, reservation)

        if prev_res == 0:
            check_out = "No check-out on this day!"
            prev_code = "No previous reservation!"
        else:
            # serialize the data -> convert to json
            serializer_prev = reservationSerializer(prev_res)
            prev_code = serializer_prev['code'].value

            # check if an extension exists --> check if extension equals an empty dictionary
            if serializer_prev['extension'].value == dict():
                check_out = serializer_prev['check_out'].value
            else:
                check_out = serializer_prev['extension']['extended_check_out'].value

        if next_res == 0:
            check_in = "No check-in on this day!"
            next_code = "No next reservation!"
        else:
            serializer_next = reservationSerializer(next_res)
            next_code = serializer_next['code'].value

            if serializer_next['extension'].value == dict():
                check_in = serializer_next['check_in'].value
            else:
                check_in = serializer_next['extension']['extended_check_in'].value

        serializer_main = reservationSerializer(reservation)

        # create one json-structure of the main reservation, check_out of the previous reservation + code, and check_in of the next reservation + code
        output_dict = dict(
            {"next_code": next_code, "next_res_in": check_in, "prev_code": prev_code, "prev_res_out": check_out,
             "property": prop, "address": address.data})
        output_dict.update(serializer_main.data)

        return Response(output_dict)


schema_view = get_swagger_view(title='Reservation API')

urlpatterns = [
    url(r'ReservationAPI', schema_view)
]

""" @action(detail=True)
    def get_prev_res(self, request, pk=None):
        # get data from the previous booking of the same room
        reservation = Reservation.objects.get(code=pk)
        unit = reservation.unit
        all_reservations = unit.unit_reservations.all()

        prev_res = nearest_check_out(all_reservations, reservation)
        serializer = self.get_serializer(prev_res, many=True)

        return Response(serializer.data) """
