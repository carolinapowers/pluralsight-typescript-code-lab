#!/usr/bin/env bash

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if test file is provided
if [[ -z "$1" ]]; then
  echo -e "${RED}🤔 Hmm, something's not quite right with the validation setup.${NC}"
  echo ""
  echo "It looks like no step was specified to validate."
  echo "Try clicking the validate button again, or refresh the page."
  exit 1
fi

# Check if test file exists
if [[ ! -f "$1" ]]; then
  echo -e "${RED}🔍 I can't find the validation step you're working on.${NC}"
  echo ""
  echo "This might be a setup issue with the lab environment."
  echo "Try refreshing the page or contact support if this continues."
  exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo -e "${RED}📦 Oops! Your development environment needs Node.js to check your code.${NC}"
  echo ""
  echo "No worries! You can download it here: https://nodejs.org"
  echo "Once installed, come back and try validating again!"
  exit 1
fi

# Check if dependencies are installed
if [[ ! -d "node_modules" ]]; then
  echo -e "${YELLOW}⚙️  Setting up your project for the first time...${NC}"
  echo "This might take a moment - perfect time for a coffee break! ☕"
  npm install
  if [[ $? -ne 0 ]]; then
    echo -e "${RED}😅 Something went wrong setting up the project.${NC}"
    echo "This might be a network issue. Try clicking validate again in a moment."
    exit 1
  fi
  echo "✅ All set! Let's check your code..."
fi

# Check if reporter exists
if [[ ! -f "reporter.ts" ]]; then
  echo -e "${RED}🔧 Hmm, something's missing from your project setup.${NC}"
  echo ""
  echo "This looks like a lab environment issue."
  echo "Try refreshing the page or contact support if this continues."
  exit 1
fi

# Run tests with custom reporter
if [[ -n "$2" ]]; then
  CI=true npx vitest run --reporter=./reporter.ts --no-coverage "$1" --testNamePattern="$2"
else
  CI=true npx vitest run --reporter=./reporter.ts --no-coverage "$1"
fi

# Check exit code
exit_code=$?
if [[ $exit_code -ne 0 && $exit_code -ne 1 ]]; then
  # Exit code 1 is normal for failing tests, other codes indicate errors
  echo -e "${RED}🚨 Oops! Something unexpected happened while checking your code.${NC}"
  echo ""
  echo "This might be a syntax error in your code or a lab environment issue."
  echo "Check the messages above for clues, or try again!"
  exit $exit_code
fi

exit $exit_code

# Usage examples:
# ./task-runner.sh src/__tests__/step-2/import-chaos.test.ts       - run all tests in file
# ./task-runner.sh src/__tests__/step-2/import-chaos.test.ts @2.1  - run tests with @2.1 tag