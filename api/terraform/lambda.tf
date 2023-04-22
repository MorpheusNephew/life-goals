data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "iam_for_lambda" {
  name               = "iam_for_lambda"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

locals {
  api_lambda_file_path = "${path.module}/resources/api_lambda.js.zip"
}

resource "aws_lambda_function" "api_lambda_function" {
  function_name = "life_goals_api"
  filename      = local.api_lambda_file_path
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "index.js"

  runtime = "nodejs18.x"
}
