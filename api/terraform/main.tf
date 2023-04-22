terraform {
  cloud {
    organization = "morpheusnephew"

    workspaces {
      name = "life-goals-api"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.64.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}
