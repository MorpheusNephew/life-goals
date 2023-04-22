resource "aws_dynamodb_table" "life_goals_db" {
  name         = "life-goals-db"
  hash_key     = "userId"
  range_key    = "createdDate"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "userId"
    type = "S"
  }

  attribute {
    name = "createdDate"
    type = "S"
  }

  attribute {
    name = "public"
    type = "BOOL"
  }

  global_secondary_index {
    name = "PublicCreatedDateIndex"
    hash_key = "pubic"
    range_key = "createdDate"
    projection_type = "ALL"
  }
}
