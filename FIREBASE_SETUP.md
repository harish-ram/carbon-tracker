# Firebase Setup Guide

Follow these steps to set up Firebase Authentication and Firestore for your Carbon Tracker application.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: `carbon-tracker` (or your preferred name)
4. Disable Google Analytics (optional) or configure it
5. Click "Create project"

## Step 2: Register Your Web App

1. In your Firebase project dashboard, click the **Web icon** (`</>`)
2. Register app name: `Carbon Tracker Web`
3. Check "Also set up Firebase Hosting" (optional)
4. Click "Register app"
5. Copy the Firebase configuration object (you'll need this for `.env`)

## Step 3: Enable Authentication

1. In Firebase Console, go to **Build** → **Authentication**
2. Click "Get started"
3. Go to **Sign-in method** tab
4. Enable **Email/Password** authentication:
   - Click on "Email/Password"
   - Toggle **Enable**
   - Click "Save"

## Step 4: Create Firestore Database

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click "Create database"
3. Choose **Start in production mode** (we'll add security rules later)
4. Select a Cloud Firestore location (choose closest to your users)
5. Click "Enable"

## Step 5: Set Up Security Rules

1. In Firestore Database, go to **Rules** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Emission records subcollection
      match /records/{recordId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      
      // Company profile subcollection
      match /company/{companyId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

3. Click "Publish"

## Step 6: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Firebase configuration from Step 2:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
   VITE_FIREBASE_APP_ID=1:123456789012:web:abc123def456
   ```

## Step 7: Install Firebase SDK

Run the following command to install Firebase:

```bash
npm install firebase
```

## Step 8: Test Your Setup

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:5173/login`
3. Try creating a new account
4. Verify you can log in

## Step 9: Deploy to GitHub Pages

1. Build the app with Firebase configuration:
   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

3. **Important**: Add your GitHub Pages domain to Firebase authorized domains:
   - Go to Firebase Console → Authentication → Settings
   - Scroll to "Authorized domains"
   - Add: `yourusername.github.io`

## Troubleshooting

### "Missing or insufficient permissions" error
- Check that Firestore security rules are properly configured
- Ensure user is authenticated before accessing Firestore

### "Firebase: Error (auth/unauthorized-domain)"
- Add your domain to Firebase authorized domains (Step 9.3)

### Environment variables not loading
- Ensure `.env` file is in the root directory
- Restart the dev server after changing `.env`
- Variables must start with `VITE_` to be accessible in Vite

## Next Steps

Your Firebase authentication and database are now set up! Users can:
- ✅ Sign up with email/password
- ✅ Log in to access their dashboard
- ✅ Have their data stored securely in Firestore
- ✅ Access only their own emission records

## Additional Features (Optional)

### Add Google Sign-In
1. In Firebase Console → Authentication → Sign-in method
2. Enable "Google" provider
3. Configure OAuth consent screen
4. Update `authService.ts` to include Google sign-in

### Add Password Reset
1. Implement password reset email in `authService.ts`
2. Create a password reset page
3. Configure email templates in Firebase Console

### Enable Offline Support
Firestore has built-in offline support - data will sync when users reconnect.

---

**Need help?** Check the [Firebase Documentation](https://firebase.google.com/docs)
