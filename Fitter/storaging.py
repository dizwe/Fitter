from storages.backends.s3boto3 import S3Boto3Storage


class StaticS3Boto3Storage(S3Boto3Storage):
    location = 'static' # bucket 업로드 prefix 지정


class MediaS3Boto3Storage(S3Boto3Storage):
    location = 'media' # bucket 업로드 prefix 지정