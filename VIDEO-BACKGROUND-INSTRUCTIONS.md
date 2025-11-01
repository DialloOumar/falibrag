# Video Background Setup Instructions

Your home page is now configured with a video background! Here's how to add your video:

## Quick Start

1. **Prepare your video file:**
   - Recommended format: **MP4** (best compatibility)
   - Optional: Also create a **WebM** version for better compression
   - Recommended specifications:
     - Resolution: 1920x1080 (Full HD) or 1280x720 (HD)
     - Duration: 10-30 seconds (will loop)
     - File size: Under 5MB for fast loading
     - Frame rate: 30fps

2. **Name your video file:**
   - Rename to: `hero-video.mp4`
   - If you have WebM: `hero-video.webm`

3. **Place in the project root:**
   ```
   falibrag/
   ├── hero-video.mp4    ← Add your video here
   ├── hero-video.webm   ← Optional WebM version
   ├── index.html
   ├── styles.css
   └── ...
   ```

## Video Optimization Tips

### Convert/Compress Your Video:

**Using Online Tools:**
- [CloudConvert](https://cloudconvert.com/) - Free online video converter
- [Compress.com](https://www.compress.com/video/) - Free video compression

**Using FFmpeg (Command Line):**
```bash
# Compress MP4
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -vf scale=1920:1080 -c:a aac -b:a 128k hero-video.mp4

# Create WebM version
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -vf scale=1920:1080 -c:a libopus hero-video.webm
```

## What to Film for Best Results

**Good video content ideas:**
- Construction site time-lapse
- Building process overview
- Completed projects showcase
- Team at work
- Aerial drone footage of projects
- Modern office/workspace

**Video Tips:**
- Use smooth, slow camera movements
- Avoid quick cuts or jerky motion
- Ensure good lighting
- Keep focus on buildings/structures
- Professional, corporate feel

## Current Fallback

If no video is added, the site will show:
- **Desktop:** Gradient background with static image (current Unsplash background)
- **Mobile:** No video (hidden for performance), shows static background

## Testing

1. Add your video file to the project
2. Refresh the page with `Ctrl + F5`
3. The video should autoplay in the background
4. Check that text is readable over the video
5. Test on mobile (video won't show on mobile for performance)

## Customizing the Video Overlay

If you want to adjust the darkness/color of the overlay over the video, edit `styles.css` line 275-280:

```css
.video-overlay {
    background: linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.6) 0%,        /* Dark overlay on left */
        rgba(255, 107, 53, 0.4) 50%, /* Orange tint in middle */
        rgba(0, 0, 0, 0.7) 100%      /* Dark overlay on right */
    );
}
```

Adjust the numbers (0.0 to 1.0) to make the overlay lighter or darker.

## Video Autoplay Considerations

The video will:
- ✅ Autoplay (muted)
- ✅ Loop continuously
- ✅ Play inline on mobile browsers
- ✅ Not affect page load speed significantly
- ⚠️ Be hidden on mobile devices (< 768px width) for better performance

## Need Help?

If the video doesn't appear:
1. Check the file name matches exactly: `hero-video.mp4`
2. Clear your browser cache with `Ctrl + Shift + R`
3. Check the browser console (F12) for errors
4. Ensure the video file is in the root directory
5. Try a different video file/format

## Example Free Stock Videos

If you need placeholder content:
- [Pexels Videos](https://www.pexels.com/search/videos/construction/)
- [Pixabay Videos](https://pixabay.com/videos/search/construction/)
- [Coverr](https://coverr.co/search?q=building)

All free to use without attribution!
