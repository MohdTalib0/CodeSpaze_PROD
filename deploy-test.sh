#!/bin/bash

echo "🚀 Testing CodeSpaze deployment build process..."
echo "🌐 Target Render Services:"
echo "   Backend: https://codespaze-prod.onrender.com"
echo "   Frontend: https://codespaze-prod-2.onrender.com"

# Test root dependencies
echo "📦 Installing root dependencies..."
npm ci --only=production

# Test server build
echo "🔧 Testing server build..."
cd server
npm ci --only=production
npm run build

if [ -f "dist/index.js" ]; then
    echo "✅ Server build successful - dist/index.js exists"
else
    echo "❌ Server build failed - dist/index.js missing"
    exit 1
fi

cd ..

# Test client build
echo "🎨 Testing client build..."
cd client
npm ci --only=production
npm run build

if [ -d "build" ] && [ -f "build/index.html" ]; then
    echo "✅ Client build successful - build/index.html exists"
else
    echo "❌ Client build failed - build/index.html missing"
    exit 1
fi

cd ..

echo "🎉 All builds successful! Ready for deployment."
echo ""
echo "Next steps:"
echo "1. Commit and push these changes"
echo "2. Render will automatically redeploy:"
echo "   - Backend: https://codespaze-prod.onrender.com"
echo "   - Frontend: https://codespaze-prod-2.onrender.com"
echo "3. Check the build logs for any remaining issues"
echo "4. GitHub Actions will keep the services awake every 10-14 minutes"
