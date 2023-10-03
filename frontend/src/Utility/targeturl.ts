// frontend/src/utility/targeturl.ts

let targetUrl = '';
if (process.env.APPMODE) {
  // We are on Porter
  targetUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  console.log('porter');
} else {
  // We are local
  targetUrl = 'http://localhost:3003';
  console.log('local');
}

export default targetUrl;