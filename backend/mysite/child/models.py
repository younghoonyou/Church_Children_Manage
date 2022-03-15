from django.db import models
from account.models import Account

class Child(models.Model):
    id = models.AutoField(primary_key=True, null=False, blank=False) 
    child_name=models.CharField(max_length=5,verbose_name="이름")
    room=models.CharField(max_length=5,verbose_name="반")
    grade=models.CharField(max_length=5,verbose_name="나이")
    writer = models.ForeignKey(Account, on_delete=models.CASCADE,default='',verbose_name="작성자")
    created_at=models.DateTimeField(auto_now_add=True,verbose_name="작성일")
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.child_name
    
    class Meta:
        db_table='children'
        verbose_name        = '아이들'
        verbose_name_plural = '아이들'
