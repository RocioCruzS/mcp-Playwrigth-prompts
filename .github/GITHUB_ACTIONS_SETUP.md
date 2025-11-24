# GitHub Actions Setup Guide

## 📋 Required Secrets Configuration

To run the GitHub Actions workflow, you need to configure the following secrets in your repository.

### 🔐 How to Add Secrets

1. Go to your GitHub repository
2. Click on **Settings** tab
3. Navigate to **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add each secret listed below

---

## 🔑 Required Secrets

### 1. `TEST_USER_NAME`
- **Description:** Username for test authentication
- **Example value:** `test.user@example.com` or `testuser123`
- **Used in:** Playwright tests for login functionality

### 2. `TEST_PASSWORD`
- **Description:** Password for test authentication
- **Example value:** `SecureP@ssw0rd123`
- **Used in:** Playwright tests for login functionality

### 3. `SLACK_WEBHOOK_URL`
- **Description:** Slack Incoming Webhook URL for test notifications
- **How to get:**
  1. Go to https://api.slack.com/apps
  2. Create a new app or select existing
  3. Navigate to **Incoming Webhooks**
  4. Activate Incoming Webhooks
  5. Click **Add New Webhook to Workspace**
  6. Select the channel for notifications
  7. Copy the Webhook URL
- **Example value:** `https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX`
- **Used in:** Sending test results to Slack channel

---

## 🚀 Enable GitHub Pages

For Allure reports to be accessible via URL:

1. Go to **Settings** → **Pages**
2. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/` (root)
3. Click **Save**

The reports will be available at:
```
https://<your-org>.github.io/<repo-name>/allure-report/<run-number>
```

Example:
```
https://memberhubteam.github.io/qa-automation/allure-report/123
```

---

## ✅ Verification Checklist

- [ ] `TEST_USER_NAME` secret configured
- [ ] `TEST_PASSWORD` secret configured
- [ ] `SLACK_WEBHOOK_URL` secret configured
- [ ] GitHub Pages enabled with `gh-pages` branch
- [ ] Slack app has permission to post in selected channel
- [ ] Workflow file exists at `.github/workflows/playwright-tests.yml`

---

## 🧪 Manual Workflow Trigger

After configuration, you can manually trigger tests:

1. Go to **Actions** tab
2. Select **Playwright Tests** workflow
3. Click **Run workflow**
4. Select:
   - **Environment:** `qa`, `stg`, or `prod`
   - **Test Suite:** `all`, `checkout`, `membership`, or `auth`
5. Click **Run workflow**

---

## 📊 Expected Slack Notification

After test execution, you'll receive a Slack message with:

```
EXECUTED: ALL TESTS SUITE

Result: ✅ PASSED. See the report below.
Target Environment: qa

> GitHub Branch: feature/improvements

[Go to Report] [View Workflow]
```

---

## 🐛 Troubleshooting

### Workflow fails with "Context access might be invalid"
- **Cause:** Secrets not configured in repository
- **Solution:** Add all required secrets as described above

### Slack notification not received
- **Cause:** Invalid webhook URL or insufficient permissions
- **Solution:**
  1. Verify webhook URL is correct
  2. Check that Slack app can post to the channel
  3. Test webhook manually with curl:
     ```bash
     curl -X POST -H 'Content-type: application/json' \
     --data '{"text":"Test message"}' \
     YOUR_WEBHOOK_URL
     ```

### Allure report URL returns 404
- **Cause:** GitHub Pages not enabled or `gh-pages` branch doesn't exist
- **Solution:**
  1. Run the workflow at least once to create `gh-pages` branch
  2. Enable GitHub Pages as described above
  3. Wait 1-2 minutes for deployment

### Tests fail with authentication errors
- **Cause:** Incorrect credentials in secrets
- **Solution:** Verify `TEST_USER_NAME` and `TEST_PASSWORD` are valid for target environment

---

## 📝 Notes

- Secrets are encrypted and only available to GitHub Actions runners
- Never commit secrets to the repository
- You can update secrets at any time without affecting old workflow runs
- For local development, use `.env` file (already in `.gitignore`)
