from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from base.api.serializers import NoteSerializer
from rest_framework.permissions import IsAuthenticated

from base.models import Note
from django.conf import settings




class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(requet):
    routes = [
        '/api/token/',
        'api/token/refresh/'
    ]
    return Response(routes)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    
    user = request.user
    notes = user.note_set.all()
    print(request)
    serializer =NoteSerializer(notes, many=True)


    return Response(serializer.data)


