# Cypress AI Ticket Estimator Tests

This project contains Cypress end-to-end tests for the AI Ticket Estimator React application.

## 🏗️ Project Structure

```
cypress-ai-ticket-estimator/
├── cypress/
│   ├── e2e/
│   │   └── ticketEstimator.cy.ts    # Main test file
│   ├── fixtures/                     # Test data files
│   └── support/
│       ├── commands.ts               # Custom Cypress commands
│       └── e2e.ts                   # Support file
├── cypress.config.ts                 # Cypress configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Project dependencies
└── README.md                         # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- The AI Ticket Estimator React app running on `http://localhost:3000`

### Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Tests

#### Open Cypress Test Runner (Interactive Mode)
```bash
npm run cypress:open
# or
npx cypress open
```

#### Run Tests in Headless Mode
```bash
npm run cypress:run
# or
npx cypress run
```

#### Run Specific Test File
```bash
npx cypress run --spec "cypress/e2e/ticketEstimator.cy.ts"
```

## 🧪 Test Scenarios

The test suite covers the following scenarios:

### 1. Basic Form Submission
- Fills all form fields (Issue Key, Title, Description, Issue Type)
- Submits the form
- Verifies the result section appears
- Checks that estimated story points are displayed
- Validates justification text is present

### 2. Form Validation
- Tests form behavior when required fields are empty
- Validates error handling

### 3. Different Issue Types
- Tests estimation with different issue types (Bug, Feature, etc.)
- Verifies different story point estimates for different scenarios

## 📋 Test Data

The tests use the following sample data:
- **Issue Key**: `4567`
- **Title**: `title`
- **Description**: `description`
- **Issue Type**: `Bug` (dropdown selection)

## 🔧 Configuration

### Cypress Configuration (`cypress.config.ts`)
- Base URL: `http://localhost:3000`
- Viewport: 1280x720
- Timeouts: 10 seconds for commands, requests, and responses
- Screenshots: Enabled on test failure
- Videos: Disabled for faster execution

### API Interception
The tests include API interception to mock the estimation endpoint:
```typescript
cy.intercept("POST", "**/api/estimate", {
  statusCode: 200,
  body: {
    storyPoints: 4,
    justification: "Based on the complexity of the issue..."
  }
}).as("getEstimate")
```

## 🎯 Selectors

The tests use `data-testid` attributes for reliable element selection:
- `[data-testid=issue-key]` - Issue Key input field
- `[data-testid=title]` - Title input field
- `[data-testid=description]` - Description textarea
- `[data-testid=issue-type]` - Issue Type dropdown
- `[data-testid=submit-button]` - Submit button
- `[data-testid=result-section]` - Result section container
- `[data-testid=story-points]` - Story points display
- `[data-testid=justification]` - Justification text

## 🐛 Troubleshooting

### Common Issues

1. **Tests fail to find elements**: Ensure the React app is running on `http://localhost:3000`
2. **Permission errors**: Use `sudo npm install` if you encounter permission issues
3. **Cypress not opening**: Try running `npx cypress open` directly

### Debug Mode
Run tests with debug information:
```bash
DEBUG=cypress:* npx cypress run
```

## 📝 Adding New Tests

To add new test scenarios:

1. Create a new test file in `cypress/e2e/`
2. Follow the existing naming convention: `*.cy.ts`
3. Use the established selectors and patterns
4. Add appropriate API intercepts for new scenarios

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Add appropriate comments for complex test logic
3. Ensure all tests pass before submitting changes

## 📄 License

This project is licensed under the ISC License.

