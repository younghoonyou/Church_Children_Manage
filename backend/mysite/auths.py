from django.http import JsonResponse
import jwt
from mysite.settings import SECRET_KEY,ALGORITHM

def jwt_enc(payload:dict):
    return jwt.encode(payload, key=SECRET_KEY, algorithm=ALGORITHM)

def jwt_dec(token:str):
    return jwt.decode(token, key=SECRET_KEY, algorithms=ALGORITHM)

def auth_confirm(func):
    def wrapper(self, request, *args, **kwargs):
        try:
            access_token = request.headers.get('Authorization', None)
            if access_token is None:
                return JsonResponse({'message': 'UNAUTHORIZED'}, status=401)

            token_payload = jwt_dec(access_token)
            
            return func(self, request, token_payload, *args, **kwargs)

        except jwt.ExpiredSignatureError: # TOKEN EXP TIME OUT
            return JsonResponse({'message': 'INVALID_TOKEN'}, status=401)
        except jwt.exceptions.InvalidSignatureError:
            return JsonResponse({'message': 'INVALID_TOKEN'}, status=401)
        except jwt.exceptions.DecodeError:
            return JsonResponse({'message': 'INVALID_TOKEN'}, status=401)

    return wrapper