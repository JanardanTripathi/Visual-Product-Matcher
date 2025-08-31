// export function proxifyUrl(url) {
//   if (url.startsWith("blob:") || url.startsWith("data:")) {
//     return url;
//   }
//   return `http://localhost:5000/proxy?url=${encodeURIComponent(url)}`;
// }

// export function buildHistogram(imageSrc, bins = 16) {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.src = proxifyUrl(imageSrc);

//     img.onload = () => {
//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d");
//       canvas.width = 100;
//       canvas.height = 100;
//       ctx.drawImage(img, 0, 0, 100, 100);

//       const data = ctx.getImageData(0, 0, 100, 100).data;
//       const histogram = new Array(bins * 3).fill(0);

//       for (let i = 0; i < data.length; i += 4) {
//         const r = Math.floor((data[i] / 256) * bins);
//         const g = Math.floor((data[i + 1] / 256) * bins);
//         const b = Math.floor((data[i + 2] / 256) * bins);
//         histogram[r]++;
//         histogram[bins + g]++;
//         histogram[bins * 2 + b]++;
//       }

//       const length = Math.sqrt(histogram.reduce((sum, v) => sum + v * v, 0));
//       resolve(histogram.map((v) => v / length));
//     };

//     img.onerror = () => reject("Failed to load image: " + imageSrc);
//   });
// }
