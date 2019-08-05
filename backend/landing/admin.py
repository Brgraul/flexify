from django.contrib import admin
from django.urls import reverse
from django.utils.safestring import mark_safe

from landing.models import Unit, UnitGroup, Property, Address, Reservation, ReservationExtension, ToDo, Cleaner, UnitCleaningModel
from django.contrib.auth.models import User


class UnitAdmin(admin.ModelAdmin):
    "Addition of the Unit model to the admin UI."
    list_display = ("name", "property", "unit_group", "created")


class UnitInline(admin.TabularInline):
    model = Unit
    exclude = ("code",)


class UnitGroupAdmin(admin.ModelAdmin):
    "Addition of the UnitGroup model to the admin UI."
    list_display = ("name", "property", "member_count", "group_display")
    inlines = [UnitInline]

    def group_display(self, obj):
        ls = []
        for unit in obj.units.all():
            url_match = reverse("admin:landing_unit_change", args=(unit.id,))
            ls.append('<a href="{}">{}</a>'.format(url_match, unit.name))
        return mark_safe(", ".join(ls))

    group_display.short_description = "Rooms"


class UnitGroupInline(admin.TabularInline):
    model = UnitGroup


class PropertyAdmin(admin.ModelAdmin):
    "Addition of the PropertyAdmin model to the admin UI."
    list_display = ("name", "address", "created",
                    "property_display", "occupancy")
    inlines = [UnitGroupInline]
    exclude = ("code",)

    def property_display(self, obj):
        ls = []
        for unit in obj.floors.all():
            url_match = reverse(
                "admin:landing_unitgroup_change", args=(unit.id,))
            ls.append('<a href="{}">{}</a>'.format(url_match, unit.name))
        return mark_safe(", ".join(ls))

    property_display.short_description = "Floors"


class AddressAdmin(admin.ModelAdmin):
    "Addition of the PropertyAdmin model to the admin UI."
    list_display = ("street", "number", "zip_code", "city", "country")
    exclude = ("code",)


class UserAdmin(admin.ModelAdmin):
    "Addition of the User model to the admin UI."
    list_display = ("username", "first_name",
                    "last_name", "reservation_display",)

    def reservation_display(self, obj):
        ls = []
        for unit in obj.guest_reservations.all():
            print(unit)
            url_match = reverse(
                "admin:landing_reservation_change", args=(unit.code,))
            ls.append('<a href="{}">{}</a>'.format(url_match, str(unit)))
        return mark_safe(", ".join(ls))


class ReservationExtensionInLine(admin.StackedInline):
    model = ReservationExtension


class ReservationAdmin(admin.ModelAdmin):
    "Addition of the PropertyAdmin model to the admin UI."
    list_display = ("status", "check_in", "check_out", "cancellation_time",
                    "no_show_time", "unit", "main_guest", "adults", "children", "guest_comments")
    inlines = [ReservationExtensionInLine]


class CleanerAdmin(admin.ModelAdmin):
    "Addition of the User model to the admin UI."
    list_display = ("email", "first_name",
                    "last_name")


class ToDoExtensionInLine(admin.StackedInline):
    model = ToDo


class CleanerExtensionInLine(admin.StackedInline):
    "Addition of the Cleaner model to the admin UI."
    model = Cleaner


class UnitCleaningModelAdmin(admin.ModelAdmin):
    "Addition of the UnitCleaningModel to the admin UI."
    list_display = ("cleaning_type", "start_time", "end_time",
                    "maintenance", "personal_belongings", "unit")
    inlines = [ToDoExtensionInLine, CleanerExtensionInLine]
    exclude = ("code",)


admin.site.register(Unit, UnitAdmin)
admin.site.unregister(User)  # Need to unregister the default one firsts
admin.site.register(User, UserAdmin)
admin.site.register(UnitGroup, UnitGroupAdmin)
admin.site.register(Property, PropertyAdmin)
admin.site.register(Address, AddressAdmin)
admin.site.register(Reservation, ReservationAdmin)
admin.site.register(UnitCleaningModel, UnitCleaningModelAdmin)
admin.site.register(Cleaner, CleanerAdmin)
