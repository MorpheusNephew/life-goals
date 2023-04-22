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

data "archive_file" "api_lambda_file" {
  type        = "zip"
  output_path = "${path.module}/resources/api_lambda.js.zip"
  source_file = "${path.module}/resources/api_lambda.js"
}

resource "aws_lambda_function" "api_lambda_function" {
  function_name = "life_goals_api"
  filename      = "${path.module}/resources/api_lambda.js.zip"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "index.js"

  source_code_hash = data.archive_file.api_lambda_file.output_base64sha256

  runtime = "nodejs18.x"
}
