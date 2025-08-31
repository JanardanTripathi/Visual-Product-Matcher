// import * as tf from "@tensorflow/tfjs";
// import * as mobilenet from "@tensorflow-models/mobilenet";

// let model = null;

// // Load MobileNet model
// async function loadModel() {
//   if (!model) model = await mobilenet.load();
//   return model;
// }

// // Convert image URL to tensor
// export async function getVector(imageSrc) {
//   await loadModel();
//   return tf.tidy(() => {
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.src = imageSrc;
//     return new Promise((resolve, reject) => {
//       img.onload = () => {
//         const tensor = tf.browser.fromPixels(img).toFloat().expandDims(0).div(127.5).sub(1);
//         const activation = model.infer(tensor, true); // embeddings
//         resolve(Array.from(activation.dataSync()));
//       };
//       img.onerror = () => reject("Failed to load image: " + imageSrc);
//     });
//   });
// }

// // Cosine similarity
// export function cosineSimilarity(vec1, vec2) {
//   const dot = vec1.reduce((sum, v, i) => sum + v * vec2[i], 0);
//   const mag1 = Math.sqrt(vec1.reduce((sum, v) => sum + v * v, 0));
//   const mag2 = Math.sqrt(vec2.reduce((sum, v) => sum + v * v, 0));
//   return dot / (mag1 * mag2);
// }