from .common import *
import os
import pymysql

DEBUG = False

ALLOWED_HOSTS += ['fitter.ap-northeast-2.elasticbeanstalk.com',
                  '34.70.46.65',
                  'fittingcal.com',
                  'www.fittingcal.com',]

"""DB"""
pymysql.install_as_MySQLdb() # pymysql이 MySQLdb처럼 동작토록 세팅

DATABASES = {
    'default': {
        'ENGINE': os.environ.get('DB_ENGINE', 'django.db.backends.mysql'),
        'HOST': os.environ['DB_HOST'],
        'USER': os.environ['DB_USER'],
        'PASSWORD': os.environ['DB_PASSWORD'],
        'NAME': os.environ['DB_NAME'],
        'PORT': os.environ['DB_PORT'],
    },
}

"""S3"""
INSTALLED_APPS += ['storages']

# django-storages 앱 의존성 추가
# 기본 static/media 저장소를 django-storages로 변경
STATICFILES_STORAGE = 'Fitter.storaging.StaticS3Boto3Storage'
DEFAULT_FILE_STORAGE = 'Fitter.storaging.MediaS3Boto3Storage'

# S3 파일 관리에 필요한 최소 설정
# 소스코드에 설정정보를 남기지마세요. 환경변수를 통한 설정 추천
AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID'] # 필수 지정
AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY'] # 필수 지정
AWS_STORAGE_BUCKET_NAME = os.environ['AWS_STORAGE_BUCKET_NAME'] # 필수 지정
AWS_S3_REGION_NAME = os.environ.get('AWS_S3_REGION_NAME', 'ap-northeast-2')