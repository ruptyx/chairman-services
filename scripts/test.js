// Async/await version
async function sendRequest() {
  try {
    const response = await fetch('http://localhost:3001');
    const data = await response.text();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function
sendRequest();

