# ⚡ Quick Deploy Reference Card

## 🎯 Goal: Deploy in 20 minutes

---

## 📋 Backend (Render) - 10 min

### URLs
- Dashboard: https://dashboard.render.com/
- Sign up: https://dashboard.render.com/register

### Steps
1. **New PostgreSQL** → Name: `bookit-db` → Free → Create
2. **Copy Internal Database URL** (save it!)
3. **New Web Service** → Connect GitHub: `MoNiLBaRiYa/BookIt`
4. **Configure**:
   ```
   Name: bookit-backend
   Root: backend
   Build: npm install && npm run build
   Start: npm start
   ```
5. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   DATABASE_URL=<paste from step 2>
   ```
6. **Deploy** → Wait 3-5 min
7. **Shell tab** → Run: `npm run seed`
8. **Test**: `https://your-url.onrender.com/health`

---

## 📋 Frontend (Vercel) - 8 min

### URLs
- Dashboard: https://vercel.com/dashboard
- Sign up: https://vercel.com/signup

### Steps
1. **New Project** → Import: `MoNiLBaRiYa/BookIt`
2. **Configure**:
   ```
   Framework: Vite
   Root: frontend
   Build: npm run build
   Output: dist
   ```
3. **Environment Variable**:
   ```
   VITE_API_URL=https://your-backend.onrender.com/api
   ```
4. **Deploy** → Wait 2-3 min
5. **Test**: Open your Vercel URL

---

## 📋 Update README - 2 min

Replace Live Demo section:
```markdown
## 🌐 Live Demo

- **Live Application**: https://your-app.vercel.app
- **Backend API**: https://your-backend.onrender.com
- **GitHub**: https://github.com/MoNiLBaRiYa/BookIt
```

Commit and push:
```bash
git add README.md
git commit -m "Add deployment URLs"
git push
```

---

## ✅ Verify

- [ ] Backend: `https://your-backend.onrender.com/health`
- [ ] API: `https://your-backend.onrender.com/api/experiences`
- [ ] Frontend: `https://your-app.vercel.app`
- [ ] Booking flow works end-to-end

---

## 🆘 Quick Fixes

**Backend not responding?**
- Wait 60 seconds (cold start on free tier)
- Check logs in Render dashboard

**Frontend blank?**
- Check VITE_API_URL in Vercel settings
- Redeploy after fixing env var

**Database error?**
- Verify DATABASE_URL is Internal URL
- Wait 2 min, try seed again

---

## 🎯 You're Done When:

✅ Both URLs work publicly
✅ Experiences display on homepage
✅ Can complete a booking
✅ README has live URLs

**Total time: 20 minutes** ⏰
