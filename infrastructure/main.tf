variable "bucket_name" {
  default="react-crud-formset-example"
}

provider "aws" {
  region = "eu-central-1"
}

variable "mime_types" {
  default = {
    htm = "text/html"
    html = "text/html"
    css = "text/css"
    js = "application/javascript"
    map = "application/javascript"
    json = "application/json"
  }
}

resource "aws_s3_bucket_policy" "public_access" {
  bucket = aws_s3_bucket.frontend.id

  policy = <<POLICY
{
   "Version":"2012-10-17",
   "Statement":[{
     "Sid":"PublicReadForGetBucketObjects",
       "Effect":"Allow",
       "Principal": "*",
       "Action":[
         "s3:GetObject",
         "s3:PutObject"
       ],
       "Resource":["arn:aws:s3:::${aws_s3_bucket.frontend.id}/*"
       ]
     }
   ]
 }
POLICY
}

resource "aws_s3_bucket" "frontend" {
  bucket = var.bucket_name
  acl    = "public-read"

  tags = {
    Name        = var.bucket_name
    Environment = "Dev"
  }

  website {
    index_document = "index.html"
  }
}

resource "aws_s3_bucket" "storybook" {
  bucket = "${var.bucket_name}-storybook"
  acl    = "public-read"

  tags = {
    Name        = var.bucket_name
    Environment = "Dev"
  }

  website {
    index_document = "index.html"
  }
}


output "storybook-url" {
  value = "http://${aws_s3_bucket.storybook.website_endpoint}"
}

output "url" {
  value = "http://${aws_s3_bucket.frontend.website_endpoint}"
}
