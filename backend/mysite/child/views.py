from django.views import View
from django.http import JsonResponse, HttpResponse
import json
from .models import Child,Account
from auths import auth_confirm

class Addchild(View):
    @auth_confirm
    def post(self,request,token):
        print(token)
        writer_user=Account.objects.get(name=token['name'])
        data=json.loads(request.body)
        if Child.objects.filter(child_name=data['child_name']).exists():
            return JsonResponse({'message':'이미 등록된 학생 입니다.'},status=400)
        else:
            Child.objects.create(
            child_name=data['child_name'],
            room=data['room'],
            grade=data['grade'],
            writer=writer_user #writer_user#writer=token.id 
            )#f'{writer_user}
        return JsonResponse({'message':f'{writer_user.name}님이 학생 {data["child_name"]}을 추가하였습니다.'}, status=200)
    def get(self,request):
        # Sort_Child=Child.objects.all().order_by('grade')
        Child_data=Child.objects.values('child_name','room','grade','id').order_by('-room','-grade')#'child_name','room','grade',
        return JsonResponse({'childs':list(Child_data)},status=203)
class Deletechild(View):
    @auth_confirm
    def delete(self,request,token):
        writer_user=Account.objects.get(name=token['name'])
        data=json.loads(request.body)
        Child.objects.filter(id=data['id']).delete()
        return JsonResponse({'message':f'{writer_user.name}님이 학생을 삭제하였습니다.'},status=200)