from django.db import models
from account.models import Account

class Board(models.Model):
    # id = models.AutoField(primary_key=True, null=False, blank=False)
    title       = models.CharField(max_length=30, verbose_name="제목")
    contents    = models.TextField(verbose_name="내용")
    writer      = models.ForeignKey(Account, on_delete=models.CASCADE,default='',verbose_name="작성자")
    created_at  = models.DateTimeField(auto_now_add=True, verbose_name="작성일")
    updated_at  = models.DateTimeField(auto_now=True, verbose_name="최종수정일")

    def __str__(self):
        return self.writer

    
    class Meta:
        db_table            = 'boards'
        verbose_name        = '게시판'
        verbose_name_plural = '게시판'
