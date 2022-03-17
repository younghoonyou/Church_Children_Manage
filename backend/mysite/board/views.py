from django.views import View
from django.http import JsonResponse
import json
from .models import Board,Account
from auths import auth_confirm

class Write(View):
    @auth_confirm
    def post(self,request,token):
        # print(token)
        writer_user=Account.objects.get(name=token['name'])
        # print(type(writer_user.name))
        # writer_user.writer = writer_user.writer_name
        name = writer_user.name
        data=json.loads(request.body)
        Board.objects.create(
            title=data['title'],
            contents=data['contents'],
            writer=writer_user,
            writer_name=name,
            )
        return JsonResponse({'message':f'{writer_user.name}님 글을 작성했습니다.'}, status=200)

    def get(self,reqeust):
        Board_data=Board.objects.values('created_at','writer_name','title')
        # data = Board.objects.extra(select={'date':"to_char(os.path.join(BASE_DIR, 'db.sqlite3')_Board.created_at, 'YYYY-MM-DD hh:mi AM')"}).values_list('date', flat='true')
        # Board_data=Board.objects.values.select_related('writer')
        return JsonResponse({'listup':list(Board_data)},status=200)
        # ,'date':list(data)},status=200)

class Update(View):
    @auth_confirm
    def post(self,request):
        writer=request.writer_name
        return JsonResponse({'message':f'{writer}님 글을 업데이트했습니다.'}, status=200)

class Delete(View):
    def post(self,request):
        writer=request.writer_name
        return JsonResponse({'message':f'{writer}님 글을 삭제했습니다..'}, status=200)