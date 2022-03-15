from django.views import View
from django.http import JsonResponse, HttpResponse
import json
from .models import Account
from auths import jwt_enc

class SignUpView(View):
    def post(self,request):
        data=json.loads(request.body)
        if Account.objects.filter(phone_number=data['phone_number']).exists() or Account.objects.filter(name=data['name']).exists():
            return JsonResponse({'message':'이미 등록된 이메일 입니다.'},status=400)
        else:
            new_user=Account.objects.create(
            name=data['name'],
            password=data['password'],
            phone_number=data['phone_number'],
            )
        return JsonResponse({'message':f'{new_user.name}님 회원가입'}, status=201)
    def get(self,request):
        Account_data=Account.objects.values()
        return JsonResponse({'accounts':list(Account_data)},status=200)

class SignInView(View):
    def post(self, request):
        data=json.loads(request.body)
        try:
            if Account.objects.filter(phone_number=data['phone_number']).exists():
                user = Account.objects.get(phone_number=data['phone_number'])
                if user.password==data['password'] and user.phone_number==data['phone_number']:
                    access_token=jwt_enc({'id':user.id,'name':user.name})
                    print(access_token)
                    return JsonResponse({'message':f'{user.name}님 로그인 성공','access_token':access_token}, status=200)
                if user.password!=data['password'] or user.phone_number!=data['phone_number']:
                    print(1)
                    return JsonResponse({'message':'휴대폰 번호 또는 비밀번호를 확인하세요.'}, status=401)
            return JsonResponse({'message':'미등록 이메일 입니다.'},status=403)
        except Exception:
            return JsonResponse({'message':"IVALID_KEYS"}, status=400)

