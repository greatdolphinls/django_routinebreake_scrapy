
from django.contrib import admin
from django.conf.urls import url
from django.urls import path
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings
import flight.views as flight

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', flight.index, name='home'),
    path('signup', TemplateView.as_view(template_name="account/signup.html"), name='signup'),
    path('signin', TemplateView.as_view(template_name="account/login.html"), name='signin'),
    path('forgetPassword', TemplateView.as_view(template_name="account/forgetPassword.html"), name='forgetPassword'),
    path('membership', TemplateView.as_view(template_name="account/membership.html"), name='membership'),
    path('check_email', TemplateView.as_view(template_name="account/checkEmail.html"), name='check_email'),
    path('confirm_email', TemplateView.as_view(template_name="account/confirmEmail.html"), name='confirm_email'),
    path('deals', TemplateView.as_view(template_name="account/deals.html"), name='deals'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
