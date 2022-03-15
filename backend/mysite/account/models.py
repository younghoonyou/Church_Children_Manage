from django.db import models

class Account(models.Model):
    name=models.CharField(max_length=50,unique=True,verbose_name='사용자 이름')
    password=models.CharField(max_length=200,verbose_name='사용자 비밀번호')
    phone_number=models.CharField(max_length=11,verbose_name='핸드폰 번호')
    created_at=models.DateTimeField(auto_now_add=True,verbose_name='추가한 날짜')
    updated_at=models.DateTimeField(auto_now=True ,verbose_name='업데이트 날짜')

    def __str__(self):
        return self.name


    class Meta:
        db_table='accounts'
        # fields = ['name']
        verbose_name        = '사용자'
        verbose_name_plural = '사용자'