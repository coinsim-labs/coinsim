from django.http import HttpResponse
from drf_openapi.views import SchemaView
from drf_openapi.entities import OpenApiSchemaGenerator
from rest_framework import response, permissions
from django.contrib.auth.decorators import login_required
from rest_framework import authentication
from django.shortcuts import render, redirect


class DocView(SchemaView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (authentication.SessionAuthentication,)

    description = \
    """<span class="border-top"></span>
    <img src="/assets/img/logodark.png" height="40" />
    <h1 _ngcontent-c6="">Coinsim REST API Docs</h1>
    Welcome, fellow Web Voyager. You have found the Documentation for the Coinsim public REST API.<br>
    With it you may manage your user profile, retrieve balances and transactions and trade your coins.<br><br>
    Endpoints, that are marked with <jwt style="display: inline-block;margin-bottom: 0;"></jwt> require you 
    to pass a JSON Web Token to authenticate. 
    The JWT is generated for you on signup and each login. It can also be refreshed to extend a user session.<br>
    The JWT has to be present in an HTTP-Header like so:
    <table style="margin-top: 20px;" _ngcontent-c10="" class="security-details">
        <tbody _ngcontent-c10="">
            <tr _ngcontent-c10="">
                <th _ngcontent-c10=""> Authorization </th>
                <td _ngcontent-c10=""> JWT {Your Token}</td>
            </tr>
        </tbody>
    </table>
    <span class="border-bottom"></span>
"""



    def get(self, request, version):
        """
        Wird intern zum Anzeigen dieser Dokumentation benötigt.

        """
        generator = OpenApiSchemaGenerator(
            version=version,
            url=self.url,
            title=self.title,
            description=self.description
        )
        return response.Response(generator.get_schema(request, public=False))