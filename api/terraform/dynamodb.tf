resource "aws_dynamodb_table" "life_goals_db" {
  name         = "life-goals-db"
  hash_key     = "userId"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "userId"
    type = "S"
  }

  attribute {
    name = "publicCreatedDate"
    type = "S"
  }

  global_secondary_index {
    name            = "PublicCreatedDateIndex"
    hash_key        = "publicCreatedDate"
    projection_type = "ALL"
  }
}
