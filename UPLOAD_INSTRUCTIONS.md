# How to Upload Your Own Pictures

Follow these steps to replace the example photos with your own:

### 1. Upload the Files
Drag and drop your image files (JPG, PNG, WebP) into the `/public/images` folder using the file explorer on the left.

### 2. Rename the Files
Give your files simple names, for example: `wedding-01.jpg`, `convocation-02.jpg`, etc.

### 3. Update the Data
Open `src/data.ts` and change the `url` of any photo to match your file path. 
For example:
```typescript
{
  id: "my-photo-1",
  title: "My Custom Shot",
  category: "Weddings",
  url: "/images/wedding-01.jpg", // <--- Path to your file in public/images
  description: "A beautiful moment I captured."
}
```

### 4. Categorizing
Make sure the `category` matches one of these exactly:
- `Weddings`
- `Official Events`
- `Convocation`

---

## Deploying to Vercel
1. Go to the **Settings** menu (bottom left icon).
2. Select **Export to GitHub**.
3. Follow the steps to connect your GitHub account and create a repository.
4. Go to [Vercel](https://vercel.com).
5. Click **Add New** > **Project**.
6. Import the repository you just created.
7. Click **Deploy**. Vercel will automatically detect the Vite settings and make your site live!
