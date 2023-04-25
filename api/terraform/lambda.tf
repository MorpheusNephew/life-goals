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
  output_path = "${path.module}/resources/api_lambda.cjs.zip"
  source_file = "${path.module}/resources/api_lambda.cjs"
}

resource "aws_lambda_function" "api_lambda_function" {
  function_name = "life_goals_api"
  filename      = "${path.module}/resources/api_lambda.cjs.zip"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "api_lambda.handler"

  source_code_hash = data.archive_file.api_lambda_file.output_base64sha256

  runtime = "nodejs18.x"

  environment {
    variables = {
      AUTH0_AUDIENCE                 = var.auth0_audience
      AUTH0_TOKEN_SIGNING_ALG        = var.auth0_token_signing_alg
      AUTH0_MANAGEMENT_DOMAIN        = var.auth0_management_domain
      AUTH0_MANAGEMENT_CLIENT_ID     = var.auth0_management_client_id
      AUTH0_MANAGEMENT_CLIENT_SECRET = var.auth0_management_client_secret
      GOALS_DB_NAME                  = aws_dynamodb_table.life_goals_db.id
      OPENAI_API_KEY                 = var.open_ai_api_key
      OPENAI_ORGANIZATION_ID         = var.open_ai_organization_id
    }
  }
}
