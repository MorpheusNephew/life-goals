resource "aws_dynamodb_table" "life_goals_db" {
  name         = "life-goals-db"
  hash_key     = "userId"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "userId"
    type = "S"
  }

  attribute {
    name = "publicDate"
    type = "S"
  }

  global_secondary_index {
    name            = "PublicDateIndex"
    hash_key        = "publicDate"
    projection_type = "ALL"
  }
}
